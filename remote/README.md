# 🏫 AI·디지털 도구 활용 설계안 생성기 (KERIS 거시적 차원)

이 프로젝트는 **이해 중심 교육과정(UbD) 백워드 설계** 및 **T-M-A(전이-의미구성-습득) 모형**을 바탕으로 교사들의 거시적 차원 교수학습 설계안 작성을 돕는 웹 애플리케이션입니다.

작성한 정보는 교사들의 상태와 맥락 분석, TMA 정렬성을 분석하기 위해 **Upstage Solar Pro3** 모델을 거쳐 AI 피드백을 제공합니다.

---

## 🔑 Upstage API Key 설정 방법

프로젝트에 Upstage API Key가 미리 주입되어 있어 즉시 연동하여 사용할 수 있습니다. 만약 다른 API 키로 변경하고자 할 경우 아래 가이드를 참고하세요.

### HTML 소스 코드에서 키 변경하기
1. `index.html` 파일을 텍스트 에디터(VS Code, 메모장 등)로 엽니다.
2. 아래와 같이 `DEFAULT_API_KEY` 부분을 검색합니다 (약 425번째 줄 부근).
   ```javascript
   // Default API Key (User provided)
   const DEFAULT_API_KEY = "본인의_API_키_여기에_입력";
   ```
3. 따옴표 안에 새로운 Upstage API Key를 적고 파일을 저장하면 됩니다.

---

## 🚀 로컬 실행 방법
이 프로젝트는 빌드 과정이 필요 없는 순수 정적 HTML 파일입니다.
`index.html` 파일을 더블 클릭하여 웹 브라우저(Chrome, Edge 등)에서 바로 열어 사용할 수 있습니다.

## 📄 라이선스 및 제공
- **수행 기관**: KERIS (한국교육학술정보원)
- **개발**: Solar Pro3 AI 엔진 적용
