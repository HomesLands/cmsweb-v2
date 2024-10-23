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
import {
  personalAccountInfoSchema,
  TPersonalAccountInfoSchema,
  TUpdateSiteSchema,
  updateSiteSchema
} from '@/schemas'

import { zodResolver } from '@hookform/resolvers/zod'
import { ISite, IUpdateSite } from '@/types'

interface IUpdateSiteFormProps {
  data?: ISite
  onSubmit: (data: IUpdateSite) => void
}

export const UpdateSiteForm: React.FC<IUpdateSiteFormProps> = ({ data, onSubmit }) => {
  const { t } = useTranslation('sites')
  console.log('data', data)

  const form = useForm<TUpdateSiteSchema>({
    resolver: zodResolver(updateSiteSchema),
    defaultValues: {
      slug: data?.slug || '',
      name: data?.name || '',
      company: data?.company.slug || ''
    }
  })

  const handleSubmit = (values: TUpdateSiteSchema) => {
    onSubmit(values)
  }

  // Define formFields similar to the first code
  const formFields = {
    slug: (
      <FormField
        control={form.control}
        name="slug"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('sites.slug')}</FormLabel>
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
            <FormLabel>{t('sites.name')}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
    company: (
      <FormField
        control={form.control}
        name="company"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('sites.company')}</FormLabel>
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
            <Button type="submit">{t('sites.update')}</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
