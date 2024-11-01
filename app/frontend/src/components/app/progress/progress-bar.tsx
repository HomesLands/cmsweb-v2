import { DoubleArrowRightIcon } from '@radix-ui/react-icons'
import { useTranslation } from 'react-i18next'

interface ProgressBarProps {
  step: number
}

export default function ProgressBar({ step }: ProgressBarProps) {
  const { t } = useTranslation('productRequisition')
  const currentStep = step
  return (
    <ol className="flex items-center justify-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
      {/* Step 1 */}
      <li
        className={`flex items-center ${currentStep >= 1 ? 'text-blue-600 dark:text-blue-500' : ''}`}
      >
        <span
          className={`flex items-center justify-center w-5 h-5 text-xs border rounded-full me-2 shrink-0 ${
            currentStep >= 1
              ? 'border-blue-600 dark:border-blue-500'
              : 'border-gray-500 dark:border-gray-400'
          }`}
        >
          1
        </span>
        <span className="hidden sm:text-sm sm:inline-flex sm:ms-1">
          {t('progress.createProductRequisitions')}
        </span>
        <DoubleArrowRightIcon className="w-4 h-4 ms-2 sm:ms-4 rtl:rotate-180" />
      </li>

      {/* Step 2 */}
      <li
        className={`flex items-center ${currentStep >= 2 ? 'text-blue-600 dark:text-blue-500' : ''}`}
      >
        <span
          className={`flex items-center justify-center w-5 h-5 text-xs border rounded-full me-2 shrink-0 ${
            currentStep >= 2
              ? 'border-blue-600 dark:border-blue-500'
              : 'border-gray-500 dark:border-gray-400'
          }`}
        >
          2
        </span>
        <span className="hidden sm:text-sm sm:inline-flex sm:ms-2">
          {t('progress.addProductToRequest')}
        </span>
        <DoubleArrowRightIcon className="w-4 h-4 ms-2 sm:ms-4 rtl:rotate-180" />
      </li>

      {/* Step 3 */}
      <li
        className={`flex items-center ${currentStep >= 3 ? 'text-blue-600 dark:text-blue-500' : ''}`}
      >
        <span
          className={`flex items-center justify-center w-5 h-5 text-xs border rounded-full me-2 shrink-0 ${
            currentStep >= 3
              ? 'border-blue-600 dark:border-blue-500'
              : 'border-gray-500 dark:border-gray-400'
          }`}
        >
          3
        </span>
        <span className="hidden sm:text-sm sm:inline-flex sm:ms-2">
          {t('progress.confirmProductRequisitions')}
        </span>
      </li>
    </ol>
  )
}
