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

import { createUserSchema } from '@/schemas'
import { z } from 'zod'
import { AddNewUserForm } from '@/components/app/form'

export function DialogAddUser() {
  const handleSubmit = (data: z.infer<typeof createUserSchema>) => {}

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-1 text-normal font-beVietNam">
          <PlusCircledIcon className="icon" />
          Thêm nhân viên mới
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[48rem] max-h-[32rem] overflow-hidden hover:overflow-y-auto transition-all duration-300">
        <DialogHeader>
          <DialogTitle>Thêm nhân viên mới</DialogTitle>
          <DialogDescription>
            Nhập đầy đủ thông tin bên dưới để thêm nhân viên mới
          </DialogDescription>
        </DialogHeader>
        <AddNewUserForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  )
}
