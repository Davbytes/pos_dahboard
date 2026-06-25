// src/pages/PurchasesPage.jsx
import React, { useState } from 'react';
import Icon from '../components/Icon';
import Modal from '../components/Modal';
import { PURCHASES, SUPPLIERS } from '../data/mockData';

const VAT_TYPES = ['Inclusive', 'Exclusive', 'Exempt'];
const VAT_RATE   = 0.16;

export default function PurchasesPage() {
  const [purchases, setPurchases] = useState(PURCHASES);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    invoice_number: '',
    supplier_id: '',
    received_by: '',
    invoice_total: '',
    vat_type: 'Exclusive',
  });

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const invoiceTotal = parseFloat(form.invoice_total) || 0;
  const vatType      = form.vat_type;
  const totalVat     = vatType === 'Exclusive' ? invoiceTotal * VAT_RATE
                     : vatType === 'Inclusive' ? invoiceTotal - (invoiceTotal / (1 + VAT_RATE))
                     : 0;
  const grandTotal   = vatType === 'Exclusive' ? invoiceTotal + totalVat : invoiceTotal;

  const handleSubmit = () => {
    if (!form.invoice_number || !form.supplier_id || !form.invoice_total) return;
    const supplier = SUPPLIERS.find(s => s.id === parseInt(form.supplier_id));
    setPurchases(prev => [...prev, {
      id: prev.length + 1,
      invoice: form.invoice_number,
      supplier: supplier?.name ?? '',
      received_by: form.received_by,
      invoice_total: invoiceTotal,
      vat_type: vatType,
      total_vat: parseFloat(totalVat.toFixed(2)),
      grand_total: parseFloat(grandTotal.toFixed(2)),
      created_at: new Date().toISOString().split('T')[0],
    }]);
    setForm({ invoice_number: '', supplier_id: '', received_by: '', invoice_total: '', vat_type: 'Exclusive' });
    setShowModal(false);
  };

  return (
    <div>
      <div className="page-header">
        <span className="page-title">Purchases</span>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Icon name="plus" size={14} color="#fff" /> New Purchase
        </button>
      </div>

      <div className="table-card">
        <div className="table-header">
          <span className="table-title">Purchase Records</span>
          <span className="badge blue">{purchases.length} invoices</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Supplier</th>
                <th>Received By</th>
                <th>Invoice Total</th>
                <th>VAT Type</th>
                <th>Total VAT</th>
                <th>Grand Total</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map(p => (
                <tr key={p.id}>
                  <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{p.invoice}</td>
                  <td style={{ fontWeight: 500 }}>{p.supplier}</td>
                  <td>{p.received_by}</td>
                  <td>KSh {p.invoice_total.toLocaleString()}</td>
                  <td>
                    <span className={`badge ${p.vat_type === 'Inclusive' ? 'green' : p.vat_type === 'Exempt' ? 'purple' : 'amber'}`}>
                      {p.vat_type}
                    </span>
                  </td>
                  <td>KSh {p.total_vat.toLocaleString()}</td>
                  <td style={{ fontWeight: 700 }}>KSh {p.grand_total.toLocaleString()}</td>
                  <td style={{ fontSize: 12, color: 'var(--gray-400)' }}>{p.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <Modal
          title="New Purchase"
          onClose={() => setShowModal(false)}
          footer={
            <>
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSubmit}>Save Purchase</button>
            </>
          }
        >
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Invoice Number *</label>
              <input className="form-input" name="invoice_number" value={form.invoice_number} onChange={handleChange} placeholder="INV-2024-005" />
            </div>
            <div className="form-group">
              <label className="form-label">Supplier *</label>
              <select className="form-select" name="supplier_id" value={form.supplier_id} onChange={handleChange}>
                <option value="">Select supplier…</option>
                {SUPPLIERS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Received By</label>
              <input className="form-input" name="received_by" value={form.received_by} onChange={handleChange} placeholder="e.g. John K." />
            </div>
            <div className="form-group">
              <label className="form-label">VAT Type</label>
              <select className="form-select" name="vat_type" value={form.vat_type} onChange={handleChange}>
                {VAT_TYPES.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Invoice Total (KSh) *</label>
            <input className="form-input" name="invoice_total" type="number" value={form.invoice_total} onChange={handleChange} placeholder="0.00" />
          </div>

          {/* VAT preview */}
          {invoiceTotal > 0 && (
            <div style={{ background: 'var(--gray-50)', borderRadius: 8, padding: '12px 14px', marginTop: 4 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                <span style={{ color: 'var(--gray-600)' }}>VAT ({vatType})</span>
                <span style={{ fontWeight: 600 }}>KSh {totalVat.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, fontWeight: 700 }}>
                <span>Grand Total</span>
                <span style={{ color: 'var(--blue)' }}>KSh {grandTotal.toFixed(2)}</span>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
