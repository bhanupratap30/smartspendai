import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Bell, Moon, Sun, Monitor, Shield, CreditCard,
  Globe, Trash2, Download, ChevronRight, Check
} from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setTheme } from '../../store/slices/themeSlice'
import toast from 'react-hot-toast'

function SettingRow({ icon: Icon, title, desc, children, danger }) {
  return (
    <div className={`flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-700/50 last:border-0 ${danger ? 'text-red-500' : ''}`}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${danger ? 'bg-red-100 dark:bg-red-900/20' : 'bg-slate-100 dark:bg-slate-700'}`}>
          <Icon size={16} className={danger ? 'text-red-500' : 'text-slate-500 dark:text-slate-400'} />
        </div>
        <div>
          <p className={`text-sm font-medium ${danger ? 'text-red-500' : 'text-slate-800 dark:text-slate-200'}`}>{title}</p>
          {desc && <p className="text-xs text-slate-400 mt-0.5">{desc}</p>}
        </div>
      </div>
      <div>{children}</div>
    </div>
  )
}

function Toggle({ value, onChange }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`relative w-10 h-5.5 rounded-full transition-colors ${value ? 'bg-brand-500' : 'bg-slate-200 dark:bg-slate-600'}`}
      style={{ height: '22px', minWidth: '40px' }}
    >
      <motion.div
        animate={{ x: value ? 18 : 2 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow"
      />
    </button>
  )
}

const THEMES = [
  { id: 'light', icon: Sun, label: 'Light' },
  { id: 'dark', icon: Moon, label: 'Dark' },
  { id: 'system', icon: Monitor, label: 'System' },
]

export default function SettingsPage() {
  const dispatch = useDispatch()
  const { mode } = useSelector(s => s.theme)
  const [notifSettings, setNotifSettings] = useState({
    budgetAlerts: true, weeklyReport: true, aiInsights: true, monthlyReport: false,
  })
  const [currency, setCurrency] = useState('INR')

  const toggle = (key) => setNotifSettings(p => ({ ...p, [key]: !p[key] }))

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="text-slate-500 text-sm mt-0.5">Manage your account preferences</p>
      </div>

      {/* Appearance */}
      <div className="card p-5">
        <h2 className="font-display font-semibold text-slate-900 dark:text-white mb-4">Appearance</h2>
        <div className="grid grid-cols-3 gap-2">
          {THEMES.map(t => (
            <button
              key={t.id}
              onClick={() => dispatch(setTheme(t.id === 'system' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : t.id))}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition ${
                mode === t.id || (t.id === 'system')
                  ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <t.icon size={20} className={mode === t.id ? 'text-brand-500' : 'text-slate-400'} />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="card p-5">
        <h2 className="font-display font-semibold text-slate-900 dark:text-white mb-2">Notifications</h2>
        <SettingRow icon={Bell} title="Budget Alerts" desc="Get notified when approaching budget limits">
          <Toggle value={notifSettings.budgetAlerts} onChange={() => toggle('budgetAlerts')} />
        </SettingRow>
        <SettingRow icon={Bell} title="AI Insights" desc="Weekly AI-powered financial insights">
          <Toggle value={notifSettings.aiInsights} onChange={() => toggle('aiInsights')} />
        </SettingRow>
        <SettingRow icon={Bell} title="Weekly Report" desc="Summary of your weekly spending">
          <Toggle value={notifSettings.weeklyReport} onChange={() => toggle('weeklyReport')} />
        </SettingRow>
        <SettingRow icon={Bell} title="Monthly Report" desc="Detailed monthly financial report">
          <Toggle value={notifSettings.monthlyReport} onChange={() => toggle('monthlyReport')} />
        </SettingRow>
      </div>

      {/* Preferences */}
      <div className="card p-5">
        <h2 className="font-display font-semibold text-slate-900 dark:text-white mb-2">Preferences</h2>
        <SettingRow icon={Globe} title="Currency" desc="Default currency for expenses">
          <select value={currency} onChange={e => setCurrency(e.target.value)} className="input text-sm w-24 py-1.5">
            <option>INR</option><option>USD</option><option>EUR</option><option>GBP</option>
          </select>
        </SettingRow>
        <SettingRow icon={Download} title="Export Data" desc="Download all your data as CSV">
          <button onClick={() => toast.success('Export started!')} className="btn-secondary text-xs py-1.5 px-3">
            Export
          </button>
        </SettingRow>
      </div>

      {/* Security */}
      <div className="card p-5">
        <h2 className="font-display font-semibold text-slate-900 dark:text-white mb-2">Security</h2>
        <SettingRow icon={Shield} title="Two-Factor Authentication" desc="Add extra security to your account">
          <button onClick={() => toast.success('2FA setup coming soon!')} className="btn-secondary text-xs py-1.5 px-3">
            Enable
          </button>
        </SettingRow>
        <SettingRow icon={CreditCard} title="Connected Accounts" desc="Manage linked bank accounts">
          <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition">
            Manage <ChevronRight size={14} />
          </button>
        </SettingRow>
      </div>

      {/* Danger zone */}
      <div className="card p-5 border-red-200 dark:border-red-800/50">
        <h2 className="font-display font-semibold text-red-500 mb-2">Danger Zone</h2>
        <SettingRow icon={Trash2} title="Delete Account" desc="Permanently delete your account and all data" danger>
          <button
            onClick={() => toast.error('Please contact support to delete your account.')}
            className="btn-danger text-xs py-1.5 px-3"
            style={{ background: '#ef4444', color: 'white', borderRadius: '10px', padding: '6px 12px', fontSize: '12px' }}
          >
            Delete
          </button>
        </SettingRow>
      </div>
    </div>
  )
}
