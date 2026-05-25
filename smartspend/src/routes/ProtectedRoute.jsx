import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function ProtectedRoute({
  children,
  adminOnly = false
}) {

  const {
    isAuthenticated,
    user
  } = useSelector(s => s.auth)

  console.log("USER DATA:", user)

  const location = useLocation()

  if (!isAuthenticated) {

    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    )
  }

  if (
    adminOnly &&
    user?.role !== 'ADMIN'
  ) {

    return (
      <Navigate
        to="/dashboard"
        replace
      />
    )
  }

  return children
}