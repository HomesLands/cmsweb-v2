import { useFormContext } from 'react-hook-form'

import { FormField, FormItem, FormLabel, FormControl, FormMessage, Input } from '@/components/ui'
import { TValidationSchema } from '@/schemas'

export function FormFullName() {
  const { control } = useFormContext<TValidationSchema>()

  return (
    <FormField
      control={control}
      name="fullName"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-normal">Họ và tên</FormLabel>
          <FormControl>
            <Input placeholder="..." {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
