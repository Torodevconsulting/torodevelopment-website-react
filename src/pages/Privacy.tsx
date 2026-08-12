import type { ReactNode } from 'react'
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

const CONTACT_EMAIL = 'torodevelopmentbcn@gmail.com'
const NIF = '61695087W'
const LAST_UPDATED = '12 de agosto de 2026'

const PROVIDERS = [
  { name: 'Supabase', purpose: 'Almacenamiento de leads/contactos del formulario' },
  { name: 'Resend', purpose: 'Envío de correos electrónicos transaccionales' },
  { name: 'Cloudflare (Turnstile)', purpose: 'Verificación anti-spam' },
  { name: 'Google (GTM / GA4)', purpose: 'Analítica web' },
  {
    name: 'LinkedIn API',
    purpose:
      'Publicación de contenido en nuestro perfil profesional (no se comparten datos de visitantes del sitio con LinkedIn)',
  },
]

const RIGHTS = [
  { title: 'Acceder', desc: 'a los datos personales que tenemos sobre ti' },
  { title: 'Rectificar', desc: 'datos inexactos' },
  { title: 'Solicitar la eliminación', desc: 'de tus datos' },
  { title: 'Oponerte', desc: 'al tratamiento de tus datos' },
  { title: 'Solicitar la portabilidad', desc: 'de tus datos' },
  { title: 'Retirar tu consentimiento', desc: 'en cualquier momento' },
]

function Section({ num, title, index, children }: { num: string; title: string; index: number; children: ReactNode }) {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      custom={index}
      className="flex flex-col gap-3 p-6 sm:p-8 lg:p-10"
    >
      <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400">{num}</span>
      <h2 className="text-lg font-bold uppercase tracking-wide text-[#1d1d1f] dark:text-white">{title}</h2>
      <div className="flex flex-col gap-4 text-base leading-relaxed text-[#8e8e93] dark:text-white/80">
        {children}
      </div>
    </motion.section>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2 pl-5">
      {items.map((item) => (
        <li key={item} className="list-disc marker:text-blue-600 dark:marker:text-blue-400">
          {item}
        </li>
      ))}
    </ul>
  )
}

