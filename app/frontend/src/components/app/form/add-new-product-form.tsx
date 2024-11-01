import { z } from 'zod'
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
import { addNewProductSchema, TAddNewProductSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { SelectUnit } from '@/components/app/select'
import { IProductInfoCreate } from '@/types'
import React from 'react'

interface IFormAddNewProductProps {
  onSubmit: (data: IProductInfoCreate, ref: React.RefObject<HTMLFormElement>) => void
  resetForm: boolean
  setResetForm: React.Dispatch<React.SetStateAction<boolean>>
}

export const AddNewProductForm: React.FC<IFormAddNewProductProps> = ({
  onSubmit,
  resetForm,
  setResetForm
}) => {
  const { t } = useTranslation('products')
  const form = useForm<TAddNewProductSchema>({
    resolver: zodResolver(addNewProductSchema),
    defaultValues: {
      code: '',
      name: '',
      provider: '',
      unit: { name: '', slug: '' },
      description: ''
    }
  })

  React.useEffect(() => {
    if (resetForm) {
      form.reset()
      setResetForm(false)
    }
  }, [resetForm, form, setResetForm])

  const handleSubmit = (values: TAddNewProductSchema) => {
    const formRef = form.formState.submitCount > 0 ? form.formState.submitCount : null
    onSubmit(values, { current: formRef as unknown as HTMLFormElement })
  }

  const formFields = {
    code: (
      <FormField
        control={form.control}
        name="code"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('products.code')}</FormLabel>
            <FormControl>
              <Input placeholder={t('products.code')} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
    name: (
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('products.name')}</FormLabel>
            <FormControl>
              <Input placeholder={t('products.name')} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
    provider: (
      <FormField
        control={form.control}
        name="provider"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('products.provider')}</FormLabel>
            <FormControl>
              <Input placeholder={t('products.provider')} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
    unit: (
      <FormField
        control={form.control}
        name="unit"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('products.unit')}</FormLabel>
            <FormControl>
              <SelectUnit
                onChange={(value) =>
                  field.onChange({ name: value?.label || '', slug: value?.value || '' })
                }
                defaultValue={
                  field.value ? { value: field.value.slug, label: field.value.name } : undefined
                }
              />
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
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('products.description')}</FormLabel>
            <FormControl>
              <Textarea placeholder={t('products.description')} {...field} />
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
          <div className="grid grid-cols-2 gap-2">
            {Object.keys(formFields).map((key) => (
              <React.Fragment key={key}>
                {key === 'description' ? (
                  <div className="col-span-2">{formFields[key as keyof typeof formFields]}</div>
                ) : (
                  formFields[key as keyof typeof formFields]
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-end w-full">
            <Button type="submit">{t('products.add')}</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
