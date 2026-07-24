/**
 * AI Teacher 2026 - Inperson Prompt Generator Engine
 * 5-Step Wizard Engine with Feature Definition & App Step Mapping (Social Studies Example)
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
  // 1단계: 수업 배경 및 기본 정보 (사회과 예시)
  topic: "사회 5학년 2학기 1. 체계적 경제 활동과 합리적 선택 (3차시)",
  inquiry: "한정된 예산 속에서 최선의 만족을 얻는 '합리적 선택'은 어떻게 할까?",
  target: "초등학교 5학년 2반 (22명)",
  standards: "[5사04-01] 자원의 희소성으로 인해 선택의 문제가 발생함을 이해하고, 일상생활에서 합리적으로 선택하는 방법을 탐구한다.",
  environment: "1인 1디바이스(크롬북/태블릿), 교실 무선 AP, 구글 클래스룸 연동",

  // 2단계: 앱 도입 의도 및 핵심 목표
  intent: "학생들이 용돈 관리 시 기회비용 개념을 어려워하므로, 직접 가상 선택을 해보며 기회비용과 만족도를 실시간으로 비교·평가하는 모의시뮬레이션 경험을 제공하고자 함.",
  goal: "가상 예산 안에서 다양한 선택지의 기회비용과 이익을 시뮬레이션하고, 선택 결과에 따른 합리성 피드백을 통해 올바른 의사결정 능력을 함양하는 사회과 학습용 웹앱",

  // 3단계: 웹앱 핵심 기능 정의 (선생님이 직접 등록하는 기능 목록)
  features: [
    {
      id: "feat-1",
      title: "선택지별 기회비용 & 만족도 실시간 계산기",
      desc: "대안(예: 학용품 vs 간식 vs 저축) 선택 시 포기한 대안 중 가장 가치가 큰 기회비용과 기대 만족도 수치를 라이브로 비교 산출하는 기능"
    },
    {
      id: "feat-2",
      title: "돌발 상충 변수 시뮬레이터 (예산 제약 조건)",
      desc: "갑작스러운 예산 감소(예: 가격 인상, 긴급 지출) 시 분기 조건에 따라 대안을 수정하도록 유도하는 동적 시뮬레이션 기능"
    },
    {
      id: "feat-3",
      title: "합리적 선택 피드백 & 레이더 차트 분석",
      desc: "최종 선택 완료 후 기회비용 대비 만족도 효율성을 점수화하고 '합리적 소비왕' 뱃지 및 시각 피드백 제공 기능"
    },
    {
      id: "feat-4",
      title: "학급 합리적 선택 데이터 공유 보드 (구글 시트 연동)",
      desc: "모둠/학급 학생들의 선택 결과와 그 이유를 구글 시트에 저장하여 실시간 그래프와 학급 통계로 공유하는 기능"
    }
  ],

  // 4단계: 학습자 관점 웹앱 단계 설계 (3단계 핵심 기능과 연계)
  steps: [
    {
      id: "step-1",
      type: "전체",
      gagne: "1. 주의 집중시키기 (Gain attention)",
      featureId: "feat-1",
      experience: "한정된 용돈(10,000원)으로 사고 싶은 것들을 마주했을 때 발생하는 선택의 갈등 상황 애니메이션 제시"
    },
    {
      id: "step-2",
      type: "개별",
      gagne: "5. 학습 안내 제시하기 (Provide learning guidance)",
      featureId: "feat-1",
      experience: "선택지 A, B, C를 클릭해 보며 각 선택 시 발생하는 기회비용과 이익 수치가 실시간 계산기로 시각화되는 화면 안내"
    },
    {
      id: "step-3",
      type: "모둠",
      gagne: "6. 수행을 유도하기 (Elicit performance)",
      featureId: "feat-2",
      experience: "모둠별로 '갑작스러운 가격 인상' 돌발 변수 시뮬레이터를 작동시켜 제한 시간 내에 가장 합리적인 대안으로 재조정하는 미션 수행"
    },
    {
      id: "step-4",
      type: "개별",
      gagne: "7. 피드백 제공하기 (Provide feedback)",
      featureId: "feat-3",
      experience: "자신이 내린 최종 결정의 합리성 점수와 기회비용 분석 레이더 차트 리포트 확인 및 맞춤형 피드백 뱃지 획득"
    },
    {
      id: "step-5",
      type: "전체",
      gagne: "9. 파지와 전이 촉진하기 (Enhance retention and transfer)",
      featureId: "feat-4",
      experience: "학급 전체의 선택 이유 통계를 구글 시트 연동 공유 보드로 비교하고, 실생활 합리적 소비 다짐 한마디 작성하기"
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
        <input type="text" class="feat-title-input" data-index="${index}" value="${feat.title || ''}" placeholder="기능 명칭을 입력하세요 (예: 선택지별 기회비용 실시간 계산기)">
      </div>

      <div class="form-group">
        <label><i class="fa-solid fa-align-left"></i> 구체적 기능 설명</label>
        <textarea rows="2" class="feat-desc-input" data-index="${index}" placeholder="이 기능이 웹앱에서 구체적으로 어떤 작동을 하는지 적으세요.">${feat.desc || ''}</textarea>
      </div>
    `;

    featEl.querySelector(".feat-title-input").addEventListener("input", (e) => {
      appState.features[index].title = e.target.value;
      saveToLocalStorage();
      renderSteps(); // Update step dropdown options
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

    // Feature Options dropdown dynamically built from Step 3
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
    if (confirm("모든 작성 내용을 사회과(합리적 선택) 기본 예시 데이터로 초기화하시겠습니까?")) {
      appState = JSON.parse(JSON.stringify(DEFAULT_STATE));
      localStorage.removeItem("aiteacher_inperson_state");
      loadFromLocalStorage();
      renderFeatures();
      renderSteps();
      updateLiveSummary();
      switchWizardStep(1);
      showToast("데이터가 사회과 예시로 초기화되었습니다.");
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
- 구글시트 데이터베이스 아키텍처:
  * 탭 1 명칭: [학습자_기록]
    - 헤더 명칭: 타임스탬프, 학습자ID, 성명, 현재단계, 총점수, 접속환경, 최종완료여부
  * 탭 2 명칭: [단계별_반응데이터]
    - 헤더 명칭: 타임스탬프, 학습자ID, 단계번호, 가네수업사태, 연계기능명, 제출답안/인터랙션기록, 피드백내용
`;

  document.getElementById("output-prompt").value = promptTemplate;
  showToast("사회과 교수설계 기반 최종 프롬프트가 산출되었습니다!");
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
