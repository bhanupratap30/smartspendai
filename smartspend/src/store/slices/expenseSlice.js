import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { expenseService } from '../../services/expenseService'

export const fetchExpenses = createAsyncThunk('expenses/fetchAll', async (params, { rejectWithValue }) => {
  try {
    return await expenseService.getAll(params)
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to fetch expenses')
  }
})

export const createExpense = createAsyncThunk('expenses/create', async (data, { rejectWithValue }) => {
  try {
    return await expenseService.create(data)
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to create expense')
  }
})

export const updateExpense = createAsyncThunk('expenses/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    return await expenseService.update(id, data)
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to update expense')
  }
})

export const deleteExpense = createAsyncThunk('expenses/delete', async (id, { rejectWithValue }) => {
  try {
    await expenseService.delete(id)
    return id
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Failed to delete expense')
  }
})

const expenseSlice = createSlice({
  name: 'expenses',
  initialState: {
    items: [],
    total: 0,
    page: 1,
    pageSize: 10,
    loading: false,
    error: null,
    filters: { category: '', search: '', dateRange: 'all', sort: 'date_desc' },
  },
  reducers: {
    setFilters: (state, action) => { state.filters = { ...state.filters, ...action.payload } },
    setPage: (state, action) => { state.page = action.payload },
    clearError: (state) => { state.error = null },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => { state.loading = true })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.content || action.payload
        state.total = action.payload.totalElements || action.payload.length
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false; state.error = action.payload
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.items.unshift(action.payload)
        state.total += 1
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        const idx = state.items.findIndex(e => e.id === action.payload.id)
        if (idx !== -1) state.items[idx] = action.payload
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.items = state.items.filter(e => e.id !== action.payload)
        state.total -= 1
      })
  },
})

export const { setFilters, setPage, clearError } = expenseSlice.actions
export default expenseSlice.reducer
