import { CheckIcon } from '@radix-ui/react-icons'

export function ProgressBar() {
  return (
    <div>
      <div className="after:mt-[1.2rem] after:block after:h-[0.1rem] after:w-full after:rounded-lg after:bg-gray-200">
        <ol className="grid grid-cols-3 text-sm font-medium text-gray-500">
          <li className="relative flex justify-start text-blue-600">
            <span className="absolute w-4 h-4 flex justify-center items-center -bottom-[1.75rem] start-0 rounded-full bg-blue-600 text-white">
              <CheckIcon className="w-3 h-3" />
            </span>
            <span className="hidden sm:block"> Tạo phiếu yêu cầu </span>
          </li>
          <li className="relative flex justify-center">
            <span className="absolute w-4 h-4 flex justify-center items-center -bottom-[1.74rem] left-1/2 -translate-x-1/2 rounded-full bg-gray-600 text-white">
              <CheckIcon className="w-3 h-3" />
            </span>
            <span className="hidden sm:block"> Thêm vật tư </span>
          </li>
          <li className="relative flex justify-end">
            <span className="absolute h-4 w-4 flex justify-center items-center -bottom-[1.75rem] end-0 rounded-full bg-gray-600 text-white">
              <CheckIcon className="w-3 h-3" />
            </span>
            <span className="hidden sm:block"> Xác nhận </span>
          </li>
        </ol>
      </div>
    </div>
  )
}
