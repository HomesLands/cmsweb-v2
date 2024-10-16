export interface ICompany {
  slug: string
  name: string
  director: string
  directorSlug: string
  logo: string
}

export interface ICreateCompany {
  name: string
}

export interface IUploadCompanyLogo {
  slug: string
  file: File
}
