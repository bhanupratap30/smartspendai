import { motion } from 'framer-motion'

export default function EmptyState({ icon, title, description, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-3xl mb-4">
        {icon || '📭'}
      </div>
      <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white mb-2">{title}</h3>
      {description && <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mb-5">{description}</p>}
      {action}
    </motion.div>
  )
}
