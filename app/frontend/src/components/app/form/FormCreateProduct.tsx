import { useForm } from 'react-hook-form'

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
import { productSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export function FormCreateProduct() {
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      requester: '',
      project: '',
      construction: '',
      approver: '',
      note: ''
    }
  })

  function onSubmit(values: z.infer<typeof productSchema>) {
    console.log(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="requester"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Người yêu cầu</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tên người yêu cầu" {...field} />
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
                <FormLabel>Tên dự án</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tên dự án" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="construction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên công trình</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tên công trình" {...field} />
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
                <FormLabel>Tên người duyệt</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tên người duyệt" {...field} />
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
  )
}
