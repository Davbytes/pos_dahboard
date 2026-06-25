// src/pages/LocationScreen.jsx
import React, { useState } from 'react';
import Icon from '../components/Icon';
import { LOCATIONS } from '../data/mockData';
import '../styles/LocationScreen.css';

export default function LocationScreen({ onSelect }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="loc-screen">
      <div className="loc-card">
        <div className="loc-logo">
          <div className="loc-logo-icon">
            <Icon name="store" size={22} color="#fff" />
          </div>
          <span className="loc-logo-text">POS Manager</span>
        </div>
        <h1 className="loc-title">Select your branch</h1>
        <p className="loc-sub">Choose the location you're operating from today.</p>
        <div className="loc-label">Available branches</div>
        <div className="loc-branches">
          {LOCATIONS.map(l => (
            <div
              key={l.id}
              className={`loc-branch ${selected?.id === l.id ? 'active' : ''}`}
              onClick={() => setSelected(l)}
            >
              <div className="loc-branch-dot" />
              {l.name}
            </div>
          ))}
        </div>
        <button
          className="loc-btn"
          disabled={!selected}
          onClick={() => selected && onSelect(selected)}
        >
          Continue to Dashboard →
        </button>
      </div>
    </div>
  );
}
