import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Plus, Edit2, Trash2, SortAsc, SortDesc } from 'lucide-react'
// import { MOCK_EXPENSES, CATEGORIES } from '../../data/mockData'
import { CATEGORIES } from '../../data/mockData'
import { expenseService } from '../../services/expenseService'
import { formatCurrency, formatDate, getCategoryInfo } from '../../utils/helpers'
import { CategoryBadge } from '../../components/ui/Badge'
import Pagination from '../../components/ui/Pagination'
import Modal from '../../components/ui/Modal'
import EmptyState from '../../components/ui/EmptyState'
import Button from '../../components/ui/Button'
import toast from 'react-hot-toast'

const PAGE_SIZE = 7

export default function ExpensesPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [sort, setSort] = useState('date_desc')
  const [page, setPage] = useState(1)
  const [deleteId, setDeleteId] = useState(null)
  // const [expenses, setExpenses] = useState(MOCK_EXPENSES)
  const [expenses, setExpenses] = useState([])

  const filtered = useMemo(() => {
    let list = [...expenses]
    if (search) list = list.filter(e => e.title.toLowerCase().includes(search.toLowerCase()))
    if (category) list = list.filter(e => e.category === category)
    if (sort === 'date_desc') list.sort((a, b) => new Date(b.date) - new Date(a.date))
    else if (sort === 'date_asc') list.sort((a, b) => new Date(a.date) - new Date(b.date))
    else if (sort === 'amount_desc') list.sort((a, b) => b.amount - a.amount)
    else if (sort === 'amount_asc') list.sort((a, b) => a.amount - b.amount)
    return list
  }, [expenses, search, category, sort])

  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const fetchExpenses = async () => {
  try {
    const data = await expenseService.getAll()
    setExpenses(data)
  } catch (error) {
    console.log(error)
    toast.error('Failed to fetch expenses')
  }
}
useEffect(() => {
  fetchExpenses()
}, [])

  // const handleDelete = (id) => {
  //   setExpenses(prev => prev.filter(e => e.id !== id))
  //   setDeleteId(null)
  //   toast.success('Expense deleted.')
  // }
  const handleDelete = async (id) => {
  try {
    await expenseService.delete(id)
    fetchExpenses()
    setDeleteId(null)
    toast.success('Expense deleted.')
  } catch (error) {
    console.log(error)
    toast.error('Failed to delete expense')
  }
}

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Expenses</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">{filtered.length} transactions found</p>
        </div>
        <Link to="/expenses/add" className="btn-primary text-sm">
          <Plus size={16} /> Add Expense
        </Link>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
              placeholder="Search expenses..."
              className="input pl-9 text-sm"
            />
          </div>
          <select
            value={category}
            onChange={e => { setCategory(e.target.value); setPage(1) }}
            className="input text-sm w-full sm:w-44"
          >
            <option value="">All categories</option>
            {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="input text-sm w-full sm:w-44"
          >
            <option value="date_desc">Newest first</option>
            <option value="date_asc">Oldest first</option>
            <option value="amount_desc">Highest amount</option>
            <option value="amount_asc">Lowest amount</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        {paged.length === 0 ? (
          <EmptyState
            icon="🔍"
            title="No expenses found"
            description="Try adjusting your filters or add a new expense."
            action={<Link to="/expenses/add" className="btn-primary text-sm">Add First Expense</Link>}
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-700">
                    {['Title', 'Category', 'Date', 'Amount', 'Actions'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {paged.map((exp, i) => {
                      const cat = getCategoryInfo(exp.category)
                      return (
                        <motion.tr
                          key={exp.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: i * 0.03 }}
                          className="border-b border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition"
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2.5">
                              <div className={`w-8 h-8 rounded-lg ${cat.bg} flex items-center justify-center text-sm`}>
                                {cat.icon}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{exp.title}</p>
                                {exp.notes && <p className="text-xs text-slate-400 truncate max-w-[160px]">{exp.notes}</p>}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <CategoryBadge category={exp.category} />
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-500 dark:text-slate-400">{formatDate(exp.date)}</td>
                          <td className="px-4 py-3">
                            <span className="font-semibold text-red-500">{formatCurrency(exp.amount)}</span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <Link to={`/expenses/edit/${exp.id}`} className="p-1.5 rounded-lg hover:bg-brand-50 dark:hover:bg-brand-900/20 text-slate-400 hover:text-brand-500 transition">
                                <Edit2 size={14} />
                              </Link>
                              <button onClick={() => setDeleteId(exp.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500 transition">
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      )
                    })}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 dark:border-slate-700">
                <p className="text-xs text-slate-400">
                  Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
                </p>
                <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
              </div>
            )}
          </>
        )}
      </div>

      {/* Delete confirmation */}
      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Expense" size="sm">
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">Are you sure you want to delete this expense? This action cannot be undone.</p>
        <div className="flex gap-2 justify-end">
          <Button variant="secondary" onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button variant="danger" onClick={() => handleDelete(deleteId)}>Delete</Button>
        </div>
      </Modal>
    </div>
  )
}
