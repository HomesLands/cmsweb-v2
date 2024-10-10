import { PlusCircledIcon } from '@radix-ui/react-icons'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button
} from '@/components/ui'

import { TCreateUserRoleSchema } from '@/schemas'
import { AddEmployeeRoleForm } from '../form'
import { ICreateUserRole, IUserInfo } from '@/types'
import toast from 'react-hot-toast'
import { useCreateUserRole } from '@/hooks'

export function DialogAddUserRole({ user }: { user: IUserInfo }) {
  const mutation = useCreateUserRole()
  const handleSubmit = (values: TCreateUserRoleSchema) => {
    const requestData = {
      roleSlug: values.role.value,
      userSlug: values.user.value
    } as ICreateUserRole
    mutation.mutate(requestData, {
      onSuccess: () => {
        toast.success('Thêm quyền thành công')
      }
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="gap-1 text-sm">
          <PlusCircledIcon className="icon" />
          Thêm chức vụ
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Thêm chức vụ cho nhân viên</DialogTitle>
          <DialogDescription>
            Nhập đầy đủ thông tin bên dưới để hêm chức vụ cho nhân viên
          </DialogDescription>
        </DialogHeader>
        <AddEmployeeRoleForm user={user} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  )
}
