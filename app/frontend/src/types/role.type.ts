import { IBase } from './base.type'

export interface IRole extends IBase {
  nameNormalize?: string
  description?: string
  nameDisplay?: string
}

export interface ICreateRole {
  nameNormalize: string
  description: string
  nameDisplay?: string
}
