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
      code: '',
      name: '',
      provider: '',
      unit: '',
      description: '',
      status: ''
    }
  })

  const handleSubmit = (values: z.infer<typeof addNewProductSchema>) => {
    onSubmit(values)
  }

  return (
    <div className="mt-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="code"
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
              name="name"
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
              name="provider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>=Nhà cung cấp</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tên model" {...field} />
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập mô tả" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end w-full">
            <Button type="submit">Thêm</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
