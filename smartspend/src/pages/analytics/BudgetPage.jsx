import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit2, Trash2, AlertTriangle, CheckCircle } from 'lucide-react'
import { MOCK_BUDGETS, CATEGORIES } from '../../data/mockData'
import { formatCurrency, getCategoryInfo } from '../../utils/helpers'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import Button from '../../components/ui/Button'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const CATEGORY_OPTIONS = CATEGORIES.map(c => ({ value: c.id, label: `${c.icon} ${c.label}` }))

function BudgetCard({ budget, onDelete }) {
  const cat = getCategoryInfo(budget.category)
  const pct = Math.min((budget.spent / budget.limit) * 100, 100)
  const over = budget.spent > budget.limit
  const remaining = budget.limit - budget.spent

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`card p-5 border ${over ? 'border-red-200 dark:border-red-800/50' : 'border-slate-100 dark:border-slate-700'}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className={`w-10 h-10 rounded-xl ${cat.bg} flex items-center justify-center text-xl`}>{cat.icon}</div>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white text-sm">{cat.label}</p>
            <p className="text-xs text-slate-400">Monthly budget</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {over ? (
            <AlertTriangle size={16} className="text-red-500" />
          ) : pct < 75 ? (
            <CheckCircle size={16} className="text-emerald-500" />
          ) : null}
          <button onClick={() => onDelete(budget.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500 transition">
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className={`font-semibold ${over ? 'text-red-500' : 'text-slate-700 dark:text-slate-300'}`}>
            {formatCurrency(budget.spent)} spent
          </span>
          <span className="text-slate-400">of {formatCurrency(budget.limit)}</span>
        </div>
        <div className="h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.9 }}
            className={`h-full rounded-full ${over ? 'bg-red-500' : pct > 75 ? 'bg-amber-500' : 'bg-brand-500'}`}
          />
        </div>
        <p className={`text-xs font-medium ${over ? 'text-red-500' : 'text-slate-500 dark:text-slate-400'}`}>
          {over
            ? `Overspent by ${formatCurrency(Math.abs(remaining))}`
            : `${formatCurrency(remaining)} remaining (${(100 - pct).toFixed(0)}%)`}
        </p>
      </div>
    </motion.div>
  )
}

export default function BudgetPage() {
  // const [budgets, setBudgets] = useState(MOCK_BUDGETS)
  const [budgets, setBudgets] = useState([])
  const [showModal, setShowModal] = useState(false)
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()
  useEffect(() => {
    fetchBudgets()
  }, [])
  const fetchBudgets = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/budget')
      const data = await response.json()
      setBudgets(data)
    } catch (error) {
      console.log(error)
    }
  }

const onSubmit = async (data) => {
  try {
  const response = await fetch('http://localhost:8080/api/budget', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        category: data.category,
        limit: Number(data.limit),
        spent: 0
      })
    })
    const savedBudget = await response.json()
    setBudgets(prev => [...prev, savedBudget])
    reset()
    setShowModal(false)
    toast.success('Budget created!')
  } catch (error) {
    console.log(error)
    toast.error('Failed to save budget')
  }
}

const handleDelete = async (id) => {
  try {
    await fetch(`http://localhost:8080/api/budget/${id}`, {
      method: 'DELETE'
    })
    setBudgets(prev => prev.filter(b => b.id !== id))
    toast.success('Budget removed.')
  } catch (error) {
    console.log(error)
    toast.error('Failed to delete budget')
  }
}

  const totalBudget = budgets.reduce((s, b) => s + b.limit, 0)
  const totalSpent = budgets.reduce((s, b) => s + b.spent, 0)
  const overCount = budgets.filter(b => b.spent > b.limit).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Budget Planner</h1>
          <p className="text-slate-500 text-sm mt-0.5">Set and track your spending limits</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary text-sm">
          <Plus size={16} /> New Budget
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Budget', value: formatCurrency(totalBudget), color: 'text-brand-600 dark:text-brand-400' },
          { label: 'Total Spent', value: formatCurrency(totalSpent), color: 'text-red-500' },
          { label: 'Categories Over Budget', value: overCount, color: overCount > 0 ? 'text-red-500' : 'text-emerald-500' },
        ].map(s => (
          <div key={s.label} className="card p-4 text-center">
            <p className="text-xs text-slate-400 mb-1">{s.label}</p>
            <p className={`font-display text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Budget cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {budgets.map(b => <BudgetCard key={b.id} budget={b} onDelete={handleDelete} />)}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create Budget">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Select label="Category" options={CATEGORY_OPTIONS} placeholder="Select category"
            error={errors.category?.message} {...register('category', { required: 'Required' })} />
          <Input label="Monthly Limit (₹)" type="number" placeholder="e.g., 10000"
            error={errors.limit?.message}
            {...register('limit', { required: 'Limit is required', min: { value: 1, message: 'Must be > 0' } })} />
          <div className="flex gap-2 justify-end pt-1">
            <Button variant="secondary" type="button" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit" loading={isSubmitting}>Create Budget</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
