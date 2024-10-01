import * as z from 'zod'

export const productSchema = z.object({
  code: z.string().min(1, 'Mã yêu cầu không hợp lệ'),
  requester: z.string().min(1, 'Tên người yêu cầu không hợp lệ'),
  company: z.object({
    name: z.string().min(1, 'Tên công ty không hợp lệ'),
    slug: z.string().min(1, 'Mã công ty không hợp lệ'),
    directorSlug: z.string().min(1, 'Mã giám đốc công ty không hợp lệ')
  }),
  project: z.object({
    slug: z.string().min(1, 'Mã dự án không hợp lệ'),
    managerSlug: z.string().min(1, 'Mã người quản lý dự án không hợp lệ'),
    name: z.string().min(1, 'Tên dự án không hợp lệ')
  }),
  site: z.object({
    slug: z.string().min(1, 'Mã công trình không hợp lệ'),
    managerSlug: z.string().min(1, 'Mã người quản lý công trình không hợp lệ'),
    name: z.string().min(1, 'Tên công trình không hợp lệ')
  }),
  type: z.enum(['normal', 'urgent']),
  requestProducts: z.array(
    z.object({
      code: z.string().min(1, 'Mã sản phẩm không hợp lệ'),
      name: z.string().min(1, 'Tên sản phẩm không hợp lệ'),
      productSlug: z.string().min(1, 'Mã sản phẩm không hợp lệ'),
      provider: z.string().min(1, 'Nhà cung cấp không hợp lệ'),
      unit: z.string().min(1, 'Đơn vị không hợp lệ'),
      requestQuantity: z.number().min(1, 'Số lượng không hợp lệ')
    })
  ),
  userApprovals: z.array(
    z.object({
      userSlug: z.string().min(1, 'Mã người duyệt không hợp lệ'),
      roleApproval: z.string().min(1, 'Vai trò duyệt không hợp lệ')
    })
  ),
  note: z.string().optional()
})

export const productSearchSchema = z.object({
  name: z.string().optional().default('')
})

export const addNewProductSchema = z.object({
  code: z.string().min(1, 'Mã sản phẩm không hợp lệ'),
  slug: z.string().min(1, 'Mã sản phẩm không hợp lệ'),
  name: z.string().min(1, 'Tên sản phẩm không hợp lệ'),
  provider: z.string().min(1, 'Nhà cung cấp không hợp lệ'),
  unit: z.string().min(1, 'Đơn vị không hợp lệ'),
  requestQuantity: z.string().min(1, 'Số lượng không hợp lệ'),
  description: z.string().min(1, 'Mô tả không hợp lệ'),
  status: z.string().min(1, 'Trạng thái không hợp lệ')
})

export const addNewProductRequestSchema = z.object({
  code: z.string().min(1, 'Mã sản phẩm không hợp lệ'),
  productSlug: z.string().min(1, 'Mã sản phẩm không hợp lệ'),
  name: z.string().min(1, 'Tên sản phẩm không hợp lệ'),
  provider: z.string().min(1, 'Nhà cung cấp không hợp lệ'),
  unit: z.string().min(1, 'Đơn vị không hợp lệ'),
  requestQuantity: z.number().min(1, 'Số lượng không hợp lệ'),
  description: z.string().optional(),
  status: z.string().optional()
})

export const approvalRequisitionSchema = z.object({
  message: z.string().min(1, 'Lời nhắn không được để trống')
})

export type TProductSchema = z.infer<typeof productSchema>
