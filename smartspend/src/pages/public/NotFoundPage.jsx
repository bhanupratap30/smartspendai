import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center p-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center mx-auto mb-6">
          <Sparkles size={28} className="text-white" />
        </div>

        <h1 className="font-display text-8xl font-bold gradient-text mb-4">404</h1>
        <h2 className="font-display text-2xl font-semibold text-slate-900 dark:text-white mb-3">
          Page not found
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-8 text-sm leading-relaxed">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link to="/" className="btn-secondary">
            <ArrowLeft size={16} /> Go Home
          </Link>
          <Link to="/dashboard" className="btn-primary">
            Go to Dashboard
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
