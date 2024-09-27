export interface IRoute {
  title: string
  path: string
  meta?: {
    authorities?: string[]
  }
  redirect?: string
  component?: () => Promise<{ default: React.ComponentType }>
  children?: IRoute[]
  authorities?: string[]
}

export interface IRoutes {
  routes: IRoute[]
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
