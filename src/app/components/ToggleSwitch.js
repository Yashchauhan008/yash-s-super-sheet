// // app/components/ToggleSwitch.js
// "use client";

// import React from 'react';

// const ToggleSwitch = ({ isActive, onToggle }) => {
//   return (
//     <div
//       className={`toggle-switch ${isActive ? 'active' : ''}`}
//       onClick={onToggle}
//     >
//       <div className="toggle-slider"></div>
//     </div>
//   );
// };

// export default ToggleSwitch;


// app/components/ToggleSwitch.js
"use client";

import React from "react";
// import "./ToggleSwitch.css"; // Ensure you import the CSS or add it globally

const ToggleSwitch = ({ isActive, onToggle }) => {
  return (
    <label className="neon-checkbox">
      <input type="checkbox" checked={isActive} onChange={onToggle} />
      <div className="neon-checkbox__frame">
        <div className="neon-checkbox__box">
          <div className="neon-checkbox__check-container">
            <svg viewBox="0 0 24 24" className="neon-checkbox__check">
              <path d="M3,12.5l7,7L21,5"></path>
            </svg>
          </div>
          <div className="neon-checkbox__glow"></div>
          <div className="neon-checkbox__borders">
            <span></span><span></span><span></span><span></span>
          </div>
        </div>
        <div className="neon-checkbox__effects">
          <div className="neon-checkbox__particles">
            <span></span><span></span><span></span><span></span>
            <span></span><span></span><span></span><span></span>
            <span></span><span></span><span></span><span></span>
          </div>
          <div className="neon-checkbox__rings">
            <div className="ring"></div>
            <div className="ring"></div>
            <div className="ring"></div>
          </div>
          <div className="neon-checkbox__sparks">
            <span></span><span></span><span></span><span></span>
          </div>
        </div>
      </div>
    </label>
  );
};

export default ToggleSwitch;
