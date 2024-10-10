import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  getUser,
  getUserInfoPermission,
  getUsers,
  updateUser,
  uploadProfilePicture,
  uploadSignature
} from '@/api'
import {
  IQuery,
  IUpdateProductRequisitionGeneralInfo,
  IUpdateUserGeneralInfo,
  IUserInfo
} from '@/types'

export const useUsers = (q: IQuery) => {
  return useQuery({
    queryKey: ['users', JSON.stringify(q)],
    queryFn: () => getUsers(q),
    placeholderData: keepPreviousData
  })
}

export const useUser = () => {
  return useQuery({
    queryKey: ['user-info'],
    queryFn: () => getUser(),
    select: (data) => data.result,
    enabled: false // Only run the query if the user is authenticated
  })
}

export const useUserInfoPermission = () => {
  return useQuery({
    queryKey: ['user-info-permission'],
    queryFn: () => getUserInfoPermission(),
    select: (data) => data.result,
    enabled: false // Only run the query if the user is authenticated
  })
}

export const useUploadProfilePicture = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (file: File) => uploadProfilePicture(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-info'] })
    }
  })
}

export const useUploadSignature = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (file: File) => uploadSignature(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-info'] })
    }
  })
}
export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: IUpdateUserGeneralInfo) => updateUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-info'] })
    }
  })
}
