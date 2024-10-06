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
import { addNewProductRequestSchema, TAddNewProductRequestSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { IProductInfo, IProductRequisitionInfo } from '@/types'
import { SelectUnit } from '../select/unit-select'

interface IFormAddNewProductProps {
  data?: IProductInfo
  onSubmit: (data: IProductRequisitionInfo) => void
}

export const AddNewProductRequestForm: React.FC<IFormAddNewProductProps> = ({ data, onSubmit }) => {
  const { t } = useTranslation('tableData')
  const isEditMode = !!data

  const form = useForm<TAddNewProductRequestSchema>({
    resolver: zodResolver(addNewProductRequestSchema),
    defaultValues: {
      // code: data?.code || '',
      slug: data?.slug || '',
      product: {
        code: data?.code || '',
        slug: data?.slug || undefined,
        name: data?.name || '',
        provider: data?.provider || '',
        unit: { name: data?.unit.name || '', slug: data?.unit.slug || '' },
        quantity: data?.quantity || 1,
        description: data?.description || ''
      },
      requestQuantity: data?.quantity || 1
    }
  })

  const handleSubmit = (values: TAddNewProductRequestSchema) => {
    console.log('values in form', values)
    const completeData: IProductRequisitionInfo = {
      ...values,
      requestQuantity: Number(values.requestQuantity),
      product: {
        ...values.product,
        unit: {
          name: values.product.unit.name,
          slug: values.product.unit.slug
        }
      }
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
                    <Input {...field} readOnly={isEditMode} />
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
                    <Input {...field} readOnly={isEditMode} />
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
                    <Input {...field} readOnly={isEditMode} />
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
                        data?.unit ? { value: data.unit.slug, label: data.unit.name } : undefined
                      }
                      isDisabled={isEditMode}
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
                    <Input {...field} readOnly={isEditMode} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end w-full">
            <Button type="submit">{isEditMode ? t('tableData.add') : t('tableData.add')}</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
