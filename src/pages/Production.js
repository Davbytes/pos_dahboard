import Icon from '../components/Icon';
import { PRODUCTIONS } from '../data/mockData';

export default function Production({ onGoToPurchases }) {
  return (
    <div>
      <div className="page-header">
        <span className="page-title">Production</span>
        <div className="page-actions">
          <button className="btn btn-outline" onClick={onGoToPurchases}>
            <Icon name="cart" size={14} color="#2563eb" /> Purchases
          </button>
          <button className="btn btn-primary">
            <Icon name="plus" size={14} color="#fff" /> New Production
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        {[
          ['Total Productions',   PRODUCTIONS.length],
          ['Active Products',     PRODUCTIONS.length],
          ['Stock Products Used', PRODUCTIONS.length],
        ].map(([label, value]) => (
          <div className="stat-mini" key={label}>
            <div className="stat-mini-label">{label}</div>
            <div className="stat-mini-value">{value}</div>
          </div>
        ))}
      </div>

      <div className="table-card">
        <div className="table-header">
          <span className="table-title">Production Records</span>
          <span className="table-badge">{PRODUCTIONS.length} records</span>
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>#</th><th>Product (Output)</th><th>Stock Product (Input)</th>
                <th>Conversion Factor</th><th>Used Stock</th><th>Current Stock</th>
              </tr>
            </thead>
            <tbody>
              {PRODUCTIONS.map((p, i) => (
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
    </div>
  );
}
