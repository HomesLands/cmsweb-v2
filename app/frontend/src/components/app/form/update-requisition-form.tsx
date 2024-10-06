import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
  Form,
  Button,
  Textarea,
  PopoverTrigger,
  Popover,
  PopoverContent,
  Calendar,
  // DataTableRequisition,
  DataTable
} from '@/components/ui'
import {
  productRequisitionGeneralInfoSchema,
  productRequisitionSchema,
  TProductRequisitionGeneralInfoSchema,
  TProductRequisitionSchema,
  TUpdateProductRequisitionGeneralInfoSchema
} from '@/schemas'
import { SelectProject, RequestPrioritySelect } from '@/components/app/select'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  IProductInfo,
  IProductRequisitionFormInfo,
  IProductRequisitionInfo,
  IUpdateProductRequisitionGeneralInfo,
  IUpdateProductRequisitionQuantity,
  ProductRequisitionType
} from '@/types'
import { DateTimePicker } from '@/components/app/picker'
import { useColumnsUpdateRequisition } from '@/views/product-requisitions/data-table/columns/columnsUpdateRequisition'
import { useParams } from 'react-router'
import {
  useUpdateProductRequisitionGeneralInfo,
  useUpdateProductRequisitionQuantity
} from '@/hooks'
import { showToast } from '@/utils'

interface IUpdateRequisitionFormProps {
  requisition: IProductRequisitionFormInfo
  onUpdateProductSubmit: (data: IUpdateProductRequisitionQuantity) => void
  onUpdateGeneralInfo: (data: IUpdateProductRequisitionGeneralInfo) => void
  onDeleteProductSubmit: (requestProductSlug: string) => void
  isLoading: boolean
}

