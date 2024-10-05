import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import { useParams } from 'react-router'

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
  DataTableRequisition
} from '@/components/ui'
import {
  productRequisitionSchema,
  TAddNewProductRequestSchema,
  TProductRequisitionSchema,
  TUpdateProductRequestSchema,
  updateProductRequestSchema
} from '@/schemas'
import { SelectProject, RequestPrioritySelect } from '@/components/app/select'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  IProductRequisitionFormInfo,
  IProductRequisitionInfo,
  IRequestProductInfo,
  IUpdateProductRequisitionQuantity,
  ProductRequisitionType
} from '@/types'
import { DateTimePicker } from '@/components/app/picker'
import { useColumnsUpdateRequisition } from '@/views/product-requisitions/DataTable/columnsUpdateRequisition'
import { useUpdateProductRequisitionQuantity, useProductRequisitionBySlug } from '@/hooks'
import { useRequisitionStore } from '@/stores'

interface IUpdateRequisitionFormProps {
  onSubmit: (data: IProductRequisitionFormInfo) => void
}

// export const UpdateProductQuantityRequisitionForm: React.FC<IUpdateRequisitionFormProps> = ({
//   onSubmit
// }) => {
//   const { t } = useTranslation('productRequisition')
//   const { slug } = useParams()
//   const { data, isLoading } = useProductRequisitionBySlug(slug as string)

//   const requisition = data?.result
//   console.log('requisition', requisition)

//   const [date, setDate] = useState<Date | undefined>(
//     requisition?.deadlineApproval ? new Date(requisition.deadlineApproval) : undefined
//   )

//   const validateDate = (selectedDate: Date | undefined) => {
//     if (!selectedDate) return false
//     const now = new Date()
//     return selectedDate > now
//   }

//   const form = useForm<TProductRequisitionSchema>({
//     resolver: zodResolver(productRequisitionSchema),
//     defaultValues: {
//       code: requisition?.code || '',
//       requester: requisition?.creator.fullname || '',
//       deadlineApproval: requisition?.deadlineApproval
//         ? format(new Date(requisition.deadlineApproval), 'yyyy-MM-dd HH:mm:ss')
//         : undefined,
//       company: {
//         slug: requisition?.creator.userDepartments[0]?.department?.site?.company?.slug || '',
//         name: requisition?.creator.userDepartments[0]?.department?.site?.company?.name || ''
//       },
//       site: {
//         slug: requisition?.creator.userDepartments[0]?.department?.site?.slug || '',
//         name: requisition?.creator.userDepartments[0]?.department?.site?.name || ''
//       },
//       type: requisition?.type || 'normal',
//       requestProducts: requisition?.requestProducts || [],
//       userApprovals: requisition?.userApprovals || [],
//       project: {
//         slug: requisition?.project.slug || '',
//         name: requisition?.project.name || ''
//       },
//       note: requisition?.description || ''
//     }
//   })

//   useEffect(() => {
//     if (requisition) {
//       form.reset({
//         code: requisition.code || '',
//         requester: requisition.creator.fullname || '',
//         deadlineApproval: requisition.deadlineApproval
//           ? format(new Date(requisition.deadlineApproval), 'yyyy-MM-dd HH:mm:ss')
//           : undefined,
//         company: {
//           slug: requisition.creator.userDepartments[0]?.department?.site?.company?.slug || '',
//           name: requisition.creator.userDepartments[0]?.department?.site?.company?.name || ''
//         },
//         site: {
//           slug: requisition.creator.userDepartments[0]?.department?.site?.slug || '',
//           name: requisition.creator.userDepartments[0]?.department?.site?.name || ''
//         },
//         type: requisition.type || 'normal',
//         requestProducts: requisition.requestProducts || [],
//         userApprovals: requisition.userApprovals || [],
//         project: {
//           slug: requisition.project.slug || '',
//           name: requisition.project.name || ''
//         },
//         note: requisition.description || ''
//       })
//       setDate(requisition.deadlineApproval ? new Date(requisition.deadlineApproval) : undefined)
//     }
//   }, [requisition, form])

//   const handleEditProduct = (product: IProductRequisitionFormInfo) => {
//     console.log('product', product)
//     // onSubmit(product)
//     // try {
//     //   const response:
//     // } catch (error) {

//     // }
//     // updateProductToRequisition(product, product.requestQuantity)
//   }

//   const handleDeleteProduct = (product: IProductRequisitionInfo) => {
//     console.log('product', product)
//     // deleteProductToRequisition(product)
//   }

//   const columns = useColumnsUpdateRequisition(handleEditProduct, handleDeleteProduct)

//   // const handleSubmit = (values: IUpdateProductRequisitionQuantity) => {
//   //   console.log('values', values)

