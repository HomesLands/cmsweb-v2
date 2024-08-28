export interface Route {
    title: string;
    path: string;
    redirect?: string;
    component?: () => Promise<{ default: React.ComponentType }>;
    children?: Route[]; 
}

export interface Routes {
    routes: Route[];
}
export interface Submenu{
    title: string;
    path: string;
    component?: () => Promise<{ default: React.ComponentType }>;
    icon: React.ComponentType;
    
}

export interface SidebarSubmenu {
    title: string;
    path: string;
    icon: React.ComponentType;
    component?: () => Promise<{ default: React.ComponentType }>;
    children?: Submenu[];
}