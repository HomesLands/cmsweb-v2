import { IBase } from './base.type'

export interface IPermission extends IBase {
  authority: string
  requiredOwner?: boolean
  resource: string
}

export interface ICreatePermission {
  roleSlug: string
  authoritySlug: string
}
