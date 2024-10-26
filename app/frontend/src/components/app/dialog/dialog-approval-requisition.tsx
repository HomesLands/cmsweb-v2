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
import { approvalRequisitionSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { ApprovalLogStatus } from '@/types'
import { ApprovalAction, RequisitionStatus } from '@/constants'

interface DialogApprovalRequisitionProps {
  openDialog: ApprovalAction
  status: RequisitionStatus
  isRecalled: boolean | undefined
  setOpenDialog: (value: ApprovalAction | null) => void
  onConfirm: (message: string, status: ApprovalLogStatus) => void
}

export const DialogApprovalRequisition: React.FC<DialogApprovalRequisitionProps> = ({
  openDialog,
  status,
  isRecalled,
  setOpenDialog,
  onConfirm
}) => {
  const { t } = useTranslation(['productRequisition'])
  const form = useForm<z.infer<typeof approvalRequisitionSchema>>({
    resolver: zodResolver(approvalRequisitionSchema),
    defaultValues: {
      message: ''
    }
  })

  const handleConfirm = form.handleSubmit((data) => {
    onConfirm(data.message, openDialog as ApprovalLogStatus)
    setOpenDialog(null)
    form.reset()
  })

  const getDialogInfo = () => {
    let title = ''
    let message = ''
    let buttonText = ''
    let buttonVariant: 'default' | 'destructive' = 'default'

    if (status === RequisitionStatus.WAITING && !isRecalled) {
      // Cấp 1
      if (openDialog === ApprovalAction.ACCEPT) {
        title = t('productRequisition.acceptConfirmTitle')
        message = t('productRequisition.acceptConfirmMessage')
        buttonText = t('productRequisition.accept')
      } else {
        title = t('productRequisition.giveBackConfirmTitle')
        message = t('productRequisition.giveBackConfirmMessage')
        buttonText = t('productRequisition.giveBack')
        buttonVariant = 'destructive'
      }
    } else {
      // Cấp 2 và 3
      switch (openDialog) {
        case ApprovalAction.ACCEPT:
          title = t('productRequisition.acceptConfirmTitle')
          message = t('productRequisition.acceptConfirmMessage')
          buttonText = t('productRequisition.accept')
          break
        case ApprovalAction.GIVE_BACK:
          title = t('productRequisition.giveBackConfirmTitle')
          message = t('productRequisition.giveBackConfirmMessage')
          buttonText = t('productRequisition.giveBack')
          buttonVariant = 'destructive'
          break
        case ApprovalAction.CANCEL:
          title = t('productRequisition.cancelConfirmTitle')
          message = t('productRequisition.cancelConfirmMessage')
          buttonText = t('productRequisition.cancel')
          buttonVariant = 'destructive'
          break
      }
    }

    return { title, message, buttonText, buttonVariant }
  }

  const { title, message, buttonText, buttonVariant } = getDialogInfo()

  return (
    <Dialog open={openDialog !== null} onOpenChange={() => setOpenDialog(null)}>
      <DialogContent className="rounded-lg max-w-[22rem] sm:max-w-[28rem] sm:max-h-[32rem]">
        <DialogHeader>
          <DialogTitle className="font-beVietNam">{title}</DialogTitle>
        </DialogHeader>
        <p>{message}</p>
        <Form {...form}>
          <form onSubmit={handleConfirm} className="space-y-6">
            <FormField
              name="message"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('productRequisition.messageInputLabel')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('productRequisition.messageInputPlaceholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2 justify-end mt-5">
              <Button type="button" variant="outline" onClick={() => setOpenDialog(null)}>
                {t('productRequisition.cancel')}
              </Button>
              <Button type="submit" variant={buttonVariant}>
                {buttonText}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default DialogApprovalRequisition
