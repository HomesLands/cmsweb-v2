import React from 'react'
import { useTranslation } from 'react-i18next'

import { Progress } from '@/components/ui/progress'
import { FileIcon } from '@radix-ui/react-icons'

interface DownloadProgressProps {
  progress: number
  fileName: string
}

export const DownloadProgress: React.FC<DownloadProgressProps> = ({ progress, fileName }) => {
  const { t } = useTranslation('warehouse')
  return (
    <div className="fixed right-4 bottom-4 z-50 w-72 rounded-lg shadow-lg">
      <div className="flex flex-col justify-start px-3 py-4 rounded-t-md bg-muted">
        <h3 className="text-sm font-semibold">{t('warehouse.downloading')}</h3>
      </div>
      <div className="flex flex-row justify-start items-center px-3 py-2">
        <FileIcon className="mr-1 w-3 h-3 text-muted-foreground" />
        <span className="text-xs text-gray-500">{fileName}</span>
      </div>
      <div className="px-4 py-2">
        <Progress value={progress} className="w-full" />
        <p className="mt-1 text-xs text-right text-gray-500">{progress.toFixed(0)}%</p>
      </div>
    </div>
  )
}
