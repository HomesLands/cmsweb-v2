import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

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
import { TUpdateResourceSchema, updateResourceSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { IResource } from '@/types'

interface IFormUpdateAuthorityProps {
  resource: IResource
  onSubmit: (data: TUpdateResourceSchema) => void
}

export default function UpdateResourceForm({ resource, onSubmit }: IFormUpdateAuthorityProps) {
  const { t } = useTranslation('resources')
  const form = useForm<TUpdateResourceSchema>({
    resolver: zodResolver(updateResourceSchema),
    defaultValues: {
      slug: resource?.slug || '',
      name: resource?.name || ''
    }
  })

  const handleSubmit = (values: TUpdateResourceSchema) => {
    onSubmit(values)
  }

  const formFields = {
    slug: (
      <FormField
        control={form.control}
        name="slug"
        render={() => (
          <FormItem>
            <FormLabel>{t('resources.slug')}</FormLabel>
            <FormControl>
              <Input value={form.getValues('slug')} disabled />
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
            <FormLabel>{t('resources.name')}</FormLabel>
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
          <div className="flex justify-end">
            <Button className="flex justify-end" type="submit">
              {t('resources.updateResource')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
