import { useState } from 'react'
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
import { IConfirmChangePassword } from '@/types'
import { DialogConfirmChangePassword } from '../dialog'
import { useChangePassword } from '@/hooks'
import { showToast } from '@/utils'

export const CardUserPasswordAndAuthentication = () => {
  const { t } = useTranslation('account')
  const [password, setPassword] = useState<IConfirmChangePassword | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { t: tToast } = useTranslation('toast')
  const { mutate: changePassword } = useChangePassword()

  const form = useForm<TPasswordAndAuthenticationSchema>({
    resolver: zodResolver(passwordAndAuthenticationSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  })

  const handleSubmit = (values: TPasswordAndAuthenticationSchema) => {
    setPassword(values)
    setIsDialogOpen(true)
  }

  const handleConfirmChangePassword = () => {
    if (password) {
      changePassword(password, {
        onSuccess: () => {
          showToast(tToast('toast.changePasswordSuccess'))
        }
      })
      setIsDialogOpen(false)
      setPassword(null)
      form.reset({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
    }
  }

  return (
    <Card className="border-none">
      <CardContent className="flex flex-col gap-6 p-0">
        <div className="grid grid-cols-1 gap-3 py-5 mt-3 border rounded-md">
          <div className="grid grid-cols-1 px-6 py-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-2">
                  <FormField
                    control={form.control}
                    name="currentPassword"
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
            {password && (
              <DialogConfirmChangePassword
                password={password}
                isOpen={isDialogOpen}
                onConfirm={handleConfirmChangePassword}
                onClose={() => setIsDialogOpen(false)}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
