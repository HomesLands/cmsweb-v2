import { useForm } from 'react-hook-form'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
  Form,
  Button,
  Textarea
} from '@/components/ui'
import { productSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { IProductRequirementInfoCreate } from '@/types'
import { generateProductRequisitionCode } from '@/utils'
import { useTranslation } from 'react-i18next'

interface IFormCreateProductProps {
  onSubmit: (data: z.infer<typeof productSchema>) => void
  initialData?: IProductRequirementInfoCreate | null
}

export const CreateProductRequisitionForm: React.FC<IFormCreateProductProps> = ({
  onSubmit,
  initialData
}) => {
  const { t } = useTranslation('productRequisition')
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      requestCode: generateProductRequisitionCode(),
      requester: '',
      project: '',
      construction: '',
      approver: '',
      note: '',
      ...initialData
    }
  })

  const handleSubmit = (values: z.infer<typeof productSchema>) => {
    onSubmit(values)
  }

  return (
    <div className="mt-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-2">
            <FormField
              control={form.control}
              name="requestCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('product_requisition.request_code')}</FormLabel>
                  <FormControl>
                    <Input readOnly {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="requester"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('product_requisition.requester')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('product_requisition.requester_description')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="project"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('product_requisition.project_name')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('product_requisition.project_name_description')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-2">
            <FormField
              control={form.control}
              name="construction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('product_requisition.construction_site')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('product_requisition.construction_site_description')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="approver"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('product_requisition.approver')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('product_requisition.approver_description')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('product_requisition.note')}</FormLabel>
                <FormControl>
                  <Textarea placeholder={t('product_requisition.note_description')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end w-full">
            <Button type="submit">{t('product_requisition.next')}</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
