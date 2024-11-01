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
  Button,
  Textarea
} from '@/components/ui'
import { createRoleSchema, TCreateRoleSchema } from '@/schemas'

import { zodResolver } from '@hookform/resolvers/zod'

interface IFormCreateRoleProps {
  onSubmit: (data: TCreateRoleSchema) => void
}

export const CreateRoleForm: React.FC<IFormCreateRoleProps> = ({ onSubmit }) => {
  const { t } = useTranslation('roles')

  const form = useForm<TCreateRoleSchema>({
    resolver: zodResolver(createRoleSchema),
    defaultValues: {
      nameNormalize: '',
      description: '',
      nameDisplay: ''
    }
  })

  const handleSubmit = (values: TCreateRoleSchema) => {
    onSubmit(values)
  }

  const formFields = {
    nameNormalize: (
      <FormField
        control={form.control}
        name="nameNormalize"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('roles.nameNormalize')}</FormLabel>
            <FormControl>
              <Input {...field} placeholder="ROLE_DIRECTOR" />
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
              <Input {...field} placeholder="Giám đốc" />
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
        render={() => (
          <FormItem>
            <FormLabel>{t('roles.description')}</FormLabel>
            <FormControl>
              <Textarea
                placeholder={t('roles.CreateRoleDescription')}
                onChange={(e) => form.setValue('description', e.target.value)}
              />
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
              {t('roles.createRole')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
