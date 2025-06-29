// app/dashboard-layout.js
"use client";

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import { useData } from './data-context'; // Use the context

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { handleUpdateCompanyName, companyName } = useData(); // Get companyName from context

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="main-container">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="main-content">
        <TopBar
          onUpdateCompanyName={handleUpdateCompanyName}
          companyName={companyName} // Pass companyName to TopBar
          toggleSidebar={toggleSidebar} // Pass toggle function to TopBar
        />
        {children} {/* This is where the page content (main or todo) will be rendered */}
      </div>
    </div>
  );
}
