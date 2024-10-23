import { Trash2, TriangleAlert } from 'lucide-react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Switch
} from '@/components/ui'
import { IUserInfo } from '@/types'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useDeleteUserRole } from '@/hooks'
import { showToast } from '@/utils'

export default function DialogDeleteUserRole({ user }: { user: IUserInfo }) {
  const { t } = useTranslation('employees')
  const { t: tToast } = useTranslation('toast')
  const { mutate: deleteUserRole } = useDeleteUserRole()

  // State để lưu vai trò hiện tại đang được chọn
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = () => {
    if (!selectedRole) return

    setIsOpen(false)
    // Xử lý xóa vai trò được chọn
    deleteUserRole(selectedRole, {
      onSuccess: () => {
        showToast(tToast('toast.deleteUserRoleSuccess'))
      }
    })
  }

  const handleRoleToggle = (roleSlug: string) => {
    // Nếu vai trò đã được chọn, bỏ chọn nó; nếu chưa, chọn vai trò mới
    setSelectedRole((prevSelectedRole) => (prevSelectedRole === roleSlug ? null : roleSlug))
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="flex justify-start w-full" asChild>
        <DialogTrigger asChild>
          <Button variant="ghost" className="gap-1 text-sm" onClick={() => setIsOpen(true)}>
            <Trash2 className="icon" />
            {t('employees.deleteUserRole')}
          </Button>
        </DialogTrigger>
      </DialogTrigger>

      <DialogContent className="max-w-[22rem] rounded-md sm:max-w-[32rem] font-beVietNam">
        <DialogHeader>
          <DialogTitle className="pb-4 border-b border-destructive text-destructive">
            <div className="flex items-center gap-2">
              <TriangleAlert className="w-6 h-6" />
              {t('employees.deleteUserRole')}
            </div>
          </DialogTitle>
          <DialogDescription className="p-2 bg-red-100 rounded-md text-destructive">
            {t('employees.deleteUserRoleDescription')}
          </DialogDescription>

          <div className="py-4 text-sm text-gray-500">
            {t('employees.deleteUserRoleWarning1')}{' '}
            <span className="font-bold">{user.fullname}</span>.
            <br />
            {t('employees.deleteUserRoleConfirmation')}
          </div>

          {/* Hiển thị danh sách các vai trò */}
          <div className="flex flex-col gap-2">
            {user.userRoles.map((userRole) => (
              <div key={userRole.slug} className="flex items-center justify-between">
                <span>{userRole.role.nameDisplay}</span>
                <Switch
                  checked={selectedRole === userRole.slug}
                  onCheckedChange={() => handleRoleToggle(userRole.slug as string)}
                />
              </div>
            ))}
          </div>
        </DialogHeader>

        <DialogFooter className="flex flex-row justify-center gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            {t('employees.cancel')}
          </Button>
          <Button
            variant="destructive"
            onClick={handleSubmit}
            disabled={!selectedRole} // Chỉ cho phép xóa khi có một vai trò được chọn
          >
            {t('employees.confirmDelete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
