/* /impact/ page behavior: nominate + notify submissions to /api/impact,
   CTA + FAQ analytics events. No PII ever enters an analytics payload. */
(() => {
  const ENDPOINT = "/api/impact";
  const track = (event, params) => window.gtag?.("event", event, params);

  /* UTM passthrough: preserved into the CRM payload only */
  const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  const search = new URLSearchParams(location.search);
  const utm = {};
  for (const key of UTM_KEYS) {
    const value = search.get(key);
    if (value) utm[key] = value.slice(0, 200);
  }

  /* CTA clicks */
  document.querySelectorAll("[data-impact-cta]").forEach((el) => {
    el.addEventListener("click", () => {
      const which = el.dataset.impactCta;
      if (which === "apply") track("impact_apply_click", { page_type: "impact" });
      if (which === "nominate") track("impact_nominate_click", { page_type: "impact" });
    });
  });

  /* FAQ opens */
  document.querySelectorAll("[data-faq-index]").forEach((d) => {
    d.addEventListener("toggle", () => {
      if (d.open) track("impact_faq_open", { faq_index: d.dataset.faqIndex ?? "" });
    });
  });

  /* Forms: nomination + interest */
  document.querySelectorAll("[data-impact-form]").forEach((form) => {
    const kind = form.dataset.impactForm;
    const errorNote = form.querySelector("[data-form-error]");
    const success = form.parentElement?.querySelector("[data-form-success]");
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      errorNote?.classList.remove("is-visible");

      const data = Object.fromEntries(new FormData(form).entries());
      const payload = {
        ...data,
        ...utm,
        type: kind,
        page: location.origin + location.pathname,
        submitted_at: new Date().toISOString(),
      };

      if (submitBtn) submitBtn.disabled = true;
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
      if (submitBtn) submitBtn.disabled = false;

      if (!ok) {
        /* Never a silent failure: keep everything typed on screen */
        errorNote?.classList.add("is-visible");
        return;
      }

      track(kind === "nomination" ? "impact_nomination_submit" : "impact_notify_submit", {
        page_type: "impact",
      });
      form.hidden = true;
      success?.classList.add("is-visible");
    });
  });
})();
