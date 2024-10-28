import { IPermission } from './permission.type'
import { IRole } from './role.type'

export interface ICreateRolePermission {
  roleSlug: string
  permissionSlug: string
}

export interface IRolePermission {
  slug: string
  role: IRole
  permission: IPermission
}

export interface IUpdateRolePermission {
  rolePermissionSlug: string
  roleSlug: string
  permissionSlug: string
}
