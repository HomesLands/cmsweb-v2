import React from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui'
import { resubmitRequisitionSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'

interface DialogResubmitRequisitionProps {
  openDialog: boolean
  onConfirm: (description: string) => void
  onOpenChange: (open: boolean) => void
}

export const DialogResubmitRequisition: React.FC<DialogResubmitRequisitionProps> = ({
  openDialog,
  onConfirm,
  onOpenChange
}) => {
  const { t } = useTranslation(['productRequisition'])
  const form = useForm<z.infer<typeof resubmitRequisitionSchema>>({
    resolver: zodResolver(resubmitRequisitionSchema),
    defaultValues: {
      description: ''
    }
  })

  const handleConfirm = form.handleSubmit((data) => {
    onConfirm(data.description)
    form.reset()
  })

  return (
    <Dialog open={openDialog} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-beVietNam">
            {t('productRequisition.resubmitConfirmTitle')}
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-500">{t('productRequisition.resubmitConfirmMessage')}</p>
        <Form {...form}>
          <form onSubmit={handleConfirm} className="space-y-6">
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    {t('productRequisition.descriptionInputLabel')}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('productRequisition.descriptionInputPlaceholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2 justify-end mt-5">
              <Button type="button" variant="outline" onClick={() => {}}>
                {t('productRequisition.cancel')}
              </Button>
              <Button type="submit" variant="default">
                {t('productRequisition.resubmit')}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

// export default DialogResubmitRequisition
