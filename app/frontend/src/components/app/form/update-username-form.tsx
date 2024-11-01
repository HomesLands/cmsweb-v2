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
import { TUpdateUsernameSchema, updateUsernameSchema } from '@/schemas'

import { zodResolver } from '@hookform/resolvers/zod'
import { IUpdateUsername, IUserInfo } from '@/types'

interface IFormUpdateUsernameProps {
  data?: IUserInfo
  onSubmit: (data: IUpdateUsername) => void
}

export default function FormUpdateUsername({ data, onSubmit }: IFormUpdateUsernameProps) {
  const { t } = useTranslation('account')

  const form = useForm<TUpdateUsernameSchema>({
    resolver: zodResolver(updateUsernameSchema),
    defaultValues: {
      slug: data?.slug || '',
      username: data?.username || ''
    }
  })

  const handleSubmit = (values: TUpdateUsernameSchema) => {
    onSubmit(values)
  }

  const formFields = {
    username: (
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('account.username')}</FormLabel>
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
            <Button type="submit">{t('account.update')}</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
