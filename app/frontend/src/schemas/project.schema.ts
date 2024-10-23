import { z } from 'zod'

export const createProjectSchema = z.object({
  name: z.string().min(1, 'Tên dự án không hợp lệ'),
  startDate: z.string().min(1, 'Ngày bắt đầu không hợp lệ'),
  description: z.string().min(1, 'Mô tả không hợp lệ'),
  fileDescription: z.string().min(1, 'File mô tả không hợp lệ'),
  site: z.string().min(1, 'Địa điểm không hợp lệ'), //site slug
  siteName: z.string().min(1, 'Tên địa điểm không hợp lệ')
})

export const updateProjectSchema = z.object({
  slug: z.string().min(1, 'Slug không hợp lệ'),
  name: z.string().min(1, 'Tên dự án không hợp lệ'),
  startDate: z.string().min(1, 'Ngày bắt đầu không hợp lệ'),
  description: z.string().min(1, 'Mô tả không hợp lệ'),
  fileDescription: z.string().min(1, 'File mô tả không hợp lệ'),
  site: z.string().min(1, 'Địa điểm không hợp lệ'), //site slug
  siteName: z.string().min(1, 'Tên địa điểm không hợp lệ')
})

export type TCreateProjectSchema = z.infer<typeof createProjectSchema>
export type TUpdateProjectSchema = z.infer<typeof updateProjectSchema>
