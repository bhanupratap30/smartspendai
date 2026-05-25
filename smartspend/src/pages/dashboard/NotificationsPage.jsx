import { useEffect, useState } from 'react'

import {
  Bell,
  Brain,
  Info,
  AlertTriangle,
  Check,
  Trash2,
  CheckCheck,
  TrendingUp,
  Wallet
} from 'lucide-react'

import { motion, AnimatePresence } from 'framer-motion'

const typeConfig = {

  warning: {
    icon: AlertTriangle,
    color: 'text-amber-500',
    bg: 'bg-amber-100 dark:bg-amber-900/30'
  },

  info: {
    icon: Info,
    color: 'text-blue-500',
    bg: 'bg-blue-100 dark:bg-blue-900/30'
  },

  ai: {
    icon: Brain,
    color: 'text-violet-500',
    bg: 'bg-violet-100 dark:bg-violet-900/30'
  },

  success: {
    icon: Check,
    color: 'text-emerald-500',
    bg: 'bg-emerald-100 dark:bg-emerald-900/30'
  },

  income: {
    icon: TrendingUp,
    color: 'text-green-500',
    bg: 'bg-green-100 dark:bg-green-900/30'
  },

  expense: {
    icon: Wallet,
    color: 'text-red-500',
    bg: 'bg-red-100 dark:bg-red-900/30'
  }
}

