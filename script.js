// =============================
// SMOOTH SCROLL (fallback)
// =============================
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (!id || id === "#") return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// =============================
// METRICS COUNT UP
// =============================
(function () {
  const counters = document.querySelectorAll(".metric-number");
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = Number(el.getAttribute("data-target")) || 0;
    const duration = 900; // ms
    const start = performance.now();
    const from = 0;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.floor(from + (target - from) * progress);
      el.textContent = value.toString();
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach((c) => observer.observe(c));
})();
