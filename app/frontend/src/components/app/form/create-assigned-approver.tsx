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
  Button
} from '@/components/ui'

import { zodResolver } from '@hookform/resolvers/zod'
import { createAssignedApproverSchema, TCreateAssignedApproverSchema } from '@/schemas'
import { TCreateAssignedApprover } from '@/types'
import { FormApprovalType } from '@/constants'
import { SelectFormType, SelectRoleApproval, SelectSite, SelectUser } from '../select'

interface IFormCreateAssignedApproverProps {
  onSubmit: (data: TCreateAssignedApprover) => void
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
      user: '',
      site: ''
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
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-muted-foreground">
              {t('assignedApprover.selectFormType')}
            </FormLabel>
            <FormControl>
              <SelectFormType
                onChange={(selectedOption) => {
                  if (selectedOption) {
                    field.onChange(selectedOption.value)
                  }
                }}
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
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-muted-foreground">
              {t('assignedApprover.selectRoleApproval')}
            </FormLabel>
            <FormControl>
              <SelectRoleApproval
                onChange={(selectedOption) => {
                  if (selectedOption) {
                    field.onChange(selectedOption.value)
                  }
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
    site: (
      <FormField
        control={form.control}
        name="site"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-muted-foreground">
              {t('assignedApprover.selectSite')}
            </FormLabel>
            <FormControl>
              <SelectSite
                onChange={(selectedOption) => {
                  if (selectedOption) {
                    field.onChange(selectedOption)
                  }
                }}
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
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-muted-foreground">
              {t('assignedApprover.selectUser')}
            </FormLabel>
            <FormControl>
              <SelectUser
                onChange={(selectedOption) => {
                  if (selectedOption) {
                    field.onChange(selectedOption)
                  }
                }}
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
