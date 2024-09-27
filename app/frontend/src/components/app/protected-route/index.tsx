/* eslint-disable react-hooks/exhaustive-deps */
import { ROUTE } from '@/constants'
import { useAuthStore, useUserInfoPermissionsStore, useUserStore } from '@/stores'
import React, { useCallback, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export const ProtectedRoute = ({
  element,
  allowedAuthorities
}: {
  element: React.ReactNode
  allowedAuthorities: string[]
}) => {
  const { isAuthenticated, setLogout } = useAuthStore()
  const { t } = useTranslation('auth')
  const { removeUserInfo } = useUserStore()
  const { clearUserRoles, userRoles } = useUserInfoPermissionsStore()
  const navigate = useNavigate()

  const handleLogout = useCallback(() => {
    // removeUserInfo()
    // clearUserRoles()
    toast.error(t('sessionExpired'))
    navigate(ROUTE.LOGIN)
  }, [])

  const hasRequiredPermissions = useCallback(() => {
    return userRoles.some((userrole) =>
      userrole.authorities.some((authority) => allowedAuthorities.includes(authority))
    )
  }, [])

  useEffect(() => {
    // Check authentication and permissions
    if (!isAuthenticated()) {
      handleLogout()
    } else if (!hasRequiredPermissions()) {
      toast.error('access denied')
      navigate(ROUTE.HOME)
    }
  }, [])

  const hasAccess = isAuthenticated() && hasRequiredPermissions()

  return hasAccess ? <>{element}</> : null
}
