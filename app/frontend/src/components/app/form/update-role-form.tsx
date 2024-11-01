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
import { TUpdateRoleSchema, updateRoleSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import React from 'react'
import { IRole } from '@/types'

interface IFormUpdateRoleProps {
  role: IRole
  onSubmit: (data: TUpdateRoleSchema) => void
}

export default function UpdateRoleForm({ role, onSubmit }: IFormUpdateRoleProps) {
  const { t } = useTranslation('roles')
  const form = useForm<TUpdateRoleSchema>({
    resolver: zodResolver(updateRoleSchema),
    defaultValues: {
      slug: role?.slug || '',
      description: role?.description || '',
      nameDisplay: role?.nameDisplay || '',
      nameNormalize: role?.nameNormalize || ''
    }
  })

  const handleSubmit = (values: TUpdateRoleSchema) => {
    onSubmit(values)
  }

  const formFields = {
    slug: (
      <FormField
        control={form.control}
        name="slug"
        render={() => (
          <FormItem>
            <FormLabel>{t('roles.slug')}</FormLabel>
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
            <FormLabel>{t('roles.nameNormalize')}</FormLabel>
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
            <FormLabel>{t('roles.nameDisplay')}</FormLabel>
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
            <FormLabel>{t('roles.description')}</FormLabel>
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
              {t('roles.updateRole')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
