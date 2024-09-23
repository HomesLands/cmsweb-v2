import React from 'react'
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
import {
  SelectProject,
  SelectSite,
  RequestPrioritySelect,
  SelectCompany
} from '@/components/app/select'

import { zodResolver } from '@hookform/resolvers/zod'
import { useUser } from '@/hooks'
import { generateProductRequisitionCode } from '@/utils'
import { useAuthStore, useRequisitionStore } from '@/stores'

interface IFormCreateProductProps {
  onSubmit: (data: z.infer<typeof productSchema>) => void
}

export const CreateProductRequisitionForm: React.FC<IFormCreateProductProps> = ({ onSubmit }) => {
  const { t } = useTranslation('productRequisition')
  const { slug } = useAuthStore()
  const { data } = useUser(slug || '')
  const { requisition } = useRequisitionStore()

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      code: requisition?.code || generateProductRequisitionCode(),
      requester: data?.result?.fullname || '',
      company: {
        slug: requisition?.company?.slug || '',
        directorSlug: requisition?.company?.directorSlug || '',
        name: requisition?.company?.name || ''
      },
      project: {
        slug: requisition?.project.slug || '',
        managerSlug: requisition?.project.managerSlug || '',
        name: requisition?.project.name || ''
      },
      site: {
        slug: requisition?.site.slug || '',
        managerSlug: requisition?.site.managerSlug || '',
        name: requisition?.site.name || ''
      },
      type: 'normal',
      requestProducts: [],
      userApprovals: [],
      note: requisition?.note || ''
    }
  })

  const handleSubmit = (values: z.infer<typeof productSchema>) => {
    onSubmit(values)
  }

  const handleChoosePriority = (value: 'normal' | 'urgent') => {
    form.setValue('type', value)
  }

  const formFields = {
    code: (
      <FormField
        control={form.control}
        name="code"
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
    ),
    type: (
      <FormField
        control={form.control}
        name="type"
        render={() => (
          <FormItem>
            <FormLabel>{t('productRequisition.priority')}</FormLabel>
            <FormControl>
              <RequestPrioritySelect
                defaultValue={requisition?.type}
                onChange={handleChoosePriority as (value: string) => void}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
    requester: (
      <FormField
        control={form.control}
        name="requester"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('productRequisition.requester')}</FormLabel>
            <FormControl>
              <Input
                readOnly
                placeholder={t('productRequisition.requesterDescription')}
                {...field}
              />
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
            <FormLabel>{t('productRequisition.companyName')}</FormLabel>
            <FormControl>
              <SelectCompany
                defaultValue={requisition?.company?.slug}
                onChange={(slug: string, directorSlug: string, name: string) =>
                  field.onChange({ slug, directorSlug, name })
                }
              />
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
            <FormLabel>{t('productRequisition.constructionSite')}</FormLabel>
            <FormControl>
              <SelectSite
                defaultValue={requisition?.site.slug}
                onChange={(value: { slug: string; managerSlug: string; name: string }) =>
                  field.onChange(value)
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
    project: (
      <FormField
        control={form.control}
        name="project"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('productRequisition.projectName')}</FormLabel>
            <FormControl>
              <SelectProject
                defaultValue={requisition?.project.slug}
                onChange={(value: { slug: string; managerSlug: string; name: string }) =>
                  field.onChange(value)
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
    note: (
      <FormField
        control={form.control}
        name="note"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('productRequisition.note')}</FormLabel>
            <FormControl>
              <Textarea
                placeholder={t('productRequisition.noteDescription')}
                defaultValue={requisition?.note}
                {...field}
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
          <div className="flex justify-end">
            <Button
              className="flex justify-end"
              type="submit"
              onClick={() => console.log({ values: form.getValues() })}
            >
              {t('productRequisition.next')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
