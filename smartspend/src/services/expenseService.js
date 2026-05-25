import api from './api'

export const expenseService = {
  getAll: (params) => api.get('/expenses', { params }),
  getById: (id) => api.get(`/expenses/${id}`),
  create: (data) => api.post('/expenses', data),
  update: (id, data) => api.put(`/expenses/${id}`, data),
  delete: (id) => api.delete(`/expenses/${id}`),
  getSummary: () => api.get('/expenses/summary'),
  getByCategory: (params) => api.get('/expenses/by-category', { params }),
  getMonthly: (year) => api.get('/expenses/monthly', { params: { year } }),
  uploadReceipt: (id, file) => {
    const fd = new FormData()
    fd.append('receipt', file)
    return api.post(`/expenses/${id}/receipt`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
  },
}

export const incomeService = {
  getAll: (params) => api.get('/income', { params }),
  create: (data) => api.post('/income', data),
  update: (id, data) => api.put(`/income/${id}`, data),
  delete: (id) => api.delete(`/income/${id}`),
}

export const budgetService = {
  getAll: () => api.get('/budgets'),
  create: (data) => api.post('/budgets', data),
  update: (id, data) => api.put(`/budgets/${id}`, data),
  delete: (id) => api.delete(`/budgets/${id}`),
}

export const analyticsService = {
  getDashboard: () => api.get('/analytics/dashboard'),
  getInsights: () => api.get('/analytics/insights'),
  getReport: (params) => api.get('/analytics/report', { params }),
}
