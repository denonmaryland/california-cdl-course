(function () {
  const COURSE = window.CDL_COURSE;
  const STORAGE_KEY = "ca-cdl-course-progress-v2";

  const els = {
    overallProgress: document.getElementById("overallProgress"),
    readinessScore: document.getElementById("readinessScore"),
    streakCount: document.getElementById("streakCount"),
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
    flashcardArea: document.getElementById("flashcardArea"),
    endorsementsArea: document.getElementById("endorsementsArea"),
    reviewArea: document.getElementById("reviewArea"),
    sourcesArea: document.getElementById("sourcesArea"),
    lessonTemplate: document.getElementById("lessonTemplate")
  };

  const allLessons = COURSE.modules.flatMap((module) =>
    module.lessons.map((lesson) => ({ ...lesson, moduleId: module.id }))
  );

  let state = loadState();
  let activeModuleId = state.activeModuleId || COURSE.modules[0].id;
  let activeMode = "learn";
  let practiceSession = null;
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
      setMode("learn");
      const nextLesson = allLessons.find((lesson) => !state.completedLessons[lesson.id]);
      if (nextLesson) {
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
    });

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
  }

  function renderModules() {
    els.moduleCount.textContent = `${COURSE.modules.length} modules`;
    els.moduleList.innerHTML = "";
    COURSE.modules.forEach((module, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `module-item${module.id === activeModuleId ? " active" : ""}`;
      button.dataset.moduleId = module.id;
      const moduleLessons = module.lessons.length;
      const moduleCompleted = module.lessons.filter((lesson) => state.completedLessons[lesson.id]).length;
      const progress = Math.round((moduleCompleted / moduleLessons) * 100);
      button.innerHTML = `
        <span class="module-number">${index + 1}</span>
        <span><strong>${escapeHtml(module.title)}</strong><span>${escapeHtml(module.exam)} · ${escapeHtml(moduleTimeLabel(module))}</span></span>
        <span class="module-progress">${progress}%</span>
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
    module.lessons.forEach((lesson, index) => {
      const node = els.lessonTemplate.content.firstElementChild.cloneNode(true);
      node.dataset.lessonId = lesson.id;
      if (index === 0 || !state.completedLessons[lesson.id]) node.classList.add("open");
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
    `;
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
      .map(([id, count]) => ({ question: COURSE.questions.find((item) => item.id === id), count }))
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
        <a href="${escapeAttribute(source.url)}" target="_blank" rel="noreferrer">Open source</a>
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

  function setMode(mode) {
    activeMode = mode;
    els.tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.mode === mode));
    els.panels.forEach((panel) => panel.classList.toggle("hidden", panel.dataset.panel !== mode));
    if (mode === "practice" && !practiceSession) renderPracticeIntro();
    if (mode === "flashcards") renderFlashcards();
    if (mode === "review") renderReview();
    if (mode === "sources") renderSources();
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

  function completedCount() {
    return allLessons.filter((lesson) => state.completedLessons[lesson.id]).length;
  }

  function getQuestionPool(type) {
    if (type === "missed") {
      return Object.keys(state.missedQuestions)
        .map((id) => COURSE.questions.find((question) => question.id === id))
        .filter(Boolean);
    }
    if (type === "class-a") {
      return COURSE.questions.filter((question) =>
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
      return COURSE.questions.filter((question) => question.topic === endorsementTopics[type]);
    }
    return COURSE.questions.filter((question) => question.exam === type);
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

  function escapeHtml(value) {
    return String(value)
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
