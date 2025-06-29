// app/components/ProgressCard.js
"use client";

import React from 'react';

const ProgressCard = ({ title, percentage, className }) => {
  return (
    <div className={`progress-card ${className}`}>
      <div className="progress-header">
        <div className="progress-title">{title}</div>
        <div className="progress-percentage">{percentage}%</div>
      </div>
      <div className="mini-progress">
        <div className="mini-progress-fill" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

export default ProgressCard;
