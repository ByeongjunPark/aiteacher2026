const fs = require('fs');

const students = [
  '김민준', '이서연', '박도윤', '최지아', '정우진', '강하윤', '조민서', '윤서준', '장시우', '임수아',
  '한예은', '오지훈', '서지유', '신건우', '권하은', '황준서', '안윤아', '송현우', '유지우', '홍채원'
];

function generate20Students(subject) {
  return students.map((name, i) => {
    let score, time, qCount, note;
    if (subject === 'social') {
      score = Math.floor(Math.random() * 60) + 40; // 40~100
      time = Math.floor(Math.random() * 30) + 10;
      qCount = Math.floor(Math.random() * 20);
      if (name === '오지훈') { score = 40; qCount = 62; time = 12; note = '프롬프트 의존증 심각'; }
      else if (score > 90) note = '주도적 학습';
      else if (time < 15) note = '찍기 의심';
      else note = '보통';
    } else if (subject === 'science') {
      score = Math.floor(Math.random() * 50) + 50;
      time = Math.floor(Math.random() * 40) + 20;
      qCount = Math.floor(Math.random() * 15);
      note = score < 60 ? '가상실험 조작 미숙' : '우수';
    } else if (subject === 'arts') {
      score = ['A', 'B', 'C'][Math.floor(Math.random() * 3)];
      time = Math.floor(Math.random() * 10) + 1; // 연습시간
      qCount = Math.floor(Math.random() * 5);
      note = time > 8 ? '성실함' : '연습 부족';
    } else if (subject === 'tech') {
      score = Math.floor(Math.random() * 50) + 50;
      time = Math.floor(Math.random() * 3) + 1; // 제작 일수
      qCount = Math.floor(Math.random() * 10);
      note = score > 85 ? '안전수칙 완벽준수' : '마감 지연';
    } else { // special
      score = Math.floor(Math.random() * 80) + 20; // 달성률
      time = Math.floor(Math.random() * 15) + 5; // 집중시간
      qCount = Math.floor(Math.random() * 10); // 도전적행동
      note = qCount > 7 ? '집중 지원 필요' : '안정적';
    }
    return { name, score, time, qCount, note };
  });
}

