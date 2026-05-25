import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import ThemeToggle from '../components/ui/ThemeToggle'

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      {/* Left panel - decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-brand-600 via-brand-700 to-purple-800 relative overflow-hidden flex-col items-center justify-center p-12">
        <div className="absolute inset-0 mesh-bg opacity-30" />
        <div className="absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-purple-400/10 rounded-full blur-2xl animate-float" />

        <div className="relative z-10 max-w-md text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center mx-auto mb-6">
            <Sparkles size={32} className="text-white" />
          </div>
          <h1 className="font-display text-4xl font-bold text-white mb-4">
            Track smarter,<br />save better.
          </h1>
          <p className="text-brand-200 text-lg leading-relaxed">
            SmartSpend AI uses machine learning to analyze your spending, predict trends, and help you reach your financial goals faster.
          </p>

          <div className="mt-12 grid grid-cols-3 gap-4 text-center">
            {[
              { value: '50K+', label: 'Active Users' },
              { value: '₹2Cr+', label: 'Tracked Monthly' },
              { value: '94%', label: 'Satisfaction' },
            ].map(stat => (
              <div key={stat.label} className="bg-white/10 rounded-2xl p-4">
                <div className="font-display text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-brand-200 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between p-4 md:p-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center lg:hidden">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="font-display font-bold text-lg text-slate-900 dark:text-white lg:hidden">
              SmartSpend<span className="text-brand-500"> AI</span>
            </span>
          </Link>
          <ThemeToggle />
        </div>
        <div className="flex-1 flex items-center justify-center p-4 md:p-8">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
