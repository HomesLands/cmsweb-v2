export interface Route {
    title: string;
    path: string;
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
    icon: React.ComponentType;
    children?: Submenu[];
}