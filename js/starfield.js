/* Starfield: sparse, slow, cold. Stars drift imperceptibly and a few
   twinkle. Collapses to a static render under prefers-reduced-motion. */

(function () {
  const canvas = document.querySelector(".hero__stars");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const STAR_DENSITY = 0.00012; // stars per px^2
  let stars = [];
  let raf = null;

  function seed() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const { clientWidth: w, clientHeight: h } = canvas.parentElement;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.round(w * h * STAR_DENSITY);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() < 0.85 ? Math.random() * 0.7 + 0.3 : Math.random() * 1.1 + 0.9,
      base: Math.random() * 0.5 + 0.25,
      phase: Math.random() * Math.PI * 2,
      twinkle: Math.random() < 0.18,
      drift: Math.random() * 0.008 + 0.002,
    }));
  }

  function draw(t) {
    const { clientWidth: w, clientHeight: h } = canvas.parentElement;
    ctx.clearRect(0, 0, w, h);
    for (const s of stars) {
      let alpha = s.base;
      if (s.twinkle && t !== undefined) {
        alpha = s.base * (0.6 + 0.4 * Math.sin(t / 1400 + s.phase));
      }
      // fade stars to zero above the planet rim (~58% of hero height)
      alpha *= Math.max(0, 1 - s.y / (h * 0.55));
      ctx.globalAlpha = alpha;
      ctx.fillStyle = "#f6f2ea";
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
      if (t !== undefined) {
        s.x -= s.drift;
        if (s.x < -2) s.x = w + 2;
      }
    }
    ctx.globalAlpha = 1;
  }

  function loop(t) {
    draw(t);
    raf = requestAnimationFrame(loop);
  }

  function start() {
    cancelAnimationFrame(raf);
    seed();
    if (reduceMotion.matches) {
      draw(); // single static frame
    } else {
      raf = requestAnimationFrame(loop);
    }
  }

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(start, 150);
  });
  reduceMotion.addEventListener("change", start);

  start();
})();
