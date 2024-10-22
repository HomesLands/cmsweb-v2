import { useMutation } from '@tanstack/react-query'

import { createUserDepartment } from '@/api'
import { IApiErrorResponse, ICreateUserDepartment } from '@/types'
import { showErrorToast, showToast } from '@/utils'
import { useTranslation } from 'react-i18next'
import { AxiosError } from 'axios'

export const useCreateUserDepartment = () => {
  const { t: tToast } = useTranslation('toast')
  return useMutation({
    mutationFn: async (data: ICreateUserDepartment) => createUserDepartment(data),
    onSuccess: () => {
      showToast(tToast('toast.addDepartmentSuccess'))
    }
  })
}
