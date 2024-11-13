import React, { useState } from 'react'
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
  Calendar
} from '@/components/ui'
import { productRequisitionSchema, TProductRequisitionSchema } from '@/schemas'
import {
  SelectProject,
  RequestPrioritySelect,
  SelectDepartmentRequisition
} from '@/components/app/select'

import { zodResolver } from '@hookform/resolvers/zod'
import { generateProductRequisitionCode } from '@/utils'
import { useRequisitionStore, useUserStore } from '@/stores'
import { ProductRequisitionType } from '@/types'
import { DateTimePicker } from '@/components/app/picker'

interface IFormCreateProductProps {
  onSubmit: (data: TProductRequisitionSchema) => void
}

export const CreateProductRequisitionForm: React.FC<IFormCreateProductProps> = ({ onSubmit }) => {
  const { t } = useTranslation('productRequisition')
  const { userInfo } = useUserStore()
  const { requisition } = useRequisitionStore()

  const [date, setDate] = useState<Date | undefined>(
    requisition?.deadlineApproval ? new Date(requisition.deadlineApproval) : undefined
  )

  const validateDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return false
    const now = new Date()
    return selectedDate > now
  }

  const form = useForm<TProductRequisitionSchema>({
    resolver: zodResolver(productRequisitionSchema),
    defaultValues: {
      code: requisition?.code || generateProductRequisitionCode(),
      requester: userInfo?.fullname || '',
      deadlineApproval: requisition?.deadlineApproval
        ? format(new Date(requisition.deadlineApproval), 'yyyy-MM-dd HH:mm:ss')
        : undefined,
      company: {
        slug: userInfo?.userDepartments?.[0]?.department?.site?.company?.slug || '',
        name: userInfo?.userDepartments?.[0]?.department?.site?.company?.name || '',
        logo: userInfo?.userDepartments?.[0]?.department?.site?.company?.logo || ''
      },

      department: {
        slug: userInfo?.userDepartments?.[0]?.department?.slug || '',
        name: userInfo?.userDepartments?.[0]?.department?.description || ''
      },

      site: {
        slug: userInfo?.userDepartments?.[0]?.department?.site?.slug || '',
        name: userInfo?.userDepartments?.[0]?.department?.site?.name || ''
      },

      type: 'normal',
      requestProducts: [],
      projectName: requisition?.projectName || '',
      // project: {
      //   slug: requisition?.project.slug || '',
      //   name: requisition?.project.name || ''
      // },
      note: requisition?.note || ''
    }
  })

  const handleDepartmentChange = (slug: string, name: string) => {
    const selectedDepartment = userInfo?.userDepartments.find(
      (item) => item.department?.slug === slug
    )
    if (selectedDepartment?.department) {
      const { site } = selectedDepartment.department
      form.setValue('department', { slug, name }) // Cập nhật department trong form
      form.setValue('company', {
        slug: site.company.slug,
        name: site.company.name,
        logo: site.company.logo
      }) // Cập nhật company
      form.setValue('site', { slug: site.slug, name: site.name }) // Cập nhật site
    }
  }

  const handleSubmit = (values: TProductRequisitionSchema) => {
    onSubmit(values)
  }

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
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    {field.value ? (
                      field.value
                    ) : (
                      <span>{t('productRequisition.deadlineApprovalDescription')}</span>
                    )}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="flex flex-col items-center justify-center w-auto gap-1 p-2">
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
    // site: (
    //   <FormField
    //     control={form.control}
    //     name="site.name"
    //     render={({ field }) => (
    //       <FormItem>
    //         <FormLabel>{t('productRequisition.constructionSite')}</FormLabel>
    //         <FormControl>
    //           <Input readOnly {...field} />
    //         </FormControl>
    //         <FormMessage />
    //       </FormItem>
    //     )}
    //   />
    // ),
    department: (
      <FormField
        control={form.control}
        name="department"
        render={() => (
          <FormItem>
            <FormLabel>{t('productRequisition.departmentName')}</FormLabel>
            <FormControl>
              <SelectDepartmentRequisition
                defaultValue={userInfo?.userDepartments[0]?.department?.slug}
                department={{ userDepartments: userInfo?.userDepartments || [] }}
                onChange={handleDepartmentChange} // Use the new handler
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
    projectName: (
      <FormField
        control={form.control}
        name="projectName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('productRequisition.projectName')}</FormLabel>
            <FormControl>
              <Input
                placeholder={t('productRequisition.projectNameDescription')}
                defaultValue={requisition?.projectName}
                {...field}
              />
              {/* <SelectProject
                defaultValue={requisition?.project.slug}
                onChange={(slug: string, name: string) => field.onChange({ slug, name })}
              /> */}
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
