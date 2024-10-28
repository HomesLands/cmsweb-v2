import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { KeyRound, UserRoundPen } from 'lucide-react'

import { Card, CardContent, Input, Button } from '@/components/ui'
import { ProfilePicture } from '@/components/app/avatar'
import { useThemeStore, useUserStore } from '@/stores'
import { useUploadSignature } from '@/hooks/use-users'
import { cn } from '@/lib/utils'
import { publicFileURL } from '@/constants'
import { IUserInfo } from '@/types'
import { DialogUpdateUserGeneralInfo } from '@/components/app/dialog'
import { showToast } from '@/utils'

interface CardUserGeneralInfoProps {
  handleUploadProfilePicture: (file: File) => void
}

export const CardUserGeneralInfo = ({ handleUploadProfilePicture }: CardUserGeneralInfoProps) => {
  const { t: tToast } = useTranslation('toast')
  const { t } = useTranslation('account')
  const { userInfo, setUserInfo } = useUserStore()
  const { getTheme } = useThemeStore()
  const uploadSignatureMutation = useUploadSignature()

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUploadSignature = (file: File) => {
    uploadSignatureMutation.mutate(file, {
      onSuccess(data) {
        if (data?.result) {
          showToast(tToast('toast.updateUserSuccess'))
          setUserInfo(data.result)
        }
      }
    })
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const formFields = {
    fullname: (
      <div className="flex flex-col gap-1">
        <span className="text-sm font-beVietNam text-normal">{t('account.fullname')}</span>
        <Input className="font-beVietNam" value={userInfo?.fullname} readOnly />
      </div>
    ),
    username: (
      <div className="flex flex-col gap-1">
        <span className="text-sm font-beVietNam text-normal">{t('account.username')}</span>
        <Input className="font-beVietNam" readOnly value={userInfo?.username} />
      </div>
    ),
    address: (
      <div className="flex flex-col gap-1">
        <span className="text-sm font-beVietNam text-normal">{t('account.address')}</span>
        <Input className="font-beVietNam" value={userInfo?.address} readOnly />
      </div>
    ),
    phoneNumber: (
      <div className="flex flex-col gap-1">
        <span className="text-sm font-beVietNam text-normal">{t('account.phoneNumber')}</span>
        <Input className="font-beVietNam" value={userInfo?.phoneNumber} readOnly />
      </div>
    ),
    gender: (
      <div className="flex flex-col gap-1">
        <span className="text-sm font-beVietNam text-normal">{t('account.gender')}</span>
        <Input
          className="font-beVietNam"
          value={userInfo?.gender ? t(`account.${userInfo.gender}`) : ''}
          readOnly
        />
      </div>
    ),
    dob: (
      <div className="flex flex-col gap-1">
        <span className="text-sm font-beVietNam text-normal">{t('account.dob')}</span>
        <Input className="font-beVietNam" value={userInfo?.dob} readOnly />
      </div>
    ),
    company: (
      <div className="flex flex-col gap-1">
        <span className="text-sm font-beVietNam text-normal">{t('account.company')}</span>
        <Input
          className="font-beVietNam"
          value={userInfo?.userDepartments?.[0]?.department?.site?.company?.name || 'N/A'}
          readOnly
        />
      </div>
    ),
    site: (
      <div className="flex flex-col gap-1">
        <span className="text-sm font-beVietNam text-normal">{t('account.site')}</span>
        <Input
          className="font-beVietNam"
          value={userInfo?.userDepartments?.[0]?.department?.site?.name || 'N/A'}
          readOnly
        />
      </div>
    )
  }

  return (
    <div>
      <Card className="border-none">
        <CardContent className="flex flex-col gap-6 p-0">
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
          <div className="grid grid-cols-1 gap-3 border rounded-md">
            <div
              className={cn(
                'flex justify-between items-center px-6 py-4 w-full',
                getTheme() === 'light' ? 'bg-gray-50' : ''
              )}
            >
              <span className="font-semibold font-beVietNam text-md">{t('account.profile')}</span>
              <div className="flex gap-2">
                <DialogUpdateUserGeneralInfo userInfo={userInfo as IUserInfo} />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2">
              {Object.keys(formFields).map((key) => (
                <div key={key}>{formFields[key as keyof typeof formFields]}</div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="mt-6 border-none">
        <CardContent className="flex flex-col gap-6 p-0">
          <div className="grid grid-cols-1 gap-3 border rounded-md">
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
                  className="flex items-center gap-1"
                  onClick={triggerFileInput}
                >
                  <KeyRound className="icon" />
                  <span className="text-sm text-normal">{t('account.changeSignature')}</span>
                </Button>
              )}
            </div>
            <div className="p-6">
              {userInfo?.signature ? (
                <div className="w-full h-40 overflow-hidden border rounded-md">
                  <img
                    src={`${publicFileURL}/${userInfo.signature}`}
                    alt="User Signature"
                    className="object-contain w-full h-full"
                  />
                </div>
              ) : (
                <div
                  className="flex flex-col items-center justify-center w-full h-40 text-gray-400 transition-colors border rounded-md cursor-pointer hover:bg-gray-50"
                  onClick={triggerFileInput}
                >
                  <UserRoundPen className="w-12 h-12 mb-2" />
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
