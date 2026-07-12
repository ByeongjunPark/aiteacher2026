import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Image as ImageIcon, Download } from 'lucide-react';
import { subjectsData } from '../data/mockData';
import DataDisplay from '../components/DataDisplay';
import DikwForm from '../components/DikwForm';
import html2canvas from 'html2canvas';

function DashboardPage({ userInfo }) {
  const navigate = useNavigate();
  const subjectData = subjectsData[userInfo.subject];
  const datasets = subjectData.datasets;
  
  const [activeTab, setActiveTab] = useState(0);
  const [formValues, setFormValues] = useState({});
  const [isExporting, setIsExporting] = useState(false);
  const captureRef = useRef(null);

  const handleFormChange = (datasetId, name, value) => {
    setFormValues(prev => ({
      ...prev,
      [datasetId]: {
        ...prev[datasetId],
        [name]: value
      }
    }));
  };

  const handleExportImage = async () => {
    if (!captureRef.current) return;
    try {
      setIsExporting(true);
      const canvas = await html2canvas(captureRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        windowWidth: captureRef.current.scrollWidth,
        windowHeight: captureRef.current.scrollHeight
      });
      
      const image = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.href = image;
      link.download = `DIKW_분석결과_${userInfo.name}선생님_${datasets[activeTab].title}.png`;
      link.click();
    } catch (error) {
      console.error("이미지 저장 실패:", error);
      alert('이미지 저장 중 오류가 발생했습니다.');
    } finally {
      setIsExporting(false);
    }
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
          <button onClick={handleLogout} className="btn" style={{ padding: '8px', background: 'transparent', color: 'var(--text-muted)' }} title="처음으로">
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
            {ds.title}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <button 
          onClick={handleExportImage} 
          disabled={isExporting}
          className="btn" 
          style={{ 
            backgroundColor: '#10B981', 
            color: 'white', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          {isExporting ? <Download size={18} /> : <ImageIcon size={18} />}
          {isExporting ? '저장 중...' : '결과물을 이미지로 저장 (패들렛 공유용)'}
        </button>
      </div>

      <div ref={captureRef} style={{ padding: '1rem', background: 'var(--bg-gradient-start)', borderRadius: '16px' }}>
        <div style={{ marginBottom: '1rem', textAlign: 'center', color: 'var(--primary)', fontWeight: 'bold' }}>
          [{userInfo.school} {userInfo.name} 선생님의 분석 리포트]
        </div>
        <div className="dashboard-content">
          <DataDisplay dataset={datasets[activeTab]} />
          <DikwForm 
            datasetId={datasets[activeTab].id} 
            values={formValues[datasets[activeTab].id]} 
            onChange={handleFormChange} 
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
