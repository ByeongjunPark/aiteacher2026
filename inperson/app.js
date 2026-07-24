/**
 * AI Teacher 2026 - Inperson Prompt Generator Engine
 * Simplified 4-Element Step Design (Choose Teacher Act vs Student Act)
 */

const DEFAULT_STATE = {
  currentStep: 1,
  topic: "",
  inquiry: "",
  target: "",
  standards: "",
  environment: "",
  intent: "",
  goal: "",
  steps: [
    {
      id: "step-1",
      title: "",
      groupType: "전체",
      actType: "교사",
      actDesc: "",
      toolRole: ""
    }
  ],
  apiKey: "up_5wGHNHY9ZGB6CAPknaTbcfWIDL1Um"
};

let appState = JSON.parse(JSON.stringify(DEFAULT_STATE));

document.addEventListener("DOMContentLoaded", () => {
  loadFromLocalStorage();
  initEventListeners();
  renderSteps();
  updateLiveSummary();
  switchWizardStep(appState.currentStep || 1);
});

function loadFromLocalStorage() {
  const saved = localStorage.getItem("aiteacher_inperson_state");
  if (saved) {
    try {
      appState = JSON.parse(saved);
      if (!appState.steps || appState.steps.length === 0) {
        appState.steps = JSON.parse(JSON.stringify(DEFAULT_STATE.steps));
      }
    } catch (e) {
      console.error("Failed to parse local storage", e);
    }
  }

  if (!appState.apiKey || appState.apiKey === "up_jskRfswj0ZmfhlfDvjyVBSY81iuh2") {
    appState.apiKey = "up_5wGHNHY9ZGB6CAPknaTbcfWIDL1Um";
  }

  document.getElementById("input-topic").value = appState.topic || "";
  document.getElementById("input-inquiry").value = appState.inquiry || "";
  document.getElementById("input-target").value = appState.target || "";
  document.getElementById("input-standards").value = appState.standards || "";
  document.getElementById("input-intent").value = appState.intent || "";
  document.getElementById("input-environment").value = appState.environment || "";
  document.getElementById("input-goal").value = appState.goal || "";
  document.getElementById("input-api-key").value = appState.apiKey;
}

function saveToLocalStorage() {
  appState.topic = document.getElementById("input-topic").value;
  appState.inquiry = document.getElementById("input-inquiry").value;
  appState.target = document.getElementById("input-target").value;
  appState.standards = document.getElementById("input-standards").value;
  appState.intent = document.getElementById("input-intent").value;
  appState.environment = document.getElementById("input-environment").value;
  appState.goal = document.getElementById("input-goal").value;
  appState.apiKey = document.getElementById("input-api-key").value;

  localStorage.setItem("aiteacher_inperson_state", JSON.stringify(appState));
  updateLiveSummary();
}

// Switch Left View Step & Highlight Arrow
function switchWizardStep(stepNum) {
  appState.currentStep = parseInt(stepNum);
  saveToLocalStorage();

  // Hide input views
  document.querySelectorAll(".step-input-view").forEach(view => {
    view.classList.remove("active");
  });

  // Show active view
  const targetView = document.getElementById(`input-view-${stepNum}`);
  if (targetView) targetView.classList.add("active");

  // Update Arrow Stepper
  const arrows = document.querySelectorAll(".step-arrow");
  arrows.forEach(arr => {
    const s = parseInt(arr.dataset.step);
    arr.classList.remove("active", "completed");
    if (s === appState.currentStep) {
      arr.classList.add("active");
    } else if (s < appState.currentStep) {
      arr.classList.add("completed");
    }
  });

  // Highlight Right Accumulate Card
  document.querySelectorAll(".accum-card").forEach(card => card.classList.remove("highlight"));
  const targetCard = document.getElementById(`accum-card-${stepNum}`);
  if (targetCard) targetCard.classList.add("highlight");

  if (appState.currentStep === 4 && !document.getElementById("output-prompt").value) {
    generatePrompt();
  }
}

