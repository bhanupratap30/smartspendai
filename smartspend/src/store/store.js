import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import expenseReducer from './slices/expenseSlice'
import themeReducer from './slices/themeSlice'
import notificationReducer from './slices/notificationSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expenseReducer,
    theme: themeReducer,
    notifications: notificationReducer,
  },
})
