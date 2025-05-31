import React, { useState } from "react";
import "./AdminWrapper.css";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import Offcanvas from "react-bootstrap/Offcanvas";

const AdminWrapper = ({ children, sidebarItems }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleMobileSidebar = (state) => setShowOffcanvas(state);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <div
        className={`md:hidden transform transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-64 translate-x-0" : "hidden w-0 -translate-x-full"
        }`}
      >
        <AdminSidebar sidebarItems={sidebarItems} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNavbar
          sidebarItems={sidebarItems}
          toggleSidebar={toggleSidebar}
          showOffcanvas={showOffcanvas}
          setShowOffcanvas={handleMobileSidebar}
        />
        {children}
      </div>
    </div>
  );
};

export default AdminWrapper;
