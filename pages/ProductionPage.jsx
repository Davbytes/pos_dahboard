// src/pages/ProductionPage.jsx
import React, { useState } from 'react';
import Icon from '../components/Icon';
import Modal from '../components/Modal';
import { PRODUCTIONS, PRODUCTS, STOCK_PRODUCTS } from '../data/mockData';

export default function ProductionPage({ onGoToPurchases }) {
  const [records, setRecords] = useState(PRODUCTIONS);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    product_id: '', stock_product_id: '', conversion_factor: '',
  });

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    if (!form.product_id || !form.stock_product_id || !form.conversion_factor) return;
    const product      = PRODUCTS.find(p => p.id === parseInt(form.product_id));
    const stockProduct = STOCK_PRODUCTS.find(s => s.id === parseInt(form.stock_product_id));
    const cf           = parseFloat(form.conversion_factor);
    const usedStock    = parseFloat((stockProduct.current_stock * cf).toFixed(2));

    setRecords(prev => [...prev, {
      id: prev.length + 1,
      product: product.name,
      stock_product: stockProduct.name,
      product_id: product.id,
      stock_product_id: stockProduct.id,
      conversion_factor: cf,
      used_stock: usedStock,
      current_stock: product.stock,
    }]);
    setForm({ product_id: '', stock_product_id: '', conversion_factor: '' });
    setShowModal(false);
  };

  return (
    <div>
      <div className="page-header">
        <span className="page-title">Production</span>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-outline" onClick={onGoToPurchases}>
            <Icon name="cart" size={14} color="#2563eb" /> Purchases
          </button>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Icon name="plus" size={14} color="#fff" /> New Production
          </button>
        </div>
      </div>

      <div className="prod-stats">
        {[
          ['Total Records', records.length],
          ['Products Tracked', new Set(records.map(r => r.product)).size],
          ['Stock Inputs Used', new Set(records.map(r => r.stock_product)).size],
        ].map(([label, value]) => (
          <div className="prod-stat-card" key={label}>
            <div className="prod-stat-label">{label}</div>
            <div className="prod-stat-value">{value}</div>
          </div>
        ))}
      </div>

      <div className="table-card">
        <div className="table-header">
          <span className="table-title">Production Records</span>
          <span className="badge blue">{records.length} records</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Product (Output)</th>
                <th>Stock Product (Input)</th>
                <th>Conversion Factor</th>
                <th>Used Stock</th>
                <th>Current Stock</th>
              </tr>
            </thead>
            <tbody>
              {records.map((p, i) => (
                <tr key={p.id}>
                  <td style={{ color: 'var(--gray-400)' }}>{i + 1}</td>
                  <td style={{ fontWeight: 500 }}>{p.product}</td>
                  <td>{p.stock_product}</td>
                  <td><span className="badge blue">{p.conversion_factor}</span></td>
                  <td style={{ color: 'var(--red)', fontWeight: 600 }}>{p.used_stock}</td>
                  <td style={{ fontWeight: 600 }}>{p.current_stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <Modal
          title="New Production Record"
          onClose={() => setShowModal(false)}
          footer={
            <>
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSubmit}>Save Record</button>
            </>
          }
        >
          <div className="form-group">
            <label className="form-label">Output Product *</label>
            <select className="form-select" name="product_id" value={form.product_id} onChange={handleChange}>
              <option value="">Select product…</option>
              {PRODUCTS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Input Stock Product *</label>
            <select className="form-select" name="stock_product_id" value={form.stock_product_id} onChange={handleChange}>
              <option value="">Select stock product…</option>
              {STOCK_PRODUCTS.map(s => (
                <option key={s.id} value={s.id}>{s.name} (stock: {s.current_stock} {s.uom})</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Conversion Factor *</label>
            <input
              className="form-input"
              name="conversion_factor"
              type="number"
              step="0.01"
              value={form.conversion_factor}
              onChange={handleChange}
              placeholder="e.g. 0.25 means 0.25 kg input per 1 unit output"
            />
            <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 5 }}>
              Units of input material consumed per 1 unit of output product
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
