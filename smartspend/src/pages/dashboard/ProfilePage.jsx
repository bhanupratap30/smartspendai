import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import {
  Camera, Mail, Phone,
  MapPin, Calendar,
  Edit3, Save, X
} from 'lucide-react'

import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import toast from 'react-hot-toast'

export default function ProfilePage() {

  const [editing, setEditing] = useState(false)
  const [profile, setProfile] = useState(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm()

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {

      const token = localStorage.getItem('token')

      const res = await fetch(
        'http://localhost:8080/api/user/profile',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const data = await res.json()

      setProfile(data)

      reset(data)

    } catch (err) {
      console.log(err)
    }
  }

  const onSubmit = async (data) => {

    try {

      const token = localStorage.getItem('token')

      await fetch(
        'http://localhost:8080/api/user/profile',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(data)
        }
      )

      setProfile(data)

      setEditing(false)

      toast.success('Profile Updated')

    } catch (err) {
      console.log(err)
      toast.error('Update Failed')
    }
  }

  if (!profile) {
    return (
      <div className="text-center py-10">
        Loading...
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
        Profile
      </h1>

      {/* Header */}

      <div className="card p-6">

        <div className="flex items-start gap-5 flex-wrap">

          <div className="relative">

            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold">

              {profile.name?.charAt(0)}

            </div>

          </div>

          <div className="flex-1">

            <div className="flex items-center justify-between flex-wrap gap-2">

              <div>

                <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                  {profile.name}
                </h2>

                <p className="text-slate-500 text-sm">
                  {profile.email}
                </p>

              </div>

              <button
                onClick={() => setEditing(v => !v)}
                className="btn-ghost text-sm flex items-center gap-1.5"
              >

                {editing
                  ? <><X size={15} /> Cancel</>
                  : <><Edit3 size={15} /> Edit</>
                }

              </button>

            </div>

            <div className="flex items-center gap-4 mt-3 flex-wrap">

              <span className="flex items-center gap-1 text-xs text-slate-400">
                <MapPin size={12} />
                {profile.location}
              </span>

              <span className="flex items-center gap-1 text-xs text-slate-400">
                <Calendar size={12} />
                Joined 2025
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* Edit Form */}

      {editing ? (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card p-5"
        >

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >

            <Input
              label="Name"
              {...register('name')}
            />

            <Input
              label="Email"
              type="email"
              {...register('email')}
            />

            <Input
              label="Phone"
              {...register('phone')}
            />

            <Input
              label="Location"
              {...register('location')}
            />

            <div>

              <label className="label">
                Bio
              </label>

              <textarea
                rows={3}
                className="input resize-none"
                {...register('bio')}
              />

            </div>

            <div className="flex justify-end gap-2">

              <Button
                type="button"
                variant="secondary"
                onClick={() => setEditing(false)}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                loading={isSubmitting}
                icon={<Save size={15} />}
              >
                Save
              </Button>

            </div>

          </form>

        </motion.div>

      ) : (

        <div className="card p-5 space-y-4">

          <div className="flex items-center gap-3">

            <Mail size={16} />

            <span>{profile.email}</span>

          </div>

          <div className="flex items-center gap-3">

            <Phone size={16} />

            <span>{profile.phone}</span>

          </div>

          <div className="flex items-center gap-3">

            <MapPin size={16} />

            <span>{profile.location}</span>

          </div>

          <div>

            <p className="text-sm text-slate-600 dark:text-slate-300">
              {profile.bio}
            </p>

          </div>

        </div>

      )}

    </div>
  )
}