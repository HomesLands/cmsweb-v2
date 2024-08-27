import { Loader2 } from 'lucide-react'
import React from 'react'

const SpinnerLoading: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <Loader2 size="2rem" className="text-primary animate-spin" />
    </div>
  )
}

export default SpinnerLoading
