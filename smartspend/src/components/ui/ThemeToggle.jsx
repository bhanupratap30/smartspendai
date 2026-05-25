import { Moon, Sun } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../../store/slices/themeSlice'
import { motion } from 'framer-motion'

export default function ThemeToggle() {
  const dispatch = useDispatch()
  const { mode } = useSelector(s => s.theme)

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={() => dispatch(toggleTheme())}
      className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"
      aria-label="Toggle theme"
    >
      <motion.div
        key={mode}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </motion.div>
    </motion.button>
  )
}
