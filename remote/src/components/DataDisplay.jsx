import React from 'react';

function DataDisplay({ dataset }) {
  if (!dataset) return null;

  return (
    <div className="glass panel animate-fade-in" style={{ height: '100%' }}>
      <h2>1. Data (데이터 확인)</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>
        {dataset.description}
      </p>
      
      <div className="data-table-wrapper">
        <table>
          <thead>
            <tr>
              {dataset.columns.map((col, idx) => (
                <th key={idx}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataset.data.map((row, idx) => (
              <tr key={idx}>
                {Object.values(row).map((val, i) => (
                  <td key={i}>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataDisplay;
