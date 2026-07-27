/* Discovery quiz: one question per screen, auto-advance on select,
   contact step, lead POST to the CRM proxy, then the Calendly embed.
   The proxy holds the Attio token server-side; nothing secret lives here. */
(() => {
  const form = document.getElementById("quiz");
  if (!form) return;

  /* Same-origin Astro endpoint; ATTIO_TOKEN lives server-side in .env. */
  const LEAD_ENDPOINT = "/api/lead";

  const CALENDLY_URL = "https://calendly.com/aivium/aivium-digital-discovery-call";

  const QUESTIONS = {
    growth_outcome: {
      label: "What is your most important growth outcome?",
      options: [
        "Generate more qualified leads.",
        "Improve visibility in current markets.",
        "Expand into new locations or service areas.",
        "Convert more website traffic.",
        "Reduce dependence on paid leads or referrals.",
        "Improve visibility in AI-generated recommendations.",
      ],
    },
    customer_source: {
      label: "How do most new customers currently find you?",
      options: [
        "Google Search or Google Maps.",
        "Referrals and word of mouth.",
        "Paid advertising.",
        "Social media.",
        "Lead marketplaces or directories.",
        "Outbound sales.",
        "We do not know.",
      ],
    },
    current_problem: {
      label: "Which statement best describes the current problem?",
      options: [
        "We are not consistently visible for important searches.",
        "We receive traffic, but not enough qualified leads.",
        "We generate leads, but too many fail to convert.",
        "We miss calls or respond too slowly.",
        "We cannot reliably connect marketing to revenue.",
        "Our marketing channels feel disconnected.",
        "We are unsure what the actual problem is.",
      ],
    },
    response_speed: {
      label: "How quickly are new inquiries normally contacted?",
      options: [
        "Immediately or within five minutes.",
        "Within 30 minutes.",
        "Within a few hours.",
        "By the next business day.",
        "It varies considerably.",
        "We do not track this.",
      ],
    },
    annual_revenue: {
      label: "What is your approximate annual revenue?",
      options: [
        "Under $1 million.",
        "$1 million–$2 million.",
        "$2 million–$5 million.",
        "$5 million–$10 million.",
        "$10 million–$25 million.",
        "More than $25 million.",
        "Prefer not to say.",
      ],
    },
    marketing_budget: {
      label: "What does your current monthly marketing investment look like?",
      options: [
        "Under $2,500.",
        "$2,500–$5,000.",
        "$5,000–$15,000.",
        "$15,000–$30,000.",
        "More than $30,000.",
        "We do not have a defined budget.",
      ],
    },
    locations: {
      label: "How many locations or meaningful service territories do you operate?",
      options: [
        "One.",
        "Two to five.",
        "Six to ten.",
        "More than ten.",
        "We serve a national or non-location-based market.",
      ],
    },
    timeline: {
      label: "When do you want to improve this?",
      options: [
        "Immediately.",
        "Within 30 days.",
        "Within 90 days.",
        "Later this year.",
        "Researching for now.",
      ],
    },
    role: {
      label: "What is your role?",
      options: [
        "Owner, founder, or CEO.",
        "President or general manager.",
        "Marketing executive.",
        "Marketing manager.",
        "Operations executive.",
        "Other.",
      ],
    },
  };

  const LETTERS = "ABCDEFGHIJ";
  const steps = [...form.querySelectorAll(".quiz-step")];
  const contactStep = steps.findIndex((s) => s.querySelector(".quiz-fields"));
  const finishIndex = steps.findIndex((s) => s.hasAttribute("data-finish"));
  const totalSteps = steps.length - 1; /* finish screen is not a "question" */
  const backBtn = form.querySelector("[data-back]");
  const submitBtn = form.querySelector("[data-submit]");
  const progress = document.querySelector("[data-progress]");
  const progressCurrent = progress.querySelector("[data-progress-current]");
  const progressFill = progress.querySelector("[data-progress-fill]");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const saved = (() => {
    try { return JSON.parse(sessionStorage.getItem("aivium-quiz") || "{}"); }
    catch { return {}; }
  })();
  const answers = saved.answers || {};

  /* Render option rows */
  Object.entries(QUESTIONS).forEach(([key, q]) => {
    const wrap = form.querySelector(`[data-question="${key}"]`);
    wrap.innerHTML = q.options
      .map(
        (text, i) => `
      <label class="quiz-option">
        <input type="radio" name="${key}" value="${text.replace(/"/g, "&quot;")}"
          ${answers[key] === text ? "checked" : ""} />
        <span class="quiz-option__key">${LETTERS[i]}</span>
        <span class="quiz-option__text">${text}</span>
        <span class="quiz-option__ring" aria-hidden="true"></span>
      </label>`
      )
      .join("");
  });

  let current = 0;

  const persist = () => {
    try { sessionStorage.setItem("aivium-quiz", JSON.stringify({ answers })); }
    catch { /* private mode: fine, state just lives in memory */ }
  };

  const show = (index) => {
    current = index;
    steps.forEach((s, i) => s.classList.toggle("is-active", i === index));
    const onFinish = index === finishIndex;

    backBtn.hidden = index === 0 || onFinish;
    submitBtn.hidden = index !== contactStep;

    if (onFinish) {
      progress.style.display = "none";
    } else {
      progress.style.display = "";
      progressCurrent.textContent = String(index + 1);
      progressFill.style.width = `${((index + 1) / totalSteps) * 100}%`;
    }

    const heading = steps[index].querySelector(".quiz-step__question");
    if (heading) heading.setAttribute("tabindex", "-1");
    if (!reduceMotion) window.scrollTo({ top: 0, behavior: "smooth" });
    else window.scrollTo(0, 0);
  };

  /* Auto-advance on option select */
  form.addEventListener("change", (e) => {
    const input = e.target.closest('.quiz-options input[type="radio"]');
    if (!input) return;
    answers[input.name] = input.value;
    persist();
    if (current < contactStep) {
      setTimeout(() => show(current + 1), reduceMotion ? 0 : 260);
    }
  });

  backBtn.addEventListener("click", () => {
    if (current > 0) show(current - 1);
  });

  /* Contact validation */
  const setInvalid = (input, invalid) => {
    input.setAttribute("aria-invalid", invalid ? "true" : "false");
    const err = form.querySelector(`[data-error-for="${input.id}"]`);
    if (err) err.classList.toggle("is-visible", invalid);
  };

  const validEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

  const validateContact = () => {
    let ok = true;
    for (const id of ["q-name", "q-email", "q-company", "q-website"]) {
      const input = document.getElementById(id);
      const value = input.value.trim();
      const invalid = !value || (id === "q-email" && !validEmail(value));
      setInvalid(input, invalid);
      if (invalid && ok) {
        input.focus();
        ok = false;
      }
    }
    return ok;
  };

  const contact = () => ({
    name: document.getElementById("q-name").value.trim(),
    email: document.getElementById("q-email").value.trim(),
    company: document.getElementById("q-company").value.trim(),
    website: document.getElementById("q-website").value.trim(),
    phone: document.getElementById("q-phone").value.trim(),
    notes: document.getElementById("q-notes").value.trim(),
  });

  const sendLead = async (payload) => {
    if (!LEAD_ENDPOINT) {
      console.warn("Quiz: LEAD_ENDPOINT not configured; skipping CRM capture.");
      return;
    }
    try {
      await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      });
    } catch (err) {
      /* Never block booking on CRM failure */
      console.error("Quiz: lead capture failed", err);
    }
  };

  const mountCalendly = (c) => {
    const host = form.querySelector("[data-calendly]");
    if (host.dataset.mounted) return;
    host.dataset.mounted = "true";
    const params = new URLSearchParams({
      hide_gdpr_banner: "1",
      background_color: "090c10",
      text_color: "f6f2ea",
      primary_color: "e5391b",
    });
    if (c.name) params.set("name", c.name);
    if (c.email) params.set("email", c.email);
    const widget = document.createElement("div");
    widget.className = "calendly-inline-widget";
    widget.dataset.url = `${CALENDLY_URL}?${params}`;
    host.appendChild(widget);
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (current !== contactStep || !validateContact()) return;

    submitBtn.disabled = true;
    const c = contact();
    const labeled = {};
    Object.entries(QUESTIONS).forEach(([key, q]) => {
      labeled[q.label] = answers[key] || "(skipped)";
    });
    sendLead({ contact: c, answers: labeled, page: location.href, submitted_at: new Date().toISOString() });

    try { sessionStorage.removeItem("aivium-quiz"); } catch { /* noop */ }
    mountCalendly(c);
    show(finishIndex);
    submitBtn.disabled = false;
  });

  /* Enter on a radio advances (change already fired on selection) */
  show(0);
})();
