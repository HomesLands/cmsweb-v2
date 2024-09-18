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
  Button,
  Textarea
} from '@/components/ui'
import { addNewProductRequestSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { IProductInfo } from '@/types'

interface IFormAddNewProductProps {
  data: IProductInfo
  onSubmit: (data: z.infer<typeof addNewProductRequestSchema>) => void
  handleAddRequest: (data: IProductInfo) => void
}

export const AddNewProductRequestForm: React.FC<IFormAddNewProductProps> = ({ onSubmit, data }) => {
  const form = useForm<z.infer<typeof addNewProductRequestSchema>>({
    resolver: zodResolver(addNewProductRequestSchema),
    // defaultValues: {
    //   productCode: data.productCode || '',
    //   productName: data.productName || '',
    //   modelOrSerialNumber: data.modelOrSerialNumber || '',
    //   supplier: data.supplier || '',
    //   unit: data.unit || '',
    //   quantity: String(data.quantity) || '0',
    //   note: data.note || ''
    // }
    defaultValues: {
      code: data.code || '',
      name: data.name || '',
      provider: data.provider || '',
      unit: data.unit || '',
      description: data.description || '',
      status: data.status || ''
      // note: data.note || ''
    }
  })

  const handleSubmit = (values: z.infer<typeof addNewProductRequestSchema>) => {
    onSubmit(values)
  }

  return (
    <div className="mt-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-3 gap-2">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mã vật tư</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên vật tư</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="provider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nhà cung cấp</FormLabel>
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
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số lượng</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" placeholder="Nhập số lượng" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Đơn vị</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="supplier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nhà cung cấp</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>
          <div className="grid grid-cols-1 gap-2">
            {/* <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ghi chú</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Nhập ghi chú" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>
          <div className="flex justify-end w-full">
            <Button type="submit">Thêm</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
