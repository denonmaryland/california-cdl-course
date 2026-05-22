(function () {
  const COURSES = window.CDL_ENDORSEMENTS;
  const courseId = document.body.dataset.course;
  const course = COURSES[courseId];
  const storageKey = `ca-cdl-endorsement-${courseId}-v1`;

  const lessons = course.modules.flatMap((module, moduleIndex) =>
    module.lessons.map((lesson, lessonIndex) => ({
      moduleIndex,
      lessonIndex,
      id: `${moduleIndex}-${lessonIndex}`,
      title: lesson[0],
      summary: lesson[1],
      bullets: lesson[2],
      memory: lesson[3]
    }))
  );

  let state = loadState();
  let quiz = null;
  let cardIndex = 0;
  let cloudSync = null;

  const els = {
    title: document.getElementById("courseTitle"),
    eyebrow: document.getElementById("courseEyebrow"),
    subtitle: document.getElementById("courseSubtitle"),
    source: document.getElementById("courseSource"),
    progress: document.getElementById("progressValue"),
    score: document.getElementById("scoreValue"),
    lessonList: document.getElementById("lessonList"),
    quizArea: document.getElementById("quizArea"),
    flashcardArea: document.getElementById("flashcardArea"),
    resetButton: document.getElementById("resetProgress")
  };

  if (!course) {
    document.body.innerHTML = "<main class=\"course-shell\"><p>Endorsement course not found.</p></main>";
    return;
  }

  render();
  bind();
  initCloudSync();

  function bind() {
    els.resetButton.addEventListener("click", () => {
      const confirmed = window.confirm("Reset progress for this endorsement course?");
      if (!confirmed) return;
      localStorage.removeItem(storageKey);
      state = loadState();
      quiz = null;
      cardIndex = 0;
      render();
    });

    document.getElementById("startQuiz").addEventListener("click", () => {
      quiz = {
        current: 0,
        questions: shuffle(course.questions)
          .slice(0, Math.min(10, course.questions.length))
          .map(shuffleQuestionChoices),
        answers: {}
      };
      renderQuiz();
    });
  }

  function render() {
    document.title = `${course.title} Course`;
    els.eyebrow.textContent = `${course.code} Endorsement`;
    els.title.textContent = course.title;
    els.subtitle.textContent = course.subtitle;
    els.source.textContent = course.source;
    els.progress.textContent = `${Math.round((Object.keys(state.completed).length / lessons.length) * 100)}%`;
    els.score.textContent = state.bestScore ? `${state.bestScore}%` : "0%";
    renderLessons();
    renderQuizIntro();
    renderFlashcards();
  }

  function renderLessons() {
    els.lessonList.innerHTML = course.modules.map((module, moduleIndex) => `
      <section class="endorsement-module">
        <div class="module-title-row">
          <span class="module-number">${moduleIndex + 1}</span>
          <h2>${escapeHtml(module.title)}</h2>
        </div>
        ${module.lessons.map((lesson, lessonIndex) => {
          const id = `${moduleIndex}-${lessonIndex}`;
          const complete = Boolean(state.completed[id]);
          return `
            <article class="lesson-card ${complete ? "complete" : ""}">
              <div class="lesson-toggle static">
                <span class="lesson-index">${moduleIndex + 1}.${lessonIndex + 1}</span>
                <span class="lesson-name">${escapeHtml(lesson[0])}</span>
                <span class="lesson-status">${complete ? "Complete" : "Study"}</span>
              </div>
              <div class="lesson-body open-body">
                <p class="lesson-summary">${escapeHtml(lesson[1])}</p>
                <div class="lesson-grid">
                  <div>
                    <h3>Must Know</h3>
                    <ul>${lesson[2].map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
                  </div>
                  <div>
                    <h3>Memory Hook</h3>
                    <p class="memory-hook">${escapeHtml(lesson[3])}</p>
                    <h3>Recall Drill</h3>
                    <p class="drill-text">Close the page and explain this lesson in one minute. Reopen it and fill the gaps.</p>
                  </div>
                </div>
                <div class="study-coach endorsement-coach">
                  <p class="eyebrow">Exam cue</p>
                  <h3>Turn this into a test answer</h3>
                  <p>If DMV gives you a scenario about ${escapeHtml(lesson[0]).toLowerCase()}, choose the answer that protects control, inspection discipline, legal compliance, and extra space.</p>
                </div>
                <button class="complete-button" data-complete="${id}" ${complete ? "disabled" : ""} type="button">${complete ? "Completed" : "Mark Complete"}</button>
              </div>
            </article>
          `;
        }).join("")}
      </section>
    `).join("");

    Array.from(document.querySelectorAll("[data-complete]")).forEach((button) => {
      button.addEventListener("click", () => {
        state.completed[button.dataset.complete] = true;
        saveState();
        render();
      });
    });
  }

  function renderQuizIntro() {
    if (quiz) return;
    els.quizArea.innerHTML = `
      <div class="readiness-card">
        <h3>Endorsement Practice</h3>
        <p>Practice focuses only on this endorsement. Score 80% or better, then review any misses before moving on.</p>
      </div>
    `;
  }

  function renderQuiz() {
    if (!quiz) return renderQuizIntro();
    const q = quiz.questions[quiz.current];
    const answered = quiz.answers[quiz.current] !== undefined;
    const selected = quiz.answers[quiz.current];
    els.quizArea.innerHTML = `
      <article class="test-card">
        <div class="test-meta">
          <span class="pill">${quiz.current + 1} of ${quiz.questions.length}</span>
          <span class="pill ${course.accent === "red" ? "red" : course.accent === "amber" ? "amber" : "green"}">${escapeHtml(course.code)}</span>
        </div>
        <h3>${escapeHtml(q[0])}</h3>
        <div class="answer-grid">
          ${q[1].map((choice, index) => `
            <button class="answer-button ${answered && index === q[2] ? "correct" : ""} ${answered && selected === index && selected !== q[2] ? "incorrect" : ""}" data-answer="${index}" ${answered ? "disabled" : ""} type="button">${escapeHtml(choice)}</button>
          `).join("")}
        </div>
        <div class="feedback" aria-live="polite">${answered ? (selected === q[2] ? "Correct." : `Correct answer: ${escapeHtml(q[1][q[2]])}`) : ""}</div>
        <div class="practice-nav">
          <button class="secondary-button" id="quizPrev" ${quiz.current === 0 ? "disabled" : ""} type="button">Previous</button>
          <button class="secondary-button" id="quizNext" type="button">${quiz.current === quiz.questions.length - 1 ? "Finish" : "Next"}</button>
        </div>
      </article>
    `;

    Array.from(els.quizArea.querySelectorAll("[data-answer]")).forEach((button) => {
      button.addEventListener("click", () => {
        quiz.answers[quiz.current] = Number(button.dataset.answer);
        renderQuiz();
      });
    });
    document.getElementById("quizPrev").addEventListener("click", () => {
      quiz.current -= 1;
      renderQuiz();
    });
    document.getElementById("quizNext").addEventListener("click", () => {
      if (quiz.current === quiz.questions.length - 1) return finishQuiz();
      quiz.current += 1;
      renderQuiz();
    });
  }

  function finishQuiz() {
    const correct = quiz.questions.filter((question, index) => quiz.answers[index] === question[2]).length;
    const score = Math.round((correct / quiz.questions.length) * 100);
    state.bestScore = Math.max(state.bestScore || 0, score);
    saveState();
    els.score.textContent = `${state.bestScore}%`;
    els.quizArea.innerHTML = `
      <article class="test-card">
        <div class="test-meta">
          <span class="pill ${score >= 80 ? "green" : "red"}">${score}%</span>
          <span class="pill">${correct}/${quiz.questions.length} correct</span>
        </div>
        <h3>${score >= 80 ? "Passing-range result" : "Keep drilling this endorsement"}</h3>
        <p>${score >= 80 ? "Good. Use flashcards to keep recall fresh." : "Review the lessons above, then retake this quiz."}</p>
      </article>
    `;
    quiz = null;
  }

  function renderFlashcards() {
    const card = course.flashcards[cardIndex % course.flashcards.length];
    els.flashcardArea.innerHTML = `
      <article class="flashcard">
        <div class="test-meta">
          <span class="pill">${cardIndex + 1} of ${course.flashcards.length}</span>
          <span class="pill">${escapeHtml(course.code)}</span>
        </div>
        <div class="flashcard-front"><p>${escapeHtml(card[0])}</p></div>
        <div class="flashcard-back hidden" id="cardBack"><h3>Answer</h3><p>${escapeHtml(card[1])}</p></div>
        <div class="practice-nav">
          <button class="primary-button" id="showCard" type="button">Show Answer</button>
          <button class="secondary-button" id="nextCard" type="button">Next Card</button>
        </div>
      </article>
    `;
    document.getElementById("showCard").addEventListener("click", () => {
      document.getElementById("cardBack").classList.remove("hidden");
    });
    document.getElementById("nextCard").addEventListener("click", () => {
      cardIndex = (cardIndex + 1) % course.flashcards.length;
      renderFlashcards();
    });
  }

  function loadState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(storageKey) || "{}");
      return { completed: parsed.completed || {}, bestScore: parsed.bestScore || 0 };
    } catch (error) {
      return { completed: {}, bestScore: 0 };
    }
  }

  function saveState() {
    localStorage.setItem(storageKey, JSON.stringify(state));
    if (cloudSync) cloudSync.save(state);
  }

  function initCloudSync() {
    if (!window.createCDLCloudSync) return;
    cloudSync = window.createCDLCloudSync({
      storageKey,
      getState: () => state,
      setState: (nextState) => {
        state = normalizeState(nextState);
        localStorage.setItem(storageKey, JSON.stringify(state));
        render();
      },
      mergeState: mergeEndorsementState
    });
    cloudSync.init();
  }

  function normalizeState(value) {
    return {
      completed: value?.completed || {},
      bestScore: Number(value?.bestScore || 0)
    };
  }

  function mergeEndorsementState(remoteValue, localValue) {
    const remote = normalizeState(remoteValue);
    const local = normalizeState(localValue);
    return {
      completed: { ...remote.completed, ...local.completed },
      bestScore: Math.max(remote.bestScore, local.bestScore)
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

  function shuffleQuestionChoices(question) {
    const ordered = shuffle(question[1].map((text, index) => ({ text, correct: index === question[2] })));
    return [
      question[0],
      ordered.map((choice) => choice.text),
      ordered.findIndex((choice) => choice.correct)
    ];
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
})();
