import { Button, DataTableActionOptionsProps } from '@/components/ui'
import { useTranslation } from 'react-i18next'
import { IAuthority } from '@/types'
import { useNavigate } from 'react-router'
import { ROUTE } from '@/constants'
import { PlusCircledIcon } from '@radix-ui/react-icons'

export default function AuthorityActionOptions({ table }: DataTableActionOptionsProps<IAuthority>) {
  const navigate = useNavigate()

  const { t } = useTranslation('sidebar')
  return (
    <>
      <Button
        variant="outline"
        className="h-10 text-sm text-muted-foreground"
        onClick={() => navigate(ROUTE.ADD_AUTHORITY)}
      >
        <PlusCircledIcon className="w-4 h-4" />
        {t('sidebar.createAuthority')}
      </Button>
    </>
  )
}
