import { Button, DataTableActionOptionsProps } from '@/components/ui'
import { useTranslation } from 'react-i18next'
import { IPermission } from '@/types'
import { useNavigate } from 'react-router'
import { ROUTE } from '@/constants'

export default function PermissionActionOptions({
  table
}: DataTableActionOptionsProps<IPermission>) {
  const navigate = useNavigate()

  const { t } = useTranslation('sidebar')
  return (
    <>
      <Button
        variant="outline"
        className="h-8 text-sm"
        onClick={() => navigate(ROUTE.ADD_PERMISSION)}
      >
        {t('sidebar.createPermission')}
      </Button>
    </>
  )
}
