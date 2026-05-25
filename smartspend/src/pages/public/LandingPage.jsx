import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Brain, BarChart3, Shield, Zap, TrendingUp, Target,
  ChevronRight, Star, Check, ArrowRight, Sparkles
} from 'lucide-react'
import { TESTIMONIALS, PRICING_PLANS, FAQS, MOCK_MONTHLY_DATA } from '../../data/mockData'
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { useState } from 'react'

function Section({ children, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const FEATURES = [
  { icon: Brain, title: 'AI-Powered Insights', desc: 'Machine learning analyzes your spending patterns and gives personalized recommendations.', color: 'from-violet-500 to-purple-600' },
  { icon: BarChart3, title: 'Real-time Analytics', desc: 'Beautiful charts and dashboards that update instantly as you add expenses.', color: 'from-blue-500 to-cyan-600' },
  { icon: Target, title: 'Smart Budgeting', desc: 'Set budgets per category and get alerted before you overspend.', color: 'from-brand-500 to-indigo-600' },
  { icon: Shield, title: 'Bank-grade Security', desc: 'AES-256 encryption and zero-knowledge architecture keeps your data safe.', color: 'from-emerald-500 to-teal-600' },
  { icon: Zap, title: 'Instant Predictions', desc: 'See what your finances will look like next month before it happens.', color: 'from-amber-500 to-orange-600' },
  { icon: TrendingUp, title: 'Savings Tracker', desc: 'Visual progress towards your savings goals with AI-powered nudges.', color: 'from-pink-500 to-rose-600' },
]

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-8 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-brand-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-700 text-brand-700 dark:text-brand-300 rounded-full px-4 py-1.5 text-sm font-medium mb-6"
          >
            <Sparkles size={14} />
            AI-Powered Expense Intelligence
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight"
          >
            Your money,<br />
            <span className="gradient-text">intelligently managed.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            SmartSpend AI tracks your expenses, analyzes patterns with AI, and gives you actionable insights to save more every month.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link to="/register" className="btn-primary text-base px-7 py-3 shadow-glow">
              Start for Free <ArrowRight size={18} />
            </Link>
            <Link to="/features" className="btn-secondary text-base px-7 py-3">
              See Features
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-slate-400 mt-4"
          >
            No credit card required · Free forever plan available
          </motion.p>

          {/* Dashboard preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-14 relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-b from-transparent to-white dark:to-slate-900 bottom-0 top-auto h-24 z-10 pointer-events-none" />
            <div className="glass rounded-2xl p-4 md:p-6 shadow-2xl border border-white/30 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="ml-2 text-xs text-slate-400 font-mono">SmartSpend AI — Dashboard</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                {[
                  { label: 'Balance', val: '₹1,24,500', up: true },
                  { label: 'Income', val: '₹85,000', up: true },
                  { label: 'Expenses', val: '₹49,200', up: false },
                  { label: 'Savings', val: '₹35,800', up: true },
                ].map(s => (
                  <div key={s.label} className="bg-white dark:bg-slate-800 rounded-xl p-3">
                    <p className="text-xs text-slate-400 mb-1">{s.label}</p>
                    <p className="font-display font-bold text-slate-900 dark:text-white text-sm">{s.val}</p>
                    <p className={`text-xs mt-0.5 ${s.up ? 'text-emerald-500' : 'text-red-400'}`}>{s.up ? '↑ 12%' : '↑ 8%'}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-4 h-36">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={MOCK_MONTHLY_DATA.slice(0, 6)}>
                    <defs>
                      <linearGradient id="gradIncome" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="gradExp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px', fontSize: '12px' }}
                      labelStyle={{ color: '#94a3b8' }}
                    />
                    <Area type="monotone" dataKey="income" stroke="#6366f1" fill="url(#gradIncome)" strokeWidth={2} dot={false} />
                    <Area type="monotone" dataKey="expenses" stroke="#f43f5e" fill="url(#gradExp)" strokeWidth={2} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-slate-50 dark:bg-slate-800/30">
        <div className="max-w-6xl mx-auto px-4">
          <Section className="text-center mb-14">
            <p className="text-brand-500 font-semibold text-sm uppercase tracking-wider mb-3">Features</p>
            <h2 className="section-title mb-4">Everything you need to master your money</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">Powerful tools backed by AI to help you understand, manage, and grow your finances.</p>
          </Section>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <Section key={f.title}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="card-hover p-6"
                >
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4`}>
                    <f.icon size={22} className="text-white" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white mb-2">{f.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4">
          <Section className="text-center mb-14">
            <p className="text-brand-500 font-semibold text-sm uppercase tracking-wider mb-3">Testimonials</p>
            <h2 className="section-title mb-4">Loved by thousands of users</h2>
          </Section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <Section key={t.name}>
                <div className="card p-5 h-full flex flex-col">
                  <div className="flex mb-3">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed flex-1 mb-4">"{t.text}"</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{t.name}</p>
                      <p className="text-xs text-slate-400">{t.role}</p>
                    </div>
                  </div>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-slate-50 dark:bg-slate-800/30">
        <div className="max-w-5xl mx-auto px-4">
          <Section className="text-center mb-14">
            <p className="text-brand-500 font-semibold text-sm uppercase tracking-wider mb-3">Pricing</p>
            <h2 className="section-title mb-4">Simple, transparent pricing</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto">Start free, upgrade when you're ready. No hidden fees.</p>
          </Section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING_PLANS.map((plan) => (
              <Section key={plan.id}>
                <div className={`card p-6 relative ${plan.popular ? 'border-brand-300 dark:border-brand-600 ring-2 ring-brand-500/30' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}
                  <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-1">{plan.name}</h3>
                  <p className="text-slate-400 text-sm mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="font-display text-4xl font-bold text-slate-900 dark:text-white">
                      {plan.price === 0 ? 'Free' : `₹${plan.price}`}
                    </span>
                    {plan.price > 0 && <span className="text-slate-400 text-sm">/{plan.period}</span>}
                  </div>
                  <ul className="space-y-2.5 mb-6">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <Check size={15} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/register"
                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium text-sm transition ${
                      plan.popular
                        ? 'btn-primary'
                        : 'btn-secondary'
                    }`}
                  >
                    {plan.cta} <ChevronRight size={15} />
                  </Link>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="max-w-2xl mx-auto px-4">
          <Section className="text-center mb-14">
            <h2 className="section-title mb-4">Frequently asked questions</h2>
          </Section>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <Section key={i}>
                <div className="card overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-medium text-slate-900 dark:text-white">{faq.q}</span>
                    <motion.span
                      animate={{ rotate: openFaq === i ? 45 : 0 }}
                      className="text-slate-400 flex-shrink-0 ml-4"
                    >
                      <ChevronRight size={18} />
                    </motion.span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{faq.a}</p>
                  </motion.div>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-brand-600 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg opacity-20" />
        <Section className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to take control of your finances?
          </h2>
          <p className="text-brand-200 text-lg mb-8">Join 50,000+ users who trust SmartSpend AI to manage their money smarter.</p>
          <Link to="/register" className="inline-flex items-center gap-2 bg-white text-brand-700 font-semibold px-8 py-3.5 rounded-xl hover:bg-brand-50 transition shadow-lg">
            Get Started Free <ArrowRight size={18} />
          </Link>
        </Section>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center">
                  <Sparkles size={16} className="text-white" />
                </div>
                <span className="font-display font-bold text-white">SmartSpend AI</span>
              </div>
              <p className="text-sm max-w-xs leading-relaxed">AI-powered expense tracking for the modern generation.</p>
            </div>
            <div className="flex gap-12">
              {[
                { title: 'Product', links: ['Features', 'Pricing', 'About'] },
                { title: 'Legal', links: ['Privacy', 'Terms', 'Security'] },
              ].map(col => (
                <div key={col.title}>
                  <h4 className="text-white font-semibold text-sm mb-3">{col.title}</h4>
                  <ul className="space-y-2">
                    {col.links.map(l => (
                      <li key={l}><Link to="/" className="text-sm hover:text-white transition">{l}</Link></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 text-sm text-center">
            © 2025 SmartSpend AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
