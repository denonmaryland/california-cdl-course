(function () {
  const COURSE = window.CDL_COURSE;
  const STORAGE_KEY = "ca-cdl-course-progress-v2";

  const els = {
    overallProgress: document.getElementById("overallProgress"),
    readinessScore: document.getElementById("readinessScore"),
    streakCount: document.getElementById("streakCount"),
    todaysPlan: document.getElementById("todaysPlan"),
    syncStripToggle: document.getElementById("syncStripToggle"),
    syncStripBody: document.getElementById("syncStripBody"),
    focusContinue: document.getElementById("focusContinue"),
    focusPractice: document.getElementById("focusPractice"),
    focusSimulator: document.getElementById("focusSimulator"),
    continueButton: document.getElementById("continueButton"),
    resetProgress: document.getElementById("resetProgress"),
    moduleCount: document.getElementById("moduleCount"),
    moduleList: document.getElementById("moduleList"),
    moduleMeta: document.getElementById("moduleMeta"),
    moduleTitle: document.getElementById("moduleTitle"),
    moduleSummary: document.getElementById("moduleSummary"),
    lessonList: document.getElementById("lessonList"),
    prevModule: document.getElementById("prevModule"),
    nextModule: document.getElementById("nextModule"),
    tabs: Array.from(document.querySelectorAll(".tab-button")),
    panels: Array.from(document.querySelectorAll("[data-panel]")),
    practiceType: document.getElementById("practiceType"),
    questionCount: document.getElementById("questionCount"),
    startPractice: document.getElementById("startPractice"),
    practiceArea: document.getElementById("practiceArea"),
    simulatorArea: document.getElementById("simulatorArea"),
    flashcardArea: document.getElementById("flashcardArea"),
    endorsementsArea: document.getElementById("endorsementsArea"),
    reviewArea: document.getElementById("reviewArea"),
    sourcesArea: document.getElementById("sourcesArea"),
    lessonTemplate: document.getElementById("lessonTemplate")
  };

  const allLessons = COURSE.modules.flatMap((module) =>
    module.lessons.map((lesson) => ({ ...lesson, moduleId: module.id }))
  );
  const simulatorConfigs = [
    { id: "class-a", label: "Class A Full Mix", count: 100, description: "General Knowledge, Air Brakes, Combination Vehicles, cargo, and light endorsement coverage.", filter: (question) => ["general", "air-brakes", "combination", "cargo", "endorsements"].includes(question.exam) },
    { id: "general", label: "General Knowledge", count: 50, description: "Inspection, speed, space, hazards, weather, emergencies, railroad crossings, and safe driving rules.", filter: (question) => question.exam === "general" },
    { id: "air-brakes", label: "Air Brakes", count: 30, description: "Air system parts, warning devices, spring brakes, leakage tests, build rate, and low-air behavior.", filter: (question) => question.exam === "air-brakes" },
    { id: "combination", label: "Combination Vehicles", count: 30, description: "Rollover, crack-the-whip, offtracking, backing, coupling systems, air lines, and uncoupling.", filter: (question) => question.exam === "combination" },
    { id: "cargo", label: "Cargo and Securement", count: 25, description: "Cargo inspection, legal weight, balance, center of gravity, blocking, bracing, and tie-down thinking.", filter: (question) => question.exam === "cargo" },
    { id: "doubles-triples", label: "Doubles/Triples T", count: 20, description: "Converter dollies, rearward amplification, shut-off valves, multi-trailer air checks, and space.", filter: (question) => question.topic === "Doubles/Triples" },
    { id: "tanker", label: "Tank Vehicles N", count: 20, description: "Surge, outage, baffles, bulkheads, high center of gravity, and smooth tanker control.", filter: (question) => question.topic === "Tanker" },
    { id: "hazmat", label: "HazMat H", count: 25, description: "Shipping papers, placards, loading rules, parking, incidents, and endorsement requirements.", filter: (question) => question.topic === "HazMat" },
    { id: "tank-hazmat", label: "Tank + HazMat X", count: 30, description: "Combined tanker and hazardous-material logic for drivers pursuing the X endorsement path.", filter: (question) => ["Tanker", "HazMat"].includes(question.topic) },
    { id: "passenger", label: "Passenger P", count: 20, description: "Passenger loading, exits, safe stops, supervision, railroad crossings, and prohibited practices.", filter: (question) => question.topic === "Passenger" },
    { id: "school-bus", label: "School Bus S", count: 20, description: "Danger zones, mirror systems, loading and unloading, student management, evacuation, and crossings.", filter: (question) => question.topic === "School Bus" }
  ];

  let state = loadState();
  let activeModuleId = state.activeModuleId || COURSE.modules[0].id;
  let activeMode = "learn";
  let practiceSession = null;
  let simulatorSession = null;
  let flashcardQueue = [];
  let flashcardIndex = 0;
  let cloudSync = null;

  init();

  function init() {
    touchStudyDay();
    renderAll();
    bindEvents();
    initCloudSync();
  }

  function bindEvents() {
    els.continueButton.addEventListener("click", () => {
      continueLearning();
    });
    els.focusContinue.addEventListener("click", continueLearning);
    els.focusPractice.addEventListener("click", () => {
      setMode("practice");
      els.practiceType.value = "class-a";
      els.questionCount.value = "10";
      startPractice("class-a", 10);
      scrollToPanel("practice");
    });
    els.focusSimulator.addEventListener("click", () => {
      setMode("simulator", { scroll: true });
    });

    if (els.syncStripToggle) {
      els.syncStripToggle.addEventListener("click", () => {
        const strip = els.syncStripToggle.closest(".sync-strip");
        const expanded = strip.classList.toggle("open");
        els.syncStripToggle.setAttribute("aria-expanded", String(expanded));
      });
    }

    els.resetProgress.addEventListener("click", () => {
      const confirmed = window.confirm("Reset local course progress, quiz history, and flashcard scheduling?");
      if (!confirmed) return;
      localStorage.removeItem(STORAGE_KEY);
      state = loadState();
      activeModuleId = COURSE.modules[0].id;
      practiceSession = null;
      flashcardQueue = [];
      flashcardIndex = 0;
      renderAll();
    });

    els.prevModule.addEventListener("click", () => moveModule(-1));
    els.nextModule.addEventListener("click", () => moveModule(1));

    els.tabs.forEach((tab) => {
      tab.addEventListener("click", () => setMode(tab.dataset.mode));
    });

    els.startPractice.addEventListener("click", () => {
      startPractice(els.practiceType.value, Number(els.questionCount.value));
    });
  }

  function renderAll() {
    renderDashboard();
    renderModules();
    renderActiveModule();
    renderPracticeIntro();
    renderSimulatorIntro();
    renderFlashcards();
    renderEndorsementHub();
    renderReview();
    renderSources();
  }

  function renderDashboard() {
    const percent = Math.round((completedCount() / allLessons.length) * 100);
    els.overallProgress.textContent = `${percent}%`;
    els.readinessScore.textContent = `${calculateReadiness()}%`;
    els.streakCount.textContent = String(state.streak.count || 0);
    renderTodaysPlan();
  }

  function buildTodaysPlan() {
    const actions = [];

    // 1. Due flashcards
    const dueCards = getDueFlashcards();
    if (dueCards.length > 0) {
      actions.push({
        icon: "🃏",
        label: `${dueCards.length} flashcard${dueCards.length > 1 ? "s" : ""} due`,
        detail: "Spaced repetition – keep recall sharp",
        fn: () => { setMode("flashcards"); scrollToPanel("flashcards"); }
      });
    }

    // 2. Missed questions
    const missedEntries = Object.entries(state.missedQuestions)
      .filter(([, count]) => count > 0)
      .sort(([, a], [, b]) => b - a);
    if (missedEntries.length > 0) {
      const total = missedEntries.reduce((sum, [, n]) => sum + n, 0);
      actions.push({
        icon: "🎯",
        label: `Review ${total} missed question${total > 1 ? "s" : ""}`,
        detail: "Hit the weak spots before they stick",
        fn: () => { setMode("practice"); startPractice("missed", Math.min(total, 20)); scrollToPanel("practice"); }
      });
    }

    // 3. Weak topic from recent quiz history
    if (actions.length < 3) {
      const recent = state.quizHistory.slice(-12);
      const topicMap = {};
      recent.forEach((quiz) => {
        if (!quiz.topicMap) return;
        Object.entries(quiz.topicMap).forEach(([topic, data]) => {
          if (!topicMap[topic]) topicMap[topic] = { correct: 0, total: 0 };
          topicMap[topic].correct += data.correct || 0;
          topicMap[topic].total += data.total || 0;
        });
      });
      const weakTopics = Object.entries(topicMap)
        .filter(([, d]) => d.total >= 3 && d.correct / d.total < 0.75)
        .sort(([, a], [, b]) => (a.correct / a.total) - (b.correct / b.total));
      if (weakTopics.length > 0) {
        const [topic] = weakTopics[0];
        const pct = Math.round((topicMap[topic].correct / topicMap[topic].total) * 100);
        actions.push({
          icon: "📊",
          label: `Drill weak topic: ${topic}`,
          detail: `${pct}% recent accuracy — needs reps`,
          fn: () => { setMode("practice"); startPractice("class-a", 10); scrollToPanel("practice"); }
        });
      }
    }

    // 4. Low-confidence lesson
    if (actions.length < 3) {
      const lowConfLesson = allLessons.find(
        (lesson) => state.lessonConfidence[lesson.id] === "again" && !state.completedLessons[lesson.id]
      );
      if (lowConfLesson) {
        actions.push({
          icon: "🔁",
          label: `Re-study: ${lowConfLesson.title}`,
          detail: `Marked "again" — another pass will help`,
          fn: () => {
            activeModuleId = lowConfLesson.moduleId;
            state.activeModuleId = activeModuleId;
            saveState();
            setMode("learn");
            renderAll();
            scrollToPanel("learn");
          }
        });
      }
    }

    // 5. Next incomplete lesson (always a fallback)
    if (actions.length < 3) {
      const nextLesson = nextIncompleteLesson();
      if (nextLesson) {
        actions.push({
          icon: "📖",
          label: nextLesson.title,
          detail: `${moduleTitle(nextLesson.moduleId)} · ${lessonStatusLabel(nextLesson.id)}`,
          fn: () => continueLearning()
        });
      } else {
        actions.push({
          icon: "✅",
          label: "All lessons complete",
          detail: "Run a full exam simulator to stay sharp",
          fn: () => { setMode("simulator"); scrollToPanel("simulator"); }
        });
      }
    }

    return actions.slice(0, 3);
  }

  function renderTodaysPlan() {
    const planEl = els.todaysPlan;
    if (!planEl) return;
    const actions = buildTodaysPlan();
    planEl.innerHTML = actions.map((action, i) => `
      <button class="plan-action plan-action-${i + 1}" type="button" data-plan-index="${i}">
        <span class="plan-icon">${action.icon}</span>
        <span class="plan-copy"><strong>${escapeHtml(action.label)}</strong><span>${escapeHtml(action.detail)}</span></span>
        <span class="plan-arrow">→</span>
      </button>
    `).join("");
    actions.forEach((action, i) => {
      planEl.querySelector(`[data-plan-index="${i}"]`).addEventListener("click", action.fn);
    });
  }

  function renderModules() {
    els.moduleCount.textContent = `${COURSE.modules.length} modules`;
    els.moduleList.innerHTML = "";
    COURSE.modules.forEach((module, index) => {
      const button = document.createElement("button");
      button.type = "button";
      const moduleLessons = module.lessons.length;
      const moduleCompleted = module.lessons.filter((lesson) => state.completedLessons[lesson.id]).length;
      const isDone = moduleCompleted === moduleLessons;
      const progress = Math.round((moduleCompleted / moduleLessons) * 100);
      button.className = `module-item${module.id === activeModuleId ? " active" : ""}${isDone ? " module-done" : ""}`;
      button.dataset.moduleId = module.id;
      button.innerHTML = `
        <span class="module-number">${index + 1}</span>
        <span class="module-copy"><strong>${escapeHtml(module.title)}</strong><span>${escapeHtml(module.exam)} · ${escapeHtml(moduleTimeLabel(module))}</span></span>
        <span class="module-progress"><span>${progress}%</span><span class="mini-progress"><span style="width:${progress}%"></span></span></span>
      `;
      button.addEventListener("click", () => {
        activeModuleId = module.id;
        state.activeModuleId = activeModuleId;
        saveState();
        renderAll();
      });
      els.moduleList.appendChild(button);
    });
  }

  function renderActiveModule() {
    const module = getActiveModule();
    const moduleIndex = COURSE.modules.findIndex((item) => item.id === module.id);
    els.moduleMeta.textContent = `Module ${moduleIndex + 1} · ${module.exam} · ${moduleTimeLabel(module)}`;
    els.moduleTitle.textContent = module.title;
    els.prevModule.disabled = moduleIndex === 0;
    els.nextModule.disabled = moduleIndex === COURSE.modules.length - 1;

    els.moduleSummary.innerHTML = `
      <div class="summary-block"><strong>Objective</strong><span>${escapeHtml(module.objective)}</span></div>
      <div class="summary-block"><strong>Memory Model</strong><span>${escapeHtml(module.memory)}</span></div>
      <div class="summary-block"><strong>Watch For</strong><span>${escapeHtml(module.caution)}</span></div>
    `;

    els.lessonList.innerHTML = "";
    const defaultOpenLessonId = module.lessons.find((lesson) => !state.completedLessons[lesson.id])?.id || module.lessons[0]?.id;
    module.lessons.forEach((lesson, index) => {
      const node = els.lessonTemplate.content.firstElementChild.cloneNode(true);
      node.dataset.lessonId = lesson.id;
      if (lesson.id === defaultOpenLessonId) node.classList.add("open");
      node.querySelector(".lesson-index").textContent = `${moduleIndex + 1}.${index + 1}`;
      node.querySelector(".lesson-name").textContent = lesson.title;
      node.querySelector(".lesson-status").textContent = state.completedLessons[lesson.id] ? "Complete" : "Open";
      node.querySelector(".lesson-summary").textContent = lesson.summary;
      renderLessonDepth(node.querySelector(".lesson-depth"), lesson.deepDive);
      const mustKnow = node.querySelector(".must-know");
      lesson.mustKnow.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        mustKnow.appendChild(li);
      });
      node.querySelector(".memory-hook").textContent = lesson.memory;
      node.querySelector(".drill-text").textContent = lesson.drill;
      renderQuickCheck(node.querySelector(".quick-check"), lesson.check, lesson.id);
      renderStudyTools(node.querySelector(".study-tools"), lesson);
      const completeButton = node.querySelector(".complete-button");
      completeButton.textContent = state.completedLessons[lesson.id] ? "Completed" : "Mark Complete";
      completeButton.disabled = Boolean(state.completedLessons[lesson.id]);
      completeButton.addEventListener("click", () => {
        state.completedLessons[lesson.id] = true;
        saveState();
        renderAll();
      });
      node.querySelector(".lesson-toggle").addEventListener("click", () => {
        node.classList.toggle("open");
      });
      els.lessonList.appendChild(node);
    });
  }

  function renderStudyTools(container, lesson) {
    const confidence = state.lessonConfidence[lesson.id] || "new";
    const notes = state.lessonNotes[lesson.id] || "";
    container.innerHTML = `
      <section class="study-coach">
        <div>
          <p class="eyebrow">Make it stick</p>
          <h3>Teach-back check</h3>
          <p>Close the lesson, then explain this idea from memory in plain English. Write the version you would say to another student.</p>
        </div>
        <div class="confidence-picker" role="group" aria-label="Lesson confidence">
          ${["again", "steady", "confident"].map((level) => `
            <button class="confidence-chip ${confidence === level ? "active" : ""}" data-confidence-level="${level}" type="button">${confidenceLabel(level)}</button>
          `).join("")}
        </div>
        <label class="recall-notes">
          Recall notes
          <textarea data-lesson-notes="${escapeAttribute(lesson.id)}" rows="4" placeholder="Explain the lesson without looking. Short, messy, honest notes are perfect.">${escapeHtml(notes)}</textarea>
        </label>
      </section>
    `;
    Array.from(container.querySelectorAll("[data-confidence-level]")).forEach((button) => {
      button.addEventListener("click", () => {
        state.lessonConfidence[lesson.id] = button.dataset.confidenceLevel;
        saveState();
        renderActiveModule();
        renderModules();
      });
    });
    const notesField = container.querySelector("[data-lesson-notes]");
    notesField.addEventListener("input", () => {
      state.lessonNotes[lesson.id] = notesField.value;
      saveState();
    });
  }

  function renderLessonDepth(container, deepDive) {
    if (!deepDive) {
      container.remove();
      return;
    }
    const sections = [
      ["Handbook Lesson", deepDive.handbook],
      ["DMV Test Angle", deepDive.testAngle],
      ["On-The-Road Habit", deepDive.roadHabit],
      ["Common Traps", deepDive.traps]
    ].filter(([, items]) => Array.isArray(items) && items.length);

    container.innerHTML = sections.map(([title, items]) => `
      <section class="depth-section">
        <h3>${escapeHtml(title)}</h3>
        ${items.map((item) => `<p>${escapeHtml(item)}</p>`).join("")}
      </section>
    `).join("");
  }

  function renderQuickCheck(container, check, seed) {
    container.innerHTML = `
      <h3>Quick Check</h3>
      <p>${escapeHtml(check.question)}</p>
      <div class="quick-check-options"></div>
      <div class="feedback" aria-live="polite"></div>
    `;
    const options = container.querySelector(".quick-check-options");
    const feedback = container.querySelector(".feedback");
    const orderedOptions = stableShuffleChoices(check.options, check.answer, seed);
    orderedOptions.forEach((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer-button";
      button.textContent = option.text;
      button.addEventListener("click", () => {
        Array.from(options.children).forEach((child) => {
          child.disabled = true;
          child.classList.remove("correct", "incorrect");
        });
        if (option.correct) {
          button.classList.add("correct");
          feedback.textContent = check.explanation;
        } else {
          button.classList.add("incorrect");
          const correctIndex = orderedOptions.findIndex((item) => item.correct);
          options.children[correctIndex].classList.add("correct");
          feedback.textContent = check.explanation;
        }
      });
      options.appendChild(button);
    });
  }

  function renderPracticeIntro() {
    if (practiceSession) return;
    const history = state.quizHistory.slice(-5).reverse();
    const historyMarkup = history.length
      ? history.map((quiz) => `
          <div>
            <strong>${quiz.score}%</strong>
            <span>${escapeHtml(labelForPractice(quiz.type))} · ${quiz.correct}/${quiz.total}</span>
          </div>
        `).join("")
      : `<p class="empty-state">Start with a 10-question baseline. Misses automatically feed the review queue.</p>`;
    els.practiceArea.innerHTML = `
      <div class="readiness-card">
        <h3>Current readiness</h3>
        <p>${readinessMessage()}</p>
        <div class="score-grid">${historyMarkup}</div>
      </div>
      <div class="practice-start-grid" aria-label="Quick practice starts">
        <button class="quick-start-card" data-practice-preset="class-a" type="button">
          <span>10 questions</span>
          <strong>Class A baseline</strong>
          <em>General, air, combination, and cargo</em>
        </button>
        <button class="quick-start-card" data-practice-preset="air-brakes" type="button">
          <span>10 questions</span>
          <strong>Air Brakes tune-up</strong>
          <em>Warning devices, leakage, spring brakes</em>
        </button>
        <button class="quick-start-card" data-practice-preset="combination" type="button">
          <span>10 questions</span>
          <strong>Combination tune-up</strong>
          <em>Coupling, offtracking, rollover risk</em>
        </button>
        <button class="quick-start-card" data-practice-preset="missed" type="button">
          <span>Review</span>
          <strong>Missed questions</strong>
          <em>Only the questions that caught you</em>
        </button>
      </div>
    `;
    Array.from(els.practiceArea.querySelectorAll("[data-practice-preset]")).forEach((button) => {
      button.addEventListener("click", () => {
        const type = button.dataset.practicePreset;
        els.practiceType.value = type;
        els.questionCount.value = "10";
        startPractice(type, 10);
      });
    });
  }

  function startPractice(type, count) {
    const pool = getQuestionPool(type);
    const selected = shuffle(pool)
      .slice(0, Math.min(count, pool.length))
      .map(shufflePracticeChoices);
    practiceSession = {
      type,
      questions: selected,
      current: 0,
      answers: {},
      complete: false,
      startedAt: new Date().toISOString()
    };
    renderPracticeQuestion();
  }

  function renderPracticeQuestion() {
    if (!practiceSession || practiceSession.complete) {
      renderPracticeIntro();
      return;
    }

    if (!practiceSession.questions.length) {
      els.practiceArea.innerHTML = `<p class="empty-state">No questions are available for this set yet. Try another test type.</p>`;
      return;
    }

    const question = practiceSession.questions[practiceSession.current];
    const selected = practiceSession.answers[question.id];
    const answered = selected !== undefined;
    const progress = `${practiceSession.current + 1} of ${practiceSession.questions.length}`;

    els.practiceArea.innerHTML = `
      <article class="test-card">
        <div class="test-meta">
          <span class="pill">${escapeHtml(progress)}</span>
          <span class="pill green">${escapeHtml(question.topic)}</span>
          <span class="pill">${escapeHtml(question.section)}</span>
        </div>
        <h3>${escapeHtml(question.question)}</h3>
        <div class="answer-grid"></div>
        <div class="feedback" aria-live="polite">${answered ? escapeHtml(question.explanation) : ""}</div>
        <div class="practice-nav">
          <button class="secondary-button" id="practicePrev" type="button">Previous</button>
          <button class="secondary-button" id="practiceNext" type="button">${practiceSession.current === practiceSession.questions.length - 1 ? "Finish" : "Next"}</button>
          <button class="secondary-button" id="practiceQuit" type="button">Quit</button>
        </div>
      </article>
    `;

    const answerGrid = els.practiceArea.querySelector(".answer-grid");
    question.choices.forEach((choice, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer-button";
      button.textContent = choice;
      if (answered) {
        button.disabled = true;
        if (index === question.answer) button.classList.add("correct");
        if (index === selected && selected !== question.answer) button.classList.add("incorrect");
      }
      button.addEventListener("click", () => {
        practiceSession.answers[question.id] = index;
        if (index !== question.answer) {
          state.missedQuestions[question.id] = (state.missedQuestions[question.id] || 0) + 1;
        }
        saveState();
        renderPracticeQuestion();
      });
      answerGrid.appendChild(button);
    });

    els.practiceArea.querySelector("#practicePrev").disabled = practiceSession.current === 0;
    els.practiceArea.querySelector("#practicePrev").addEventListener("click", () => {
      practiceSession.current = Math.max(0, practiceSession.current - 1);
      renderPracticeQuestion();
    });
    els.practiceArea.querySelector("#practiceNext").addEventListener("click", () => {
      if (practiceSession.current === practiceSession.questions.length - 1) {
        finishPractice();
      } else {
        practiceSession.current += 1;
        renderPracticeQuestion();
      }
    });
    els.practiceArea.querySelector("#practiceQuit").addEventListener("click", () => {
      practiceSession = null;
      renderPracticeIntro();
    });
  }

  function finishPractice() {
    const total = practiceSession.questions.length;
    const correct = practiceSession.questions.filter((question) => practiceSession.answers[question.id] === question.answer).length;
    const score = Math.round((correct / total) * 100);
    const topicMap = {};
    practiceSession.questions.forEach((question) => {
      topicMap[question.topic] ||= { correct: 0, total: 0 };
      topicMap[question.topic].total += 1;
      if (practiceSession.answers[question.id] === question.answer) topicMap[question.topic].correct += 1;
    });

    const quiz = {
      type: practiceSession.type,
      score,
      correct,
      total,
      topicMap,
      completedAt: new Date().toISOString()
    };
    state.quizHistory.push(quiz);
    state.quizHistory = state.quizHistory.slice(-30);
    saveState();

    const topicMarkup = Object.entries(topicMap).map(([topic, value]) => {
      const percent = Math.round((value.correct / value.total) * 100);
      return `<div><strong>${percent}%</strong><span>${escapeHtml(topic)} · ${value.correct}/${value.total}</span></div>`;
    }).join("");

    const missed = practiceSession.questions.filter((question) => practiceSession.answers[question.id] !== question.answer);
    const missedMarkup = missed.length
      ? `<p>Missed ${missed.length}. They have been added to Review.</p>`
      : `<p>No misses in this set. Good signal.</p>`;

    els.practiceArea.innerHTML = `
      <article class="test-card">
        <div class="test-meta">
          <span class="pill ${score >= 80 ? "green" : "red"}">${score}%</span>
          <span class="pill">${correct}/${total} correct</span>
          <span class="pill">${escapeHtml(labelForPractice(practiceSession.type))}</span>
        </div>
        <h3>${score >= 80 ? "Passing-range score" : "Below passing range"}</h3>
        ${missedMarkup}
        <div class="topic-grid">${topicMarkup}</div>
        <div class="practice-nav">
          <button class="primary-button" id="practiceAgain" type="button">New Test</button>
          <button class="secondary-button" id="goReview" type="button">Review Misses</button>
        </div>
      </article>
    `;
    practiceSession = null;
    renderDashboard();
    renderReview();
    els.practiceArea.querySelector("#practiceAgain").addEventListener("click", () => {
      startPractice(els.practiceType.value, Number(els.questionCount.value));
    });
    els.practiceArea.querySelector("#goReview").addEventListener("click", () => setMode("review"));
  }

  function renderSimulatorIntro() {
    if (!els.simulatorArea || simulatorSession) return;
    const latest = state.simulatorHistory.slice(-3).reverse();
    const latestMarkup = latest.length
      ? latest.map((attempt) => `
          <div>
            <strong>${attempt.score}%</strong>
            <span>${escapeHtml(attempt.label || "Simulator")} · ${attempt.correct}/${attempt.total} · ${formatDate(new Date(attempt.completedAt))}</span>
          </div>
        `).join("")
      : `<div><strong>Ready</strong><span>Choose an exam below to begin.</span></div>`;
    const pool = getSimulatorPool();
    els.simulatorArea.innerHTML = `
      <div class="simulator-hero">
        <div>
          <p class="eyebrow">Exam mode</p>
          <h3>Pick the exam you want to drill</h3>
          <p>Run one-question-at-a-time simulators for the core Class A tests and each endorsement path. Every attempt saves your score and sends misses to Review.</p>
        </div>
        <div class="score-grid">${latestMarkup}</div>
      </div>
      <div class="simulator-grid">
        ${simulatorConfigs.map((config) => {
          const available = pool.filter(config.filter).length;
          const count = Math.min(config.count, available);
          return `
            <article class="simulator-option">
              <div>
                <p class="eyebrow">${count} questions</p>
                <h3>${escapeHtml(config.label)}</h3>
                <p>${escapeHtml(config.description)}</p>
              </div>
              <button class="primary-button" data-simulator="${escapeAttribute(config.id)}" ${count ? "" : "disabled"} type="button">Start</button>
            </article>
          `;
        }).join("")}
      </div>
    `;
    Array.from(els.simulatorArea.querySelectorAll("[data-simulator]")).forEach((button) => {
      button.addEventListener("click", () => startSimulator(button.dataset.simulator));
    });
  }

  function startSimulator(configId = "class-a") {
    const config = simulatorConfigs.find((item) => item.id === configId) || simulatorConfigs[0];
    const pool = getSimulatorPool();
    const questions = buildSimulatorSet(pool.filter(config.filter), config.count).map(shufflePracticeChoices);
    simulatorSession = {
      type: config.id,
      label: config.label,
      questions,
      current: 0,
      answers: {},
      startedAt: new Date().toISOString()
    };
    renderSimulatorQuestion();
  }

  function renderSimulatorQuestion() {
    if (!simulatorSession) return renderSimulatorIntro();
    const question = simulatorSession.questions[simulatorSession.current];
    const selected = simulatorSession.answers[question.id];
    const answered = selected !== undefined;
    const answeredCount = Object.keys(simulatorSession.answers).length;
    const correctCount = simulatorSession.questions.filter((item) => simulatorSession.answers[item.id] === item.answer).length;
    const progressPercent = Math.round(((simulatorSession.current + 1) / simulatorSession.questions.length) * 100);
    els.simulatorArea.innerHTML = `
      <article class="test-card simulator-card">
        <div class="simulator-progress">
          <div>
            <span class="pill">Question ${simulatorSession.current + 1} of ${simulatorSession.questions.length}</span>
            <span class="pill green">${escapeHtml(question.topic)}</span>
            <span class="pill">${escapeHtml(question.section)}</span>
          </div>
          <strong>${correctCount}/${answeredCount || 0}</strong>
        </div>
        <div class="progress-track"><span style="width:${progressPercent}%"></span></div>
        <h3>${escapeHtml(question.question)}</h3>
        <div class="answer-grid simulator-answer-grid"></div>
        <div class="feedback" aria-live="polite">${answered ? escapeHtml(question.explanation) : ""}</div>
        <div class="practice-nav">
          <button class="secondary-button" id="simPrev" type="button" ${simulatorSession.current === 0 ? "disabled" : ""}>Previous</button>
          <button class="secondary-button" id="simNext" type="button">${simulatorSession.current === simulatorSession.questions.length - 1 ? "Finish ${escapeHtml(simulatorSession.label)}" : "Next Question"}</button>
          <button class="secondary-button" id="simQuit" type="button">Quit</button>
        </div>
      </article>
    `;

    const answerGrid = els.simulatorArea.querySelector(".simulator-answer-grid");
    question.choices.forEach((choice, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer-button";
      button.textContent = choice;
      if (answered) {
        button.disabled = true;
        if (index === question.answer) button.classList.add("correct");
        if (index === selected && selected !== question.answer) button.classList.add("incorrect");
      }
      button.addEventListener("click", () => {
        simulatorSession.answers[question.id] = index;
        if (index !== question.answer) {
          state.missedQuestions[question.id] = (state.missedQuestions[question.id] || 0) + 1;
        }
        saveState();
        renderSimulatorQuestion();
      });
      answerGrid.appendChild(button);
    });

    els.simulatorArea.querySelector("#simPrev").addEventListener("click", () => {
      simulatorSession.current = Math.max(0, simulatorSession.current - 1);
      renderSimulatorQuestion();
    });
    els.simulatorArea.querySelector("#simNext").addEventListener("click", () => {
      if (simulatorSession.current === simulatorSession.questions.length - 1) return finishSimulator();
      simulatorSession.current += 1;
      renderSimulatorQuestion();
    });
    els.simulatorArea.querySelector("#simQuit").addEventListener("click", () => {
      const confirmed = window.confirm("Quit this simulator attempt? Current answers will not be scored.");
      if (!confirmed) return;
      simulatorSession = null;
      renderSimulatorIntro();
    });
  }

  function finishSimulator() {
    const total = simulatorSession.questions.length;
    const correct = simulatorSession.questions.filter((question) => simulatorSession.answers[question.id] === question.answer).length;
    const score = Math.round((correct / total) * 100);
    const topicMap = {};
    simulatorSession.questions.forEach((question) => {
      topicMap[question.topic] ||= { correct: 0, total: 0 };
      topicMap[question.topic].total += 1;
      if (simulatorSession.answers[question.id] === question.answer) topicMap[question.topic].correct += 1;
    });
    const attempt = {
      type: "simulator",
      simulatorType: simulatorSession.type,
      label: simulatorSession.label,
      score,
      correct,
      total,
      topicMap,
      completedAt: new Date().toISOString()
    };
    state.simulatorHistory.push(attempt);
    state.simulatorHistory = state.simulatorHistory.slice(-10);
    state.quizHistory.push(attempt);
    state.quizHistory = state.quizHistory.slice(-30);
    saveState();

    const topicMarkup = Object.entries(topicMap).map(([topic, value]) => {
      const percent = Math.round((value.correct / value.total) * 100);
      return `<div><strong>${percent}%</strong><span>${escapeHtml(topic)} · ${value.correct}/${value.total}</span></div>`;
    }).join("");

    const finishedType = simulatorSession.type;
    const finishedLabel = simulatorSession.label;
    simulatorSession = null;
    els.simulatorArea.innerHTML = `
      <article class="test-card simulator-card">
        <div class="test-meta">
          <span class="pill ${score >= 80 ? "green" : "red"}">${score}%</span>
          <span class="pill">${correct}/${total} correct</span>
          <span class="pill">${escapeHtml(finishedLabel)}</span>
        </div>
        <h3>${score >= 80 ? "Passing-range simulator result" : "Below passing range"}</h3>
        <p>${score >= 80 ? "Strong signal. Keep reviewing misses until the explanations feel obvious." : "Use the topic breakdown, then retake after reviewing weak sections."}</p>
        <div class="topic-grid">${topicMarkup}</div>
        <div class="practice-nav">
          <button class="primary-button" id="simAgain" type="button">Run This Simulator Again</button>
          <button class="secondary-button" id="simReview" type="button">Review Misses</button>
          <button class="secondary-button" id="simMenu" type="button">Simulator Menu</button>
        </div>
      </article>
    `;
    renderDashboard();
    renderReview();
    els.simulatorArea.querySelector("#simAgain").addEventListener("click", () => startSimulator(finishedType));
    els.simulatorArea.querySelector("#simReview").addEventListener("click", () => setMode("review"));
    els.simulatorArea.querySelector("#simMenu").addEventListener("click", renderSimulatorIntro);
  }

  function renderFlashcards() {
    flashcardQueue = getDueFlashcards();
    if (!flashcardQueue.length) {
      const next = COURSE.flashcards.map((card) => {
        const cardState = state.flashcards[card.id];
        return cardState?.due ? new Date(cardState.due) : new Date();
      }).sort((a, b) => a - b)[0];
      els.flashcardArea.innerHTML = `
        <div class="empty-state">
          No cards are due right now. Next scheduled card: ${next ? formatDate(next) : "today"}.
        </div>
      `;
      return;
    }
    flashcardIndex = Math.min(flashcardIndex, flashcardQueue.length - 1);
    renderFlashcard(false);
  }

  function renderFlashcard(showBack) {
    const card = flashcardQueue[flashcardIndex];
    if (!card) return renderFlashcards();
    els.flashcardArea.innerHTML = `
      <article class="flashcard">
        <div class="test-meta">
          <span class="pill">${flashcardIndex + 1} of ${flashcardQueue.length}</span>
          <span class="pill green">${escapeHtml(card.topic)}</span>
          <span class="pill">${escapeHtml(card.source)}</span>
        </div>
        <div class="flashcard-front"><p>${escapeHtml(card.front)}</p></div>
        ${showBack ? `<div class="flashcard-back"><h3>Answer</h3><p>${escapeHtml(card.back)}</p></div>` : ""}
        <div class="practice-nav">
          ${showBack ? "" : `<button class="primary-button" id="showCardBack" type="button">Show Answer</button>`}
          ${showBack ? `
            <button class="confidence-button" data-confidence="again" type="button">Again</button>
            <button class="confidence-button" data-confidence="good" type="button">Good</button>
            <button class="confidence-button" data-confidence="mastered" type="button">Mastered</button>
          ` : ""}
        </div>
      </article>
    `;
    const showButton = els.flashcardArea.querySelector("#showCardBack");
    if (showButton) {
      showButton.addEventListener("click", () => renderFlashcard(true));
    }
    Array.from(els.flashcardArea.querySelectorAll("[data-confidence]")).forEach((button) => {
      button.addEventListener("click", () => {
        scheduleFlashcard(card.id, button.dataset.confidence);
        flashcardQueue.splice(flashcardIndex, 1);
        if (flashcardIndex >= flashcardQueue.length) flashcardIndex = 0;
        saveState();
        renderFlashcard(false);
      });
    });
  }

  function renderReview() {
    const missed = Object.entries(state.missedQuestions)
      .map(([id, count]) => ({ question: findQuestionById(id), count }))
      .filter((item) => item.question)
      .sort((a, b) => b.count - a.count);

    if (!missed.length) {
      els.reviewArea.innerHTML = `<p class="empty-state">No missed questions yet. A baseline quiz will populate this area.</p>`;
      return;
    }

    const list = missed.slice(0, 12).map(({ question, count }) => `
      <article class="review-card">
        <div class="test-meta">
          <span class="pill red">Missed ${count}</span>
          <span class="pill">${escapeHtml(question.topic)}</span>
          <span class="pill">${escapeHtml(question.section)}</span>
        </div>
        <h3>${escapeHtml(question.question)}</h3>
        <p>${escapeHtml(question.explanation)}</p>
      </article>
    `).join("");

    els.reviewArea.innerHTML = `
      <div class="practice-nav">
        <button class="primary-button" id="missedQuiz" type="button">Quiz Misses</button>
        <button class="secondary-button" id="clearMastered" type="button">Clear Review</button>
      </div>
      <div class="review-list">${list}</div>
    `;
    els.reviewArea.querySelector("#missedQuiz").addEventListener("click", () => {
      setMode("practice");
      startPractice("missed", Math.min(20, missed.length));
    });
    els.reviewArea.querySelector("#clearMastered").addEventListener("click", () => {
      state.missedQuestions = {};
      saveState();
      renderReview();
      renderDashboard();
    });
  }

  function renderEndorsementHub() {
    const cards = [
      {
        code: "T",
        title: "Doubles and Triples",
        href: "./endorsements/doubles-triples.html",
        text: "Go deep on converter dollies, crack-the-whip, coupling and uncoupling, shut-off valves, and multi-trailer air checks."
      },
      {
        code: "N",
        title: "Tank Vehicles",
        href: "./endorsements/tanker.html",
        text: "Study surge, outage, baffles, bulkheads, high center of gravity, smooth control, and tank-specific inspections."
      },
      {
        code: "H",
        title: "Hazardous Materials",
        href: "./endorsements/hazmat.html",
        text: "Build fluency with shipping papers, labels, placards, loading rules, parking rules, emergencies, and security steps."
      },
      {
        code: "P",
        title: "Passenger",
        href: "./endorsements/passenger.html",
        text: "Learn bus inspection, passenger loading, standee lines, supervision, stops, railroad crossings, and prohibited practices."
      },
      {
        code: "S",
        title: "School Bus",
        href: "./endorsements/school-bus.html",
        text: "Focus on danger zones, mirror systems, loading and unloading, student management, evacuation, crossings, and post-trip checks."
      }
    ];

    els.endorsementsArea.innerHTML = `
      <div class="source-card">
        <h3>Use These After the Base Class A Path</h3>
        <p>The main course keeps a quick endorsement preview, but these standalone courses are built for deeper study and separate progress tracking.</p>
      </div>
      <div class="endorsement-card-grid">
        ${cards.map((card) => `
          <article class="endorsement-card">
            <div class="endorsement-card-head">
              <span class="endorsement-code">${escapeHtml(card.code)}</span>
              <h3>${escapeHtml(card.title)}</h3>
            </div>
            <p>${escapeHtml(card.text)}</p>
            <a href="${escapeAttribute(card.href)}">Open ${escapeHtml(card.code)} Course</a>
          </article>
        `).join("")}
      </div>
    `;
  }

  function renderSources() {
    const sources = COURSE.sources.map((source) => `
      <article class="source-card">
        <h3>${escapeHtml(source.label)}</h3>
        <p>${escapeHtml(source.detail)}</p>
        ${source.url && !source.url.startsWith("./source/")
          ? `<a href="${escapeAttribute(source.url)}" target="_blank" rel="noreferrer">Open source</a>`
          : `<span class="source-note">Local-only source file</span>`}
      </article>
    `).join("");
    els.sourcesArea.innerHTML = `
      <div class="source-list">
        <article class="source-card">
          <h3>How this course was built</h3>
          <p>${escapeHtml(COURSE.disclaimer)}</p>
          <p>The handbook supplies the course content. The online sources supply current DMV/Federal test framing, sample-test topic signals, and the 80 percent passing threshold.</p>
        </article>
        ${sources}
      </div>
    `;
  }

  function setMode(mode, options = {}) {
    activeMode = mode;
    els.tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.mode === mode));
    els.panels.forEach((panel) => panel.classList.toggle("hidden", panel.dataset.panel !== mode));
    if (mode === "practice" && !practiceSession) renderPracticeIntro();
    if (mode === "simulator" && !simulatorSession) renderSimulatorIntro();
    if (mode === "flashcards") renderFlashcards();
    if (mode === "review") renderReview();
    if (mode === "sources") renderSources();
    if (options.scroll) scrollToPanel(mode);
  }

  function scrollToPanel(mode) {
    const panel = document.querySelector(`[data-panel="${mode}"]`);
    if (!panel) return;
    window.requestAnimationFrame(() => {
      const offset = window.matchMedia("(max-width: 720px)").matches ? 10 : 18;
      const top = panel.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    });
  }

  function moveModule(direction) {
    const index = COURSE.modules.findIndex((module) => module.id === activeModuleId);
    const next = COURSE.modules[index + direction];
    if (!next) return;
    activeModuleId = next.id;
    state.activeModuleId = next.id;
    saveState();
    renderAll();
  }

  function getActiveModule() {
    return COURSE.modules.find((module) => module.id === activeModuleId) || COURSE.modules[0];
  }

  function continueLearning() {
    setMode("learn");
    const nextLesson = nextIncompleteLesson();
    if (!nextLesson) return;
    activeModuleId = nextLesson.moduleId;
    state.activeModuleId = activeModuleId;
    saveState();
    renderAll();
    setTimeout(() => {
      const target = document.querySelector(`[data-lesson-id="${nextLesson.id}"]`);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
        target.classList.add("open");
      }
    }, 0);
  }

  function nextIncompleteLesson() {
    return allLessons.find((lesson) => !state.completedLessons[lesson.id]);
  }

  function moduleTitle(moduleId) {
    return COURSE.modules.find((module) => module.id === moduleId)?.title || "Current module";
  }

  function lessonStatusLabel(lessonId) {
    const confidence = state.lessonConfidence[lessonId];
    if (confidence === "confident") return "marked confident";
    if (confidence === "steady") return "getting steady";
    if (confidence === "again") return "needs another pass";
    return "not started yet";
  }

  function completedCount() {
    return allLessons.filter((lesson) => state.completedLessons[lesson.id]).length;
  }

  function getQuestionPool(type) {
    if (type === "missed") {
      return Object.keys(state.missedQuestions)
        .map(findQuestionById)
        .filter(Boolean);
    }
    if (type === "class-a") {
      return getSimulatorPool().filter((question) =>
        ["general", "air-brakes", "combination", "cargo"].includes(question.exam)
      );
    }
    const endorsementTopics = {
      "endorsement-doubles": "Doubles/Triples",
      "endorsement-tanker": "Tanker",
      "endorsement-hazmat": "HazMat",
      "endorsement-passenger": "Passenger",
      "endorsement-school": "School Bus"
    };
    if (endorsementTopics[type]) {
      return getSimulatorPool().filter((question) => question.topic === endorsementTopics[type]);
    }
    if (type === "endorsements") return getSimulatorPool().filter((question) => question.exam === "endorsements");
    return getSimulatorPool().filter((question) => question.exam === type);
  }

  function getSimulatorPool() {
    return [
      ...COURSE.questions,
      ...getStandaloneEndorsementQuestions(),
      ...((window.CDL_SIMULATOR_QUESTIONS || []).map((question) => ({ ...question, simulatorOnly: true })))
    ];
  }

  function buildSimulatorSet(pool, count) {
    return shuffle(pool).slice(0, Math.min(count, pool.length));
  }

  function getStandaloneEndorsementQuestions() {
    const courses = window.CDL_ENDORSEMENTS || {};
    return Object.entries(courses).flatMap(([courseId, course]) => {
      const topic = endorsementTopic(courseId);
      return (course.questions || []).map((question, index) => ({
        id: `standalone-${courseId}-${index + 1}`,
        topic,
        exam: "endorsements",
        difficulty: 2,
        section: course.source || "Endorsement course",
        question: question[0],
        choices: question[1],
        answer: question[2],
        explanation: `${course.title}: ${course.subtitle}`
      }));
    });
  }

  function endorsementTopic(courseId) {
    const topics = {
      "doubles-triples": "Doubles/Triples",
      tanker: "Tanker",
      hazmat: "HazMat",
      passenger: "Passenger",
      "school-bus": "School Bus"
    };
    return topics[courseId] || courseId;
  }

  function findQuestionById(id) {
    return getSimulatorPool().find((question) => question.id === id);
  }

  function calculateReadiness() {
    const core = state.quizHistory.filter((quiz) => quiz.type !== "endorsements").slice(-8);
    if (!core.length) return 0;
    const total = core.reduce((sum, quiz) => sum + quiz.total, 0);
    const correct = core.reduce((sum, quiz) => sum + quiz.correct, 0);
    return Math.round((correct / total) * 100);
  }

  function readinessMessage() {
    const score = calculateReadiness();
    if (!state.quizHistory.length) {
      return "Take a baseline test first. The app will use your recent scores and misses to estimate readiness.";
    }
    if (score >= 90) {
      return "Strong trend. Keep using missed-question review and mixed tests so recall stays flexible.";
    }
    if (score >= 80) {
      return "Passing range, but keep pressure-testing weak topics until 90 percent feels boring.";
    }
    return "Not passing range yet. Use short topic tests, then return to the Class A mix.";
  }

  function getDueFlashcards() {
    const today = startOfToday();
    return COURSE.flashcards.filter((card) => {
      const cardState = state.flashcards[card.id];
      if (!cardState?.due) return true;
      return new Date(cardState.due) <= today;
    });
  }

  function scheduleFlashcard(id, confidence) {
    const existing = state.flashcards[id] || { interval: 0 };
    const interval = confidence === "again"
      ? 1
      : confidence === "good"
        ? Math.max(3, existing.interval + 2)
        : Math.max(7, existing.interval * 2 || 7);
    const due = startOfToday();
    due.setDate(due.getDate() + interval);
    state.flashcards[id] = {
      interval,
      due: due.toISOString(),
      lastConfidence: confidence,
      reviewedAt: new Date().toISOString()
    };
  }

  function touchStudyDay() {
    const today = dateKey(new Date());
    if (state.streak.lastDate === today) return;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayKey = dateKey(yesterday);
    state.streak.count = state.streak.lastDate === yesterdayKey ? (state.streak.count || 0) + 1 : 1;
    state.streak.lastDate = today;
    saveState();
  }

  function loadState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return {
        completedLessons: parsed.completedLessons || {},
        activeModuleId: parsed.activeModuleId || COURSE.modules[0].id,
        quizHistory: Array.isArray(parsed.quizHistory) ? parsed.quizHistory : [],
        simulatorHistory: Array.isArray(parsed.simulatorHistory) ? parsed.simulatorHistory : [],
        missedQuestions: parsed.missedQuestions || {},
        flashcards: parsed.flashcards || {},
        lessonConfidence: parsed.lessonConfidence || {},
        lessonNotes: parsed.lessonNotes || {},
        streak: parsed.streak || { count: 0, lastDate: null }
      };
    } catch (error) {
      return {
        completedLessons: {},
        activeModuleId: COURSE.modules[0].id,
        quizHistory: [],
        simulatorHistory: [],
        missedQuestions: {},
        flashcards: {},
        lessonConfidence: {},
        lessonNotes: {},
        streak: { count: 0, lastDate: null }
      };
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    if (cloudSync) cloudSync.save(state);
  }

  function initCloudSync() {
    if (!window.createCDLCloudSync) return;
    cloudSync = window.createCDLCloudSync({
      storageKey: STORAGE_KEY,
      getState: () => state,
      setState: (nextState) => {
        state = normalizeState(nextState);
        activeModuleId = state.activeModuleId || COURSE.modules[0].id;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        renderAll();
      },
      mergeState: mergeMainState
    });
    cloudSync.init();
  }

  function normalizeState(value) {
    return {
      completedLessons: value?.completedLessons || {},
      activeModuleId: value?.activeModuleId || COURSE.modules[0].id,
      quizHistory: Array.isArray(value?.quizHistory) ? value.quizHistory : [],
      simulatorHistory: Array.isArray(value?.simulatorHistory) ? value.simulatorHistory : [],
      missedQuestions: value?.missedQuestions || {},
      flashcards: value?.flashcards || {},
      lessonConfidence: value?.lessonConfidence || {},
      lessonNotes: value?.lessonNotes || {},
      streak: value?.streak || { count: 0, lastDate: null }
    };
  }

  function mergeMainState(remoteValue, localValue) {
    const remote = normalizeState(remoteValue);
    const local = normalizeState(localValue);
    const missedQuestions = { ...remote.missedQuestions };
    Object.entries(local.missedQuestions).forEach(([id, count]) => {
      missedQuestions[id] = Math.max(Number(missedQuestions[id] || 0), Number(count || 0));
    });
    return {
      completedLessons: { ...remote.completedLessons, ...local.completedLessons },
      activeModuleId: local.activeModuleId || remote.activeModuleId || COURSE.modules[0].id,
      quizHistory: [...remote.quizHistory, ...local.quizHistory].slice(-30),
      simulatorHistory: [...remote.simulatorHistory, ...local.simulatorHistory].slice(-10),
      missedQuestions,
      flashcards: { ...remote.flashcards, ...local.flashcards },
      lessonConfidence: { ...remote.lessonConfidence, ...local.lessonConfidence },
      lessonNotes: { ...remote.lessonNotes, ...local.lessonNotes },
      streak: (local.streak?.count || 0) >= (remote.streak?.count || 0) ? local.streak : remote.streak
    };
  }

  function shuffle(items) {
    const array = [...items];
    for (let index = array.length - 1; index > 0; index -= 1) {
      const next = Math.floor(Math.random() * (index + 1));
      [array[index], array[next]] = [array[next], array[index]];
    }
    return array;
  }

  function shufflePracticeChoices(question) {
    const ordered = shuffleChoices(question.choices, question.answer);
    return {
      ...question,
      choices: ordered.map((choice) => choice.text),
      answer: ordered.findIndex((choice) => choice.correct)
    };
  }

  function shuffleChoices(choices, correctIndex) {
    return shuffle(choices.map((text, index) => ({ text, correct: index === correctIndex })));
  }

  function stableShuffleChoices(choices, correctIndex, seed) {
    const array = choices.map((text, index) => ({ text, correct: index === correctIndex }));
    let value = hashString(seed || choices.join("|"));
    for (let index = array.length - 1; index > 0; index -= 1) {
      value = (value * 1664525 + 1013904223) >>> 0;
      const next = value % (index + 1);
      [array[index], array[next]] = [array[next], array[index]];
    }
    return array;
  }

  function hashString(value) {
    return String(value).split("").reduce((hash, char) => {
      return ((hash << 5) - hash + char.charCodeAt(0)) >>> 0;
    }, 2166136261);
  }

  function moduleTimeLabel(module) {
    const depthCount = module.lessons.reduce((sum, lesson) => {
      if (!lesson.deepDive) return sum;
      return sum + ["handbook", "testAngle", "roadHabit", "traps"].reduce((sectionSum, key) => {
        return sectionSum + (Array.isArray(lesson.deepDive[key]) ? lesson.deepDive[key].length : 0);
      }, 0);
    }, 0);
    const readMinutes = Math.max(8, Math.round(module.lessons.length * 3 + depthCount * 1.4));
    const drillMinutes = Math.max(readMinutes + 4, Math.round(readMinutes * 1.7));
    return `${readMinutes} min read · ${drillMinutes} min with drills`;
  }

  function labelForPractice(type) {
    const labels = {
      "class-a": "Class A Permit Mix",
      general: "General Knowledge",
      "air-brakes": "Air Brakes",
      combination: "Combination Vehicles",
      cargo: "Cargo and Securement",
      endorsements: "Optional Endorsements",
      "endorsement-doubles": "Doubles/Triples T",
      "endorsement-tanker": "Tanker N",
      "endorsement-hazmat": "HazMat H",
      "endorsement-passenger": "Passenger P",
      "endorsement-school": "School Bus S",
      simulator: "100-Question Simulator",
      missed: "Missed Questions"
    };
    return labels[type] || type;
  }

  function confidenceLabel(level) {
    const labels = {
      again: "Review again",
      steady: "Getting it",
      confident: "Confident"
    };
    return labels[level] || "New";
  }

  function startOfToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }

  function dateKey(date) {
    return date.toISOString().slice(0, 10);
  }

  function formatDate(date) {
    return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" }).format(date);
  }

  function expandAcronyms(value) {
    const expansions = [
      ["GCWR", "Gross Combination Weight Rating"],
      ["GVWR", "Gross Vehicle Weight Rating"],
      ["FMCSA", "Federal Motor Carrier Safety Administration"],
      ["ELDT", "Entry-Level Driver Training"],
      ["HazMat", "Hazardous Materials"],
      ["ABS", "Antilock Braking System"],
      ["CDL", "Commercial Driver's License"],
      ["CLP", "Commercial Learner's Permit"],
      ["CMV", "Commercial Motor Vehicle"],
      ["DMV", "Department of Motor Vehicles"],
      ["GCW", "Gross Combination Weight"],
      ["GVW", "Gross Vehicle Weight"],
      ["GOAL", "Get Out And Look"],
      ["PDF", "Portable Document Format"],
      ["PSI", "Pounds per Square Inch"],
      ["psi", "pounds per square inch"],
      ["MPH", "Miles per Hour"],
      ["mph", "miles per hour"],
      ["ID", "Identification"]
    ];
    return expansions.reduce((text, [short, full]) => {
      const pattern = new RegExp(`\\b${short}\\b(?!\\s*\\()`, "g");
      return text.replace(pattern, `${short} (${full})`);
    }, String(value));
  }

  function escapeHtml(value) {
    return expandAcronyms(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function escapeAttribute(value) {
    return escapeHtml(value).replace(/`/g, "&#096;");
  }
})();
