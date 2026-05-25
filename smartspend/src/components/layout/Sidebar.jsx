import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  CreditCard,
  PlusCircle,
  TrendingUp,
  BarChart3,
  Brain,
  FileText,
  Bell,
  Settings,
  User,
  LogOut,
  DollarSign,
  Target,
  ChevronLeft,
  Sparkles,
  X,
  Shield,
  Users
} from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../store/slices/authSlice'

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Expenses', path: '/expenses', icon: CreditCard },
  { label: 'Add Expense', path: '/expenses/add', icon: PlusCircle },
  { label: 'Income', path: '/income', icon: DollarSign },
  { label: 'Analytics', path: '/analytics', icon: BarChart3 },
  { label: 'Budget Planner', path: '/budget', icon: Target },
  { label: 'AI Insights', path: '/ai-insights', icon: Brain },
  { label: 'Reports', path: '/reports', icon: FileText },
    // ADMIN ROUTES
  { label: 'Admin Dashboard', path: '/admin', icon: Shield },
  { label: 'Manage Users', path: '/admin/users', icon: Users },
]

const BOTTOM_ITEMS = [
  { label: 'Notifications', path: '/notifications', icon: Bell },
  { label: 'Settings', path: '/settings', icon: Settings },
  { label: 'Profile', path: '/profile', icon: User },
]

function NavItem({ item, collapsed, onClick }) {
  return (
    <NavLink
      to={item.path}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${isActive
          ? 'bg-brand-600 text-white shadow-glow-sm'
          : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/60 hover:text-slate-900 dark:hover:text-white'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <item.icon size={18} className="flex-shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="text-sm font-medium whitespace-nowrap overflow-hidden"
              >
                {item.label}
              </motion.span>
            )}
          </AnimatePresence>
          {collapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-slate-900 dark:bg-slate-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
              {item.label}
            </div>
          )}
        </>
      )}
    </NavLink>
  )
}

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector(s => s.auth)
  // const { items: notifications } = useSelector(s => s.notifications)
  const [notifications, setNotifications] = React.useState([])
  // LOAD NOTIFICATIONS
  React.useEffect(() => {

    const loadNotifications = () => {

      const saved = localStorage.getItem(
        'smartspend_notifications'
      )

      if (saved) {

        setNotifications(JSON.parse(saved))
      }
    }

    // INITIAL LOAD
    loadNotifications()

    // REAL TIME UPDATE
    window.addEventListener(
      'storage',
      loadNotifications
    )

    return () => {

      window.removeEventListener(
        'storage',
        loadNotifications
      )
    }

  }, [])
  const unread = notifications.filter(n => !n.read).length

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/login')
  }

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center gap-3 p-4 mb-2 ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center flex-shrink-0">
          <Sparkles size={18} className="text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-display font-bold text-lg text-slate-900 dark:text-white whitespace-nowrap"
            >
              SmartSpend<span className="text-brand-500"> AI</span>
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        <p className={`px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider ${collapsed ? 'text-center' : ''}`}>
          {collapsed ? '•' : 'Main'}
        </p>
{NAV_ITEMS
  .filter(item => {

    // SHOW ADMIN ROUTES ONLY TO ADMIN USERS
    if (item.path.startsWith('/admin')) {

      return user?.role === 'ADMIN'
    }

    return true
  })

  .map(item => (

    <NavItem
      key={item.path}
      item={item}
      collapsed={collapsed}
      onClick={onMobileClose}
    />

  ))}

        <div className="pt-4">
          <p className={`px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider ${collapsed ? 'text-center' : ''}`}>
            {collapsed ? '•' : 'Account'}
          </p>
          {BOTTOM_ITEMS.map(item => (
            <div key={item.path} className="relative">
              <NavItem item={item} collapsed={collapsed} onClick={onMobileClose} />
              {item.label === 'Notifications' && unread > 0 && (
                <span className="
  absolute
  -top-1
  -right-1
  min-w-[18px]
  h-[18px]
  px-1
  bg-red-500
  text-white
  text-[10px]
  rounded-full
  flex
  items-center
  justify-center
  font-semibold
  shadow-md
"
                >
                  {unread}
                </span>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* User + logout */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-700/50">
        {!collapsed && (
          <div className="flex items-center gap-3 px-2 py-2 mb-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-slate-400 truncate">{user?.email || 'user@example.com'}</p>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-slate-500 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-all ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut size={18} className="flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 64 : 240 }}
        transition={{ type: 'spring', damping: 20, stiffness: 180 }}
        className="hidden lg:flex flex-col h-screen sticky top-0 bg-white dark:bg-slate-800 border-r border-slate-100 dark:border-slate-700/50 overflow-hidden z-30"
      >
        {sidebarContent}
        <button
          onClick={onToggle}
          className="absolute top-4 -right-3 w-6 h-6 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 transition shadow-sm"
        >
          <motion.div animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronLeft size={12} />
          </motion.div>
        </button>
      </motion.aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-slate-800 z-50 lg:hidden shadow-2xl"
            >
              <button onClick={onMobileClose} className="absolute top-4 right-4 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">
                <X size={18} className="text-slate-500" />
              </button>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
