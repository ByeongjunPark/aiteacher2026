import React from 'react';

function DataDisplay({ dataset }) {
  if (!dataset) return null;

  return (
    <div className="glass panel animate-fade-in" style={{ height: '100%', overflowY: 'auto' }}>
      <h2 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>{dataset.title}</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>
        {dataset.description}
      </p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {dataset.sections.map((sec, idx) => (
          <div key={idx} style={{ background: 'rgba(255,255,255,0.4)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', borderBottom: '2px solid var(--primary)', display: 'inline-block', paddingBottom: '0.2rem' }}>
              {sec.title}
            </h3>
            
            {sec.type === 'stats' && (
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {sec.data.map((stat, i) => (
                  <div key={i} style={{ flex: '1 1 120px', background: 'white', padding: '1rem', borderRadius: '8px', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{stat.label}</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-main)' }}>{stat.value}</div>
                  </div>
                ))}
              </div>
            )}

            {sec.type === 'table' && (
              <div className="data-table-wrapper" style={{ boxShadow: 'var(--shadow-sm)' }}>
                <table>
                  <thead>
                    <tr>
                      {sec.columns.map((col, i) => <th key={i}>{col}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {sec.data.map((row, i) => (
                      <tr key={i}>
                        {Object.values(row).map((val, j) => <td key={j}>{val}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {sec.type === 'text' && (
              <div style={{ background: 'white', padding: '1.25rem', borderRadius: '8px', lineHeight: '1.6', color: 'var(--text-main)', boxShadow: 'var(--shadow-sm)' }}>
                {sec.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DataDisplay;
