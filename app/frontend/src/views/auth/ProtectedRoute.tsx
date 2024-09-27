import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/stores/auth.store'
import { useUserInfoPermissionsStore } from '@/stores/user.store'
import { IUserRoleResponse } from '@/types'

interface ProtectedRouteProps {
  requiredPermissions?: string[]
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredPermissions = [] }) => {
  const { isAuthenticated } = useAuthStore()
  const { userRoles } = useUserInfoPermissionsStore()

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />
  }

  if (requiredPermissions.length > 0) {
    const hasRequiredPermission = userRoles.some((role: IUserRoleResponse) =>
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
