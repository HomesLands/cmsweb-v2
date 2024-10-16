import { exportDatabase } from '@/api'
import { useMutation } from '@tanstack/react-query'

export const useExportDatabase = () => {
  return useMutation({
    mutationFn: () => exportDatabase()
  })
}
