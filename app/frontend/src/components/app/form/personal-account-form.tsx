import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'
import { personalAccountInfoSchema, TPersonalAccountInfoSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUpdateUser, useUploadProfilePicture } from '@/hooks'
import { DialogUpdateUserGeneralInfo } from '@/components/app/dialog'
import { IUpdateUserGeneralInfo, IUserInfo } from '@/types'
import { useUserStore } from '@/stores'
import { CardUserGeneralInfo, CardUserPasswordAndAuthentication } from '@/components/app/card'
import { showToast } from '@/utils'

export const PersonalAccountForm: React.FC = () => {
  const { userInfo, setUserInfo } = useUserStore()
  const [openDialog, setOpenDialog] = useState(false)
  const { t } = useTranslation('account')
  const { t: tToast } = useTranslation('toast')
  const { mutate: uploadProfilePicture } = useUploadProfilePicture()
  const { mutate: updateUser } = useUpdateUser()

  const handleUpdateGeneralInfo = (data: IUpdateUserGeneralInfo) => {
    if (data) {
      console.log(data)
      updateUser(data, {
        onSuccess: () => {
          showToast(tToast('toast.updateUserSuccess'))
        }
      })
    }
  }

  const handleUploadProfilePicture = (file: File) => {
    uploadProfilePicture(file, {
      onSuccess: (data) => {
        setUserInfo(data.result)
      }
    })
  }

  const form = useForm<TPersonalAccountInfoSchema>({
    resolver: zodResolver(personalAccountInfoSchema),
    defaultValues: {
      fullname: userInfo?.fullname || '',
      username: userInfo?.username || '',
      company: userInfo?.userDepartments[0]?.department?.site?.company.name || '',
      site: userInfo?.userDepartments[0]?.department?.site?.name || ''
    }
  })

  useEffect(() => {
    if (userInfo) {
      form.reset({
        fullname: userInfo?.fullname || '',
        username: userInfo?.username || '',
        company: userInfo?.userDepartments[0]?.department?.site?.company.name || '',
        site: userInfo?.userDepartments[0]?.department?.site?.name || ''
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
        <TabsContent value="general-info">
          <CardUserGeneralInfo
            handleUploadProfilePicture={handleUploadProfilePicture}
            setOpenDialog={setOpenDialog}
          />
        </TabsContent>
        <TabsContent value="password-and-authentication">
          <CardUserPasswordAndAuthentication />
        </TabsContent>
      </Tabs>
      <DialogUpdateUserGeneralInfo
        handleUpdateUserGeneralInfo={handleUpdateGeneralInfo}
        openDialog={openDialog}
        userInfo={userInfo as IUserInfo}
        onOpenChange={() => setOpenDialog(!openDialog)}
      />
    </div>
  )
}
