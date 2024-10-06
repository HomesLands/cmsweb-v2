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
import {
  IRequestProductInfo,
  IRequestProductInfoUpdate,
  IUpdateProductRequisitionQuantity
} from '@/types'

interface IFormEditProductProps {
  data?: IRequestProductInfoUpdate
  onSubmit: (data: IUpdateProductRequisitionQuantity) => void
}

export const UpdateProductRequisitionForm: React.FC<IFormEditProductProps> = ({
  data,
  onSubmit
}) => {
  const { t } = useTranslation('tableData')
  // console.log('data', data)
  const isEditMode = !!data
  const isExistingProduct = data?.isExistProduct || false

  // Determine which product data to use
  const productData = data?.product || data?.temporaryProduct

  const form = useForm<TUpdateProductRequestSchema>({
    resolver: zodResolver(updateProductRequestSchema),
    defaultValues: {
      slug: data?.slug || '',
      description: data?.description || '',
      isExistProduct: isExistingProduct,
      product: {
        code: productData?.code || '',
        name: productData?.name || '',
        provider: productData?.provider || '',
        unit: {
          name: productData?.unit?.name || '',
          slug: productData?.unit?.slug || ''
        },
        quantity: productData?.quantity || 1,
        description: data?.description || ''
      },
      requestQuantity: data?.requestQuantity || 1
    }
  })

  const handleSubmit = (values: TUpdateProductRequestSchema) => {
    const extractedData = {
      slug: values.slug,
      isExistProduct: values.isExistProduct,
      newQuantity: Number(values.requestQuantity),
      unit: {
        name: values.product.unit.name,
        slug: values.product.unit.slug
      }
    }
    onSubmit(extractedData)
  }

  const productCode = form.watch('product.code')

  return (
    <div className="mt-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-3 gap-2">
            {productCode && (
              <FormField
                control={form.control}
                name="product.code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('tableData.productCode')}</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="product.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('tableData.productName')}</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly={isExistingProduct} />
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
                    <Input {...field} readOnly={isExistingProduct} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                      // disabled={isEditMode}
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
                    <Input {...field} readOnly={isExistingProduct} />
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
                    <Input {...field} readOnly={isExistingProduct} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end w-full">
            <Button type="submit">{t('tableData.update')}</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
