import { CATEGORIES } from '../data/mockData'

export const formatCurrency = (amount, currency = 'INR') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

export const formatDate = (date) => {
  if (!date) return '-'
  const parsedDate = new Date(date)
  if (isNaN(parsedDate.getTime())) return '-'
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(parsedDate)
}

export const formatRelativeTime = (date) => {
  const diff = Date.now() - new Date(date).getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}

export const getCategoryInfo = (categoryId) =>
  CATEGORIES.find(c => c.id === categoryId) || CATEGORIES[CATEGORIES.length - 1]

export const getHealthScore = (income, expenses) => {
  const ratio = expenses / income
  if (ratio < 0.5) return { score: 90, label: 'Excellent', color: 'text-emerald-500' }
  if (ratio < 0.65) return { score: 75, label: 'Good', color: 'text-blue-500' }
  if (ratio < 0.8) return { score: 55, label: 'Fair', color: 'text-amber-500' }
  return { score: 30, label: 'Needs Attention', color: 'text-red-500' }
}

export const clsx = (...args) => args.filter(Boolean).join(' ')

export const truncate = (str, len = 30) => str.length > len ? str.slice(0, len) + '...' : str

export const debounce = (fn, delay) => {
  let t
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay) }
}
