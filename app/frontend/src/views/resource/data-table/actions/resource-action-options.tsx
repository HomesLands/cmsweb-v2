import { Button, DataTableActionOptionsProps } from '@/components/ui'
import { useTranslation } from 'react-i18next'
import { IResource } from '@/types'
import { useNavigate } from 'react-router'
import { ROUTE } from '@/constants'

export default function ResourceActionOptions({ table }: DataTableActionOptionsProps<IResource>) {
  const navigate = useNavigate()

  const { t } = useTranslation('sidebar')
  return (
    <>
      <Button
        variant="outline"
        className="h-8 text-sm"
        onClick={() => navigate(ROUTE.ADD_RESOURCE)}
      >
        {t('sidebar.createResource')}
      </Button>
    </>
  )
}
