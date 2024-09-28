import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button,
  Input,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { approvalRequisitionSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { ApprovalLogStatus, RequestRequisitionRoleApproval } from '@/types'

interface DialogApprovalRequisitionProps {
  openDialog: ApprovalLogStatus
  setOpenDialog: (value: ApprovalLogStatus | null) => void
  onConfirm: (message: string, status: ApprovalLogStatus) => void // Updated this line
  roleApproval: RequestRequisitionRoleApproval
}

export const DialogApprovalRequisition: React.FC<DialogApprovalRequisitionProps> = ({
  openDialog,
  setOpenDialog,
  onConfirm,
  roleApproval
}) => {
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
      case 'accept':
        return t('productRequisition.accept')
      case 'give_back':
        return t('productRequisition.give_back')
      case 'cancel':
        return t('productRequisition.cancel')
      default:
        return t('productRequisition.confirm')
    }
  }

  return (
    <Dialog open={openDialog !== null} onOpenChange={() => setOpenDialog(null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-beVietNam">
            {openDialog === 'accept' && t('productRequisition.acceptConfirmTitle')}
            {openDialog === 'give_back' && t('productRequisition.giveBackConfirmTitle')}
            {openDialog === 'cancel' &&
              roleApproval !== 'approval_stage_1' &&
              t('productRequisition.cancelConfirmTitle')}
          </DialogTitle>
        </DialogHeader>
        <p>
          {openDialog === 'accept' && t('productRequisition.acceptConfirmMessage')}
          {openDialog === 'give_back' &&
            (roleApproval === 'approval_stage_1'
              ? t('productRequisition.giveBackConfirmMessageStage1')
              : t('productRequisition.giveBackConfirmMessage'))}
          {openDialog === 'cancel' &&
            roleApproval !== 'approval_stage_1' &&
            t('productRequisition.cancelConfirmMessage')}
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
              <Button type="submit" variant={openDialog === 'accept' ? 'default' : 'destructive'}>
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
