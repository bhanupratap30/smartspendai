import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setTheme } from './store/slices/themeSlice'
import ProtectedRoute from './routes/ProtectedRoute'
import DashboardLayout from './layouts/DashboardLayout'
import PublicLayout from './layouts/PublicLayout'
import AuthLayout from './layouts/AuthLayout'

// Lazy-loaded pages
const LandingPage = lazy(() => import('./pages/public/LandingPage'))
const AboutPage = lazy(() => import('./pages/public/AboutPage'))
const FeaturesPage = lazy(() => import('./pages/public/FeaturesPage'))
const PricingPage = lazy(() => import('./pages/public/PricingPage'))
const LoginPage = lazy(() => import('./pages/auth/LoginPage'))
const RegisterPage = lazy(() => import('./pages/auth/RegisterPage'))
const ForgotPasswordPage = lazy(() => import('./pages/auth/ForgotPasswordPage'))
const ResetPasswordPage = lazy(() => import('./pages/auth/ResetPasswordPage'))
const NotFoundPage = lazy(() => import('./pages/public/NotFoundPage'))

const DashboardPage = lazy(() => import('./pages/dashboard/DashboardPage'))
const ExpensesPage = lazy(() => import('./pages/expenses/ExpensesPage'))
const AddExpensePage = lazy(() => import('./pages/expenses/AddExpensePage'))
const EditExpensePage = lazy(() => import('./pages/expenses/EditExpensePage'))
const IncomePage = lazy(() => import('./pages/expenses/IncomePage'))
const AnalyticsPage = lazy(() => import('./pages/analytics/AnalyticsPage'))
const BudgetPage = lazy(() => import('./pages/analytics/BudgetPage'))
const AIInsightsPage = lazy(() => import('./pages/ai/AIInsightsPage'))
const ReportsPage = lazy(() => import('./pages/analytics/ReportsPage'))
const NotificationsPage = lazy(() => import('./pages/dashboard/NotificationsPage'))
const SettingsPage = lazy(() => import('./pages/dashboard/SettingsPage'))
const ProfilePage = lazy(() => import('./pages/dashboard/ProfilePage'))

const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'))

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center animate-pulse">
          <span className="text-white text-lg">✦</span>
        </div>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-brand-500 animate-bounce [animation-delay:0ms]" />
          <div className="w-2 h-2 rounded-full bg-brand-400 animate-bounce [animation-delay:150ms]" />
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const dispatch = useDispatch()
  const { mode } = useSelector(s => s.theme)

  useEffect(() => {
    dispatch(setTheme(mode))
  }, [])

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
        </Route>

        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>

        {/* Protected dashboard routes */}
        <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="expenses" element={<ExpensesPage />} />
          <Route path="expenses/add" element={<AddExpensePage />} />
          <Route path="expenses/edit/:id" element={<EditExpensePage />} />
          <Route path="income" element={<IncomePage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="budget" element={<BudgetPage />} />
          <Route path="ai-insights" element={<AIInsightsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin" element={<ProtectedRoute adminOnly><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}
