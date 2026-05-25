import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Check, X, ChevronRight } from 'lucide-react'
import { PRICING_PLANS } from '../../data/mockData'
import { useState } from 'react'

export default function PricingPage() {
  const [annual, setAnnual] = useState(false)

  return (
    <div>
      <section className="py-24 bg-gradient-to-br from-slate-50 to-brand-50/20 dark:from-slate-900 dark:to-slate-900">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Simple, transparent pricing
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 mb-8 max-w-xl mx-auto">
              Start free. Upgrade when you're ready. No hidden fees, no surprises.
            </p>
            {/* Toggle */}
            <div className="inline-flex items-center gap-3 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button onClick={() => setAnnual(false)} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${!annual ? 'bg-white dark:bg-slate-700 shadow text-slate-900 dark:text-white' : 'text-slate-500'}`}>Monthly</button>
              <button onClick={() => setAnnual(true)} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition flex items-center gap-1.5 ${annual ? 'bg-white dark:bg-slate-700 shadow text-slate-900 dark:text-white' : 'text-slate-500'}`}>
                Annual
                <span className="badge bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs">Save 20%</span>
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {PRICING_PLANS.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`card p-6 relative text-left ${plan.popular ? 'border-brand-300 dark:border-brand-600 ring-2 ring-brand-500/20 scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-1">{plan.name}</h3>
                <p className="text-slate-400 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="font-display text-4xl font-bold text-slate-900 dark:text-white">
                    {plan.price === 0 ? 'Free' : `₹${annual ? Math.floor(plan.price * 0.8) : plan.price}`}
                  </span>
                  {plan.price > 0 && <span className="text-slate-400 text-sm">/{plan.period}</span>}
                </div>
                {annual && plan.price > 0 && (
                  <p className="text-xs text-emerald-500 mb-4">Save ₹{plan.price * 12 - Math.floor(plan.price * 0.8) * 12}/year</p>
                )}

                <ul className="space-y-2.5 mb-6 mt-4">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <Check size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                  {plan.notIncluded.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-400">
                      <X size={14} className="text-slate-300 dark:text-slate-600 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/register"
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium text-sm transition ${
                    plan.popular ? 'btn-primary' : 'btn-secondary'
                  }`}
                >
                  {plan.cta} <ChevronRight size={15} />
                </Link>
              </motion.div>
            ))}
          </div>

          <p className="text-sm text-slate-400 mt-8">All plans include a 14-day free trial. No credit card required.</p>
        </div>
      </section>
    </div>
  )
}
