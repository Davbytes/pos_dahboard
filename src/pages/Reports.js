import { useState } from 'react';
import Icon from '../components/Icon';
import { DAILY_SALES, PURCHASES, PRODUCTIONS, PRODUCTS } from '../data/mockData';

const TABS = [
  { key: 'sales',      label: 'Sales'      },
  { key: 'purchases',  label: 'Purchases'  },
  { key: 'production', label: 'Production' },
  { key: 'products',   label: 'Products'   },
];

function exportCSV(data, filename) {
  if (!data.length) return;
  const keys = Object.keys(data[0]);
  const rows = [keys.join(','), ...data.map(r => keys.map(k => `"${r[k]}"`).join(','))];
  const blob = new Blob([rows.join('\n')], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

export default function Reports() {
  const [tab,    setTab]    = useState('sales');
  const [filter, setFilter] = useState('today');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo,   setDateTo]   = useState('');

  const filterLabel = filter === 'today' ? 'Today' : filter === 'month' ? 'This Month' : 'Custom range';

  const handleExport = () => {
    const map = { sales: DAILY_SALES, purchases: PURCHASES, production: PRODUCTIONS, products: PRODUCTS };
    exportCSV(map[tab], `${tab}-report.csv`);
  };

  return (
    <div>
      <div className="page-header">
        <span className="page-title">Reports</span>
        <div className="filter-row">
          <select className="filter-select" value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="today">Today</option>
            <option value="month">This Month</option>
            <option value="custom">Custom Range</option>
          </select>
          {filter === 'custom' && (
            <>
              <input type="date" className="filter-select" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
              <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>to</span>
              <input type="date" className="filter-select" value={dateTo} onChange={e => setDateTo(e.target.value)} />
            </>
          )}
          <button className="btn btn-outline" style={{ padding: '7px 12px', fontSize: 12 }} onClick={handleExport}>
            <Icon name="file" size={13} color="#2563eb" /> Export CSV
          </button>
        </div>
      </div>

      <div className="reports-wrap">
        {/* Sub-sidebar */}
        <div className="reports-sidebar">
          <div className="rep-nav-label">Reports</div>
          {TABS.map(t => (
            <div
              key={t.key}
              className={`rep-nav-item ${tab === t.key ? 'active' : ''}`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </div>
          ))}
        </div>

        {/* Report content */}
        <div className="reports-main">
          <div className="rep-header">
            <span className="table-title">{TABS.find(t => t.key === tab)?.label} Report</span>
            <span className="table-badge">{filterLabel}</span>
          </div>
          <div className="rep-body">

            {tab === 'sales' && (
              <table>
                <thead>
                  <tr>
                    <th>Time</th><th>Product</th><th>Qty</th>
                    <th>Unit Price</th><th>Total</th><th>Channel</th><th>Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {DAILY_SALES.map((r, i) => (
                    <tr key={i}>
                      <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{r.time}</td>
                      <td style={{ fontWeight: 500 }}>{r.product}</td>
                      <td>{r.qty}</td>
                      <td>KSh {r.unit_price.toLocaleString()}</td>
                      <td style={{ fontWeight: 600 }}>KSh {r.total.toLocaleString()}</td>
                      <td style={{ fontSize: 12, color: 'var(--gray-600)' }}>{r.channel}</td>
                      <td>
                        <span className={`badge ${r.payment === 'Cash' ? 'green' : r.payment === 'Card' ? 'blue' : 'amber'}`}>
                          {r.payment}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {tab === 'purchases' && (
              <table>
                <thead>
                  <tr>
                    <th>Invoice</th><th>Supplier</th><th>Received By</th>
                    <th>Grand Total</th><th>VAT Type</th><th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {PURCHASES.map(p => (
                    <tr key={p.id}>
                      <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{p.invoice}</td>
                      <td style={{ fontWeight: 500 }}>{p.supplier}</td>
                      <td>{p.received_by}</td>
                      <td style={{ fontWeight: 700 }}>KSh {p.grand_total.toLocaleString()}</td>
                      <td>
                        <span className={`badge ${p.vat_type === 'Inclusive' ? 'green' : 'amber'}`}>
                          {p.vat_type}
                        </span>
                      </td>
                      <td style={{ fontSize: 12, color: 'var(--gray-400)' }}>{p.created_at}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {tab === 'production' && (
              <table>
                <thead>
                  <tr>
                    <th>Product</th><th>Input Material</th>
                    <th>Conversion</th><th>Used Stock</th><th>Output Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {PRODUCTIONS.map(p => (
                    <tr key={p.id}>
                      <td style={{ fontWeight: 500 }}>{p.product}</td>
                      <td>{p.stock_product}</td>
                      <td><span className="badge blue">{p.conversion_factor}</span></td>
                      <td style={{ color: 'var(--red)', fontWeight: 600 }}>{p.used_stock}</td>
                      <td style={{ fontWeight: 600 }}>{p.current_stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {tab === 'products' && (
              <table>
                <thead>
                  <tr>
                    <th>Name</th><th>Category</th><th>Dept</th>
                    <th>Price</th><th>Stock</th><th>Sales</th><th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {PRODUCTS.map(p => (
                    <tr key={p.id}>
                      <td style={{ fontWeight: 500 }}>{p.name}</td>
                      <td>{p.category}</td>
                      <td>{p.department}</td>
                      <td>KSh {p.price.toLocaleString()}</td>
                      <td style={{ fontWeight: 600, color: p.stock <= p.reorder_level ? 'var(--red)' : 'var(--gray-800)' }}>
                        {p.stock}
                      </td>
                      <td>{p.current_sales}</td>
                      <td>
                        <span className={`badge ${p.stock <= p.reorder_level ? 'red' : 'green'}`}>
                          {p.stock <= p.reorder_level ? 'Low Stock' : 'OK'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
