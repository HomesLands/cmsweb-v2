import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  changePasswordApi,
  getUser,
  getUserInfoPermission,
  getUsers,
  updateUser,
  uploadProfilePicture,
  uploadSignature
} from '@/api'
import { IConfirmChangePassword, IQuery, IUpdateUserGeneralInfo, IUserInfo } from '@/types'
import { useUserStore } from '@/stores'

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
  const { refetch: refetchUserInfo } = useUser() // Get the refetch function from useUser
  const setUserInfo = useUserStore((state) => state.setUserInfo) // Get the setUserInfo function from the store

  return useMutation({
    mutationFn: (data: IUpdateUserGeneralInfo) => updateUser(data),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['user-info'] })
      const userInfoResponse = await refetchUserInfo()

      if (userInfoResponse.data) {
        setUserInfo(userInfoResponse.data)
      }
    }
  })
}

export const useChangePassword = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: IConfirmChangePassword) => changePasswordApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-info'] })
    }
  })
}
