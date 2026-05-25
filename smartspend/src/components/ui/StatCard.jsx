import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

export default function StatCard({ title, value, change, changeType, icon, gradient, delay = 0 }) {
  const isPositive = changeType === 'up'
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="card p-5 relative overflow-hidden"
    >
      <div className={`absolute inset-0 opacity-5 ${gradient}`} />
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <div className={`p-2 rounded-xl ${gradient} bg-opacity-10`}>
            {icon}
          </div>
        </div>
        <p className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-2">{value}</p>
        {change && (
          <div className={`flex items-center gap-1 text-xs font-medium ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
            {isPositive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
            <span>{change} vs last month</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}
