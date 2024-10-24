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
import { TUpdateAssignedApproverSchema, updateAssignedApproverSchema } from '@/schemas'
import { IAssignedApprover } from '@/types'
import { FormApprovalType } from '@/constants'
import { SelectFormType, SelectRoleApproval, SelectSite, SelectUser } from '@/components/app/select'

interface IFormUpdateAssignedApproverProps {
  approver: IAssignedApprover
  onSubmit: (data: TUpdateAssignedApproverSchema) => void
}

export default function CreateAssignedApproverForm({
  approver,
  onSubmit
}: IFormUpdateAssignedApproverProps) {
  const { t } = useTranslation(['assignedApprover'])
  const form = useForm<TUpdateAssignedApproverSchema>({
    resolver: zodResolver(updateAssignedApproverSchema),
    defaultValues: {
      slug: approver.slug || '',
      formType: FormApprovalType.PRODUCT_REQUISITION_FORM,
      roleApproval: approver.roleApproval || '',
      user: approver.user.slug || '',
      site: approver.site.slug || ''
    }
  })

  const handleSubmit = (values: TUpdateAssignedApproverSchema) => {
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
                defaultValue={approver.formType} // Pass the formType as default value
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
                defaultValue={approver.roleApproval} // Pass the roleApproval as default value
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
                defaultValue={field.value}
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
                defaultValue={approver.user.slug}
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
