import React from 'react'

const Spinner: React.FC = () => {
  return (
    <div className="absolute top-0 right-0 flex items-center justify-center w-6 h-6">
      <svg
        className="w-5 h-5 text-blue-600 animate-spin"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="60 30"
          strokeDashoffset="20"
        />
      </svg>
    </div>
  )
}

export default Spinner