// Render Step 3: Web App Step Design (Choose Teacher vs Student Act)
function renderSteps() {
  const container = document.getElementById("steps-container");
  container.innerHTML = "";

  appState.steps.forEach((step, index) => {
    const stepEl = document.createElement("div");
    stepEl.className = "step-item";
    stepEl.draggable = true;
    stepEl.dataset.id = step.id;
    stepEl.dataset.index = index;

    const groupOptions = ["전체", "모둠", "개별"].map(t => 
      `<option value="${t}" ${t === (step.groupType || '전체') ? 'selected' : ''}>${t} 활동</option>`
    ).join('');

    const actTypeOptions = ["교사", "학생"].map(a => 
      `<option value="${a}" ${a === (step.actType || '교사') ? 'selected' : ''}>${a} 활동</option>`
    ).join('');

    stepEl.innerHTML = `
      <div class="step-item-header">
        <div class="drag-handle">
          <i class="fa-solid fa-grip-vertical"></i>
          <span>화면 단계 ${index + 1}</span>
          <span class="step-badge">${step.groupType || '전체'} | ${step.actType || '교사'}활동</span>
        </div>
        <button class="btn-delete-item btn-delete-step" data-index="${index}" title="삭제"><i class="fa-solid fa-trash-can"></i></button>
      </div>

      <!-- 1 & 2: 화면 흐름 단계명 & 전체/개별/모둠활동 구분 -->
      <div class="form-group-row" style="display: grid; grid-template-columns: 2fr 1fr; gap: 10px; align-items: start;">
        <div class="form-group">
          <label><i class="fa-solid fa-layer-group"></i> 1. 화면 흐름 단계 (단계명 / 활동제목)</label>
          <input type="text" class="step-title-input" data-index="${index}" value="${step.title || ''}" placeholder="예: 1단계 - 동기 유발 / 2단계 - 토론 수행">
        </div>
        <div class="form-group">
          <label><i class="fa-solid fa-users"></i> 2. 학습 형태</label>
          <select class="group-select" data-index="${index}">
            ${groupOptions}
          </select>
        </div>
      </div>

      <!-- 3: 교사활동 / 학생활동 선택 및 내용 -->
      <div class="form-group-row" style="display: grid; grid-template-columns: 1fr 2fr; gap: 10px; align-items: start;">
        <div class="form-group">
          <label><i class="fa-solid fa-user-gear"></i> 3-1. 활동 주체 구분</label>
          <select class="act-type-select" data-index="${index}">
            ${actTypeOptions}
          </select>
        </div>
        <div class="form-group">
          <label><i class="fa-solid fa-pen-nib"></i> 3-2. 활동 내용</label>
          <textarea rows="2" class="act-desc-input" data-index="${index}" placeholder="선택한 활동(교사 또는 학생)의 구체적인 내용 작성">${step.actDesc || ''}</textarea>
        </div>
      </div>

      <!-- 4: 해당 화면에서 도구의 교육적 역할 설명 -->
      <div class="form-group">
        <label style="color: #c084fc;"><i class="fa-solid fa-wand-magic-sparkles"></i> 4. 해당 화면에서 도구(웹앱)의 교육적 역할 및 기능 설명</label>
        <textarea rows="2" class="tool-role-input" data-index="${index}" placeholder="웹앱 화면이 수행하는 역할 (예: 사례 카드 제시, 찬반 음성 요약, AI 심화 질문 생성, 시각 피드백 등)">${step.toolRole || ''}</textarea>
      </div>
    `;

    stepEl.querySelector(".step-title-input").addEventListener("input", (e) => {
      appState.steps[index].title = e.target.value;
      saveToLocalStorage();
    });

    stepEl.querySelector(".group-select").addEventListener("change", (e) => {
      appState.steps[index].groupType = e.target.value;
      saveToLocalStorage();
      renderSteps();
    });

    stepEl.querySelector(".act-type-select").addEventListener("change", (e) => {
      appState.steps[index].actType = e.target.value;
      saveToLocalStorage();
      renderSteps();
    });

    stepEl.querySelector(".act-desc-input").addEventListener("input", (e) => {
      appState.steps[index].actDesc = e.target.value;
      saveToLocalStorage();
    });

    stepEl.querySelector(".tool-role-input").addEventListener("input", (e) => {
      appState.steps[index].toolRole = e.target.value;
      saveToLocalStorage();
    });

    stepEl.querySelector(".btn-delete-step").addEventListener("click", () => {
      appState.steps.splice(index, 1);
      saveToLocalStorage();
      renderSteps();
    });

    stepEl.addEventListener("dragstart", handleDragStart);
    stepEl.addEventListener("dragover", handleDragOver);
    stepEl.addEventListener("drop", handleDrop);
    stepEl.addEventListener("dragend", handleDragEnd);

    container.appendChild(stepEl);
  });
}

