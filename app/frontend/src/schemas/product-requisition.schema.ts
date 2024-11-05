import * as z from 'zod'

export const productRequisitionSchema = z.object({
  code: z.string().min(1, 'Mã yêu cầu không hợp lệ'),
  requester: z.string().min(1, 'Tên người yêu cầu không hợp lệ'),
  deadlineApproval: z
    .string()
    .min(1, 'Ngày hết hạn không hợp lệ')
    .refine((date) => new Date(date) > new Date(), {
      message: 'Ngày hết hạn phải là thời điểm trong tương lai'
    }),
  company: z.object({
    slug: z.string().min(1, 'Mã công ty không hợp lệ'),
    name: z.string().min(1, 'Tên công ty không hợp lệ'),
    logo: z.string().min(1, 'Logo công ty không hợp lệ')
  }),
  department: z.object({
    slug: z.string().min(1, 'Mã bộ phận không hợp lệ'),
    name: z.string().min(1, 'Tên bộ phận không hợp lệ')
  }),
  site: z.object({
    slug: z.string().min(1, 'Mã công trình không hợp lệ'),
    name: z.string().min(1, 'Tên công trình không hợp lệ')
  }),
  projectName: z.string().min(1, 'Tên dự án không hợp lệ'),
  // project: z.object({
  //   slug: z.string().min(1, 'Mã dự án không hợp lệ'),
  //   name: z.string().min(1, 'Tên dự án không hợp lệ')
  // }),
  type: z.enum(['normal', 'urgent']),
  requestProducts: z.array(
    z.object({
      isExistProduct: z.boolean(),
      slug: z.string().min(1, 'Mã sản phẩm không hợp lệ'),
      requestQuantity: z.number().min(1, 'Số lượng không hợp lệ'),
      description: z.string(),
      product: z.object({
        code: z.optional(z.string()),
        slug: z.string().min(1, 'Mã sản phẩm không hợp lệ'),
        name: z.string().min(1, 'Tên sản phẩm không hợp lệ'),
        provider: z.string().min(1, 'Nhà cung cấp không hợp lệ'),
        description: z.string(),
        unit: z.object({
          slug: z.string().min(1, 'Mã đơn vị không hợp lệ'),
          name: z.string().min(1, 'Tên đơn vị không hợp lệ')
        }),
        quantity: z.number().min(0, 'Số lượng không hợp lệ')
      })
    })
  ),
  note: z.string().optional()
})

export const productRequisitionGeneralInfoSchema = z.object({
  code: z.string().min(1, 'Mã yêu cầu không hợp lệ'),
  requester: z.string().min(1, 'Tên người yêu cầu không hợp lệ'),
  deadlineApproval: z
    .string()
    .min(1, 'Ngày hết hạn không hợp lệ')
    .refine((date) => new Date(date) > new Date(), {
      message: 'Ngày hết hạn phải là thời điểm trong tương lai'
    }),
  company: z.object({
    slug: z.string().min(1, 'Mã công ty không hợp lệ'),
    name: z.string().min(1, 'Tên công ty không hợp lệ')
  }),
  site: z.object({
    slug: z.string().min(1, 'Mã công trình không hợp lệ'),
    name: z.string().min(1, 'Tên công trình không hợp lệ')
  }),
  projectName: z.string().min(1, 'Tên dự án không hợp lệ'),
  // project: z.object({
  //   slug: z.string().min(1, 'Mã dự án không hợp lệ'),
  //   name: z.string().min(1, 'Tên dự án không hợp lệ')
  // }),
  type: z.enum(['normal', 'urgent']),
  note: z.string().min(1, 'Ghi chú không hợp lệ')
})

export const productSearchSchema = z.object({
  name: z.string().optional().default('')
})

export const updateProductRequisitionGeneralInfoSchema = z.object({
  slug: z.string().min(1, 'Mã yêu cầu không hợp lệ'),
  project: z.string().min(1, 'Mã dự án không hợp lệ'),
  type: z.enum(['normal', 'urgent']),
  deadlineApproval: z
    .string()
    .min(1, 'Ngày hết hạn không hợp lệ')
    .refine((date) => new Date(date) > new Date(), {
      message: 'Ngày hết hạn phải là thời điểm trong tương lai'
    }),
  description: z.string().min(1, 'Mô tả không hợp lệ')
})

export const addNewProductSchema = z.object({
  code: z.string().min(1, 'Mã sản phẩm không hợp lệ'),
  name: z.string().min(1, 'Tên sản phẩm không hợp lệ'),
  provider: z.string().min(1, 'Nhà cung cấp không hợp lệ'),
  unit: z.object({
    slug: z.string().min(1, 'Mã đơn vị không hợp lệ'),
    name: z.string().min(1, 'Tên đơn vị không hợp lệ')
  }),
  description: z.string().min(1, 'Mô tả không hợp lệ')
})

