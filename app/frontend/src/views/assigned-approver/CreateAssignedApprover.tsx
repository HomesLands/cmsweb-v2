import React from 'react'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { CreateAssignedApproverForm } from '@/components/app/form/create-assigned-approver'
import { useCreateAssignedApprover } from '@/hooks/use-assigned-approver'
import { TCreateAssignedApprover } from '@/types'

const AssignedApprover: React.FC = () => {
  const { t } = useTranslation(['assignedApprover'])
  const { mutate: createAssignedApprover } = useCreateAssignedApprover()

  const onSubmit = (values: TCreateAssignedApprover) => {
    const requestData = {
      formType: values.formType,
      roleApproval: values.roleApproval,
      user: values.user,
      site: values.site
    } as TCreateAssignedApprover
    createAssignedApprover(requestData, {
      onSuccess: () => {
        toast.success(t('assignedApprover.createAssignedApproverSuccessfully'))
      }
    })
  }

  return (
    <div className="flex flex-col gap-4 mt-2">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center w-full border-b">
          <div className="flex flex-col gap-2 items-start py-2">
            <CardTitle>{t('assignedApprover.createAssignedApprover')}</CardTitle>
            <CardDescription>
              {t('assignedApprover.createAssignedApproverDescription')}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col">
          <CreateAssignedApproverForm onSubmit={onSubmit} />
        </CardContent>
      </Card>
    </div>
  )
}

export default AssignedApprover
