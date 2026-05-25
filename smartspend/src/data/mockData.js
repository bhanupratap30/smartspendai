export const CATEGORIES = [
  { id: 'food', label: 'Food & Dining', color: '#f59e0b', bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-400', icon: '🍕' },
  { id: 'travel', label: 'Travel', color: '#6366f1', bg: 'bg-indigo-100 dark:bg-indigo-900/30', text: 'text-indigo-700 dark:text-indigo-400', icon: '✈️' },
  { id: 'shopping', label: 'Shopping', color: '#ec4899', bg: 'bg-pink-100 dark:bg-pink-900/30', text: 'text-pink-700 dark:text-pink-400', icon: '🛍️' },
  { id: 'bills', label: 'Bills & Utilities', color: '#ef4444', bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', icon: '🧾' },
  { id: 'entertainment', label: 'Entertainment', color: '#8b5cf6', bg: 'bg-violet-100 dark:bg-violet-900/30', text: 'text-violet-700 dark:text-violet-400', icon: '🎬' },
  { id: 'health', label: 'Health & Medical', color: '#10b981', bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-400', icon: '🏥' },
  { id: 'education', label: 'Education', color: '#3b82f6', bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', icon: '📚' },
  { id: 'investment', label: 'Investment', color: '#14b8a6', bg: 'bg-teal-100 dark:bg-teal-900/30', text: 'text-teal-700 dark:text-teal-400', icon: '📈' },
  { id: 'others', label: 'Others', color: '#94a3b8', bg: 'bg-slate-100 dark:bg-slate-700/50', text: 'text-slate-600 dark:text-slate-400', icon: '📦' },
]

export const MOCK_EXPENSES = [
  { id: 1, title: 'Grocery Shopping', amount: 2450, category: 'food', date: '2025-05-01', notes: 'Weekly groceries', tags: ['essential'] },
  { id: 2, title: 'Netflix Subscription', amount: 649, category: 'entertainment', date: '2025-05-02', notes: '', tags: ['subscription'] },
  { id: 3, title: 'Electricity Bill', amount: 1850, category: 'bills', date: '2025-05-03', notes: 'Monthly bill', tags: ['utility'] },
  { id: 4, title: 'Gym Membership', amount: 1200, category: 'health', date: '2025-05-04', notes: '', tags: ['fitness'] },
  { id: 5, title: 'Online Course - React', amount: 2999, category: 'education', date: '2025-05-05', notes: 'Udemy course', tags: ['learning'] },
  { id: 6, title: 'Uber Ride', amount: 350, category: 'travel', date: '2025-05-06', notes: '', tags: [] },
  { id: 7, title: 'Amazon Shopping', amount: 3200, category: 'shopping', date: '2025-05-07', notes: 'Electronics', tags: ['gadget'] },
  { id: 8, title: 'Restaurant Dinner', amount: 1850, category: 'food', date: '2025-05-08', notes: 'Family dinner', tags: ['dining'] },
  { id: 9, title: 'Mutual Fund SIP', amount: 5000, category: 'investment', date: '2025-05-09', notes: 'Monthly SIP', tags: ['savings'] },
  { id: 10, title: 'Internet Bill', amount: 999, category: 'bills', date: '2025-05-10', notes: '', tags: ['utility'] },
]

export const MOCK_MONTHLY_DATA = [
  { month: 'Jan', income: 85000, expenses: 42000, savings: 43000 },
  { month: 'Feb', income: 85000, expenses: 38500, savings: 46500 },
  { month: 'Mar', income: 92000, expenses: 51000, savings: 41000 },
  { month: 'Apr', income: 85000, expenses: 44000, savings: 41000 },
  { month: 'May', income: 96000, expenses: 49500, savings: 46500 },
  { month: 'Jun', income: 85000, expenses: 36000, savings: 49000 },
  { month: 'Jul', income: 88000, expenses: 53000, savings: 35000 },
  { month: 'Aug', income: 91000, expenses: 47000, savings: 44000 },
  { month: 'Sep', income: 85000, expenses: 40500, savings: 44500 },
  { month: 'Oct', income: 95000, expenses: 55000, savings: 40000 },
  { month: 'Nov', income: 85000, expenses: 43000, savings: 42000 },
  { month: 'Dec', income: 110000, expenses: 72000, savings: 38000 },
]

export const MOCK_CATEGORY_DATA = [
  { name: 'Food', value: 18500, color: '#f59e0b' },
  { name: 'Bills', value: 12400, color: '#ef4444' },
  { name: 'Shopping', value: 9800, color: '#ec4899' },
  { name: 'Travel', value: 7200, color: '#6366f1' },
  { name: 'Entertainment', value: 5400, color: '#8b5cf6' },
  { name: 'Health', value: 3600, color: '#10b981' },
  { name: 'Education', value: 3200, color: '#3b82f6' },
  { name: 'Investment', value: 10000, color: '#14b8a6' },
]

export const MOCK_WEEKLY_DATA = [
  { day: 'Mon', amount: 2800 },
  { day: 'Tue', amount: 1200 },
  { day: 'Wed', amount: 3400 },
  { day: 'Thu', amount: 900 },
  { day: 'Fri', amount: 5200 },
  { day: 'Sat', amount: 4100 },
  { day: 'Sun', amount: 1800 },
]

export const MOCK_BUDGETS = [
  { id: 1, category: 'food', limit: 20000, spent: 18500 },
  { id: 2, category: 'shopping', limit: 10000, spent: 9800 },
  { id: 3, category: 'entertainment', limit: 5000, spent: 5400 },
  { id: 4, category: 'travel', limit: 8000, spent: 7200 },
  { id: 5, category: 'health', limit: 5000, spent: 3600 },
]

export const TESTIMONIALS = [
  { name: 'Priya Sharma', role: 'Product Manager', company: 'TechCorp', avatar: 'PS', text: 'SmartSpend AI has completely transformed how I track my finances. The AI insights are genuinely useful!', rating: 5 },
  { name: 'Rahul Gupta', role: 'Software Engineer', company: 'StartupXYZ', avatar: 'RG', text: 'The budget planner and real-time alerts saved me from overspending three months in a row. Incredible tool.', rating: 5 },
  { name: 'Anita Patel', role: 'Freelancer', company: 'Self-employed', avatar: 'AP', text: 'Finally an expense tracker that understands patterns. The monthly predictions are scarily accurate.', rating: 5 },
  { name: 'Vikram Singh', role: 'Finance Analyst', company: 'FinanceHub', avatar: 'VS', text: 'Beautiful UI, powerful analytics. I recommend SmartSpend to everyone on my team.', rating: 5 },
]

export const PRICING_PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'Perfect for getting started',
    features: ['Up to 50 transactions/month', 'Basic analytics', 'Manual expense entry', '2 budget categories', 'Email support'],
    notIncluded: ['AI insights', 'Receipt scanning', 'Advanced reports', 'API access'],
    cta: 'Get Started Free',
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 299,
    period: 'month',
    description: 'For serious money managers',
    features: ['Unlimited transactions', 'AI insights & predictions', 'Receipt scanning', 'Advanced analytics', 'All budget categories', 'CSV/PDF exports', 'Priority support'],
    notIncluded: ['Team collaboration', 'Custom integrations', 'Dedicated manager'],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    id: 'business',
    name: 'Business',
    price: 999,
    period: 'month',
    description: 'For teams and businesses',
    features: ['Everything in Pro', 'Up to 10 team members', 'Role-based access', 'Custom integrations', 'API access', 'Advanced reports', 'Dedicated account manager', 'Custom branding'],
    notIncluded: [],
    cta: 'Contact Sales',
    popular: false,
  },
]

export const FAQS = [
  { q: 'Is my financial data secure?', a: 'Yes. All data is encrypted with AES-256 and stored on secure servers. We never sell or share your data. Your privacy is our top priority.' },
  { q: 'How does AI insights work?', a: 'Our AI analyzes your spending patterns, compares them against your income and budgets, and generates personalized recommendations to help you save more.' },
  { q: 'Can I connect my bank account?', a: 'Bank integration is coming soon! Currently you can manually add expenses or import via CSV file.' },
  { q: 'Is there a mobile app?', a: 'Our web app is fully mobile-responsive. Native iOS and Android apps are on our roadmap for Q3 2025.' },
  { q: 'Can I cancel my subscription anytime?', a: 'Absolutely. No lock-ins. Cancel anytime from your settings page and you will retain access until the end of your billing period.' },
  { q: 'Do you offer a free trial?', a: 'Yes! The Pro plan comes with a 14-day free trial, no credit card required.' },
]
