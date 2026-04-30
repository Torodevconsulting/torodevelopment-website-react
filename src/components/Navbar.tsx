import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, Sun, Moon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const navigate = useNavigate()

  // Avoid hydration mismatch — only render icon after mount
  useEffect(() => setMounted(true), [])

  const isDark = theme === 'dark'

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 1.4, ease: 'easeOut' }}
    >
      <nav className="mx-0 sm:mx-10 lg:mx-35 flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 bg-white dark:bg-[#070810] border-b border-black/8 dark:border-white/5">
        {/* Logo */}
        <div className="flex items-center gap-2" onClick={() => navigate('/')}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 9h12M9 3l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#1d1d1f] dark:text-white" />
          </svg>
          <span className="text-[#1d1d1f] dark:text-white font-semibold tracking-tight text-sm">Torodevelopment</span>
        </div>

        {/* Links + toggle */}
        <div className="flex items-center gap-6 sm:gap-8">
          <button onClick={() => navigate('/about')} className="hidden sm:block text-xs font-medium tracking-widest uppercase text-[#6e6e73] dark:text-white/60 hover:text-[#1d1d1f] dark:hover:text-white transition-colors">
            Nosotros
          </button>
          <button onClick={() => navigate('/services')} className="hidden sm:block text-xs font-medium tracking-widest uppercase text-[#6e6e73] dark:text-white/60 hover:text-[#1d1d1f] dark:hover:text-white transition-colors">
            Servicios
          </button>

          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="flex items-center justify-center w-8 h-8 text-[#6e6e73] dark:text-white/60 hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          )}

          <button
            onClick={() => navigate('/contact')}
            className="flex items-center gap-2 bg-blue-600 px-4 sm:px-5 py-2 text-xs font-bold uppercase tracking-widest text-white hover:bg-blue-500 transition-colors"
          >
            Contáctanos
            <ArrowRight size={12} />
          </button>
        </div>
      </nav>
    </motion.header>
  )
}
