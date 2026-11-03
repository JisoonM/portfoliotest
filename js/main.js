(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header border once scrolled ---------- */
  var header = document.querySelector(".site-header");
  function onScrollHeader() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------- Theme toggle ---------- */
  var themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) { /* storage unavailable */ }
    });
  }

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.getElementById("menu-toggle");
  var links = document.getElementById("nav-links");

  function setMenu(open) {
    if (!menuBtn || !links) return;
    links.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  if (menuBtn && links) {
    menuBtn.addEventListener("click", function () {
      setMenu(menuBtn.getAttribute("aria-expanded") !== "true");
    });
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
    window.matchMedia("(min-width: 901px)").addEventListener("change", function (e) {
      if (e.matches) setMenu(false);
    });
  }

  /* ---------- Reveal on scroll (with short stagger inside groups) ---------- */
  document.querySelectorAll("[data-stagger]").forEach(function (group) {
    group.querySelectorAll(".reveal").forEach(function (el, i) {
      el.style.setProperty("--d", Math.min(i, 6) * 60 + "ms");
    });
  });

  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    revealEls.forEach(function (el) { revealObs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Active nav link + sliding indicator ---------- */
  var navLinks = document.querySelectorAll(".nav-links a[href^='#']");
  var indicator = document.querySelector(".nav-indicator");
  var sections = [];
  navLinks.forEach(function (a) {
    var s = document.querySelector(a.getAttribute("href"));
    if (s) sections.push({ link: a, section: s });
  });

  function moveIndicator(link) {
    if (!indicator) return;
    if (!link || link.classList.contains("nav-cta")) {
      indicator.classList.remove("visible");
      return;
    }
    indicator.style.width = link.offsetWidth + "px";
    indicator.style.transform = "translateX(" + link.offsetLeft + "px)";
    indicator.classList.add("visible");
  }

  if ("IntersectionObserver" in window && sections.length) {
    var navObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (l) { l.classList.remove("active"); });
        var match = sections.find(function (x) { return x.section === entry.target; });
        var link = match && !match.link.classList.contains("nav-cta") ? match.link : null;
        if (link) link.classList.add("active");
        moveIndicator(link);
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (x) { navObs.observe(x.section); });

    var home = document.getElementById("home");
    if (home) {
      new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          navLinks.forEach(function (l) { l.classList.remove("active"); });
          moveIndicator(null);
        }
      }, { rootMargin: "-45% 0px -50% 0px" }).observe(home);
    }
    window.addEventListener("resize", function () {
      moveIndicator(document.querySelector(".nav-links a.active"));
    });
  }

  /* ---------- Pause decorative loops when off-screen or tab hidden ---------- */
  function whileVisible(el, start, stop) {
    if (!el) return;
    var onScreen = false;
    function sync() {
      if (onScreen && !document.hidden) start(); else stop();
    }
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        onScreen = entries[0].isIntersecting;
        sync();
      }).observe(el);
    } else {
      onScreen = true;
      sync();
    }
    document.addEventListener("visibilitychange", sync);
  }

  /* ---------- Hero rotating word ---------- */
  var words = document.querySelectorAll(".rotator-word");
  var wordIndex = 0;
  var wordTimer = null;
  function nextWord() {
    var current = words[wordIndex];
    wordIndex = (wordIndex + 1) % words.length;
    var next = words[wordIndex];
    current.classList.remove("is-active");
    current.classList.add("is-leaving");
    next.classList.remove("is-leaving");
    next.classList.add("is-active");
  }
  if (words.length > 1) {
    whileVisible(document.querySelector(".rotator"),
      function () { if (!wordTimer) wordTimer = setInterval(nextWord, 2600); },
      function () { clearInterval(wordTimer); wordTimer = null; });
  }

  /* ---------- Ops console feed ---------- */
  var log = document.getElementById("console-log");
  var latency = document.getElementById("latency");
  var messages = [
    ["ok", "Backup job completed, restore test passed"],
    ["ok", "POS terminal 03 synced with payment gateway"],
    ["", "Security patches applied to 12 endpoints"],
    ["ok", "Firewall rules reviewed, no anomalies"],
    ["", "Ticket #214 resolved: printer offline"],
    ["ok", "Network uplink healthy across all sites"],
    ["", "SOP updated: new-hire device setup"],
    ["ok", "Access audit complete, 0 issues"]
  ];
  var msgIndex = 0;
  var logTimer = null;

  function stamp() {
    var d = new Date();
    return [d.getHours(), d.getMinutes(), d.getSeconds()].map(function (n) {
      return String(n).padStart(2, "0");
    }).join(":");
  }

  function pushLine() {
    var m = messages[msgIndex];
    msgIndex = (msgIndex + 1) % messages.length;
    var li = document.createElement("li");
    li.setAttribute("data-enter", "");
    var time = document.createElement("time");
    time.textContent = stamp();
    var text = document.createElement("span");
    if (m[0]) text.className = m[0];
    text.textContent = m[1];
    li.appendChild(time);
    li.appendChild(text);
    log.insertBefore(li, log.firstChild);
    // Next frame: drop the start state so the transition runs
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { li.removeAttribute("data-enter"); });
    });
    while (log.children.length > 6) log.removeChild(log.lastChild);

    if (latency) latency.textContent = 14 + Math.round(Math.random() * 9);
  }

  if (log) {
    for (var i = 0; i < 4; i++) pushLine();
    Array.prototype.forEach.call(log.children, function (li) { li.removeAttribute("data-enter"); });
    whileVisible(log,
      function () { if (!logTimer) logTimer = setInterval(pushLine, 2800); },
      function () { clearInterval(logTimer); logTimer = null; });
  }

  /* ---------- Count-up numbers ---------- */
  var counters = document.querySelectorAll("[data-count]");
  function countUp(el) {
    var to = parseInt(el.getAttribute("data-count"), 10);
    var from = parseInt(el.getAttribute("data-from") || "0", 10);
    var duration = 1400;
    var startTime = null;
    function frame(t) {
      if (!startTime) startTime = t;
      var p = Math.min((t - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(from + (to - from) * eased);
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  if (!reduceMotion && "IntersectionObserver" in window) {
    var countObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        countUp(entry.target);
        countObs.unobserve(entry.target);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) {
      el.textContent = el.getAttribute("data-from") || "0";
      countObs.observe(el);
    });
  }

  /* ---------- Timeline progress follows scroll ---------- */
  var timeline = document.getElementById("timeline");
  var progress = document.getElementById("timeline-progress");
  var ticking = false;
  function updateProgress() {
    ticking = false;
    var rect = timeline.getBoundingClientRect();
    var anchor = window.innerHeight * 0.6;
    var p = (anchor - rect.top) / rect.height;
    progress.style.transform = "scaleY(" + Math.max(0, Math.min(1, p)).toFixed(4) + ")";
  }
  if (timeline && progress) {
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(updateProgress); }
    }, { passive: true });
    updateProgress();
  }

  /* ---------- Cursor spotlight on cards ---------- */
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.querySelectorAll(".spot").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mx", e.clientX - r.left + "px");
        card.style.setProperty("--my", e.clientY - r.top + "px");
      });
    });
  }

  /* ---------- Copy email ---------- */
  var copyBtn = document.getElementById("copy-email");
  if (copyBtn && navigator.clipboard) {
    var label = copyBtn.querySelector(".copy-label");
    var resetTimer = null;
    copyBtn.addEventListener("click", function () {
      navigator.clipboard.writeText(copyBtn.getAttribute("data-email")).then(function () {
        label.setAttribute("data-state", "done");
        clearTimeout(resetTimer);
        resetTimer = setTimeout(function () { label.setAttribute("data-state", "idle"); }, 2000);
      });
    });
  } else if (copyBtn) {
    // No clipboard API (e.g. insecure context): fall back to opening the mail client
    copyBtn.addEventListener("click", function () {
      window.location.href = "mailto:" + copyBtn.getAttribute("data-email");
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
