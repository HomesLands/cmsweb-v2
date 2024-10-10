import React from 'react'
import { IPermission } from './permission.type'

export interface ISidebarRoute {
  title: string
  path: string
  icon?: React.ComponentType
  children?: ISidebarRoute[]
  permission?: IPermission
}
