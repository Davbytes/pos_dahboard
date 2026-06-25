// src/pages/ReportsPage.jsx
import React, { useState } from 'react';
import Icon from '../components/Icon';
import { DAILY_SALES, PURCHASES, PRODUCTIONS, PRODUCTS } from '../data/mockData';
import '../styles/ReportsPage.css';

const TABS = [
  { key: 'sales',      label: 'Sales'      },
  { key: 'purchases',  label: 'Purchases'  },
  { key: 'production', label: 'Production' },
  { key: 'products',   label: 'Products'   },
];

function exportCSV(filename, headers, rows) {
  const lines = [headers.join(','), ...rows.map(r => r.map(v => `"${v ?? ''}"`).join(','))];
  const blob  = new Blob([lines.join('\n')], { type: 'text/csv' });
  const url   = URL.createObjectURL(blob);
  const a     = document.createElement('a');
  a.href      = url;
  a.download  = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function SalesReport() {
  const headers = ['Time', 'Product', 'Qty', 'Unit Price', 'Total', 'Channel', 'Payment', 'Stock After'];
  const rows    = DAILY_SALES.map(r => [r.time, r.product, r.qty, r.unit_price, r.total, r.channel, r.payment, r.stock_after]);
  return (
    <>
      <div className="rep-export-row">
        <span className="badge blue">{DAILY_SALES.length} records</span>
        <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: 12 }}
          onClick={() => exportCSV('sales_report.csv', headers, rows)}>
          <Icon name="download" size={13} color="#2563eb" /> Export CSV
        </button>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead><tr>{headers.map(h => <th key={h}>{h}</th>)}</tr></thead>
          <tbody>
            {DAILY_SALES.map(r => (
              <tr key={r.id}>
                <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{r.time}</td>
                <td style={{ fontWeight: 500 }}>{r.product}</td>
                <td>{r.qty}</td>
                <td>KSh {r.unit_price.toLocaleString()}</td>
                <td style={{ fontWeight: 600 }}>KSh {r.total.toLocaleString()}</td>
                <td style={{ fontSize: 12 }}>{r.channel}</td>
                <td><span className={`badge ${r.payment === 'Cash' ? 'green' : r.payment === 'Card' ? 'blue' : 'amber'}`}>{r.payment}</span></td>
                <td>{r.stock_after}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function PurchasesReport() {
  const headers = ['Invoice', 'Supplier', 'Received By', 'Invoice Total', 'VAT Type', 'Total VAT', 'Grand Total', 'Date'];
  const rows    = PURCHASES.map(p => [p.invoice, p.supplier, p.received_by, p.invoice_total, p.vat_type, p.total_vat, p.grand_total, p.created_at]);
  return (
    <>
      <div className="rep-export-row">
        <span className="badge blue">{PURCHASES.length} records</span>
        <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: 12 }}
          onClick={() => exportCSV('purchases_report.csv', headers, rows)}>
          <Icon name="download" size={13} color="#2563eb" /> Export CSV
        </button>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead><tr>{headers.map(h => <th key={h}>{h}</th>)}</tr></thead>
          <tbody>
            {PURCHASES.map(p => (
              <tr key={p.id}>
                <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{p.invoice}</td>
                <td style={{ fontWeight: 500 }}>{p.supplier}</td>
                <td>{p.received_by}</td>
                <td>KSh {p.invoice_total.toLocaleString()}</td>
                <td><span className={`badge ${p.vat_type === 'Inclusive' ? 'green' : p.vat_type === 'Exempt' ? 'purple' : 'amber'}`}>{p.vat_type}</span></td>
                <td>KSh {p.total_vat.toLocaleString()}</td>
                <td style={{ fontWeight: 700 }}>KSh {p.grand_total.toLocaleString()}</td>
                <td style={{ fontSize: 12, color: 'var(--gray-400)' }}>{p.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function ProductionReport() {
  const headers = ['Product', 'Input Material', 'Conversion Factor', 'Used Stock', 'Current Stock'];
  const rows    = PRODUCTIONS.map(p => [p.product, p.stock_product, p.conversion_factor, p.used_stock, p.current_stock]);
  return (
    <>
      <div className="rep-export-row">
        <span className="badge blue">{PRODUCTIONS.length} records</span>
        <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: 12 }}
          onClick={() => exportCSV('production_report.csv', headers, rows)}>
          <Icon name="download" size={13} color="#2563eb" /> Export CSV
        </button>
      </div>
      <table>
        <thead><tr>{headers.map(h => <th key={h}>{h}</th>)}</tr></thead>
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
    </>
  );
}

function ProductsReport() {
  const headers = ['Name', 'Category', 'Department', 'Price', 'Stock', 'Reorder Level', 'Sales', 'Status'];
  const rows    = PRODUCTS.map(p => [p.name, p.category, p.department, p.price, p.stock, p.reorder_level, p.current_sales, p.stock <= p.reorder_level ? 'Low Stock' : 'OK']);
  return (
    <>
      <div className="rep-export-row">
        <span className="badge blue">{PRODUCTS.length} products</span>
        <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: 12 }}
          onClick={() => exportCSV('products_report.csv', headers, rows)}>
          <Icon name="download" size={13} color="#2563eb" /> Export CSV
        </button>
      </div>
      <table>
        <thead><tr>{headers.map(h => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>
          {PRODUCTS.map(p => (
            <tr key={p.id}>
              <td style={{ fontWeight: 500 }}>{p.name}</td>
              <td>{p.category}</td>
              <td>{p.department}</td>
              <td>KSh {p.price.toLocaleString()}</td>
              <td style={{ fontWeight: 600, color: p.stock <= p.reorder_level ? 'var(--red)' : 'var(--gray-800)' }}>{p.stock}</td>
              <td>{p.reorder_level}</td>
              <td>{p.current_sales}</td>
              <td><span className={`badge ${p.stock <= p.reorder_level ? 'red' : 'green'}`}>{p.stock <= p.reorder_level ? 'Low Stock' : 'OK'}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

const REPORT_COMPONENTS = {
  sales:      SalesReport,
  purchases:  PurchasesReport,
  production: ProductionReport,
  products:   ProductsReport,
};

export default function ReportsPage() {
  const [activeTab, setActiveTab]   = useState('sales');
  const [filter, setFilter]         = useState('today');
  const [dateFrom, setDateFrom]     = useState('');
  const [dateTo, setDateTo]         = useState('');

  const ActiveReport = REPORT_COMPONENTS[activeTab];

  return (
    <div>
      <div className="page-header" style={{ marginBottom: 16 }}>
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
        </div>
      </div>

      <div className="reports-layout">
        {/* Sub-sidebar */}
        <div className="reports-sidebar">
          <div className="rep-sidebar-label">Reports</div>
          {TABS.map(t => (
            <div
              key={t.key}
              className={`rep-nav-item ${activeTab === t.key ? 'active' : ''}`}
              onClick={() => setActiveTab(t.key)}
            >
              {t.label}
            </div>
          ))}
        </div>

        {/* Report content */}
        <div className="reports-content">
          <div className="rep-content-header">
            <span className="table-title">
              {TABS.find(t => t.key === activeTab)?.label} Report
            </span>
            <span className="badge blue">
              {filter === 'today' ? 'Today' : filter === 'month' ? 'This Month' : `${dateFrom || '—'} to ${dateTo || '—'}`}
            </span>
          </div>
          <div className="rep-content-body">
            <ActiveReport />
          </div>
        </div>
      </div>
    </div>
  );
}
