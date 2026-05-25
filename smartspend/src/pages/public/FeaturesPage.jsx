import { motion } from 'framer-motion'
import { Brain, BarChart3, Target, Shield, Zap, FileText, Bell, Smartphone, Link as LinkIcon } from 'lucide-react'

const FEATURES = [
  { icon: Brain, title: 'AI-Powered Insights', desc: 'Our machine learning model analyzes thousands of data points to give you insights no spreadsheet ever could. From spending patterns to future predictions, AI does the heavy lifting.', color: 'from-violet-500 to-purple-600', badge: 'AI' },
  { icon: BarChart3, title: 'Advanced Analytics', desc: 'Interactive charts, heatmaps, and detailed breakdowns give you a 360° view of your financial health. Switch between daily, weekly, monthly, and yearly views.', color: 'from-blue-500 to-cyan-500', badge: 'Popular' },
  { icon: Target, title: 'Smart Budget Planner', desc: 'Set budgets per category and get real-time alerts before you overspend. AI automatically suggests optimal budget limits based on your history.', color: 'from-brand-500 to-indigo-600', badge: 'New' },
  { icon: Bell, title: 'Smart Notifications', desc: 'Customizable alerts for budget limits, unusual spending, monthly summaries, and AI insights. Stay informed without being overwhelmed.', color: 'from-amber-500 to-orange-500', badge: null },
  { icon: FileText, title: 'Comprehensive Reports', desc: 'Generate detailed PDF and CSV reports for any time period. Perfect for tax season, financial reviews, or sharing with your accountant.', color: 'from-emerald-500 to-teal-600', badge: null },
  { icon: Shield, title: 'Bank-grade Security', desc: 'AES-256 encryption, zero-knowledge architecture, and SOC 2 compliance ensure your financial data is always protected.', color: 'from-red-500 to-rose-600', badge: null },
  { icon: Smartphone, title: 'Mobile-First Design', desc: 'A fully responsive web app that works perfectly on any device. Add expenses on the go from your phone or tablet.', color: 'from-pink-500 to-rose-500', badge: 'Responsive' },
  { icon: Zap, title: 'Instant Sync', desc: 'Real-time updates across all your devices. Add an expense on your phone and see it reflected everywhere instantly.', color: 'from-yellow-500 to-amber-600', badge: null },
]

export default function FeaturesPage() {
  return (
    <div>
      <section className="py-24 bg-gradient-to-br from-slate-50 to-brand-50/30 dark:from-slate-900 dark:to-slate-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Every feature you need to<br /><span className="gradient-text">master your money</span>
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              SmartSpend AI packs enterprise-grade financial tools into a beautiful, easy-to-use interface.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="card-hover p-6 flex gap-4"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center flex-shrink-0`}>
                  <f.icon size={22} className="text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white">{f.title}</h3>
                    {f.badge && (
                      <span className="badge bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 text-xs">{f.badge}</span>
                    )}
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
