import { IPermission } from './permission.type'
import { IRole } from './role.type'

export interface ICreateRolePermission {
  roleSlug: string
  permissionSlug: string
}

export interface IRolePermission {
  role: IRole
  permission: IPermission
}