// Drag and Drop for Step 3
let dragSrcIndex = null;
function handleDragStart(e) {
  dragSrcIndex = parseInt(this.dataset.index);
  this.classList.add("dragging");
  e.dataTransfer.effectAllowed = "move";
}
function handleDragOver(e) {
  if (e.preventDefault) e.preventDefault();
  e.dataTransfer.dropEffect = "move";
  return false;
}
function handleDrop(e) {
  e.stopPropagation();
  const dropTargetIndex = parseInt(this.dataset.index);

  if (dragSrcIndex !== null && dragSrcIndex !== dropTargetIndex) {
    const itemMoved = appState.steps.splice(dragSrcIndex, 1)[0];
    appState.steps.splice(dropTargetIndex, 0, itemMoved);
    saveToLocalStorage();
    renderSteps();
  }
  return false;
}
function handleDragEnd() { this.classList.remove("dragging"); }

// Update Live Summary Board on Right Panel
function updateLiveSummary() {
  // Step 1
  const topicEl = document.getElementById("summary-topic");
  const inqEl = document.getElementById("summary-inquiry");
  const targetEl = document.getElementById("summary-target");
  const stdEl = document.getElementById("summary-standards");
  const envEl = document.getElementById("summary-environment");

  topicEl.innerText = appState.topic || "미입력";
  topicEl.className = appState.topic ? "" : "empty-txt";
  
  inqEl.innerText = appState.inquiry || "미입력";
  inqEl.className = appState.inquiry ? "" : "empty-txt";

  targetEl.innerText = appState.target || "미입력";
  targetEl.className = appState.target ? "" : "empty-txt";

  stdEl.innerText = appState.standards || "미입력";
  stdEl.className = appState.standards ? "" : "empty-txt";

  envEl.innerText = appState.environment || "미입력";
  envEl.className = appState.environment ? "" : "empty-txt";

  // Step 2
  const intentEl = document.getElementById("summary-intent");
  const goalEl = document.getElementById("summary-goal");
  
  intentEl.innerText = appState.intent || "미입력";
  intentEl.className = appState.intent ? "" : "empty-txt";
  goalEl.innerText = appState.goal || "미입력";
  goalEl.className = appState.goal ? "" : "empty-txt";

  // Step 3 (Steps List)
  document.getElementById("summary-step-count").innerText = appState.steps.length;
  const treeContainer = document.getElementById("summary-steps-list");
  treeContainer.innerHTML = "";

  if (appState.steps.length === 0) {
    treeContainer.innerHTML = `<span class="empty-txt">등록된 화면 단계가 없습니다.</span>`;
  } else {
    appState.steps.forEach((st, idx) => {
      const node = document.createElement("div");
      node.className = "tree-step-node";
      node.innerHTML = `
        <div class="tree-step-title">단계 ${idx + 1}: ${st.title || '(단계명 미입력)'} <span class="badge-tag" style="margin-left: 5px; font-size: 0.7em;">${st.groupType || '전체'} | ${st.actType || '교사'}활동</span></div>
        <div style="margin-top: 2px;"><strong>${st.actType || '교사'} 활동:</strong> ${st.actDesc || '미작성'}</div>
        <div style="color: #c084fc; margin-top: 2px;"><strong>도구 역할:</strong> ${st.toolRole || '미작성'}</div>
      `;
      treeContainer.appendChild(node);
    });
  }
}

