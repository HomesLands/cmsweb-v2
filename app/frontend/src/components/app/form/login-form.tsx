import { NavLink } from 'react-router-dom'
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
import { loginSChema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'

interface IFormRegisterProps {
  onSubmit: (data: z.infer<typeof loginSChema>) => void
}

export const LoginForm: React.FC<IFormRegisterProps> = ({ onSubmit }) => {
  const { t } = useTranslation(['auth'])
  const form = useForm<z.infer<typeof loginSChema>>({
    resolver: zodResolver(loginSChema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const handleSubmit = (values: z.infer<typeof loginSChema>) => {
    onSubmit(values)
  }

  return (
    <div className="mt-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:w-[24rem] gap-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('login.username')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('login.enter_username')} {...field} />
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
                  <FormLabel>{t('login.password')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('login.enter_password')} {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center justify-between w-full">
            <Button type="submit" className="md:w-[6rem]">
              {t('login.login')}
            </Button>
            <div className="text-sm text-center">
              {t('login.dont_have_account')}
              <NavLink to="/auth/register" className="underline">
                {' '}
                {t('login.register')}
              </NavLink>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
