/**
 * AI Teacher 2026 - Inperson Prompt Generator Engine
 * 5-Step Wizard Engine with Upstage API Integration & High School Debate Assistant (Market Failure vs Govt Intervention)
 */

const GAGNE_EVENTS = [
  "단순 기능 구현 (해당 없음)",
  "1. 주의 집중시키기 (Gain attention)",
  "2. 학습 목표 알리기 (Inform learners of objectives)",
  "3. 선행학습 상기시키기 (Stimulate recall of prior learning)",
  "4. 자극 제시하기 (Present the content)",
  "5. 학습 안내 제시하기 (Provide learning guidance)",
  "6. 수행을 유도하기 (Elicit performance)",
  "7. 피드백 제공하기 (Provide feedback)",
  "8. 수행 기반 평가 실시하기 (Assess performance)",
  "9. 파지와 전이 촉진하기 (Enhance retention and transfer)"
];

const DEFAULT_STATE = {
  currentStep: 1,
  // 1단계: 수업 배경 및 기본 정보 (창원여고 박병준 교사 지도안 연동)
  topic: "고등학교 1학년 통합사회2-(3) 시장경제와 지속가능 발전 - 시장 실패와 정부의 경제적 개입",
  inquiry: "보이지 않는 손은 왜 종종 실패할까? 시장 실패에 대한 정부의 경제적 개입은 어느 정도의 선이 적절할까?",
  target: "고등학교 1학년 학생 (창원여고, 24명)",
  standards: "[10통사2-03-01] 자본주의의 역사적 전개 과정과 특징을 조사하고, 시장과 정부의 관계를 중심으로 다양한 삶의 방식을 비교 평가한다.\n[10통사2-03-02] 합리적 선택의 의미와 한계를 파악하고, 지속가능발전을 위해 요청되는 정부의 역할과 책임을 탐구한다.",
  environment: "1인 1디바이스(크롬북/태블릿), 무선 AP, 음성 녹음 마이크, Google Apps Script 백엔드",

  // 2단계: 앱 도입 의도 및 학습 경험 목표
  intent: "시장 실패(공공재, 독과점, 외부효과)와 정부 개입(규제, 보조금)에 대한 거시 경제 개념을 어려워하므로, 논쟁 토론 중 실시간 음성/텍스트 입력을 통해 입장을 정리해주고 AI 심화 발문을 제공하여 비판적·분석적 사고 역량을 신장시키고자 함.",
  goal: "모둠별 찬반 토론 내용을 실시간 요약·정리하고, 토론 흐름을 분석하여 비판적 사고를 자극하는 AI 심화 발문과 입장 비교 리포트를 자동 생성해주는 AI 토론수업 도우미 웹앱",

  // 3단계: 웹앱 핵심 기능 정의 (토론 수업 도우미 기능)
  features: [
    {
      id: "feat-1",
      title: "토론 음성 녹취 & 입장별 핵심 주장 실시간 요약",
      desc: "모둠 토론 음성(또는 텍스트)을 입력받아 정부 개입 찬성(시장 실패 보완) vs 반대(정부 실패/자율성) 입장별 핵심 주장과 근거를 실시간 항목별로 자동 요약해 주는 기능"
    },
    {
      id: "feat-2",
      title: "Upstage Solar-Pro3 연동 AI 심화 발문 생성기",
      desc: "토론의 맹점과 논리적 허점을 AI(Upstage API)가 분석하여, 비판적 사고를 촉진하는 맞춤형 반론 및 심화 탐구 질문을 실시간 제시해 주는 기능"
    },
    {
      id: "feat-3",
      title: "시장 실패 vs 정부 실패 찬반 대립 논거 비교 대시보드",
      desc: "공공재, 외부효과, 독과점 사례별로 학생들이 제시한 찬반 논거를 시각적 매트릭스로 비교 분석하고 토론 균형도를 나타내 주는 기능"
    },
    {
      id: "feat-4",
      title: "구글 시트 연동 토론 성찰 리포트 & 학급 공유 보드",
      desc: "모둠별 토론 기록, AI 심화 발문에 대한 답변, 최종 입장 성찰문을 구글 시트 DB에 저장하고 학급 전체 대시보드로 공유하는 백엔드 연동 기능"
    }
  ],

  // 4단계: 학습자 관점 웹앱 단계 설계 (3단계 핵심 기능 연계)
  steps: [
    {
      id: "step-1",
      type: "전체",
      gagne: "1. 주의 집중시키기 (Gain attention)",
      featureId: "feat-1",
      experience: "환경오염(외부효과) 사례 카드 제시 후 '정부가 어디까지 개입해야 하는가?' 딜레마 문제 상기"
    },
    {
      id: "step-2",
      type: "모둠",
      gagne: "6. 수행을 유도하기 (Elicit performance)",
      featureId: "feat-1",
      experience: "모둠별 찬반 토론 수행 시 음성 녹취 기능으로 발언을 기록하고 입장별 주요 근거 자동 요약 카드 확인"
    },
    {
      id: "step-3",
      type: "모둠",
      gagne: "7. 피드백 제공하기 (Provide feedback)",
      featureId: "feat-2",
      experience: "요약된 논거를 바탕으로 Upstage Solar AI가 생성한 '정부 실패의 부작용은 어떻게 극복할 것인가?' 등의 심화 발문 피드백에 대해 모둠 재토론 진행"
    },
    {
      id: "step-4",
      type: "개별",
      gagne: "8. 수행 기반 평가 실시하기 (Assess performance)",
      featureId: "feat-3",
      experience: "찬반 대립 논거 비교 대시보드에서 자신의 초기 입장과 최종 입장의 변화를 비교하고 합리적 개입선에 대한 성찰문 작성"
    },
    {
      id: "step-5",
      type: "전체",
      gagne: "9. 파지와 전이 촉진하기 (Enhance retention and transfer)",
      featureId: "feat-4",
      experience: "구글 시트 연동 학급 전체 토론 대시보드를 공유하며 시장과 정부의 조화로운 균형에 대한 최종 1줄 소감 제출"
    }
  ],
  apiKey: "up_jskRfswj0ZmfhlfDvjyVBSY81iuh2"
};

