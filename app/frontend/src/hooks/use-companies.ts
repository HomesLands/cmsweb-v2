import { getCompanies } from '@/api'
import { useQuery } from '@tanstack/react-query'

export const useCompanies = () => {
  return useQuery({
    queryKey: ['companies'],
    queryFn: () => getCompanies()
  })
}
