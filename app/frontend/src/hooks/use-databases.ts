import { exportDatabase } from '@/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useExportDatabase = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => exportDatabase(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['backups'] })
    }
  })
}
