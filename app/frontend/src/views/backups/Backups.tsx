import { IconWrapper } from '@/components/app/drawer'
import { Button } from '@/components/ui'
import { useExportDatabase } from '@/hooks'
import { FileWarningIcon, LogOutIcon } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Backups() {
  const mutation = useExportDatabase()
  function handleSubmit() {
    mutation.mutate(undefined, {
      onSuccess: () => {
        toast.success('Export database successully')
      }
    })
  }
  return (
    <div className="border border-red-600 rounded-sm mt-5">
      <div className="p-3 bg-red-600 text-white uppercase">Backup CMS</div>
      <div className="mt-4 p-3 text-sm">
        <p>
          You can trigger a backup here. The process can take some time depending on the amount of
          data (especially attachments) you have.
        </p>
        <p className="text-red-600 flex items-center gap-1 mt-2 text-sm">
          <IconWrapper Icon={FileWarningIcon} className="w-5 text-red-600" />A new backup will
          override any previous one
        </p>
        <Button
          variant="destructive"
          className="mt-5 flex items-center gap-1"
          onClick={handleSubmit}
        >
          <IconWrapper Icon={LogOutIcon} className="w-5" />
          Request backup
        </Button>
      </div>
    </div>
  )
}
