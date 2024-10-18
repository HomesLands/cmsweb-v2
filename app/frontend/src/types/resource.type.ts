import { IBase } from './base.type'

export interface IResource extends IBase {
  name?: string
}

export interface ICreateResource {
  name: string
}

export interface IUpdateResource {
  slug: string
  name: string
}
