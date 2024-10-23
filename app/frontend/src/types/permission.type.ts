import { IBase } from './base.type'

export interface IPermission extends IBase {
  authority: string
  requiredOwner?: boolean
  resource: string
}

export interface ICreatePermission {
  resourceSlug: string
  authoritySlug: string
  requiredOwner: boolean
}

export interface IUpdatePermission {
  slug: string
  resourceSlug: string
  authoritySlug: string
  requiredOwner: boolean
}
