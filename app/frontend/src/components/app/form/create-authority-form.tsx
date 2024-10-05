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
import { createAuthoritySchema, TCreateAuthoritySchema } from '@/schemas'

import { zodResolver } from '@hookform/resolvers/zod'

interface IFormCreateAuthorityProps {
  onSubmit: (data: TCreateAuthoritySchema) => void
}

export const CreateAuthorityForm: React.FC<IFormCreateAuthorityProps> = ({ onSubmit }) => {
  const { t } = useTranslation(['authorities'])

  const form = useForm<TCreateAuthoritySchema>({
    resolver: zodResolver(createAuthoritySchema),
    defaultValues: {
      nameNormalize: '',
      description: '',
      nameDisplay: ''
    }
  })

  const handleSubmit = (values: TCreateAuthoritySchema) => {
    onSubmit(values)
  }

  const formFields = {
    nameNormalize: (
      <FormField
        control={form.control}
        name="nameNormalize"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('authorities.nameNormalize')}</FormLabel>
            <FormControl>
              <Input {...field} placeholder="CREATE_USER" />
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
              <Input {...field} placeholder="Tạo người dùng" />
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
            <FormLabel>{t('authorities.description')}</FormLabel>
            <FormControl>
              <Textarea
                placeholder={t('authorities.CreateAuthorityDescription')}
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
          <div className="grid grid-cols-1 gap-2">
            {Object.keys(formFields).map((key) => (
              <React.Fragment key={key}>
                {formFields[key as keyof typeof formFields]}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-end">
            <Button className="flex justify-end" type="submit">
              {t('authorities.createAuthority')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
