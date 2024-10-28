import React, { useMemo } from 'react'
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
import { deleteRolePermissionSchema, TDeleteRolePermissionSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { SelectPermission, SelectUpdatePermission } from '@/components/app/select'
import { IRole } from '@/types'

interface IFormDeleteRolePermissionProps {
  role: IRole
  onSubmit: (data: TDeleteRolePermissionSchema) => void
  onCancel: () => void
}

export default function DeleteRolePermissionForm({
  role,
  onSubmit,
  onCancel
}: IFormDeleteRolePermissionProps) {
  const { t } = useTranslation('users')
  const { t: tRole } = useTranslation('roles')

  const permissionOptions = useMemo(
    () =>
      role.rolePermissions.map((rp) => ({
        value: rp.slug,
        label: `${rp.permission.authority} - ${rp.permission.resource}`
      })),
    [role.rolePermissions]
  )

  const form = useForm<TDeleteRolePermissionSchema>({
    resolver: zodResolver(deleteRolePermissionSchema),
    defaultValues: {
      rolePermissionSlug: '',
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

  const handleSubmit = (values: TDeleteRolePermissionSchema) => {
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
              <SelectUpdatePermission
                options={permissionOptions}
                onChange={(values) => {
                  form.setValue('permission', {
                    label: values?.label || '',
                    value: values?.value || ''
                  })
                  form.setValue('rolePermissionSlug', values?.value || '')
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
          <div className="flex justify-end space-x-2">
            <Button variant="outline" type="button" onClick={onCancel}>
              {tRole('roles.cancel')}
            </Button>
            <Button variant="destructive" type="submit">
              {tRole('roles.confirmDelete')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
