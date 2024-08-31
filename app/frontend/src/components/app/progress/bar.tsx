import React from 'react'

interface BarProps {
  animationDuration: number
  progress: number
}

const Bar: React.FC<BarProps> = ({ animationDuration, progress }) => {
  return (
    <div
      style={{
        transition: `all ${animationDuration}ms`,
        transform: `translate3d(-${100 - progress}%, 0, 0)`
      }}
      className="fixed top-0 left-0 z-50 h-1 bg-blue-600"
    />
  )
}

export default Bar
