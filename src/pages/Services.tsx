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

const SERVICES = [
  {
    num: '01',
    title: 'Desarrollo Full Stack',
    badge: 'Web · APIs · E-commerce',
    desc: 'Desde una landing page que convierte hasta una plataforma empresarial con lógica compleja. Diseñamos y construimos aplicaciones web completas — frontend, backend, base de datos e integraciones — sin plantillas genéricas ni compromisos técnicos. Tanto si acabas de lanzar tu negocio como si necesitas modernizar una infraestructura existente, trabajamos a tu escala.',
  },
  {
    num: '02',
    title: 'Marketing & Branding',
    badge: 'Identidad · SEO · Estrategia',
    desc: 'Tu marca es más que un logo. Construimos identidades visuales coherentes y estrategias de contenido que conectan con tu audiencia real. Desde el posicionamiento en buscadores hasta campañas en redes sociales, cada acción tiene un objetivo claro y medible. Para negocios que quieren presencia local y para marcas que buscan escalar a nuevos mercados.',
  },
  {
    num: '03',
    title: 'Soluciones de IA',
    badge: 'Automatización · Chatbots · Datos',
    desc: 'Inteligencia artificial aplicada a problemas reales de tu negocio: chatbots que atienden consultas 24/7, automatización de procesos repetitivos, análisis predictivo y personalización a escala. No vendemos IA como tendencia — la integramos donde genera valor tangible, con independencia del tamaño de tu empresa.',
  },
  {
    num: '04',
    title: 'Desarrollo de Apps Nativas',
    badge: 'iOS · Android · React Native',
    desc: 'Aplicaciones móviles diseñadas para que tus usuarios las usen a diario. Desarrollamos en React Native para cubrir iOS y Android con una sola base de código, sin sacrificar rendimiento ni experiencia. Desde apps de fidelización para comercios locales hasta herramientas internas para equipos distribuidos.',
  },
  {
    num: '05',
    title: 'Seguimiento & Analytics',
    badge: 'Tracking · Dashboards · KPIs',
    desc: 'Lo que no se mide no mejora. Implementamos sistemas de tracking, paneles de control personalizados y alertas inteligentes para que siempre sepas qué funciona, qué no y dónde está la oportunidad de crecimiento. Decisiones basadas en datos reales, no suposiciones. Configuramos desde cero o auditamos lo que ya tienes.',
  },
  {
    num: '06',
    title: 'Diseño UX/UI',
    badge: 'Investigación · Prototipos · Sistemas',
    desc: 'Interfaces que enamoran y convierten. Investigamos a tus usuarios, diseñamos cada flujo con propósito y entregamos componentes listos para producción. El diseño no es cosmético — es la diferencia entre un producto que se usa y uno que se abandona. Trabajamos igual de bien en proyectos nuevos que en rediseños de productos existentes.',
  },
]

export default function Services() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const navigate = useNavigate()

  const leftPanelGradient = isDark
    ? 'linear-gradient(160deg, rgba(29,78,216,0.9) 0%, rgba(7,8,16,1) 70%)'
    : 'linear-gradient(160deg, rgba(29,78,216,0.12) 0%, #f5f5f7 70%)'

  return (
    <div className="bg-[#f5f5f7] dark:bg-[#070810] text-[#1d1d1f] dark:text-white min-h-screen">
      <SEO
        title="Servicios"
        description="Desarrollo web, marketing digital, inteligencia artificial, apps móviles y diseño UX/UI — soluciones digitales completas para PYMEs y empresas en crecimiento."
        url="/servicios"
      />
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative h-[52vh] min-h-[340px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? 'linear-gradient(160deg, rgba(29,78,216,0.85) 0%, rgba(7,8,16,1) 60%)'
              : 'linear-gradient(160deg, rgba(29,78,216,0.18) 0%, #e8eaf0 60%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
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

        <div className="relative z-10 px-6 sm:px-12 lg:px-45 pb-10 sm:pb-14 w-full">
          <motion.span
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
            className="mb-4 inline-block bg-black/8 dark:bg-black/40 px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#1d1d1f] dark:text-white"
          >
            Servicios
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65, ease: 'easeOut' }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-[#1d1d1f] dark:text-white"
          >
            Soluciones digitales para<br className="hidden sm:block" /> negocios con ambición.
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
                  Nuestros servicios
                </motion.span>
                <motion.h2
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={{ once: true }} custom={1}
                  className="mb-6 text-3xl lg:text-4xl font-bold leading-tight text-[#1d1d1f] dark:text-white"
                >
                  Todo lo que necesitas,<br />bajo un mismo techo.
                </motion.h2>
                <motion.p
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={{ once: true }} custom={2}
                  className="mb-6 text-base leading-relaxed text-[#6e6e73] dark:text-white/80"
                >
                  No trabajamos con plantillas ni con soluciones genéricas. Cada proyecto comienza entendiendo tu negocio, tu propuesta de valor y tus usuarios. A partir de ahí, construimos lo que realmente necesitas — ni más, ni menos.
                </motion.p>
                <motion.p
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={{ once: true }} custom={3}
                  className="mb-10 text-base leading-relaxed text-[#6e6e73] dark:text-white/80"
                >
                  Trabajamos con PYMEs que están dando sus primeros pasos digitales y con empresas medianas que necesitan escalar lo que ya funciona. En ambos casos, el nivel de atención y exigencia es el mismo.
                </motion.p>
                <motion.button
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={{ once: true }} custom={4}
                  onClick={() => navigate('/contacto')}
                  className="flex items-center gap-2 border border-[#1d1d1f]/40 dark:border-white/50 px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#1d1d1f] dark:text-white hover:bg-[#1d1d1f] hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                  Cuéntanos tu proyecto <ArrowRight size={12} />
                </motion.button>
              </div>
              <div className="hidden lg:block" />
            </div>
          </div>

          {/* RIGHT — service cards */}
          <div className="w-full lg:w-1/2 flex flex-col divide-y divide-dashed divide-black/10 dark:divide-white/15 bg-white dark:bg-transparent">
            {SERVICES.map((item, i) => (
              <motion.div
                key={item.num}
                variants={fadeUp} initial="hidden" whileInView="visible"
                viewport={{ once: true, amount: 0.15 }} custom={i}
                className="flex flex-col gap-3 p-6 sm:p-8 lg:p-10 group hover:bg-black/[0.02] dark:hover:bg-blue-600/10 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400">
                    {item.num}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#6e6e73]/60 dark:text-white/25">
                    {item.badge}
                  </span>
                </div>
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
