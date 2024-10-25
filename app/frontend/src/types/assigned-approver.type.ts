import { FormApprovalType } from '@/constants'

export type TCreateAssignedApprover = {
  formType: FormApprovalType
  roleApproval: string
  user: string
  site: string
}

export interface IAssignedApprover {
  createdAt: string
  updatedAt: string
  slug: string
  formType: FormApprovalType
  roleApproval: string
  user: {
    fullname: string
    username: string
    signature: string
    avatar: string
    dob: string
    gender: string
    phoneNumber: string
    address: string
    slug: string
  }
  userApprovals: {
    createdAt: string
    updatedAt: string
    slug: string
  }[]
  site: {
    name: string
    company: {
      name: string
      createdAt: string
      updatedAt: string
      slug: string
      logo: string
    }
    createdAt: string
    updatedAt: string
    slug: string
  }
}

export interface IUpdateAssignedApprover {
  slug: string //the slug of the assigned approver
  formType?: FormApprovalType
  roleApproval?: string
  user?: string
  site?: string
}

export interface IDeleteAssignedApprover {
  slug: string //the slug of the assigned approver
}
