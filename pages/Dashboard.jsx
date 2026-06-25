// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import Icon from '../components/Icon';
import {
  DAILY_SALES,
  LOW_STOCK_ITEMS,
  TOP_SELLERS_QTY,
  TOP_SELLERS_REVENUE,
  MONTHLY_SALES_TOTAL,
  MONTHLY_PURCHASES_TOTAL,
  SHIFT_SALES_TOTAL,
} from '../data/mockData';
import '../styles/Dashboard.css';

function StatCard({ icon, iconClass, label, value, sub }) {
  return (
    <div className="card stat-card">
      <div className={`card-icon ${iconClass}`}>{icon}</div>
      <div className="card-label">{label}</div>
      <div className="card-value">{value}</div>
      <div className="card-sub">{sub}</div>
    </div>
  );
}

export default function Dashboard() {
  const [sellerMetric, setSellerMetric] = useState('qty'); // 'qty' | 'revenue'
  const now = new Date();
  const hour = now.getHours();
  const inShift = hour >= 8 && hour < 20;
  const topSellers = sellerMetric === 'qty' ? TOP_SELLERS_QTY : TOP_SELLERS_REVENUE;

  return (
    <div>
      {/* Stat Cards */}
      <div className="cards-grid">
        <StatCard
          icon={<Icon name="trending" size={18} color="#2563eb" />}
          iconClass="blue"
          label="Monthly Sales"
          value={`KSh ${MONTHLY_SALES_TOTAL.toLocaleString()}`}
          sub="June 2024 · All orders"
        />
        <StatCard
          icon={<Icon name="cart" size={18} color="#16a34a" />}
          iconClass="green"
          label="Monthly Purchases"
          value={`KSh ${MONTHLY_PURCHASES_TOTAL.toLocaleString()}`}
          sub="June 2024 · All invoices"
        />
        <StatCard
          icon={<Icon name="dollar" size={18} color="#d97706" />}
          iconClass="amber"
          label="Sales – Current Shift"
          value={inShift ? `KSh ${SHIFT_SALES_TOTAL.toLocaleString()}` : 'KSh 0'}
          sub={inShift ? 'Shift active · 08:00–20:00' : 'No active shift'}
        />
        <StatCard
          icon={<Icon name="alert" size={18} color="#9333ea" />}
          iconClass="purple"
          label="Low Stock Alerts"
          value={LOW_STOCK_ITEMS.length}
          sub="Items below reorder level"
        />
      </div>

      {/* Daily Sales Table */}
      <div className="table-card" style={{ marginBottom: 16 }}>
        <div className="table-header">
          <span className="table-title">Daily Sales</span>
          <span className="badge blue">{DAILY_SALES.length} transactions</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Total</th>
                <th>Sales Channel</th>
                <th>Payment</th>
                <th>Stock After</th>
              </tr>
            </thead>
            <tbody>
              {DAILY_SALES.map(r => (
                <tr key={r.id}>
                  <td><span className="mono">{r.time}</span></td>
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
                  <td>{r.stock_after}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom 2-column grid */}
      <div className="dash-bottom-grid">
        {/* Top Sellers */}
        <div className="table-card">
          <div className="table-header">
            <span className="table-title">Top Sellers</span>
            <div className="metric-toggle">
              <button
                className={`toggle-btn ${sellerMetric === 'qty' ? 'active' : ''}`}
                onClick={() => setSellerMetric('qty')}
              >Qty</button>
              <button
                className={`toggle-btn ${sellerMetric === 'revenue' ? 'active' : ''}`}
                onClick={() => setSellerMetric('revenue')}
              >Revenue</button>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Sales</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {topSellers.map((p, i) => (
                <tr key={p.id}>
                  <td style={{ fontWeight: 500 }}>{i + 1}. {p.name}</td>
                  <td>{p.current_sales}</td>
                  <td style={{ fontWeight: 600 }}>KSh {(p.current_sales * p.price).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Low Stock */}
        <div className="table-card">
          <div className="table-header">
            <span className="table-title">Low Stock Items</span>
            <span className="badge red">{LOW_STOCK_ITEMS.length} items</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Stock</th>
                <th>Reorder At</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {LOW_STOCK_ITEMS.map(p => (
                <tr key={p.id}>
                  <td style={{ fontWeight: 500 }}>{p.name}</td>
                  <td style={{ fontWeight: 700, color: 'var(--red)' }}>{p.stock}</td>
                  <td>{p.reorder_level}</td>
                  <td><span className="badge red">Reorder</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
