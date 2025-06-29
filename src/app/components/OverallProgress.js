// app/components/OverallProgress.js
"use client";

import React from 'react';

const OverallProgress = ({ overallPercentage }) => {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (overallPercentage / 100) * circumference;

  return (
    <div className="overall-progress">
      <div className="overall-circle">
        <svg>
          <circle className="bg-circle" cx="50" cy="50" r="45"></circle>
          <circle
            className="progress-circle"
            cx="50"
            cy="50"
            r="45"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          ></circle>
        </svg>
        <div className="overall-percentage">{overallPercentage}%</div>
      </div>
    </div>
  );
};

export default OverallProgress;
