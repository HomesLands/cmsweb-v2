import { useTranslation } from 'react-i18next'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  ScrollArea
} from '@/components/ui'

import { FormUpdateUserGeneralInfo } from '@/components/app/form'
import { IUpdateUserGeneralInfo, IUserInfo } from '@/types'

interface DialogUpdateRequisitionProps {
  handleUpdateUserGeneralInfo: (userInfo: IUpdateUserGeneralInfo) => void
  openDialog: boolean
  userInfo: IUserInfo
  onOpenChange: () => void
}

export function DialogUpdateUserGeneralInfo({
  handleUpdateUserGeneralInfo,
  openDialog,
  userInfo,
  onOpenChange
}: DialogUpdateRequisitionProps) {
  const { t } = useTranslation('account')

  return (
    <Dialog open={openDialog} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[64rem] p-0">
        <ScrollArea className="max-h-[80vh]">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle>{t('account.updateUserGeneralInfo')}</DialogTitle>
              <DialogDescription>{t('account.updateUserGeneralInfoDescription')}</DialogDescription>
            </DialogHeader>
            <FormUpdateUserGeneralInfo
              onSubmit={handleUpdateUserGeneralInfo}
              data={userInfo}
              onCancel={onOpenChange}
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
