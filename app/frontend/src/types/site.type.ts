import { IBase } from './base.type'
import { IDepartment } from './department.type'
import { IProject } from './project.type'

export interface ISite {
  slug: string
  name: string
  company: {
    name: string
    logo: string
    slug: string
  }
  projects: IProject[]
  departments: IDepartment[]
  createdAt: string
  updatedAt: string
}

export interface ICreateSite {
  name: string
  company: string //company slug
  companyName: string
}

export interface IUpdateSite {
  slug: string
  name: string
  company: string //company slug
}

export interface IDeleteSite {
  slug: string
}
