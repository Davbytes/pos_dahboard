import Icon from '../components/Icon';
import { PURCHASES } from '../data/mockData';

export default function Purchases() {
  return (
    <div>
      <div className="page-header">
        <span className="page-title">Purchases</span>
        <button className="btn btn-primary">
          <Icon name="plus" size={14} color="#fff" /> New Purchase
        </button>
      </div>

      <div className="table-card">
        <div className="table-header">
          <span className="table-title">Purchase Records</span>
          <span className="table-badge">{PURCHASES.length} invoices</span>
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Invoice</th><th>Supplier</th><th>Received By</th>
                <th>Invoice Total</th><th>VAT Type</th><th>Total VAT</th><th>Grand Total</th><th>Date</th>
              </tr>
            </thead>
            <tbody>
              {PURCHASES.map(p => (
                <tr key={p.id}>
                  <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{p.invoice}</td>
                  <td style={{ fontWeight: 500 }}>{p.supplier}</td>
                  <td>{p.received_by}</td>
                  <td>KSh {p.invoice_total.toLocaleString()}</td>
                  <td>
                    <span className={`badge ${p.vat_type === 'Inclusive' ? 'green' : 'amber'}`}>
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
    </div>
  );
}
