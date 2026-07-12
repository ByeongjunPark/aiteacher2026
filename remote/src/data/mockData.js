export const subjectsData = {
  social: {
    name: '사회과',
    datasets: [
      {
        id: 1,
        title: '역사적 사건 이해도와 질문 빈도의 상관관계',
        description: '최근 3주간 한국사 수업에서 학생들의 질문 횟수와 단원 평가 점수를 기록한 데이터입니다.',
        columns: ['학생 이름', '질문 횟수', '단원 평가 점수 (100점 만점)'],
        data: [
          { name: '김민준', questions: 2, score: 65 },
          { name: '이서연', questions: 8, score: 92 },
          { name: '박도윤', questions: 5, score: 78 },
          { name: '최지아', questions: 12, score: 98 },
          { name: '정우진', questions: 1, score: 55 },
        ]
      },
      {
        id: 2,
        title: '논술형 평가 주요 키워드 분석',
        description: '현대 사회의 문제점에 대한 논술 과제에서 학생들이 가장 많이 사용한 핵심 키워드의 빈도입니다.',
        columns: ['키워드', '사용 빈도', '관련 개념 이해도(평균)'],
        data: [
          { keyword: '저출산', frequency: 45, understanding: '높음' },
          { keyword: '고령화', frequency: 42, understanding: '높음' },
          { keyword: '양극화', frequency: 15, understanding: '낮음' },
          { keyword: '환경오염', frequency: 38, understanding: '보통' },
        ]
      },
      {
        id: 3,
        title: '모의투자 게임 수익률 분포',
        description: '경제 단원 학습 후 진행한 모의투자 게임에서 학생들의 수익률 구간별 분포입니다.',
        columns: ['수익률 구간', '학생 수', '주요 투자 종목'],
        data: [
          { range: '20% 이상', count: 3, items: 'IT, 신재생에너지' },
          { range: '5% ~ 20%', count: 8, items: '제조업, 금융' },
          { range: '-5% ~ 5%', count: 12, items: '소비재 (분산투자)' },
          { range: '-5% 미만', count: 7, items: '단일 종목 집중 투자' },
        ]
      }
    ]
  },
  science: {
    name: '과학과',
    datasets: [
      {
        id: 1,
        title: '실험 보고서 제출 시간과 점수',
        description: '실험 종료 후 보고서 제출까지 걸린 시간(시간)과 해당 보고서의 평가 점수입니다.',
        columns: ['학생 이름', '제출 소요 시간(h)', '보고서 점수 (10점 만점)'],
        data: [
          { name: '이지훈', time: 2, score: 9.5 },
          { name: '박수아', time: 5, score: 8.5 },
          { name: '김동현', time: 24, score: 6.0 },
          { name: '최유리', time: 1.5, score: 9.0 },
          { name: '정민재', time: 48, score: 4.5 },
        ]
      },
      {
        id: 2,
        title: '물리 vs 생명과학 단원 성취도 비교',
        description: '동일한 학급 학생들의 물리 단원과 생명과학 단원 형성평가 성취도 차이입니다.',
        columns: ['학생 이름', '물리 성취도(%)', '생명과학 성취도(%)'],
        data: [
          { name: '학생 A', physics: 85, biology: 60 },
          { name: '학생 B', physics: 40, biology: 95 },
          { name: '학생 C', physics: 75, biology: 80 },
          { name: '학생 D', physics: 30, biology: 45 },
        ]
      },
      {
        id: 3,
        title: '가상 실험실(VR) 상호작용 로그',
        description: '화학 가상 실험 프로그램에서 학생들이 각 시약과 상호작용한 횟수입니다.',
        columns: ['시약 종류', '평균 상호작용 횟수', '오류 발생(폭발 등) 횟수'],
        data: [
          { reagent: '염산', interactions: 15.2, errors: 4 },
          { reagent: '수산화나트륨', interactions: 14.8, errors: 3 },
          { reagent: '페놀프탈레인', interactions: 5.1, errors: 0 },
          { reagent: '마그네슘 리본', interactions: 22.4, errors: 12 },
        ]
      }
    ]
  },
  arts: {
    name: '예체능과',
    datasets: [
      {
        id: 1,
        title: '실기 연습 시간과 기량 향상도',
        description: '학생들이 주간 실기 연습에 투자한 시간과 월말 평가에서의 기량 향상 정도입니다.',
        columns: ['학생 이름', '주간 연습 시간(h)', '기량 향상도 (1~5)'],
        data: [
          { name: '김태영', time: 12, improvement: 5 },
          { name: '이수민', time: 3, improvement: 2 },
          { name: '박준호', time: 8, improvement: 4 },
          { name: '최현우', time: 1.5, improvement: 1 },
          { name: '정아름', time: 10, improvement: 4 },
        ]
      },
      {
        id: 2,
        title: '동작 분석 영상의 자세 정확도',
        description: '체육 수업 중 촬영된 체조 동작 영상의 주차별 자세 정확도(AI 분석)입니다.',
        columns: ['주차', '평균 자세 정확도(%)', '주요 감점 요인'],
        data: [
          { week: '1주차', accuracy: 45, reason: '유연성 부족' },
          { week: '2주차', accuracy: 58, reason: '시선 처리 불안' },
          { week: '3주차', accuracy: 72, reason: '착지 불안정' },
          { week: '4주차', accuracy: 88, reason: '미세한 각도 오차' },
        ]
      },
      {
        id: 3,
        title: '동료 평가 긍정/부정 키워드 비율',
        description: '미술 작품 상호 평가에서 학생들이 남긴 코멘트의 감성 분석 결과입니다.',
        columns: ['작품 스타일', '긍정 키워드(%)', '부정 키워드(%)', '주요 피드백'],
        data: [
          { style: '추상화', positive: 40, negative: 60, feedback: '난해함, 색채가 좋음' },
          { style: '풍경화', positive: 85, negative: 15, feedback: '편안함, 구도가 안정적임' },
          { style: '인물화', positive: 65, negative: 35, feedback: '표현력 우수, 비율 어색함' },
        ]
      }
    ]
  },
  tech: {
    name: '기술가정과',
    datasets: [
      {
        id: 1,
        title: '프로젝트 제작 단계별 소요 시간',
        description: '목공예 프로젝트에서 학생들이 각 단계별로 소요한 평균 시간입니다.',
        columns: ['제작 단계', '권장 소요 시간(h)', '실제 평균 소요 시간(h)'],
        data: [
          { stage: '아이디어 스케치', recommended: 1.0, actual: 2.5 },
          { stage: '치수 측정 및 재단', recommended: 2.0, actual: 3.2 },
          { stage: '조립', recommended: 2.0, actual: 1.5 },
          { stage: '사포질 및 마감', recommended: 1.5, actual: 0.8 },
        ]
      },
      {
        id: 2,
        title: '요리 실습 레시피 수행 정확도',
        description: '조리 실습 시 각 조별로 레시피의 정량 및 순서를 준수한 비율입니다.',
        columns: ['조', '정량 준수율(%)', '순서 준수율(%)', '완성도 점수(10점)'],
        data: [
          { group: '1조', quantity: 95, order: 100, score: 9.5 },
          { group: '2조', quantity: 70, order: 80, score: 7.0 },
          { group: '3조', quantity: 100, order: 40, score: 5.5 },
          { group: '4조', quantity: 50, order: 90, score: 6.5 },
        ]
      },
      {
        id: 3,
        title: '실습 전 안전 퀴즈 점수와 사고 발생률',
        description: '기계 조작 실습 전 실시한 안전 퀴즈 점수와 실제 주의를 받은 횟수의 관계입니다.',
        columns: ['안전 퀴즈 점수', '학생 수', '주의/경고 받은 총 횟수'],
        data: [
          { score: '90~100점', count: 15, warnings: 1 },
          { score: '70~89점', count: 10, warnings: 5 },
          { score: '50~69점', count: 4, warnings: 8 },
          { score: '50점 미만', count: 1, warnings: 4 },
        ]
      }
    ]
  },
  special: {
    name: '특수교육',
    datasets: [
      {
        id: 1,
        title: '시간대별 도전적 행동 발생 빈도',
        description: '특정 학생의 일주일간 시간대별 도전적 행동(자리 이탈 등) 발생 빈도입니다.',
        columns: ['시간대', '월', '화', '수', '목', '금'],
        data: [
          { time: '1교시 (09:00)', mon: 0, tue: 1, wed: 0, thu: 0, fri: 1 },
          { time: '3교시 (11:00)', mon: 4, tue: 5, wed: 3, thu: 6, fri: 4 },
          { time: '점심시간 (12:30)', mon: 1, tue: 0, wed: 2, thu: 1, fri: 0 },
          { time: '5교시 (13:30)', mon: 3, tue: 4, wed: 5, thu: 4, fri: 5 },
        ]
      },
      {
        id: 2,
        title: '프롬프트(촉구) 유무에 따른 과제 수행률',
        description: '새로운 과제를 수행할 때, 교사의 촉구 수준에 따른 독립적 수행 성공률입니다.',
        columns: ['촉구 수준', '시도 횟수', '독립적 수행 성공률(%)'],
        data: [
          { prompt: '신체적 촉구 (전면적 도움)', attempts: 20, success: 95 },
          { prompt: '시각적 촉구 (그림 카드)', attempts: 25, success: 70 },
          { prompt: '언어적 촉구 (말로 지시)', attempts: 30, success: 45 },
          { prompt: '촉구 없음 (독립 수행)', attempts: 15, success: 10 },
        ]
      },
      {
        id: 3,
        title: '주의 집중 유지 시간 변화',
        description: '한 달 동안 특정 교구(퍼즐)를 활용할 때 학생이 스스로 집중을 유지한 시간입니다.',
        columns: ['주차', '평균 집중 시간(분)', '최대 집중 시간(분)'],
        data: [
          { week: '1주차', avg: 3.5, max: 5 },
          { week: '2주차', avg: 4.2, max: 7 },
          { week: '3주차', avg: 6.0, max: 10 },
          { week: '4주차', avg: 8.5, max: 15 },
        ]
      }
    ]
  }
};
