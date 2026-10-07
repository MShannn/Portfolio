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
