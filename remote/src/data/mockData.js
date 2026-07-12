export const subjectsData = {
  social: {
    name: '사회과',
    datasets: [
      {
        id: 'class',
        title: '학급 전체 데이터 (Class-wide)',
        description: '사회과 2학년 3반 전체 학생들의 학습 경향성과 쟁점 이해도에 대한 종합 데이터입니다.',
        sections: [
          {
            title: '학급 성취도 분포 및 온라인 과제',
            type: 'stats',
            data: [
              { label: '평균 성취도', value: '78.5점' },
              { label: '과제 제출률', value: '92%' },
              { label: 'LMS 접속 빈도(주간)', value: '3.4회' },
            ]
          },
          {
            title: '단원별 오개념 및 취약 영역',
            type: 'table',
            columns: ['단원/주제', '정답률', '주요 오개념(서술형 분석)'],
            data: [
              { topic: '현대 사회의 변동', rate: '85%', misconception: '정보화와 세계화 개념 혼동 없음' },
              { topic: '인권 보장과 헌법', rate: '45%', misconception: '기본권의 충돌 시 해결 기준 오해' },
              { topic: '시장 경제와 금융', rate: '60%', misconception: '인플레이션 원인을 수요 측면으로만 한정' }
            ]
          },
          {
            title: '모둠 토론(협력 학습) 상호작용',
            type: 'text',
            content: '온라인 토론 게시판 텍스트 마이닝 결과, "불평등", "해결책", "제도적" 키워드가 가장 많이 등장함. 상위 20% 학생이 전체 의견 개진의 60%를 주도하여 참여의 양극화가 관찰됨.'
          }
        ]
      },
      {
        id: 'student',
        title: '학생 단위 데이터 (Student-level)',
        description: '특정 관심군(학생 A)의 다차원적(인지/행동/정의) 학습 프로파일입니다.',
        sections: [
          {
            title: '기본 학습 지표 (학생 A)',
            type: 'stats',
            data: [
              { label: '최근 평가 점수', value: '55점 (하위 15%)' },
              { label: '동영상 시청 완료율', value: '40%' },
              { label: '질문 횟수(한 학기)', value: '0회' },
            ]
          },
          {
            title: '행동적/정의적 영역 심층 지표',
            type: 'table',
            columns: ['측정 항목', '수치/상태', '학급 평균'],
            data: [
              { item: '과제 지각 제출 빈도', state: '5회', avg: '1.2회' },
              { item: '사전 학업 흥미도 검사', state: '매우 낮음(2/10)', avg: '6.5/10' },
              { item: '동료 평가 코멘트 분석', state: '주로 침묵함, 소극적임', avg: '의견을 잘 냄' }
            ]
          },
          {
            title: '학습 로그 특이사항',
            type: 'text',
            content: '평가 문항 중 텍스트가 긴 자료해석 문제(비문학 형식)에서 풀이 시간이 극단적으로 짧음(찍는 경향성). 반면, 영상이나 사진 자료가 포함된 문항의 정답률은 상대적으로 높음.'
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
        description: '과학과 실험 실습 및 이론 학습에 대한 학급 전체의 종합 데이터입니다.',
        sections: [
          {
            title: '실험 참여 및 이론 성취도',
            type: 'stats',
            data: [
              { label: '이론 평가 평균', value: '72.0점' },
              { label: '실험 보고서 평균', value: '88.5점' },
              { label: '안전 수칙 위반 건수', value: '2건' },
            ]
          },
          {
            title: '가상 실험실(VR) 오류 발생 분석',
            type: 'table',
            columns: ['실험 주제', '평균 소요 시간', '주요 오류/재시도 원인'],
            data: [
              { topic: '산염기 중화적정', time: '25분', error: '지시약 투입 순서 오류 (30% 학생)' },
              { topic: '역학적 에너지 보존', time: '15분', error: '마찰력 조건 설정 누락' },
              { topic: '세포 분열 관찰', time: '40분', error: '현미경 배율 조절 실패에 따른 초점 흐림' }
            ]
          }
        ]
      },
      {
        id: 'student',
        title: '학생 단위 데이터 (Student-level)',
        description: '특정 관심군(학생 B)의 다차원적(인지/행동/정의) 학습 프로파일입니다.',
        sections: [
          {
            title: '학생 B (인지적 불균형군)',
            type: 'stats',
            data: [
              { label: '생물/지학 성취도', value: '95점 (최상위)' },
              { label: '물리/화학 성취도', value: '45점 (하위)' },
              { label: '실험 주도성 지수', value: '높음' },
            ]
          },
          {
            title: '학습 행동 및 태도',
            type: 'table',
            columns: ['관찰 항목', '상세 내용'],
            data: [
              { item: '학습 영상 시청 패턴', detail: '물리 수식 유도 부분에서 반복 시청(평균 3회)하나 최종 문제풀이 실패' },
              { item: '질문 유형', detail: '"공식에 왜 이 숫자가 들어가나요?" 등 수학적 연관성에 대한 질문 다수' },
              { item: '동료 평가 피드백', detail: '실험 아이디어는 좋으나, 계산 실수로 결과 도출을 조원에게 맡김' }
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
        title: '학급 전체 실기 및 감상 데이터',
        description: '체육/미술/음악 실기 수행 및 감상 활동에 대한 종합 데이터입니다.',
        sections: [
          {
            title: '수행 및 태도 지표',
            type: 'stats',
            data: [
              { label: '실기 과제 제출률', value: '100%' },
              { label: '기량 향상도(평균)', value: '3.8 / 5.0' },
              { label: '감상문 키워드 다양성', value: '우수' },
            ]
          },
          {
            title: '동작 분석 영상(AI) 학급 요약',
            type: 'table',
            columns: ['평가 종목', '목표 달성률', '공통 감점/부족 요인'],
            data: [
              { sport: '뜀틀 (체조)', rate: '65%', factor: '도약 시 발구름 타이밍 불일치' },
              { sport: '농구 레이업', rate: '80%', factor: '마무리 손목 스냅 부족' },
            ]
          }
        ]
      },
      {
        id: 'student',
        title: '학생 단위 심층 실기 데이터',
        description: '특정 학생(학생 C)의 주차별 실기 영상 분석 및 동료 평가 데이터입니다.',
        sections: [
          {
            title: '학생 C (노력형/발전군)',
            type: 'stats',
            data: [
              { label: '초기 실기 점수', value: 'C등급' },
              { label: '최종 실기 점수', value: 'A등급' },
              { label: '방과후 연습(주간)', value: '4.5시간' },
            ]
          },
          {
            title: '비디오 포트폴리오 분석 결과',
            type: 'text',
            content: '1~2주차에는 근력 부족으로 인한 자세 무너짐이 뚜렷했으나, 3주차부터 코어 근력 보강 훈련 로그가 확인되며 4주차 동작의 안정성이 급격히 향상됨.'
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
        title: '학급 전체 실습 프로젝트 데이터',
        description: '목공 및 조리 실습 등 프로젝트 기반 학습의 전체 진행 현황입니다.',
        sections: [
          {
            title: '프로젝트 관리 지표',
            type: 'stats',
            data: [
              { label: '안전수칙 통과율', value: '96%' },
              { label: '기한 내 완성률', value: '85%' },
              { label: '재료 낭비율', value: '12% (목표 10% 미만)' },
            ]
          },
          {
            title: '단계별 병목 현상(Bottleneck) 분석',
            type: 'table',
            columns: ['프로젝트 단계', '예상 소요 시간', '실제 소요 시간(평균)'],
            data: [
              { stage: '아이디어 구상 및 스케치', time: '1시간', realTime: '2.5시간 (지연)' },
              { stage: '치수 재단 / 재료 계량', time: '2시간', realTime: '1.5시간 (단축)' },
              { stage: '조립 및 조리', time: '2시간', realTime: '2.2시간' }
            ]
          }
        ]
      },
      {
        id: 'student',
        title: '학생 단위 실습 역량 데이터',
        description: '특정 학생(학생 D)의 실습 참여도 및 포트폴리오 분석 데이터입니다.',
        sections: [
          {
            title: '학생 D 지표',
            type: 'stats',
            data: [
              { label: '개념 이해(지필)', value: '92점' },
              { label: '실습 완성도', value: '65점' },
              { label: '협업 기여도', value: '3/10' },
            ]
          },
          {
            title: '상세 관찰 및 동료 평가',
            type: 'text',
            content: '설계 도면을 그리는 데에는 매우 우수한 역량을 보이나, 실제 도구를 다룰 때 두려움을 느끼며 조원들에게 실습을 미루는 경향이 짙음. 동료 평가에서 "아이디어는 좋으나 실질적인 작업 참여가 부족함"이라는 피드백이 지배적임.'
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
        description: '학급 내 전체 학생들의 도전적 행동 빈도 및 IEP 목표 달성률입니다.',
        sections: [
          {
            title: '학급 전반 요약',
            type: 'stats',
            data: [
              { label: 'IEP 장기목표 달성률', value: '75%' },
              { label: '일평균 긍정적 강화 횟수', value: '15.4회' },
              { label: '도전적 행동 발생(주간)', value: '전주 대비 12% 감소' },
            ]
          },
          {
            title: '환경적 요인별 도전적 행동 빈도 (학급 종합)',
            type: 'table',
            columns: ['상황/환경', '발생 건수', '주요 촉발 요인(Trigger)'],
            data: [
              { env: '비구조화된 시간 (쉬는 시간 등)', count: '24건', trigger: '순서 기다리기 실패, 감각 과부하' },
              { env: '새로운 과제 제시', count: '15건', trigger: '과제 난이도에 대한 회피' },
              { env: '전환 시간 (이동)', count: '5건', trigger: '사전 예고 부족' }
            ]
          }
        ]
      },
      {
        id: 'student',
        title: '개별화 교육(IEP) 학생 단위 데이터',
        description: '학생 E의 행동 분석 및 프롬프트(촉구) 반응성 데이터입니다.',
        sections: [
          {
            title: '학생 E 지표',
            type: 'stats',
            data: [
              { label: '주요 행동', value: '자리 이탈 및 소리지르기' },
              { label: '자리 유지 시간', value: '평균 7분 (목표 15분)' },
              { label: '시각적 스케줄 활용도', value: '90%' },
            ]
          },
          {
            title: '프롬프트(촉구) 용암법 적용 경과',
            type: 'table',
            columns: ['주차', '가장 효과적인 촉구', '독립 수행 성공률'],
            data: [
              { week: '1~2주차', prompt: '신체적 촉구 (전면적 지원)', rate: '15%' },
              { week: '3~4주차', prompt: '시각/언어적 촉구', rate: '45%' },
              { week: '5주차 현재', prompt: '제스처 촉구 (약한 지원)', rate: '68%' }
            ]
          }
        ]
      }
    ]
  }
};
