import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
  Button,
  Input
} from '@/components/ui'

import { zodResolver } from '@hookform/resolvers/zod'
import { createAssignedApproverSchema, TCreateAssignedApproverSchema } from '@/schemas'
import { TAssignedApprover } from '@/types'
import { FormApprovalType } from '@/constants'

interface IFormCreateAssignedApproverProps {
  onSubmit: (data: TAssignedApprover) => void
}

export const CreateAssignedApproverForm: React.FC<IFormCreateAssignedApproverProps> = ({
  onSubmit
}) => {
  const { t } = useTranslation(['assignedApprover'])

  const form = useForm<TCreateAssignedApproverSchema>({
    resolver: zodResolver(createAssignedApproverSchema),
    defaultValues: {
      formType: FormApprovalType.PRODUCT_REQUISITION_FORM,
      roleApproval: '',
      user: ''
    }
  })

  const handleSubmit = (values: TCreateAssignedApproverSchema) => {
    onSubmit(values)
  }

  const formFields = {
    formType: (
      <FormField
        control={form.control}
        name="formType"
        render={() => (
          <FormItem>
            <FormLabel className="text-muted-foreground">
              {t('assignedApprover.selectFormType')}
            </FormLabel>
            <FormControl>
              <Input
                className="text-muted-foreground"
                placeholder={t('assignedApprover.selectFormType')}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
    roleApproval: (
      <FormField
        control={form.control}
        name="roleApproval"
        render={() => (
          <FormItem>
            <FormLabel className="text-muted-foreground">
              {t('assignedApprover.selectRoleApproval')}
            </FormLabel>
            <FormControl>
              <Input
                className="text-muted-foreground"
                placeholder={t('assignedApprover.selectRoleApproval')}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
    user: (
      <FormField
        control={form.control}
        name="user"
        render={() => (
          <FormItem>
            <FormLabel className="text-muted-foreground">
              {t('assignedApprover.selectUser')}
            </FormLabel>
            <FormControl>
              <Input
                className="text-muted-foreground"
                placeholder={t('assignedApprover.selectUser')}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    )
  }

  return (
    <div className="mt-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {Object.keys(formFields).map((key) => (
              <React.Fragment key={key}>
                {formFields[key as keyof typeof formFields]}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-end">
            <Button className="flex justify-end" type="submit">
              {t('assignedApprover.add')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
