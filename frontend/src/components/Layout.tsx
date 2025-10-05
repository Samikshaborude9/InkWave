import { useState } from "react";
import type { ReactNode } from "react";
import HomeNavbar from './HomeNavbar';
import Sidebar from './Sidebar';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({children}: LayoutProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = ()=> {
        setIsSidebarOpen((prev) => !prev);
    }
    
    return (
        <div>
            <HomeNavbar toggleSidebar = {toggleSidebar} />
            <Sidebar isOpen = {isSidebarOpen} />
            <main
            className={`p-6 mt-16 transition-all duration-300 ${isSidebarOpen ? 'ml-64': 'ml-0'}`}>
                {children}
            </main>
        </div>
    )
};

export default Layout;
