import { useTranslation } from 'react-i18next'

import {
  Card,
  CardContent,
  Button,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  PasswordInput
} from '@/components/ui'
import { useForm } from 'react-hook-form'
import { passwordAndAuthenticationSchema, TPasswordAndAuthenticationSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'

export const CardUserPasswordAndAuthentication = () => {
  const { t } = useTranslation('account')

  const form = useForm<TPasswordAndAuthenticationSchema>({
    resolver: zodResolver(passwordAndAuthenticationSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  })

  const handleSubmit = (values: TPasswordAndAuthenticationSchema) => {
    console.log(values)
  }

  return (
    <Card className="border-none">
      <CardContent className="flex flex-col gap-">
        <div className="grid grid-cols-1 gap-3 mt-3 rounded-md border">
          <div className="grid grid-cols-1 px-6 py-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-2">
                  <FormField
                    control={form.control}
                    name="oldPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('account.oldPassword')}</FormLabel>
                        <FormControl>
                          <PasswordInput placeholder={t('account.enterOldPassword')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('account.newPassword')}</FormLabel>
                        <FormControl>
                          <PasswordInput placeholder={t('account.enterNewPassword')} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('account.confirmPassword')}</FormLabel>
                        <FormControl>
                          <PasswordInput
                            placeholder={t('account.enterConfirmPassword')}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-end w-full">
                  <Button type="submit">{t('account.update')}</Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
