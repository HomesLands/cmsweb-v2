import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'

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
import { SelectProject, SelectConstruction } from '@/components/app/select'

import { zodResolver } from '@hookform/resolvers/zod'
import { useProjectList, useSiteList } from '@/hooks'
import { IProductRequirementInfoCreate } from '@/types'
import { generateProductRequisitionCode } from '@/utils'

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
      project: {
        slug: '',
        name: ''
      },
      site: {
        slug: '',
        name: ''
      },
      approver: '',
      note: '',
      createdAt: new Date().toISOString(), // Ensure createdAt is set
      ...initialData
    }
  })

  const { data: projectList } = useProjectList()
  const { data: siteList } = useSiteList()

  const handleSubmit = (values: z.infer<typeof productSchema>) => {
    values.createdAt = new Date().toISOString() // Ensure createdAt is included
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
                  <FormLabel>{t('productRequisition.requestCode')}</FormLabel>
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
                  <FormLabel>{t('productRequisition.requester')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('productRequisition.requesterDescription')} {...field} />
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
                  <FormLabel>{t('productRequisition.projectName')}</FormLabel>
                  <FormControl>
                    <SelectProject {...field} projectList={projectList?.result ?? []} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-2">
            <FormField
              control={form.control}
              name="site"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('productRequisition.constructionSite')}</FormLabel>
                  <FormControl>
                    <SelectConstruction {...field} constructionList={siteList?.result ?? []} />
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
                  <FormLabel>{t('productRequisition.approver')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('productRequisition.approverDescription')} {...field} />
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
                <FormLabel>{t('productRequisition.note')}</FormLabel>
                <FormControl>
                  <Textarea placeholder={t('productRequisition.noteDescription')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end w-full">
            <Button type="submit">{t('productRequisition.next')}</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
