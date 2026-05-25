import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, UserX, UserCheck, Shield } from 'lucide-react'
import Pagination from '../../components/ui/Pagination'
import toast from 'react-hot-toast'
import api from '../../services/api'

export default function AdminUsers() {

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const PAGE_SIZE = 8

  // FETCH USERS
  const fetchUsers = async () => {
    try {

      const data = await api.get('/admin/users')

      setUsers(data)

    } catch (err) {

      toast.error('Failed to load users')

    } finally {

      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // SEARCH FILTER
  const filtered = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  )

  // PAGINATION
  const paged = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  )

  // TOGGLE USER STATUS
  const toggleStatus = async (id, currentStatus) => {

    try {

      await api.put(`/admin/users/${id}/status`, {
        status: currentStatus === 'active'
          ? 'suspended'
          : 'active'
      })

      toast.success('User updated')

      fetchUsers()

    } catch {

      toast.error('Failed to update user')
    }
  }

  if (loading) {
    return <div className="text-center py-10">Loading users...</div>
  }

  return (
    <div className="space-y-5">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            Manage Users
          </h1>

          <p className="text-slate-500 text-sm mt-0.5">
            {filtered.length} users total
          </p>
        </div>
      </div>

      {/* SEARCH */}
      <div className="card p-4">
        <div className="relative max-w-xs">

          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={e => {
              setSearch(e.target.value)
              setPage(1)
            }}
            placeholder="Search users..."
            className="input pl-9 text-sm"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="card overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700">

                {['User', 'Role', 'Status', 'Actions'].map(h => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}

              </tr>
            </thead>

            <tbody>

              {paged.map((user, i) => (

                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="border-b border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition"
                >

                  <td className="px-4 py-3">

                    <div className="flex items-center gap-2.5">

                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                        {user.name?.charAt(0)}
                      </div>

                      <div>
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                          {user.name}
                        </p>

                        <p className="text-xs text-slate-400">
                          {user.email}
                        </p>
                      </div>

                    </div>

                  </td>

                  <td className="px-4 py-3">
                    <span className="badge">
                      {user.role}
                    </span>
                  </td>

                  <td className="px-4 py-3">

                    <span className={`badge ${
                      user.status === 'suspended'
                        ? 'bg-red-100 text-red-600'
                        : 'bg-emerald-100 text-emerald-600'
                    }`}>

                      {user.status || 'active'}

                    </span>

                  </td>

                  <td className="px-4 py-3">

                    <div className="flex items-center gap-1">

                      <button
                        onClick={() =>
                          toggleStatus(
                            user.id,
                            user.status || 'active'
                          )
                        }
                        className="p-1.5 rounded-lg hover:bg-slate-100"
                      >

                        {(user.status || 'active') === 'active'
                          ? <UserX size={14} />
                          : <UserCheck size={14} />
                        }

                      </button>

                      <button
                        className="p-1.5 rounded-lg hover:bg-slate-100"
                      >
                        <Shield size={14} />
                      </button>

                    </div>

                  </td>

                </motion.tr>
              ))}

            </tbody>

          </table>

        </div>

        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 dark:border-slate-700">

          <p className="text-xs text-slate-400">
            Showing {(page - 1) * PAGE_SIZE + 1}–
            {Math.min(page * PAGE_SIZE, filtered.length)}
            of {filtered.length}
          </p>

          <Pagination
            page={page}
            totalPages={Math.ceil(filtered.length / PAGE_SIZE)}
            onPageChange={setPage}
          />

        </div>

      </div>

    </div>
  )
}