import Icon from './Icon';
import { useLocation } from '../context/LocationContext';

const NAV = [
  { key: 'dashboard',  label: 'Dashboard',  icon: 'home'    },
  { key: 'products',   label: 'Products',   icon: 'box'     },
  { key: 'production', label: 'Production', icon: 'factory' },
  { key: 'purchases',  label: 'Purchases',  icon: 'cart'    },
  { key: 'reports',    label: 'Reports',    icon: 'chart'   },
];

export default function Sidebar({ page, setPage }) {
  const { location, setLocation } = useLocation();

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <Icon name="store" size={16} color="#fff" />
          </div>
          <div>
            <div className="sidebar-title">POS Manager</div>
            <div className="sidebar-location">
              {location?.name.split('–')[0].trim()}
            </div>
          </div>
        </div>
      </div>

      <div className="sidebar-nav">
        {NAV.map(n => (
          <div
            key={n.key}
            className={`nav-item ${page === n.key ? 'active' : ''}`}
            onClick={() => setPage(n.key)}
          >
            <Icon name={n.icon} size={16} color="#fff" />
            {n.label}
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <div className="change-loc" onClick={() => setLocation(null)}>
          <Icon name="location" size={14} color="rgba(255,255,255,0.7)" />
          Change branch
        </div>
      </div>
    </div>
  );
}
