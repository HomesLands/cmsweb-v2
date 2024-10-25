import React, { useState } from 'react'
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
import {
  personalAccountInfoSchema,
  TPersonalAccountInfoSchema,
  TUpdateAccountInfoSchema,
  updateAccountInfoSchema
} from '@/schemas'

import { zodResolver } from '@hookform/resolvers/zod'
import { IUpdateUserGeneralInfo, IUserInfo } from '@/types'
import { DatePicker } from '../picker' // Your updated CustomDatePicker
import { SelectGender } from '../select'
import { format } from 'date-fns'

interface IFormUpdateUserGeneralInfoProps {
  data?: IUserInfo
  onSubmit: (data: IUpdateUserGeneralInfo) => void
}

export const FormUpdateUserGeneralInfo: React.FC<IFormUpdateUserGeneralInfoProps> = ({
  data,
  onSubmit
}) => {
  const { t } = useTranslation('account')

  const form = useForm<TUpdateAccountInfoSchema>({
    resolver: zodResolver(updateAccountInfoSchema),
    defaultValues: {
      fullname: data?.fullname || '',
      phoneNumber: data?.phoneNumber || '',
      address: data?.address || '',
      dob: data?.dob || '',
      gender: data?.gender || ''
    }
  })

  const handleSubmit = (values: TUpdateAccountInfoSchema) => {
    // Log form values
    console.log('Form Values:', values)
    onSubmit(values)
  }

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
      <FormField
        control={form.control}
        name="dob"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('account.dob')}</FormLabel>
            <FormControl>
              <DatePicker
                date={field.value}
                onSelect={(selectedDate) => {
                  field.onChange(selectedDate)
                }}
                validateDate={(date) => {
                  return true // Thay thế bằng logic xác thực thực tế của bạn
                }}
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
              <SelectGender
                value={field.value} // Truyền giá trị hiện tại từ form
                onChange={(selectedValue) => {
                  // Cập nhật giá trị trong form
                  form.setValue('gender', selectedValue)
                }}
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
          <div className="flex justify-end w-full">
            <Button type="submit">{t('account.update')}</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
