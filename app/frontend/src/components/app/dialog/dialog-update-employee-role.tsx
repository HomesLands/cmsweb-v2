import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenuItem
} from '@/components/ui'
import { DialogContent } from '@radix-ui/react-dialog'
import { useTranslation } from 'react-i18next'

export function DialogUpdateEmployeeRole() {
  const { t } = useTranslation('')
  return (
    <Dialog>
      <DialogTrigger>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>Update item</DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update form</DialogTitle>
          <DialogDescription>Here you can add fields to update your form</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
