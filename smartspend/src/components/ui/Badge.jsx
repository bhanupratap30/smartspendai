import { getCategoryInfo } from '../../utils/helpers'

const colorMap = {
  green: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
  red: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
  yellow: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  purple: 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400',
  gray: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400',
}

export function Badge({ children, color = 'gray', className = '' }) {
  return (
    <span className={`badge ${colorMap[color]} ${className}`}>{children}</span>
  )
}

export function CategoryBadge({ category }) {
  const info = getCategoryInfo(category)
  return (
    <span className={`badge ${info.bg} ${info.text}`}>
      <span className="mr-1">{info.icon}</span>
      {info.label}
    </span>
  )
}
