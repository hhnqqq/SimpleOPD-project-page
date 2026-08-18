/* ══════════════════════════════════════════════════════════════
   SimpleOPD — Project Page interactions
   ══════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ─────────── Navbar scroll state + active section ─────────── */
  const nav = document.getElementById("nav");
  const backToTop = document.getElementById("back-to-top");
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = Array.from(navLinks).map((a) => document.querySelector(a.getAttribute("href")));

  function onScroll() {
    nav.classList.toggle("scrolled", window.scrollY > 30);
    backToTop.classList.toggle("visible", window.scrollY > 700);
    let current = sections[0];
    for (const sec of sections) {
      if (sec && sec.getBoundingClientRect().top <= 140) current = sec;
    }
    navLinks.forEach((a) =>
      a.classList.toggle("active", a.getAttribute("href") === `#${current ? current.id : ""}`)
    );
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ─────────── Scroll reveal ─────────── */
  const revealEls = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => io.observe(el));

  /* ─────────── Animated counters ─────────── */
  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const duration = 1800;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  const counterIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          counterIO.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  document.querySelectorAll(".metric-num, .data-count").forEach((el) => counterIO.observe(el));

  /* ─────────── SVG series draw-on-scroll ─────────── */
  function prepareSeries() {
    document.querySelectorAll(".series polyline").forEach((pl) => {
      const len = pl.getTotalLength();
      pl.style.setProperty("--len", len);
    });
  }
  if (!prefersReduced) {
    window.addEventListener("load", prepareSeries);
    // re-measure after fonts/layout settle
    setTimeout(prepareSeries, 800);
  }

  /* ─────────── Copy BibTeX ─────────── */
  const copyBtn = document.getElementById("copy-btn");
  if (copyBtn) {
    const isZh = () => document.documentElement.lang === "zh";
    copyBtn.addEventListener("click", async () => {
      const code = document.getElementById("citation-code").innerText;
      try {
        await navigator.clipboard.writeText(code);
        copyBtn.textContent = isZh() ? (translations.zh.citation.copied) : "Copied ✓";
        copyBtn.classList.add("copied");
        setTimeout(() => {
          copyBtn.textContent = isZh() ? (translations.zh.citation.copy) : "Copy";
          copyBtn.classList.remove("copied");
        }, 2200);
      } catch {
        copyBtn.textContent = isZh() ? (translations.zh.citation.pressCtrl) : "Press Ctrl+C";
      }
    });
  }

  /* ─────────── Lightbox: click figure images to enlarge ─────────── */
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.setAttribute("aria-hidden", "true");
  document.body.appendChild(lightbox);

  function openLightbox(src, alt) {
    lightbox.innerHTML = "";
    const img = document.createElement("img");
    img.src = src;
    if (alt) img.alt = alt;
    lightbox.appendChild(img);
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  document.querySelectorAll(".figure-card img, figure img").forEach((img) => {
    img.addEventListener("click", () => openLightbox(img.src, img.alt || ""));
  });
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target.tagName === "IMG") closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

  /* ─────────── Magnetic hover on takeaway cards ─────────── */
  if (!prefersReduced) {
    document.querySelectorAll(".takeaway-card").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    });
  }

  /* ─────────── Hero token particle canvas ─────────── */
  const canvas = document.getElementById("tokens-canvas");
  if (canvas && !prefersReduced) {
    const ctx = canvas.getContext("2d");
    let W, H, tokens = [];

    const WORDS = ["Given", "the", "prob", "lem", "we", "show", "that", "lemma", "proof", "Q.E.D.",
      "∥", "⊕", "τ", "ρ", "Σ", "π", "y₁", "z₁", "align", "span", "<\u200C/think>", "<\u200C|im_end|\u200C>"];
    const COLORS = ["rgba(56,189,248,", "rgba(129,140,248,", "rgba(167,139,250,", "rgba(244,114,182,", "rgba(251,191,36,"];

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    function spawnToken(init) {
      const size = 9 + Math.random() * 13;
      return {
        x: Math.random() * W,
        y: init ? Math.random() * H : H + 10 + Math.random() * 60,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -(0.25 + Math.random() * 0.75),
        size,
        text: WORDS[Math.floor(Math.random() * WORDS.length)],
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rot: (Math.random() - 0.5) * 0.6,
        vr: (Math.random() - 0.5) * 0.01,
        age: 0,
      };
    }
    function init() {
      resize();
      const count = Math.min(46, Math.floor((W * H) / 34000));
      tokens = Array.from({ length: count }, () => spawnToken(true));
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (let i = tokens.length - 1; i >= 0; i--) {
        const t = tokens[i];
        t.x += t.vx; t.y += t.vy; t.rot += t.vr; t.age++;
        if (t.y < -60) { tokens[i] = spawnToken(false); continue; }
        const fadeIn = Math.min(1, t.age / 60);
        const fadeOut = Math.min(1, Math.max(0, (t.y + 60) / 120));
        ctx.save();
        ctx.translate(t.x, t.y);
        ctx.rotate(t.rot);
        ctx.globalAlpha = fadeIn * fadeOut * 0.5;
        ctx.font = `600 ${t.size}px "JetBrains Mono", monospace`;
        ctx.fillStyle = t.color + "0.5)";
        const tw = ctx.measureText(t.text).width;
        ctx.strokeStyle = t.color + "0.55)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(-tw / 2 - 4, -t.size / 2 - 2, tw + 8, t.size + 4, 4);
        ctx.stroke();
        ctx.fillText(t.text, -tw / 2, t.size / 3);
        ctx.restore();
      }
      requestAnimationFrame(draw);
    }
    init();
    draw();
    window.addEventListener("resize", resize);
  } else if (canvas) {
    canvas.style.display = "none";
  }
})();
