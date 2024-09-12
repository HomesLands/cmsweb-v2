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
import { useUserStore } from '@/stores'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { showToast } from '@/utils/toast'
import { useState } from 'react'
import { DialogLogout } from '../dialog'

export function DropdownHeader() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const mutation = useMutation({
    mutationFn: async () => {
      return useUserStore.getState().logout()
    },
    onSuccess: () => {
      showToast('Đăng xuất thành công')
      navigate('/auth/login')
    }
  })

  const handleLogout = () => {
    mutation.mutate()
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
          <DropdownMenuItem className="flex items-center justify-start gap-2 cursor-pointer text-danger hover:bg-red-100">
            <div className="flex items-center gap-2" onClick={() => setOpen(true)}>
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
