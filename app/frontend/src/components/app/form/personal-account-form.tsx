import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'
import { personalAccountInfoSchema, TPersonalAccountInfoSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUploadProfilePicture } from '@/hooks'
import { useUserStore } from '@/stores'
import { CardUserGeneralInfo, CardUserPasswordAndAuthentication } from '@/components/app/card'
import { showToast } from '@/utils'

export const PersonalAccountForm: React.FC = () => {
  const { userInfo, setUserInfo } = useUserStore()
  const { t } = useTranslation('account')
  const { t: tToast } = useTranslation('toast')
  const { mutate: uploadProfilePicture } = useUploadProfilePicture()

  const handleUploadProfilePicture = (file: File) => {
    uploadProfilePicture(file, {
      onSuccess: (data) => {
        showToast(tToast('toast.updateUserSuccess'))
        setUserInfo(data.result)
      }
    })
  }

  const form = useForm<TPersonalAccountInfoSchema>({
    resolver: zodResolver(personalAccountInfoSchema),
    defaultValues: {
      fullname: userInfo?.fullname || '',
      username: userInfo?.username || '',
      address: userInfo?.address || '',
      phoneNumber: userInfo?.phoneNumber || '',
      dob: userInfo?.dob || '',
      gender: userInfo?.gender || '',
      company: userInfo?.userDepartments?.[0]?.department?.site?.company?.name || '',
      site: userInfo?.userDepartments?.[0]?.department?.site?.name || ''
    }
  })

  useEffect(() => {
    if (userInfo) {
      form.reset({
        fullname: userInfo?.fullname || '',
        username: userInfo?.username || '',
        address: userInfo?.address || '',
        phoneNumber: userInfo?.phoneNumber || '',
        dob: userInfo?.dob || '',
        gender: userInfo.gender || '',
        company: userInfo?.userDepartments?.[0]?.department?.site?.company.name || '',
        site: userInfo?.userDepartments?.[0]?.department?.site?.name || ''
      })
    }
  }, [userInfo, form])

  return (
    <div>
      <Tabs defaultValue="general-info" className="w-full">
        <TabsList className="gap-3">
          <TabsTrigger value="general-info">{t('account.generalInfo')}</TabsTrigger>
          <TabsTrigger value="password-and-authentication">
            {t('account.passwordAndAuthentication')}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="general-info" className="w-full p-0">
          <CardUserGeneralInfo handleUploadProfilePicture={handleUploadProfilePicture} />
        </TabsContent>
        <TabsContent value="password-and-authentication">
          <CardUserPasswordAndAuthentication />
        </TabsContent>
      </Tabs>
    </div>
  )
}
