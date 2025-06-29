// app/components/ToggleSwitch.js
"use client";

import React from 'react';

const ToggleSwitch = ({ isActive, onToggle }) => {
  return (
    <div
      className={`toggle-switch ${isActive ? 'active' : ''}`}
      onClick={onToggle}
    >
      <div className="toggle-slider"></div>
    </div>
  );
};

export default ToggleSwitch;
