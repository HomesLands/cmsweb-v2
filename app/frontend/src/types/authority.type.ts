import { IBase } from './base.type'

export interface IAuthority extends IBase {
  nameNormalize?: string
  description?: string
  nameDisplay?: string
}

export interface ICreateAuthority {
  nameNormalize: string
  description: string
}

export interface IUpdateAuthority {
  slug: string
  nameNormalize: string
  nameDisplay: string
  description: string
}
