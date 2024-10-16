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
  Textarea
} from '@/components/ui'
import { IProductInfo, IProductInfoCreate, IProductInfoUpdate } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { TUpdateProductInfoSchema, updateProductInfoSchema } from '@/schemas'
import { SelectUnit } from '@/components/app/select'
import { Button } from '@/components/ui'

interface IFormUpdateProductProps {
  data?: IProductInfo
  onSubmit: (values: IProductInfoUpdate) => void
}

export const UpdateProductInfoForm: React.FC<IFormUpdateProductProps> = ({ data, onSubmit }) => {
  const form = useForm<TUpdateProductInfoSchema>({
    resolver: zodResolver(updateProductInfoSchema),
    defaultValues: {
      slug: data?.slug || '',
      code: data?.code || '',
      name: data?.name || '',
      provider: data?.provider || '',
      description: data?.description || '',
      unit: { name: data?.unit.name || '', slug: data?.unit.slug || '' }
    }
  })
  const { t } = useTranslation('products')

  const handleSubmit = (values: TUpdateProductInfoSchema) => {
    const transformedValues: IProductInfoUpdate = {
      slug: values.slug,
      code: values.code,
      name: values.name,
      provider: values.provider,
      unit: values.unit.slug,
      description: values.description
    }
    onSubmit(transformedValues)
  }

  const formFields = {
    code: (
      <FormField
        control={form.control}
        name="code"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('products.code')}</FormLabel>
            <FormControl>
              <Input {...field} />
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
            <FormLabel>{t('products.name')}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
    provider: (
      <FormField
        control={form.control}
        name="provider"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('products.provider')}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
    // quantity: (
    //   <FormField
    //     control={form.control}
    //     name="quantity"
    //     render={({ field }) => (
    //       <FormItem>
    //         <FormLabel>{t('products.quantity')}</FormLabel>
    //         <FormControl>
    //           <Input
    //             type="number"
    //             min="0"
    //             placeholder={t('products.quantity')}
    //             {...field}
    //             value={field.value || 0}
    //             onChange={(e) => field.onChange(Number(e.target.value))}
    //           />
    //         </FormControl>
    //         <FormMessage />
    //       </FormItem>
    //     )}
    //   />
    // ),
    unit: (
      <FormField
        control={form.control}
        name="unit"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('products.unit')}</FormLabel>
            <FormControl>
              <SelectUnit
                onChange={(value) =>
                  field.onChange({ name: value?.label || '', slug: value?.value || '' })
                }
                defaultValue={
                  data?.unit ? { value: data.unit.slug, label: data.unit.name } : undefined
                }
              />
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
            <FormLabel>{t('products.description')}</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    )
  }

  return (
    <div className="mt-3 max-w-[90vw] sm:max-w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {Object.keys(formFields).map((key) => (
            <React.Fragment key={key}>{formFields[key as keyof typeof formFields]}</React.Fragment>
          ))}
          <div className="flex justify-end w-full">
            <Button type="submit">{t('products.update')}</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
