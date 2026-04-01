import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import Navbar from '@/components/Navbar'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' as const },
  }),
}

const backedBy = ['QUERTIUM.IO', 'W STUDIOS', 'TORNED STRINGS']
const advisors = ['Perplexity', 'Microsoft', 'KKR', 'Apple', 'AMD']

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

          ctx!.beginPath()
          ctx!.moveTo(x0, y0)
          ctx!.lineTo(x1, y1)
          ctx!.strokeStyle = `rgba(180, 210, 255, ${alpha})`
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
  return (
    <div className="bg-[#070810] text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative h-screen">
        {/* Contained mesh area — black margins visible on sides */}
        <motion.div
          className="absolute inset-y-0 left-35 right-35 overflow-hidden rounded-b-2xl"
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.1, ease: 'easeOut' }}
        >
          {/* Blue radial glow */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 80% 65% at 60% 35%, rgba(29, 78, 216, 0.75) 0%, rgba(7, 8, 16, 0.15) 65%)',
            }}
          />
          <WavyLines />
        </motion.div>

        {/* Hero content — sits over the full section */}
        <div className="relative z-10 flex h-full flex-col justify-end px-45 pb-20">
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
              className="mb-4 text-5xl font-bold leading-tight tracking-tight"
            >
              Toro Development Agency
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease: 'easeOut' }}
              className="mb-10 max-w-xl text-xl leading-relaxed text-white/50"
            >
              We craft high-performance, beautifully designed digital experiences for ambitious brands.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
              className="flex gap-4"
            >
              <button className="flex items-center gap-2 border border-white px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors">
                Get Started <ArrowRight size={14} />
              </button>
              <button className="flex items-center gap-2 border border-white/30 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white/70 hover:border-white hover:text-white transition-colors">
                Contact Us <ArrowRight size={14} />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust / Backed By section */}
      <section className="mx-35 border-x border-dashed border-white/15 py-24">
        <div className="flex flex-col items-center gap-16 px-6">

          {/* Icon */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            custom={0}
          >
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path d="M4 18h28M18 4l14 14-14 14" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>

          {/* Backed By */}
          <div className="flex flex-col items-center gap-6 w-full">
            <motion.span
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              custom={0}
              className="bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white"
            >
              Backed By
            </motion.span>
            <div className="flex w-full items-center justify-center divide-x divide-dashed divide-white/15">
              {backedBy.map((name, i) => (
                <motion.div
                  key={name}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  custom={i + 1}
                  className="flex flex-1 items-center justify-center px-10 py-6"
                >
                  <span className="text-lg font-semibold tracking-tight text-white/70 hover:text-white transition-colors">
                    {name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="w-full border-t border-dashed border-white/15" />

          {/* Angels & Advisors */}
          <div className="flex flex-col items-center gap-6 w-full">
            <motion.span
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              custom={0}
              className="bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white"
            >
              With Angels and Advisors From
            </motion.span>
            <div className="flex w-full items-center justify-center divide-x divide-dashed divide-white/15">
              {advisors.map((name, i) => (
                <motion.div
                  key={name}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  custom={i + 1}
                  className="flex flex-1 items-center justify-center px-8 py-6"
                >
                  <span className="text-base font-semibold tracking-tight text-white/60 hover:text-white transition-colors">
                    {name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Enterprise section — sticky left + scrollable right */}
      <section className="mx-35 border-x border-dashed border-white/15">
        <div className="flex">

          {/* LEFT — sticky panel */}
          <div className="w-1/2 border-r border-dashed border-white/15">
            <div
              className="sticky top-0 flex h-screen flex-col justify-between p-12"
              style={{
                background: 'linear-gradient(160deg, rgba(29,78,216,0.9) 0%, rgba(7,8,16,1) 70%)',
              }}
            >
              <div />
              <div>
                <motion.span
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={{ once: true }} custom={0}
                  className="mb-6 inline-block bg-black/40 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white"
                >
                  Services
                </motion.span>
                <motion.h2
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={{ once: true }} custom={1}
                  className="mb-6 text-4xl font-bold leading-tight"
                >
                  Building digital experiences that move fast
                </motion.h2>
                <motion.p
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={{ once: true }} custom={2}
                  className="mb-10 text-base leading-relaxed text-white/55"
                >
                  We craft high-performance web products — from design systems to full-stack applications — tailored for ambitious brands.
                </motion.p>
                <motion.button
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={{ once: true }} custom={3}
                  className="flex items-center gap-2 border border-white/50 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors"
                >
                  Contact Us <ArrowRight size={12} />
                </motion.button>
              </div>
              <div />
            </div>
          </div>

          {/* RIGHT — scrollable cards */}
          <div className="w-1/2 flex flex-col divide-y divide-dashed divide-white/15">
            {[
              {
                num: '01',
                title: 'Design & Branding',
                desc: 'Visual identity systems, UI design, and brand strategy crafted to stand out in competitive markets.',
              },
              {
                num: '02',
                title: 'Web Development',
                desc: 'High-performance React applications built with modern tooling, optimized for speed and scalability.',
              },
              {
                num: '03',
                title: 'Motion & Interaction',
                desc: 'Animations and micro-interactions that elevate the user experience and make products feel alive.',
              },
              {
                num: '04',
                title: 'Strategy & Consulting',
                desc: 'Technical roadmaps and product strategy to help teams move faster and build the right things.',
              },
            ].map((card, i) => (
              <motion.div
                key={card.num}
                variants={fadeUp} initial="hidden" whileInView="visible"
                viewport={{ once: true, amount: 0.3 }} custom={i}
                className="group flex flex-col gap-6 p-12 hover:bg-white/3 transition-colors"
              >
                {/* Corner brackets */}
                <div className="relative w-16 h-16">
                  <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/30" />
                  <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/30" />
                  <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/30" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/30" />
                  <div className="flex h-full items-center justify-center">
                    <div className="h-8 w-8 rounded-full border border-blue-500/50 bg-blue-500/10" />
                  </div>
                </div>
                <span className="text-xs font-bold text-blue-500 tracking-widest">{card.num}</span>
                <h3 className="text-xl font-bold uppercase tracking-wide">{card.title}</h3>
                <p className="text-sm leading-relaxed text-white/50">{card.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </div>
  )
}
