import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'

export default function Navbar() {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 1.4, ease: 'easeOut' }}
    >
      {/* Dashed vertical lines on the container edges */}
      

      <nav className="mx-35 flex items-center justify-between px-6 py-5 bg-[#070810]">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 9h12M9 3l6 6-6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-white font-semibold tracking-tight text-sm">Torodevelopment</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-8">
          <a href="#about" className="text-xs font-medium tracking-widest uppercase text-white/60 hover:text-white transition-colors">
            About Us
          </a>
          <a href="#services" className="text-xs font-medium tracking-widest uppercase text-white/60 hover:text-white transition-colors">
            Our Services
          </a>
          <button className="flex items-center gap-2 bg-blue-600 px-5 py-2 text-xs font-bold uppercase tracking-widest text-white hover:bg-blue-500 transition-colors">
            Contact Us
            <ArrowRight size={12} />
          </button>
        </div>
      </nav>
    </motion.header>
  )
}
