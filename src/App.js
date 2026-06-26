import { useState } from 'react';
import { LocationProvider, useLocation } from './context/LocationContext';
import LocationScreen from './pages/LocationScreen';
import Dashboard    from './pages/Dashboard';
import Products     from './pages/Products';
import Production   from './pages/Production';
import Purchases    from './pages/Purchases';
import Reports      from './pages/Reports';
import Sidebar      from './components/Sidebar';
import Topbar       from './components/Topbar';

function MainApp() {
  const [page, setPage] = useState('dashboard');

  return (
    <div className="app">
      <Sidebar page={page} setPage={setPage} />
      <div className="main">
        <Topbar page={page} />
        <div className="content">
          {page === 'dashboard'  && <Dashboard />}
          {page === 'products'   && <Products />}
          {page === 'production' && <Production onGoToPurchases={() => setPage('purchases')} />}
          {page === 'purchases'  && <Purchases />}
          {page === 'reports'    && <Reports />}
        </div>
      </div>
    </div>
  );
}

function AppRouter() {
  const { location } = useLocation();
  return location ? <MainApp /> : <LocationScreen />;
}

export default function App() {
  return (
    <LocationProvider>
      <AppRouter />
    </LocationProvider>
  );
}
