import { motion } from 'motion/react'
import { useTheme } from 'next-themes'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SEO from '@/components/SEO'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' as const },
  }),
}

const VALUES = [
  {
    num: '01',
    title: 'Listen before building',
    desc: 'Every project starts with understanding your business, your users, and your goals — not with code. We ask the hard questions so we can build the right thing.',
  },
  {
    num: '02',
    title: 'Craft over speed',
    desc: 'We are deliberate about quality. From architecture to pixel-level details, we believe the extra mile is what separates good products from great ones.',
  },
  {
    num: '03',
    title: 'Transparency always',
    desc: 'No black boxes. You have full visibility into timelines, decisions, and trade-offs. We communicate early, honestly, and often.',
  },
  {
    num: '04',
    title: 'Long-term thinking',
    desc: 'We build for what you need now and what you will need later. Scalable architecture, maintainable code, and sustainable growth strategies.',
  },
]

export default function About() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const navigate = useNavigate()

  const leftPanelGradient = isDark
    ? 'linear-gradient(160deg, rgba(29,78,216,0.9) 0%, rgba(7,8,16,1) 70%)'
    : 'linear-gradient(160deg, rgba(29,78,216,0.12) 0%, #f5f5f7 70%)'

  return (
    <div className="bg-[#f5f5f7] dark:bg-[#070810] text-[#1d1d1f] dark:text-white min-h-screen">
      <SEO
        title="About Us"
        description="We are Torodevelopment — a remote-first digital agency building high-performance web products and growth strategies for ambitious brands."
        url="/about"
      />
      <Navbar />

      {/* ── STATIC HERO ─────────────────────────────────────────────── */}
      <section className="relative h-[52vh] min-h-[340px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? 'linear-gradient(160deg, rgba(29,78,216,0.85) 0%, rgba(7,8,16,1) 60%)'
              : 'linear-gradient(160deg, rgba(29,78,216,0.18) 0%, #e8eaf0 60%)',
          }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Brand mark */}
        <motion.div
          className="absolute top-10 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-80"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        >
          <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
            <path d="M3 9h12M9 3l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white" />
          </svg>
          <span className="text-white/80 font-semibold tracking-tight text-sm">Torodevelopment</span>
        </motion.div>

        {/* Hero text */}
        <div className="relative z-10 px-6 sm:px-12 lg:px-45 pb-10 sm:pb-14 w-full">
          <motion.span
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
            className="mb-4 inline-block bg-white/10 dark:bg-black/40 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white"
          >
            About Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65, ease: 'easeOut' }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-white"
          >
            We are builders,<br className="hidden sm:block" /> strategists, and partners.
          </motion.h1>
        </div>
      </section>

      {/* ── MAIN SECTION ─────────────────────────────────────────────── */}
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
                  Who we are
                </motion.span>
                <motion.h2
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={{ once: true }} custom={1}
                  className="mb-6 text-3xl lg:text-4xl font-bold leading-tight text-[#1d1d1f] dark:text-white"
                >
                  A remote-first<br />digital agency.
                </motion.h2>
                <motion.p
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={{ once: true }} custom={2}
                  className="mb-6 text-base leading-relaxed text-[#6e6e73] dark:text-white/55"
                >
                  Torodevelopment was founded on a simple belief: the best digital work comes from deep collaboration between a team that genuinely cares and clients who are serious about growing.
                </motion.p>
                <motion.p
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={{ once: true }} custom={3}
                  className="mb-10 text-base leading-relaxed text-[#6e6e73] dark:text-white/55"
                >
                  We work with startups, growing companies, and enterprises across web development, digital marketing, and strategic consulting — always remote, always focused.
                </motion.p>
                <motion.button
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={{ once: true }} custom={4}
                  onClick={() => navigate('/contact')}
                  className="flex items-center gap-2 border border-[#1d1d1f]/40 dark:border-white/50 px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#1d1d1f] dark:text-white hover:bg-[#1d1d1f] hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                  Work with us <ArrowRight size={12} />
                </motion.button>
              </div>
              <div className="hidden lg:block" />
            </div>
          </div>

          {/* RIGHT — values */}
          <div className="w-full lg:w-1/2 flex flex-col divide-y divide-dashed divide-black/10 dark:divide-white/15 bg-white dark:bg-transparent">
            {VALUES.map((item, i) => (
              <motion.div
                key={item.num}
                variants={fadeUp} initial="hidden" whileInView="visible"
                viewport={{ once: true, amount: 0.2 }} custom={i}
                className="flex flex-col gap-3 p-6 sm:p-8 lg:p-10"
              >
                <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400">
                  {item.num}
                </span>
                <h3 className="text-lg font-bold uppercase tracking-wide text-[#1d1d1f] dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#6e6e73] dark:text-white/55">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}
