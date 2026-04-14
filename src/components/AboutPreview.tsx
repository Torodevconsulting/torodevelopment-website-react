import { motion } from 'motion/react'
import { useTheme } from 'next-themes'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' as const },
  }),
}

const STATS = [
  { value: '3+', label: 'Years of experience' },
  { value: '20+', label: 'Projects delivered' },
  { value: '100%', label: 'Remote-first' },
  { value: '3', label: 'Core services' },
]

export default function AboutPreview() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const navigate = useNavigate()

  const panelGradient = isDark
    ? 'linear-gradient(160deg, rgba(29,78,216,0.9) 0%, rgba(7,8,16,1) 70%)'
    : 'linear-gradient(160deg, rgba(29,78,216,0.12) 0%, #f5f5f7 70%)'

  return (
    <section
      id="about"
      className="mx-0 lg:mx-35 border-x border-t border-dashed border-black/10 dark:border-white/15"
    >
      <div className="flex flex-col lg:flex-row">

        {/* LEFT — stats */}
        <div className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-dashed border-black/10 dark:border-white/15 bg-white dark:bg-transparent">
          <div className="grid grid-cols-2 divide-x divide-y divide-dashed divide-black/10 dark:divide-white/15 h-full">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp} initial="hidden" whileInView="visible"
                viewport={{ once: true, amount: 0.3 }} custom={i}
                className="flex flex-col justify-center gap-1 p-8 sm:p-10"
              >
                <span className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f] dark:text-white">
                  {stat.value}
                </span>
                <span className="text-xs font-medium uppercase tracking-widest text-[#6e6e73] dark:text-white/40">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT — text + CTA */}
        <div
          className="w-full lg:w-1/2 flex flex-col justify-center p-6 sm:p-8 lg:p-12"
          style={{ background: panelGradient }}
        >
          <motion.span
            variants={fadeUp} initial="hidden" whileInView="visible"
            viewport={{ once: true }} custom={0}
            className="mb-6 inline-block bg-black/10 dark:bg-black/40 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#1d1d1f] dark:text-white w-fit"
          >
            About Us
          </motion.span>
          <motion.h2
            variants={fadeUp} initial="hidden" whileInView="visible"
            viewport={{ once: true }} custom={1}
            className="mb-5 text-2xl sm:text-3xl font-bold leading-tight text-[#1d1d1f] dark:text-white"
          >
            A team that listens,<br />builds, and delivers.
          </motion.h2>
          <motion.p
            variants={fadeUp} initial="hidden" whileInView="visible"
            viewport={{ once: true }} custom={2}
            className="mb-8 text-sm leading-relaxed text-[#6e6e73] dark:text-white/55"
          >
            We are a remote-first digital agency combining web development, performance marketing, and strategic consulting. Every project is treated as a long-term partnership — not a transaction.
          </motion.p>
          <motion.button
            variants={fadeUp} initial="hidden" whileInView="visible"
            viewport={{ once: true }} custom={3}
            onClick={() => navigate('/about')}
            className="flex items-center gap-2 w-fit border border-[#1d1d1f]/40 dark:border-white/50 px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#1d1d1f] dark:text-white hover:bg-[#1d1d1f] hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          >
            Learn more <ArrowRight size={12} />
          </motion.button>
        </div>

      </div>
    </section>
  )
}
