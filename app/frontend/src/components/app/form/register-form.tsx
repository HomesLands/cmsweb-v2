import { NavLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'

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
import { registerSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { IRegisterRequest } from '@/types'
import { ROUTE } from '@/constants'

interface IFormRegisterProps {
  onSubmit: (data: IRegisterRequest) => void
}

export const RegisterForm: React.FC<IFormRegisterProps> = ({ onSubmit }) => {
  const { t } = useTranslation(['auth'])
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullname: '',
      username: '',
      password: ''
    }
  })

  const handleSubmit = (values: z.infer<typeof registerSchema>) => {
    const { ...apiValues } = values
    onSubmit(apiValues)
  }

  return (
    <div className="mt-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:w-[24rem] gap-2">
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('register.fullname')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('register.enterFullname')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('register.username')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('register.enterUsername')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('register.password')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('register.enterPassword')} {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center justify-between w-full">
            <Button type="submit" className="md:w-[6rem]">
              {t('register.register')}
            </Button>
            <div className="text-sm text-center">
              {t('register.haveAccount')}
              <NavLink to={ROUTE.LOGIN} className="underline">
                {t('register.loginNow')}
              </NavLink>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
