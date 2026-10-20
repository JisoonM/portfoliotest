(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");

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

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revealObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { revealObs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Active nav link ---------- */
  var navLinks = document.querySelectorAll(".nav-links a[href^='#']");
  var sections = [];
  navLinks.forEach(function (a) {
    var s = document.querySelector(a.getAttribute("href"));
    if (s) sections.push({ link: a, section: s });
  });

  if ("IntersectionObserver" in window && sections.length) {
    var navObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (l) { l.classList.remove("active"); });
        var match = sections.find(function (x) { return x.section === entry.target; });
        if (match && !match.link.classList.contains("nav-cta")) match.link.classList.add("active");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (x) { navObs.observe(x.section); });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
