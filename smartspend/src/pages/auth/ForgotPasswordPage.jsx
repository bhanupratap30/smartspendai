import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { useState } from 'react'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { motion } from 'framer-motion'
import { authService } from '../../services/authService'
import toast from 'react-hot-toast'

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

const onSubmit = async (data) => {
  try {
    await authService.forgotPassword(data.email)

    setSent(true)
    toast.success('Reset link sent successfully!')
  } catch (err) {
    toast.error(
      err.response?.data?.message || 'Failed to send reset link'
    )
  }
}

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-2">Forgot password?</h1>
        <p className="text-slate-500 dark:text-slate-400">Enter your email and we'll send you a reset link.</p>
      </div>

      {sent ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
            <Mail size={28} className="text-emerald-600" />
          </div>
          <h3 className="font-display font-semibold text-xl text-slate-900 dark:text-white mb-2">Check your email</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">We've sent a password reset link to your email address.</p>
          <Link to="/login" className="btn-primary">Back to Sign In</Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email address"
            type="email"
            placeholder="you@example.com"
            icon={<Mail size={16} />}
            error={errors.email?.message}
            {...register('email', { required: 'Email is required' })}
          />
          <Button type="submit" fullWidth loading={isSubmitting}>Send reset link</Button>
          <div className="text-center">
            <Link to="/login" className="text-sm text-brand-600 hover:text-brand-700 font-medium">← Back to Sign In</Link>
          </div>
        </form>
      )}
    </motion.div>
  )
}
