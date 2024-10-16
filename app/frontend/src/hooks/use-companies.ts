import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { createCompany, getCompanies, uploadCompanyLogo } from '@/api'
import { ICreateCompany } from '@/types'

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
