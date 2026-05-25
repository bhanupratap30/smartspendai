import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, CartesianGrid
} from 'recharts'
// import {
//   MOCK_MONTHLY_DATA, MOCK_CATEGORY_DATA, MOCK_WEEKLY_DATA
// } from '../../data/mockData'
import { expenseService, incomeService } from '../../services/expenseService'
import { useEffect } from 'react'
import { formatCurrency } from '../../utils/helpers'

const TABS = ['Monthly', 'Weekly', 'Category']

export default function AnalyticsPage() {
  const [expenses, setExpenses] = useState([])
  const [incomes, setIncomes] = useState([])
  const [tab, setTab] = useState('Monthly')
  const [year, setYear] = useState('2025')
  const fetchAnalyticsData = async () => {
    try {
      const expenseData = await expenseService.getAll()
      const incomeData = await incomeService.getAll()
      setExpenses(expenseData)
      setIncomes(incomeData)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchAnalyticsData()
  }, [])

  const tooltipStyle = {
    contentStyle: { background: '#1e293b', border: 'none', borderRadius: '10px', fontSize: '12px' },
    labelStyle: { color: '#94a3b8' }
  }
  const monthlyData = [
    {
      month: 'Current',
      income: incomes.reduce((s, i) => s + Number(i.amount || 0), 0),
      expenses: expenses.reduce((s, e) => s + Number(e.amount || 0), 0),
      savings:
        incomes.reduce((s, i) => s + Number(i.amount || 0), 0)
        -
        expenses.reduce((s, e) => s + Number(e.amount || 0), 0),
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Analytics</h1>
          <p className="text-slate-500 text-sm mt-0.5">Detailed view of your financial trends</p>
        </div>
        <select value={year} onChange={e => setYear(e.target.value)} className="input text-sm w-auto">
          <option>2025</option><option>2024</option><option>2023</option>
        </select>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl w-fit">
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${tab === t ? 'bg-white dark:bg-slate-700 shadow text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700'
              }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Monthly' && (
        <div className="space-y-5">
          {/* Income vs Expense */}
          <div className="card p-5">
            <h2 className="font-display font-semibold text-slate-900 dark:text-white mb-4">Income vs Expenses ({year})</h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:[stroke:#334155]" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={v => `₹${v / 1000}k`} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={48} />
                <Tooltip formatter={v => [formatCurrency(v)]} {...tooltipStyle} />
                <Legend iconType="circle" iconSize={8} formatter={v => <span className="text-xs capitalize">{v}</span>} />
                <Bar dataKey="income" fill="#6366f1" radius={[6, 6, 0, 0]} name="Income" />
                <Bar dataKey="expenses" fill="#f43f5e" radius={[6, 6, 0, 0]} name="Expenses" />
                <Bar dataKey="savings" fill="#10b981" radius={[6, 6, 0, 0]} name="Savings" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Savings trend */}
          <div className="card p-5">
            <h2 className="font-display font-semibold text-slate-900 dark:text-white mb-4">Savings Trend</h2>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="gSav" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={v => `₹${v / 1000}k`} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={48} />
                <Tooltip formatter={v => [formatCurrency(v)]} {...tooltipStyle} />
                <Area type="monotone" dataKey="savings" stroke="#10b981" fill="url(#gSav)" strokeWidth={2.5} dot={{ r: 4, fill: '#10b981' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {tab === 'Weekly' && (
        <div className="card p-5">
          <h2 className="font-display font-semibold text-slate-900 dark:text-white mb-4">This Week's Spending</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={[
                {
                  day: 'Today',
                  amount: expenses.reduce(
                    (s, e) => s + Number(e.amount || 0),
                    0
                  ),
                },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={v => `₹${v / 1000}k`} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={48} />
              <Tooltip formatter={v => [formatCurrency(v)]} {...tooltipStyle} />
              {/* <Bar dataKey="amount" fill="#6366f1" radius={[8, 8, 0, 0]} name="Spent">
                {MOCK_WEEKLY_DATA.map((_, i) => (
                  <Cell key={i} fill={i === 4 ? '#f43f5e' : '#6366f1'} />
                ))}
              </Bar> */}
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-slate-400 text-center mt-2">Friday had the highest spending — ₹5,200</p>
        </div>
      )}

      {/* {tab === 'Category' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="card p-5">
            <h2 className="font-display font-semibold text-slate-900 dark:text-white mb-4">Spending by Category</h2>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={MOCK_CATEGORY_DATA} cx="50%" cy="50%" outerRadius={100} paddingAngle={3} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                  {MOCK_CATEGORY_DATA.map((entry, i) => <Cell key={i} fill={entry.color} stroke="none" />)}
                </Pie>
                <Tooltip formatter={v => [formatCurrency(v)]} {...tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="card p-5">
            <h2 className="font-display font-semibold text-slate-900 dark:text-white mb-4">Category Breakdown</h2>
            <div className="space-y-3">
              {MOCK_CATEGORY_DATA.sort((a, b) => b.value - a.value).map(c => {
                const total = MOCK_CATEGORY_DATA.reduce((s, x) => s + x.value, 0)
                const pct = (c.value / total) * 100
                return (
                  <div key={c.name}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="font-medium text-slate-700 dark:text-slate-300">{c.name}</span>
                      <span className="text-slate-500 dark:text-slate-400">{formatCurrency(c.value)} ({pct.toFixed(0)}%)</span>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="h-full rounded-full"
                        style={{ background: c.color }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )} */}
    </div>
  )
}
