import React from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
  Button,
  Input
} from '@/components/ui'
import { createRolePermissionSchema, TCreateRolePermissionSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { SelectPermission } from '@/components/app/select'
import { IRole } from '@/types'

interface IFormAddRolePermissionProps {
  role: IRole
  onSubmit: (data: TCreateRolePermissionSchema) => void
}

export const AddRolePermissionForm: React.FC<IFormAddRolePermissionProps> = ({
  role,
  onSubmit
}) => {
  const { t } = useTranslation('users')
  const { t: tRole } = useTranslation('roles')
  const form = useForm<TCreateRolePermissionSchema>({
    resolver: zodResolver(createRolePermissionSchema),
    defaultValues: {
      permission: {
        label: '',
        value: ''
      },
      role: {
        label: role.nameDisplay,
        value: role.slug
      }
    }
  })

  const handleSubmit = (values: TCreateRolePermissionSchema) => {
    onSubmit(values)
  }

  const formFields = {
    role: (
      <FormField
        control={form.control}
        name="role"
        render={() => (
          <FormItem>
            <FormLabel>{t('users.selectUser')}</FormLabel>
            <FormControl>
              <Input value={form.getValues('role.label')} disabled />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
    permission: (
      <FormField
        control={form.control}
        name="permission"
        render={() => (
          <FormItem>
            <FormLabel>{t('users.selectPermission')}</FormLabel>
            <FormControl>
              <SelectPermission
                onChange={(values) => {
                  form.setValue('permission', {
                    label: values?.label || '',
                    value: values?.value || ''
                  })
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    )
  }

  return (
    <div className="mt-3">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-2">
            {Object.keys(formFields).map((key) => (
              <React.Fragment key={key}>
                {formFields[key as keyof typeof formFields]}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-end">
            <Button className="flex justify-end" type="submit">
              {tRole('roles.addPermission')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
