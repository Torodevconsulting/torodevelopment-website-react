import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'motion/react'
import { useTheme } from 'next-themes'
import { ArrowRight, Orbit } from 'lucide-react'
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

const CYCLING_WORDS = ['build', 'create', 'design', 'work']

function CyclingWord() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex(i => (i + 1) % CYCLING_WORDS.length)
    }, 4400)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="relative inline-block overflow-hidden align-bottom cursor-pointer select-none" style={{ minWidth: '6ch' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={CYCLING_WORDS[index]}
          className="inline-block text-blue-400"
          style={{ cursor: 'pointer', userSelect: 'none' }}
          initial={{ y: '100%', opacity: 0.4 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {CYCLING_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function AnimatedIcon({ index, animate }: { index: number; animate: boolean }) {
  const d = (delay: number) => ({
    pathLength: { duration: 1.2, delay, ease: 'easeInOut' as const },
    opacity:    { duration: 0.15, delay },
  })

  if (index === 0) {
    // Globe — meridian ellipse simulates rotation via rx keyframes
    return (
      <motion.svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <motion.circle cx="20" cy="20" r="16" stroke="#3b82f6" strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={animate ? { pathLength: 1, opacity: 1 } : {}}
          transition={d(0)}
        />
        <motion.ellipse cx="20" cy="20" ry="16" stroke="#3b82f6" strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0, rx: 8 }}
          animate={animate ? { pathLength: 1, opacity: 1, rx: [8, 1, 8] } : {}}
          transition={{ ...d(0.18), rx: { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1.5 } }}
        />
        <motion.ellipse cx="20" cy="20" rx="16" ry="6" stroke="#3b82f6" strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={animate ? { pathLength: 1, opacity: 1 } : {}}
          transition={d(0.36)}
        />
        <motion.line x1="4" y1="20" x2="36" y2="20" stroke="#3b82f6" strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={animate ? { pathLength: 1, opacity: 1 } : {}}
          transition={d(0.54)}
        />
      </motion.svg>
    )
  }

  if (index === 1) {
    // Waves — each path oscillates on Y with staggered phase
    return (
      <motion.svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        {[8, 14, 20, 26, 32].map((y, i) => (
          <motion.path
            key={y}
            d={`M2 ${y} Q12 ${y - 6} 20 ${y} Q28 ${y + 6} 38 ${y}`}
            stroke="#3b82f6" strokeWidth="1.2"
            initial={{ pathLength: 0, opacity: 0, y: 0 }}
            animate={animate ? { pathLength: 1, opacity: 1, y: [0, -3, 0, 3, 0] } : {}}
            transition={{
              ...d(i * 0.18),
              y: { duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 1.2 + i * 0.15 },
            }}
          />
        ))}
      </motion.svg>
    )
  }

  if (index === 2) {
    // Code brackets — slash slides up/down
    return (
      <motion.svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <motion.path d="M16 6 L6 20 L16 34" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={animate ? { pathLength: 1, opacity: 1 } : {}}
          transition={d(0)}
        />
        <motion.path d="M24 6 L34 20 L24 34" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={animate ? { pathLength: 1, opacity: 1 } : {}}
          transition={d(0.18)}
        />
        <motion.line x1="23" y1="4" x2="17" y2="36" stroke="#3b82f6" strokeWidth="1" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0, y: 0 }}
          animate={animate ? { pathLength: 1, opacity: 1, y: [0, -4, 0, 4, 0] } : {}}
          transition={{ ...d(0.36), y: { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1.8 } }}
        />
      </motion.svg>
    )
  }

  // Compass — crosshair group rotates continuously
  return (
    <motion.svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <motion.circle cx="20" cy="20" r="16" stroke="#3b82f6" strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 1 } : {}}
        transition={d(0)}
      />
      <motion.circle cx="20" cy="20" r="6" stroke="#3b82f6" strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={animate ? { pathLength: 1, opacity: 1 } : {}}
        transition={d(0.18)}
      />
      <motion.g
        style={{ transformOrigin: '20px 20px' }}
        initial={{ opacity: 0, rotate: 0 }}
        animate={animate ? { opacity: 1, rotate: 360 } : {}}
        transition={{
          opacity: { duration: 0.2, delay: 1.2 },
          rotate: { duration: 8, repeat: Infinity, ease: 'linear', delay: 1.2 },
        }}
      >
        <line x1="20" y1="4"  x2="20" y2="14" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="20" y1="26" x2="20" y2="36" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="4"  y1="20" x2="14" y2="20" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="26" y1="20" x2="36" y2="20" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
      </motion.g>
    </motion.svg>
  )
}

