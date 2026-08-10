/* Impact Partner application flow: step navigation, per-step validation,
   submit to /api/impact. Mirrors quiz.js conventions; deliberately no
   Calendly and no sales handoff at the end. */
(() => {
  const ENDPOINT = "/api/impact";
  const form = document.getElementById("impact-apply");
  if (!form) return;

  const steps = [...form.querySelectorAll(".quiz-step")];
  const FINISH_STEP = steps.length; /* the data-finish receipt */
  const LAST_INPUT_STEP = FINISH_STEP - 1;

  const backBtn = form.querySelector("[data-back]");
  const nextBtn = form.querySelector("[data-next]");
  const errorNote = form.querySelector("[data-form-error]");
  const progress = document.querySelector("[data-progress]");
  const progressCurrent = document.querySelector("[data-progress-current]");
  const progressTotal = document.querySelector("[data-progress-total]");
  const progressFill = document.querySelector("[data-progress-fill]");

  const track = (event, params) => window.gtag?.("event", event, params);

  const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  const search = new URLSearchParams(location.search);
  const utm = {};
  for (const key of UTM_KEYS) {
    const value = search.get(key);
    if (value) utm[key] = value.slice(0, 200);
  }

  let current = 1;
  let started = false;

  if (progressTotal) progressTotal.textContent = String(LAST_INPUT_STEP);

  const show = (n, { focusHeading = true } = {}) => {
    current = n;
    steps.forEach((s) => s.classList.toggle("is-active", Number(s.dataset.step) === n));
    const finished = n === FINISH_STEP;
    backBtn.hidden = n === 1 || finished;
    nextBtn.hidden = finished;
    nextBtn.textContent = n === LAST_INPUT_STEP ? "Submit application" : "Continue";
    if (progress) progress.style.display = finished ? "none" : "";
    if (progressCurrent) progressCurrent.textContent = String(Math.min(n, LAST_INPUT_STEP));
    if (progressFill) progressFill.style.width = `${(Math.min(n, LAST_INPUT_STEP) / LAST_INPUT_STEP) * 100}%`;
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    if (focusHeading) {
      const heading = steps[n - 1]?.querySelector("h1, h2");
      heading?.setAttribute("tabindex", "-1");
      heading?.focus({ preventScroll: true });
    }
  };

  const setInvalid = (el, invalid) => {
    el.setAttribute("aria-invalid", invalid ? "true" : "false");
    const err = form.querySelector(`[data-error-for="${el.id}"]`);
    if (err) err.classList.toggle("is-visible", invalid);
  };

  const validEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

  const validateStep = (n) => {
    const step = steps[n - 1];
    let ok = true;
    for (const el of step.querySelectorAll("input[required], textarea[required], select[required]")) {
      const value = el.type === "checkbox" ? (el.checked ? "x" : "") : el.value.trim();
      const invalid = !value || (el.type === "email" && !validEmail(value));
      setInvalid(el, invalid);
      if (invalid && ok) {
        el.focus();
        ok = false;
      }
    }
    return ok;
  };

  form.addEventListener("input", (e) => {
    if (!started) {
      started = true;
      track("impact_application_start", { page_type: "impact_apply" });
    }
    const el = e.target;
    if (el.matches?.("[aria-invalid='true']")) setInvalid(el, false);
  });

  const submit = async () => {
    if (!validateStep(LAST_INPUT_STEP)) return;
    errorNote?.classList.remove("is-visible");
    nextBtn.disabled = true;

    const data = Object.fromEntries(new FormData(form).entries());
    const payload = {
      ...data,
      ...utm,
      type: "application",
      page: location.origin + location.pathname,
      submitted_at: new Date().toISOString(),
    };

    let ok = false;
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      ok = res.ok;
    } catch {
      ok = false;
    }
    nextBtn.disabled = false;

    if (!ok) {
      /* Never silent: answers stay on screen with a recovery path */
      errorNote?.classList.add("is-visible");
      return;
    }

    track("impact_application_submit", { page_type: "impact_apply" });
    show(FINISH_STEP);
  };

  nextBtn.addEventListener("click", () => {
    if (current === LAST_INPUT_STEP) {
      submit();
      return;
    }
    if (!validateStep(current)) return;
    show(current + 1);
  });

  backBtn.addEventListener("click", () => {
    if (current > 1) show(current - 1);
  });

  /* Enter advances (except inside textareas) */
  form.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
      e.preventDefault();
      nextBtn.click();
    }
  });

  /* Initial paint: no programmatic focus, the page just loaded */
  show(1, { focusHeading: false });
})();
