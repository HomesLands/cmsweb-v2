import { useTranslation } from 'react-i18next'
import { UserRoundPen } from 'lucide-react'

import { Card, CardContent, Input, Button } from '@/components/ui'
import { ProfilePicture } from '@/components/app/avatar'
import { useUserStore } from '@/stores'

interface CardUserGeneralInfoProps {
  handleUploadProfilePicture: (file: File) => void
  setOpenDialog: (open: boolean) => void
}

export const CardUserGeneralInfo = ({
  handleUploadProfilePicture,
  setOpenDialog
}: CardUserGeneralInfoProps) => {
  const { t } = useTranslation('account')
  const { userInfo } = useUserStore()
  return (
    <Card className="border-none">
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-row p-2">
          <ProfilePicture
            height={80}
            width={80}
            src={
              userInfo?.avatar
                ? `${import.meta.env.VITE_BASE_API_URL}/files/${userInfo.avatar}`
                : 'https://github.com/shadcn.png'
            }
            onUpload={handleUploadProfilePicture}
          />
          <div className="flex flex-col justify-center ml-4">
            <span className="font-semibold font-beVietNam text-md">{userInfo?.fullname}</span>
            <div className="flex items-center text-description">
              <span>{userInfo?.username}</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 rounded-md border">
          <div className="flex justify-between items-center px-6 py-4 w-full bg-gray-50 border-b">
            <span className="font-semibold font-beVietNam text-md">{t('account.profile')}</span>
            <Button
              variant="outline"
              className="flex gap-1 justify-center items-center"
              onClick={() => setOpenDialog(true)}
            >
              <UserRoundPen className="icon" />
              <span className="text-normal">{t('account.edit')}</span>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-6 p-6">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-beVietNam text-normal">{t('account.fullname')}</span>
              <Input className="font-beVietNam" value={userInfo?.fullname} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-beVietNam text-normal">{t('account.username')}</span>
              <Input className="font-beVietNam" value={userInfo?.username} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-beVietNam text-normal">{t('account.company')}</span>
              <Input
                className="font-beVietNam"
                value={userInfo?.userDepartments[0]?.department?.site?.company.name || 'N/A'}
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-beVietNam text-normal">{t('account.site')}</span>
              <Input
                className="font-beVietNam"
                value={userInfo?.userDepartments[0]?.department?.site?.name || 'N/A'}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
