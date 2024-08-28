import { useState } from 'react'
import { FileUploader } from 'react-drag-drop-files'

const fileTypes = ['image/png', 'image/jpeg', 'image/jpg']

export default function CardUploadImage() {
  const [files, setFiles] = useState<File[]>([])

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-gray-100 border-2 border-gray-200 border-dashed rounded-lg">
      {/* Wrapper div with Tailwind classes to control width */}
      <div className="w-full max-w-xs">
        <FileUploader
          title="Drag & Drop files here"
          subtitle="or click to browse"
          fileTypes={fileTypes}
          onFilesChange={setFiles}
        />
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {files.map((file, index) => (
          <div key={index} className="flex items-center gap-2">
            <span>{file.name}</span>
            <span>{file.size} bytes</span>
          </div>
        ))}
      </div>
    </div>
  )
}
