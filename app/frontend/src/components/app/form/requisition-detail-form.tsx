import { useForm } from 'react-hook-form'
import { useMemo } from 'react'

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
  Form,
  Textarea,
  DataTable
} from '@/components/ui'
import { IProductRequisitionFormInfo } from '@/types'
import { useColumnsApprovalLog, useColumnsDetail } from '@/views/product-requisitions/data-table'
import { useTranslation } from 'react-i18next'

interface IFormRequisitionDetailProps {
  data?: IProductRequisitionFormInfo
}

export const RequisitionDetailForm: React.FC<IFormRequisitionDetailProps> = ({ data }) => {
  const form = useForm({
    defaultValues: {
      code: data?.code || '',
      createdAt: data?.createdAt || '',
      creator: data?.creator || '',
      description: data?.description || '',
      company: data?.creator?.userDepartments[0]?.department?.site?.company?.name || '',
      project: data?.project || '',
      type: data?.type || '',
      requestProducts: data?.requestProducts || [],
      displayStatus: '',
      statusColor: ''
    }
  })
  const { t } = useTranslation('productRequisition')

  const columns = useColumnsDetail()
  const userApprovalColumns = useColumnsApprovalLog()
  const statusInfo = useMemo(() => {
    if (!data) return { displayStatus: '', statusColor: '' }

    const { status, isRecalled } = data
    let displayStatus = ''
    let statusColor = ''

    if (status === 'waiting' && !isRecalled) {
      displayStatus = t('status.waitingStage1')
      statusColor = 'yellow'
    } else if (status === 'cancel' && isRecalled) {
      displayStatus = t('status.cancel')
      statusColor = 'red'
    } else if (status === 'accepted_stage_1' && !isRecalled) {
      displayStatus = t('status.acceptedStage1')
      statusColor = 'yellow'
    } else if (status === 'waiting' && isRecalled) {
      displayStatus = t('status.waitingStage2')
      statusColor = 'red'
    } else if (status === 'accepted_stage_2' && !isRecalled) {
      displayStatus = t('status.acceptedStage2')
      statusColor = 'yellow'
    } else if (status === 'accepted_stage_1' && isRecalled) {
      displayStatus = t('status.waitingStage3')
      statusColor = 'red'
    } else if (status === 'waiting_export' && !isRecalled) {
      displayStatus = t('status.acceptedStage3')
      statusColor = 'green'
    } else if (status === 'cancel' && !isRecalled) {
      displayStatus = t('status.cancel')
      statusColor = 'red'
    }

    return { displayStatus, statusColor }
  }, [data, t])

  // Update form values with status info
  form.setValue('displayStatus', statusInfo.displayStatus)
  form.setValue('statusColor', statusInfo.statusColor)

  const sortedUserApprovals = useMemo(() => {
    return [...(data?.userApprovals || [])].sort((a, b) =>
      a.assignedUserApproval.roleApproval.localeCompare(b.assignedUserApproval.roleApproval)
    )
  }, [data?.userApprovals])

  return (
    <div className="mt-3 max-w-[90vw] sm:max-w-full">
      <Form {...form}>
        <form className="space-y-6">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="createdAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngày tạo</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={
                        field.value
                          ? new Date(field.value)
                              .toLocaleString('vi-VN', {
                                hour: '2-digit',
                                minute: '2-digit',
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour12: false
                              })
                              .replace(',', '')
                          : ''
                      }
                      readOnly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mã yêu cầu vật tư</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên công ty</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="creator.fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Người tạo</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="project.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dự án</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loại yêu cầu</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      readOnly
                      value={field.value === 'normal' ? 'Bình thường' : 'Cần gấp'}
                      className={field.value === 'urgent' ? 'text-red-500' : ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="displayStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trạng thái</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      readOnly
                      className={`text-${form.getValues('statusColor')}-500`}
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold">
              {t('productRequisition.productRequisitionList')}
            </h3>
            <DataTable
              isLoading={false}
              data={data?.requestProducts || []}
              columns={columns}
              pages={data?.requestProducts?.length || 0}
              onPageChange={() => {}}
              onPageSizeChange={() => {}}
            />
            <h3 className="mt-4 mb-2 text-lg font-semibold">Lịch sử duyệt</h3>
            <DataTable
              isLoading={false}
              data={sortedUserApprovals}
              columns={userApprovalColumns}
              pages={sortedUserApprovals.length}
              onPageChange={() => {}}
              onPageSizeChange={() => {}}
            />
          </div>
        </form>
      </Form>
    </div>
  )
}
