import { IBase } from './base.type'
import { IRolePermission } from './role-permission.type'

export interface IRole extends IBase {
  nameNormalize?: string
  description?: string
  nameDisplay?: string
  rolePermissions: IRolePermission[]
}

export interface ICreateRole {
  nameNormalize: string
  description: string
  nameDisplay?: string
}

export interface IUpdateRole extends ICreateRole {
  slug: string
}
