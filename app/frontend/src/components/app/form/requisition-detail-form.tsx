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
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui'
import { IRequestRequisitionInfo } from '@/types'

interface IFormRequisitionDetailProps {
  companyName: string
  data?: IRequestRequisitionInfo
}

export const RequisitionDetailForm: React.FC<IFormRequisitionDetailProps> = ({
  companyName,
  data
}) => {
  const form = useForm({
    defaultValues: {
      code: data?.code || '',
      createdAt: data?.createdAt || '',
      creator: data?.creator || '',
      status: data?.status || '',
      description: data?.description || '',
      // deadlineApproval: data?.deadlineApproval || '',
      companyName: companyName || '',
      project: data?.project || '',
      type: data?.type || '',
      requestProducts: data?.requestProducts || [],
      displayStatus: '',
      statusColor: ''
    }
  })

  const statusInfo = useMemo(() => {
    if (!data) return { displayStatus: '', statusColor: '' }

    const { status, isRecalled } = data
    let displayStatus = ''
    let statusColor = ''

    if (status === 'waiting' && !isRecalled) {
      displayStatus = 'Vừa tạo, đang chờ duyệt bước 1'
      statusColor = 'yellow'
    } else if (status === 'cancel' && isRecalled) {
      displayStatus = 'Đã bị hoàn ở bước 1'
      statusColor = 'orange'
    } else if (status === 'accepted_stage_1' && !isRecalled) {
      displayStatus = 'Đã duyệt bước 1'
      statusColor = 'green'
    } else if (status === 'waiting' && isRecalled) {
      displayStatus = 'Đã bị hoàn ở bước 2'
      statusColor = 'orange'
    } else if (status === 'accepted_stage_2' && !isRecalled) {
      displayStatus = 'Đã duyệt bước 2'
      statusColor = 'green'
    } else if (status === 'accepted_stage_1' && isRecalled) {
      displayStatus = 'Đã bị hoàn ở bước 3'
      statusColor = 'orange'
    } else if (status === 'waiting_export' && !isRecalled) {
      displayStatus = 'Đã duyệt bước 3'
      statusColor = 'blue'
    } else if (status === 'cancel' && !isRecalled) {
      displayStatus = 'Đã bị hủy'
      statusColor = 'red'
    }

    return { displayStatus, statusColor }
  }, [data])

  // Update form values with status info
  form.setValue('displayStatus', statusInfo.displayStatus)
  form.setValue('statusColor', statusInfo.statusColor)

  return (
    <div className="mt-3">
      <Form {...form}>
        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-2">
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
              name="companyName"
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
              name="creator"
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
              name="project"
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
            <h3 className="mb-2 text-lg font-semibold">Sản phẩm yêu cầu</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã sản phẩm</TableHead>
                  <TableHead>Tên sản phẩm</TableHead>
                  <TableHead>Số lượng yêu cầu</TableHead>
                  <TableHead>Mô tả</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {form.getValues('requestProducts').map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>{product.code}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.requestQuantity}</TableCell>
                    <TableCell>{product.provider}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </form>
      </Form>
    </div>
  )
}
