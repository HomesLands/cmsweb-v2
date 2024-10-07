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
import { TUpdateProductRequestSchema, updateProductRequestSchema } from '@/schemas'

import { zodResolver } from '@hookform/resolvers/zod'
import { IRequestProductInfoUpdate, IUpdateProductRequisitionQuantity } from '@/types'
import { SelectUnit } from '../select'

interface IFormEditProductProps {
  data?: IRequestProductInfoUpdate
  onSubmit: (data: IUpdateProductRequisitionQuantity) => void
}

export const UpdateProductRequisitionForm: React.FC<IFormEditProductProps> = ({
  data,
  onSubmit
}) => {
  const { t } = useTranslation('tableData')
  // const isEditMode = !!data
  const isExistingProduct = data?.isExistProduct || false

  const productData = data?.product || data?.temporaryProduct

  const form = useForm<TUpdateProductRequestSchema>({
    resolver: zodResolver(updateProductRequestSchema),
    defaultValues: {
      slug: data?.slug || '',
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
        description: productData?.description || ''
      },
      requestQuantity: data?.requestQuantity || 1
    }
  })

  const handleSubmit = (values: TUpdateProductRequestSchema) => {
    const extractedData = {
      slug: values.slug,
      isExistProduct: values.isExistProduct,
      requestQuantity: Number(values.requestQuantity),
      unit: values.product.unit.slug,
      name: values.product.name,
      provider: values.product.provider,
      description: values.product.description
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
              name="product.unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('tableData.unit')}</FormLabel>
                  <FormControl>
                    <SelectUnit
                      onChange={(value) =>
                        field.onChange({ name: value?.label || '', slug: value?.value || '' })
                      }
                      defaultValue={
                        productData?.unit
                          ? { value: productData.unit.slug, label: productData.unit.name }
                          : undefined
                      }
                      isDisabled={isExistingProduct}
                    />
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