let appState = JSON.parse(JSON.stringify(DEFAULT_STATE));

document.addEventListener("DOMContentLoaded", () => {
  loadFromLocalStorage();
  initEventListeners();
  renderFeatures();
  renderSteps();
  updateLiveSummary();
  switchWizardStep(appState.currentStep || 1);
});

function loadFromLocalStorage() {
  const saved = localStorage.getItem("aiteacher_inperson_state");
  if (saved) {
    try {
      appState = JSON.parse(saved);
      if (!appState.features) appState.features = JSON.parse(JSON.stringify(DEFAULT_STATE.features));
    } catch (e) {
      console.error("Failed to parse local storage", e);
    }
  }

  document.getElementById("input-topic").value = appState.topic || "";
  document.getElementById("input-inquiry").value = appState.inquiry || "";
  document.getElementById("input-target").value = appState.target || "";
  document.getElementById("input-standards").value = appState.standards || "";
  document.getElementById("input-intent").value = appState.intent || "";
  document.getElementById("input-environment").value = appState.environment || "";
  document.getElementById("input-goal").value = appState.goal || "";
  document.getElementById("input-api-key").value = appState.apiKey || "";
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

  if (appState.currentStep === 5 && !document.getElementById("output-prompt").value) {
    generatePrompt();
  }
}

// Render Step 3: Core Features Manager
function renderFeatures() {
  const container = document.getElementById("features-container");
  container.innerHTML = "";

  appState.features.forEach((feat, index) => {
    const featEl = document.createElement("div");
    featEl.className = "feature-item";
    featEl.dataset.id = feat.id;

    featEl.innerHTML = `
      <div class="feature-item-header">
        <div class="feature-handle">
          <i class="fa-solid fa-cube"></i>
          <span>핵심 기능 ${index + 1}</span>
        </div>
        <button class="btn-delete-item btn-delete-feat" data-index="${index}" title="삭제"><i class="fa-solid fa-trash-can"></i></button>
      </div>

      <div class="form-group">
        <label><i class="fa-solid fa-heading"></i> 기능 명칭</label>
        <input type="text" class="feat-title-input" data-index="${index}" value="${feat.title || ''}" placeholder="기능 명칭을 입력하세요">
      </div>

      <div class="form-group">
        <label><i class="fa-solid fa-align-left"></i> 구체적 기능 설명</label>
        <textarea rows="2" class="feat-desc-input" data-index="${index}" placeholder="이 기능이 웹앱에서 구체적으로 어떤 작동을 하는지 적으세요.">${feat.desc || ''}</textarea>
      </div>
    `;

    featEl.querySelector(".feat-title-input").addEventListener("input", (e) => {
      appState.features[index].title = e.target.value;
      saveToLocalStorage();
      renderSteps();
    });

    featEl.querySelector(".feat-desc-input").addEventListener("input", (e) => {
      appState.features[index].desc = e.target.value;
      saveToLocalStorage();
    });

    featEl.querySelector(".btn-delete-feat").addEventListener("click", () => {
      appState.features.splice(index, 1);
      saveToLocalStorage();
      renderFeatures();
      renderSteps();
    });

    container.appendChild(featEl);
  });
}

