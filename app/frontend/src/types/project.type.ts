export interface IProject {
  slug: string
  name: string
  startDate: string
  fileDescription: string
  site: {
    slug: string
    name: string
  }
  productRequisitionFormResponseDto: {
    code: string
    type: 'normal' | 'urgent'
    status:
      | 'accepted_stage_1'
      | 'accepted_stage_2'
      | 'accepted_stage_3'
      | 'cancel'
      | 'recalled'
      | 'waiting'
      | 'waiting_export'
    isRecalled: boolean
    deadlineApproval: string
    description: string
    slug: string
  }[]
  description: string
}

export interface ICreateProject {
  name: string
  startDate: string
  description: string
  fileDescription: string
  site: string
  siteName: string
}

export interface IUpdateProject {
  slug: string
  name: string
  startDate: string
  description: string
  fileDescription: string
  site: string
  siteName: string
}
