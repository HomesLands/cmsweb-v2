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
import { useUser } from '@/hooks'
import { useAuthStore, useUserInfoPermissionsStore, useUserStore } from '@/stores'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

export function DropdownHeader() {
  const { t } = useTranslation('auth')
  const { setLogout } = useAuthStore()
  const [open, setOpen] = useState(false)
  // const mutation = useLogout()
  const { data } = useUser()
  const { removeUserInfo } = useUserStore()
  const { clearUserRoles } = useUserInfoPermissionsStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    setLogout()
    removeUserInfo()
    clearUserRoles()
    toast.success(t('logout.logoutSuccess'))
    navigate('/auth/login')
    // const requestData = {
    //   token: token || 'token',
    //   refreshToken: refreshToken || 'refreshToken'
    // } as ILogoutRequest
    // await mutation.mutateAsync(requestData, {
    //   onSuccess: () => {
    //     setLogout()
    //     removeUserInfo()
    //     toast.success(t('logout.logoutSuccess'))
    //     navigate('/auth/login')
    //   }
    // })
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
            {t('userInfo.hello')} {data?.result?.fullname}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {/* <DropdownMenuItem className="cursor-pointer">Thông tin tài khoản</DropdownMenuItem> */}
          {/* <DropdownMenuItem className="cursor-pointer">Đổi mật khẩu</DropdownMenuItem> */}
          {/* <DropdownMenuSeparator /> */}
          <DropdownMenuItem
            className="flex items-center justify-start gap-2 cursor-pointer text-danger hover:bg-red-100"
            onClick={() => setOpen(true)}
          >
            <div className="flex items-center gap-2">
              <ExitIcon className="danger-icon" />
              Đăng xuất
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogLogout open={open} setOpen={setOpen} handleLogout={handleLogout} />
    </div>
  )
}
