// app/dashboard-layout.js
"use client";

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import { useData } from './data-context';

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Start with sidebar open on desktop
  const { handleUpdateCompanyName, companyName } = useData();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`main-container ${isSidebarOpen ? '' : 'sidebar-collapsed'}`}> {/* Add class here */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="main-content">
        <TopBar
          onUpdateCompanyName={handleUpdateCompanyName}
          companyName={companyName}
          toggleSidebar={toggleSidebar}
        />
        {children}
      </div>
    </div>
  );
}
