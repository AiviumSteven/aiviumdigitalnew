/* Navigation: scroll state, mobile overlay, scroll-spy */
(() => {
  const nav = document.querySelector("[data-nav]");
  if (!nav) return;

  const toggle = nav.querySelector(".nav__toggle");
  const overlay = document.getElementById("nav-overlay");

  /* Glass bar once the page scrolls */
  const onScroll = () => {
    nav.classList.toggle("nav--scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Mobile overlay */
  const setOpen = (open) => {
    nav.classList.toggle("nav--open", open);
    toggle.setAttribute("aria-expanded", String(open));
    overlay.inert = !open;
    document.body.classList.toggle("nav-locked", open);
  };

  toggle.addEventListener("click", () => {
    setOpen(nav.classList.contains("nav--open") === false);
  });

  overlay.addEventListener("click", (e) => {
    if (e.target.closest("a")) setOpen(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("nav--open")) {
      setOpen(false);
      toggle.focus();
    }
  });

  const desktop = window.matchMedia("(min-width: 768px)");
  desktop.addEventListener("change", (e) => {
    if (e.matches) setOpen(false);
  });

  /* Scroll-spy: mark the section currently in view */
  const links = [...nav.querySelectorAll('.nav__links a[href^="#"]')];
  const byId = new Map();
  links.forEach((link) => {
    const section = document.querySelector(link.hash);
    if (section) byId.set(section.id, link);
  });

  if (byId.size > 0) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const link = byId.get(entry.target.id);
          if (entry.isIntersecting) {
            links.forEach((l) => l.removeAttribute("aria-current"));
            link.setAttribute("aria-current", "true");
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    byId.forEach((_, id) => spy.observe(document.getElementById(id)));
  }
})();
