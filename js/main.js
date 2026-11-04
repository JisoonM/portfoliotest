(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js", "wired");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function smooth(a, b, v) { var t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); }
  function easeOut(t) { return 1 - Math.pow(1 - t, 4); }
  function lerp(a, b, t) { return a + (b - a) * t; }

  /* ---------- Theme toggle ---------- */
  var themeBtn = document.getElementById("theme-toggle");
  var onThemeChange = function () {};
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) { /* storage unavailable */ }
      onThemeChange();
    });
  }

  /* ---------- Pin nav, rail and current-section label ---------- */
  var pinsEl = document.getElementById("pins");
  var pinLinks = pinsEl ? Array.prototype.slice.call(pinsEl.querySelectorAll(".pin")) : [];
  var railWires = Array.prototype.slice.call(document.querySelectorAll(".rail i"));
  var hereEl = document.getElementById("here");
  var sections = Array.prototype.slice.call(document.querySelectorAll("[data-pin]"));

  function setActive(pin) {
    pinLinks.forEach(function (a, i) {
      var on = i === pin - 1;
      a.classList.toggle("is-on", on);
      if (on) { a.setAttribute("aria-current", "true"); } else { a.removeAttribute("aria-current"); }
      if (railWires[i]) railWires[i].classList.toggle("is-on", on);
    });
    var railEl = document.getElementById("rail");
    // Faded wires turn muddy over a colour field, so solid pins run the rail at full strength
    if (railEl) railEl.classList.toggle("on-field", pin % 2 === 0);
    if (hereEl && pinLinks[pin - 1]) hereEl.textContent = pinLinks[pin - 1].textContent;
    // Reaching the last section connects all eight pins
    if (pinsEl) pinsEl.classList.toggle("all-lit", pin === 8);
  }
  setActive(1);

  if ("IntersectionObserver" in window) {
    var navObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(parseInt(entry.target.getAttribute("data-pin"), 10));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { navObs.observe(s); });
  }

  /* ---------- Hero wires: T568B conductors drawn on canvas, plucked by the pointer ---------- */
  var ORDER = [
    { c: "orange", striped: true, pair: 0, sign: 1 },
    { c: "orange", striped: false, pair: 0, sign: -1 },
    { c: "green", striped: true, pair: 1, sign: 1 },
    { c: "blue", striped: false, pair: 2, sign: 1 },
    { c: "blue", striped: true, pair: 2, sign: -1 },
    { c: "green", striped: false, pair: 1, sign: -1 },
    { c: "brown", striped: true, pair: 3, sign: 1 },
    { c: "brown", striped: false, pair: 3, sign: -1 }
  ];
  var canvas = document.getElementById("wires");
  var hero = document.getElementById("intro");
  var rail = document.getElementById("rail");
  var redrawWires = function () {};

  if (canvas && canvas.getContext) {
    (function () {
      var ctx = canvas.getContext("2d");
      var W = 0, H = 0, dpr = 1, hasRail = false, step = 5;
      var colors = {};
      var wires = [];
      var running = false;
      var startTime = null;
      var pointer = null;

      function readColors() {
        var st = getComputedStyle(root);
        var dark = root.getAttribute("data-theme") === "dark";
        colors = {
          orange: st.getPropertyValue("--w-orange").trim(),
          green: st.getPropertyValue(dark ? "--lit-green" : "--w-green").trim(),
          blue: st.getPropertyValue(dark ? "--lit-blue" : "--w-blue").trim(),
          brown: st.getPropertyValue(dark ? "--lit-brown" : "--w-brown").trim(),
          white: st.getPropertyValue("--w-white").trim(),
          edge: dark ? "#050607" : "#85898b"
        };
      }

      function measure() {
        var r = canvas.getBoundingClientRect();
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        W = Math.round(r.width); H = Math.round(r.height);
        canvas.width = W * dpr; canvas.height = H * dpr;
        hasRail = window.innerWidth >= 1100;
        step = W > 900 ? 5 : 4;
        build();
      }

      // One polyline per wire. Samples on the free span carry a displacement for the pluck.
      function build() {
        var railX = 20, pitch = 7, spread = hasRail ? 42 : (W > 700 ? 34 : 24);
        var amp = hasRail ? 11 : (W > 700 ? 9 : 6);
        var wave = hasRail ? 150 : 104;
        var maxW = hasRail ? 15 : (W > 700 ? 12 : 9);
        var leftPitch = hasRail ? pitch : 9;
        var yc = hasRail ? Math.min(H * 0.46, H - 120) : H * 0.5;
        var y0 = hasRail ? yc - 3.5 * pitch - 8 : yc - 3.5 * leftPitch;
        var R0 = 62;
        wires = ORDER.map(function (o, i) {
          var pts = [];
          var xStart = hasRail ? railX + 2.5 + i * pitch : -12;
          var yLeft = y0 + i * leftPitch;
          if (hasRail) {
            // Vertical run up from the canvas bottom, then a concentric arc into the band
            for (var yy = H + 4; yy > y0 + R0; yy -= step) pts.push({ x: xStart, y: yy, w: 5, free: -1, front: true });
            var cx = railX + 2.5 + R0, cy = y0 + R0, R = R0 - i * pitch;
            var arcSteps = Math.max(4, Math.ceil((R * Math.PI / 2) / step));
            for (var a = 0; a <= arcSteps; a++) {
              var th = Math.PI + (a / arcSteps) * (Math.PI / 2);
              pts.push({ x: cx + Math.cos(th) * R, y: cy + Math.sin(th) * R, w: 5, free: -1, front: true });
            }
          }
          var x0 = hasRail ? railX + 2.5 + R0 : xStart;
          var span = W + 24 - x0;
          var n = Math.ceil(span / step);
          var free = 0;
          for (var k = 0; k <= n; k++) {
            var u = k / n, x = x0 + u * span;
            var twist = smooth(hasRail ? 0.2 : 0.08, hasRail ? 0.52 : 0.42, u);
            var phase = (x / wave) * Math.PI * 2 + o.pair * 1.1;
            var yPair = yc + (o.pair - 1.5) * spread + o.sign * amp * Math.sin(phase);
            pts.push({
              x: x, y: lerp(yLeft, yPair, twist),
              w: lerp(hasRail ? 5 : 3.5, maxW, smooth(0, hasRail ? 0.5 : 0.45, u)),
              free: free++, front: o.sign * Math.cos(phase) >= 0 || twist < 0.5
            });
          }
          var s = 0;
          for (var p = 0; p < pts.length; p++) {
            if (p) s += Math.hypot(pts[p].x - pts[p - 1].x, pts[p].y - pts[p - 1].y);
            pts[p].s = s;
          }
          // Continuous runs, split only at over/under crossings and small taper steps
          var runs = [];
          pts.forEach(function (pt, idx) {
            var bw = Math.round(pt.w * 2) / 2;
            var cur = runs[runs.length - 1];
            if (cur && cur.front === pt.front && cur.w === bw) { cur.to = idx; } else { runs.push({ from: idx, to: idx, front: pt.front, w: bw }); }
          });
          return { o: o, pts: pts, runs: runs, len: s, d: new Float32Array(free), v: new Float32Array(free) };
        });
      }

      // Trace part of a wire as one path. Returns the arc length where it starts, or -1 if hidden.
      function trace(w, from, to, min, max) {
        var started = false, startS = -1;
        ctx.beginPath();
        for (var k = from; k <= to; k++) {
          var p = w.pts[k];
          if (p.s < min || p.s > max) continue;
          var y = p.y + (p.free >= 0 ? w.d[p.free] : 0);
          if (started) { ctx.lineTo(p.x, y); } else { ctx.moveTo(p.x, y); started = true; startS = p.s; }
        }
        return startS;
      }

      function drawPass(reveal, front, time) {
        wires.forEach(function (w, i) {
          var limit = w.len * (1 - reveal[i]);
          var last = w.pts.length - 1;
          var glintAt = -1;
          if (time !== null) {
            var gt = (time - 1500 - i * 120) / 620;
            if (gt >= 0 && gt <= 1) glintAt = w.len * (1 - easeOut(gt));
          }
          // Edges first, so one run's edge can't tick across the fill of the run before it
          ctx.setLineDash([]);
          ctx.strokeStyle = colors.edge;
          w.runs.forEach(function (run) {
            if (run.front !== front) return;
            if (trace(w, run.from, Math.min(run.to + 2, last), limit, Infinity) < 0) return;
            ctx.lineWidth = run.w + 1.4;
            ctx.stroke();
          });
          w.runs.forEach(function (run) {
            if (run.front !== front) return;
            var to = Math.min(run.to + 2, last);
            var startS = trace(w, run.from, to, limit, Infinity);
            if (startS < 0) return;
            ctx.strokeStyle = w.o.striped ? colors.white : colors[w.o.c];
            ctx.lineWidth = run.w;
            ctx.stroke();
            if (w.o.striped) {
              ctx.setLineDash([30, 14]);
              ctx.lineDashOffset = startS % 44;
              ctx.strokeStyle = colors[w.o.c];
              ctx.stroke();
              ctx.setLineDash([]);
            }
            if (glintAt >= 0 && trace(w, run.from, to, glintAt - 34, glintAt + 34) >= 0) {
              ctx.strokeStyle = "#ffffff";
              ctx.stroke();
            }
          });
        });
      }

      function draw(time) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, W, H);
        ctx.lineCap = "butt";
        ctx.lineJoin = "round";
        var reveal = ORDER.map(function (o, i) {
          if (time === null) return 1;
          return easeOut(clamp((time - i * 55) / 1300, 0, 1));
        });
        drawPass(reveal, false, time);
        drawPass(reveal, true, time);
      }

      function physics() {
        var energy = 0;
        wires.forEach(function (w) {
          var n = w.d.length;
          for (var sub = 0; sub < 2; sub++) {
            for (var k = 1; k < n - 1; k++) {
              w.v[k] += (w.d[k - 1] + w.d[k + 1] - 2 * w.d[k]) * 0.22;
              w.v[k] *= 0.992;
            }
            for (var j = 1; j < n - 1; j++) {
              w.d[j] = clamp(w.d[j] + w.v[j], -30, 30) * 0.9985;
              energy += Math.abs(w.v[j]);
            }
          }
        });
        return energy;
      }

      function frame(now) {
        if (!startTime) startTime = now;
        var t = now - startTime;
        var intro = t < 2900;
        var energy = physics();
        draw(intro ? t : null);
        if (intro || energy > 0.6) {
          requestAnimationFrame(frame);
        } else {
          running = false;
          wires.forEach(function (w) { w.d.fill(0); w.v.fill(0); });
          draw(null);
        }
      }
      function wake() {
        if (running || reduceMotion) return;
        running = true;
        requestAnimationFrame(frame);
      }

      function pluck(e) {
        var r = canvas.getBoundingClientRect();
        var px = e.clientX - r.left, py = e.clientY - r.top;
        if (pointer && !reduceMotion) {
          var dy = clamp(py - pointer.y, -22, 22);
          var moved = Math.abs(px - pointer.x) + Math.abs(dy);
          if (moved > 0) {
            wires.forEach(function (w) {
              for (var p = 0; p < w.pts.length; p += 3) {
                var q = w.pts[p];
                if (q.free < 2 || q.free > w.d.length - 3) continue;
                var dist = Math.hypot(q.x - px, q.y + w.d[q.free] - py);
                if (dist < 34) w.v[q.free] += (dy || (py > q.y ? -2 : 2)) * 0.05 * (1 - dist / 34);
              }
            });
            wake();
          }
        }
        pointer = { x: px, y: py };
      }
      canvas.addEventListener("pointermove", pluck, { passive: true });
      canvas.addEventListener("pointerleave", function () { pointer = null; });

      function resize() {
        var keepIntro = startTime !== null && running;
        measure();
        if (!keepIntro) draw(null);
      }
      var resizeTimer = null;
      window.addEventListener("resize", function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resize, 120);
      });

      redrawWires = function () { readColors(); if (!running) draw(null); };
      onThemeChange = function () { redrawWires(); };

      readColors();
      measure();
      if (reduceMotion) {
        draw(null);
      } else {
        draw(0);
        wake();
        // No frames yet (background tab, link preview): show the finished wires until they come
        setTimeout(function () { if (!startTime) draw(null); }, 1200);
        // Header pins answer the same continuity test the wires run
        pinLinks.forEach(function (a, i) {
          setTimeout(function () { a.classList.add("is-test"); }, 1500 + i * 120);
          setTimeout(function () { a.classList.remove("is-test"); }, 1980 + i * 120);
        });
      }
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { measure(); if (!running) draw(null); });
    })();
  }

  /* ---------- Scroll-linked: fields open from their wire, branches run out, jacket print moves ---------- */
  var fields = Array.prototype.slice.call(document.querySelectorAll(".field")).map(function (el) {
    return { el: el, inner: el.querySelector(".field-inner"), pin: parseInt(el.getAttribute("data-pin"), 10) };
  });
  var branches = Array.prototype.slice.call(document.querySelectorAll(".branch")).map(function (el) {
    return { el: el, line: el.querySelector("i") };
  });
  var jacketWrap = document.querySelector(".jacket");
  var jacket = document.getElementById("jacket");
  if (jacket) {
    var print = "CHATGPT · CODEX · CLAUDE · CLAUDE CODE · WINDSURF · GEMINI · PROMPT ENGINEERING · WORKFLOW AUTOMATION · ";
    jacket.textContent = print + print + print + print + print + print;
  }

  // Where a field's wire sits: the rail on desktop, its pin in the header row on smaller screens
  function wireX(pin, width) {
    var rw = railWires[pin - 1];
    var r = rw && rw.offsetParent !== null ? rw.getBoundingClientRect() : null;
    if (r && r.width) return r.left;
    var link = pinLinks[pin - 1];
    if (link) { var lr = link.getBoundingClientRect(); return lr.left + lr.width / 2; }
    return width / 2;
  }

  var ticking = false;
  function update() {
    ticking = false;
    var vh = window.innerHeight, vw = document.documentElement.clientWidth;

    if (rail && hero) {
      var heroBottom = hero.getBoundingClientRect().bottom;
      rail.style.clipPath = "inset(" + Math.max(0, Math.round(heroBottom)) + "px 0 0 0)";
    }

    if (!reduceMotion) {
      fields.forEach(function (f) {
        var top = f.el.getBoundingClientRect().top;
        var p = smooth(0, 1, (vh * 0.96 - top) / (vh * 0.56));
        if (p >= 1) { f.inner.style.clipPath = "none"; return; }
        var x = wireX(f.pin, vw);
        var left = lerp(x, 0, p);
        var right = lerp(vw - x - 5, 0, p);
        f.inner.style.clipPath = "inset(0 " + right.toFixed(1) + "px 0 " + left.toFixed(1) + "px)";
      });
      branches.forEach(function (b) {
        var top = b.el.getBoundingClientRect().top;
        var p = smooth(0, 1, (vh * 0.92 - top) / (vh * 0.5));
        b.line.style.transform = "scaleX(" + p.toFixed(4) + ")";
      });
      if (jacket && jacketWrap) {
        var jr = jacketWrap.getBoundingClientRect();
        if (jr.bottom > 0 && jr.top < vh) jacket.style.transform = "translateX(" + (-(vh - jr.top) * 0.35).toFixed(1) + "px)";
      }
    }
  }
  function requestUpdate() {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  update();

  /* ---------- Project screenshots open once when they enter view ---------- */
  var shots = document.querySelectorAll(".shot");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var shotObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-open");
          shotObs.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -18% 0px" });
    shots.forEach(function (s) { shotObs.observe(s); });
  } else {
    shots.forEach(function (s) { s.classList.add("is-open"); });
  }

  /* ---------- Wiremap tester: break the cable, then fix it ---------- */
  var FAULTS = {
    open: {
      map: [1, 2, 3, 4, 5, null, 7, 8], bad: [6],
      test: "Fail. Pin 6 shows no continuity.",
      isolate: "Only pin 6 fails, so I check that conductor at both terminations first.",
      fix: "Re-terminated the connector. 8 of 8 pass.",
      doc: "Logged the fault, the cause and the fix."
    },
    crossed: {
      map: [3, 6, 1, 4, 5, 2, 7, 8], bad: [1, 2, 3, 6],
      test: "Fail. Pairs 1/2 and 3/6 land on each other's pins.",
      isolate: "Every wire has continuity, so nothing is broken. One end follows a different standard.",
      fix: "Re-terminated both ends to T568B. 8 of 8 pass.",
      doc: "Logged it, and noted the standard for this site."
    },
    reversed: {
      map: [1, 2, 3, 4, 5, 6, 8, 7], bad: [7, 8],
      test: "Fail. Pins 7 and 8 are swapped.",
      isolate: "Only one pair is affected, so this is a termination mistake at one end.",
      fix: "Re-seated the pair in the right order. 8 of 8 pass.",
      doc: "Logged the fault and the fix."
    }
  };
  var testerMap = document.getElementById("tester-map");
  if (testerMap) {
    (function () {
      var NS = "http://www.w3.org/2000/svg";
      var STYLE = [
        ["#e8701a", true], ["#e8701a", false], ["#2aa35c", true], ["#2f73e0", false],
        ["#2f73e0", true], ["#2aa35c", false], ["#9a6238", true], ["#9a6238", false]
      ];
      var buttons = Array.prototype.slice.call(document.querySelectorAll("[data-fault]"));
      var fixBtn = document.getElementById("tester-fix");
      var steps = {};
      Array.prototype.forEach.call(document.querySelectorAll("#tester-steps li"), function (li) { steps[li.getAttribute("data-step")] = li; });
      var live = document.getElementById("tester-live");
      var timers = [];
      var current = null;
      var INTACT = [1, 2, 3, 4, 5, 6, 7, 8];
      var nearX = 26, farX = 374;
      function yOf(pin) { return 12 + (pin - 1) * 27; }

      function el(name, attrs, parent) {
        var n = document.createElementNS(NS, name);
        Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
        if (parent) parent.appendChild(n);
        return n;
      }
      function pathFor(pin, far) {
        var y0 = yOf(pin);
        if (far === null) return "M" + nearX + " " + y0 + " H205";
        var y1 = yOf(far);
        return "M" + nearX + " " + y0 + " C150 " + y0 + " 250 " + y1 + " " + farX + " " + y1;
      }

      var rows = [];
      for (var i = 1; i <= 8; i++) {
        el("text", { x: 4, y: yOf(i) + 3.5 }, testerMap).textContent = i;
        var farLabel = el("text", { x: 396, y: yOf(i) + 3.5, "text-anchor": "end" }, testerMap);
        farLabel.textContent = i;
        var style = STYLE[i - 1];
        var g = el("g", { fill: "none", "stroke-width": 6 }, testerMap);
        var base = el("path", { stroke: style[1] ? "#f7f7f4" : style[0], pathLength: 1, "stroke-dasharray": 1 }, g);
        var stripe = style[1] ? el("path", { stroke: style[0], "stroke-dasharray": "14 9" }, g) : null;
        rows.push({ base: base, stripe: stripe, far: farLabel, target: i });
      }

      var breakMark = el("path", { fill: "none", stroke: "#ff8a7a", "stroke-width": 2.5, visibility: "hidden" }, testerMap);

      function render(map, bad, animate, changedOnly) {
        var openPin = map.indexOf(null) + 1;
        if (openPin) {
          var by = yOf(openPin);
          breakMark.setAttribute("d", "M214 " + (by - 6) + "l12 12m0 -12l-12 12");
          breakMark.setAttribute("visibility", "visible");
        } else {
          breakMark.setAttribute("visibility", "hidden");
        }
        rows.forEach(function (r, idx) {
          var pin = idx + 1, d = pathFor(pin, map[idx]);
          var changed = r.base.getAttribute("d") !== d;
          r.base.setAttribute("d", d);
          if (r.stripe) r.stripe.setAttribute("d", d);
          r.far.setAttribute("class", bad.indexOf(pin) >= 0 ? "bad" : "");
          if (animate && (changed || !changedOnly) && !reduceMotion) {
            r.base.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: 520, easing: "cubic-bezier(0.16,1,0.3,1)", delay: changedOnly ? 0 : idx * 30, fill: "backwards" });
            if (r.stripe) r.stripe.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 260, delay: 300, fill: "backwards" });
          }
          r.base.setAttribute("stroke-dashoffset", 0);
        });
      }

      function clearTimers() { timers.forEach(clearTimeout); timers = []; }
      function setStep(name, text, state) {
        var li = steps[name];
        li.querySelector("span").textContent = text || "";
        li.className = state || "";
      }
      function after(ms, fn) { timers.push(setTimeout(fn, reduceMotion ? 0 : ms)); }
      function press(active) {
        buttons.forEach(function (b) { b.setAttribute("aria-pressed", String(b === active)); });
      }

      function inject(name, btn) {
        clearTimers();
        var f = FAULTS[name];
        current = f;
        press(btn);
        fixBtn.disabled = true;
        fixBtn.textContent = "Re-terminate";
        setStep("test", "Testing pins 1 to 8.", "is-now");
        setStep("isolate", ""); setStep("fix", ""); setStep("document", "");
        render(f.map, f.bad, true, true);
        after(620, function () {
          setStep("test", f.test, "is-done is-bad");
          if (live) live.textContent = f.test;
        });
        after(1250, function () {
          setStep("isolate", f.isolate, "is-now");
          fixBtn.disabled = false;
          if (live) live.textContent = f.isolate;
        });
      }

      function repair() {
        if (!current) return;
        clearTimers();
        var f = current;
        current = null;
        fixBtn.disabled = true;
        setStep("isolate", f.isolate, "is-done");
        render(INTACT, [], true, true);
        setStep("fix", f.fix, "is-done");
        if (live) live.textContent = f.fix;
        after(650, function () {
          setStep("test", "Pass. All 8 pins connected.", "is-done is-pass");
          setStep("document", f.doc, "is-done");
          if (live) live.textContent = f.doc;
          press(null);
        });
      }

      buttons.forEach(function (b) {
        b.setAttribute("aria-pressed", "false");
        b.addEventListener("click", function () { inject(b.getAttribute("data-fault"), b); });
      });
      fixBtn.addEventListener("click", repair);
      render(INTACT, [], false, false);
    })();
  }

  /* ---------- Copy email ---------- */
  var copyBtn = document.getElementById("copy-email");
  var copyHint = document.getElementById("copy-hint");
  if (copyBtn) {
    var copyTimer = null;
    copyBtn.addEventListener("click", function () {
      var email = copyBtn.getAttribute("data-email");
      if (!navigator.clipboard) { window.location.href = "mailto:" + email; return; }
      navigator.clipboard.writeText(email).then(function () {
        copyHint.textContent = "Copied to clipboard";
        clearTimeout(copyTimer);
        copyTimer = setTimeout(function () { copyHint.textContent = "Copy email"; }, 2000);
      }, function () { window.location.href = "mailto:" + email; });
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