function initEventListeners() {
  const inputs = document.querySelectorAll("input, textarea");
  inputs.forEach(input => {
    input.addEventListener("input", saveToLocalStorage);
  });

  // Arrow Stepper Clicks
  document.querySelectorAll(".step-arrow").forEach(arr => {
    arr.addEventListener("click", () => {
      switchWizardStep(arr.dataset.step);
    });
  });

  // Next / Prev Buttons
  document.querySelectorAll(".btn-next").forEach(btn => {
    btn.addEventListener("click", () => switchWizardStep(btn.dataset.next));
  });
  document.querySelectorAll(".btn-prev").forEach(btn => {
    btn.addEventListener("click", () => switchWizardStep(btn.dataset.prev));
  });

  // Add Step (Step 3)
  document.getElementById("btn-add-step").addEventListener("click", () => {
    const newStep = {
      id: `step-${Date.now()}`,
      title: "",
      groupType: "전체",
      actType: "교사",
      actDesc: "",
      toolRole: ""
    };
    appState.steps.push(newStep);
    saveToLocalStorage();
    renderSteps();
  });

  // Reset
  document.getElementById("btn-reset").addEventListener("click", () => {
    if (confirm("모든 입력 내용을 초기화하시겠습니까?")) {
      appState = JSON.parse(JSON.stringify(DEFAULT_STATE));
      localStorage.removeItem("aiteacher_inperson_state");
      loadFromLocalStorage();
      renderSteps();
      updateLiveSummary();
      switchWizardStep(1);
      showToast("모든 작성 내용이 초기화되었습니다.");
    }
  });

  // Prompt Gens
  document.getElementById("btn-generate").addEventListener("click", generatePrompt);
  document.getElementById("btn-generate-upstage").addEventListener("click", generateWithUpstage);

  // Copy Prompt
  document.getElementById("btn-copy-prompt").addEventListener("click", () => {
    const promptText = document.getElementById("output-prompt").value;
    if (!promptText) { showToast("복사할 프롬프트가 없습니다."); return; }
    navigator.clipboard.writeText(promptText).then(() => {
      showToast("프롬프트가 복사되었습니다! Google AI Studio에 붙여넣으세요.");
    });
  });

  // Upstage Modal
  const modal = document.getElementById("modal-api");
  document.getElementById("btn-api-modal").addEventListener("click", () => modal.style.display = "flex");
  document.getElementById("btn-close-modal").addEventListener("click", () => modal.style.display = "none");
  document.getElementById("btn-save-api-key").addEventListener("click", () => {
    saveToLocalStorage();
    modal.style.display = "none";
    showToast("Upstage API Key가 저장되었습니다.");
  });
}

function generatePrompt() {
  saveToLocalStorage();

  // Extract core features from tool roles across steps
  const coreFeaturesList = appState.steps
    .filter(st => st.toolRole && st.toolRole.trim() !== "")
    .map((st, i) => `- [기능 ${i+1}] (${st.title || '단계 ' + (i+1)}) 도구 기능: ${st.toolRole}`)
    .join("\n");

  const featuresSection = coreFeaturesList || "- [기능 1] 웹앱 인터랙션 및 데이터 처리 기능";

  // Format Steps Section
  const stepsFormatted = appState.steps.map((st, i) => {
    return `- [Step ${i+1}] ${st.title || '단계명 미작성'} | [학습 형태: ${st.groupType || '전체'}활동] | [활동 주체: ${st.actType || '교사'} 활동]
  * ${st.actType || '교사'} 활동 내용: ${st.actDesc || '미작성'}
  * 도구의 교육적 역할 및 기능: ${st.toolRole || '미작성'}`;
  }).join("\n\n");

  // Check if AI API is mentioned
  const allText = JSON.stringify(appState);
  const needsAiApi = /AI|인공지능|Upstage|Solar|녹취|발문|요약|LLM|챗봇/i.test(allText);

  let apiReferenceBlock = "";
  if (needsAiApi) {
    apiReferenceBlock = `- AI API 연동 가이드 및 레퍼런스 코드 (Upstage Solar-Pro3 API Integration):
  * Upstage API Key: "${appState.apiKey || 'up_5wGHNHY9ZGB6CAPknaTbcfWIDL1Um'}"
  * Base URL: "https://api.upstage.ai/v1"
  * Target Model: "solar-pro3"
  * 백엔드(Code.gs) 또는 프론트엔드 API 호출 방식 레퍼런스:
\`\`\`javascript
// Upstage Chat Completions API Call Reference
const apiKey = "${appState.apiKey || 'up_5wGHNHY9ZGB6CAPknaTbcfWIDL1Um'}";
const response = await fetch("https://api.upstage.ai/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": \`Bearer \${apiKey}\`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: "solar-pro3",
    messages: [
      { role: "system", content: "당신은 교과 수업을 지원하는 수석 AI 퍼실리테이터입니다." },
      { role: "user", content: "학습자 반응 분석 및 심화 발문/피드백 생성" }
    ],
    stream: false
  })
});
const data = await response.json();
console.log(data.choices[0].message.content);
\`\`\``;
  } else {
    apiReferenceBlock = `- AI API 연동 여부: 별도 외부 AI API 연동 없이 순수 웹 프론트엔드 및 Apps Script 백엔드로 구성된 앱입니다.`;
  }

  const promptTemplate = `다음 명세서에 따라 구글 앱스스크립트(GAS) 기반 교육용 단일 페이지 웹앱(SPA)의 전체 코드를 작성해 줘. 프론트엔드(Index.html)와 백엔드(Code.gs) 코드를 모두 제공해 주어야 해.

[🎨 UI/UX 및 CSS 모던 디자인 요구사항 (필수 준수)]
- **디자인 컨셉**: 밋밋하거나 구시대적인 기본 스타일을 철저히 배제하고, 첫눈에 감탄이 나오는 최첨단 럭셔리 모던 웹 UI(High-end Glassmorphism & Dark Mode)를 구현할 것.
- **색상 & 배경**: 깊이감 있는 야간 다크 배경(#090d16), 신비로운 글로우 오르브(Glowing Orbs) 배경 효과, 반투명 글래스 패널(backdrop-filter: blur(16px)), 네온 글래스 그라데이션 포인트 활용.
- **타이포그래피**: 웹 브라우저 기본 폰트를 배제하고 Google Fonts (Pretendard, Inter 등)를 적용하여 깔끔하고 정갈한 가독성 제공.
- **미세 애니메이션**: 마우스 호버 시 입체감이 살아나는 트렌디한 미세 애니메이션(smooth transform, soft box-shadow, glowing border)을 모든 버튼과 입력 카드에 적용.
- **반응형 레이아웃**: 학생들의 크롬북/태블릿 및 교사 디스플레이 화면 크기에 맞춰 자연스럽게 재배치되는 CSS Grid/Flexbox 반응형 UI 구현.

1. 배경 및 목표
- 수업 주제(교과 및 단원): ${appState.topic || '미작성'}
- 탐구 질문: ${appState.inquiry || '미작성'}
- 성취기준 및 학습 목표: ${appState.standards || '미작성'}
- 학습 대상: ${appState.target || '미작성'}
- 디바이스 및 유의사항(학습 환경): ${appState.environment || '미작성'}

2. 사용자 분석
- 수업 의도 및 학생 분석: ${appState.intent || '미작성'}
- 디지털 도구로서 웹앱의 역할 및 핵심 목표: ${appState.goal || '미작성'}

3. 핵심 기능 정의
${featuresSection}

4. 화면의 흐름 (수업 활동 및 도구의 역할 매핑)
${stepsFormatted}

5. 참고자료
- 기술 스택: 구글 앱스스크립트(Code.gs), HTML5, Vanilla JavaScript, CSS (Vanilla CSS 또는 Tailwind)
${apiReferenceBlock}
- 구글시트 데이터베이스 아키텍처:
  * 탭 1 명칭: [학습자_기록]
    - 헤더 명칭: 타임스탬프, 학습자ID, 모둠번호, 성명, 현재단계, 최종제출내용, 접속디바이스
  * 탭 2 명칭: [실시간_반응데이터]
    - 헤더 명칭: 타임스탬프, 모둠번호, 화면단계명, 학습형태, 활동주체, 활동내용, 도구역할피드백
`;

  document.getElementById("output-prompt").value = promptTemplate;
  showToast("모던 디자인 지침이 포함된 마스터 프롬프트가 산출되었습니다!");
}

