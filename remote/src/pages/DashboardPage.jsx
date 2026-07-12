import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, CheckCircle2 } from 'lucide-react';
import { subjectsData } from '../data/mockData';
import DataDisplay from '../components/DataDisplay';
import DikwForm from '../components/DikwForm';

function DashboardPage({ userInfo }) {
  const navigate = useNavigate();
  const subjectData = subjectsData[userInfo.subject];
  const datasets = subjectData.datasets;
  
  const [activeTab, setActiveTab] = useState(0);
  const [formValues, setFormValues] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  const handleFormChange = (datasetId, name, value) => {
    setFormValues(prev => ({
      ...prev,
      [datasetId]: {
        ...prev[datasetId],
        [name]: value
      }
    }));
  };

  const handleComplete = () => {
    setIsCompleted(true);
    alert('모든 실습이 완료되었습니다! 훌륭한 인사이트입니다.');
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="container animate-fade-in">
      <header className="dashboard-header">
        <h1>{subjectData.name} 학습 데이터 분석</h1>
        <div className="user-info">
          <span>{userInfo.school} {userInfo.name} 선생님</span>
          <button onClick={handleLogout} className="btn" style={{ padding: '8px', background: 'transparent', color: 'var(--text-muted)' }}>
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <div className="tabs">
        {datasets.map((ds, idx) => (
          <button
            key={ds.id}
            className={`tab ${activeTab === idx ? 'active' : ''}`}
            onClick={() => setActiveTab(idx)}
          >
            데이터 세트 {idx + 1}
          </button>
        ))}
      </div>

      <div className="dashboard-content">
        <DataDisplay dataset={datasets[activeTab]} />
        <DikwForm 
          datasetId={datasets[activeTab].id} 
          values={formValues[datasets[activeTab].id]} 
          onChange={handleFormChange} 
        />
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <button 
          onClick={handleComplete} 
          className="btn btn-primary" 
          style={{ width: '100%', maxWidth: '400px', display: 'inline-flex', gap: '0.5rem' }}
        >
          <CheckCircle2 size={20} /> 실습 완료 및 저장
        </button>
      </div>
      
      {isCompleted && (
        <div style={{ marginTop: '2rem', padding: '1rem', background: '#D1FAE5', color: '#065F46', borderRadius: '8px', textAlign: 'center' }}>
          수고하셨습니다. 데이터에 기반한 선생님의 따뜻한 교육적 처방이 학생들의 큰 성장을 이끌 것입니다!
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
