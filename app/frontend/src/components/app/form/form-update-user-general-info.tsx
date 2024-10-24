import React from 'react'
import { useForm, Controller } from 'react-hook-form'
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
import { DatePicker } from '../picker' // Your updated CustomDatePicker

interface IFormUpdateUserGeneralInfoProps {
  data?: IUserInfo
  onSubmit: (data: IUpdateUserGeneralInfo) => void
}

export const FormUpdateUserGeneralInfo: React.FC<IFormUpdateUserGeneralInfoProps> = ({
  data,
  onSubmit
}) => {
  const { t } = useTranslation('account')

  const form = useForm<TPersonalAccountInfoSchema>({
    resolver: zodResolver(personalAccountInfoSchema),
    defaultValues: {
      fullname: data?.fullname || '',
      username: data?.username || '',
      company: data?.userDepartments[0]?.department?.site?.company?.name || '',
      site: data?.userDepartments[0]?.department?.site?.name || '',
      address: data?.address || '',
      phoneNumber: data?.phoneNumber || '',
      dob: data?.dob || '',
      gender: data?.gender || ''
    }
  })

  const handleSubmit = (values: TPersonalAccountInfoSchema) => {
    onSubmit(values)
  }

  // Define formFields similar to the first code
  const formFields = {
    fullname: (
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
    ),
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
    ),
    phoneNumber: (
      <FormField
        control={form.control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('account.phoneNumber')}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
    address: (
      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('account.address')}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
    dob: (
      <Controller
        control={form.control}
        name="dob"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('account.dob')}</FormLabel>
            <FormControl>
              <DatePicker
                date={field.value ? new Date(field.value) : undefined} // Convert string to Date
                onSelect={(selectedDate) => field.onChange(selectedDate)} // Pass selected date to form
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
    gender: (
      <FormField
        control={form.control}
        name="gender"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('account.gender')}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
    company: (
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
    ),
    site: (
      <FormField
        control={form.control}
        name="site"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('account.site')}</FormLabel>
            <FormControl>
              <Input {...field} value={field.value || ''} />
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
