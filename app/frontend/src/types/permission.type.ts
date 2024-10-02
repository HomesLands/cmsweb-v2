import { IAuthority } from './authority.type'
import { IBase } from './base.type'
import { IRole } from './role.type'

export interface IPermission extends IBase {
  nameNormalize?: string
  description?: string
  role: IRole
  authority: IAuthority
}

export interface ICreatePermission {
  nameNormalize: string
  description: string
}
