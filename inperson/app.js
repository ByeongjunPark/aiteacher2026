/**
 * AI Teacher 2026 - Inperson Prompt Generator Engine
 * Split Layout & Live Accumulating Summary Board Engine
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
  topic: "5단원 재미있는 코딩 (2차시)",
  inquiry: "조건문이란 무엇이며 실생활에서 어떻게 쓰일까?",
  target: "초등학교 5학년 학생 (20명)",
  standards: "[6실05-02] 문제 해결 과정에서 조건에 따른 분기 구조를 이해한다.",
  intent: "학생들이 분기 구조를 어려워하여, 시뮬레이션을 통해 직관적으로 깨닫게 함",
  environment: "1인 1크롬북, 교실 무선 네트워크 접속",
  goal: "조건값을 직접 조작하며 결과 변화를 관찰하고 피드백을 얻는 시뮬레이터 역할",
  steps: [
    {
      id: "step-1",
      type: "전체",
      gagne: "1. 주의 집중시키기 (Gain attention)",
      experience: "스마트홈 온도 센서 시뮬레이션으로 흥미를 자극하고 실생활 문제 제시"
    },
    {
      id: "step-2",
      type: "전체",
      gagne: "5. 학습 안내 제시하기 (Provide learning guidance)",
      experience: "슬라이더 조절 시 에어컨이 켜지는 '만약 ~라면' 조건문 시각 카드로 안내"
    },
    {
      id: "step-3",
      type: "개별",
      gagne: "6. 수행을 유도하기 (Elicit performance)",
      experience: "3가지 미션(자동문, 에어컨, 가로등) 상황의 조건을 직접 세팅해보는 미션 수행"
    },
    {
      id: "step-4",
      type: "개별",
      gagne: "7. 피드백 제공하기 (Provide feedback)",
      experience: "성공 시 폭죽 애니메이션/뱃지, 실패 시 힌트 말풍선 제공"
    }
  ],
  apiKey: "up_jskRfswj0ZmfhlfDvjyVBSY81iuh2"
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

  if (appState.currentStep === 4 && !document.getElementById("output-prompt").value) {
    generatePrompt();
  }
}

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

  // Step 3
  document.getElementById("summary-step-count").innerText = appState.steps.length;
  const treeContainer = document.getElementById("summary-steps-list");
  treeContainer.innerHTML = "";

  if (appState.steps.length === 0) {
    treeContainer.innerHTML = `<span class="empty-txt">등록된 단계가 없습니다.</span>`;
  } else {
    appState.steps.forEach((st, idx) => {
      const node = document.createElement("div");
      node.className = "tree-step-node";
      node.innerHTML = `
        <div class="tree-step-title">단계 ${idx + 1}: ${st.gagne} <span class="badge-tag" style="margin-left: 5px; font-size: 0.7em;">${st.type || '전체'}</span></div>
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

  // Add Step
  document.getElementById("btn-add-step").addEventListener("click", () => {
    const newStep = {
      id: `step-${Date.now()}`,
      type: "전체",
      gagne: GAGNE_EVENTS[0],
      experience: ""
    };
    appState.steps.push(newStep);
    saveToLocalStorage();
    renderSteps();
  });

  // Reset
  document.getElementById("btn-reset").addEventListener("click", () => {
    if (confirm("모든 작성 내용을 초기화하시겠습니까?")) {
      appState = JSON.parse(JSON.stringify(DEFAULT_STATE));
      localStorage.removeItem("aiteacher_inperson_state");
      loadFromLocalStorage();
      renderSteps();
      updateLiveSummary();
      switchWizardStep(1);
      showToast("데이터가 초기화되었습니다.");
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

    stepEl.innerHTML = `
      <div class="step-item-header">
        <div class="drag-handle">
          <i class="fa-solid fa-grip-vertical"></i>
          <span>단계 ${index + 1}</span>
          <span class="step-badge">${step.gagne.split(' ')[0]}</span>
        </div>
        <button class="btn-delete-step" data-index="${index}" title="삭제"><i class="fa-solid fa-trash-can"></i></button>
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

      <div class="form-group" style="margin-top: 15px;">
        <label><i class="fa-solid fa-pen-nib"></i> 유도 학습 경험</label>
        <textarea rows="2" class="experience-input" data-index="${index}" placeholder="이 단계에서 학습자가 경험할 화면, 인터랙션을 쓰세요.">${step.experience || ''}</textarea>
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

function generatePrompt() {
  saveToLocalStorage();

  const stepsFormatted = appState.steps.map((st, i) => {
    return `[Step ${i+1}] 활동 형태: ${st.type || '전체'} | ${st.gagne}
- 화면 및 학습 경험: ${st.experience}`;
  }).join("\n\n");

  const promptTemplate = `다음 명세서에 따라 구글 앱스스크립트(GAS) 기반 교육용 단일 페이지 웹앱(SPA)의 전체 코드를 작성해 줘. 프론트엔드(Index.html)와 백엔드(Code.gs) 코드를 모두 제공해 주어야 해.

1. 배경 및 목표
- 수업 주제(단원): ${appState.topic}
- 탐구 질문: ${appState.inquiry}
- 성취기준 및 학습 목표: ${appState.standards}
- 학습 대상: ${appState.target}
- 디바이스 및 유의사항(학습 환경): ${appState.environment}

2. 사용자 분석
- 수업 의도 및 학생 분석: ${appState.intent}
- 디지털 도구로서 웹앱의 역할 및 핵심 기능: ${appState.goal}

3. 핵심 기능 정의
- 교수설계가 반영된 인터랙티브 UI 및 즉각적 피드백 시스템 제공
- google.script.run 비동기 API를 사용한 실시간 구글 시트 데이터 저장(saveData) 및 로드(loadData) 처리
- 학생용 크롬북 및 모바일 디바이스에 완벽히 호환되는 반응형 UI 구성

4. 화면의 흐름 (가네의 9가지 수업 사태 연계)
${stepsFormatted}

5. 참고자료
- 기술 스택: 구글 앱스스크립트(Code.gs), HTML5, Vanilla JavaScript, CSS (Vanilla CSS 또는 Tailwind CDN)
- 구글시트 데이터베이스 아키텍처:
  * 탭 1 명칭: [학습자_기록]
    - 헤더 명칭: 타임스탬프, 학습자ID, 성명, 현재단계, 총점수, 접속환경, 최종완료여부
  * 탭 2 명칭: [단계별_반응데이터]
    - 헤더 명칭: 타임스탬프, 학습자ID, 단계번호, 가네수업사태, 제출답안/인터랙션기록, 피드백내용
`;

  document.getElementById("output-prompt").value = promptTemplate;
  showToast("코드를 생성하는 최종 프롬프트가 산출되었습니다!");
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
