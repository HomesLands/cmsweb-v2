import React from 'react'

export interface IRoute {
  title: string
  path: string
  meta?: {
    authorities?: string[]
  }
  redirect?: string
  component: React.FC
  children?: IRoute[]
  authorities?: string[]
  index?: boolean
}

export interface ISubmenu {
  title: string
  path: string
  meta?: {
    authorities?: string[]
  }
  component?: () => Promise<{ default: React.ComponentType }>
  icon: React.ComponentType
  authorities?: string[]
}

export interface ISidebarSubmenu {
  title: string
  path: string
  meta?: {
    authorities?: string[]
  }
  icon: React.ComponentType
  component?: () => Promise<{ default: React.ComponentType }>
  children?: ISubmenu[]
  authorities?: string[]
}
