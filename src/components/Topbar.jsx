// src/components/Topbar.jsx
import React from 'react';
import '../styles/Topbar.css';

const PAGE_TITLES = {
  dashboard:  'Dashboard',
  products:   'Products',
  production: 'Production',
  purchases:  'Purchases',
  reports:    'Reports',
};

export default function Topbar({ page, location }) {
  const now = new Date();
  const hour = now.getHours();
  const inShift = hour >= 8 && hour < 20;

  return (
    <div className="topbar">
      <div className="topbar-left">
        <span className="topbar-title">{PAGE_TITLES[page] ?? page}</span>
        <span className="topbar-badge">{location?.name}</span>
      </div>
      <div className="topbar-right">
        <div className="shift-pill">
          <div className={`shift-dot ${inShift ? 'active' : ''}`} />
          {inShift ? 'Shift active · 08:00–20:00' : 'No active shift'}
        </div>
      </div>
    </div>
  );
}
