// src/App.jsx
import React, { useState } from 'react';
import './styles/global.css';
import './styles/ProductionPage.css';

import LocationScreen  from './pages/LocationScreen';
import Sidebar         from './components/Sidebar';
import Topbar          from './components/Topbar';
import Dashboard       from './pages/Dashboard';
import ProductsPage    from './pages/ProductsPage';
import ProductionPage  from './pages/ProductionPage';
import PurchasesPage   from './pages/PurchasesPage';
import ReportsPage     from './pages/ReportsPage';

export default function App() {
  const [location, setLocation] = useState(null);
  const [page,     setPage]     = useState('dashboard');

  if (!location) {
    return <LocationScreen onSelect={loc => { setLocation(loc); setPage('dashboard'); }} />;
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar
        page={page}
        setPage={setPage}
        location={location}
        onChangeLocation={() => setLocation(null)}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Topbar page={page} location={location} />
        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
          {page === 'dashboard'  && <Dashboard />}
          {page === 'products'   && <ProductsPage />}
          {page === 'production' && <ProductionPage onGoToPurchases={() => setPage('purchases')} />}
          {page === 'purchases'  && <PurchasesPage />}
          {page === 'reports'    && <ReportsPage />}
        </div>
      </div>
    </div>
  );
}
