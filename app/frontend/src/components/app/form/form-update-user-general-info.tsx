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
import { personalAccountInfoSchema, TPersonalAccountInfoSchema } from '@/schemas'

import { zodResolver } from '@hookform/resolvers/zod'
import { IUpdateUserGeneralInfo, IUserInfo } from '@/types'

interface IFormUpdateUserGeneralInfoProps {
  data?: IUserInfo
  onSubmit: (data: IUpdateUserGeneralInfo) => void
  onCancel: () => void // Add this line
}

export const FormUpdateUserGeneralInfo: React.FC<IFormUpdateUserGeneralInfoProps> = ({
  data,
  onSubmit,
  onCancel
}) => {
  const { t } = useTranslation('account')
  // const isEditMode = !!data

  const form = useForm<TPersonalAccountInfoSchema>({
    resolver: zodResolver(personalAccountInfoSchema),
    defaultValues: {
      fullname: data?.fullname || '',
      username: data?.username || '',
      company: data?.userDepartments[0]?.department?.site?.company?.name || '',
      site: data?.userDepartments[0]?.department?.site?.name || ''
      //   signature: data?.signature || '',
    }
  })

  const handleSubmit = (values: TPersonalAccountInfoSchema) => {
    onSubmit(values)
    onCancel()
  }

  return (
    <div className="mt-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-3 gap-2">
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('account.fullname')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('account.company')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="site"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('account.site')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ''}
                      //   onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end w-full">
            <Button variant="outline" className="mr-2" type="button" onClick={onCancel}>
              {t('account.cancel')}
            </Button>
            <Button type="submit">{t('account.update')}</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
