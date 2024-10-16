import { useDownloadStore } from '@/stores'
import { http } from '@/utils'
import { AxiosRequestConfig } from 'axios'
import { saveAs } from 'file-saver'

export async function exportDatabase() {
  const { setProgress, setFileName, setIsDownloading, reset } = useDownloadStore.getState()
  const timestamp = new Date().toISOString().replace(/[:.]/g, '_')
  const fileName = `${timestamp}.sql`
  setFileName(fileName)
  setIsDownloading(true)

  try {
    const response = await http.get(`/database/backup`, {
      responseType: 'blob',
      headers: {
        Accept: 'application/sql'
      },
      onDownloadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total ?? 1)
        )
        setProgress(percentCompleted)
      },
      doNotShowLoading: true
    } as AxiosRequestConfig)

    const blob = new Blob([response.data], { type: 'application/sql' })
    saveAs(blob, fileName)
    return response.data
  } finally {
    setIsDownloading(false)
    reset()
  }
}
