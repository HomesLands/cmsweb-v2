import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button
} from '@/components/ui'
import { UpdateRoleForm } from '../form'
import { IRole, IUpdateRole } from '@/types'
import { useUpdateRole } from '@/hooks'
import { TUpdateRoleSchema } from '@/schemas'
import toast from 'react-hot-toast'
import { PenIcon } from 'lucide-react'

export default function DialogUpdateRole({ role }: { role: IRole }) {
  const mutation = useUpdateRole()
  const handleSubmit = (values: TUpdateRoleSchema) => {
    const requestData = {
      ...values
    } as IUpdateRole
    mutation.mutate(requestData, {
      onSuccess: () => {
        toast.success('Chỉnh sửa quyền thành công')
      }
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="gap-1 text-sm">
          <PenIcon className="icon" />
          Chỉnh sửa quyền hạn
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[48rem] max-h-[32rem] overflow-hidden hover:overflow-y-auto transition-all duration-300">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa quyền hạn</DialogTitle>
          <DialogDescription>Thay đổi thông tin bên dưới để chỉnh sửa quyền hạn</DialogDescription>
        </DialogHeader>
        <UpdateRoleForm role={role} onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  )
}
