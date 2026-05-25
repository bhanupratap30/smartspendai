import { motion } from 'framer-motion'
import { Sparkles, Target, Shield, Zap, Heart } from 'lucide-react'

const TEAM = [
  { name: 'Aditya Verma', role: 'CEO & Co-founder', avatar: 'AV', bio: 'Ex-Goldman Sachs. Fintech enthusiast building the future of personal finance.' },
  { name: 'Simran Kaur', role: 'CTO & Co-founder', avatar: 'SK', bio: '10+ years in ML and fintech. Previously led AI teams at Paytm.' },
  { name: 'Rohan Joshi', role: 'Head of Product', avatar: 'RJ', bio: 'Product veteran from CRED and Razorpay. Obsessed with great UX.' },
  { name: 'Meera Nair', role: 'Head of Design', avatar: 'MN', bio: 'Award-winning designer with a passion for making finance accessible.' },
]

export default function AboutPage() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-brand-50 to-purple-50 dark:from-slate-900 dark:to-slate-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <Heart size={14} /> Our Story
            </div>
            <h1 className="font-display text-5xl font-bold text-slate-900 dark:text-white mb-6">
              We believe everyone deserves<br />
              <span className="gradient-text">financial clarity.</span>
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              SmartSpend AI was founded in 2024 by a team of fintech veterans who were frustrated by complex, outdated expense tracking tools. We set out to build something different — a platform powered by AI that actually helps you understand your money.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="section-title text-center mb-12">What we stand for</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Target, title: 'Simplicity First', desc: 'Complex finance made beautifully simple for everyone.', color: 'from-brand-400 to-brand-600' },
              { icon: Shield, title: 'Privacy by Default', desc: 'Your financial data is yours. We never sell it.', color: 'from-emerald-400 to-emerald-600' },
              { icon: Zap, title: 'AI-Powered', desc: 'Machine learning that learns your unique patterns.', color: 'from-amber-400 to-amber-600' },
              { icon: Heart, title: 'User-First', desc: 'Every decision is made with our users in mind.', color: 'from-rose-400 to-rose-600' },
            ].map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="card p-5 text-center">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center mx-auto mb-3`}>
                  <v.icon size={22} className="text-white" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{v.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/30">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="section-title text-center mb-12">Meet the team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TEAM.map((m, i) => (
              <motion.div key={m.name} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="card p-5 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-400 to-purple-500 flex items-center justify-center text-white text-xl font-bold mx-auto mb-3">
                  {m.avatar}
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white">{m.name}</h3>
                <p className="text-xs text-brand-500 font-medium mb-2">{m.role}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{m.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
