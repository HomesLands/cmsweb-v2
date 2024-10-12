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
import { AddRolePermissionForm } from '../form'
import { ICreateRolePermission, IRole } from '@/types'
import { useCreateRolePermission } from '@/hooks'
import { TCreateRolePermissionSchema } from '@/schemas'
import toast from 'react-hot-toast'

export function DialogAddRolePermission({ role }: { role: IRole }) {
  const mutation = useCreateRolePermission()
  const handleSubmit = (values: TCreateRolePermissionSchema) => {
    const requestData = {
      roleSlug: values.role.value,
      permissionSlug: values.permission.value
    } as ICreateRolePermission
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
          Thêm quyền hạn
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[48rem] max-h-[32rem] overflow-hidden hover:overflow-y-auto transition-all duration-300">
        <DialogHeader>
          <DialogTitle>Thêm quyền hạn</DialogTitle>
          <DialogDescription>Nhập đầy đủ thông tin bên dưới để thêm quyền hạn</DialogDescription>
        </DialogHeader>
        <AddRolePermissionForm role={role} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  )
}
