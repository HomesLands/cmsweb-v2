import React, { useState } from 'react'
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

import { zodResolver } from '@hookform/resolvers/zod'
import { ICreateDepartment } from '@/types'
import { createDepartmentSchema, TCreateDepartmentSchema } from '@/schemas'
import { SelectSite } from '@/components/app/select'

interface IFormCreateDepartmentProps {
  onSubmit: (data: ICreateDepartment) => void
}

export const CreateDepartmentForm: React.FC<IFormCreateDepartmentProps> = ({ onSubmit }) => {
  const { t } = useTranslation(['department'])
  const [selectedSite, setSelectedSite] = useState<{ slug: string; name: string } | null>(null)

  const form = useForm<TCreateDepartmentSchema>({
    resolver: zodResolver(createDepartmentSchema),
    defaultValues: {
      nameNormalize: '',
      description: '',
      site: '',
      siteName: ''
    }
  })

  const handleSubmit = (values: ICreateDepartment) => {
    if (selectedSite) {
      values.site = selectedSite.slug
      values.siteName = selectedSite.name
    }
    onSubmit(values)
    form.reset()
    setSelectedSite(null)
  }

  const formFields = {
    site: (
      <FormField
        control={form.control}
        name="site"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('department.siteName')}</FormLabel>
            <FormControl>
              <SelectSite
                onChange={(slug, name) => {
                  field.onChange(slug)
                  setSelectedSite({ slug, name })
                  form.setValue('siteName', name) // Add this line
                }}
                defaultValue={field.value}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
    nameNormalize: (
      <FormField
        control={form.control}
        name="nameNormalize"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('department.nameNormalize')}</FormLabel>
            <FormControl>
              <Input {...field} placeholder={t('department.nameNormalizeDescription')} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
    description: (
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('department.description')}</FormLabel>
            <FormControl>
              <Input {...field} placeholder={t('department.descriptionDescription')} />
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
              {t('department.create')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
