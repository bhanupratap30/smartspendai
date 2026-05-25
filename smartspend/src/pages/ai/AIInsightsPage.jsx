import { motion } from 'framer-motion'
import {
  Brain, AlertTriangle, TrendingUp, TrendingDown, Zap,
  Target, PiggyBank, BarChart2, ArrowRight, Sparkles, CheckCircle
} from 'lucide-react'
import { formatCurrency } from '../../utils/helpers'
import { Link } from 'react-router-dom'
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip } from 'recharts'
import { useState, useEffect } from 'react'

// const INSIGHTS = [
//   {
//     id: 1, type: 'warning', icon: AlertTriangle,
//     title: 'Entertainment Budget Exceeded',
//     desc: 'You\'ve spent ₹5,400 on Entertainment this month, exceeding your ₹5,000 budget by ₹400 (8%). Consider cancelling unused subscriptions.',
//     action: 'Review Budget', link: '/budget', color: 'border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-900/10',
//     iconColor: 'text-amber-500 bg-amber-100 dark:bg-amber-900/40',
//   },
//   {
//     id: 2, type: 'tip', icon: PiggyBank,
//     title: 'Savings Opportunity Detected',
//     desc: 'Based on your spending history, you can save an additional ₹8,200 per month by optimizing Food and Shopping expenses.',
//     action: 'See How', link: '/reports', color: 'border-emerald-200 dark:border-emerald-800/50 bg-emerald-50 dark:bg-emerald-900/10',
//     iconColor: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/40',
//   },
//   {
//     id: 3, type: 'prediction', icon: TrendingUp,
//     title: 'Next Month Prediction',
//     desc: 'Based on your trends, we predict total expenses of ₹52,000 next month — ₹2,800 higher than this month. Plan accordingly.',
//     action: 'View Report', link: '/reports', color: 'border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-900/10',
//     iconColor: 'text-blue-600 bg-blue-100 dark:bg-blue-900/40',
//   },
//   {
//     id: 4, type: 'tip', icon: Target,
//     title: 'Smart Budget Suggestion',
//     desc: 'Your Food expenses have been consistently 12% over budget for 3 months. Consider increasing your Food budget to ₹22,000.',
//     action: 'Adjust Budget', link: '/budget', color: 'border-violet-200 dark:border-violet-800/50 bg-violet-50 dark:bg-violet-900/10',
//     iconColor: 'text-violet-600 bg-violet-100 dark:bg-violet-900/40',
//   },
//   {
//     id: 5, type: 'positive', icon: CheckCircle,
//     title: 'Great Savings Rate!',
//     desc: 'Your savings rate of 42% this month is excellent! You\'re well above the recommended 20%. Keep it up to hit your annual goal.',
//     action: null, link: null, color: 'border-teal-200 dark:border-teal-800/50 bg-teal-50 dark:bg-teal-900/10',
//     iconColor: 'text-teal-600 bg-teal-100 dark:bg-teal-900/40',
//   },
//   {
//     id: 6, type: 'tip', icon: Zap,
//     title: 'Unusual Spending Pattern',
//     desc: 'Your Shopping spending on weekends is 3x higher than weekdays. Consider making a shopping list to avoid impulse purchases.',
//     action: 'View Analytics', link: '/analytics', color: 'border-pink-200 dark:border-pink-800/50 bg-pink-50 dark:bg-pink-900/10',
//     iconColor: 'text-pink-600 bg-pink-100 dark:bg-pink-900/40',
//   },
// ]

// const SCORE_DATA = [
//   { name: 'Score', value: 78, fill: '#6366f1' },
// ]

// const METRICS = [
//   { label: 'Savings Rate', value: '42%', benchmark: '20%', good: true },
//   { label: 'Budget Adherence', value: '87%', benchmark: '80%', good: true },
//   { label: 'Expense Growth', value: '+5.1%', benchmark: '<10%', good: true },
//   { label: 'Overspent Categories', value: '1 / 5', benchmark: '0', good: false },
//   { label: 'Emergency Fund', value: '3 months', benchmark: '6 months', good: false },
//   { label: 'Investment Ratio', value: '10%', benchmark: '15%', good: false },
// ]

// const PREDICTIONS = [
//   { month: 'Jun', predicted: 51200, confidence: 'High' },
//   { month: 'Jul', predicted: 48500, confidence: 'Medium' },
//   { month: 'Aug', predicted: 55000, confidence: 'Low' },
// ]

