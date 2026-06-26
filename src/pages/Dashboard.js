import Icon from '../components/Icon';
import {
  DAILY_SALES, TOP_SELLERS, LOW_STOCK,
  TOTAL_MONTHLY_SALES, TOTAL_MONTHLY_PURCHASES, SHIFT_SALES,
} from '../data/mockData';

function fmt(n) { return `KSh ${n.toLocaleString()}`; }

export default function Dashboard() {
  const hour = new Date().getHours();
  const inShift = hour >= 8 && hour < 20;

  return (
    <div>
      {/* ── CARDS ── */}
      <div className="cards-grid">
        <div className="card">
          <div className="card-icon blue"><Icon name="trending" size={18} color="#2563eb" /></div>
          <div className="card-label">Monthly Sales</div>
          <div className="card-value">{fmt(TOTAL_MONTHLY_SALES)}</div>
          <div className="card-sub">June 2024 · All orders</div>
        </div>

        <div className="card">
          <div className="card-icon green"><Icon name="cart" size={18} color="#16a34a" /></div>
          <div className="card-label">Monthly Purchases</div>
          <div className="card-value">{fmt(TOTAL_MONTHLY_PURCHASES)}</div>
          <div className="card-sub">June 2024 · All invoices</div>
        </div>

        <div className="card">
          <div className="card-icon amber"><Icon name="dollar" size={18} color="#d97706" /></div>
          <div className="card-label">Sales – Current Shift</div>
          <div className="card-value">{inShift ? fmt(SHIFT_SALES) : 'KSh 0'}</div>
          <div className="card-sub">{inShift ? 'Shift active · 08:00–20:00' : 'No active shift'}</div>
        </div>

        <div className="card">
          <div className="card-icon purple"><Icon name="alert" size={18} color="#9333ea" /></div>
          <div className="card-label">Low Stock Alerts</div>
          <div className="card-value">{LOW_STOCK.length}</div>
          <div className="card-sub">Items below reorder level</div>
        </div>
      </div>

      {/* ── DAILY SALES ── */}
      <div className="tables-grid">
        <div className="table-card full">
          <div className="table-header">
            <span className="table-title">Daily Sales</span>
            <span className="table-badge">{DAILY_SALES.length} transactions</span>
          </div>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Time</th><th>Product</th><th>Qty</th>
                  <th>Unit Price</th><th>Total</th>
                  <th>Sales Channel</th><th>Payment</th><th>Stock After</th>
                </tr>
              </thead>
              <tbody>
                {DAILY_SALES.map((r, i) => (
                  <tr key={i}>
                    <td><span style={{ fontFamily: 'monospace', fontSize: 12 }}>{r.time}</span></td>
                    <td style={{ fontWeight: 500 }}>{r.product}</td>
                    <td>{r.qty}</td>
                    <td>{fmt(r.unit_price)}</td>
                    <td style={{ fontWeight: 600 }}>{fmt(r.total)}</td>
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

        {/* ── TOP SELLERS ── */}
        <div className="table-card">
          <div className="table-header">
            <span className="table-title">Top Sellers</span>
            <span className="table-badge">By quantity</span>
          </div>
          <table>
            <thead><tr><th>#</th><th>Product</th><th>Sales</th><th>Revenue</th></tr></thead>
            <tbody>
              {TOP_SELLERS.map((p, i) => (
                <tr key={p.id}>
                  <td style={{ color: 'var(--gray-400)', fontWeight: 600 }}>{i + 1}</td>
                  <td style={{ fontWeight: 500 }}>{p.name}</td>
                  <td>{p.current_sales}</td>
                  <td style={{ fontWeight: 600 }}>{fmt(p.current_sales * p.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── LOW STOCK ── */}
        <div className="table-card">
          <div className="table-header">
            <span className="table-title">Low Stock Items</span>
            <span className="table-badge" style={{ background: '#fee2e2', color: '#dc2626' }}>
              {LOW_STOCK.length} items
            </span>
          </div>
          <table>
            <thead><tr><th>Product</th><th>Stock</th><th>Reorder At</th><th>Status</th></tr></thead>
            <tbody>
              {LOW_STOCK.map(p => (
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
