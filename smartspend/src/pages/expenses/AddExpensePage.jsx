import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Upload, Tag } from 'lucide-react'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import Select from '../../components/ui/Select'
import { CATEGORIES } from '../../data/mockData'
import { expenseService } from '../../services/expenseService'
import toast from 'react-hot-toast'

const CATEGORY_OPTIONS = CATEGORIES.map(c => ({ value: c.id, label: `${c.icon} ${c.label}` }))

export default function AddExpensePage() {
  const navigate = useNavigate()
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { date: new Date().toISOString().split('T')[0] }
  })

  // const onSubmit = async (data) => {
  //   await new Promise(r => setTimeout(r, 600))
  //   toast.success('Expense added successfully!')
  //   navigate('/expenses')
  // }
  const onSubmit = async (data) => {

  try {

    const payload = {
      title: data.title,
      amount: Number(data.amount),
      category: data.category,
      note: data.notes,
      date: data.date,
      paymentMethod: data.paymentMethod,
      tags: data.tags ? data.tags.split(',') : [],
    }

    await expenseService.create(payload)

    toast.success('Expense added successfully!')

    navigate('/expenses')

  } catch (error) {

    console.log(error)

    toast.error('Failed to add expense')

  }

}

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="btn-ghost p-2">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Add Expense</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Record a new expense transaction</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6 space-y-5"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Input
              label="Expense Title"
              placeholder="e.g., Grocery Shopping"
              error={errors.title?.message}
              {...register('title', { required: 'Title is required' })}
            />
          </div>

          <Input
            label="Amount (₹)"
            type="number"
            placeholder="0.00"
            error={errors.amount?.message}
            {...register('amount', { required: 'Amount is required', min: { value: 1, message: 'Must be > 0' } })}
          />

          <Select
            label="Category"
            options={CATEGORY_OPTIONS}
            placeholder="Select category"
            error={errors.category?.message}
            {...register('category', { required: 'Category is required' })}
          />

          <Input
            label="Date"
            type="date"
            error={errors.date?.message}
            {...register('date', { required: 'Date is required' })}
          />

          <Select
            label="Payment Method"
            options={[
              { value: 'cash', label: 'Cash' },
              { value: 'upi', label: 'UPI' },
              { value: 'card', label: 'Debit/Credit Card' },
              { value: 'netbanking', label: 'Net Banking' },
              { value: 'wallet', label: 'Digital Wallet' },
            ]}
            placeholder="Select method"
            {...register('paymentMethod')}
          />

          <div className="sm:col-span-2">
            <label className="label">Notes (optional)</label>
            <textarea
              placeholder="Add any notes about this expense..."
              rows={3}
              className="input resize-none"
              {...register('notes')}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="label flex items-center gap-1.5">
              <Tag size={14} /> Tags
            </label>
            <Input
              placeholder="Add tags separated by commas (e.g., work, essential)"
              {...register('tags')}
            />
          </div>

          {/* Receipt upload */}
          <div className="sm:col-span-2">
            <label className="label">Receipt (optional)</label>
            <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-8 text-center hover:border-brand-400 transition cursor-pointer">
              <Upload size={24} className="text-slate-400 mx-auto mb-2" />
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Click to upload receipt image
              </p>
              <p className="text-xs text-slate-400 mt-1">PNG, JPG, PDF up to 5MB</p>
              <input type="file" className="hidden" accept="image/*,.pdf" {...register('receipt')} />
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button variant="secondary" onClick={() => navigate(-1)}>Cancel</Button>
          <Button type="submit" loading={isSubmitting} onClick={handleSubmit(onSubmit)}>
            Add Expense
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