// Render Step 4: Step Design & Feature Mapping
function renderSteps() {
  const container = document.getElementById("steps-container");
  container.innerHTML = "";

  appState.steps.forEach((step, index) => {
    const stepEl = document.createElement("div");
    stepEl.className = "step-item";
    stepEl.draggable = true;
    stepEl.dataset.id = step.id;
    stepEl.dataset.index = index;

    const optionsHtml = GAGNE_EVENTS.map(ev => 
      `<option value="${ev}" ${ev === step.gagne ? 'selected' : ''}>${ev}</option>`
    ).join('');

    const typeOptions = ["전체", "모둠", "개별"].map(t => 
      `<option value="${t}" ${t === (step.type || '전체') ? 'selected' : ''}>${t}</option>`
    ).join('');

    let featureOptions = `<option value="">-- 핵심 기능 연계 안함 --</option>`;
    appState.features.forEach(f => {
      featureOptions += `<option value="${f.id}" ${f.id === step.featureId ? 'selected' : ''}>${f.title || '무제 기능'}</option>`;
    });

    stepEl.innerHTML = `
      <div class="step-item-header">
        <div class="drag-handle">
          <i class="fa-solid fa-grip-vertical"></i>
          <span>단계 ${index + 1}</span>
          <span class="step-badge">${step.gagne.split(' ')[0]}</span>
        </div>
        <button class="btn-delete-item btn-delete-step" data-index="${index}" title="삭제"><i class="fa-solid fa-trash-can"></i></button>
      </div>

      <div class="form-group-row" style="display: grid; grid-template-columns: 1fr 2fr; gap: 10px; align-items: start;">
        <div class="form-group" style="margin-bottom: 0;">
          <label><i class="fa-solid fa-users"></i> 활동 형태</label>
          <select class="type-select" data-index="${index}">
            ${typeOptions}
          </select>
        </div>
        <div class="form-group" style="margin-bottom: 0;">
          <label><i class="fa-solid fa-layer-group"></i> 가네 수업 사태 선택</label>
          <select class="gagne-select" data-index="${index}">
            ${optionsHtml}
          </select>
        </div>
      </div>

      <div class="form-group" style="margin-top: 10px;">
        <label style="color: #c084fc;"><i class="fa-solid fa-link"></i> 연계할 핵심 기능 (3단계 연동)</label>
        <select class="feat-select" data-index="${index}">
          ${featureOptions}
        </select>
      </div>

      <div class="form-group" style="margin-top: 10px;">
        <label><i class="fa-solid fa-pen-nib"></i> 유도 학습 경험 및 인터랙션</label>
        <textarea rows="2" class="experience-input" data-index="${index}" placeholder="이 단계에서 연계 기능을 활용해 학습자가 경험할 화면, 인터랙션을 작성하세요.">${step.experience || ''}</textarea>
      </div>
    `;

    stepEl.querySelector(".type-select").addEventListener("change", (e) => {
      appState.steps[index].type = e.target.value;
      saveToLocalStorage();
      renderSteps();
    });

    stepEl.querySelector(".gagne-select").addEventListener("change", (e) => {
      appState.steps[index].gagne = e.target.value;
      saveToLocalStorage();
      renderSteps();
    });

    stepEl.querySelector(".feat-select").addEventListener("change", (e) => {
      appState.steps[index].featureId = e.target.value;
      saveToLocalStorage();
      renderSteps();
    });

    stepEl.querySelector(".experience-input").addEventListener("input", (e) => {
      appState.steps[index].experience = e.target.value;
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

// Drag and Drop for Step 4
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

  // Step 3 (Features)
  document.getElementById("summary-feature-count").innerText = appState.features.length;
  const featTreeContainer = document.getElementById("summary-features-list");
  featTreeContainer.innerHTML = "";

  if (appState.features.length === 0) {
    featTreeContainer.innerHTML = `<span class="empty-txt">등록된 핵심 기능이 없습니다.</span>`;
  } else {
    appState.features.forEach((ft, idx) => {
      const node = document.createElement("div");
      node.className = "tree-feature-node";
      node.innerHTML = `
        <div class="tree-feature-title">기능 ${idx + 1}: ${ft.title || '무제 기능'}</div>
        <div>${ft.desc || '(기능 설명 미작성)'}</div>
      `;
      featTreeContainer.appendChild(node);
    });
  }

  // Step 4 (Steps)
  document.getElementById("summary-step-count").innerText = appState.steps.length;
  const treeContainer = document.getElementById("summary-steps-list");
  treeContainer.innerHTML = "";

  if (appState.steps.length === 0) {
    treeContainer.innerHTML = `<span class="empty-txt">등록된 단계가 없습니다.</span>`;
  } else {
    appState.steps.forEach((st, idx) => {
      const linkedFeat = appState.features.find(f => f.id === st.featureId);
      const featTag = linkedFeat ? `<span class="badge-tag" style="margin-left: 5px; color: #c084fc;">[연계: ${linkedFeat.title}]</span>` : '';
      
      const node = document.createElement("div");
      node.className = "tree-step-node";
      node.innerHTML = `
        <div class="tree-step-title">단계 ${idx + 1}: ${st.gagne} <span class="badge-tag" style="margin-left: 5px; font-size: 0.7em;">${st.type || '전체'}</span> ${featTag}</div>
        <div>${st.experience || '(경험 내용 미작성)'}</div>
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

  // Add Feature (Step 3)
  document.getElementById("btn-add-feature").addEventListener("click", () => {
    const newFeat = {
      id: `feat-${Date.now()}`,
      title: "",
      desc: ""
    };
    appState.features.push(newFeat);
    saveToLocalStorage();
    renderFeatures();
    renderSteps();
  });

  // Add Step (Step 4)
  document.getElementById("btn-add-step").addEventListener("click", () => {
    const newStep = {
      id: `step-${Date.now()}`,
      type: "전체",
      gagne: GAGNE_EVENTS[0],
      featureId: "",
      experience: ""
    };
    appState.steps.push(newStep);
    saveToLocalStorage();
    renderSteps();
  });

  // Reset
  document.getElementById("btn-reset").addEventListener("click", () => {
    if (confirm("모든 작성 내용을 통합사회 (시장 실패 vs 정부 개입 토론 도우미) 예시 데이터로 초기화하시겠습니까?")) {
      appState = JSON.parse(JSON.stringify(DEFAULT_STATE));
      localStorage.removeItem("aiteacher_inperson_state");
      loadFromLocalStorage();
      renderFeatures();
      renderSteps();
      updateLiveSummary();
      switchWizardStep(1);
      showToast("통합사회 토론 도우미 예시 데이터로 초기화되었습니다.");
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

  // Format Features Section
  const featuresFormatted = appState.features.map((ft, i) => {
    return `[기능 ${i+1}] ${ft.title}
- 세부 구현 명세: ${ft.desc}`;
  }).join("\n\n");

  // Format Steps Section with Feature Linking
  const stepsFormatted = appState.steps.map((st, i) => {
    const linkedFeat = appState.features.find(f => f.id === st.featureId);
    const featStr = linkedFeat ? ` [연계 핵심기능: ${linkedFeat.title}]` : '';
    return `[Step ${i+1}] 활동 형태: ${st.type || '전체'} | 가네 사태: ${st.gagne}${featStr}
- 화면 및 학습 경험: ${st.experience}`;
  }).join("\n\n");

  const promptTemplate = `다음 명세서에 따라 구글 앱스스크립트(GAS) 기반 교육용 단일 페이지 웹앱(SPA)의 전체 코드를 작성해 줘. 프론트엔드(Index.html)와 백엔드(Code.gs) 코드를 모두 제공해 주어야 해.

1. 배경 및 목표
- 수업 주제(교과 및 단원): ${appState.topic}
- 탐구 질문: ${appState.inquiry}
- 성취기준 및 학습 목표: ${appState.standards}
- 학습 대상: ${appState.target}
- 디바이스 및 유의사항(학습 환경): ${appState.environment}

2. 사용자 분석
- 수업 의도 및 학생 분석: ${appState.intent}
- 디지털 도구로서 웹앱의 역할 및 핵심 목표: ${appState.goal}

3. 핵심 기능 정의
${featuresFormatted}

4. 화면의 흐름 (가네의 9가지 수업 사태 & 핵심 기능 연계 시나리오)
${stepsFormatted}

5. 참고자료
- 기술 스택: 구글 앱스스크립트(Code.gs), HTML5, Vanilla JavaScript, CSS (Vanilla CSS 또는 Tailwind CDN)
- AI API 연동 가이드 및 레퍼런스 코드 (Upstage Solar-Pro3 Integration):
  * Upstage API Key: "${appState.apiKey || 'up_jskRfswj0ZmfhlfDvjyVBSY81iuh2'}"
  * Base URL: "https://api.upstage.ai/v1"
  * Target Model: "solar-pro3"
  * 백엔드(Code.gs) 또는 프론트엔드 API 호출 방식 예시:
\`\`\`javascript
// Upstage Chat Completions API Call Reference
const apiKey = "${appState.apiKey || 'up_jskRfswj0ZmfhlfDvjyVBSY81iuh2'}";
const response = await fetch("https://api.upstage.ai/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": \`Bearer \${apiKey}\`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: "solar-pro3",
    messages: [
      { role: "system", content: "당신은 고등학교 통합사회 논쟁 토론 수업을 지원하는 AI 퍼실리테이터입니다." },
      { role: "user", content: "모둠별 토론 내용 분석 및 심화 질문 생성" }
    ],
    stream: false
  })
});
const data = await response.json();
console.log(data.choices[0].message.content);
\`\`\`

- 구글시트 데이터베이스 아키텍처:
  * 탭 1 명칭: [토론_학습자_기록]
    - 헤더 명칭: 타임스탬프, 학습자ID, 모둠번호, 성명, 찬반입장, 최종성찰문, 접속디바이스
  * 탭 2 명칭: [토론_실시간_반응데이터]
    - 헤더 명칭: 타임스탬프, 모둠번호, 발언단계, 가네수업사태, 연계기능명, 발언녹취내용, AI심화발문, 학생재응답
`;

  document.getElementById("output-prompt").value = promptTemplate;
  showToast("통합사회 토론 도우미 기반 최종 프롬프트가 산출되었습니다!");
}

async function generateWithUpstage() {
  saveToLocalStorage();
  const apiKey = appState.apiKey || "up_jskRfswj0ZmfhlfDvjyVBSY81iuh2";

  const loadingEl = document.getElementById("prompt-loading");
  loadingEl.style.display = "flex";

  generatePrompt();
  const basePrompt = document.getElementById("output-prompt").value;

  try {
    const response = await fetch("https://api.upstage.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "solar-pro3",
        messages: [
          {
            role: "system",
            content: "당신은 가네(Gagné)의 수업 사태 기반 교수설계와 구글 앱스스크립트(GAS) 바이브코딩에 특화된 수석 AI 교육공학자입니다. 제공된 프롬프트를 보완하여 교사들이 Google AI Studio에서 바로 사용할 수 있는 압도적 품질의 마스터 바이브코딩 프롬프트로 다듬어주세요."
          },
          {
            role: "user",
            content: `다음 초안 프롬프트를 교육공학적 깊이와 구글 앱스스크립트(GAS) 아키텍처 관점에서 더 전문적이고 명확하게 다듬어 보완된 프롬프트 전문만 출력해줘:\n\n${basePrompt}`
          }
        ],
        stream: false
      })
    });

    if (!response.ok) throw new Error(`API Error: ${response.status}`);

    const data = await response.json();
    document.getElementById("output-prompt").value = data.choices[0].message.content;
    showToast("Upstage Solar Pro가 프롬프트를 성공적으로 다듬었습니다!");

  } catch (err) {
    console.error("Upstage API Error:", err);
    showToast("Upstage API 호출 실패. 기본 생성 프롬프트를 유지합니다.");
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
