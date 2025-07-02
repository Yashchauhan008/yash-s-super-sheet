// app/dashboard-layout.js
"use client";

import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';

export default function DashboardLayout({ children }) {
  // Default state is 'true', which is ideal for desktop users loading the page.
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // This effect runs once on the client after the component mounts.
  // It checks the window width and collapses the sidebar if it's a mobile-sized screen.
  useEffect(() => {
    if (window.innerWidth <= 1024) {
      setIsSidebarOpen(false);
    }
  }, []); // The empty dependency array [] ensures this runs only once.

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    // This function is specifically for the mobile overlay to ensure it always closes.
    if (window.innerWidth <= 1024) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className={`main-container ${isSidebarOpen ? '' : 'sidebar-collapsed'}`}>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="main-content">
        <TopBar toggleSidebar={toggleSidebar} />
        {children}
      </div>

      {/* This overlay is for mobile mode and is controlled by the .sidebar.open class via CSS */}
      <div
        className="main-content-overlay"
        onClick={closeSidebar}
      ></div>
    </div>
  );
}
