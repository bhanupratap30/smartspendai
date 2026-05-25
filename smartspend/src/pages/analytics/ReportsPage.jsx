import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Download,
  FileText,
  TrendingUp,
  TrendingDown
} from 'lucide-react'

import { formatCurrency } from '../../utils/helpers'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid
} from 'recharts'

import toast from 'react-hot-toast'

const REPORT_TYPES = [
  'Monthly Summary',
  'Category Report',
  'Yearly Overview',
  'Tax Report'
]

export default function ReportsPage() {

  const [selectedMonth, setSelectedMonth] = useState('May 2025')

  const [generating, setGenerating] = useState(null)

  const [expenses, setExpenses] = useState([])

  const [income, setIncome] = useState([])

  const [categoryData, setCategoryData] = useState([])

  // FETCH DATA
  useEffect(() => {

    fetchExpenses()

    fetchIncome()

  }, [])

  // FETCH EXPENSES
  const fetchExpenses = async () => {

    try {

      const response = await fetch(
        'http://localhost:8080/api/expenses'
      )

      const data = await response.json()

      setExpenses(data)

      calculateCategoryData(data)

    } catch (error) {

      console.log(error)
    }
  }

  // FETCH INCOME
  const fetchIncome = async () => {

    try {

      const response = await fetch(
        'http://localhost:8080/api/income'
      )

      const data = await response.json()

      setIncome(data)

    } catch (error) {

      console.log(error)
    }
  }

  // CATEGORY BREAKDOWN
  const calculateCategoryData = (data) => {

    const grouped = {}

    data.forEach(expense => {

      const category = expense.category

      if (!grouped[category]) {

        grouped[category] = 0
      }

      grouped[category] += expense.amount
    })

    const colors = [
      '#6366f1',
      '#f43f5e',
      '#10b981',
      '#f59e0b',
      '#8b5cf6',
      '#06b6d4'
    ]

    const result = Object.keys(grouped).map((key, index) => ({

      name: key,

      value: grouped[key],

      color: colors[index % colors.length]

    }))

    setCategoryData(result)
  }

  // TOTAL EXPENSES
  const totalExpenses = expenses.reduce(

    (sum, e) => sum + e.amount,

    0
  )

  // TOTAL INCOME
  const totalIncome = income.reduce(

    (sum, item) => sum + item.amount,

    0
  )

  // TOTAL SAVINGS
  const totalSavings = totalIncome - totalExpenses

  // SAVINGS RATE
  const savingsRate = totalIncome > 0
    ? ((totalSavings / totalIncome) * 100).toFixed(0)
    : 0

  // DOWNLOAD
  const handleDownload = async (type) => {

    setGenerating(type)

    await new Promise(r => setTimeout(r, 1200))

    setGenerating(null)

    toast.success(`${type} downloaded!`)
  }

  return (

    <div className="space-y-6">

      {/* HEADER */}

      <div className="flex items-center justify-between flex-wrap gap-3">

        <div>

          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            Reports
          </h1>

          <p className="text-slate-500 text-sm mt-0.5">
            Download and view your financial reports
          </p>

        </div>

        <select
          value={selectedMonth}
          onChange={e => setSelectedMonth(e.target.value)}
          className="input text-sm w-auto"
        >

          {[
            'May 2025',
            'April 2025',
            'March 2025',
            'February 2025'
          ].map(m => (

            <option key={m}>
              {m}
            </option>

          ))}

        </select>

      </div>

      {/* MONTHLY SNAPSHOT */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        {[
          {
            label: 'Income',
            value: formatCurrency(totalIncome),
            change: '+0%',
            up: true,
            icon: TrendingUp,
            color: 'text-emerald-500'
          },

          {
            label: 'Expenses',
            value: formatCurrency(totalExpenses),
            change: '+0%',
            up: false,
            icon: TrendingDown,
            color: 'text-red-500'
          },

          {
            label: 'Savings',
            value: formatCurrency(totalSavings),
            change: '+0%',
            up: true,
            icon: TrendingUp,
            color: 'text-brand-500'
          },

          {
            label: 'Savings Rate',
            value: `${savingsRate}%`,
            change: 'Live Data',
            up: true,
            icon: TrendingUp,
            color: 'text-violet-500'
          }

        ].map((s, i) => (

          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="card p-4"
          >

            <p className="text-xs text-slate-400 mb-1">
              {s.label}
            </p>

            <p className="font-display text-xl font-bold text-slate-900 dark:text-white">
              {s.value}
            </p>

            <p className={`text-xs mt-1 ${
              s.up
                ? 'text-emerald-500'
                : 'text-red-500'
            }`}>
              {s.change}
            </p>

          </motion.div>
        ))}

      </div>

      {/* BAR CHART */}

      <div className="card p-5">

        <h2 className="font-display font-semibold text-slate-900 dark:text-white mb-4">
          Financial Summary
        </h2>

        <ResponsiveContainer width="100%" height={240}>

          <BarChart
            data={[
              {
                month: 'Current',
                income: totalIncome,
                expenses: totalExpenses,
                savings: totalSavings
              }
            ]}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              className="dark:[stroke:#334155]"
            />

            <XAxis
              dataKey="month"
              tick={{
                fontSize: 11,
                fill: '#94a3b8'
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tickFormatter={v => `₹${v / 1000}k`}
              tick={{
                fontSize: 11,
                fill: '#94a3b8'
              }}
              axisLine={false}
              tickLine={false}
              width={48}
            />

            <Tooltip
              formatter={v => [formatCurrency(v)]}
              contentStyle={{
                background: '#1e293b',
                border: 'none',
                borderRadius: '10px',
                fontSize: '12px'
              }}
              labelStyle={{
                color: '#94a3b8'
              }}
            />

            <Bar
              dataKey="income"
              fill="#6366f1"
              radius={[5, 5, 0, 0]}
              name="Income"
            />

            <Bar
              dataKey="expenses"
              fill="#f43f5e"
              radius={[5, 5, 0, 0]}
              name="Expenses"
            />

            <Bar
              dataKey="savings"
              fill="#10b981"
              radius={[5, 5, 0, 0]}
              name="Savings"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

      {/* CATEGORY BREAKDOWN */}

      <div className="card p-5">

        <h2 className="font-display font-semibold text-slate-900 dark:text-white mb-4">
          Top Spending Categories — {selectedMonth}
        </h2>

        <div className="space-y-3">

          {categoryData
            .sort((a, b) => b.value - a.value)
            .slice(0, 6)
            .map((c, i) => {

              const total = categoryData.reduce(
                (s, x) => s + x.value,
                0
              )

              const pct =
                total > 0
                  ? (c.value / total * 100).toFixed(0)
                  : 0

              return (

                <div
                  key={c.name}
                  className="flex items-center gap-3"
                >

                  <span className="w-4 text-xs text-slate-400 text-right">
                    {i + 1}
                  </span>

                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300 w-28 truncate">
                    {c.name}
                  </span>

                  <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">

                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{
                        duration: 0.7,
                        delay: i * 0.05
                      }}
                      className="h-full rounded-full"
                      style={{
                        background: c.color
                      }}
                    />

                  </div>

                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 w-20 text-right">
                    {formatCurrency(c.value)}
                  </span>

                  <span className="text-xs text-slate-400 w-8 text-right">
                    {pct}%
                  </span>

                </div>
              )
            })}

        </div>

      </div>

      {/* DOWNLOAD REPORTS */}

      <div className="card p-5">

        <h2 className="font-display font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Download size={18} />
          Download Reports
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

          {REPORT_TYPES.map((type) => (

            <motion.button
              key={type}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleDownload(type)}
              disabled={generating === type}
              className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-brand-300 dark:hover:border-brand-600 hover:bg-brand-50/50 dark:hover:bg-brand-900/10 transition text-left group"
            >

              <div className="flex items-center gap-3">

                <div className="p-2 rounded-lg bg-brand-100 dark:bg-brand-900/30">

                  <FileText
                    size={16}
                    className="text-brand-600 dark:text-brand-400"
                  />

                </div>

                <div>

                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                    {type}
                  </p>

                  <p className="text-xs text-slate-400">
                    {selectedMonth} · PDF & CSV
                  </p>

                </div>

              </div>

              {generating === type ? (

                <div className="w-5 h-5 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />

              ) : (

                <Download
                  size={16}
                  className="text-slate-400 group-hover:text-brand-500 transition"
                />

              )}

            </motion.button>
          ))}

        </div>

      </div>

    </div>
  )
}