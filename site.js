// Theme toggle: follows the system theme until the visitor picks one.
(function () {
  var root = document.documentElement;
  var btn = document.getElementById("themeToggle");
  function current() {
    var t = root.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  btn.addEventListener("click", function () {
    var next = current() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
})();

// Mobile menu
(function () {
  var links = document.getElementById("navLinks");
  document.getElementById("menuBtn").addEventListener("click", function () {
    links.classList.toggle("open");
  });
  links.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { links.classList.remove("open"); });
  });
})();

// Client review marquee (duplicated so the loop is seamless)
(function () {
  var ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 20, 21, 22, 23];
  var track = document.getElementById("reviewTrack");
  var html = ids.map(function (n) {
    return '<div class="review"><img src="img/reviews/r' + n + '.png" alt="Client review" loading="lazy" /></div>';
  }).join("");
  track.innerHTML = html + html;
})();

// Reveal on scroll (fail-safe: checks on scroll and reveals everything after 2s)
(function () {
  var items = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  function check() {
    var h = window.innerHeight || document.documentElement.clientHeight;
    items = items.filter(function (el) {
      if (el.getBoundingClientRect().top < h * 0.92) { el.classList.add("visible"); return false; }
      return true;
    });
    if (!items.length) window.removeEventListener("scroll", check);
  }
  window.addEventListener("scroll", check, { passive: true });
  window.addEventListener("resize", check);
  check();
  setTimeout(function () {
    items.forEach(function (el) { el.classList.add("visible"); });
    items = [];
  }, 2000);
})();

document.getElementById("year").textContent = new Date().getFullYear();

// ===== Motion layer =====
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Scroll progress bar + nav shadow
  var bar = document.createElement("div");
  bar.className = "progress";
  document.body.appendChild(bar);
  var nav = document.querySelector(".nav");
  function onScroll() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = "scaleX(" + (max > 0 ? window.scrollY / max : 0) + ")";
    nav.classList.toggle("scrolled", window.scrollY > 10);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Hero background layers
  var hero = document.querySelector(".hero");
  if (hero) {
    var grid = document.createElement("div"); grid.className = "grid-bg";
    var aurora = document.createElement("div"); aurora.className = "aurora";
    hero.prepend(grid); hero.prepend(aurora);
  }

  // Staggered reveal delays for items in the same group
  document.querySelectorAll(".services, .apps, .projects, .stats, .timeline").forEach(function (group) {
    Array.prototype.forEach.call(group.children, function (el, i) {
      el.style.setProperty("--delay", (i % 4) * 0.09 + "s");
    });
  });

  if (reduce) return;

  // Rotating headline phrase
  var target = document.querySelector(".hero h1 .gradient-text");
  if (target) {
    var phrases = [
      target.textContent,
      "Kotlin & Jetpack Compose apps",
      "Flutter apps for iOS & Android",
      "biometric & NFC apps"
    ];
    target.classList.add("rotator");
    var idx = 0;
    setInterval(function () {
      target.classList.add("out");
      setTimeout(function () {
        idx = (idx + 1) % phrases.length;
        target.textContent = phrases[idx];
        target.classList.remove("out");
      }, 450);
    }, 3200);
  }

  // Count-up stats
  var stats = document.querySelectorAll(".stat strong");
  var counted = false;
  function countUp() {
    if (counted) return;
    var first = stats[0];
    if (!first || first.getBoundingClientRect().top > window.innerHeight) return;
    counted = true;
    stats.forEach(function (el) {
      var m = el.textContent.match(/^(\d+)(.*)$/);
      if (!m) return;
      var end = parseInt(m[1], 10), suffix = m[2], start = null;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / 1400, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(end * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      el.textContent = "0" + suffix;
      requestAnimationFrame(step);
    });
  }
  window.addEventListener("scroll", countUp, { passive: true });
  setTimeout(countUp, 300);

  // Spotlight that follows the cursor on cards
  document.querySelectorAll(".service, .app, .project, .job-card, .stat").forEach(function (card) {
    card.addEventListener("mousemove", function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", e.clientX - r.left + "px");
      card.style.setProperty("--my", e.clientY - r.top + "px");
    });
  });

  // 3D tilt on the portrait (desktop pointers only)
  var wrap = document.querySelector(".portrait-wrap");
  var portrait = document.querySelector(".portrait");
  if (wrap && portrait && window.matchMedia("(pointer: fine)").matches) {
    wrap.addEventListener("mousemove", function (e) {
      var r = wrap.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      portrait.style.transform = "rotateY(" + x * 12 + "deg) rotateX(" + -y * 12 + "deg)";
    });
    wrap.addEventListener("mouseleave", function () { portrait.style.transform = ""; });
  }
})();
