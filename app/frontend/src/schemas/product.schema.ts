import * as z from 'zod'

import { USERNAME_REGEX } from '@/constants/regex'

export const productSchema = z.object({
    requester: z.string().regex(USERNAME_REGEX, 'Tên người yêu cầu không hợp lệ'),
    project: z.string().min(1, 'Tên dự án không hợp lệ'),
    construction: z.string().min(1, 'Tên công trình không hợp lệ'),
    approver: z.string().regex(USERNAME_REGEX, 'Tên người duyệt không hợp lệ'),
    note: z.string().optional()
})

export type TProductSchema = z.infer<typeof productSchema>