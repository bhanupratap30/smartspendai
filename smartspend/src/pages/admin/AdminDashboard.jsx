import { useEffect, useState } from 'react'

import { motion } from 'framer-motion'

import {
  Users,
  Activity,
  Shield,
  AlertTriangle
} from 'lucide-react'

import api from '../../services/api'

export default function AdminDashboard() {

  const [stats, setStats] = useState(null)

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState(null)

  // FETCH DASHBOARD STATS
  const fetchStats = async () => {

    try {

      setLoading(true)

      const data = await api.get('/admin/stats')

      console.log('Dashboard Stats:', data)

      setStats(data)

    } catch (err) {

      console.log(err)

      setError('Failed to load dashboard stats')

    } finally {

      setLoading(false)
    }
  }

  useEffect(() => {

    fetchStats()

  }, [])

  // LOADING UI
  if (loading) {

    return (

      <div className="flex items-center justify-center py-20">

        <div className="text-center">

          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-slate-500">
            Loading dashboard...
          </p>

        </div>

      </div>
    )
  }

  // ERROR UI
  if (error) {

    return (

      <div className="bg-red-100 text-red-600 p-4 rounded-xl">

        {error}

      </div>
    )
  }

  // NO DATA
  if (!stats) {

    return (

      <div className="text-center py-10 text-slate-500">

        No dashboard data found

      </div>
    )
  }

  // REAL STATS
  const ADMIN_STATS = [

    {
      label: 'Total Users',
      value: stats.totalUsers || 0,
      change: 'Registered users',
      icon: Users,
      color: 'from-blue-500 to-blue-700'
    },

    {
      label: 'Active Users',
      value: stats.activeUsers || 0,
      change: 'Currently active',
      icon: Activity,
      color: 'from-emerald-500 to-emerald-700'
    },

    {
      label: 'Admins',
      value: stats.adminUsers || 0,
      change: 'Admin accounts',
      icon: Shield,
      color: 'from-violet-500 to-violet-700'
    },

    {
      label: 'Suspended Users',
      value: stats.suspendedUsers || 0,
      change: 'Blocked accounts',
      icon: AlertTriangle,
      color: 'from-amber-500 to-amber-700'
    }
  ]

  return (

    <div className="space-y-6 p-4">

      {/* HEADER */}
      <div className="flex items-center gap-3">

        <div className="p-3 rounded-xl bg-red-100 dark:bg-red-900/30">

          <Shield
            size={24}
            className="text-red-500"
          />

        </div>

        <div>

          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">

            Admin Dashboard

          </h1>

          <p className="text-slate-500 text-sm">

            System-wide overview and management

          </p>

        </div>

      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        {ADMIN_STATS.map((s, i) => (

          <motion.div
            key={s.label}

            initial={{ opacity: 0, y: 10 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ delay: i * 0.05 }}

            className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-5 border border-slate-200 dark:border-slate-700"
          >

            <div className="flex items-center justify-between mb-4">

              <div>

                <p className="text-sm text-slate-500">
                  {s.label}
                </p>

                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
                  {s.value}
                </h2>

              </div>

              <div className={`p-3 rounded-xl bg-gradient-to-br ${s.color}`}>

                <s.icon
                  size={20}
                  className="text-white"
                />

              </div>

            </div>

            <p className="text-xs text-slate-400">

              {s.change}

            </p>

          </motion.div>
        ))}

      </div>

      {/* SYSTEM STATUS */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-md p-5 border border-slate-200 dark:border-slate-700">

        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-5">

          System Status

        </h2>

        <div className="space-y-4">

          <div className="flex items-center justify-between">

            <span className="text-sm text-slate-600 dark:text-slate-300">

              Backend Status

            </span>

            <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">

              Online

            </span>

          </div>

          <div className="flex items-center justify-between">

            <span className="text-sm text-slate-600 dark:text-slate-300">

              MongoDB Connection

            </span>

            <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">

              Connected

            </span>

          </div>

          <div className="flex items-center justify-between">

            <span className="text-sm text-slate-600 dark:text-slate-300">

              Authentication

            </span>

            <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">

              Active

            </span>

          </div>

        </div>

      </div>

    </div>
  )
}