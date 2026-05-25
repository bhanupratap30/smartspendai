import { useState,useEffect} from 'react'
import { motion } from 'framer-motion'
import { Plus, Trash2, TrendingUp } from 'lucide-react'
import { formatCurrency, formatDate } from '../../utils/helpers'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import Select from '../../components/ui/Select'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { incomeService } from '../../services/expenseService'
// import { useEffect } from 'react'

// const INITIAL_INCOME = [
//   { id: 1, source: 'Salary', amount: 85000, date: '2025-05-01', category: 'salary', notes: 'Monthly salary' },
//   { id: 2, source: 'Freelance Project', amount: 15000, date: '2025-05-10', category: 'freelance', notes: 'React development project' },
//   { id: 3, source: 'Dividend', amount: 3200, date: '2025-05-12', category: 'investment', notes: 'Mutual fund dividend' },
// ]

const INCOME_CATEGORIES = [
  { value: 'salary', label: '💼 Salary' },
  { value: 'freelance', label: '💻 Freelance' },
  { value: 'business', label: '🏢 Business' },
  { value: 'investment', label: '📈 Investment' },
  { value: 'rental', label: '🏠 Rental' },
  { value: 'gift', label: '🎁 Gift' },
  { value: 'other', label: '📦 Other' },
]

export default function IncomePage() {
  // const [incomes, setIncomes] = useState(INITIAL_INCOME)
  const [incomes, setIncomes] = useState([])
  const [showModal, setShowModal] = useState(false)

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { date: new Date().toISOString().split('T')[0] }
  })

  // const total = incomes.reduce((s, i) => s + i.amount, 0)
  const total = incomes.reduce((s, i) => s + Number(i.amount || 0), 0)
  const fetchIncomes = async () => {

  try {
    const data = await incomeService.getAll()
    setIncomes(data)
  } catch (error) {
    console.log(error)
    toast.error('Failed to fetch income')
  }
}
useEffect(() => {
  fetchIncomes()
}, [])

  // const onSubmit = async (data) => {
  //   await new Promise(r => setTimeout(r, 500))
  //   setIncomes(prev => [{ id: Date.now(), ...data, amount: Number(data.amount) }, ...prev])
  //   reset()
  //   setShowModal(false)
  //   toast.success('Income added!')
  // }
const onSubmit = async (data) => {

  try {
    const payload = {
      source: data.source,
      amount: Number(data.amount),
      category: data.category,
      date: data.date,
      notes: data.notes,
    }
    console.log(payload)
    await incomeService.create(payload)
    fetchIncomes()
    reset()
    setShowModal(false)
    toast.success('Income added!')
  } catch (error) {
    console.log(error)
    toast.error('Failed to add income')
  }
}

  // const handleDelete = (id) => {
  //   setIncomes(prev => prev.filter(i => i.id !== id))
  //   toast.success('Income removed.')
  // }
  const handleDelete = async (id) => {
  try {
    await incomeService.delete(id)
    fetchIncomes()
    toast.success('Income removed.')
  } catch (error) {
    console.log(error)
    toast.error('Failed to delete income')
  }
}

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Income</h1>
          <p className="text-slate-500 text-sm mt-0.5">Track all your income sources</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary text-sm">
          <Plus size={16} /> Add Income
        </button>
      </div>

      {/* Total */}
      <div className="card p-5 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-200 dark:border-emerald-700/50">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-emerald-500">
            <TrendingUp size={22} className="text-white" />
          </div>
          <div>
            <p className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">Total Income This Month</p>
            <p className="font-display text-3xl font-bold text-emerald-700 dark:text-emerald-300">{formatCurrency(total)}</p>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700">
                {['Source', 'Category', 'Date', 'Amount', ''].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {incomes.map((inc, i) => (
                <motion.tr
                  key={inc.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="border-b border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition"
                >
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{inc.source}</p>
                    {inc.notes && <p className="text-xs text-slate-400">{inc.notes}</p>}
                  </td>
                  <td className="px-4 py-3">
                    <span className="badge bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 capitalize">{inc.category}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">{formatDate(inc.date)}</td>
                  <td className="px-4 py-3">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">+{formatCurrency(inc.amount)}</span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleDelete(inc.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500 transition">
                      <Trash2 size={14} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Income Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Add Income">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Income Source" placeholder="e.g., Salary, Freelance" error={errors.source?.message}
            {...register('source', { required: 'Source is required' })} />
          <Input label="Amount (₹)" type="number" placeholder="0" error={errors.amount?.message}
            {...register('amount', { required: 'Amount is required', min: { value: 1, message: 'Must be > 0' } })} />
          <Select label="Category" options={INCOME_CATEGORIES} placeholder="Select category"
            error={errors.category?.message} {...register('category', { required: 'Required' })} />
          <Input label="Date" type="date" {...register('date', { required: 'Date is required' })} />
          <Input label="Notes" placeholder="Optional notes" {...register('notes')} />
          <div className="flex gap-2 justify-end pt-1">
            <Button variant="secondary" onClick={() => setShowModal(false)} type="button">Cancel</Button>
            <Button type="submit" loading={isSubmitting}>Add Income</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
