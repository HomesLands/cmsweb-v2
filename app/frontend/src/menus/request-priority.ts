import { useTranslation } from 'react-i18next' // Add this import

export const useRequestPriorities = () => {
  const { t } = useTranslation('productRequisition')

  return [
    { label: t('requestPriority.normal'), value: 'normal' },
    { label: t('requestPriority.urgent'), value: 'urgent' }
  ]
}
