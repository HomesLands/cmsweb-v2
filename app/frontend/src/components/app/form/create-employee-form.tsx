import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
  Form,
  Button,
  PasswordInput
} from '@/components/ui'
import { registerSchema, TCreateUserSchema, TRegisterSchema } from '@/schemas'

interface IFormCreateUserProps {
  onSubmit: (data: TCreateUserSchema) => void
}

const CreateEmployeeForm: React.FC<IFormCreateUserProps> = ({ onSubmit }) => {
  const { t } = useTranslation('employees')

  const form = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullname: '',
      password: 'Pass@1234',
      username: ''
    }
  })

  const handleSubmit = (values: TRegisterSchema) => {
    onSubmit(values)
  }

  const formFields = {
    username: (
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('employees.username')}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
    password: (
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('employees.password')}</FormLabel>
            <FormControl>
              <PasswordInput {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
    fullname: (
      <FormField
        control={form.control}
        name="fullname"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('employees.fullname')}</FormLabel>
            <FormControl>
              <Input {...field} />
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
          <div className="grid grid-cols-1 gap-2 font-beVietNam">
            {Object.keys(formFields).map((key) => (
              <React.Fragment key={key}>
                {formFields[key as keyof typeof formFields]}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-end font-beVietNam">
            <Button className="flex justify-end" type="submit">
              {t('employees.createUser')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default CreateEmployeeForm
