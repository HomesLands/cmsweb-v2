import { ROUTE } from '@/constants'
import { useAuthStore, useUserInfoPermissionsStore, useUserStore } from '@/stores'
import { useCallback, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {
  const { isAuthenticated, setLogout } = useAuthStore()
  const { t } = useTranslation('auth')
  const { removeUserInfo } = useUserStore()
  const { clearUserRoles } = useUserInfoPermissionsStore()
  const navigate = useNavigate()

  const handleLogout = useCallback(() => {
    setLogout()
    removeUserInfo()
    clearUserRoles()
    // toast.error(t('sessionExpired'))
    navigate(ROUTE.LOGIN)
  }, [setLogout, removeUserInfo, clearUserRoles, navigate])

  // Check authentication and permissions
  useEffect(() => {
    if (!isAuthenticated()) {
      handleLogout()
    }
    // Make sure to include necessary dependencies
  }, [isAuthenticated, navigate, handleLogout, t])

  return isAuthenticated() ? <div>Trang chủ</div> : null
}
