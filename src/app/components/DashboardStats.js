// app/components/DashboardStats.js
"use client";

import React from 'react';

const DashboardStats = ({ totalTopicsCompleted, totalTopics }) => {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-number">{totalTopicsCompleted}</div>
        <div className="stat-label">Completed</div>
      </div>
      <div className="stat-card">
        <div className="stat-number">{totalTopics}</div>
        <div className="stat-label">Total Topics</div>
      </div>
    </div>
  );
};

export default DashboardStats;
