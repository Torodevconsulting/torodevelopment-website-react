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

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }

    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)
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
          const x0 = baseX + Math.sin(y0 / 60 + t * 0.6 + symmetricPhase) * 10
          const x1 = baseX + Math.sin(y1 / 60 + t * 0.6 + symmetricPhase) * 10

          // Vertical fade
          const fadeProgress = seg / (SEGMENTS * 0.78)
          const verticalFade = Math.max(0, 1 - fadeProgress * fadeProgress)
          if (verticalFade <= 0) break

          // Mouse glow
          const distX = x0 - mx
          const distY = y0 - my
          const dist = Math.sqrt(distX * distX + distY * distY)
          const glow = Math.max(0, 1 - dist / 220)

          const alpha = (0.38 + glow * 0.5) * verticalFade

          ctx!.beginPath()
          ctx!.moveTo(x0, y0)
          ctx!.lineTo(x1, y1)
          ctx!.strokeStyle = `rgba(180, 210, 255, ${alpha})`
          ctx!.lineWidth = 0.7 + glow * 0.9
          ctx!.stroke()
        }
      }

      t += 0.012
      rafRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
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
        <div className="absolute inset-y-0 left-35 right-35 overflow-hidden rounded-b-2xl">
          {/* Blue radial glow */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 80% 65% at 60% 35%, rgba(29, 78, 216, 0.75) 0%, rgba(7, 8, 16, 0.15) 65%)',
            }}
          />
          <WavyLines />
        </div>

        {/* Hero content — sits over the full section */}
        <div className="relative z-10 flex h-full flex-col justify-end px-45 pb-20">
          <div className="max-w-2xl">
            <span className="mb-5 inline-block bg-black px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
              This is how we roll
            </span>
            <h1 className="mb-4 text-5xl font-bold leading-tight tracking-tight">
              Toro Development Agency
            </h1>
            <p className="mb-10 max-w-xl text-xl leading-relaxed text-white/50">
              We craft high-performance, beautifully designed digital experiences for ambitious brands.
            </p>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 border border-white px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors">
                Get Started <ArrowRight size={14} />
              </button>
              <button className="flex items-center gap-2 border border-white/30 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white/70 hover:border-white hover:text-white transition-colors">
                Contact Us <ArrowRight size={14} />
              </button>
            </div>
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
    </div>
  )
}
