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
import {
  TUpdateAuthoritySchema,
  TUpdateRoleSchema,
  updateAuthoritySchema,
  updateRoleSchema
} from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import React from 'react'
import { IAuthority } from '@/types'

interface IFormUpdateAuthorityProps {
  authority: IAuthority
  onSubmit: (data: TUpdateAuthoritySchema) => void
}

export default function UpdateAuthorityForm({ authority, onSubmit }: IFormUpdateAuthorityProps) {
  const { t } = useTranslation('authorities')
  const form = useForm<TUpdateAuthoritySchema>({
    resolver: zodResolver(updateAuthoritySchema),
    defaultValues: {
      slug: authority?.slug || '',
      description: authority?.description || '',
      nameDisplay: authority?.nameDisplay || '',
      nameNormalize: authority?.nameNormalize || ''
    }
  })

  const handleSubmit = (values: TUpdateAuthoritySchema) => {
    onSubmit(values)
  }

  const formFields = {
    slug: (
      <FormField
        control={form.control}
        name="slug"
        render={() => (
          <FormItem>
            <FormLabel>{t('authorities.slug')}</FormLabel>
            <FormControl>
              <Input value={form.getValues('slug')} disabled />
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
            <FormLabel>{t('authorities.nameNormalize')}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
    nameDisplay: (
      <FormField
        control={form.control}
        name="nameDisplay"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('authorities.nameDisplay')}</FormLabel>
            <FormControl>
              <Input {...field} />
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
            <FormLabel>{t('authorities.description')}</FormLabel>
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
              {t('authorities.updateAuthority')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
