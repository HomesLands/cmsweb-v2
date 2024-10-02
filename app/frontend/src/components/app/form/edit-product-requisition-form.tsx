import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
import { addNewProductRequestSchema, TAddNewProductRequestSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { IProductInfo, IProductRequisitionInfo } from '@/types'
import { useTranslation } from 'react-i18next'
import { useRequisitionStore } from '@/stores'

interface IFormEditProductProps {
  data?: IProductRequisitionInfo
  onSubmit: (data: IProductRequisitionInfo) => void
}

export const EditProductRequisitionForm: React.FC<IFormEditProductProps> = ({ data, onSubmit }) => {
  const { t } = useTranslation('tableData')
  const { requisition } = useRequisitionStore()
  console.log('data in form', data)
  const form = useForm<TAddNewProductRequestSchema>({
    resolver: zodResolver(addNewProductRequestSchema),
    defaultValues: {
      // code: data?.product.code || '',
      // slug: data?.product.slug || '',
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

  const handleSubmit = (values: TAddNewProductRequestSchema) => {
    console.log('values in form', values)
    const completeData: IProductRequisitionInfo = {
      ...values,
      requestQuantity: Number(values.requestQuantity)
      //   description: values.description || ''
      // slug: values.product.slug
      // product: {
      //   name: values.product.name,
      //   slug: values.product.slug,
      //   code: values.product.code,
      //   provider: values.product.provider,
      //   quantity: values.product.quantity,
      //   unit: {
      //     name: values.product.unit.name,
      //     slug: values.product.unit.slug
      //   }
      // }
    }
    onSubmit(completeData)
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
