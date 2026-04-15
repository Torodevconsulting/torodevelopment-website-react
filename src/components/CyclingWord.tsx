import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface CyclingWordProps {
  words: string[]
}

export default function CyclingWord({ words }: CyclingWordProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex(i => (i + 1) % words.length)
    }, 4400)
    return () => clearInterval(id)
  }, [words])

  return (
    <span
      className="relative inline-block overflow-hidden align-bottom cursor-pointer select-none"
      style={{ minWidth: `${Math.max(...words.map(w => w.length))}ch` }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          className="inline-block text-blue-400"
          initial={{ y: '100%', opacity: 0.4 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
