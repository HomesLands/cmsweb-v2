import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth.store'
import { hasAuthority } from '@/utils/auth'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredAuthorities?: string[]
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredAuthorities }) => {
  const { isAuthenticated } = useAuthStore()
  console.log('isAuthenticated', isAuthenticated())
  console.log('requiredAuthorities', requiredAuthorities)
  console.log('requiredAuthorities type:', typeof requiredAuthorities)
  console.log('requiredAuthorities length:', requiredAuthorities?.length)
  const location = useLocation()

  if (!isAuthenticated()) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/auth/login" state={{ from: location }} replace />
  }

  if (requiredAuthorities && requiredAuthorities.length > 0 && !hasAuthority(requiredAuthorities)) {
    // If the user doesn't have the required authorities, redirect to a 403 page
    return <Navigate to="/403" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
