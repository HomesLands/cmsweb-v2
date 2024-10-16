import { Button, DataTableActionOptionsProps } from '@/components/ui'
import { useTranslation } from 'react-i18next'
import { IRole } from '@/types'
import { useNavigate } from 'react-router'
import { ROUTE } from '@/constants'

export default function RoleActionOptions({ table }: DataTableActionOptionsProps<IRole>) {
  const navigate = useNavigate()

  const { t } = useTranslation('sidebar')
  return (
    <>
      <Button variant="outline" className="h-8 text-sm" onClick={() => navigate(ROUTE.ADD_ROLE)}>
        {t('sidebar.createRole')}
      </Button>
    </>
  )
}
