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
  // DataTableRequisition
} from '@/components/ui'
import { TUpdateProductRequestSchema, updateProductRequestSchema } from '@/schemas'

import { zodResolver } from '@hookform/resolvers/zod'
import { IRequestProductInfo, IUpdateProductRequisitionQuantity } from '@/types'

interface IFormEditProductProps {
  data?: IRequestProductInfo
  onSubmit: (data: IUpdateProductRequisitionQuantity) => void
}

export const UpdateProductRequisitionForm: React.FC<IFormEditProductProps> = ({
  data,
  onSubmit
}) => {
  const { t } = useTranslation('tableData')
  console.log('requisition data in form', data)
  // const { slug } = useParams()
  // const { data: requisitionData, isLoading } = useProductRequisitionBySlug(slug as string)

  // const productRequisition = requisitionData?.result

  // console.log('data in form', data)
  const form = useForm<TUpdateProductRequestSchema>({
    resolver: zodResolver(updateProductRequestSchema),
    defaultValues: {
      slug: data?.slug || '',
      product: {
        code: data?.product.code || '',
        slug: data?.product.slug || '',
        name: data?.product.name || '',
        provider: data?.product.provider || '',
        unit: { name: data?.product.unit.name || '', slug: data?.product.unit.slug || '' },
        quantity: data?.product.quantity || 1,
        description: data?.product.description
      },
      requestQuantity: data?.requestQuantity || 1
      //   description: data?.description || ''
    }
  })

  const handleSubmit = (values: TUpdateProductRequestSchema) => {
    console.log('values in form', values)
    const extractedData = {
      slug: values.slug,
      newQuantity: Number(values.requestQuantity)
    }
    console.log('Extracted data:', extractedData)
    onSubmit(extractedData)
  }

  return (
    <div className="mt-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-3 gap-2">
            <FormField
              control={form.control}
              name="product.code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('tableData.productCode')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="product.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('tableData.productName')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="product.provider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('tableData.provider')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <FormField
              control={form.control}
              name="requestQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('tableData.quantity')}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      placeholder={t('tableData.quantity')}
                      {...field}
                      value={field.value || 1}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="product.unit.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('tableData.unit')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="product.description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('tableData.description')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end w-full">
            <Button type="submit">{t('tableData.add')}</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
