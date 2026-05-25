import { motion } from 'framer-motion'
import {
  Wallet, TrendingUp, TrendingDown, PiggyBank, Brain, ArrowRight,
  AlertTriangle
} from 'lucide-react'
import StatCard from '../../components/ui/StatCard'
// import { MOCK_MONTHLY_DATA, MOCK_CATEGORY_DATA, MOCK_EXPENSES, MOCK_BUDGETS, CATEGORIES } from '../../data/mockData'
import { CATEGORIES } from '../../data/mockData'
import { expenseService, incomeService } from '../../services/expenseService'
import { useEffect, useState } from 'react'
import { formatCurrency, getCategoryInfo, getHealthScore,formatDate } from '../../utils/helpers'
import {
  AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip,
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts'
import { CategoryBadge } from '../../components/ui/Badge'
import { Link } from 'react-router-dom'


// const CHART_COLORS = MOCK_CATEGORY_DATA.map(c => c.color)
// const [expenses, setExpenses] = useState([])
// const [incomes, setIncomes] = useState([])

function HealthMeter({ score, label, color }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="10" className="text-slate-100 dark:text-slate-700" />
          <circle
            cx="50" cy="50" r="40" fill="none"
            stroke={score > 70 ? '#10b981' : score > 45 ? '#3b82f6' : '#f59e0b'}
            strokeWidth="10"
            strokeDasharray={`${(score / 100) * 251} 251`}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-xl font-bold text-slate-900 dark:text-white">{score}</span>
        </div>
      </div>
      <p className={`text-sm font-semibold mt-2 ${color}`}>{label}</p>
    </div>
  )
}

