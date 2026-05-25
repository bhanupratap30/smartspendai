import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    items: [
      { id: 1, title: 'Budget Alert', message: 'You have exceeded 80% of your Food budget.', type: 'warning', read: false, time: '5m ago' },
      { id: 2, title: 'Monthly Report Ready', message: 'Your April report is ready to view.', type: 'info', read: false, time: '1h ago' },
      { id: 3, title: 'AI Insight', message: 'SmartSpend detected unusual spending in Travel.', type: 'ai', read: true, time: '3h ago' },
    ],
  },
  reducers: {
    markRead: (state, action) => {
      const n = state.items.find(i => i.id === action.payload)
      if (n) n.read = true
    },
    markAllRead: (state) => { state.items.forEach(n => n.read = true) },
    removeNotification: (state, action) => {
      state.items = state.items.filter(n => n.id !== action.payload)
    },
    addNotification: (state, action) => {
      state.items.unshift({ id: Date.now(), read: false, time: 'now', ...action.payload })
    },
  },
})

export const { markRead, markAllRead, removeNotification, addNotification } = notificationSlice.actions
export default notificationSlice.reducer
