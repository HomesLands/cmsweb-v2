import React from 'react'
import LoadingOverlay from 'react-loading-overlay'

interface LoadingProps {
  isActive: boolean
  children: React.ReactNode
}

export default function OverlayLoading({ isActive }: LoadingProps) {
  return (
    <>
      <LoadingOverlay
        className="h-screen"
        active={isActive}
        spinner={true}
        text="Loading your content..."
      >
        {/* <div>{children}</div> */}
      </LoadingOverlay>
    </>
  )
}
