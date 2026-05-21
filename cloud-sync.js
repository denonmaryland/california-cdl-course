(function () {
  const config = window.CDL_SUPABASE || {};
  const configured = Boolean(config.url && config.anonKey && window.supabase);

  window.createCDLCloudSync = function createCDLCloudSync(options) {
    const elements = {
      status: document.getElementById("cloudStatus"),
      detail: document.getElementById("cloudDetail"),
      email: document.getElementById("cloudEmail"),
      password: document.getElementById("cloudPassword"),
      signIn: document.getElementById("cloudSignIn"),
      signUp: document.getElementById("cloudSignUp"),
      signOut: document.getElementById("cloudSignOut")
    };

    if (!configured) {
      setStatus("Local progress only", "Cloud sync is not configured yet.");
      setControls(false);
      return { init: noop, save: noop };
    }

    const client = window.supabase.createClient(config.url, config.anonKey);
    let session = null;
    let saving = false;
    let saveTimer = null;

    async function init() {
      elements.signIn?.addEventListener("click", () => signIn(false));
      elements.signUp?.addEventListener("click", () => signIn(true));
      elements.signOut?.addEventListener("click", signOut);
      setStatus("Checking sync...", "Looking for an existing sign-in.");

      const { data } = await client.auth.getSession();
      await handleSession(data.session);
      client.auth.onAuthStateChange((_event, nextSession) => {
        handleSession(nextSession);
      });
    }

    async function handleSession(nextSession) {
      session = nextSession;
      if (!session?.user) {
        setStatus("Local progress only", "Sign in to sync progress between this computer and your phone.");
        setControls(false);
        return;
      }
      setStatus("Signed in", session.user.email || "Progress sync is active.");
      setControls(true);
      await loadRemote();
    }

    async function signIn(createAccount) {
      const email = elements.email?.value.trim();
      const password = elements.password?.value;
      if (!email || !password) {
        setStatus("Email and password required", "Enter both fields to sync progress.");
        return;
      }
      setStatus(createAccount ? "Creating account..." : "Signing in...", "Please wait.");
      const result = createAccount
        ? await client.auth.signUp({ email, password })
        : await client.auth.signInWithPassword({ email, password });
      if (result.error) {
        setStatus("Sync sign-in failed", result.error.message);
        return;
      }
      if (!result.data.session && createAccount) {
        setStatus("Check your email", "Confirm the Supabase sign-up email, then sign in here.");
      }
    }

    async function signOut() {
      await client.auth.signOut();
      session = null;
      setStatus("Local progress only", "Signed out. Progress still remains on this device.");
      setControls(false);
    }

    async function loadRemote() {
      const { data, error } = await client
        .from("cdl_course_progress")
        .select("progress, updated_at")
        .eq("course_key", options.storageKey)
        .maybeSingle();

      if (error) {
        setStatus("Sync table needs setup", error.message);
        return;
      }

      if (data?.progress) {
        const merged = options.mergeState(data.progress, options.getState());
        options.setState(merged);
        setStatus("Synced", `Progress loaded from cloud. Last cloud update: ${formatDate(data.updated_at)}.`);
        await saveNow(merged);
      } else {
        await saveNow(options.getState());
        setStatus("Synced", "Cloud progress created for this course.");
      }
    }

    function save(progress) {
      if (!session?.user || saving) return;
      clearTimeout(saveTimer);
      saveTimer = setTimeout(() => saveNow(progress), 650);
    }

    async function saveNow(progress) {
      if (!session?.user) return;
      saving = true;
      const { error } = await client
        .from("cdl_course_progress")
        .upsert({
          user_id: session.user.id,
          course_key: options.storageKey,
          progress,
          updated_at: new Date().toISOString()
        }, { onConflict: "user_id,course_key" });
      saving = false;
      if (error) {
        setStatus("Sync save failed", error.message);
      } else {
        setStatus("Synced", "Progress saved to the cloud.");
      }
    }

    function setControls(signedIn) {
      if (elements.email) elements.email.disabled = signedIn;
      if (elements.password) elements.password.disabled = signedIn;
      if (elements.signIn) elements.signIn.classList.toggle("hidden", signedIn);
      if (elements.signUp) elements.signUp.classList.toggle("hidden", signedIn);
      if (elements.signOut) elements.signOut.classList.toggle("hidden", !signedIn);
    }

    function setStatus(status, detail) {
      if (elements.status) elements.status.textContent = status;
      if (elements.detail) elements.detail.textContent = detail;
    }

    function formatDate(value) {
      try {
        return new Intl.DateTimeFormat(undefined, {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit"
        }).format(new Date(value));
      } catch (_error) {
        return "recently";
      }
    }

    return { init, save };
  };

  function noop() {}
})();