export const addNewProductRequestSchema = z.object({
  isExistProduct: z.boolean(),
  slug: z.string(),
  product: z.object({
    code: z.optional(z.string()),
    slug: z.optional(z.string()),
    name: z.string().min(1, 'Tên sản phẩm không hợp lệ'),
    provider: z.string().min(1, 'Nhà cung cấp không hợp lệ'),
    quantity: z.number().min(1, 'Số lượng không hợp lệ'),
    unit: z.object({
      slug: z.string().min(1, 'Mã đơn vị không hợp lệ'),
      name: z.string().min(1, 'Tên đơn vị không hợp lệ')
    }),
    description: z.string().min(1, 'Mô tả không hợp lệ')
  }),
  requestQuantity: z.number().min(1, 'Số lượng không hợp lệ')
})

export const addNewNonExistingProductRequisitionSchema = z.object({
  isExistProduct: z.boolean(),
  slug: z.optional(z.string()),
  product: z.object({
    slug: z.optional(z.string()),
    name: z.string().min(1, 'Tên sản phẩm không hợp lệ'),
    provider: z.string().min(1, 'Nhà cung cấp không hợp lệ'),
    quantity: z.number().min(1, 'Số lượng không hợp lệ'),
    unit: z.object({
      slug: z.string().min(1, 'Mã đơn vị không hợp lệ'),
      name: z.string().min(1, 'Tên đơn vị không hợp lệ')
    }),
    description: z.string().min(1, 'Mô tả không hợp lệ')
  }),
  requestQuantity: z.number().min(1, 'Số lượng không hợp lệ')
})

export const updateProductRequestSchema = z.object({
  slug: z.string(),
  isExistProduct: z.boolean(),
  product: z.object({
    code: z.optional(z.string()),
    slug: z.optional(z.string()),
    name: z.string().min(1, 'Tên sản phẩm không hợp lệ'),
    provider: z.string().min(1, 'Nhà cung cấp không hợp lệ'),
    quantity: z.number().min(1, 'Số lượng không hợp lệ'),
    unit: z.object({
      slug: z.string().min(1, 'Mã đơn vị không hợp lệ'),
      name: z.string().min(1, 'Tên đơn vị không hợp lệ')
    }),
    description: z.string().min(1, 'Mô tả không hợp lệ')
  }),
  requestQuantity: z.number().min(1, 'Số lượng không hợp lệ')
})

export const approvalRequisitionSchema = z.object({
  message: z.string().min(1, 'Lời nhắn không được để trống')
})

export const resubmitRequisitionSchema = z.object({
  description: z.string().min(1, 'Lời nhắn không được để trống')
})

//Personal Account Info
export const personalAccountInfoSchema = z.object({
  fullname: z.string().min(1, 'Họ và tên không hợp lệ'),
  username: z.string().min(1, 'Tên đăng nhập không hợp lệ'),
  address: z.string().min(1, 'Địa chỉ không hợp lệ'),
  phoneNumber: z.string().min(1, 'Số điện thoại không hợp lệ'),
  dob: z.string().min(1, 'Ngày sinh không hợp lệ'),
  gender: z.string().min(1, 'Giới tính không hợp lệ'),
  company: z.string().min(1, 'Công ty không hợp lệ'),
  site: z.string().min(1, 'Công trình không hợp lệ')
})

export const passwordAndAuthenticationSchema = z
  .object({
    currentPassword: z.string().min(1, 'Mật khẩu cũ không hợp lệ'),
    newPassword: z.string().min(1, 'Mật khẩu mới không hợp lệ'),
    confirmPassword: z.string().min(1, 'Mật khẩu xác nhận không hợp lệ')
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: 'Mật khẩu mới phải khác mật khẩu cũ',
    path: ['newPassword']
  })

export type TProductRequisitionSchema = z.infer<typeof productRequisitionSchema>
export type TAddNewProductRequestSchema = z.infer<typeof addNewProductRequestSchema>
export type TAddNewNonExistingProductRequisitionSchema = z.infer<
  typeof addNewNonExistingProductRequisitionSchema
>
export type TProductRequisitionGeneralInfoSchema = z.infer<
  typeof productRequisitionGeneralInfoSchema
>
export type TUpdateProductRequestSchema = z.infer<typeof updateProductRequestSchema>
export type TUpdateProductRequisitionGeneralInfoSchema = z.infer<
  typeof updateProductRequisitionGeneralInfoSchema
>

//Personal Account Info
export type TPersonalAccountInfoSchema = z.infer<typeof personalAccountInfoSchema>
export type TPasswordAndAuthenticationSchema = z.infer<typeof passwordAndAuthenticationSchema>

//Add New Product
export type TAddNewProductSchema = z.infer<typeof addNewProductSchema>
