import { useState } from 'react'
import { motion } from 'motion/react'
import { useTheme } from 'next-themes'
import { ArrowRight, Loader2 } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { submitLead } from '@/lib/submitLead'
import { Turnstile } from '@marsidev/react-turnstile'
import SEO from '@/components/SEO'


const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' as const },
  }),
}

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const leftPanelGradient = isDark
    ? 'linear-gradient(160deg, rgba(29,78,216,0.9) 0%, rgba(7,8,16,1) 70%)'
    : 'linear-gradient(160deg, rgba(29,78,216,0.12) 0%, #f5f5f7 70%)'

  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    message: '',
  })
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('loading')
    setErrorMsg('')
    try {
      await submitLead({
        name: form.name,
        phone: form.phone,
        email: form.email,
        company: form.company || undefined,
        message: form.message,
        turnstileToken: turnstileToken!,
      })
      setFormState('success')
      setForm({ name: '', phone: '', email: '', company: '', message: '' })
    } catch (err: unknown) {
      setFormState('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.')
    }
  }

  const inputClass =
    'w-full bg-transparent border border-black/15 dark:border-white/15 px-4 py-3 text-sm text-[#1d1d1f] dark:text-white placeholder-[#6e6e73] dark:placeholder-white/30 focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 transition-colors'

  return (
    <div className="bg-[#f5f5f7] dark:bg-[#070810] text-[#1d1d1f] dark:text-white min-h-screen">
      <SEO
        title="Contact"
        description="Get in touch with Torodevelopment. Tell us about your project and we'll reply within 24 hours."
        url="/contact"
      />
      <Navbar />
      {/* ── STATIC HERO ─────────────────────────────────────────────── */}
      <section className="relative h-[52vh] min-h-[340px] flex items-end overflow-hidden">
        {/* Gradient mesh background */}
        <div className="absolute inset-0"
          style={{
            background: isDark
              ? 'linear-gradient(160deg, rgba(29,78,216,0.85) 0%, rgba(7,8,16,1) 60%)'
              : 'linear-gradient(160deg, rgba(29,78,216,0.18) 0%, #e8eaf0 60%)',
          }}
        />
        {/* Subtle grid lines */}
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Brand mark — top center */}
        <motion.div
          className="absolute top-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        >
          <div className="flex items-center gap-2 opacity-80">
            <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
              <path
                d="M3 9h12M9 3l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white dark:text-white"
              />
            </svg>
            <span className="text-white/80 dark:text-white/70 font-semibold tracking-tight text-sm">
              Torodevelopment
            </span>
          </div>
        </motion.div>

        {/* Hero text — bottom left */}
        <div className="relative z-10 px-6 sm:px-12 lg:px-45 pb-10 sm:pb-14 w-full">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
            className="mb-4 inline-block bg-white/10 dark:bg-black/40 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white dark:text-white"
          >
            Contact
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65, ease: 'easeOut' }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-white"
          >
            Let's build something<br className="hidden sm:block" /> together.
          </motion.h1>
        </div>
      </section>

      {/* ── FORM SECTION ─────────────────────────────────────────────── */}
      <section className="mx-0 lg:mx-35 border-x border-dashed border-black/10 dark:border-white/15">
        <div className="flex flex-col lg:flex-row">

          {/* LEFT — sticky panel */}
          <div className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-dashed border-black/10 dark:border-white/15">
            <div
              className="lg:sticky lg:top-0 flex lg:h-screen flex-col justify-between p-6 sm:p-8 lg:p-12"
              style={{ background: leftPanelGradient }}
            >
              <div className="hidden lg:block" />
              <div className="py-8 lg:py-0">
                <motion.span
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={{ once: true }} custom={0}
                  className="mb-6 inline-block bg-black/10 dark:bg-black/40 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#1d1d1f] dark:text-white"
                >
                  Get in touch
                </motion.span>
                <motion.h2
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={{ once: true }} custom={1}
                  className="mb-6 text-3xl lg:text-4xl font-bold leading-tight text-[#1d1d1f] dark:text-white"
                >
                  Tell us about<br />your project.
                </motion.h2>
                <motion.p
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={{ once: true }} custom={2}
                  className="mb-10 text-base leading-relaxed text-[#6e6e73] dark:text-white/55"
                >
                  We read every message and reply within 24 hours. Share as much detail as you like — the more context, the better the conversation.
                </motion.p>

                {/* Contact details */}
                <motion.div
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={{ once: true }} custom={3}
                  className="flex flex-col gap-3 text-xs font-medium tracking-widest uppercase text-[#6e6e73] dark:text-white/40"
                >
                  
                  <span>Available worldwide · Remote-first</span>
                </motion.div>
              </div>
              <div className="hidden lg:block" />
            </div>
          </div>

          {/* RIGHT — form */}
          <div className="w-full lg:w-1/2 bg-white dark:bg-transparent">
            <div className="flex min-h-screen flex-col justify-center p-6 sm:p-8 lg:p-12">
              {formState === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col gap-4"
                >
                  <span className="inline-block bg-blue-600/10 dark:bg-blue-500/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-blue-700 dark:text-blue-400 w-fit">
                    Message sent
                  </span>
                  <h3 className="text-2xl font-bold text-[#1d1d1f] dark:text-white">
                    Thanks — we'll be in touch soon.
                  </h3>
                  <p className="text-sm text-[#6e6e73] dark:text-white/50 leading-relaxed">
                    We received your message and will reply within 24 hours.
                  </p>
                  <button
                    onClick={() => setFormState('idle')}
                    className="mt-4 w-fit flex items-center gap-2 border border-[#1d1d1f]/40 dark:border-white/30 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-[#1d1d1f] dark:text-white hover:bg-[#1d1d1f] hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                  >
                    Send another <ArrowRight size={12} />
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  {/* Name + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-widest text-[#6e6e73] dark:text-white/50">
                        Name <span className="text-blue-600 dark:text-blue-400">*</span>
                      </label>
                      <input
                        name="name"
                        type="text"
                        required
                        placeholder="John Doe"
                        value={form.name}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-widest text-[#6e6e73] dark:text-white/50">
                        Phone <span className="text-blue-600 dark:text-blue-400">*</span>
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        required
                        placeholder="+1 555 000 0000"
                        value={form.phone}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Email + Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-widest text-[#6e6e73] dark:text-white/50">
                        Email <span className="text-blue-600 dark:text-blue-400">*</span>
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={form.email}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold uppercase tracking-widest text-[#6e6e73] dark:text-white/50">
                        Company
                      </label>
                      <input
                        name="company"
                        type="text"
                        placeholder="Acme Inc."
                        value={form.company}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#6e6e73] dark:text-white/50">
                      Message <span className="text-blue-600 dark:text-blue-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      placeholder="Tell us what you're working on, your timeline, and any relevant details..."
                      value={form.message}
                      onChange={handleChange}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {/* Error */}
                  {formState === 'error' && (
                    <p className="text-xs text-red-500 dark:text-red-400">{errorMsg}</p>
                  )}

                  {/* Submit */}
                  <Turnstile
                      siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                      onSuccess={(token) => setTurnstileToken(token)}
                    />
                  <div className="flex items-center justify-between pt-2">
                    <p className="text-xs text-[#6e6e73] dark:text-white/30">
                      <span className="text-blue-600 dark:text-blue-400">*</span> Required fields
                    </p>
                    <button
                      type="submit"
                      disabled={formState === 'loading' || !turnstileToken}
                      className="flex items-center gap-2 bg-blue-600 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {formState === 'loading' ? (
                        <>Sending <Loader2 size={12} className="animate-spin" /></>
                      ) : (
                        <>Send message <ArrowRight size={12} /></>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}
