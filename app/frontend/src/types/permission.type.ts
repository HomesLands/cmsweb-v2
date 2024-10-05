import { IAuthority } from './authority.type'
import { IBase } from './base.type'
import { IRole } from './role.type'

export interface IPermission extends IBase {
  role: IRole
  authority: IAuthority
}

export interface ICreatePermission {
  roleSlug: string
  authoritySlug: string
}
