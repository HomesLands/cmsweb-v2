import { useForm } from 'react-hook-form'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { IProductRequirementInfoCreate } from '@/types'
import { generateProductRequisitionCode } from '@/utils'

interface IFormCreateProductProps {
  onSubmit: (data: z.infer<typeof productSchema>) => void
  initialData?: IProductRequirementInfoCreate | null
}

export const CreateProductRequisitionForm: React.FC<IFormCreateProductProps> = ({
  onSubmit,
  initialData
}) => {
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      requestCode: generateProductRequisitionCode(),
      requester: '',
      project: '',
      construction: '',
      approver: '',
      note: '',
      ...initialData
    }
  })

  const handleSubmit = (values: z.infer<typeof productSchema>) => {
    onSubmit(values)
  }

  return (
    <div className="mt-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-2">
            <FormField
              control={form.control}
              name="requestCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mã yêu cầu</FormLabel>
                  <FormControl>
                    <Input readOnly {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
          <div className="grid grid-cols-1 gap-2">
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
                  <Textarea placeholder="Nhập ghi chú" {...field} />
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
