export const subjectsData = {
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
            title: '학생별 학습 시간 대비 성취도 산포도 (모의)',
            type: 'chart',
            chartType: 'bar', // Using bar to simulate distribution for simplicity
            data: [
              { name: '상위 10%', rate: 95, time: 45 },
              { name: '중위권', rate: 65, time: 25 },
              { name: '하위 20%', rate: 30, time: 10 },
              { name: '극하위권', rate: 15, time: 5 }
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
        title: '학생 단위 데이터 (7번 이지훈 학생 심층 로그)',
        description: '학급 내에서 챗봇 사용 빈도는 가장 높으나, 학업 성취도가 저조한 "프롬프트 의존증(Prompt Dependency)" 의심 학생입니다.',
        sections: [
          {
            title: '학생 지훈이의 인지/행동 요약',
            type: 'stats',
            data: [
              { label: '단원 평가 점수', value: '40점 (하위 10%)' },
              { label: 'AI 챗봇 대화 시도 횟수', value: '62회 (반 평균 22회)' },
              { label: '스스로 문제 해결한 비율', value: '5% (95% 힌트 의존)' },
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
            title: '지훈이의 문항별 체류 시간 vs 정답 여부',
            type: 'chart',
            chartType: 'bar',
            data: [
              { name: '문항1 (단순지식)', rate: 100, time: 5 },
              { name: '문항2 (단순지식)', rate: 100, time: 4 },
              { name: '문항3 (그래프분석)', rate: 0, time: 8 },
              { name: '문항4 (응용추론)', rate: 0, time: 6 },
              { name: '문항5 (실생활적용)', rate: 0, time: 3 }
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
        title: '학급 전체 데이터 (Class-wide)',
        description: '과학과 실험 실습 및 이론 학습에 대한 학급 전체의 종합 데이터입니다. (상세 내용은 사회과 예시 참조)',
        sections: [
          {
            title: '실험 참여 및 이론 성취도',
            type: 'stats',
            data: [
              { label: '이론 평가 평균', value: '72.0점' },
              { label: '실험 보고서 평균', value: '88.5점' },
              { label: '안전 수칙 위반 건수', value: '2건' },
            ]
          }
        ]
      },
      {
        id: 'student',
        title: '학생 단위 데이터 (Student-level)',
        description: '특정 관심군 학생의 다차원적 데이터입니다.',
        sections: [
          {
            title: '학생 지표',
            type: 'stats',
            data: [
              { label: '실험 성취도', value: '95점' },
              { label: '이론 성취도', value: '45점' },
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
        title: '학급 전체 실기 데이터',
        description: '예체능 종합 데이터입니다. (상세 내용은 사회과 예시 참조)',
        sections: [{ title: '기본 지표', type: 'stats', data: [{ label: '제출률', value: '100%' }] }]
      },
      {
        id: 'student',
        title: '학생 심층 실기 데이터',
        description: '학생 상세 데이터입니다.',
        sections: [{ title: '지표', type: 'stats', data: [{ label: '기량', value: 'A' }] }]
      }
    ]
  },
  tech: {
    name: '기술가정과',
    datasets: [
      {
        id: 'class',
        title: '학급 전체 프로젝트 데이터',
        description: '기술가정 종합 데이터입니다. (상세 내용은 사회과 예시 참조)',
        sections: [{ title: '기본 지표', type: 'stats', data: [{ label: '완성률', value: '85%' }] }]
      },
      {
        id: 'student',
        title: '학생 실습 역량 데이터',
        description: '학생 상세 데이터입니다.',
        sections: [{ title: '지표', type: 'stats', data: [{ label: '성취도', value: '65점' }] }]
      }
    ]
  },
  special: {
    name: '특수교육',
    datasets: [
      {
        id: 'class',
        title: '특수학급 전체 긍정적 행동 지원 데이터',
        description: '특수교육 종합 데이터입니다. (상세 내용은 사회과 예시 참조)',
        sections: [{ title: '기본 지표', type: 'stats', data: [{ label: '달성률', value: '75%' }] }]
      },
      {
        id: 'student',
        title: '개별화 교육(IEP) 데이터',
        description: '학생 상세 데이터입니다.',
        sections: [{ title: '지표', type: 'stats', data: [{ label: '성취율', value: '68%' }] }]
      }
    ]
  }
};