const mockDataStr = `export const subjectsData = {
  social: {
    name: '사회과',
    datasets: [
      {
        id: 'class',
        title: '학급 전체 데이터 (AI 코스웨어 - 시장 경제 단원)',
        description: '사회과 2학년 3반(총 20명)이 AI 디지털 교과서로 [시장 경제와 가격] 단원을 학습하며 생성된 총체적 데이터입니다.',
        sections: [
          {
            title: '학급 전체 학습 지표 요약',
            type: 'stats',
            data: [
              { label: '단원 진도율 (평균)', value: '100%' },
              { label: '문항당 평균 체류 시간', value: '14초 (권장 45초)' },
              { label: 'AI 챗봇 질문 중 DOK 1~2 비율', value: '85%' },
            ]
          },
          {
            title: '학생 20명 개별 현황 모니터링',
            type: 'table',
            columns: ['이름', '단원평가 점수', '문항당 평균시간(초)', 'AI질문 횟수', '특이사항'],
            data: ${JSON.stringify(generate20Students('social'))}.map(s => ({ 
              name: s.name, score: s.score + '점', time: s.time + '초', q: s.qCount + '회', note: s.note 
            }))
          },
          {
            title: '내용 요소별 정답률 및 평균 풀이 시간',
            type: 'chart',
            chartType: 'bar',
            data: [
              { name: '수요와 공급', rate: 95, time: 10 },
              { name: '균형 가격 결정', rate: 75, time: 18 },
              { name: '대체재 추론', rate: 35, time: 12 },
              { name: '인플레이션 해결', rate: 20, time: 22 }
            ]
          },
          {
            title: '학급 전체 AI 챗봇 질문 의도 분석 (총 450건)',
            type: 'chart',
            chartType: 'pie',
            data: [
              { name: 'DOK 0~1 (단순 정답/정의 요구)', value: 315 },
              { name: 'DOK 2 (절차/방법 확인)', value: 90 },
              { name: 'DOK 3~4 (인과관계/비판적 추론)', value: 45 }
            ]
          },
          {
            title: '동영상 클립 시청 구간별 이탈률',
            type: 'chart',
            chartType: 'bar',
            data: [
              { name: '0~20% 구간', rate: 5, time: 100 },
              { name: '20~40% 구간', rate: 15, time: 95 },
              { name: '40~60% 구간', rate: 65, time: 80 },
              { name: '60~80% 구간', rate: 85, time: 35 },
              { name: '80~100% 구간', rate: 95, time: 15 }
            ]
          }
        ]
      },
      {
        id: 'student',
        title: '학생 단위 데이터 (오지훈 학생 심층 로그)',
        description: '학급 내에서 챗봇 사용 빈도는 가장 높으나, 학업 성취도가 저조한 "프롬프트 의존증(Prompt Dependency)" 의심 학생입니다.',
        sections: [
          {
            title: '지훈이의 인지/행동 요약',
            type: 'stats',
            data: [
              { label: '단원 평가 점수', value: '40점 (하위 10%)' },
              { label: 'AI 챗봇 대화 시도 횟수', value: '62회 (반 평균 22회)' },
              { label: '스스로 해결 비율', value: '5% (95% 힌트 의존)' },
            ]
          },
          {
            title: '실시간 AI 챗봇 대화 내역 딥다이브 (10:15 ~ 10:18)',
            type: 'chat',
            data: [
              { sender: 'student', time: '10:15', message: '수요 곡선 그리는 법 좀', action: '3초 대기 (읽지 않고 다음 질문)' },
              { sender: 'ai', time: '10:15', message: '가격과 수요량의 관계를 나타낸 표를 보고 점을 찍어볼까요?' },
              { sender: 'student', time: '10:16', message: '아니 그냥 이 문제 답이 뭐야?', action: '문항과 챗봇 화면 2번 번갈아봄' },
              { sender: 'ai', time: '10:16', message: '정답을 직접 알려드릴 수는 없지만, 힌트를 줄게요. 대체재인 콜라 가격이 오르면...' },
              { sender: 'student', time: '10:17', message: '아 진짜 모르겠다고 정답 3번 맞아?', action: '짜증 내며 4번 선택 (오답)' },
              { sender: 'ai', time: '10:17', message: '한 번 더 생각해보세요. 콜라가 비싸지면 사이다를 찾는 사람이...' },
              { sender: 'student', time: '10:18', message: '해설 보기 띄워줘', action: '해설 창 오픈 후 2.5초 만에 닫고 2번 선택(정답 처리됨)' },
              { sender: 'ai', time: '10:18', message: '해설 창을 엽니다. 꼭 원리를 이해하고 넘어가세요.' }
            ]
          },
          {
            title: '단원별 AI 챗봇 질문 유형(DOK) 비율',
            type: 'chart',
            chartType: 'pie',
            data: [
              { name: '정답/해설 요구 (DOK 0)', value: 80 },
              { name: '단어 뜻 질문 (DOK 1)', value: 15 },
              { name: '개념 질문 (DOK 2)', value: 5 },
              { name: '심층 질문 (DOK 3~4)', value: 0 }
            ]
          },
          {
            title: '문항별 체류 시간 vs 정답 여부',
            type: 'chart',
            chartType: 'bar',
            data: [
              { name: '문항1 (단순지식)', rate: 100, time: 5 },
              { name: '문항2 (단순지식)', rate: 100, time: 4 },
              { name: '문항3 (분석)', rate: 0, time: 8 },
              { name: '문항4 (추론)', rate: 0, time: 6 },
              { name: '문항5 (적용)', rate: 0, time: 3 }
            ]
          },
          {
            title: '주간 학습 패턴 (로그인 및 과제 수행)',
            type: 'table',
            columns: ['요일', '로그인 횟수', '총 학습 시간', '특이사항'],
            data: [
              { day: '월', login: '1회', time: '15분', note: '과제만 빠르게 클릭' },
              { day: '화', login: '0회', time: '0분', note: '-' },
              { day: '수', login: '2회', time: '20분', note: '챗봇 질문 30회 폭주' },
              { day: '목', login: '0회', time: '0분', note: '-' },
              { day: '금', login: '1회', time: '5분', note: '마감 5분 전 찍기 제출' }
            ]
          }
        ]
      }
    ]
  },
  science: {
    name: '과학과',
    datasets: [
      {
        id: 'class',
        title: '학급 전체 데이터 (가상 실험실 활용)',
        description: '과학과 2학년 3반(20명)의 물리 가상 실험(역학적 에너지 보존) 단원 학습 로그입니다.',
        sections: [
          {
            title: '실험 참여 및 이론 성취도',
            type: 'stats',
            data: [
              { label: '이론 평가 평균', value: '72.0점' },
              { label: '실험 보고서 평균', value: '88.5점' },
              { label: '가상실험 리셋 횟수', value: '3.4회' },
            ]
          },
          {
            title: '학생 20명 실험실 활동 모니터링',
            type: 'table',
            columns: ['이름', '이론 점수', '실험 소요시간', '오류발생 횟수', '특이사항'],
            data: ${JSON.stringify(generate20Students('science'))}.map(s => ({ 
              name: s.name, score: s.score + '점', time: s.time + '분', q: s.qCount + '회', note: s.note 
            }))
          },
          {
            title: '실험 단계별 소요 시간 및 병목 구간',
            type: 'chart',
            chartType: 'bar',
            data: [
              { name: '가설 설정', rate: 100, time: 5 },
              { name: '변인 통제', rate: 60, time: 18 },
              { name: '데이터 측정', rate: 85, time: 22 },
              { name: '결과 그래프 해석', rate: 45, time: 25 }
            ]
          },
          {
            title: '가상실험 내 챗봇 질문 유형',
            type: 'chart',
            chartType: 'pie',
            data: [
              { name: '조작 방법 문의', value: 50 },
              { name: '현상 원인 문의', value: 30 },
              { name: '계산 오류 확인', value: 20 }
            ]
          },
          {
            title: 'AI 튜터 종합 피드백',
            type: 'text',
            content: '대부분의 학생이 실험 시뮬레이션 조작에는 능숙하나, 측정된 데이터를 바탕으로 역학적 에너지 보존 법칙을 수학적으로 증명(결과 해석)하는 단계에서 심각한 병목 현상이 관찰됩니다.'
          }
        ]
      },
      {
        id: 'student',
        title: '학생 단위 데이터 (이서연 학생 로그)',
        description: '실험 조작은 완벽하나 이론 평가에서 고전하는 "실천 우위형" 학생입니다.',
        sections: [
          {
            title: '이서연 학생 요약',
            type: 'stats',
            data: [
              { label: '실험 성취도', value: '98점' },
              { label: '이론 성취도', value: '45점' },
              { label: '변인 통제 정확도', value: '100%' },
            ]
          },
          {
            title: '가상 실험실 조작 로그 (14:20 ~ 14:35)',
            type: 'chat',
            data: [
              { sender: 'student', time: '14:20', message: '(마찰력을 0으로 설정함)', action: '정확한 변인 통제' },
              { sender: 'ai', time: '14:21', message: '훌륭해요! 이제 물체를 낙하 시켜보세요.' },
              { sender: 'student', time: '14:25', message: '(물체 질량을 바꿔가며 5회 반복 측정)', action: '데이터 수집 태도 우수' },
              { sender: 'ai', time: '14:26', message: '데이터가 모였습니다. 이제 운동 에너지 공식을 이용해 계산해볼까요?' },
              { sender: 'student', time: '14:30', message: '수식 계산 너무 어려워요 어떻게 해요?', action: '계산 단계에서 5분간 정체' },
              { sender: 'ai', time: '14:31', message: '질량과 속도의 제곱을 곱하고 1/2을 해보세요.' }
            ]
          },
          {
            title: '문항 유형별 정답률 (이론평가)',
            type: 'chart',
            chartType: 'pie',
            data: [
              { name: '현상 이해 (정답)', value: 80 },
              { name: '계산 문제 (오답)', value: 15 },
              { name: '개념 암기 (오답)', value: 5 }
            ]
          },
          {
            title: '실험실 체류 시간 분포',
            type: 'chart',
            chartType: 'bar',
            data: [
              { name: '가설 설정', rate: 100, time: 2 },
              { name: '변인 통제', rate: 100, time: 3 },
              { name: '측정 반복', rate: 100, time: 15 },
              { name: '결과 계산', rate: 20, time: 10 }
            ]
          },
          {
            title: '주간 과학 과제 로그',
            type: 'table',
            columns: ['과제명', '제출 여부', '소요 시간'],
            data: [
              { day: '영상 시청', login: '완료', time: '15분' },
              { day: '가상 실험', login: '완료', time: '30분' },
              { day: '수식 계산 문제', login: '미제출', time: '-' }
            ]
          }
        ]
      }
    ]
  },
  arts: {
    name: '예체능과',
    datasets: [
      {
        id: 'class',
        title: '학급 전체 실기 데이터 (동작 분석 AI)',
        description: '체육과 2학년 3반(20명)의 뜀틀 넘기 동작을 AI 카메라로 분석한 데이터입니다.',
        sections: [
          {
            title: '학급 전체 뜀틀 실기 지표',
            type: 'stats',
            data: [
              { label: '목표 자세 도달률', value: '65%' },
              { label: '평균 부상 위험도', value: '낮음' },
              { label: '평균 연습 횟수', value: '12회' },
            ]
          },
          {
            title: '학생 20명 실기 및 피드백 현황',
            type: 'table',
            columns: ['이름', '실기 등급', '주간 연습시간(시간)', '동료평가 건수', '특이사항'],
            data: ${JSON.stringify(generate20Students('arts'))}.map(s => ({ 
              name: s.name, score: s.score, time: s.time + '시간', q: s.qCount + '건', note: s.note 
            }))
          },
          {
            title: '동작 구간별 AI 감점 요인 분포',
            type: 'chart',
            chartType: 'pie',
            data: [
              { name: '도약 (발구름 불일치)', value: 45 },
              { name: '공중 자세 (다리 벌림 부족)', value: 30 },
              { name: '착지 (중심 무너짐)', value: 25 }
            ]
          },
          {
            title: '연습 횟수와 자세 정확도 상관관계',
            type: 'chart',
            chartType: 'bar',
            data: [
              { name: '1~3회', rate: 40, time: 3 },
              { name: '4~6회', rate: 55, time: 6 },
              { name: '7~10회', rate: 75, time: 9 },
              { name: '11회 이상', rate: 85, time: 12 }
            ]
          },
          {
            title: '종합 안전 알림',
            type: 'text',
            content: '도약 구간에서 발구름 타이밍을 맞추지 못해 무릎에 충격이 가해지는 학생이 9명(45%) 발견되었습니다. 착지 매트의 추가 보강 및 도약판 위치 재조정이 필요합니다.'
          }
        ]
      },
      {
        id: 'student',
        title: '학생 단위 심층 실기 (장시우 학생)',
        description: '초기 실력은 부족했으나 성실한 연습으로 극복한 장시우 학생의 로그입니다.',
        sections: [
          {
            title: '시우의 실기 향상 지표',
            type: 'stats',
            data: [
              { label: '초기 평가', value: 'C등급' },
              { label: '현재 평가', value: 'A등급' },
              { label: '누적 연습 횟수', value: '48회 (반 1위)' },
            ]
          },
          {
            title: 'AI 코치 피드백 대화 내역',
            type: 'chat',
            data: [
              { sender: 'ai', time: '1주차', message: '시우 학생, 도약 시 시선이 바닥을 향하고 있어요.' },
              { sender: 'student', time: '1주차', message: '무서워서 자꾸 아래를 보게 돼요.', action: '영상 3회 반복 재생' },
              { sender: 'ai', time: '2주차', message: '오늘은 뜀틀 끝부분을 보며 달려볼까요?' },
              { sender: 'student', time: '2주차', message: '아, 시선을 드니까 도약판 밟기가 수월해요!', action: '연습 15회 집중 수행' },
              { sender: 'ai', time: '4주차', message: '완벽한 착지입니다! 자세 점수 95점.' }
            ]
          },
          {
            title: '주차별 자세 정확도 변화',
            type: 'chart',
            chartType: 'bar',
            data: [
              { name: '1주차', rate: 45, time: 10 },
              { name: '2주차', rate: 55, time: 15 },
              { name: '3주차', rate: 75, time: 12 },
              { name: '4주차', rate: 95, time: 11 }
            ]
          },
          {
            title: '동료 평가 키워드 (워드클라우드 대용)',
            type: 'chart',
            chartType: 'pie',
            data: [
              { name: '노력형', value: 40 },
              { name: '발전함', value: 35 },
              { name: '자세좋음', value: 25 }
            ]
          },
          {
            title: '자기 성찰 일지',
            type: 'table',
            columns: ['주차', '학생 기록내용', 'AI 감성분석'],
            data: [
              { day: '1주', login: '뜀틀이 너무 높고 무섭다.', time: '불안/공포' },
              { day: '2주', login: '시선을 고치니 조금 낫다.', time: '안도감' },
              { day: '4주', login: '이제 A등급이다! 성취감이 크다.', time: '기쁨/자신감' }
            ]
          }
        ]
      }
    ]
  },
  tech: {
    name: '기술가정과',
    datasets: [
      {
        id: 'class',
        title: '학급 전체 프로젝트 데이터 (스마트홈 설계)',
        description: '기술과 2학년 3반(20명) 스마트홈 조감도 설계 프로젝트의 진행 현황입니다.',
        sections: [
          {
            title: '프로젝트 관리 지표',
            type: 'stats',
            data: [
              { label: '기한 내 제출률', value: '85%' },
              { label: '협업 툴(온라인) 참여도', value: '매우 높음' },
              { label: '설계 규격 오류 건수', value: '8건' },
            ]
          },
          {
            title: '학생 20명 프로젝트 진행 모니터링',
            type: 'table',
            columns: ['이름', '디자인 점수', '소요 일수(일)', '질문 횟수', '상태/특이사항'],
            data: ${JSON.stringify(generate20Students('tech'))}.map(s => ({ 
              name: s.name, score: s.score + '점', time: s.time + '일', q: s.qCount + '회', note: s.note 
            }))
          },
          {
            title: '단계별 평균 소요 시간 및 지연 구간',
            type: 'chart',
            chartType: 'bar',
            data: [
              { name: '아이디어 구상', rate: 100, time: 2 },
              { name: '센서 배치도 작성', rate: 85, time: 4 },
              { name: '3D 모델링', rate: 45, time: 8 },
              { name: '발표 자료 준비', rate: 90, time: 2 }
            ]
          },
          {
            title: '설계 오류 유형',
            type: 'chart',
            chartType: 'pie',
            data: [
              { name: '치수 오차', value: 45 },
              { name: '센서 논리 오류', value: 35 },
              { name: '재료 선택 부적절', value: 20 }
            ]
          },
          {
            title: 'AI 튜터 종합 코멘트',
            type: 'text',
            content: '대부분의 학생이 기발한 아이디어를 내고 있으나, 3D 모델링 소프트웨어를 다루는 데(도구 활용 역량) 큰 병목 현상을 겪고 있습니다. 소프트웨어 기본 단축키 및 튜토리얼 보강 훈련이 시급합니다.'
          }
        ]
      },
      {
        id: 'student',
        title: '학생 실습 역량 데이터 (김민준 학생)',
        description: '아이디어는 우수하나 모델링 툴 사용을 어려워하여 마감을 지연하는 학생입니다.',
        sections: [
          {
            title: '김민준 학생 지표',
            type: 'stats',
            data: [
              { label: '기획 점수', value: '98점' },
              { label: '구현(모델링) 점수', value: '55점' },
              { label: '마감 지연 여부', value: '이틀 지연' },
            ]
          },
          {
            title: '헬프데스크 챗봇 로그',
            type: 'chat',
            data: [
              { sender: 'student', time: '13:00', message: '지붕을 둥글게 만들고 싶은데 어떻게 해?', action: '곡면 툴 찾지 못함' },
              { sender: 'ai', time: '13:01', message: '상단 메뉴에서 [호 그리기] 도구를 선택한 후...' },
              { sender: 'student', time: '13:05', message: '자꾸 선이 삐뚤어져 짜증나', action: '모델링 파일 삭제 후 재시도' },
              { sender: 'ai', time: '13:06', message: 'Shift 키를 누른 채로 선을 그어보세요.' },
              { sender: 'student', time: '13:10', message: '아 그냥 네모난 집으로 할래', action: '초기 기획 변경 (타협)' }
            ]
          },
          {
            title: '민준이의 평가 루브릭 달성도',
            type: 'chart',
            chartType: 'bar',
            data: [
              { name: '창의성', rate: 95, time: 5 },
              { name: '실용성', rate: 85, time: 4 },
              { name: '도구 활용', rate: 30, time: 10 },
              { name: '완성도', rate: 60, time: 8 }
            ]
          },
          {
            title: '프로젝트 기여도 (조별)',
            type: 'chart',
            chartType: 'pie',
            data: [
              { name: '기획', value: 70 },
              { name: '모델링', value: 10 },
              { name: '발표', value: 20 }
            ]
          },
          {
            title: '타임라인 요약',
            type: 'table',
            columns: ['일자', '진행 단계', '특이사항'],
            data: [
              { day: '1일차', login: '아이디어 회의', time: '주도적' },
              { day: '3일차', login: '3D 모델링 시작', time: '스트레스 증가' },
              { day: '5일차', login: '최종 제출', time: '기획과 다른 단순한 결과물' }
            ]
          }
        ]
      }
    ]
  },
  special: {
    name: '특수교육',
    datasets: [
      {
        id: 'class',
        title: '특수학급 전체 긍정적 행동 지원 데이터',
        description: '특수학급(20명) 내 도전적 행동 및 IEP(개별화교육계획) 목표 달성 현황입니다.',
        sections: [
          {
            title: '학급 전반 요약 지표',
            type: 'stats',
            data: [
              { label: 'IEP 목표 달성률', value: '75%' },
              { label: '일평균 긍정 강화 횟수', value: '15.4회' },
              { label: '도전적 행동 발생(주간)', value: '12% 감소' },
            ]
          },
          {
            title: '학생 20명 IEP 현황 보드',
            type: 'table',
            columns: ['이름', '목표 달성률', '평균 집중시간(분)', '도전적 행동(주간)', '행동 지원 상태'],
            data: ${JSON.stringify(generate20Students('special'))}.map(s => ({ 
              name: s.name, score: s.score + '%', time: s.time + '분', q: s.qCount + '회', note: s.note 
            }))
          },
          {
            title: '환경적 요인별 도전적 행동 빈도',
            type: 'chart',
            chartType: 'bar',
            data: [
              { name: '쉬는 시간 (비구조화)', rate: 24, time: 10 },
              { name: '새로운 과제 제시', rate: 15, time: 5 },
              { name: '장소 이동 (전환)', rate: 5, time: 2 },
              { name: '급식 시간', rate: 2, time: 1 }
            ]
          },
          {
            title: '도전적 행동의 기능(원인) 분석',
            type: 'chart',
            chartType: 'pie',
            data: [
              { name: '과제 회피', value: 45 },
              { name: '감각 추구/회피', value: 30 },
              { name: '관심 끌기', value: 20 },
              { name: '요구 표현', value: 5 }
            ]
          },
          {
            title: '행동 지원 시스템 알림',
            type: 'text',
            content: '오전 3교시(통합학급 체육 시간 직후)에 특수학급으로 돌아오는 전환 과정에서 도전적 행동이 가장 많이 튀어나옵니다. 3교시 직후에는 진정할 수 있는 시각적 스케줄 보강 및 감각 휴식처 제공이 필요합니다.'
          }
        ]
      },
      {
        id: 'student',
        title: '개별화 교육(IEP) 학생 심층 분석 (윤서준 학생)',
        description: '과제 회피 행동이 빈번했으나, 프롬프트 용암법을 통해 개선 중인 서준이의 데이터입니다.',
        sections: [
          {
            title: '서준이의 행동 변화 지표',
            type: 'stats',
            data: [
              { label: '주요 행동', value: '자리 이탈 및 소리지르기' },
              { label: '자리 유지 시간', value: '평균 7분 (목표 15분)' },
              { label: '시각적 스케줄 활용도', value: '90%' },
            ]
          },
          {
            title: '교사-학생-AI 행동 지원 로그',
            type: 'chat',
            data: [
              { sender: 'ai', time: '09:10', message: '서준 학생, 지금은 수학 시간이에요. 자리에 앉으세요.', action: '음성 프롬프트 제공' },
              { sender: 'student', time: '09:11', message: '(귀를 막고 소리를 지르며 이탈)', action: '과제 회피 행동 1회 누적' },
              { sender: 'ai', time: '09:12', message: '[교사 알림] 서준이가 시청각적 과부하를 느낍니다. 이어폰을 제공해주세요.' },
              { sender: 'student', time: '09:15', message: '(노이즈 캔슬링 헤드폰 착용 후 착석)', action: '안정 상태 진입' },
              { sender: 'ai', time: '09:16', message: '잘 앉았어요! 칭찬 스티커 1개를 획득했습니다.' }
            ]
          },
          {
            title: '주차별 프롬프트 의존도 (용암법 진행)',
            type: 'chart',
            chartType: 'bar',
            data: [
              { name: '1주 (신체적)', rate: 100, time: 20 },
              { name: '2주 (시각적)', rate: 70, time: 15 },
              { name: '3주 (언어적)', rate: 40, time: 10 },
              { name: '4주 (독립수행)', rate: 15, time: 5 }
            ]
          },
          {
            title: '성공적인 강화물 선호도',
            type: 'chart',
            chartType: 'pie',
            data: [
              { name: '태블릿 시간', value: 60 },
              { name: '젤리 간식', value: 25 },
              { name: '퍼즐 놀이', value: 15 }
            ]
          },
          {
            title: '일일 관찰 기록',
            type: 'table',
            columns: ['날짜', '도전적 행동', '대체 행동 사용', '특이사항'],
            data: [
              { day: '월요일', login: '3회', time: '1회', note: '주말 이후 불안도 높음' },
              { day: '수요일', login: '1회', time: '3회', note: '스스로 헤드폰 요청함 (발전)' },
              { day: '금요일', login: '0회', time: '4회', note: '완벽한 착석 유지' }
            ]
          }
        ]
      }
    ]
  }
};
`;

fs.writeFileSync('./src/data/mockData.js', mockDataStr, 'utf8');
console.log('mockData generated!');
