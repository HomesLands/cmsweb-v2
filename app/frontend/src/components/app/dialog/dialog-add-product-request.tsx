import { PlusCircledIcon } from '@radix-ui/react-icons'
import { z } from 'zod'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button
} from '@/components/ui'

import { addNewProductRequestSchema } from '@/schemas'
import { AddNewProductRequestForm } from '@/components/app/form'

export function DialogAddProductRequest() {
  const handleSubmit = (data: z.infer<typeof addNewProductRequestSchema>) => {
    // handle form submission
    console.log('Submitted Data:', data)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-1 text-normal font-beVietNam">
          <PlusCircledIcon className="icon" />
          Thêm vật tư mới
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[44rem] max-h-[36rem]">
        <DialogHeader>
          <DialogTitle>Thêm vật tư mới</DialogTitle>
          <DialogDescription>Nhập đầy đủ thông tin bên dưới để thêm vật tư mới</DialogDescription>
        </DialogHeader>
        <AddNewProductRequestForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  )
}
