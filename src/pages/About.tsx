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
    title: 'Escuchar antes de construir',
    desc: 'Cada proyecto comienza entendiendo tu negocio, tus usuarios y tus objetivos — no con código. Hacemos las preguntas difíciles para poder construir lo correcto.',
  },
  {
    num: '02',
    title: 'Calidad sobre velocidad',
    desc: 'Somos deliberados en cuanto a la calidad. Desde la arquitectura hasta los detalles a nivel de píxel, creemos que el esfuerzo extra es lo que separa los buenos productos de los excelentes.',
  },
  {
    num: '03',
    title: 'Transparencia siempre',
    desc: 'Sin cajas negras. Tienes visibilidad total sobre plazos, decisiones y compromisos. Comunicamos de manera temprana, honesta y frecuente.',
  },
  {
    num: '04',
    title: 'Visión a largo plazo',
    desc: 'Construimos para lo que necesitas ahora y lo que necesitarás después. Arquitectura escalable, código mantenible y estrategias de crecimiento sostenible.',
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
        title="Nosotros"
        description="Somos Torodevelopment — una agencia digital remote-first que construye productos web de alto rendimiento y estrategias de crecimiento para marcas ambiciosas."
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
            className="mb-4 inline-block bg-black/8 dark:bg-black/40 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#1d1d1f] dark:text-white"
          >
            Sobre Nosotros
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65, ease: 'easeOut' }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-[#1d1d1f] dark:text-white"
          >
            Somos una agencia digital<br className="hidden sm:block" /> que combina estética y rendimiento <br /> para proyectos ambiciosos
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
                  Nuestra historia 
                </motion.span>
                <motion.h2
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={{ once: true }} custom={1}
                  className="mb-6 text-3xl lg:text-4xl font-bold leading-tight text-[#1d1d1f] dark:text-white"
                >
                  Una agencia digital<br />remote-first.
                </motion.h2>
                <motion.p
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={{ once: true }} custom={2}
                  className="mb-6 text-base leading-relaxed text-[#6e6e73] dark:text-white/80"
                >
                  Torodevelopment nació con una convicción simple: Crear activos digitales para las empresas con estetica visual que refleje la calidad de su oferta sin importar el tamaño del negocio, el servicio prestado o el producto de la empresa.
                  Cuando tenemos en cuenta la estética y la mezclamos con la funcionalidad adaptada a la propuesta de valor de cada marca, mas las necesidades de sus usuarios, el resultado es una experiencia digital que no solo se ve bien, sino que también impulsa resultados reales
                  .
                </motion.p>
                <motion.p
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={{ once: true }} custom={3}
                  className="mb-10 text-base leading-relaxed text-[#6e6e73] dark:text-white/80"
                >
                  Nos da igual si tu proyecto es pequeñito o es muy grande, lo que importa es que sea ambicioso. Nos encanta trabajar con marcas que tienen una visión clara de lo que quieren lograr y que entienden el valor de una experiencia digital bien diseñada para alcanzar sus objetivos.
                </motion.p>
                <motion.button
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={{ once: true }} custom={4}
                  onClick={() => navigate('/contact')}
                  className="flex items-center gap-2 border border-[#1d1d1f]/40 dark:border-white/50 px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#1d1d1f] dark:text-white hover:bg-[#1d1d1f] hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                  Trabaja con nosotros <ArrowRight size={12} />
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
                <p className="text-base leading-relaxed text-[#8e8e93] dark:text-white/80">
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
