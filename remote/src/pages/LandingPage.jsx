import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { subjectsData } from '../data/mockData';

function LandingPage({ onStart }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: 'social',
    school: '',
    name: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.school && formData.name) {
      onStart(formData);
      navigate('/dashboard');
    } else {
      alert('소속 학교와 이름을 모두 입력해주세요.');
    }
  };

  return (
    <div className="landing-container">
      <div className="glass landing-card animate-fade-in">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: 'var(--primary)' }}>
          <BookOpen size={48} />
        </div>
        <h1>DIKW 학습분석 대시보드</h1>
        <p>학습 데이터를 이해하고, 지식을 발견하며, 지혜를 발휘해보세요.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="subject">교과 선택</label>
            <select 
              id="subject" 
              name="subject" 
              value={formData.subject} 
              onChange={handleChange}
            >
              {Object.entries(subjectsData).map(([key, data]) => (
                <option key={key} value={key}>{data.name}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="school">소속 교</label>
            <input 
              type="text" 
              id="school" 
              name="school" 
              placeholder="예: 대한중학교" 
              value={formData.school}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="name">이름</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              placeholder="홍길동" 
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            실습 시작하기
          </button>
        </form>
      </div>
    </div>
  );
}

export default LandingPage;
