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
    copyBtn.addEventListener("click", async () => {
      const code = document.getElementById("citation-code").innerText;
      try {
        await navigator.clipboard.writeText(code);
        copyBtn.textContent = "Copied ✓";
        copyBtn.classList.add("copied");
        setTimeout(() => {
          copyBtn.textContent = "Copy";
          copyBtn.classList.remove("copied");
        }, 2200);
      } catch {
        copyBtn.textContent = "Press Ctrl+C";
      }
    });
  }

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
      "∥", "⊕", "τ", "ρ", "Σ", "π", "y₁", "z₁", "align", "span", "</think>", "<|im_end|>"];
    const COLORS = ["rgba(56,189,248,", "rgba(129,140,248,", "rgba(167,139,250,", "rgba(244,114,182,", "rgba(251,191,36,"];

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    function spawnToken(init) {
      const size = 9 + Math.random() * 13;
      return {
        x: init ? Math.random() * W : -30,
        y: init ? Math.random() * H : H + 30,
        vx: (Math.random() - 0.5) * 0.35,
        vy: -(0.25 + Math.random() * 0.75),
        size,
        text: WORDS[Math.floor(Math.random() * WORDS.length)],
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rot: (Math.random() - 0.5) * 0.6,
        vr: (Math.random() - 0.5) * 0.01,
        life: 1,
        decay: 0.0008 + Math.random() * 0.0012,
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
        t.x += t.vx; t.y += t.vy; t.rot += t.vr; t.life -= t.decay;
        if (t.life <= 0 || t.y < -40) { tokens[i] = spawnToken(false); continue; }
        ctx.save();
        ctx.translate(t.x, t.y);
        ctx.rotate(t.rot);
        ctx.globalAlpha = Math.min(t.life, 1) * 0.5;
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

  /* ─────────── Language Switch ─────────── */
  const langSwitch = document.getElementById("lang-switch");
  const translations = {
    zh: {
      heroTagline: "将 IMO 金牌级<strong>证明推理</strong>能力从长上下文教师模型迁移到短上下文学生模型——<strong>跨 tokenizer</strong>，无需在教师轨迹上进行监督微调。",
      tldrTitle: "概览",
      tldrP1: "在线策略蒸馏（OPD）提供了一种从更强教师模型迁移推理能力的方法，但将其应用于长上下文推理教师和短上下文学生时面临实际挑战，包括 <strong>tokenizer 不匹配</strong>、<strong>教师-学生分布不匹配</strong>、<strong>响应长度爆炸</strong>和<strong>训练不稳定</strong>。在本工作中，我们通过从长上下文推理模型 <span class=\"chip-teacher\">SU-01</span> 向短上下文学生模型迁移证明推理能力来研究这一设置。为了处理 tokenizer 差异，我们在<strong>共享文本空间</strong>中执行 OPD，仅对齐在学生和教师 tokenizer 下占据相同文本跨度的 token。",
      tldrP2: "朴素的 OPD 会导致生成长度过长和频繁截断，从而破坏训练稳定性。我们引入<strong>学生参考 KL 损失</strong>并<strong>掩盖特殊终止 token 的优势</strong>（<span class=\"mono\">&lt;/think&gt;</span>、<span class=\"mono\">&lt;|im_end|&gt;</span>）。这一策略约束学生不过度偏离其初始策略，从而缓解分布不匹配问题并促进稳定的长度增长。",
      tldrP3: "在同族和异族学生模型上的实验——<span class=\"chip-student\">Qwen3</span>、<span class=\"chip-student\">Qwen3.5</span>、<span class=\"chip-student\">Intern-S2-Preview</span>、<span class=\"chip-student\">GLM-4.7-Flash</span>、<span class=\"chip-student\">Gemma-4-26B</span>——显示数学推理能力持续提升，尤其是自然语言数学证明。值得注意的是，<strong>Intern-S2-Preview 在 ProofBench 上提升了 <span class=\"highlight\">21.2 分</span></strong>，达到 55.2 并超越 Gemini-2.5-Pro——同时在 HLE 和 HiPhO 等科学基准上也有提升，表明 OPD 迁移的推理能力可以泛化到数学训练领域之外。",
      takeawayTitle: "核心要点",
      tk1Title: "共享文本空间",
      tk1Desc: "跨 tokenizer OPD 无需完整的 token 级对齐：使用学生生成的文本作为共享空间，仅对齐在两个 tokenizer 下占据相同文本跨度的 token。",
      tk2Title: "长度爆炸",
      tk2Desc: "直接的跨 tokenizer OPD 能够迁移证明推理能力，但会导致长度过度增长、频繁截断和训练不稳定。",
      tk3Title: "稳定化",
      tk3Desc: "掩盖特殊终止 token 的优势加上学生参考 KL 损失可以稳定训练、减少截断并提升最终性能。当教师和学生差异更大时，需要更大的 KL 权重。",
      tk4Title: "可泛化",
      tk4Desc: "SimpleOPD 在模型家族间有效，无需在教师轨迹上进行监督微调，适度增加蒸馏长度可以进一步提升长推理蒸馏效果。"
    }
  };

  if (langSwitch) {
    langSwitch.addEventListener("click", (e) => {
      const target = e.target.closest(".lang-option");
      if (!target) return;
      const lang = target.dataset.lang;
      
      document.querySelectorAll(".lang-option").forEach(opt => opt.classList.remove("active"));
      target.classList.add("active");
      document.documentElement.lang = lang;
      
      if (lang === "zh") {
        // 应用中文翻译
        const t = translations.zh;
        const tagline = document.querySelector(".hero-tagline");
        if (tagline) tagline.innerHTML = t.heroTagline;
        
        const tldrTitle = document.querySelector(".tldr .section-head h2");
        if (tldrTitle) tldrTitle.textContent = t.tldrTitle;
        
        const tldrPs = document.querySelectorAll(".tldr-card p");
        if (tldrPs[0]) tldrPs[0].innerHTML = t.tldrP1;
        if (tldrPs[1]) tldrPs[1].innerHTML = t.tldrP2;
        if (tldrPs[2]) tldrPs[2].innerHTML = t.tldrP3;
        
        const takeawayTitle = document.querySelector(".takeaways .section-head h2");
        if (takeawayTitle) takeawayTitle.textContent = t.takeawayTitle;
        
        const tkCards = document.querySelectorAll(".takeaway-card");
        if (tkCards[0]) {
          tkCards[0].querySelector("h3").textContent = t.tk1Title;
          tkCards[0].querySelector("p").textContent = t.tk1Desc;
        }
        if (tkCards[1]) {
          tkCards[1].querySelector("h3").textContent = t.tk2Title;
          tkCards[1].querySelector("p").textContent = t.tk2Desc;
        }
        if (tkCards[2]) {
          tkCards[2].querySelector("h3").textContent = t.tk3Title;
          tkCards[2].querySelector("p").textContent = t.tk3Desc;
        }
        if (tkCards[3]) {
          tkCards[3].querySelector("h3").textContent = t.tk4Title;
          tkCards[3].querySelector("p").textContent = t.tk4Desc;
        }
      } else {
        // 刷新页面恢复英文
        location.reload();
      }
    });
  }
