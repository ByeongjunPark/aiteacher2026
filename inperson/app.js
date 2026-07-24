/**
 * AI Teacher 2026 - Inperson Prompt Generator Engine
 * Multi-Step Wizard Engine with LocalStorage & Upstage Solar Pro
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
  target: "초등학교 5학년 학생 (20명)",
  standards: "[6실05-02] 문제 해결 과정에서 조건에 따른 실생활 분기 구조를 이해하고 블록 코딩으로 구현한다.",
  motivation: "퀴즈 기반 보상 시스템, 실황 애니메이션 시각 피드백, 도전 과제 점수판",
  environment: "1인 1크롬북, 교실 무선 네트워크, 구글 계정 보유, 40분 1차시 수업 환경",
  goal: "학습자가 주어진 조건(예: 온도/습도)을 조작해보며 실시간 결과 변화를 관찰하고, 직접 알고리즘 조건문의 동작 원리를 귀납적으로 탐구하도록 함",
  steps: [
    {
      id: "step-1",
      gagne: "1. 주의 집중시키기 (Gain attention)",
      experience: "스마트홈 온도 센서 인터랙티브 시뮬레이션으로 흥미를 자극하고 실생활 문제를 제시함"
    },
    {
      id: "step-2",
      gagne: "5. 학습 안내 제시하기 (Provide learning guidance)",
      experience: "슬라이더로 온도를 조절할 때 에어컨이 켜지는 '만약 ~라면' 조건문 카드를 시각적으로 맞춰보게 가이드함"
    },
    {
      id: "step-3",
      gagne: "6. 수행을 유도하기 (Elicit performance)",
      experience: "3가지 미션(자동문, 에어컨, 가로등) 상황에 맞는 조건을 직접 작성해보고 [실행하기] 버튼을 누름"
    },
    {
      id: "step-4",
      gagne: "7. 피드백 제공하기 (Provide feedback)",
      experience: "성공 시 축하 폭죽 애니메이션과 뱃지 지급, 실패 시 힌트 말풍선(선택지 재제시)을 띄워줌"
    }
  ],
  apiKey: ""
};

let appState = JSON.parse(JSON.stringify(DEFAULT_STATE));

document.addEventListener("DOMContentLoaded", () => {
  loadFromLocalStorage();
  initEventListeners();
  renderSteps();
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

  document.getElementById("input-target").value = appState.target || "";
  document.getElementById("input-standards").value = appState.standards || "";
  document.getElementById("input-motivation").value = appState.motivation || "";
  document.getElementById("input-environment").value = appState.environment || "";
  document.getElementById("input-goal").value = appState.goal || "";
  document.getElementById("input-api-key").value = appState.apiKey || "";
}

function saveToLocalStorage() {
  appState.target = document.getElementById("input-target").value;
  appState.standards = document.getElementById("input-standards").value;
  appState.motivation = document.getElementById("input-motivation").value;
  appState.environment = document.getElementById("input-environment").value;
  appState.goal = document.getElementById("input-goal").value;
  appState.apiKey = document.getElementById("input-api-key").value;

  localStorage.setItem("aiteacher_inperson_state", JSON.stringify(appState));
}

// Wizard Step Switcher
function switchWizardStep(stepNum) {
  appState.currentStep = parseInt(stepNum);
  saveToLocalStorage();

  // Hide all step views
  document.querySelectorAll(".wizard-step-view").forEach(view => {
    view.classList.remove("active");
  });

  // Show target view
  const targetView = document.getElementById(`view-step-${stepNum}`);
  if (targetView) {
    targetView.classList.add("active");
  }

  // Update Progress Indicator Nodes
  const nodes = document.querySelectorAll(".step-node");
  nodes.forEach(node => {
    const nodeStep = parseInt(node.dataset.stepTarget);
    node.classList.remove("active", "completed");
    if (nodeStep === appState.currentStep) {
      node.classList.add("active");
    } else if (nodeStep < appState.currentStep) {
      node.classList.add("completed");
    }
  });

  // Update Progress Track Bar
  const progressPercent = ((appState.currentStep - 1) / 3) * 100;
  document.getElementById("progress-fill").style.width = `${progressPercent}%`;

  // Auto generate if arriving at Step 4
  if (appState.currentStep === 4 && !document.getElementById("output-prompt").value) {
    generatePrompt();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function initEventListeners() {
  // Input Auto-save
  const inputs = document.querySelectorAll("input, textarea");
  inputs.forEach(input => {
    input.addEventListener("input", saveToLocalStorage);
  });

  // Wizard Step Navigation Click Handlers
  document.querySelectorAll(".step-node").forEach(node => {
    node.addEventListener("click", () => {
      switchWizardStep(node.dataset.stepTarget);
    });
  });

  document.querySelectorAll(".btn-next-step").forEach(btn => {
    btn.addEventListener("click", () => {
      switchWizardStep(btn.dataset.next);
    });
  });

  document.querySelectorAll(".btn-prev-step").forEach(btn => {
    btn.addEventListener("click", () => {
      switchWizardStep(btn.dataset.prev);
    });
  });

  // Add Step
  document.getElementById("btn-add-step").addEventListener("click", () => {
    const newStep = {
      id: `step-${Date.now()}`,
      gagne: GAGNE_EVENTS[0],
      experience: ""
    };
    appState.steps.push(newStep);
    saveToLocalStorage();
    renderSteps();
  });

  // Reset
  document.getElementById("btn-reset").addEventListener("click", () => {
    if (confirm("모든 입력 내역을 초기 상태로 리셋하시겠습니까?")) {
      appState = JSON.parse(JSON.stringify(DEFAULT_STATE));
      localStorage.removeItem("aiteacher_inperson_state");
      loadFromLocalStorage();
      renderSteps();
      switchWizardStep(1);
      showToast("모든 데이터가 초기화되었습니다.");
    }
  });

  // Generate Buttons
  document.getElementById("btn-generate").addEventListener("click", () => {
    generatePrompt();
  });

  document.getElementById("btn-generate-upstage").addEventListener("click", () => {
    generateWithUpstage();
  });

  // Copy Prompt
  document.getElementById("btn-copy-prompt").addEventListener("click", () => {
    const promptText = document.getElementById("output-prompt").value;
    if (!promptText) {
      showToast("복사할 프롬프트가 없습니다.");
      return;
    }
    navigator.clipboard.writeText(promptText).then(() => {
      showToast("프롬프트가 복사되었습니다! Google AI Studio로 이동해 붙여넣으세요.");
    });
  });

  // Upstage API Modal
  const modal = document.getElementById("modal-api");
  document.getElementById("btn-api-modal").addEventListener("click", () => {
    modal.style.display = "flex";
  });
  document.getElementById("btn-close-modal").addEventListener("click", () => {
    modal.style.display = "none";
  });
  document.getElementById("btn-save-api-key").addEventListener("click", () => {
    saveToLocalStorage();
    modal.style.display = "none";
    showToast("Upstage API Key가 저장되었습니다.");
  });

  // Tabs
  const tabBtns = document.querySelectorAll(".tab-btn");
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");
    });
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

    stepEl.innerHTML = `
      <div class="step-item-header">
        <div class="drag-handle">
          <i class="fa-solid fa-grip-vertical"></i>
          <span>단계 ${index + 1}</span>
          <span class="step-badge">${step.gagne.split(' ')[0]}</span>
        </div>
        <button class="btn-delete-step" data-index="${index}" title="삭제"><i class="fa-solid fa-trash-can"></i></button>
      </div>

      <div class="form-group">
        <label><i class="fa-solid fa-layer-group"></i> 가네 수업 사태 선택</label>
        <select class="gagne-select" data-index="${index}">
          ${optionsHtml}
        </select>
      </div>

      <div class="form-group">
        <label><i class="fa-solid fa-pen-nib"></i> 유도하는 학습 경험 및 상호작용</label>
        <textarea rows="2" class="experience-input" data-index="${index}" placeholder="이 단계에서 학습자가 경험할 화면, 인터랙션, 반응을 구체적으로 쓰세요.">${step.experience || ''}</textarea>
      </div>
    `;

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
  if (e.preventDefault) { e.preventDefault(); }
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

function handleDragEnd() {
  this.classList.remove("dragging");
}

function generatePrompt() {
  saveToLocalStorage();

  const stepsFormatted = appState.steps.map((st, i) => {
    return `[단계 ${i+1}]
- 가네 수업 사태: ${st.gagne}
- 학습 경험 및 구체적 구현 요청: ${st.experience}`;
  }).join("\n\n");

  const promptTemplate = `당신은 구글 앱스스크립트(Google Apps Script, GAS) 기반 교육용 웹 어플리케이션 제작에 최고의 전문성을 가진 시니어 바이브코딩(Vibe Coding) 프롬프트 엔지니어이자 교육공학자입니다.

아래 작성된 [체계적 교수설계 명세서]를 엄격히 준수하여, 사용자가 개발할 교육용 웹앱의 구체적인 프론트엔드(\`Index.html\`), 백엔드(\`Code.gs\`), 그리고 구글 시트 탭 별 데이터 헤더 양식을 완벽하게 작성할 수 있도록 **"최고 품질의 앱스스크립트 전용 생성 프롬프트"**를 도출해 주세요.

==============================================
[체계적 교수설계 명세서 (Instructional Design Specification)]
==============================================
1. 학습 대상: ${appState.target}
2. 성취기준 / 학습 목표: ${appState.standards}
3. 학습자 동기 설계: ${appState.motivation}
4. 학습 환경: ${appState.environment}
5. 웹앱 학습경험 최종 목표: ${appState.goal}

6. 학습자 관점 웹앱 단계별 시나리오 (가네의 수업 사태 연계):
${stepsFormatted}

==============================================
[AI 모델에 전달할 지시사항 (App Blueprint Guidelines)]
==============================================
위 명세서에 맞춰 제작될 웹앱은 반드시 구글 앱스스크립트(GAS) 환경에서 구동되는 단일 페이지 웹앱(SPA)이어야 합니다.
다음에 지정된 3가지 핵심 출력물 아키텍처를 정확히 반영하여 웹앱 소스코드를 생성할 수 있는 완벽하고 구체적인 프롬프트를 작성해주세요.

1. 프론트엔드 (Index.html):
- HTML5, Vanilla JavaScript, Tailwind CSS (CDN) 또는 Modern Glassmorphism Vanilla CSS 활용.
- 모바일/크롬북 반응형 레이아웃 적용.
- 교수설계의 각 단계(Step)별 인터랙티브 학습 화면 구현.
- google.script.run API를 통한 비동기 데이터 송수신 처리.

2. 백엔드 (Code.gs):
- doGet(e) 함수를 통해 Index.html 템플릿 반환.
- saveData(studentData), loadData(studentId) 등 실시간 학습자 반응 및 진행 상황을 구글 시트에 기록하고 불러오는 백엔드 함수 포함.
- 에러 핸들링 및 JSON 반환 구조 완비.

3. 구글 시트 데이터베이스 (Tab & Header Schema):
- 탭 1: [학습자_기록] (타임스탬프, 학습자ID, 성명, 현재단계, 총점수, 접속환경, 최종완료여부)
- 탭 2: [단계별_반응데이터] (타임스탬프, 학습자ID, 단계번호, 가네수업사태, 제출답안/인터랙션기록, 피드백내용)

위 아키텍처를 토대로 AI가 코드를 즉시 작성할 수 있도록 명확하고 체계적인 마스터 바이브코딩 프롬프트를 제시해 주십시오.`;

  document.getElementById("output-prompt").value = promptTemplate;
  showToast("체계적 교수설계 바이브코딩 프롬프트가 산출되었습니다!");
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

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    const refinedPrompt = data.choices[0].message.content;

    document.getElementById("output-prompt").value = refinedPrompt;
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
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}
