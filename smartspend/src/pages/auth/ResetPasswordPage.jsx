import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Lock } from 'lucide-react'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { authService } from '../../services/authService'

export default function ResetPasswordPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const token = searchParams.get('token')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm()

  const password = watch('password')

  const onSubmit = async (data) => {
    try {
      await authService.resetPassword(token, data.password)

      toast.success('Password updated successfully!')

      navigate('/login')
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Failed to reset password'
      )
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Reset password
        </h1>

        <p className="text-slate-500 dark:text-slate-400">
          Choose a new strong password for your account.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <Input
          label="New password"
          type="password"
          placeholder="Enter new password"
          icon={<Lock size={16} />}
          autoComplete="new-password"
          error={errors.password?.message}
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Minimum 8 characters'
            },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*[0-9]).+$/,
              message: 'Must contain 1 uppercase and 1 number'
            }
          })}
        />

        <Input
          label="Confirm new password"
          type="password"
          placeholder="Confirm new password"
          icon={<Lock size={16} />}
          autoComplete="new-password"
          error={errors.confirm?.message}
          {...register('confirm', {
            required: 'Please confirm your password',
            validate: (v) =>
              v === password || 'Passwords do not match'
          })}
        />

        <Button
          type="submit"
          fullWidth
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Update password
        </Button>

        <div className="text-center">
          <Link
            to="/login"
            className="text-sm text-brand-600 hover:text-brand-700 font-medium"
          >
            ← Back to Sign In
          </Link>
        </div>
      </form>
    </motion.div>
  )
}