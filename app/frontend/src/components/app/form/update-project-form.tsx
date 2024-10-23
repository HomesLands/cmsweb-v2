import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'

import {
  Calendar,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Input,
  Form,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@/components/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { IUpdateProject, IProject } from '@/types'
import { updateProjectSchema, TUpdateProjectSchema } from '@/schemas'
import { SelectSite } from '@/components/app/select'
import { DateTimePicker } from '@/components/app/picker'

interface IFormUpdateProjectProps {
  project: IProject
  onSubmit: (data: IUpdateProject) => void
}

const UpdateProjectForm: React.FC<IFormUpdateProjectProps> = ({ project, onSubmit }) => {
  const { t } = useTranslation(['projects'])
  const [selectedSite, setSelectedSite] = useState<{ slug: string; name: string } | null>(null)
  const [date, setDate] = useState<Date | undefined>(undefined)

  const form = useForm<TUpdateProjectSchema>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      slug: project.slug || '',
      name: project.name || '',
      startDate: project.startDate || '',
      fileDescription: project.fileDescription || '',
      description: project.description || '',
      site: project.site.slug || '',
      siteName: project.site.name || ''
    }
  })

  const handleSubmit = (values: IUpdateProject) => {
    if (selectedSite) {
      values.site = selectedSite.slug
      values.siteName = selectedSite.name
    }
    onSubmit(values)
    form.reset()
    setSelectedSite(null)
  }

  const formFields = {
    slug: (
      <FormField
        control={form.control}
        name="slug"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('projects.slug')}</FormLabel>
            <FormControl>
              <Input {...field} disabled />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
    site: (
      <FormField
        control={form.control}
        name="site"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('projects.site')}</FormLabel>
            <FormControl>
              <SelectSite
                onChange={(slug, name) => {
                  field.onChange(slug)
                  setSelectedSite({ slug, name })
                  form.setValue('siteName', name) // Cập nhật tên site
                }}
                defaultValue={field.value}
              />
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
            <FormLabel>{t('projects.name')}</FormLabel>
            <FormControl>
              <Input {...field} placeholder={t('projects.nameDescription')} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
    startDate: (
      <FormField
        control={form.control}
        name="startDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('projects.startDate')}</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    {field.value ? field.value : <span>{t('projects.chooseDateAndTime')}</span>}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => {
                    if (newDate) {
                      const newDateTime = date
                        ? new Date(
                            date.setFullYear(
                              newDate.getFullYear(),
                              newDate.getMonth(),
                              newDate.getDate()
                            )
                          )
                        : newDate
                      setDate(newDateTime)
                      field.onChange(format(newDateTime, 'yyyy-MM-dd HH:mm:ss'))
                    }
                  }}
                />
                <DateTimePicker
                  date={date}
                  setDate={(newDate) => {
                    if (newDate) {
                      setDate(newDate)
                      field.onChange(format(newDate, 'yyyy-MM-dd HH:mm:ss'))
                    }
                  }}
                />
              </PopoverContent>
            </Popover>
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
            <FormLabel>{t('projects.description')}</FormLabel>
            <FormControl>
              <Input {...field} placeholder={t('projects.descriptionDescription')} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
    fileDescription: (
      <FormField
        control={form.control}
        name="fileDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('projects.fileDescription')}</FormLabel>
            <FormControl>
              <Input {...field} placeholder={t('projects.fileDescriptionDescription')} />
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
          <div className="grid grid-cols-1 gap-6">
            {Object.keys(formFields).map((key) => (
              <React.Fragment key={key}>
                {formFields[key as keyof typeof formFields]}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-end">
            <Button className="flex justify-end" type="submit">
              {t('projects.update')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export { UpdateProjectForm }
