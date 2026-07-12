import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'];

function DataDisplay({ dataset }) {
  if (!dataset) return null;

  return (
    <div className="glass panel animate-fade-in" style={{ height: '100%', overflowY: 'auto' }}>
      <h2 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '1.5rem' }}>{dataset.title}</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1rem' }}>
        {dataset.description}
      </p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {dataset.sections.map((sec, idx) => (
          <div key={idx} style={{ background: 'rgba(255,255,255,0.6)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', borderBottom: '3px solid var(--primary)', display: 'inline-block', paddingBottom: '0.4rem' }}>
              {sec.title}
            </h3>
            
            {sec.type === 'stats' && (
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                {sec.data.map((stat, i) => (
                  <div key={i} style={{ flex: '1 1 200px', background: 'white', padding: '1.5rem', borderRadius: '12px', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: '500' }}>{stat.label}</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: 'var(--primary)' }}>{stat.value}</div>
                  </div>
                ))}
              </div>
            )}

            {sec.type === 'table' && (
              <div className="data-table-wrapper" style={{ boxShadow: 'var(--shadow-sm)', borderRadius: '12px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white' }}>
                  <thead style={{ background: '#F3F4F6' }}>
                    <tr>
                      {sec.columns.map((col, i) => <th key={i} style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '2px solid #E5E7EB' }}>{col}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {sec.data.map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #E5E7EB' }}>
                        {Object.values(row).map((val, j) => <td key={j} style={{ padding: '16px', color: '#4B5563' }}>{val}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {sec.type === 'text' && (
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', lineHeight: '1.8', color: '#1F2937', boxShadow: 'var(--shadow-sm)', fontSize: '1.05rem', borderLeft: '4px solid var(--primary)' }}>
                {sec.content}
              </div>
            )}

            {sec.type === 'chart' && sec.chartType === 'bar' && (
              <div style={{ width: '100%', height: 350, background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sec.data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{fill: '#6B7280'}} />
                    <YAxis yAxisId="left" orientation="left" stroke="#4F46E5" />
                    <YAxis yAxisId="right" orientation="right" stroke="#10B981" />
                    <Tooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} contentStyle={{borderRadius: '8px'}} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="rate" name="정답률 (%)" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="right" dataKey="time" name="평균 풀이 시간 (초)" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {sec.type === 'chart' && sec.chartType === 'pie' && (
              <div style={{ width: '100%', height: 350, background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={sec.data} cx="50%" cy="50%" innerRadius={80} outerRadius={120} paddingAngle={5} dataKey="value">
                      {sec.data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={{borderRadius: '8px'}} />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}

            {sec.type === 'chat' && (
              <div style={{ background: '#F3F4F6', padding: '2rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '1.5rem', maxHeight: '500px', overflowY: 'auto' }}>
                {sec.data.map((chat, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: chat.sender === 'student' ? 'flex-end' : 'flex-start' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', flexDirection: chat.sender === 'student' ? 'row-reverse' : 'row' }}>
                      <div style={{ 
                        width: '40px', height: '40px', borderRadius: '50%', background: chat.sender === 'student' ? '#4F46E5' : '#10B981', 
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '0.8rem', flexShrink: 0 
                      }}>
                        {chat.sender === 'student' ? '학생' : 'AI'}
                      </div>
                      <div style={{ 
                        background: chat.sender === 'student' ? '#E0E7FF' : 'white', 
                        padding: '1rem 1.2rem', 
                        borderRadius: chat.sender === 'student' ? '20px 20px 0px 20px' : '20px 20px 20px 0px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                        maxWidth: '80%',
                        color: '#1F2937',
                        lineHeight: '1.5'
                      }}>
                        <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginBottom: '0.3rem', textAlign: chat.sender === 'student' ? 'right' : 'left' }}>{chat.time}</div>
                        {chat.message}
                      </div>
                    </div>
                    {chat.action && (
                      <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#EF4444', background: '#FEE2E2', padding: '0.4rem 0.8rem', borderRadius: '6px', marginRight: chat.sender === 'student' ? '3rem' : 0, marginLeft: chat.sender === 'ai' ? '3rem' : 0 }}>
                        <span style={{ fontWeight: 'bold' }}>⚠️ 행동 로그:</span> {chat.action}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DataDisplay;
