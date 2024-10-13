import React from 'react'
import { useTranslation } from 'react-i18next'
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
import { createUserDepartmentSchema, TCreateUserDepartmentSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { SelectDepartment } from '@/components/app/select'
import { IUserInfo } from '@/types'

interface IFormAddEmployeeDepartmentProps {
  user: IUserInfo
  onSubmit: (data: TCreateUserDepartmentSchema) => void
}

export const AddEmployeeDepartmentForm: React.FC<IFormAddEmployeeDepartmentProps> = ({
  user,
  onSubmit
}) => {
  const { t } = useTranslation('employees')
  const form = useForm<TCreateUserDepartmentSchema>({
    resolver: zodResolver(createUserDepartmentSchema),
    defaultValues: {
      user: {
        label: user.fullname,
        value: user.slug
      },
      department: {
        label: '',
        value: ''
      }
    }
  })

  const handleSubmit = (values: TCreateUserDepartmentSchema) => {
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
    department: (
      <FormField
        control={form.control}
        name="department"
        render={() => (
          <FormItem>
            <FormLabel>{t('employees.selectDepartment')}</FormLabel>
            <FormControl>
              <SelectDepartment
                onChange={(values) => {
                  form.setValue('department', {
                    label: values?.label || '',
                    value: values?.value || ''
                  })
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
