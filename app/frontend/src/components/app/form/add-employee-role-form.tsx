import { useForm } from 'react-hook-form'

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
import { createUserRoleSchema, TCreateUserRoleSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { SelectRole } from '@/components/app/select'
import { useTranslation } from 'react-i18next'
import React from 'react'
import { IUserInfo } from '@/types'

interface IFormAddEmployeeRoleProps {
  user: IUserInfo
  onSubmit: (data: TCreateUserRoleSchema) => void
}

export const AddEmployeeRoleForm: React.FC<IFormAddEmployeeRoleProps> = ({ user, onSubmit }) => {
  const { t } = useTranslation('employees')
  const form = useForm<TCreateUserRoleSchema>({
    resolver: zodResolver(createUserRoleSchema),
    defaultValues: {
      user: {
        label: user.fullname,
        value: user.slug
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
            <FormLabel>{t('employees.selectUser')}</FormLabel>
            <FormControl>
              <Input value={form.getValues('user.label')} disabled />
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
            <FormLabel>{t('employees.selectRole')}</FormLabel>
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
              {t('employees.submit')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
