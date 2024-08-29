import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CirclePlus } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button
} from '@/components/ui'

import { FormFullName } from '@/components/app/form'
import { validationSchema, TValidationSchema } from '@/schemas'

export function DialogCreateUser() {
  const form = useForm<TValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      phoneNumber: '',
      idCard: '',
      address: ''
    }
  })

  // Handle form submission
  const onSubmit = (values: TValidationSchema) => {
    console.log({ values })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-1 text-normal font-beVietNam">
          <CirclePlus className="icon" />
          Tạo tài khoản
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[56rem] max-h-[32rem] overflow-hidden hover:overflow-y-auto transition-all duration-300">
        <DialogHeader>
          <DialogTitle>Tạo tài khoản</DialogTitle>
          <DialogDescription>Nhập đầy đủ thông tin bên dưới để tạo tài khoản mới</DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="scroll-my-auto">
            <div className="flex flex-col gap-3 py-2">
              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col justify-start gap-2 text-normal">
                  <FormFullName />
                </div>
                <div className="flex flex-col justify-start gap-2 text-normal">
                  {/* <FormEmail /> */}
                </div>
                {/* Add other fields here... */}
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create User</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
