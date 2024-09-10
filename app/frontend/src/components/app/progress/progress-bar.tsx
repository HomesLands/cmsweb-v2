import { DoubleArrowRightIcon } from '@radix-ui/react-icons'

interface ProgressBarProps {
  step: number
}

export function ProgressBar({ step }: ProgressBarProps) {
  return (
    <ol className="flex items-center justify-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
      {/* Step 1 */}
      <li className={`flex items-center ${step >= 1 ? 'text-blue-600 dark:text-blue-500' : ''}`}>
        <span
          className={`flex items-center justify-center w-5 h-5 text-xs border rounded-full me-2 shrink-0 ${
            step >= 1
              ? 'border-blue-600 dark:border-blue-500'
              : 'border-gray-500 dark:border-gray-400'
          }`}
        >
          1
        </span>
        <span className="hidden sm:text-sm sm:inline-flex sm:ms-1">Tạo phiếu vật tư</span>
        <DoubleArrowRightIcon className="w-4 h-4 ms-2 sm:ms-4 rtl:rotate-180" />
      </li>

      {/* Step 2 */}
      <li className={`flex items-center ${step >= 2 ? 'text-blue-600 dark:text-blue-500' : ''}`}>
        <span
          className={`flex items-center justify-center w-5 h-5 text-xs border rounded-full me-2 shrink-0 ${
            step >= 2
              ? 'border-blue-600 dark:border-blue-500'
              : 'border-gray-500 dark:border-gray-400'
          }`}
        >
          2
        </span>
        <span className="hidden sm:text-sm sm:inline-flex sm:ms-2">Thêm vật tư</span>
        <DoubleArrowRightIcon className="w-4 h-4 ms-2 sm:ms-4 rtl:rotate-180" />
      </li>

      {/* Step 3 */}
      <li className={`flex items-center ${step >= 3 ? 'text-blue-600 dark:text-blue-500' : ''}`}>
        <span
          className={`flex items-center justify-center w-5 h-5 text-xs border rounded-full me-2 shrink-0 ${
            step >= 3
              ? 'border-blue-600 dark:border-blue-500'
              : 'border-gray-500 dark:border-gray-400'
          }`}
        >
          3
        </span>
        <span className="hidden sm:text-sm sm:inline-flex sm:ms-2">Xác nhận</span>
      </li>
    </ol>
  )
}
