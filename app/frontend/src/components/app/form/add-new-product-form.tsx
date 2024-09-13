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
  Button
} from '@/components/ui'
import { addNewProductSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'

interface IFormAddNewProductProps {
  onSubmit: (data: z.infer<typeof addNewProductSchema>) => void
}

export const AddNewProductForm: React.FC<IFormAddNewProductProps> = ({ onSubmit }) => {
  const form = useForm<z.infer<typeof addNewProductSchema>>({
    resolver: zodResolver(addNewProductSchema),
    defaultValues: {
      id: '',
      createdBy: '',
      productCode: '',
      productName: '',
      modelOrSerialNumber: '',
      supplier: '',
      unit: '',
      address: '',
      note: '',
      quantity: ''
    }
  })

  const handleSubmit = (values: z.infer<typeof addNewProductSchema>) => {
    console.log('Form Values:', values) // Log the form values, including quantity as 0
    onSubmit(values)
  }

  return (
    <div className="mt-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="productCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mã vật tư</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập mã vật tư" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên vật tư</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tên vật tư" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="modelOrSerialNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tên model" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="supplier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nhà cung cấp</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tên nhà cung cấp" {...field} />
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
                    <Input placeholder="Nhập đơn vị" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Địa chỉ</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập địa chỉ" {...field} />
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
                <FormLabel>Ghi chú</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập ghi chú" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end w-full">
            <Button type="submit">Tiếp theo</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
