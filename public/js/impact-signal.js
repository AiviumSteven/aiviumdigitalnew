/* The Signal — /impact/ hero console.
   Comp: .impeccable/comps/impact-hero-comp.png (approved on the
   impeccable decision page). One dominant trace runs the full width of
   the viewport and erupts into a dense, sharp burst center-right; a
   vertical cursor crosses it; faint greeked monitor rows fill the
   ground. The lock sequence plays once (sweep → green blip → burst
   blooms), then the burst breathes. Vermillion per Aivium Digital.
   Reduced motion: the final locked frame renders statically. */
(() => {
  const canvas = document.querySelector(".impact-hero__field");
  const hero = document.querySelector(".impact-hero");
  const lockChip = document.getElementById("impact-lock");
  if (!canvas || !hero) return;

  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const CREAM = "246, 242, 234";
  const ACCENT = "229, 57, 27";
  const GREEN = "62, 207, 142";

  const ROWS = 30;            /* faint greeked monitor rows */
  const SWEEP_START = 350;    /* ms after boot */
  const SWEEP_MS = 1600;
  const BURST_X = 0.56;       /* burst center, fraction of width */
  const BURST_W = 0.2;        /* gaussian width, fraction of width */
  const CURSOR_X = 0.655;     /* vertical cursor, right edge of burst */
  const AMP_MS = 1500;        /* bloom duration after lock */

  let w = 0, h = 0, dpr = 1;
  let rows = [];
  let bootAt = 0;
  let lockedAt = 0;
  let chipShown = false;

  /* Seeded PRNG so the console composes identically on every load */
  let seed = 20260807;
  const rand = (min, max) => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return min + (seed / 2147483648) * (max - min);
  };

  const buildRows = () => {
    seed = 20260807;
    rows = [];
    for (let i = 0; i < ROWS; i++) {
      rows.push({
        y: (i + 0.5) / ROWS,
        alpha: rand(0.07, 0.15),
        amp: rand(1.2, 2.6),
        f: rand(0.02, 0.05),
        p: rand(0, Math.PI * 2),
        /* segmented, text-like dashes */
        dash: [rand(30, 110), rand(14, 46)],
        offset: rand(0, 160),
      });
    }
  };

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = hero.clientWidth;
    h = hero.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  /* Sharp seismograph burst: gaussian envelope over three carriers */
  const burst = (x, now, power) => {
    const u = (x - w * BURST_X) / (w * BURST_W);
    const env = Math.exp(-u * u * 2.1);
    if (env < 0.004) return 0;
    const carrier =
      Math.sin(x * 0.34 + now * 0.00042) * 0.46 +
      Math.sin(x * 0.85 + 1.7 + now * 0.00058) * 0.34 +
      Math.sin(x * 1.63 + 4.2) * 0.2;
    const breathe = 1 + 0.05 * Math.sin(now * 0.0009);
    const ceiling = Math.min(200, h * 0.24);
    return carrier * env * ceiling * power * breathe;
  };

  const drawRows = (now, fadeIn) => {
    for (const r of rows) {
      ctx.beginPath();
      ctx.setLineDash(r.dash);
      ctx.lineDashOffset = r.offset;
      const yBase = r.y * h;
      for (let x = 0; x <= w; x += 8) {
        const y = yBase + Math.sin(x * r.f + r.p + now * 0.00012) * r.amp;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(${CREAM}, ${r.alpha * fadeIn})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    ctx.setLineDash([]);
  };

  const ACCENT_BRIGHT = "240, 62, 31";

  const drawMainTrace = (now, power) => {
    const yBase = h * 0.5;
    ctx.beginPath();
    for (let x = 0; x <= w; x += 2) {
      const idle = Math.sin(x * 0.045 + now * 0.0003) * 1.6;
      const y = yBase + idle + burst(x, now, power);
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    /* Halo pass, then a bright core: the comp's luminous presence */
    ctx.strokeStyle = `rgba(${ACCENT}, ${0.22 + 0.14 * power})`;
    ctx.lineWidth = 3.4;
    ctx.shadowColor = `rgba(${ACCENT}, 0.6)`;
    ctx.shadowBlur = 18 * power;
    ctx.stroke();
    ctx.strokeStyle = `rgba(${ACCENT_BRIGHT}, ${0.7 + 0.28 * power})`;
    ctx.lineWidth = 1.5;
    ctx.shadowBlur = 8 * power;
    ctx.stroke();
    ctx.shadowBlur = 0;
  };

  const drawCursor = (fadeIn) => {
    const x = w * CURSOR_X;
    const top = h * 0.08;
    const bottom = h * 0.92;
    ctx.strokeStyle = `rgba(${CREAM}, ${0.34 * fadeIn})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, top);
    ctx.lineTo(x, bottom);
    ctx.stroke();
    /* the small marker head, as in the comp */
    ctx.fillStyle = `rgba(${CREAM}, ${0.4 * fadeIn})`;
    ctx.beginPath();
    ctx.moveTo(x - 4, top);
    ctx.lineTo(x + 4, top);
    ctx.lineTo(x, top + 7);
    ctx.closePath();
    ctx.fill();
  };

  const drawSweep = (x) => {
    const grad = ctx.createLinearGradient(x - 70, 0, x, 0);
    grad.addColorStop(0, `rgba(${CREAM}, 0)`);
    grad.addColorStop(1, `rgba(${CREAM}, 0.08)`);
    ctx.fillStyle = grad;
    ctx.fillRect(x - 70, 0, 70, h);
    ctx.fillStyle = `rgba(${CREAM}, 0.3)`;
    ctx.fillRect(x, 0, 1, h);
  };

  const drawLockBlip = (elapsed) => {
    if (elapsed > 1400) return;
    const t = elapsed / 1400;
    ctx.beginPath();
    ctx.arc(w * BURST_X, h * 0.5, 6 + 30 * easeOut(t), 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(${GREEN}, ${0.5 * (1 - t)})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  };

  const showChip = () => {
    if (chipShown) return;
    chipShown = true;
    lockChip?.classList.add("is-locked");
  };

  const frame = (now) => {
    if (!bootAt) bootAt = now;
    const t = now - bootAt;
    ctx.clearRect(0, 0, w, h);

    const fadeIn = Math.min(t / 700, 1);
    const sweepT = (t - SWEEP_START) / SWEEP_MS;
    const sweepX = sweepT > 0 && sweepT < 1 ? easeOut(sweepT) * w : null;
    const lockMoment = SWEEP_START + SWEEP_MS * BURST_X;
    if (t >= lockMoment && !lockedAt) {
      lockedAt = t;
      showChip();
    }
    const power = lockedAt ? easeOut(Math.min((t - lockedAt) / AMP_MS, 1)) : 0;

    drawRows(now, fadeIn);
    drawCursor(fadeIn);
    drawMainTrace(now, power);
    if (sweepX !== null) drawSweep(sweepX);
    if (lockedAt) drawLockBlip(t - lockedAt);

    requestAnimationFrame(frame);
  };

  const staticFrame = () => {
    ctx.clearRect(0, 0, w, h);
    drawRows(2400, 1);
    drawCursor(1);
    drawMainTrace(2400, 1);
    showChip();
  };

  buildRows();
  resize();

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
      if (reduceMotion) staticFrame();
    }, 150);
  });

  if (reduceMotion) {
    staticFrame();
  } else {
    requestAnimationFrame(frame);
  }
})();
