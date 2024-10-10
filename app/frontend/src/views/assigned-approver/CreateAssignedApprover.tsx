import React from 'react'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui'
import { CreatePermissionForm } from '@/components/app/form'
import { TCreatePermissionSchema } from '@/schemas'
import { ICreatePermission, TAssignedApprover } from '@/types'
import { useCreatePermission } from '@/hooks'
import { CreateAssignedApproverForm } from '@/components/app/form/create-assigned-approver'
import { useAssignedApprover } from '@/hooks/use-assigned-approver'

const AssignedApprover: React.FC = () => {
  const { t } = useTranslation(['assignedApprover'])
  const mutation = useAssignedApprover()

  const onSubmit = (values: TAssignedApprover) => {
    const requestData = {
      formType: values.formType,
      roleApproval: values.roleApproval,
      user: values.user
    } as TAssignedApprover
    // mutation.mutate(requestData, {
    //   onSuccess: () => {
    //     toast.success(t('assignedApprover.createPermissionSuccessfully'))
    //   }
    // })
  }

  return (
    <div className="flex flex-col gap-4 mt-2">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center w-full border-b">
          <div className="flex flex-col gap-2 items-start py-2">
            <CardTitle>{t('assignedApprover.title')}</CardTitle>
            <CardDescription>{t('assignedApprover.description')}</CardDescription>
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
