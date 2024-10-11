import { useMutation, useQuery } from '@tanstack/react-query'

import { createCompany, getCompanies } from '@/api'
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
