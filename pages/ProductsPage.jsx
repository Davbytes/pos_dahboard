// src/pages/ProductsPage.jsx
import React, { useState } from 'react';
import Icon from '../components/Icon';
import Modal from '../components/Modal';
import { PRODUCTS } from '../data/mockData';

const CATEGORIES   = ['Beverages', 'Food', 'Alcohol', 'Snacks', 'Other'];
const DEPARTMENTS  = ['Bar', 'Kitchen', 'Store'];

export default function ProductsPage() {
  const [products, setProducts] = useState(PRODUCTS);
  const [q, setQ] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: '', category: '', department: '', price: '', stock: '', reorder_level: '',
  });

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(q.toLowerCase()) ||
    p.category.toLowerCase().includes(q.toLowerCase()) ||
    p.department.toLowerCase().includes(q.toLowerCase())
  );

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    if (!form.name || !form.category || !form.department || !form.price) return;
    const newProduct = {
      id: products.length + 1,
      name: form.name,
      category: form.category,
      department: form.department,
      price: parseFloat(form.price),
      stock: parseInt(form.stock) || 0,
      reorder_level: parseInt(form.reorder_level) || 0,
      current_sales: 0,
    };
    setProducts(prev => [...prev, newProduct]);
    setForm({ name: '', category: '', department: '', price: '', stock: '', reorder_level: '' });
    setShowModal(false);
  };

  return (
    <div>
      <div className="page-header">
        <span className="page-title">Products</span>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Icon name="plus" size={14} color="#fff" /> Add Product
        </button>
      </div>

      <div className="search-bar">
        <input
          className="search-input"
          placeholder="Search by name, category or department…"
          value={q}
          onChange={e => setQ(e.target.value)}
        />
      </div>

      <div className="table-card">
        <div className="table-header">
          <span className="table-title">All Products</span>
          <span className="badge blue">{filtered.length} items</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Category</th>
                <th>Department</th>
                <th>Price</th>
                <th>Current Stock</th>
                <th>Current Sales</th>
                <th>Reorder Level</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={p.id}>
                  <td style={{ color: 'var(--gray-400)' }}>{i + 1}</td>
                  <td style={{ fontWeight: 500 }}>{p.name}</td>
                  <td>{p.category}</td>
                  <td>{p.department}</td>
                  <td>KSh {p.price.toLocaleString()}</td>
                  <td>
                    <span style={{ fontWeight: 600, color: p.stock <= p.reorder_level ? 'var(--red)' : 'var(--gray-800)' }}>
                      {p.stock}
                    </span>
                    {p.stock <= p.reorder_level && (
                      <span className="badge red" style={{ marginLeft: 6 }}>Low</span>
                    )}
                  </td>
                  <td>{p.current_sales}</td>
                  <td>{p.reorder_level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <Modal
          title="Add New Product"
          onClose={() => setShowModal(false)}
          footer={
            <>
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSubmit}>Save Product</button>
            </>
          }
        >
          <div className="form-group">
            <label className="form-label">Product Name *</label>
            <input className="form-input" name="name" value={form.name} onChange={handleChange} placeholder="e.g. Mineral Water 500ml" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Category *</label>
              <select className="form-select" name="category" value={form.category} onChange={handleChange}>
                <option value="">Select…</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Department *</label>
              <select className="form-select" name="department" value={form.department} onChange={handleChange}>
                <option value="">Select…</option>
                {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Price (KSh) *</label>
              <input className="form-input" name="price" type="number" value={form.price} onChange={handleChange} placeholder="0.00" />
            </div>
            <div className="form-group">
              <label className="form-label">Opening Stock</label>
              <input className="form-input" name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="0" />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Reorder Level</label>
            <input className="form-input" name="reorder_level" type="number" value={form.reorder_level} onChange={handleChange} placeholder="0" />
          </div>
        </Modal>
      )}
    </div>
  );
}
