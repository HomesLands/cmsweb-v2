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
import { ApprovalLogStatus, ProductRequisitionRoleApproval } from '@/types'
import { ApprovalAction, UserApprovalStage } from '@/constants'

interface DialogApprovalRequisitionProps {
  openDialog: ApprovalLogStatus
  setOpenDialog: (value: ApprovalLogStatus | null) => void
  onConfirm: (message: string, status: ApprovalLogStatus) => void // Updated this line
  roleApproval: ProductRequisitionRoleApproval
}

export const DialogApprovalRequisition: React.FC<DialogApprovalRequisitionProps> = ({
  openDialog,
  setOpenDialog,
  onConfirm,
  roleApproval
}) => {
  console.log('openDialog', openDialog)
  const { t } = useTranslation(['productRequisition'])
  const form = useForm<z.infer<typeof approvalRequisitionSchema>>({
    resolver: zodResolver(approvalRequisitionSchema),
    defaultValues: {
      message: ''
    }
  })

  const handleConfirm = form.handleSubmit((data) => {
    onConfirm(data.message, openDialog as ApprovalLogStatus) // Updated this line
    setOpenDialog(null)
    form.reset()
  })

  const getButtonText = () => {
    switch (openDialog) {
      case ApprovalAction.ACCEPT:
        return t('productRequisition.accept')
      case ApprovalAction.GIVE_BACK:
        return t('productRequisition.giveBack')
      case ApprovalAction.CANCEL:
        return t('productRequisition.cancel')
      default:
        return t('productRequisition.confirm')
    }
  }

  return (
    <Dialog open={openDialog !== null} onOpenChange={() => setOpenDialog(null)}>
      <DialogContent className="rounded-lg max-w-[22rem] sm:max-w-[28rem] sm:max-h-[32rem]">
        <DialogHeader>
          <DialogTitle className="font-beVietNam">
            {openDialog === ApprovalAction.ACCEPT && t('productRequisition.acceptConfirmTitle')}
            {openDialog === ApprovalAction.GIVE_BACK &&
              t('productRequisition.giveBackConfirmTitle')}
            {openDialog === ApprovalAction.CANCEL && t('productRequisition.cancelConfirmTitle')}
          </DialogTitle>
        </DialogHeader>
        <p>
          {openDialog === ApprovalAction.ACCEPT && t('productRequisition.acceptConfirmMessage')}
          {openDialog === ApprovalAction.GIVE_BACK &&
            (roleApproval === UserApprovalStage.APPROVAL_STAGE_1
              ? t('productRequisition.giveBackConfirmMessage')
              : t('productRequisition.giveBackConfirmMessage'))}
          {openDialog === ApprovalAction.CANCEL && t('productRequisition.cancelConfirmMessage')}
        </p>
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
            <div className="flex justify-end gap-2 mt-5">
              <Button type="button" variant="outline" onClick={() => setOpenDialog(null)}>
                {t('productRequisition.cancel')}
              </Button>
              <Button
                type="submit"
                variant={openDialog === ApprovalAction.ACCEPT ? 'default' : 'destructive'}
              >
                {getButtonText()}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default DialogApprovalRequisition