async function generateWithUpstage() {
  saveToLocalStorage();
  const apiKey = appState.apiKey || "up_5wGHNHY9ZGB6CAPknaTbcfWIDL1Um";

  const loadingEl = document.getElementById("prompt-loading");
  loadingEl.style.display = "flex";

  const stepsFormatted = appState.steps.map((st, i) => {
    return `[Step ${i+1}] 화면단계명: ${st.title || '미작성'} | 학습형태: ${st.groupType || '전체'}활동 | 활동주체: ${st.actType || '교사'}활동
  - 활동 내용: ${st.actDesc || '미작성'}
  - 도구의 교육적 역할 및 기능: ${st.toolRole || '미작성'}`;
  }).join("\n\n");

  const analysisPayload = `
[교수설계 명세서 작성 내용]
1. 수업 주제(교과 및 단원): ${appState.topic}
2. 탐구 질문: ${appState.inquiry}
3. 성취기준: ${appState.standards}
4. 학습 대상: ${appState.target}
5. 디바이스 및 유의사항(학습 환경): ${appState.environment}
6. 수업 의도 및 학생 분석: ${appState.intent}
7. 디지털 도구로서 웹앱의 역할 및 핵심 목표: ${appState.goal}

[3단계: 웹앱 단계별 화면 설계 (교사/학생활동 구분 선택 + 도구역할)]
${stepsFormatted}
`;

  try {
    let errMessage = "";
    const response = await fetch("https://api.upstage.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "solar-pro",
        messages: [
          {
            role: "system",
            content: `당신은 차시 교수·학습 설계안 기반 구글 앱스스크립트(GAS) 바이브코딩에 특화된 수석 AI 교육공학자입니다.

[엄격 지시사항]
1. 절대 영문 사고 과정("The user asks...", "According to specification...")이나 서론/사족/설명을 출력하지 마십시오.
2. 코드를 생성하지 마십시오. 반드시 'Google AI Studio에 입력할 프롬프트'만 생성해야 합니다.
3. 생성하는 프롬프트 상단에 '글래스모피즘(Glassmorphism), 고급스러운 다크 모드, 입체적 그라데이션, Pretendard 모던 폰트, 미세 애니메이션 인터랙션 등 트렌디하고 시각적으로 압도적인 CSS 디자인 지침'을 반드시 명확히 통합하십시오.
4. 교수설계 내용 중 음성 요약, LLM 발문, 맞춤 피드백 등 AI 기능이 필요한지 판단하여 Section 5(참고자료)에 Upstage Solar API 연동 코드를 포함할지 결정하십시오.
5. 반드시 아래의 [5가지 목차 양식]을 100% 엄격히 준수하여 "다음 명세서에 따라 구글 앱스스크립트..." 로 시작하는 마스터 프롬프트 전문만 한국어로 출력하십시오.

[5가지 필수 목차 양식]
다음 명세서에 따라 구글 앱스스크립트(GAS) 기반 교육용 단일 페이지 웹앱(SPA)의 전체 코드를 작성해 줘. 프론트엔드(Index.html)와 백엔드(Code.gs) 코드를 모두 제공해 주어야 해.

[🎨 UI/UX 및 CSS 모던 디자인 요구사항 (필수 준수)]
- 트렌디한 글래스모피즘(Glassmorphism), 감각적인 다크 테마, Pretendard 폰트, 입체 그라데이션 및 미세 호버 애니메이션 적용

1. 배경 및 목표
- 수업 주제(교과 및 단원): ...
- 탐구 질문: ...
- 성취기준 및 학습 목표: ...
- 학습 대상: ...
- 디바이스 및 유의사항(학습 환경): ...

2. 사용자 분석
- 수업 의도 및 학생 분석: ...
- 디지털 도구로서 웹앱의 역할 및 핵심 목표: ...

3. 핵심 기능 정의
(3단계 도구의 역할 항목들을 종합 정리하여 작성)

4. 화면의 흐름 (수업 활동 및 도구의 역할 매핑)
(각 단계별 1. 화면단계명, 2. 학습형태, 3. 활동주체 및 내용, 4. 도구의 역할 요소 매핑하여 작성)

5. 참고자료
- 기술 스택 (Code.gs, HTML5, Vanilla JS, CSS)
- AI API 연동 필요성 판단 및 Upstage Solar API 레퍼런스 코드 (필요시 포함)
- 구글시트 데이터베이스 아키텍처 (탭 1, 탭 2 및 헤더 구조)`
          },
          {
            role: "user",
            content: `다음 교수설계 내역을 바탕으로 압도적인 모던 CSS 디자인 지침이 포함된 5대 목차 양식의 한국어 마스터 프롬프트 전문만 출력해줘:\n${analysisPayload}`
          }
        ],
        stream: false
      })
    });

    if (!response.ok) {
      const errJson = await response.json().catch(() => ({}));
      if (errJson.error && errJson.error.message) {
        errMessage = `Upstage API 오류: ${errJson.error.message}`;
      } else {
        errMessage = `Upstage API Error: ${response.status}`;
      }
      throw new Error(errMessage);
    }

    const data = await response.json();
    let resultText = data.choices[0]?.message?.content || "";

    // Sanitize: Remove any English thinking preambles if present
    if (resultText.includes("다음 명세서에 따라")) {
      resultText = resultText.substring(resultText.indexOf("다음 명세서에 따라"));
    }

    document.getElementById("output-prompt").value = resultText;
    showToast("Upstage Solar Pro가 교수설계 및 모던 디자인 지침을 반영하여 마스터 프롬프트를 도출했습니다!");

  } catch (err) {
    console.error("Upstage API Error:", err);
    generatePrompt();
    showToast(err.message.includes("credit") || err.message.includes("API key") 
      ? "Upstage API 키 크레딧 부족/정지 상태입니다. (기본 산출 프롬프트가 표시됩니다)" 
      : "Upstage AI 분석 실패. 기본 산출 프롬프트를 표시합니다.");
  } finally {
    loadingEl.style.display = "none";
  }
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.innerText = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3500);
}
