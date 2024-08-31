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
import { productSearchSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

interface IFormCreateProductProps {
  onSubmit: (data: z.infer<typeof productSearchSchema>) => void
}

export const FormSearchProduct: React.FC<IFormCreateProductProps> = ({ onSubmit }) => {
  const form = useForm<z.infer<typeof productSearchSchema>>({
    resolver: zodResolver(productSearchSchema),
    defaultValues: {
      productName: ''
    }
  })

  const handleSubmit = (values: z.infer<typeof productSearchSchema>) => {
    onSubmit(values)
  }

  return (
    <div className="w-full mt-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex items-end w-full gap-2">
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Tìm kiếm vật tư</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tên vật tư" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="whitespace-nowrap">
            Tìm kiếm
          </Button>
        </form>
      </Form>
    </div>
  )
}