export const UpdateRequisitionForm: React.FC<IUpdateRequisitionFormProps> = ({
  onUpdateProductSubmit,
  onUpdateGeneralInfo,
  onDeleteProductSubmit,
  requisition,
  isLoading
}) => {
  const { t } = useTranslation('productRequisition')
  const { t: tToast } = useTranslation('toast')
  const isExistProduct = requisition?.requestProducts.some((product) => product.isExistProduct)
  const { slug } = useParams()
  const { mutate: updateProduct } = useUpdateProductRequisitionGeneralInfo()

  const [date, setDate] = useState<Date | undefined>(
    requisition?.deadlineApproval ? new Date(requisition.deadlineApproval) : undefined
  )

  const validateDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return false
    const now = new Date()
    return selectedDate > now
  }

  const form = useForm<TProductRequisitionGeneralInfoSchema>({
    resolver: zodResolver(productRequisitionGeneralInfoSchema),
    defaultValues: {
      code: requisition?.code || '',
      requester: requisition?.creator.fullname || '',
      deadlineApproval: requisition?.deadlineApproval || '',
      company: {
        slug: requisition?.creator.userDepartments[0]?.department?.site?.company?.slug || '',
        name: requisition?.creator.userDepartments[0]?.department?.site?.company?.name || ''
      },
      site: {
        slug: requisition?.creator.userDepartments[0]?.department?.site?.slug || '',
        name: requisition?.creator.userDepartments[0]?.department?.site?.name || ''
      },
      type: requisition?.type || 'normal',
      // requestProducts: requisition?.requestProducts || [],
      // userApprovals: requisition?.userApprovals || [],
      project: {
        slug: requisition?.project.slug || '',
        name: requisition?.project.name || ''
      },
      note: requisition?.description || ''
    }
  })

  useEffect(() => {
    if (requisition) {
      form.reset({
        code: requisition.code || '',
        requester: requisition.creator.fullname || '',
        deadlineApproval: requisition.deadlineApproval
          ? format(new Date(requisition.deadlineApproval), 'yyyy-MM-dd HH:mm:ss')
          : undefined,
        company: {
          slug: requisition.creator.userDepartments[0]?.department?.site?.company?.slug || '',
          name: requisition.creator.userDepartments[0]?.department?.site?.company?.name || ''
        },
        site: {
          slug: requisition.creator.userDepartments[0]?.department?.site?.slug || '',
          name: requisition.creator.userDepartments[0]?.department?.site?.name || ''
        },
        type: requisition.type || 'normal',
        // requestProducts: requisition.requestProducts || [],
        // userApprovals: requisition.userApprovals || [],
        project: {
          slug: requisition.project.slug || '',
          name: requisition.project.name || ''
        },
        note: requisition.description || ''
      })
      setDate(requisition.deadlineApproval ? new Date(requisition.deadlineApproval) : undefined)
    }
  }, [requisition, form])

  const handleEditProduct = (product: IUpdateProductRequisitionQuantity) => {
    onUpdateProductSubmit(product)
  }

  const handleDeleteProduct = (requestProductSlug: string) => {
    onDeleteProductSubmit(requestProductSlug)
  }

  const handleUpdateGeneralInfo = (values: TProductRequisitionGeneralInfoSchema) => {
    console.log('Form values:', values)

    const updatedValues: IUpdateProductRequisitionGeneralInfo = {
      slug: slug as string,
      type: values.type,
      deadlineApproval: values.deadlineApproval,
      project: values.project,
      description: values.note
    }
    onUpdateGeneralInfo(updatedValues)
  }

  const columns = useColumnsUpdateRequisition(
    isExistProduct,
    handleEditProduct,
    handleDeleteProduct
  )

  const handleChoosePriority = (value: ProductRequisitionType) => {
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
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('productRequisition.priority')}</FormLabel>
            <FormControl>
              <RequestPrioritySelect
                defaultValue={form.getValues('type')}
                value={field.value}
                onChange={(value: ProductRequisitionType) => {
                  field.onChange(value)
                  handleChoosePriority(value)
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
    deadlineApproval: (
      <FormField
        control={form.control}
        name="deadlineApproval"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('productRequisition.deadlineApproval')}</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 w-4 h-4" />
                    {field.value ? field.value : <span>Chọn ngày và thời gian</span>}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-auto">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => {
                    if (newDate) {
                      const newDateTime = date
                        ? new Date(
                            date.setFullYear(
                              newDate.getFullYear(),
                              newDate.getMonth(),
                              newDate.getDate()
                            )
                          )
                        : newDate
                      if (validateDate(newDateTime)) {
                        setDate(newDateTime)
                        field.onChange(format(newDateTime, 'yyyy-MM-dd HH:mm:ss'))
                      }
                    }
                  }}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
                <DateTimePicker
                  date={date}
                  setDate={(newDate) => {
                    if (newDate && validateDate(newDate)) {
                      setDate(newDate)
                      field.onChange(format(newDate, 'yyyy-MM-dd HH:mm:ss'))
                    }
                  }}
                />
              </PopoverContent>
            </Popover>
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
        name="company.name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('productRequisition.companyName')}</FormLabel>
            <FormControl>
              <Input readOnly {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
    site: (
      <FormField
        control={form.control}
        name="site.name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('productRequisition.constructionSite')}</FormLabel>
            <FormControl>
              <Input readOnly {...field} />
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
                defaultValue={form.getValues('project').slug}
                value={field.value.slug} // Add this line
                onChange={(slug: string, name: string) => field.onChange({ slug, name })}
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
                defaultValue={requisition?.description}
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
        <form onSubmit={form.handleSubmit(handleUpdateGeneralInfo)} className="space-y-6">
          <div className="grid grid-cols-1 gap-2">
            {Object.keys(formFields).map((key) => (
              <React.Fragment key={key}>
                {formFields[key as keyof typeof formFields]}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-end">
            <Button type="submit">Cập nhật</Button>
          </div>
        </form>
      </Form>
      <div className="mt-3">
        <DataTable
          isLoading={isLoading}
          columns={columns}
          data={
            requisition?.requestProducts?.map((item) => ({
              ...item,
              product: item.product || item.temporaryProduct || ({} as IProductInfo)
            })) || []
          }
          pages={1}
          onPageChange={() => {}}
          onPageSizeChange={() => {}}
        />
      </div>
    </div>
  )
}
