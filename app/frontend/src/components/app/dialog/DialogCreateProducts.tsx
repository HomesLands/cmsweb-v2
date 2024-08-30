import { CirclePlus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button
} from '@/components/ui'

import { FormCreateProduct } from '@/components/app/form'

export function DialogCreateProducts() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-1 text-normal font-beVietNam">
          <CirclePlus className="icon" />
          Tạo mới
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[56rem] max-h-[32rem] overflow-hidden hover:overflow-y-auto transition-all duration-300">
        <DialogHeader>
          <DialogTitle>Tạo phiếu yêu cầu vật tư</DialogTitle>
          <DialogDescription>
            Nhập đầy đủ thông tin bên dưới để tạo phiếu yêu cầu vật tư mới
          </DialogDescription>
        </DialogHeader>
        <FormCreateProduct />
      </DialogContent>
    </Dialog>
  )
}
