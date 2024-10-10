import React from 'react'
import { useTranslation } from 'react-i18next'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { CreateAuthorityForm, CreateCompanyForm } from '@/components/app/form'
import { TCreateAuthoritySchema, TCreateCompanySchema } from '@/schemas'
import { ICreateAuthority, ICreateCompany } from '@/types'
import { useCreateAuthority } from '@/hooks'
import toast from 'react-hot-toast'

const CreateCompany: React.FC = () => {
  const { t } = useTranslation(['companies'])
  const mutation = useCreateAuthority()

  const onSubmit = (values: TCreateCompanySchema) => {
    const requestData = { ...values } as ICreateCompany
    // mutation.mutate(requestData, {
    //   onSuccess: () => {
    //     toast.success(t('companies.createCompanySuccessfully'))
    //   }
    // })
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center w-full border-b">
          <div className="flex flex-col gap-2 items-start py-2">
            <CardTitle>{t('companies.createCompany')}</CardTitle>
            <CardDescription>{t('companies.createCompanyDescription')}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col">
          <CreateCompanyForm onSubmit={onSubmit} />
        </CardContent>
      </Card>
    </div>
  )
}

export default CreateCompany
