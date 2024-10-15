import { Button, DataTableActionOptionsProps } from '@/components/ui'
import { useTranslation } from 'react-i18next'
import { IAuthority } from '@/types'
import { useNavigate } from 'react-router'
import { ROUTE } from '@/constants'

export default function AuthorityActionOptions({ table }: DataTableActionOptionsProps<IAuthority>) {
  const navigate = useNavigate()

  const { t } = useTranslation('sidebar')
  return (
    <>
      <Button
        variant="outline"
        className="h-8 text-sm"
        onClick={() => navigate(ROUTE.ADD_AUTHORITY)}
      >
        {t('sidebar.createAuthority')}
      </Button>
    </>
  )
}
