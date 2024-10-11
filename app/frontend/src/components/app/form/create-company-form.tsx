import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
  Form,
  Button
} from '@/components/ui'
import { createCompanySchema, TCreateCompanySchema } from '@/schemas'

import { zodResolver } from '@hookform/resolvers/zod'
import { ICreateCompany } from '@/types'

interface IFormCreateCompanyProps {
  onSubmit: (data: ICreateCompany) => void
}

export const CreateCompanyForm: React.FC<IFormCreateCompanyProps> = ({ onSubmit }) => {
  const { t } = useTranslation(['companies'])

  const form = useForm<TCreateCompanySchema>({
    resolver: zodResolver(createCompanySchema),
    defaultValues: {
      name: ''
    }
  })

  const handleSubmit = (values: ICreateCompany) => {
    onSubmit(values)
    form.reset()
  }

  const formFields = {
    name: (
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('companies.name')}</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Tạo công ty" />
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
              {t('companies.createCompany')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
