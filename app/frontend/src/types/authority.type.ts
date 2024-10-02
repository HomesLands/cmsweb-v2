import { IBase } from './base.type'

export interface IAuthority extends IBase {
  nameNormalize?: string
  description?: string
}

export interface ICreateAuthority {
  nameNormalize: string
  description: string
}
