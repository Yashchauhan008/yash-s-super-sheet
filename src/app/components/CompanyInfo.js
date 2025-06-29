// app/components/CompanyInfo.js
"use client";

import React from 'react';
import { companySpecificInfo } from '@/lib/data';

const CompanyInfo = ({ companyName }) => {
  const specificText = companySpecificInfo[companyName.toLowerCase()] || "Research their tech stack and values.";

  if (!companyName) return null;

  return (
    <div className="company-info" id="companyInfoContainer">
      <strong>Preparing for: <span id="companyName">{companyName}</span></strong><br />
      <span id="companySpecific">{specificText}</span>
    </div>
  );
};

export default CompanyInfo;
