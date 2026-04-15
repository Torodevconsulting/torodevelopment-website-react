import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Inicio', href: '/', internal: true },
  { label: 'Nosotros', href: '#about', internal: false },
  { label: 'Servicios', href: '#services', internal: false },
  { label: 'Contacto', href: '/contact', internal: true },
]

const LEGAL_LINKS = [
  { label: 'Política de privacidad', href: '/privacy' },
  { label: 'Preguntas frecuentes', href: '/faqs' },
]

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/torodevelopment',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/torodevelopment',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: 'https://x.com/torodevelopment',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
]

export default function Footer() {
  const navigate = useNavigate()

  return (
    <footer className="mx-0 lg:mx-35 border-x border-t border-dashed border-black/10 dark:border-white/15 bg-white dark:bg-transparent">

      {/* Main footer content */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-0 px-6 sm:px-10 lg:px-12 py-12 sm:py-16 border-b border-dashed border-black/10 dark:border-white/15">

        {/* Brand col */}
        <div className="flex flex-col gap-6 lg:w-1/3">
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M3 9h12M9 3l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-semibold tracking-tight text-sm text-[#1d1d1f] dark:text-white">
              Torodevelopment
            </span>
          </div>
          <p className="text-sm leading-relaxed text-[#6e6e73] dark:text-white/50 max-w-xs">
            Experiencias digitales de alto rendimiento para marcas ambiciosas.
          </p>
          {/* Social links */}
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-[#6e6e73] dark:text-white/40 hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Sitemap col */}
        <div className="flex flex-col gap-4 lg:w-1/4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1d1d1f] dark:text-white">
            Sitemap
          </span>
          <ul className="flex flex-col gap-3">
            {NAV_LINKS.map(({ label, href, internal }) =>
              internal ? (
                <li key={label}>
                  <button
                    onClick={() => navigate(href)}
                    className="text-sm text-[#6e6e73] dark:text-white/50 hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ) : (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-[#6e6e73] dark:text-white/50 hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Legal col */}
        <div className="flex flex-col gap-4 lg:w-1/4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1d1d1f] dark:text-white">
            Legal
          </span>
          <ul className="flex flex-col gap-3">
            {LEGAL_LINKS.map(({ label, href }) => (
              <li key={label}>
                <button
                  onClick={() => navigate(href)}
                  className="text-sm text-[#6e6e73] dark:text-white/50 hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA col */}
        <div className="flex flex-col gap-4 lg:w-1/4 lg:items-end lg:justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1d1d1f] dark:text-white">
            ¿Listo para empezar? Envianos un mensaje y hablemos sobre tu próximo proyecto.
          </span>
          <button
            onClick={() => navigate('/contact')}
            className="flex items-center gap-2 bg-blue-600 px-5 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-blue-500 transition-colors w-fit"
          >
            Contáctanos <ArrowRight size={12} />
          </button>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 sm:px-10 lg:px-12 py-5">
        <span className="text-xs text-[#6e6e73] dark:text-white/30">
          © 2026 Torodevelopment. Todos los derechos reservados.
        </span>
        <span className="text-xs text-[#6e6e73] dark:text-white/20 hidden sm:block">
          Built with precision. Deployed with care.
        </span>
      </div>

    </footer>
  )
}