//   // }

//   const handleChoosePriority = (value: ProductRequisitionType) => {
//     form.setValue('type', value)
//   }

//   const formFields = {
//     code: (
//       <FormField
//         control={form.control}
//         name="code"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>{t('productRequisition.requestCode')}</FormLabel>
//             <FormControl>
//               <Input readOnly {...field} />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//     ),
//     type: (
//       <FormField
//         control={form.control}
//         name="type"
//         render={() => (
//           <FormItem>
//             <FormLabel>{t('productRequisition.priority')}</FormLabel>
//             <FormControl>
//               <RequestPrioritySelect
//                 defaultValue={form.getValues('type')}
//                 onChange={handleChoosePriority as (value: string) => void}
//               />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//     ),
//     deadlineApproval: (
//       <FormField
//         control={form.control}
//         name="deadlineApproval"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>{t('productRequisition.deadlineApproval')}</FormLabel>
//             <Popover>
//               <PopoverTrigger asChild>
//                 <FormControl>
//                   <Button
//                     variant={'outline'}
//                     className={cn(
//                       'w-full justify-start text-left font-normal',
//                       !field.value && 'text-muted-foreground'
//                     )}
//                   >
//                     <CalendarIcon className="w-4 h-4 mr-2" />
//                     {field.value ? field.value : <span>Chọn ngày và thời gian</span>}
//                   </Button>
//                 </FormControl>
//               </PopoverTrigger>
//               <PopoverContent className="w-auto p-0">
//                 <Calendar
//                   mode="single"
//                   selected={date}
//                   onSelect={(newDate) => {
//                     if (newDate) {
//                       const newDateTime = date
//                         ? new Date(
//                             date.setFullYear(
//                               newDate.getFullYear(),
//                               newDate.getMonth(),
//                               newDate.getDate()
//                             )
//                           )
//                         : newDate
//                       if (validateDate(newDateTime)) {
//                         setDate(newDateTime)
//                         field.onChange(format(newDateTime, 'yyyy-MM-dd HH:mm:ss'))
//                       }
//                     }
//                   }}
//                   initialFocus
//                   disabled={(date) => date < new Date()}
//                 />
//                 <DateTimePicker
//                   date={date}
//                   setDate={(newDate) => {
//                     if (newDate && validateDate(newDate)) {
//                       setDate(newDate)
//                       field.onChange(format(newDate, 'yyyy-MM-dd HH:mm:ss'))
//                     }
//                   }}
//                 />
//               </PopoverContent>
//             </Popover>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//     ),
//     requester: (
//       <FormField
//         control={form.control}
//         name="requester"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>{t('productRequisition.requester')}</FormLabel>
//             <FormControl>
//               <Input
//                 readOnly
//                 placeholder={t('productRequisition.requesterDescription')}
//                 {...field}
//               />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//     ),
//     company: (
//       <FormField
//         control={form.control}
//         name="company.name"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>{t('productRequisition.companyName')}</FormLabel>
//             <FormControl>
//               <Input readOnly {...field} />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//     ),
//     site: (
//       <FormField
//         control={form.control}
//         name="site.name"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>{t('productRequisition.constructionSite')}</FormLabel>
//             <FormControl>
//               <Input readOnly {...field} />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//     ),
//     project: (
//       <FormField
//         control={form.control}
//         name="project"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>{t('productRequisition.projectName')}</FormLabel>
//             <FormControl>
//               <SelectProject
//                 defaultValue={form.getValues('project').slug}
//                 value={field.value.slug} // Add this line
//                 onChange={(slug: string, name: string) => field.onChange({ slug, name })}
//               />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//     ),
//     note: (
//       <FormField
//         control={form.control}
//         name="note"
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>{t('productRequisition.note')}</FormLabel>
//             <FormControl>
//               <Textarea
//                 placeholder={t('productRequisition.noteDescription')}
//                 defaultValue={requisition?.description}
//                 {...field}
//               />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//     )
//   }

//   return (
//     <div className="mt-3">
//       <Form {...form}>
//         <form className="space-y-6">
//           <div className="grid grid-cols-1 gap-2">
//             {Object.keys(formFields).map((key) => (
//               <React.Fragment key={key}>
//                 {formFields[key as keyof typeof formFields]}
//               </React.Fragment>
//             ))}
//           </div>
//         </form>
//       </Form>
//       <DataTableRequisition
//         isLoading={isLoading}
//         columns={columns}
//         data={requisition?.requestProducts || []}
//         page={1}
//         pages={1}
//         pageSize={requisition?.requestProducts?.length || 0}
//         onPageChange={() => {}}
//       />
//     </div>
//   )
// }

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
