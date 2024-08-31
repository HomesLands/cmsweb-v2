import React from 'react'

interface ContainerProps {
  animationDuration: number
  isFinished: boolean
  children?: React.ReactNode
}

const Container: React.FC<ContainerProps> = ({ animationDuration, isFinished, children }) => {
  return (
    <div
      style={{
        transition: `opacity ${animationDuration}ms`,
        opacity: isFinished ? 0 : 1
      }}
      className="fixed top-0 left-0 w-full h-1 bg-transparent"
    >
      {children}
    </div>
  )
}

export default Container
