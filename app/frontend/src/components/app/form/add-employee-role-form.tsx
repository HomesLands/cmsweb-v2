import { useForm } from 'react-hook-form'

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
  Button
} from '@/components/ui'
import { createUserRoleSchema, TCreateUserRoleSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { SelectRole, SelectUser } from '../select'
import { useTranslation } from 'react-i18next'
import React from 'react'

interface IFormAddEmployeeRoleProps {
  onSubmit: (data: TCreateUserRoleSchema) => void
}

export const AddEmployeeRoleForm: React.FC<IFormAddEmployeeRoleProps> = ({ onSubmit }) => {
  const { t } = useTranslation('users')
  const form = useForm<TCreateUserRoleSchema>({
    resolver: zodResolver(createUserRoleSchema),
    defaultValues: {
      user: {
        label: '',
        value: ''
      },
      role: {
        label: '',
        value: ''
      }
    }
  })

  const handleSubmit = (values: TCreateUserRoleSchema) => {
    onSubmit(values)
  }

  const formFields = {
    user: (
      <FormField
        control={form.control}
        name="user"
        render={() => (
          <FormItem>
            <FormLabel>{t('users.selectUser')}</FormLabel>
            <FormControl>
              <SelectUser
                onChange={(values) => {
                  form.setValue('user', { label: values?.label || '', value: values?.value || '' })
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
    role: (
      <FormField
        control={form.control}
        name="role"
        render={() => (
          <FormItem>
            <FormLabel>{t('users.selectRole')}</FormLabel>
            <FormControl>
              <SelectRole
                onChange={(values) => {
                  form.setValue('role', { label: values?.label || '', value: values?.value || '' })
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
          <div className="grid grid-cols-1 gap-2">
            {Object.keys(formFields).map((key) => (
              <React.Fragment key={key}>
                {formFields[key as keyof typeof formFields]}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-end">
            <Button className="flex justify-end" type="submit">
              {t('users.createUserRole')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