function BudgetBar({ budget }) {
  const cat = getCategoryInfo(budget.category)
  const pct = Math.min((budget.spent / budget.limit) * 100, 100)
  const over = budget.spent > budget.limit
  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-1.5">
        <div className="flex items-center gap-1.5">
          <span>{cat.icon}</span>
          <span className="font-medium text-slate-700 dark:text-slate-300">{cat.label}</span>
          {over && <AlertTriangle size={12} className="text-red-500" />}
        </div>
        <span className={`font-mono text-xs ${over ? 'text-red-500' : 'text-slate-500 dark:text-slate-400'}`}>
          {formatCurrency(budget.spent)} / {formatCurrency(budget.limit)}
        </span>
      </div>
      <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`h-full rounded-full ${over ? 'bg-red-500' : pct > 75 ? 'bg-amber-500' : 'bg-brand-500'}`}
        />
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const [expenses, setExpenses] = useState([])
  const [incomes, setIncomes] = useState([])
  // const health = getHealthScore(85000, 49200)
  const fetchDashboardData = async () => {

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
    fetchDashboardData()
  }, [])

  const totalIncome = incomes.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  )
  const totalExpenses = expenses.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  )
  const totalBalance = totalIncome - totalExpenses
  const health = getHealthScore(totalIncome, totalExpenses)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Welcome back! Here's your financial summary.</p>
        </div>
        <Link to="/expenses/add" className="btn-primary text-sm">
          <span>+ Add Expense</span>
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Balance" value={formatCurrency(totalBalance)} change="+8.2%" changeType="up"
          icon={<Wallet size={18} className="text-brand-500" />}
          gradient="bg-gradient-to-br from-brand-400 to-indigo-500" delay={0} />
        <StatCard title="Monthly Income" value={formatCurrency(totalIncome)} change="+0%" changeType="up"
          icon={<TrendingUp size={18} className="text-emerald-500" />}
          gradient="bg-gradient-to-br from-emerald-400 to-teal-500" delay={0.05} />
        <StatCard title="Total Expenses" value={formatCurrency(totalExpenses)} change="+5.1%" changeType="down"
          icon={<TrendingDown size={18} className="text-red-500" />}
          gradient="bg-gradient-to-br from-red-400 to-rose-500" delay={0.1} />
        <StatCard title="Net Savings" value={formatCurrency(totalBalance)} change="+12.4%" changeType="up"
          icon={<PiggyBank size={18} className="text-amber-500" />}
          gradient="bg-gradient-to-br from-amber-400 to-orange-500" delay={0.15} />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Income vs Expense trend */}
        <div className="lg:col-span-2 card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-slate-900 dark:text-white">Monthly Overview</h2>
            <div className="flex gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-brand-500 inline-block" /> Income</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400 inline-block" /> Expense</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            {/* <AreaChart data={MOCK_MONTHLY_DATA}> */}
            <AreaChart
              data={[
                {
                  month: 'Current',
                  income: totalIncome,
                  expenses: totalExpenses,
                },
              ]}
            >
              <defs>
                <linearGradient id="gInc" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gExp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={v => `₹${v / 1000}k`} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={48} />
              <Tooltip formatter={(v) => [formatCurrency(v)]} contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '10px', fontSize: '12px' }} labelStyle={{ color: '#94a3b8' }} />
              <Area type="monotone" dataKey="income" stroke="#6366f1" fill="url(#gInc)" strokeWidth={2.5} dot={false} />
              <Area type="monotone" dataKey="expenses" stroke="#f43f5e" fill="url(#gExp)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category pie */}
        {/* <div className="card p-5">
          <h2 className="font-display font-semibold text-slate-900 dark:text-white mb-4">Spending by Category</h2>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={MOCK_CATEGORY_DATA} cx="50%" cy="50%" innerRadius={42} outerRadius={65} paddingAngle={3} dataKey="value">
                {MOCK_CATEGORY_DATA.map((entry, i) => (
                  <Cell key={i} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip formatter={(v) => [formatCurrency(v)]} contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px', fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {MOCK_CATEGORY_DATA.slice(0, 4).map(c => (
              <div key={c.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c.color }} />
                  <span className="text-slate-600 dark:text-slate-300">{c.name}</span>
                </div>
                <span className="font-medium text-slate-900 dark:text-white">{formatCurrency(c.value)}</span>
              </div>
            ))}
          </div>
        </div> */}
      </div>

      {/* Lower section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent transactions */}
        <div className="lg:col-span-2 card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-slate-900 dark:text-white">Recent Transactions</h2>
            <Link to="/expenses" className="text-sm text-brand-500 hover:text-brand-600 flex items-center gap-1">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-1">
            {expenses.slice(0, 6).map((exp, i) => {
              const cat = getCategoryInfo(exp.category)
              return (
                <motion.div
                  key={exp.id || exp._id || i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/40 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl ${cat.bg} flex items-center justify-center text-base`}>
                      {cat.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{exp.title}</p>
                      <p className="text-xs text-slate-400">
                        {formatDate(exp.date)}
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold text-red-500 text-sm">-{formatCurrency(exp.amount)}</span>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Financial health */}
          <div className="card p-5">
            <h2 className="font-display font-semibold text-slate-900 dark:text-white mb-4">Financial Health</h2>
            <div className="flex items-center gap-4">
              <HealthMeter score={health.score} label={health.label} color={health.color} />
              <div className="flex-1 space-y-2">
                {[
                  { label: 'Savings rate', value: '42%', good: true },
                  { label: 'Budget adherence', value: '87%', good: true },
                  { label: 'Overspent categories', value: '1', good: false },
                ].map(m => (
                  <div key={m.label} className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">{m.label}</span>
                    <span className={`font-semibold ${m.good ? 'text-emerald-500' : 'text-red-500'}`}>{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Budget progress */}
          {/* <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-slate-900 dark:text-white">Budget Progress</h2>
              <Link to="/budget" className="text-xs text-brand-500 hover:text-brand-600">Manage</Link>
            </div>
            <div className="space-y-3">
              {MOCK_BUDGETS.slice(0, 4).map(b => <BudgetBar key={b.id} budget={b} />)}
            </div>
          </div> */}

          {/* AI tip */}
          <div className="card p-4 bg-gradient-to-br from-violet-50 to-brand-50 dark:from-violet-900/20 dark:to-brand-900/20 border-violet-200 dark:border-violet-700/50">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-violet-500 flex-shrink-0">
                <Brain size={16} className="text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-violet-700 dark:text-violet-300 mb-1">AI Insight</p>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Your entertainment spending exceeded budget by ₹400 this month. Consider reducing OTT subscriptions.
                </p>
                <Link to="/ai-insights" className="text-xs text-violet-600 dark:text-violet-400 font-medium mt-2 flex items-center gap-1">
                  View all insights <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
