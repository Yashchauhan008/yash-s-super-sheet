// app/components/TopBar.js
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TopBar = ({ onUpdateCompanyName, companyName, toggleSidebar }) => {
  const [inputCompanyName, setInputCompanyName] = useState(companyName);
  const pathname = usePathname();

  const handleUpdate = () => {
    onUpdateCompanyName(inputCompanyName);
  };

  return (
    <div className="top-bar">
      {/* Hamburger menu toggle - only visible on small screens via CSS */}
      <button className="menu-toggle" onClick={toggleSidebar}>
        ☰
      </button>

      <div className="logo">🚀 Yash&#39;s Placement sheet</div>

      {/* Company section - hidden on small screens via CSS */}

      {/* Navigation buttons - always visible via CSS */}
      <div className="nav-buttons">
        {/* Show Dashboard button if current path is NOT '/' */}
        {pathname !== '/' && (
          <Link href="/" passHref>
            <button className="update-btn">Dashboard</button>
          </Link>
        )}
        {/* Show To-Do button if current path is NOT '/todo' */}
        {pathname !== '/todo' && (
          <Link href="/todo" passHref>
            <button className="update-btn">To-Do</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default TopBar;