export default function AIInsightsPage() {
  const [aiData, setAiData] = useState('')
  useEffect(() => {
    fetchAIInsights()
  }, [])

  const fetchAIInsights = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/ai/insights')
      const data = await res.text()
      setAiData(data)
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">AI Insights</h1>
          <span className="badge bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 flex items-center gap-1">
            <Sparkles size={11} /> Powered by AI
          </span>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Personalized financial intelligence based on your spending patterns</p>
      </div>

      {/* Financial score + metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Score */}
        <div className="card p-5 flex flex-col items-center justify-center bg-gradient-to-br from-brand-50 to-violet-50 dark:from-brand-900/20 dark:to-violet-900/20 border-brand-200 dark:border-brand-700/50">
          <p className="text-sm font-semibold text-brand-700 dark:text-brand-300 mb-2 flex items-center gap-1.5">
            <Brain size={15} /> Financial Health Score
          </p>
          <div className="relative w-36 h-36">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart cx="50%" cy="50%" innerRadius="65%" outerRadius="90%" barSize={10} data={[
                {
                  name: 'Score',
                  value: 78,
                  fill: '#6366f1'
                }
              ]} startAngle={90} endAngle={-270}>
                <RadialBar background={{ fill: '#e2e8f0' }} dataKey="value" cornerRadius={10} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-4xl font-bold text-brand-600 dark:text-brand-400">{aiData ? 78 : 0}</span>
              <span className="text-xs text-slate-500">out of 100</span>
            </div>
          </div>
          <p className="text-sm font-semibold text-emerald-600 mt-2">Good Standing</p>
          <p className="text-xs text-slate-400 text-center mt-1">You're doing better than 65% of users in your income range</p>
        </div>

        {/* Metrics */}
        {/* <div className="lg:col-span-2 card p-5">
          <h2 className="font-display font-semibold text-slate-900 dark:text-white mb-4">Financial Metrics</h2>
          <div className="grid grid-cols-2 gap-3">
            {METRICS.map((m) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-3 rounded-xl border ${m.good
                    ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800/40'
                    : 'bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800/40'
                  }`}
              >
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">{m.label}</p>
                <p className={`font-display text-xl font-bold ${m.good ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                  {m.value}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">Benchmark: {m.benchmark}</p>
              </motion.div>
            ))}
          </div>
        </div> */}
      </div>

      {/* Predictions */}
      {/* <div className="card p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/30">
            <BarChart2 size={16} className="text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="font-display font-semibold text-slate-900 dark:text-white">Expense Predictions</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PREDICTIONS.map((p, i) => (
            <motion.div
              key={p.month}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-50 dark:bg-slate-700/40 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-slate-700 dark:text-slate-300">{p.month} 2025</span>
                <span className={`badge text-xs ${p.confidence === 'High' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                    : p.confidence === 'Medium' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                      : 'bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-400'
                  }`}>{p.confidence} confidence</span>
              </div>
              <p className="font-display text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(p.predicted)}</p>
              <p className="text-xs text-slate-400 mt-1">Predicted total expenses</p>
            </motion.div>
          ))}
        </div>
      </div> */}

      {/* Insight cards */}
      <div>
        <h2 className="font-display font-semibold text-slate-900 dark:text-white mb-4">Smart Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* {INSIGHTS.map((insight, i) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`rounded-2xl border p-5 ${insight.color}`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2.5 rounded-xl flex-shrink-0 ${insight.iconColor}`}>
                  <insight.icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">{insight.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{insight.desc}</p>
                  {insight.action && insight.link && (
                    <Link
                      to={insight.link}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400 mt-2 hover:gap-1.5 transition-all"
                    >
                      {insight.action} <ArrowRight size={12} />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))} */}
          <div className="card p-5">
            {/* <pre className="whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300">
              {aiData}
            </pre> */}
            <div className="rounded-2xl bg-slate-50 dark:bg-slate-800 p-5 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="text-violet-500" size={20} />
                <h3 className="font-semibold text-lg text-slate-900 dark:text-white">
                  AI Financial Analysis
                </h3>
              </div>

              <div className="whitespace-pre-wrap text-sm leading-7 text-slate-700 dark:text-slate-300">
                {aiData || 'Generating AI insights...'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Smart savings tip */}
      <div className="card p-6 bg-gradient-to-br from-violet-600 to-brand-700 border-0 text-white">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-white/10 backdrop-blur flex-shrink-0">
            <Sparkles size={24} className="text-white" />
          </div>
          <div>
            <h3 className="font-display font-bold text-xl mb-2">Monthly AI Summary</h3>
            {/* <p className="text-violet-100 text-sm leading-relaxed mb-4">
              You've spent <strong className="text-white">₹49,200</strong> this month, which is 57.9% of your income.
              Your top spending category is <strong className="text-white">Food</strong> at ₹18,500.
              If you reduce dining out by 30%, you could save an additional <strong className="text-white">₹2,775/month</strong> — that's <strong className="text-white">₹33,300/year</strong>.
            </p>
            <Link to="/reports" className="inline-flex items-center gap-2 bg-white text-brand-700 font-semibold text-sm px-4 py-2 rounded-xl hover:bg-brand-50 transition">
              View Full Report <ArrowRight size={14} />
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  )
}