export default function Privacy() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const navigate = useNavigate()

  const leftPanelGradient = isDark
    ? 'linear-gradient(160deg, rgba(29,78,216,0.9) 0%, rgba(7,8,16,1) 70%)'
    : 'linear-gradient(160deg, rgba(29,78,216,0.12) 0%, #f5f5f7 70%)'

  return (
    <div className="bg-[#f5f5f7] dark:bg-[#070810] text-[#1d1d1f] dark:text-white min-h-screen">
      <SEO
        title="Política de Privacidad"
        description="Cómo Toro Development recopila, usa y protege tus datos personales — formulario de contacto, analítica web, proveedores de servicios y tus derechos bajo el RGPD."
        url="/privacidad"
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
            Legal
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65, ease: 'easeOut' }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-[#1d1d1f] dark:text-white"
          >
            Política de Privacidad
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
            className="mt-4 text-xs font-bold uppercase tracking-widest text-[#6e6e73] dark:text-white/50"
          >
            Última actualización: {LAST_UPDATED}
          </motion.p>
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
                  Tus datos, claros
                </motion.span>
                <motion.h2
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={{ once: true }} custom={1}
                  className="mb-6 text-3xl lg:text-4xl font-bold leading-tight text-[#1d1d1f] dark:text-white"
                >
                  Transparencia<br />también con tu privacidad.
                </motion.h2>
                <motion.p
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={{ once: true }} custom={2}
                  className="mb-6 text-base leading-relaxed text-[#6e6e73] dark:text-white/80"
                >
                  En Toro Development («nosotros», «nuestro»), accesible desde torodevelop.com, respetamos tu privacidad y nos comprometemos a proteger los datos personales que compartes con nosotros. Esta política explica qué información recopilamos, cómo la usamos y qué derechos tienes al respecto.
                </motion.p>
                <motion.div
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={{ once: true }} custom={3}
                  className="mb-10 flex flex-col gap-1 text-base leading-relaxed text-[#6e6e73] dark:text-white/80"
                >
                  <span className="text-xs font-bold uppercase tracking-widest text-[#1d1d1f] dark:text-white">
                    Responsable del tratamiento
                  </span>
                  <span className="font-semibold text-[#1d1d1f] dark:text-white">Toro Development</span>
                  <span>NIF: {NIF}</span>
                  <span>Reus, Tarragona, España</span>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline w-fit"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </motion.div>
                <motion.button
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={{ once: true }} custom={4}
                  onClick={() => navigate('/contacto')}
                  className="flex items-center gap-2 border border-[#1d1d1f]/40 dark:border-white/50 px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#1d1d1f] dark:text-white hover:bg-[#1d1d1f] hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                  ¿Alguna duda? Escríbenos <ArrowRight size={12} />
                </motion.button>
              </div>
              <div className="hidden lg:block" />
            </div>
          </div>

          {/* RIGHT — policy sections */}
          <div className="w-full lg:w-1/2 flex flex-col divide-y divide-dashed divide-black/10 dark:divide-white/15 bg-white dark:bg-transparent">

            <Section num="01" title="Qué datos recopilamos" index={0}>
              <p className="font-semibold text-[#1d1d1f] dark:text-white">
                Datos que nos proporcionas directamente
              </p>
              <p>Cuando completas el formulario de contacto en nuestro sitio web, recopilamos:</p>
              <Bullets
                items={[
                  'Nombre',
                  'Dirección de correo electrónico',
                  'Mensaje o descripción del proyecto',
                  'Cualquier otro dato que decidas incluir voluntariamente en el mensaje',
                ]}
              />
              <p>
                Estos datos se almacenan en nuestra base de datos (Supabase) con el único fin de gestionar tu solicitud.
              </p>

              <p className="font-semibold text-[#1d1d1f] dark:text-white">Datos recopilados automáticamente</p>
              <p>
                Utilizamos Google Tag Manager y Google Analytics 4 para entender cómo se usa nuestro sitio web. Esto puede incluir:
              </p>
              <Bullets
                items={[
                  'Dirección IP (anonimizada)',
                  'Tipo de navegador y dispositivo',
                  'Páginas visitadas y tiempo de permanencia',
                  'Origen del tráfico (de dónde llegaste a nuestro sitio)',
                ]}
              />

              <p className="font-semibold text-[#1d1d1f] dark:text-white">Verificación anti-spam</p>
              <p>
                Usamos Cloudflare Turnstile en nuestro formulario de contacto para prevenir envíos automatizados (spam/bots). Este servicio puede procesar datos técnicos mínimos de tu navegador para verificar que eres una persona real, sin usar cookies de seguimiento tradicionales.
              </p>
            </Section>

            <Section num="02" title="Cómo usamos tus datos" index={1}>
              <p>Usamos la información recopilada para:</p>
              <Bullets
                items={[
                  'Responder a tus consultas y solicitudes de proyecto',
                  'Enviarte comunicaciones relacionadas con tu solicitud (a través de Resend, nuestro proveedor de envío de correo)',
                  'Analizar y mejorar el rendimiento de nuestro sitio web',
                  'Prevenir spam y abuso del formulario de contacto',
                  'Cumplir con obligaciones legales cuando corresponda',
                ]}
              />
              <p>No usamos tus datos para fines de marketing no solicitado ni los vendemos a terceros.</p>
            </Section>

            <Section num="03" title="Con quién compartimos tus datos" index={2}>
              <p>
                Compartimos datos únicamente con proveedores de servicios que nos ayudan a operar el sitio web, bajo sus propios acuerdos de privacidad:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-dashed border-black/10 dark:border-white/15">
                      <th className="py-3 pr-4 text-left text-xs font-bold uppercase tracking-widest text-[#1d1d1f] dark:text-white">
                        Proveedor
                      </th>
                      <th className="py-3 text-left text-xs font-bold uppercase tracking-widest text-[#1d1d1f] dark:text-white">
                        Finalidad
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {PROVIDERS.map(({ name, purpose }) => (
                      <tr key={name} className="border-b border-dashed border-black/10 dark:border-white/15 last:border-0">
                        <td className="py-3 pr-4 align-top font-semibold text-[#1d1d1f] dark:text-white whitespace-nowrap">
                          {name}
                        </td>
                        <td className="py-3 align-top leading-relaxed">{purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                Estos proveedores solo tienen acceso a los datos necesarios para prestar su servicio y están obligados contractualmente a protegerlos.
              </p>
            </Section>

            <Section num="04" title="Uso de la API de LinkedIn" index={3}>
              <p>
                Toro Development utiliza la API de LinkedIn (Share on LinkedIn) para publicar contenido profesional en nuestro perfil de LinkedIn de forma asistida. Este uso:
              </p>
              <Bullets
                items={[
                  'No recopila ni comparte datos personales de los visitantes de torodevelop.com con LinkedIn',
                  'Se limita a la publicación de contenido generado por nosotros en nuestra propia cuenta',
                  'Utiliza autenticación OAuth2 estándar de LinkedIn, gestionada de forma segura',
                ]}
              />
            </Section>

            <Section num="05" title="Cookies" index={4}>
              <p>
                Nuestro sitio puede usar cookies de análisis (a través de Google Analytics) para entender el comportamiento agregado de los visitantes. Puedes gestionar o rechazar estas cookies desde la configuración de tu navegador.
              </p>
            </Section>

            <Section num="06" title="Cuánto tiempo conservamos tus datos" index={5}>
              <p>
                Conservamos los datos del formulario de contacto durante el tiempo necesario para gestionar tu solicitud y, si se convierte en una relación comercial, mientras dure dicha relación más el plazo legal aplicable. Puedes solicitar la eliminación de tus datos en cualquier momento.
              </p>
            </Section>

            <Section num="07" title="Tus derechos (RGPD)" index={6}>
              <p>Como residente en la Unión Europea, tienes derecho a:</p>
              <ul className="flex flex-col gap-2 pl-5">
                {RIGHTS.map(({ title, desc }) => (
                  <li key={title} className="list-disc marker:text-blue-600 dark:marker:text-blue-400">
                    <span className="font-semibold text-[#1d1d1f] dark:text-white">{title}</span> {desc}
                  </li>
                ))}
              </ul>
              <p>
                Para ejercer cualquiera de estos derechos, contáctanos en{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </Section>

            <Section num="08" title="Seguridad" index={7}>
              <p>
                Implementamos medidas técnicas razonables (cifrado en tránsito, control de acceso) para proteger tus datos frente a accesos no autorizados, pérdida o alteración.
              </p>
            </Section>

            <Section num="09" title="Cambios a esta política" index={8}>
              <p>
                Podemos actualizar esta política ocasionalmente. La fecha de «última actualización» al inicio de este documento refleja la versión vigente.
              </p>
            </Section>

            <Section num="10" title="Contacto" index={9}>
              <p>
                Si tienes preguntas sobre esta política de privacidad, escríbenos a{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </Section>

          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}
