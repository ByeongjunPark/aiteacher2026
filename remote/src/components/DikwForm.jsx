import React from 'react';
import { Info, Brain, Lightbulb } from 'lucide-react';

function DikwForm({ datasetId, values, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(datasetId, name, value);
  };

  return (
    <div className="glass panel animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h2>2. I-K-W 실습 (분석 및 처방)</h2>
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
        <div className="dikw-section">
          <h3><Info size={18} /> Information (정보)</h3>
          <p className="description">데이터에서 관찰할 수 있는 사실이나 요약된 정보는 무엇인가요?</p>
          <textarea 
            name="information" 
            placeholder="예: 학생 A는 질문 빈도가 낮지만 성취도는 높다."
            value={values?.information || ''}
            onChange={handleChange}
          />
        </div>
        
        <div className="dikw-section">
          <h3><Brain size={18} /> Knowledge (지식)</h3>
          <p className="description">이러한 정보들이 모여 만들어내는 패턴이나 원인은 무엇일까요?</p>
          <textarea 
            name="knowledge" 
            placeholder="예: 질문 빈도보다는 개별적인 학습 시간 확보가 성취도에 더 큰 영향을 미치고 있을 수 있다."
            value={values?.knowledge || ''}
            onChange={handleChange}
          />
        </div>
        
        <div className="dikw-section">
          <h3><Lightbulb size={18} /> Wisdom (지혜)</h3>
          <p className="description">이 지식을 바탕으로 학생의 성장을 돕기 위해 어떤 피드백이나 처방을 제공하시겠습니까?</p>
          <textarea 
            name="wisdom" 
            placeholder="예: 질문을 어려워하는 학생에게는 익명 질문함을 활용하도록 안내하고, 자기주도 학습법을 점검해준다."
            value={values?.wisdom || ''}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

export default DikwForm;