export default function NotificationsPage() {

  const [notifications, setNotifications] = useState([])

  // FETCH DATA
  useEffect(() => {

    fetchNotifications()

  }, [])

  const fetchNotifications = async () => {

    try {

      // FETCH BUDGETS
      const budgetRes = await fetch(
        'http://localhost:8080/api/budget'
      )

      const budgets = await budgetRes.json()

      // FETCH EXPENSES
      const expenseRes = await fetch(
        'http://localhost:8080/api/expenses'
      )

      const expenses = await expenseRes.json()

      // FETCH INCOME
      const incomeRes = await fetch(
        'http://localhost:8080/api/income'
      )

      const income = await incomeRes.json()

      const generatedNotifications = []

      // OVER BUDGET WARNINGS
      budgets.forEach((budget, index) => {

        const spent = budget.spent || 0
        const limit = budget.limit || 0

        const percentage =
          limit > 0
            ? (spent / limit) * 100
            : 0

        // OVER LIMIT
        if (spent > limit) {

          generatedNotifications.push({

            id: `budget-over-${index}`,

            type: 'warning',

            read: false,

            title: `Budget exceeded in ${budget.category}`,

            message:
              `You spent ₹${spent} out of ₹${limit}. ` +
              `Overspent by ₹${spent - limit}.`,

            time: 'Just now'
          })
        }

        // 80% WARNING
        else if (percentage >= 80) {

          generatedNotifications.push({

            id: `budget-warning-${index}`,

            type: 'info',

            read: false,

            title: `${budget.category} budget reaching limit`,

            message:
              `You already used ${percentage.toFixed(0)}% ` +
              `of your budget.`,

            time: 'Recently'
          })
        }
      })

      // EXPENSE NOTIFICATIONS
      expenses.slice(0, 5).forEach((expense, index) => {

        generatedNotifications.push({

          id: `expense-${index}`,

          type: 'expense',

          read: true,

          title: `Expense added: ${expense.title}`,

          message:
            `₹${expense.amount} spent on ` +
            `${expense.category}.`,

          time: 'Today'
        })
      })

      // INCOME NOTIFICATIONS
      income.slice(0, 3).forEach((item, index) => {

        generatedNotifications.push({

          id: `income-${index}`,

          type: 'income',

          read: true,

          title: `Income received`,

          message:
            `₹${item.amount} added from ${item.source}.`,

          time: 'Today'
        })
      })

      // AI SAVING SUGGESTION
      const totalIncome = income.reduce(
        (sum, item) => sum + item.amount,
        0
      )

      const totalExpenses = expenses.reduce(
        (sum, item) => sum + item.amount,
        0
      )

      if (totalExpenses > totalIncome * 0.7) {

        generatedNotifications.push({

          id: 'ai-warning',

          type: 'ai',

          read: false,

          title: 'AI Spending Insight',

          message:
            'Your expenses crossed 70% of your income. ' +
            'Try reducing non-essential spending.',

          time: 'AI Analysis'
        })
      }

      // SUCCESS SAVINGS
      if (totalIncome > totalExpenses) {

        generatedNotifications.push({

          id: 'saving-success',

          type: 'success',

          read: true,

          title: 'Great saving progress',

          message:
            `You saved ₹${totalIncome - totalExpenses} this month.`,

          time: 'Summary'
        })
      }

      setNotifications(generatedNotifications)

    } catch (error) {

      console.log(error)
    }
  }

  // MARK READ
  const markRead = (id) => {

    setNotifications(prev =>

      prev.map(n =>

        n.id === id
          ? { ...n, read: true }
          : n
      )
    )
  }

  // MARK ALL READ
  const markAllRead = () => {

    setNotifications(prev =>

      prev.map(n => ({
        ...n,
        read: true
      }))
    )
  }

  // REMOVE NOTIFICATION
  const removeNotification = (id) => {

    setNotifications(prev =>

      prev.filter(n => n.id !== id)
    )
  }

  const unread =
    notifications.filter(n => !n.read).length

  return (

    <div className="max-w-2xl mx-auto space-y-5">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            Notifications
          </h1>

          <p className="text-slate-500 text-sm mt-0.5">

            {unread} unread notification
            {unread !== 1 ? 's' : ''}

          </p>

        </div>

        {unread > 0 && (

          <button
            onClick={markAllRead}
            className="btn-ghost text-sm flex items-center gap-1.5"
          >

            <CheckCheck size={15} />

            Mark all read

          </button>
        )}

      </div>

      {/* NOTIFICATIONS */}

      <div className="space-y-2">

        <AnimatePresence>

          {notifications.map((notif, i) => {

            const cfg =
              typeConfig[notif.type] || typeConfig.info

            return (

              <motion.div
                key={notif.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10, height: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => markRead(notif.id)}
                className={`card p-4 cursor-pointer transition-all ${
                  !notif.read
                    ? 'border-l-4 border-l-brand-500'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >

                <div className="flex items-start gap-3">

                  <div className={`p-2 rounded-xl ${cfg.bg}`}>

                    <cfg.icon
                      size={16}
                      className={cfg.color}
                    />

                  </div>

                  <div className="flex-1 min-w-0">

                    <div className="flex items-start justify-between gap-2">

                      <p className={`text-sm font-semibold ${
                        notif.read
                          ? 'text-slate-600 dark:text-slate-400'
                          : 'text-slate-900 dark:text-white'
                      }`}>

                        {notif.title}

                      </p>

                      <div className="flex items-center gap-1">

                        <span className="text-xs text-slate-400">
                          {notif.time}
                        </span>

                        <button
                          onClick={e => {

                            e.stopPropagation()

                            removeNotification(notif.id)
                          }}
                          className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-300 hover:text-red-400 transition"
                        >

                          <Trash2 size={12} />

                        </button>

                      </div>

                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">

                      {notif.message}

                    </p>

                  </div>

                  {!notif.read && (

                    <div className="w-2 h-2 rounded-full bg-brand-500 mt-1.5" />

                  )}

                </div>

              </motion.div>
            )
          })}

        </AnimatePresence>

        {notifications.length === 0 && (

          <div className="card p-16 text-center">

            <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-3xl mx-auto mb-4">

              <Bell
                size={24}
                className="text-slate-400"
              />

            </div>

            <h3 className="font-semibold text-slate-700 dark:text-slate-300 mb-1">
              All caught up!
            </h3>

            <p className="text-sm text-slate-400">
              No notifications right now.
            </p>

          </div>
        )}

      </div>

    </div>
  )
}