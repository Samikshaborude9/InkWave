import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import HomeNavbar from "./HomeNavbar";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // Automatically close sidebar on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Navbar */}
      <HomeNavbar toggleSidebar={toggleSidebar} />

      {/* Sidebar */}
      {/* On mobile: overlay style | On desktop: fixed sidebar */}
      <div>
        <Sidebar isOpen={isSidebarOpen} />
        {isSidebarOpen && window.innerWidth < 768 && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-30"
            onClick={toggleSidebar}
          />
        )}
      </div>

      {/* Main Content */}
      <main
        className={`transition-all duration-300 mt-16 flex justify-center ${
          isSidebarOpen && window.innerWidth >= 768 ? "md:ml-64" : "ml-0"
        }`}
      >
        <div className="transition-all duration-300 w-full md:w-[70vw] p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
