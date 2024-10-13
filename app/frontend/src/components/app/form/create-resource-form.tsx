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
import { createResourceSchema, TCreateResourceSchema } from '@/schemas'

import { zodResolver } from '@hookform/resolvers/zod'

interface IFormCreateResourceProps {
  onSubmit: (data: TCreateResourceSchema) => void
}

export const CreateResourceForm: React.FC<IFormCreateResourceProps> = ({ onSubmit }) => {
  const { t } = useTranslation(['resources'])

  const form = useForm<TCreateResourceSchema>({
    resolver: zodResolver(createResourceSchema),
    defaultValues: {
      name: ''
    }
  })

  const handleSubmit = (values: TCreateResourceSchema) => {
    onSubmit(values)
  }

  const formFields = {
    name: (
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('resources.name')}</FormLabel>
            <FormControl>
              <Input {...field} placeholder={t('resources.namePlaceholder')} />
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
              {t('resources.createResource')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
