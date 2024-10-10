import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { ExitIcon } from '@radix-ui/react-icons'
import { UserIcon } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Button,
  UserAvatar
} from '@/components/ui'
import { DialogLogout } from '@/components/app/dialog'
import { useAuthStore, useUserInfoPermissionsStore, useUserStore } from '@/stores'
import { Authority, Resource, ROUTE } from '@/constants'
import { hasRequiredPermissions } from '@/utils/auth'
import { showToast } from '@/utils'

export function HeaderDropdown() {
  const { t } = useTranslation('auth')
  const { setLogout } = useAuthStore()
  const [open, setOpen] = useState(false)
  const { removeUserInfo, userInfo } = useUserStore()
  const { clearUserRoles } = useUserInfoPermissionsStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    setLogout()
    removeUserInfo()
    clearUserRoles()
    navigate(ROUTE.LOGIN)
    showToast(t('logout.success'))
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <UserAvatar />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[14rem]" align="end">
          <DropdownMenuLabel>
            {t('userInfo.hello')} {userInfo?.fullname}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            {hasRequiredPermissions({ authority: Authority.READ, resource: Resource.USER }) && (
              <div
                className="flex gap-2 items-center"
                onClick={() => navigate(ROUTE.PERSONAL_ACCOUNT)}
              >
                <UserIcon className="danger-icon" />
                {t('userInfo.accountInfo')}
              </div>
            )}
          </DropdownMenuItem>
          {/* <DropdownMenuItem className="cursor-pointer">Đổi mật khẩu</DropdownMenuItem> */}
          {/* <DropdownMenuSeparator /> */}
          <DropdownMenuItem
            className="flex gap-2 justify-start items-center cursor-pointer text-danger hover:bg-red-100"
            onClick={() => setOpen(true)}
          >
            <div className="flex gap-2 items-center">
              <ExitIcon className="danger-icon" />
              {t('logout.title')}
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogLogout open={open} setOpen={setOpen} handleLogout={handleLogout} />
    </div>
  )
}
