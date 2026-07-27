/* Flight path: one clock drives the signal pulses and the waypoint
   lock-ins, so a circle lights the moment the pulse touches it and
   everything resets together when the cycle reloops. */
(() => {
  const chart = document.querySelector(".flow__chart");
  if (!chart) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const paths = chart.querySelectorAll(".flow__pulses path");
  const dots = [...chart.querySelectorAll(".flow__waypoints circle")];
  const rings = [...chart.querySelectorAll(".flow__waypoint-rings circle")];
  const planet = document.querySelector(".flow__planet");
  const graph = chart.querySelector(".flow__graph-line");
  const graphDot = chart.querySelector(".flow__graph-dot");
  if (paths.length < 3 || dots.length < 7) return;

  const T = 6500; // full cycle in ms
  const LAUNCH_END = 0.15; // launch segment finishes, lanes begin
  const LANES_END = 0.9; // lanes arrive; the growth beat runs to 100%

  /* Fraction of a path's length nearest to (x, y) */
  const fractionAlong = (path, x, y) => {
    const len = path.getTotalLength();
    let best = 0;
    let bestD = Infinity;
    for (let s = 0; s <= len; s += 2) {
      const p = path.getPointAtLength(s);
      const d = (p.x - x) ** 2 + (p.y - y) ** 2;
      if (d < bestD) {
        bestD = d;
        best = s;
      }
    }
    return best / len;
  };

  /* When (as a fraction of the cycle) the signal hits each waypoint.
     Dot order: discovery, then lane A x3, then lane B x3. */
  const hitAt = (i, laneIndex) => {
    const cx = +dots[i].getAttribute("cx");
    const cy = +dots[i].getAttribute("cy");
    const f = fractionAlong(paths[laneIndex], cx, cy);
    return LAUNCH_END + f * (LANES_END - LAUNCH_END);
  };
  const hits = [
    { i: 0, at: LAUNCH_END },
    { i: 1, at: hitAt(1, 1) },
    { i: 2, at: hitAt(2, 1) },
    { i: 3, at: hitAt(3, 1) },
    { i: 4, at: hitAt(4, 2) },
    { i: 5, at: hitAt(5, 2) },
    { i: 6, at: hitAt(6, 2) },
  ];

  /* Dash of length 3 on a normalized 100-length path: offset 3 parks
     it just before the start (hidden); it must travel 103 units so it
     fully exits past the end (-100) instead of freezing on it. */
  const offsetFor = (from, to, t) => {
    if (t <= from) return 3;
    if (t >= to) return -100;
    return 3 - 103 * ((t - from) / (to - from));
  };

  const t0 = performance.now();
  const tick = (now) => {
    const t = ((now - t0) % T) / T;

    paths[0].style.strokeDashoffset = offsetFor(0, LAUNCH_END, t);
    paths[1].style.strokeDashoffset = offsetFor(LAUNCH_END, LANES_END, t);
    paths[2].style.strokeDashoffset = offsetFor(LAUNCH_END, LANES_END, t);

    hits.forEach((h) => {
      const lit = t >= h.at;
      dots[h.i].classList.toggle("is-lit", lit);
      rings[h.i].classList.toggle("is-lit", lit);
    });
    if (planet) planet.classList.toggle("is-lit", t >= LANES_END);

    /* Growth beat: draw the tick-up over the first 70% of the hold,
       then pop the end dot; everything resets with the cycle */
    if (graph) {
      const q = t >= LANES_END ? (t - LANES_END) / (1 - LANES_END) : 0;
      const draw = Math.min(1, q / 0.7);
      graph.style.strokeDashoffset = 100 - 100 * draw;
      if (graphDot) graphDot.classList.toggle("is-on", draw >= 1);
    }

    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
})();
