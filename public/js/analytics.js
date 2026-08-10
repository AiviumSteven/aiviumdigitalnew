/* GA4 (G-F4KTW1YDCM) — page views plus the lead-focused event layer.
   Loaded on every page from BaseLayout. No form values or other PII are
   ever sent; events carry only page_type / cta_location / cta_label.
   The quiz's submit_lead_form event fires from quiz.js on a validated
   submission. AI-referral channel grouping is GA4 Admin config, not code. */
(() => {
  const ID = "G-F4KTW1YDCM";

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  const gtagJs = document.createElement("script");
  gtagJs.async = true;
  gtagJs.src = `https://www.googletagmanager.com/gtag/js?id=${ID}`;
  document.head.appendChild(gtagJs);

  const pageType = (path) => {
    if (path === "/") return "home";
    if (path.startsWith("/signals/")) return path === "/signals/" ? "signals_index" : "signal_article";
    if (path === "/discovery/") return "lead_funnel";
    if (path === "/impact/") return "impact";
    if (path.startsWith("/impact/")) return "impact_apply";
    if (path.startsWith("/locations/")) return "location";
    if (path.startsWith("/industries/")) return "industry";
    if (path === "/case-studies/") return "case_studies";
    if (["/ai-seo/", "/ai-automation/", "/services/", "/ai-visibility-audit/"].includes(path)) return "service";
    if (["/about/", "/about-steven/", "/process/"].includes(path)) return "company";
    if (path === "/privacy/") return "legal";
    return "other";
  };

  const page_type = pageType(location.pathname.replace(/\/?$/, "/"));
  gtag("js", new Date());
  gtag("config", ID, { page_type });

  /* Where on the page a click happened: nav, footer, or the nearest
     section id — never any user-entered content. */
  const locationOf = (el) => {
    if (el.closest("nav, header")) return "nav";
    if (el.closest("footer")) return "footer";
    return el.closest("[id]")?.id || "body";
  };

  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a) return;
    const href = a.getAttribute("href") || "";
    const common = { page_type, cta_location: locationOf(a) };

    if (href.startsWith("tel:")) {
      gtag("event", "click_phone", common);
    } else if (href.startsWith("mailto:")) {
      gtag("event", "click_email", common);
    } else if (href === "/discovery/" || href.startsWith("/discovery/")) {
      gtag("event", "click_book_discovery", { ...common, cta_label: a.textContent.trim().slice(0, 60) });
    } else if (a.host && a.host !== location.host && a.closest(".mission__sources")) {
      gtag("event", "outbound_source_click", { ...common, link_domain: a.host });
    }
  });

  /* Quiz funnel: first interaction with the quiz = start_lead_form.
     (Validated submission fires submit_lead_form from quiz.js.) */
  const quiz = document.getElementById("quiz");
  if (quiz) {
    let started = false;
    quiz.addEventListener(
      "click",
      () => {
        if (started) return;
        started = true;
        gtag("event", "start_lead_form", { page_type });
      },
      { once: false },
    );
  }
})();
