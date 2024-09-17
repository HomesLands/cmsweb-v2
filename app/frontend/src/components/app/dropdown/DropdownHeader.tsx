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
import { useState } from 'react'
import { DialogLogout } from '../dialog'
import { useLogout } from '@/hooks'
import { useUserStore } from '@/stores'
import { ILogoutRequest } from '@/types'

export function DropdownHeader() {
  const { token, refreshToken } = useUserStore()
  const [open, setOpen] = useState(false)
  const mutation = useLogout()

  const handleLogout = async () => {
    const requestData = {
      token: token || 'token',
      refreshToken: refreshToken || 'refreshToken'
    } as ILogoutRequest
    await mutation.mutateAsync(requestData)
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
          <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">Thông tin tài khoản</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">Đổi mật khẩu</DropdownMenuItem>
          <DropdownMenuSeparator />
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
