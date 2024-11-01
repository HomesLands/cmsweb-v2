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
import { TUpdateCompanySchema, updateCompanySchema } from '@/schemas'

import { zodResolver } from '@hookform/resolvers/zod'
import { ICompany, IUpdateCompany } from '@/types'

interface IFormUpdateCompanyProps {
  company?: ICompany
  onSubmit: (data: IUpdateCompany) => void
}

export default function UpdateCompanyForm({ company, onSubmit }: IFormUpdateCompanyProps) {
  const { t } = useTranslation('companies')

  const form = useForm<TUpdateCompanySchema>({
    resolver: zodResolver(updateCompanySchema),
    defaultValues: {
      slug: company?.slug || '',
      name: company?.name || ''
    }
  })

  const handleSubmit = (values: TUpdateCompanySchema) => onSubmit(values)

  const formFields = {
    slug: (
      <FormField
        control={form.control}
        name="slug"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('companies.slug')}</FormLabel>
            <FormControl>
              <Input readOnly disabled {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
    name: (
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('companies.name')}</FormLabel>
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
          <div className="grid grid-cols-1 gap-2">
            {Object.keys(formFields).map((key) => (
              <React.Fragment key={key}>
                {formFields[key as keyof typeof formFields]}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-end w-full">
            <Button type="submit">{t('companies.update')}</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
