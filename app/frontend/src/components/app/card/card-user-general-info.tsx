import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { KeyRound, UserRoundPen } from 'lucide-react'

import { Card, CardContent, Input, Button } from '@/components/ui'
import { ProfilePicture } from '@/components/app/avatar'
import { useThemeStore, useUserStore } from '@/stores'
import { useUploadSignature } from '@/hooks/use-users'
import { cn } from '@/lib/utils'
import { publicFileURL } from '@/constants'

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
  const { getTheme } = useThemeStore()
  const uploadSignatureMutation = useUploadSignature()

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUploadSignature = (file: File) => {
    uploadSignatureMutation.mutate(file)
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div>
      <Card className="border-none">
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-row p-2">
            <ProfilePicture
              height={80}
              width={80}
              src={
                userInfo?.avatar
                  ? `${publicFileURL}/${userInfo.avatar}`
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
            <div
              className={cn(
                'flex justify-between items-center px-6 py-4 w-full',
                getTheme() === 'light' ? 'bg-gray-50' : ''
              )}
            >
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
            <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2">
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
      <Card className="mt-6 border-none">
        <CardContent className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-3 rounded-md border">
            <div
              className={cn(
                'flex justify-between items-center px-6 py-4 w-full',
                getTheme() === 'light' ? 'bg-gray-50' : ''
              )}
            >
              <span className="font-semibold font-beVietNam text-md">{t('account.signature')}</span>
              {userInfo?.signature && (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex gap-1 items-center"
                  onClick={triggerFileInput}
                >
                  <KeyRound className="icon" />
                  <span className="text-sm text-normal">{t('account.changeSignature')}</span>
                </Button>
              )}
            </div>
            <div className="p-6">
              {userInfo?.signature ? (
                <div className="overflow-hidden w-full h-40 rounded-md border">
                  <img
                    src={`${publicFileURL}/${userInfo.signature}`}
                    alt="User Signature"
                    className="object-contain w-full h-full"
                  />
                </div>
              ) : (
                <div
                  className="flex flex-col justify-center items-center w-full h-40 text-gray-400 rounded-md border transition-colors cursor-pointer hover:bg-gray-50"
                  onClick={triggerFileInput}
                >
                  <UserRoundPen className="mb-2 w-12 h-12" />
                  <span>{t('account.addSignature')}</span>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    handleUploadSignature(file)
                  }
                }}
                className="hidden"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
