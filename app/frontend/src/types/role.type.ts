export interface IRole {
  nameNormalize: string
  description: string
  createdAt?: Date
  updatedAt?: Date
}

export interface ICreateRole {
  nameNormalize: string
  description: string
}
