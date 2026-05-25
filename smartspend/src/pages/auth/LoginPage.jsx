import { useForm } from 'react-hook-form'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../store/slices/authSlice'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { loading, error } = useSelector(s => s.auth)
  const from = location.state?.from?.pathname || '/dashboard'

  const { register, handleSubmit, formState: { errors } } = useForm()

  // const onSubmit = async (data) => {
  //   // For demo: bypass API and go to dashboard
  //   toast.success('Welcome back! 👋')
  //   navigate('/dashboard')
  //   // Uncomment for real API:
  //   // const res = await dispatch(loginUser(data))
  //   // if (loginUser.fulfilled.match(res)) navigate(from, { replace: true })
  // }
const onSubmit = async (data) => {
  const res = await dispatch(loginUser(data))

  if (loginUser.fulfilled.match(res)) {
    toast.success('Welcome back! 👋')
    navigate(from, { replace: true })
  } else {
    toast.error(res.payload || 'Login failed')
  }
}

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-2">Welcome back</h1>
        <p className="text-slate-500 dark:text-slate-400">Sign in to your SmartSpend AI account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email address"
          type="email"
          placeholder="you@example.com"
          icon={<Mail size={16} />}
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' }
          })}
        />

        <Input
          label="Password"
          type={showPass ? 'text' : 'password'}
          placeholder="Enter your password"
          icon={<Lock size={16} />}
          rightIcon={
            <button type="button" onClick={() => setShowPass(v => !v)}>
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
          error={errors.password?.message}
          {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded border-slate-300" />
            <span className="text-slate-600 dark:text-slate-400">Remember me</span>
          </label>
          <Link to="/forgot-password" className="text-brand-600 hover:text-brand-700 font-medium">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" fullWidth loading={loading} className="mt-2">
          Sign in
        </Button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-700" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-white dark:bg-slate-900 text-slate-400">or continue with</span>
          </div>
        </div>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.4 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.4-.1-2.7-.4-4z"/>
            <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.5 15.1 18.9 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.4 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"/>
            <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.3 35.2 26.8 36 24 36c-5.2 0-9.7-3.4-11.3-8l-6.5 5C9.6 39.6 16.3 44 24 44z"/>
            <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.7 2-2 3.8-3.7 5.1l6.2 5.2C41 34.8 44 29.8 44 24c0-1.4-.1-2.7-.4-4z"/>
          </svg>
          Continue with Google
        </button>
      </form>

      <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
        Don't have an account?{' '}
        <Link to="/register" className="text-brand-600 hover:text-brand-700 font-medium">
          Sign up free
        </Link>
      </p>

      {/* Demo credentials notice
      <div className="mt-4 p-3 bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-700 rounded-xl text-center">
        <p className="text-xs text-brand-700 dark:text-brand-300">
          Demo mode — click Sign In to explore the dashboard
        </p>
      </div> */}
    </motion.div>
  )
}
