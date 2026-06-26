import { useState } from 'react';
import Icon from '../components/Icon';
import { PRODUCTS } from '../data/mockData';

export default function Products() {
  const [q, setQ] = useState('');
  const filtered = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <span className="page-title">Products</span>
        <button className="btn btn-primary">
          <Icon name="plus" size={14} color="#fff" /> Add Product
        </button>
      </div>

      <div className="search-bar">
        <input
          className="search-input"
          placeholder="Search products…"
          value={q}
          onChange={e => setQ(e.target.value)}
        />
      </div>

      <div className="table-card">
        <div className="table-header">
          <span className="table-title">All Products</span>
          <span className="table-badge">{filtered.length} items</span>
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>#</th><th>Name</th><th>Category</th><th>Department</th>
                <th>Price</th><th>Current Stock</th><th>Current Sales</th><th>Reorder Level</th>
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
    </div>
  );
}
