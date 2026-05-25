# SmartSpend AI 💸

A **production-ready**, AI-powered Expense Tracker SaaS frontend built with React, Vite, Tailwind CSS, Framer Motion, and Recharts.

![SmartSpend AI](https://img.shields.io/badge/React-18-blue) ![Vite](https://img.shields.io/badge/Vite-5-purple) ![TailwindCSS](https://img.shields.io/badge/Tailwind-3-cyan) ![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

- 🤖 **AI Insights** — personalized financial recommendations
- 📊 **Rich Analytics** — area, bar, pie, radial charts (Recharts)
- 💰 **Expense Management** — full CRUD with search, filter, sort, pagination
- 🎯 **Budget Planner** — category budgets with progress tracking
- 📈 **Income Tracker** — multiple income source management
- 📄 **Reports** — downloadable PDF/CSV reports
- 🔔 **Notifications** — real-time alerts via Redux
- 🌗 **Dark / Light Mode** — persisted in localStorage
- 🔐 **JWT Auth** — login, register, forgot/reset password
- 🛡️ **Protected Routes** — role-based access (user/admin)
- 📱 **Mobile-First** — fully responsive layout
- ✨ **Smooth Animations** — Framer Motion page transitions & microinteractions
- ⚡ **Code Splitting** — lazy-loaded pages for fast loads

---

## 📁 Folder Structure

```
src/
├── assets/           Static assets
├── components/
│   ├── ui/           Reusable UI components (Button, Input, Modal, etc.)
│   └── layout/       Sidebar, DashboardNavbar
├── pages/
│   ├── public/       Landing, About, Features, Pricing, 404
│   ├── auth/         Login, Register, ForgotPassword, ResetPassword
│   ├── dashboard/    Dashboard, Notifications, Settings, Profile
│   ├── expenses/     Expenses, AddExpense, EditExpense, Income
│   ├── analytics/    Analytics, Budget, Reports
│   ├── ai/           AIInsights
│   └── admin/        AdminDashboard, AdminUsers
├── layouts/          DashboardLayout, PublicLayout, AuthLayout
├── routes/           ProtectedRoute
├── store/
│   └── slices/       authSlice, expenseSlice, themeSlice, notificationSlice
├── services/         api.js, authService.js, expenseService.js
├── data/             mockData.js (categories, mock expenses, charts data)
├── utils/            helpers.js (formatCurrency, formatDate, etc.)
└── styles/           globals.css
```

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
```
Edit `.env`:
```
VITE_API_BASE_URL=http://localhost:8080/api
```

### 3. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 4. Build for production
```bash
npm run build
```

---

## 🔐 Authentication

The frontend is wired to use JWT auth with a Spring Boot backend. In **demo mode**, clicking "Sign In" on the login page bypasses the API and goes directly to the dashboard.

To enable real API authentication, uncomment the dispatch call in `LoginPage.jsx`:
```js
const res = await dispatch(loginUser(data))
if (loginUser.fulfilled.match(res)) navigate(from, { replace: true })
```

---

## 🗺️ Routes

| Path | Page | Access |
|------|------|--------|
| `/` | Landing | Public |
| `/about` | About | Public |
| `/features` | Features | Public |
| `/pricing` | Pricing | Public |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/forgot-password` | Forgot Password | Public |
| `/dashboard` | Dashboard | Protected |
| `/expenses` | Expenses | Protected |
| `/expenses/add` | Add Expense | Protected |
| `/expenses/edit/:id` | Edit Expense | Protected |
| `/income` | Income | Protected |
| `/analytics` | Analytics | Protected |
| `/budget` | Budget Planner | Protected |
| `/ai-insights` | AI Insights | Protected |
| `/reports` | Reports | Protected |
| `/notifications` | Notifications | Protected |
| `/settings` | Settings | Protected |
| `/profile` | Profile | Protected |
| `/admin` | Admin Dashboard | Admin only |
| `/admin/users` | Manage Users | Admin only |

---

## 🧰 Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| Vite 5 | Build tool |
| Tailwind CSS 3 | Styling |
| Framer Motion | Animations |
| React Router DOM 6 | Routing |
| Redux Toolkit | State management |
| Axios | HTTP client |
| React Hook Form | Form handling |
| Recharts | Charts |
| Lucide React | Icons |
| React Hot Toast | Notifications |

---

## 🎨 Design System

- **Font**: DM Sans (body), Syne (display), JetBrains Mono (code)
- **Primary**: Indigo (`brand-500: #6366f1`)
- **Success**: Emerald (`#10b981`)
- **Warning**: Amber (`#f59e0b`)
- **Danger**: Rose (`#f43f5e`)
- **Glassmorphism** via `backdrop-blur` utilities
- **Shadows**: custom `shadow-glow`, `shadow-card`, `shadow-card-hover`
- **Animations**: fade-in, slide-up, float, shimmer, bounce

---

## 🌐 API Integration

All API calls are in `src/services/`. The Axios instance in `src/services/api.js` handles:
- JWT token injection via request interceptor
- 401 → auto-redirect to `/login`
- 500 → toast error notification

---

## 📄 License

MIT © 2025 SmartSpend AI
