import { useState } from 'react';
import Icon from '../components/Icon';
import { useLocation } from '../context/LocationContext';
import { LOCATIONS } from '../data/mockData';

export default function LocationScreen() {
  const [selected, setSelected] = useState(null);
  const { setLocation } = useLocation();

  return (
    <div className="loc-screen">
      <div className="loc-card">
        <div className="loc-logo">
          <div className="loc-logo-icon">
            <Icon name="store" size={22} color="#fff" />
          </div>
          <span className="loc-logo-text">POS Manager</span>
        </div>

        <div className="loc-title">Select your branch</div>
        <div className="loc-sub">Choose the location you're operating from today.</div>

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
          onClick={() => selected && setLocation(selected)}
        >
          Continue to Dashboard →
        </button>
      </div>
    </div>
  );
}
