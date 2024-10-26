import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { createCompany, deleteCompany, getCompanies, updateCompany, uploadCompanyLogo } from '@/api'
import { ICreateCompany, IUpdateCompany } from '@/types'

export const useCompanies = () => {
  return useQuery({
    queryKey: ['companies'],
    queryFn: () => getCompanies()
  })
}

export const useCreateCompany = () => {
  return useMutation({
    mutationFn: (data: ICreateCompany) => createCompany(data)
  })
}

export const useUploadCompanyLogo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (requestData: { slug: string; file: File }) => uploadCompanyLogo(requestData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] })
    }
  })
}

export const useUpdateCompany = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: IUpdateCompany) => updateCompany(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] })
    }
  })
}

export const useDeleteCompany = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (slug: string) => deleteCompany(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] })
    }
  })
}
