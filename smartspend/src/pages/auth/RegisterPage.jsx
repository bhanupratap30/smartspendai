import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../store/slices/authSlice'
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { motion } from 'framer-motion'

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading } = useSelector(s => s.auth)

  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const password = watch('password')

const onSubmit = async (data) => {
  try {
    const res = await dispatch(registerUser({
      name: data.name,
      email: data.email,
      password: data.password
    }))

    if (registerUser.fulfilled.match(res)) {
      toast.success('Account created successfully 🎉')
      navigate('/dashboard')
    } else {
      toast.error(res.payload || 'Registration failed')
    }
  } catch (err) {
    toast.error('Something went wrong')
  }
}

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-2">Create your account</h1>
        <p className="text-slate-500 dark:text-slate-400">Start tracking your expenses smarter with AI</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Full name"
          type="text"
          placeholder="Your full name"
          icon={<User size={16} />}
          error={errors.name?.message}
          {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'At least 2 characters' } })}
        />
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
          placeholder="Create a strong password"
          icon={<Lock size={16} />}
          rightIcon={
            <button type="button" onClick={() => setShowPass(v => !v)}>
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
          error={errors.password?.message}
          {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Minimum 8 characters' } })}
        />
        <Input
          label="Confirm password"
          type="password"
          placeholder="Confirm your password"
          icon={<Lock size={16} />}
          error={errors.confirmPassword?.message}
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: val => val === password || 'Passwords do not match'
          })}
        />

        <div className="flex items-start gap-2 text-sm">
          <input type="checkbox" required className="mt-0.5 rounded border-slate-300" />
          <span className="text-slate-500 dark:text-slate-400">
            I agree to the{' '}
            <Link to="/" className="text-brand-600 hover:underline">Terms of Service</Link>
            {' '}and{' '}
            <Link to="/" className="text-brand-600 hover:underline">Privacy Policy</Link>
          </span>
        </div>

        <Button type="submit" fullWidth loading={loading}>
          Create account
        </Button>
      </form>

      <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-brand-600 hover:text-brand-700 font-medium">Sign in</Link>
      </p>
    </motion.div>
  )
}