function ServiceCard({ card, i }: { card: { num: string; title: string; desc: string }; i: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.4 })

  return (
    <div
      ref={ref}
      className="group flex flex-col gap-6 p-6 sm:p-8 lg:p-12 hover:bg-black/3 dark:hover:bg-white/3 transition-colors"
    >
      {/* Bracket container — expands on scroll */}
      <motion.div
        className="relative overflow-visible"
        initial={{ width: 12, height: 12 }}
        animate={isInView ? { width: 80, height: 80 } : {}}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
      >
        <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-black/25 dark:border-white/40" />
        <span className="absolute top-0 right-0 w-4 h-4 border-t border-r border-black/25 dark:border-white/40" />
        <span className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-black/25 dark:border-white/40" />
        <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-black/25 dark:border-white/40" />

        {/* Icon fades in after expansion */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <AnimatedIcon index={i} animate={isInView} />
        </motion.div>
      </motion.div>

      <span className="text-xs font-bold text-blue-600 dark:text-blue-500 tracking-widest">{card.num}</span>
      <h3 className="text-xl font-bold uppercase tracking-wide text-[#1d1d1f] dark:text-white">{card.title}</h3>
      <p className="text-sm leading-relaxed text-[#6e6e73] dark:text-white/50">{card.desc}</p>
    </div>
  )
}

const backedBy = ['QUERTIUM.IO', 'W STUDIOS', 'TORNED STRINGS']
const services = ['Full Stack Development', 'Marketing & Branding', 'AI Solutions', 'Native Apps Development', 'Tracking & Analytics', 'UX/UI Design']

function WavyLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()

    // Listen on window so overlapping z-index elements don't block events
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      // Only track if within canvas bounds
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        mouseRef.current = { x, y }
      } else {
        mouseRef.current = { x: -9999, y: -9999 }
      }
    }
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('resize', resize)

    const SPACING = 22
    const SEGMENTS = 200
    let t = 0

    function draw() {
      const w = canvas!.width
      const h = canvas!.height
      ctx!.clearRect(0, 0, w, h)

      const cols = Math.ceil(w / SPACING) + 2
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      for (let col = 0; col < cols; col++) {
        const baseX = col * SPACING
        const colNorm = (col / (cols - 1)) * 2 - 1
        const symmetricPhase = colNorm * Math.PI * 4

        for (let seg = 0; seg < SEGMENTS; seg++) {
          const y0 = (seg / SEGMENTS) * h
          const y1 = ((seg + 1) / SEGMENTS) * h
          const waveX0 = baseX + Math.sin(y0 / 60 + t * 0.6 + symmetricPhase) * 10
          const waveX1 = baseX + Math.sin(y1 / 60 + t * 0.6 + symmetricPhase) * 10

          // Mouse repulsion — push lines away from cursor
          const REPEL_RADIUS = 250
          const REPEL_STRENGTH = 20

          const dx0 = waveX0 - mx
          const dy0 = y0 - my
          const dist0 = Math.sqrt(dx0 * dx0 + dy0 * dy0) || 1
          const repel0 = dist0 < REPEL_RADIUS ? (1 - dist0 / REPEL_RADIUS) ** 2.0 : 0
          const x0 = waveX0 + (dx0 / dist0) * repel0 * REPEL_STRENGTH

          const dx1 = waveX1 - mx
          const dy1 = y1 - my
          const dist1 = Math.sqrt(dx1 * dx1 + dy1 * dy1) || 1
          const repel1 = dist1 < REPEL_RADIUS ? (1 - dist1 / REPEL_RADIUS) ** 2.0 : 0
          const x1 = waveX1 + (dx1 / dist1) * repel1 * REPEL_STRENGTH

          // Vertical fade
          const fadeProgress = seg / (SEGMENTS * 0.78)
          const verticalFade = Math.max(0, 1 - fadeProgress * fadeProgress)
          if (verticalFade <= 0) break

          const glow = Math.max(repel0, repel1)
          const alpha = (0.38 + glow * 0.45) * verticalFade

          const dark = document.documentElement.classList.contains('dark')
          const lineColor = dark
            ? `rgba(180, 210, 255, ${alpha})`
            : `rgba(29, 78, 216, ${alpha * 0.55})`

          ctx!.beginPath()
          ctx!.moveTo(x0, y0)
          ctx!.lineTo(x1, y1)
          ctx!.strokeStyle = lineColor
          ctx!.lineWidth = 0.7 + glow * 1.2
          ctx!.stroke()
        }
      }

      t += 0.012
      rafRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
    />
  )
}

