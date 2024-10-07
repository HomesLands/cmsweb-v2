import { useState } from 'react'
import { ExitIcon } from '@radix-ui/react-icons'

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
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { Authority, ROUTE } from '@/constants'
import { UserIcon } from 'lucide-react'
import { hasRequiredPermissions } from '@/utils/auth'

export function HeaderDropdown() {
  const { t } = useTranslation('auth')
  const { setLogout } = useAuthStore()
  const [open, setOpen] = useState(false)
  // const mutation = useLogout()
  const { removeUserInfo, userInfo } = useUserStore()
  const { clearUserRoles } = useUserInfoPermissionsStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    setLogout()
    removeUserInfo()
    clearUserRoles()
    navigate(ROUTE.LOGIN)
    toast.success(t('logout.logoutSuccess'))
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
          <DropdownMenuItem
            className="cursor-pointer"
            // onClick={() => navigate(ROUTE.PERSONAL_ACCOUNT)}
          >
            {hasRequiredPermissions([Authority.READ_USER]) && (
              <div className="flex gap-2 items-center">
                <UserIcon className="danger-icon" />
                Thông tin tài khoản
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
