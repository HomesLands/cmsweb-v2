import { Loader2 } from 'lucide-react'
import React from 'react'

const SpinnerLoading: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
      <Loader2 size="2rem" className="text-primary animate-spin" />
    </div>
  )
}

export default SpinnerLoading
