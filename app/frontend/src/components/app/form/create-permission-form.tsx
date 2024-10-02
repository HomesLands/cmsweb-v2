import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
  Form,
  Button,
  Textarea
} from '@/components/ui'
import {
  createAuthoritySchema,
  createPermissionSchema,
  TCreateAuthoritySchema,
  TCreatePermissionSchema
} from '@/schemas'

import { zodResolver } from '@hookform/resolvers/zod'
import { SelectRole } from '../select'

interface IFormCreatePermissionProps {
  onSubmit: (data: TCreatePermissionSchema) => void
}

export const CreatePermissionForm: React.FC<IFormCreatePermissionProps> = ({ onSubmit }) => {
  const { t } = useTranslation(['permissions'])

  const form = useForm<TCreatePermissionSchema>({
    resolver: zodResolver(createPermissionSchema),
    defaultValues: {
      nameNormalize: '',
      description: ''
    }
  })

  const handleSubmit = (values: TCreateAuthoritySchema) => {
    onSubmit(values)
  }

  const formFields = {
    nameNormalize: (
      <FormField
        control={form.control}
        name="nameNormalize"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('authorities.nameNormalize')}</FormLabel>
            <FormControl>
              <SelectRole onChange={() => {}} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
    description: (
      <FormField
        control={form.control}
        name="description"
        render={() => (
          <FormItem>
            <FormLabel>{t('authorities.description')}</FormLabel>
            <FormControl>
              <Textarea
                placeholder={t('authorities.CreateAuthorityDescription')}
                onChange={(e) => form.setValue('description', e.target.value)}
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
              {t('authorities.createAuthority')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
