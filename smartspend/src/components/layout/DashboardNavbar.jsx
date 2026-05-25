import { Bell, Menu, Search } from 'lucide-react'
import { useSelector } from 'react-redux'
import ThemeToggle from '../ui/ThemeToggle'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function DashboardNavbar({ onMenuClick }) {
  const { user } = useSelector(s => s.auth)
  const { items } = useSelector(s => s.notifications)
  const unread = items.filter(n => !n.read).length
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-700/50">
      <div className="flex items-center gap-4 px-4 md:px-6 h-14">
        {/* Mobile menu */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500"
        >
          <Menu size={20} />
        </button>

        {/* Search */}
        <div className={`flex-1 max-w-md transition-all ${searchOpen ? 'flex' : 'hidden md:flex'}`}>
          <div className="relative w-full">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search expenses..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/30 text-slate-900 dark:text-white placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="flex-1 md:flex-none" />

        <div className="flex items-center gap-1">
          <button
            className="md:hidden p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500"
            onClick={() => setSearchOpen(v => !v)}
          >
            <Search size={18} />
          </button>
          <ThemeToggle />
          <Link to="/notifications" className="relative p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors">
            <Bell size={18} />
            {unread > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </Link>
          <Link to="/profile" className="ml-1 w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </Link>
        </div>
      </div>
    </header>
  )
}
