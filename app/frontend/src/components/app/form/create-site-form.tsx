import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

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

import { zodResolver } from '@hookform/resolvers/zod'
import { ICreateSite } from '@/types'
import { createSiteSchema, TCreateSiteSchema } from '@/schemas/sites.schema'
import { SelectCompany } from '../select'

interface ICreateSiteFormProps {
  onSubmitCreateSite: (data: ICreateSite) => void
}

export const CreateSiteForm: React.FC<ICreateSiteFormProps> = ({ onSubmitCreateSite }) => {
  const { t } = useTranslation(['sites'])
  const [selectedCompany, setSelectedCompany] = useState<{ slug: string; name: string } | null>(
    null
  )
  const form = useForm<TCreateSiteSchema>({
    resolver: zodResolver(createSiteSchema),
    defaultValues: {
      name: '',
      company: '',
      companyName: ''
    }
  })

  const handleSubmit = (values: ICreateSite) => {
    if (selectedCompany) {
      values.company = selectedCompany.slug
      values.companyName = selectedCompany.name
    }
    onSubmitCreateSite(values)
    form.reset()
    setSelectedCompany(null)
  }

  const formFields = {
    company: (
      <FormField
        control={form.control}
        name="company"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('sites.companyName')}</FormLabel>
            <FormControl>
              <SelectCompany
                onChange={(slug, name) => {
                  field.onChange(slug)
                  setSelectedCompany({ slug, name })
                  form.setValue('companyName', name) // Add this line
                }}
                defaultValue={field.value}
              />
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
              <Input {...field} placeholder="Tạo địa điểm" />
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
              {t('sites.createSite')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
