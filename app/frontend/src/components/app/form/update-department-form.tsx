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
import { IDepartment, IUpdateDepartment } from '@/types'
import { TUpdateDepartmentSchema, updateDepartmentSchema } from '@/schemas'
import { SelectSite } from '@/components/app/select'

interface IFormUpdateDepartmentProps {
  department: IDepartment
  onSubmit: (data: IUpdateDepartment) => void
}

const UpdateDepartmentForm: React.FC<IFormUpdateDepartmentProps> = ({ department, onSubmit }) => {
  const { t } = useTranslation(['department'])
  const [selectedSite, setSelectedSite] = useState<{ slug: string; name: string } | null>(null)

  const form = useForm<TUpdateDepartmentSchema>({
    resolver: zodResolver(updateDepartmentSchema),
    defaultValues: {
      slug: department.slug || '',
      nameNormalize: department.nameNormalize || '',
      description: department.description || '',
      site: department.site.slug || '',
      siteName: department.site.name || ''
    }
  })

  const handleSubmit = (values: IUpdateDepartment) => {
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
            <FormLabel>{t('department.name')}</FormLabel>
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
              {t('department.update')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export { UpdateDepartmentForm }
