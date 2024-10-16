import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
  Card,
  CardContent
} from '@/components/ui'
import { ICompany, IUploadCompanyLogo } from '@/types'
import { useUploadCompanyLogo } from '@/hooks'
import toast from 'react-hot-toast'
import { KeyRoundIcon, PenIcon, UserRoundPenIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useThemeStore } from '@/stores'
import { useTranslation } from 'react-i18next'
import { useRef } from 'react'
import { publicFileURL } from '@/constants'

export default function DialogUpdateCompany({ company }: { company: ICompany }) {
  const { t } = useTranslation('account')
  const { getTheme } = useThemeStore()
  const mutation = useUploadCompanyLogo()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const triggerFileInput = () => fileInputRef.current?.click()

  const handleSubmit = (values: File) => {
    const requestData = {
      file: values,
      slug: company.slug
    } as IUploadCompanyLogo
    mutation.mutate(requestData, {
      onSuccess: () => {
        toast.success('Thay đổi logo thành công')
      }
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="gap-1 text-sm">
          <PenIcon className="icon" />
          Upload logo
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[48rem] max-h-[32rem] overflow-hidden hover:overflow-y-auto transition-all duration-300">
        <DialogHeader>
          <DialogTitle>Thay đổi logo</DialogTitle>
          <DialogDescription>Thay đổi logo {company.name}</DialogDescription>
        </DialogHeader>
        <Card className="mt-6 border-none">
          <CardContent className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-3 rounded-md border">
              <div
                className={cn(
                  'flex justify-between items-center px-6 py-4 w-full',
                  getTheme() === 'light' ? 'bg-gray-50' : ''
                )}
              >
                <span className="font-semibold font-beVietNam text-md">
                  {t('account.signature')}
                </span>
                {company.logo && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex gap-1 items-center"
                    onClick={triggerFileInput}
                  >
                    <KeyRoundIcon className="icon" />
                    <span className="text-sm text-normal">{t('account.changeSignature')}</span>
                  </Button>
                )}
              </div>
              <div className="p-6">
                {company.logo ? (
                  <div className="overflow-hidden w-full h-40 rounded-md border">
                    <img
                      src={`${publicFileURL}/${company.logo}`}
                      alt="User Signature"
                      className="object-contain w-full h-full"
                    />
                  </div>
                ) : (
                  <div
                    className="flex flex-col justify-center items-center w-full h-40 text-gray-400 rounded-md border transition-colors cursor-pointer hover:bg-gray-50"
                    onClick={triggerFileInput}
                  >
                    <UserRoundPenIcon className="mb-2 w-12 h-12" />
                    <span>{t('account.addSignature')}</span>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      handleSubmit(file)
                    }
                  }}
                  className="hidden"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
