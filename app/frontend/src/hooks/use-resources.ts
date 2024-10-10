import { useQuery } from '@tanstack/react-query'

import { getResources } from '@/api'
import { IQuery } from '@/types'

export const useResources = (q: IQuery) => {
  return useQuery({
    queryKey: ['resources', JSON.stringify(q)],
    queryFn: () => getResources(q),
    select: (data) => data.result
  })
}

// export const useCreateRole = () => {
//   return useMutation({
//     mutationFn: async (data: ICreateRole) => {
//       return createRole(data)
//     }
//   })
// }
