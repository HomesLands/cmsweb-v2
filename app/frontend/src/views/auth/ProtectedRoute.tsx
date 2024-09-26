import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth.store'
import { useUserInfoPermissionsStore, useUserStore } from '@/stores/user.store'
import { IUserRole } from '@/types'

interface ProtectedRouteProps {
  requiredPermissions?: string[]
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredPermissions = [] }) => {
  const { isAuthenticated } = useAuthStore()
  const { getUserRoles } = useUserInfoPermissionsStore()

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />
  }

  if (requiredPermissions.length > 0) {
    const hasRequiredPermission = getUserRoles().some((role: IUserRole) =>
      role.authorities.some((authority: string) => requiredPermissions.includes(authority))
    )

    if (!hasRequiredPermission) {
      // Redirect to an unauthorized page or show an error message
      return <Navigate to="/unauthorized" replace />
    }
  }

  return <Outlet />
}

export default ProtectedRoute
