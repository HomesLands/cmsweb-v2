export interface IRoute {
    title: string;
    path: string;
    redirect?: string;
    component?: () => Promise<{ default: React.ComponentType }>;
    children?: IRoute[]; 
}

export interface IRoutes {
    routes: IRoute[];
}
export interface ISubmenu{
    title: string;
    path: string;
    component?: () => Promise<{ default: React.ComponentType }>;
    icon: React.ComponentType;
    
}

export interface ISidebarSubmenu {
    title: string;
    path: string;
    icon: React.ComponentType;
    component?: () => Promise<{ default: React.ComponentType }>;
    children?: ISubmenu[];
}