export default function Home() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const navigate = useNavigate()

  const leftPanelGradient = isDark
    ? 'linear-gradient(160deg, rgba(29,78,216,0.9) 0%, rgba(7,8,16,1) 70%)'
    : 'linear-gradient(160deg, rgba(29,78,216,0.12) 0%, #f5f5f7 70%)'

  return (
    <div className="bg-[#f5f5f7] dark:bg-[#070810] text-[#1d1d1f] dark:text-white">
      <SEO
      title="Web Development & Digital Marketing Agency"
      description="We craft high-performance, beautifully designed digital experiences for ambitious brands — from startups to enterprise."
      url="/"
      />
      <Navbar />

      {/* Hero */}
      <section className="relative h-screen">
        {/* Contained mesh area — black margins visible on sides */}
        <motion.div
          className="absolute inset-y-0 left-3 right-3 sm:left-10 sm:right-10 lg:left-35 lg:right-35 overflow-hidden rounded-b-2xl"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.1, ease: 'easeOut' }}
        >
          {/* Blue radial glow */}
          <div
            className="absolute inset-0 dark-glow"
            style={{
              background:
                'radial-gradient(ellipse 80% 65% at 60% 35%, var(--glow-color, rgba(29,78,216,0.25)) 0%, transparent 65%)',
            }}
          />
          <WavyLines />
        </motion.div>

        {/* Hero content — sits over the full section */}
        <div className="relative z-10 flex h-full flex-col justify-end px-6 sm:px-12 lg:px-45 pb-12 sm:pb-20">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1, ease: 'easeOut' }}
              className="mb-5 inline-block bg-black px-3 py-1 text-xs font-bold uppercase tracking-widest text-white"
            >
              This is how we roll
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
              className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-[#1d1d1f] dark:text-white"
            >
              Toro Development Agency
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease: 'easeOut' }}
              className="mb-10 max-w-xl text-base sm:text-xl leading-relaxed text-[#6e6e73] dark:text-white/50"
            >
              We craft high-performance, beautifully designed digital experiences for ambitious brands.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <button className="flex items-center justify-center gap-2 border border-[#1d1d1f] dark:border-white px-6 py-3 text-sm font-semibold uppercase tracking-widest text-[#1d1d1f] dark:text-white hover:bg-[#1d1d1f] hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors">
                About Us <ArrowRight size={14} />
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="flex items-center justify-center gap-2 border border-[#1d1d1f]/30 dark:border-white/30 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-[#1d1d1f]/70 dark:text-white/70 hover:border-[#1d1d1f] hover:text-[#1d1d1f] dark:hover:border-white dark:hover:text-white transition-colors"
              >
                Contact Us <ArrowRight size={14} />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust / Backed By section */}
      <section className="mx-0 lg:mx-35 border-x border-dashed border-black/10 dark:border-white/15 py-12 sm:py-24 bg-white dark:bg-transparent">
        <div className="flex flex-col items-center gap-12 sm:gap-16 px-4 sm:px-6">

          {/* Icon */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            custom={0}
          >
            <Orbit size={60} className="text-blue-700 dark:text-blue-400" strokeWidth={0.5}/>
          </motion.div>

          {/* Backed By */}
          <div className="flex flex-col items-center gap-6 w-full">
            <motion.span
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              custom={0}
              className="bg-black/5 dark:bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#1d1d1f] dark:text-white"
            >
              Our Partners
            </motion.span>
            <div className="flex flex-col sm:flex-row w-full items-center justify-center divide-y sm:divide-y-0 sm:divide-x divide-dashed divide-black/10 dark:divide-white/15">
              {backedBy.map((name, i) => (
                <motion.div
                  key={name}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  custom={i + 1}
                  className="flex flex-1 w-full sm:w-auto items-center justify-center px-6 sm:px-8 lg:px-10 py-5 sm:py-6"
                >
                  <span className="text-lg font-semibold tracking-tight text-[#1d1d1f]/70 dark:text-white/70 hover:text-[#1d1d1f] dark:hover:text-white transition-colors">
                    {name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="w-full border-t border-dashed border-black/10 dark:border-white/15" />

          {/* Our Services */}
          <div className="flex flex-col items-center gap-6 w-full">
            <motion.span
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              custom={0}
              className="bg-black/5 dark:bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#1d1d1f] dark:text-white"
            >
              What we do Best
            </motion.span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex w-full divide-dashed divide-black/10 dark:divide-white/15 border border-dashed border-black/10 dark:border-white/15 lg:border-0 lg:divide-x">
              {services.map((name, i) => (
                <motion.div
                  key={name}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  custom={i + 1}
                  className="flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-8 py-5 sm:py-6 border-dashed border-white/15 not-last:border-r lg:not-last:border-r-0 border-b lg:border-b-0"
                >
                  <span className="text-xs sm:text-sm font-semibold tracking-tight text-[#6e6e73] dark:text-white/60 hover:text-[#1d1d1f] dark:hover:text-white transition-colors text-center">
                    {name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Enterprise section — sticky left + scrollable right */}
      <section className="mx-0 lg:mx-35 border-x border-dashed border-black/10 dark:border-white/15">
        <div className="flex flex-col lg:flex-row">

          {/* LEFT — sticky panel */}
          <div className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-dashed border-black/10 dark:border-white/15">
            <div
              className="lg:sticky lg:top-0 flex lg:h-screen flex-col justify-between p-6 sm:p-8 lg:p-12"
              style={{
                background: leftPanelGradient,
              }}
            >
              <div className="hidden lg:block" />
              <div className="py-8 lg:py-0">
                <motion.span
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={{ once: true }} custom={0}
                  className="mb-6 inline-block bg-black/10 dark:bg-black/40 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#1d1d1f] dark:text-white"
                >
                  Services
                </motion.span>
                <motion.h2
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={{ once: true }} custom={1}
                  className="mb-6 text-3xl lg:text-4xl font-bold leading-tight text-[#1d1d1f] dark:text-white"
                >
                  We listen first, then we <CyclingWord />
                </motion.h2>
                <motion.p
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={{ once: true }} custom={2}
                  className="mb-10 text-base leading-relaxed text-[#6e6e73] dark:text-white/55"
                >
                  We offer a full range of digital services shaped around your business — not the other way around. From day one to long-term growth, we're with you every step of the way.
                </motion.p>
                <motion.button
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={{ once: true }} custom={3}
                  onClick={() => navigate('/contact')}
                  className="flex items-center gap-2 border border-[#1d1d1f]/40 dark:border-white/50 px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#1d1d1f] dark:text-white hover:bg-[#1d1d1f] hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                  Contact Us <ArrowRight size={12} />
                </motion.button>
              </div>
              <div className="hidden lg:block" />
            </div>
          </div>

          {/* RIGHT — scrollable cards */}
          <div className="w-full lg:w-1/2 flex flex-col divide-y divide-dashed divide-black/10 dark:divide-white/15 bg-white dark:bg-transparent">
            {[
              {
                num: '01',
                title: 'PYMES & Startups',
                desc: 'From zero to visible. Brand identity, web presence, and a digital strategy built from the ground up — everything you need to launch with confidence and grow from day one.',
              },
              {
                num: '02',
                title: 'Growing Brands & Companies',
                desc: 'Scale what\'s working. Fix what\'s not. Performance marketing, full-stack development, and strategic consulting to turn a solid foundation into measurable growth.',
              },
              {
                num: '03',
                title: 'Big Enterprises & Innovators',
                desc: 'Execution at the level your brand demands. High-performance web products and data-driven paid media campaigns, built with the rigor and autonomy that complex organizations require.',
              },
              {
                num: '04',
                title: 'Strategy & Consulting',
                desc: 'Clarity before action. Before building anything, we map where you are, where you want to go, and the most direct route to get there — across digital, brand, and performance.',
              },
            ].map((card, i) => (
              <ServiceCard key={card.num} card={card} i={i} />
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}
