import React from 'react'

export interface ISidebarRoute {
  title: string
  path: string
  icon: React.ComponentType
  children?: ISidebarRoute[]
  authorities?: string[]
}
