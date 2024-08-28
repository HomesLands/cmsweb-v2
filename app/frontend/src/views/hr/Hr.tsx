import { Button } from '@/components/ui/button'
import React from 'react'

const Projects: React.FC = () => {
  return (
    <div
      className="flex items-center justify-center flex-1 border border-dashed rounded-lg shadow-sm"
      x-chunk="dashboard-02-chunk-1"
    >
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">HR Page</h3>
        <p className="text-sm text-muted-foreground">You can start manage your employee</p>
        <Button className="mt-4">Manage Employee</Button>
      </div>
    </div>
  )
}

export default Projects
