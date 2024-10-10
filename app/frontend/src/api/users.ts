import {
  IApiResponse,
  IPaginationResponse,
  IQuery,
  IUpdateProductRequisitionGeneralInfo
} from '@/types'
import { IUpdateUserGeneralInfo, IUserInfo, IUserPermission } from '@/types/user.type'
import { http } from '@/utils'

export async function getUsers(
  params: IQuery
): Promise<IApiResponse<IPaginationResponse<IUserInfo>>> {
  const response = await http.get<IApiResponse<IPaginationResponse<IUserInfo>>>('/users', {
    params
  })
  return response.data
}

export async function getUser() {
  const response = await http.get<IApiResponse<IUserInfo>>(`/users/info`)
  console.log(response.data)
  return response.data
}

export async function getUserInfoPermission(): Promise<IApiResponse<IUserPermission[]>> {
  const response = await http.get<IApiResponse<IUserPermission[]>>(`/users/info/permissions`)
  return response.data
}

export async function uploadProfilePicture(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  const response = await http.patch<IApiResponse<IUserInfo>>(`/users/upload/avatar`, formData)
  return response.data
}

export async function uploadSignature(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  const response = await http.patch<IApiResponse<IUserInfo>>(`/users/upload/sign`, formData)
  return response.data
}

export async function updateUser(data: IUpdateUserGeneralInfo) {
  // const response = await http.patch<IApiResponse<IUserInfo>>(`/users/update`, data)
  // return response.data
}
