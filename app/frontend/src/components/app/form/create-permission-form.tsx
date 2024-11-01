import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
  Button,
  Switch,
  Label
} from '@/components/ui'
import { createPermissionSchema, TCreatePermissionSchema } from '@/schemas'

import { zodResolver } from '@hookform/resolvers/zod'
import { SelectAuthority, SelectResource } from '../select'

interface IFormCreatePermissionProps {
  onSubmit: (data: TCreatePermissionSchema) => void
}

export const CreatePermissionForm: React.FC<IFormCreatePermissionProps> = ({ onSubmit }) => {
  const { t } = useTranslation(['permissions'])

  const form = useForm<TCreatePermissionSchema>({
    resolver: zodResolver(createPermissionSchema),
    defaultValues: {
      resource: {
        label: '',
        value: ''
      },
      authority: {
        label: '',
        value: ''
      },
      requiredOwner: false
    }
  })

  const handleSubmit = (values: TCreatePermissionSchema) => {
    onSubmit(values)
  }

  const handleCheckedChange = () => {
    const value = form.getValues('requiredOwner')
    form.setValue('requiredOwner', !value)
  }

  const formFields = {
    resource: (
      <FormField
        control={form.control}
        name="resource"
        render={() => (
          <FormItem>
            <FormLabel>{t('permissions.selectResource')}</FormLabel>
            <FormControl>
              <SelectResource
                onChange={(values) => {
                  form.setValue('resource', {
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
    ),
    authority: (
      <FormField
        control={form.control}
        name="authority"
        render={() => (
          <FormItem>
            <FormLabel>{t('permissions.selectAuthority')}</FormLabel>
            <FormControl>
              <SelectAuthority
                onChange={(values) => {
                  form.setValue('authority', {
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
    ),
    requiredOwner: (
      <FormField
        control={form.control}
        name="requiredOwner"
        render={() => (
          <FormItem>
            <div className="flex items-center space-x-2">
              <Label htmlFor="requiredOwner">Yêu cầu chủ sở hữu</Label>
              <Switch
                id="requiredOwner"
                checked={form.getValues('requiredOwner')}
                onCheckedChange={handleCheckedChange}
              />
            </div>
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
              {t('permissions.createPermission')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
