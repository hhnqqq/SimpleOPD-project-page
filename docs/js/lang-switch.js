// 语言切换功能
document.addEventListener('DOMContentLoaded', () => {
  const langSwitch = document.getElementById("lang-switch");

  if (!langSwitch || typeof translations === 'undefined') return;

  langSwitch.addEventListener("click", (e) => {
    const target = e.target.closest(".lang-option");
    if (!target) return;

    const lang = target.dataset.lang;
    document.querySelectorAll(".lang-option").forEach(opt => opt.classList.remove("active"));
    target.classList.add("active");
    document.documentElement.lang = lang;

    if (lang === "zh") {
      applyTranslations(translations.zh);
    } else {
      location.reload();
    }
  });
});

function applyTranslations(t) {
  const setText = (el, v) => { if (el && v != null) el.textContent = v; };
  const setHTML = (el, v) => { if (el && v != null) el.innerHTML = v; };
  const setEach = (els, fn) => els.forEach((el, i) => fn(el, i));

  // ── 页面标题 ──
  if (t.pageTitle) document.title = t.pageTitle;

  // ── 导航栏 ──
  setEach(document.querySelectorAll(".nav-links a"), (el, i) => {
    setText(el, Object.values(t.nav)[i]);
  });
  setText(document.querySelector(".nav-cta"), t.nav.paper);

  // ── Hero ──
  const badge = document.querySelector(".hero-badge");
  if (badge && t.hero.badge) badge.innerHTML = '<span class="badge-dot"></span> ' + t.hero.badge;
  setHTML(document.querySelector(".hero-title-sub"), t.hero.titleSub);
  setHTML(document.querySelector(".hero-tagline"), t.hero.tagline);
  setHTML(document.querySelector(".hero-affil"), t.hero.affil);

  const primaryBtn = document.querySelector(".btn-primary span");
  if (primaryBtn && t.hero.btnRead) primaryBtn.textContent = t.hero.btnRead;
  setEach(document.querySelectorAll(".btn-ghost"), (el, i) => {
    if (i === 0) setText(el, t.hero.btnCite);
    if (i === 1 && t.hero.btnKeyResults) el.innerHTML = '<span class="btn-spark">✦</span> ' + t.hero.btnKeyResults;
  });

  setEach(document.querySelectorAll(".metric"), (el, i) => {
    const m = t.hero.metrics[i];
    if (!m) return;
    setText(el.querySelector(".metric-unit"), m[0]);
    setText(el.querySelector(".metric-label"), m[1]);
  });

  // ── 章节标题 ──
  const overlineMap = [
    [".tldr .overline", "tldr"],
    [".takeaways .overline", "takeaways"],
    [".method .overline", "method"],
    [".setup .overline", "setup"],
    [".results .overline", "results"],
    [".analysis .overline", "analysis"],
    [".conclusion .overline", "conclusion"],
    [".citation .overline", "citation"]
  ];
  overlineMap.forEach(([sel, key]) => setText(document.querySelector(sel), t[key].overline));

  const titleMap = [
    [".tldr .section-head h2", "tldr"],
    [".takeaways .section-head h2", "takeaways"],
    [".method .section-head h2", "method"],
    [".setup .section-head h2", "setup"],
    [".results .section-head h2", "results"],
    [".analysis .section-head h2", "analysis"],
    [".conclusion .section-head h2", "conclusion"],
    [".citation .section-head h2", "citation"]
  ];
  titleMap.forEach(([sel, key]) => setText(document.querySelector(sel), t[key].title));

  setText(document.querySelector(".method .section-sub"), t.method.intro);
  setText(document.querySelector(".results .section-sub"), t.results.sub);

  // ── TL;DR ──
  setEach(document.querySelectorAll(".tldr-card p"), (el, i) => setHTML(el, t.tldr["p" + (i + 1)]));

  // ── Takeaways ──
  setEach(document.querySelectorAll(".takeaway-card"), (el, i) => {
    const card = t.takeaways.cards[i];
    if (!card) return;
    setText(el.querySelector("h3"), card.title);
    setText(el.querySelector("p"), card.desc);
  });

  // ── Method ──
  setHTML(document.querySelector(".method .figure-card figcaption .fig-badge"), t.method.figBadge);
  const methodFigCaption = document.querySelector(".method figure figcaption");
  if (methodFigCaption) {
    const badge = methodFigCaption.querySelector(".fig-badge");
    setHTML(methodFigCaption, (badge ? badge.outerHTML : "") + t.method.figCaption);
  }

  setEach(document.querySelectorAll(".method-block"), (blk, i) => {
    const block = t.method.blocks[i];
    if (!block) return;
    setText(blk.querySelector("h3"), block.title);
    setEach(blk.querySelectorAll("p"), (p, j) => setHTML(p, block.ps[j]));
  });

  // 算法 1
  const algoTitle = document.querySelector(".algorithm-title");
  if (algoTitle) {
    const badge = algoTitle.querySelector(".fig-badge");
    setHTML(algoTitle, (badge ? badge.outerHTML : "") + t.method.algoTitle);
  }
  setText(document.querySelector(".algorithm-title .fig-badge"), t.method.algoBadge);
  setEach(document.querySelectorAll(".algorithm-body li"), (li, i) => setHTML(li, t.method.algoLines[i]));

  // 稳定化卡片
  setEach(document.querySelectorAll(".stab-card"), (el, i) => {
    const card = t.method.stab[i];
    if (!card) return;
    setText(el.querySelector("h4"), card.title);
    setHTML(el.querySelector("p"), card.desc);
  });

  // ── Setup ──
  const setupCards = document.querySelectorAll(".setup-card");
  if (setupCards[0]) {
    setHTML(setupCards[0].querySelector("h3"), t.setup.teacherTitle);
    setHTML(setupCards[0].querySelector("p"), t.setup.teacherDesc);
    setEach(setupCards[0].querySelectorAll(".setup-tags li"), (li, i) => setText(li, t.setup.teacherTags[i]));
  }
  if (setupCards[1]) {
    setText(setupCards[1].querySelector("h3"), t.setup.studentTitle);
    setHTML(setupCards[1].querySelector("p"), t.setup.studentDesc);
    setEach(setupCards[1].querySelectorAll(".student-list li"), (li, i) => {
      const chip = li.querySelector(".student-chip");
      const label = t.setup.studentLabels[i];
      if (chip && label != null) li.innerHTML = chip.outerHTML + " " + label;
    });
  }
  if (setupCards[2]) {
    setText(setupCards[2].querySelector("h3"), t.setup.dataTitle);
    setEach(setupCards[2].querySelectorAll(".data-item"), (item, i) => {
      const d = t.setup.dataItems[i];
      if (!d) return;
      setText(item.querySelector(".data-name"), d[0]);
      setText(item.querySelector(".data-desc"), d[1]);
    });
  }
  if (setupCards[3]) {
    setText(setupCards[3].querySelector("h3"), t.setup.configTitle);
    setEach(setupCards[3].querySelectorAll(".config-key"), (k, i) => setText(k, t.setup.configKeys[i]));
    setHTML(setupCards[3].querySelector(".config-note"), t.setup.configNote);
  }

  // ── Results ──
  const resBlocks = document.querySelectorAll(".results .results-block");
  if (resBlocks[0]) {
    setText(resBlocks[0].querySelector("h3"), t.results.block1Title);
    setHTML(resBlocks[0].querySelector(".prose p"), t.results.block1P);
    setEach(resBlocks[0].querySelectorAll("figcaption"), (fc, i) => {
      const badge = fc.querySelector(".fig-badge");
      setHTML(fc, (badge ? badge.outerHTML : "") + (i === 0 ? t.results.fig1Cap : t.results.fig2Cap));
    });
  }
  if (resBlocks[1]) {
    setText(resBlocks[1].querySelector("h3"), t.results.block2Title);
    setHTML(resBlocks[1].querySelector(".prose p"), t.results.block2P);
    const fig3 = resBlocks[1].querySelector("figcaption");
    if (fig3) {
      const badge = fig3.querySelector(".fig-badge");
      setHTML(fig3, (badge ? badge.outerHTML : "") + t.results.fig3Cap);
    }
    setText(resBlocks[1].querySelector(".table-title"), t.results.table21Title);
    setText(resBlocks[1].querySelector(".table-note"), t.results.table21Note);
  }
  if (resBlocks[2]) {
    setText(resBlocks[2].querySelector("h3"), t.results.block3Title);
    setHTML(resBlocks[2].querySelector(".prose p"), t.results.block3P);
    const fig4 = resBlocks[2].querySelector("figcaption");
    if (fig4) {
      const badge = fig4.querySelector(".fig-badge");
      setHTML(fig4, (badge ? badge.outerHTML : "") + t.results.fig4Cap);
    }
    setText(resBlocks[2].querySelector(".table-title"), t.results.table31Title);
    setText(resBlocks[2].querySelector(".table-note"), t.results.table31Note);
  }
  if (resBlocks[3]) {
    setText(resBlocks[3].querySelector("h3"), t.results.block4Title);
    setEach(resBlocks[3].querySelectorAll(".prose p"), (p, i) => setHTML(p, i === 0 ? t.results.block4P1 : t.results.block4P2));
    setText(resBlocks[3].querySelector(".table-title"), t.results.mainTitle);
    setText(resBlocks[3].querySelector(".table-note"), t.results.mainNote);
    const fig5 = resBlocks[3].querySelector("figcaption");
    if (fig5) {
      const badge = fig5.querySelector(".fig-badge");
      setHTML(fig5, (badge ? badge.outerHTML : "") + t.results.fig5Cap);
    }
  }

  // ── Analysis ──
  const anaBlocks = document.querySelectorAll(".analysis .analysis-block");
  if (anaBlocks[0]) {
    setText(anaBlocks[0].querySelector("h3"), t.analysis.block1Title);
    setHTML(anaBlocks[0].querySelector(".analysis-prose p"), t.analysis.block1P);
    const fig6 = anaBlocks[0].querySelector("figcaption");
    if (fig6) {
      const badge = fig6.querySelector(".fig-badge");
      setHTML(fig6, (badge ? badge.outerHTML : "") + t.analysis.fig6Cap);
    }
  }
  if (anaBlocks[1]) {
    setText(anaBlocks[1].querySelector("h3"), t.analysis.block2Title);
    setText(anaBlocks[1].querySelector(".table-note"), t.analysis.block2Note);
  }
  if (anaBlocks[2]) {
    setText(anaBlocks[2].querySelector("h3"), t.analysis.block3Title);
    setText(anaBlocks[2].querySelector(".table-note"), t.analysis.block3Note);
  }
  if (anaBlocks[3]) {
    setText(anaBlocks[3].querySelector("h3"), t.analysis.block4Title);
    setText(anaBlocks[3].querySelector(".table-note"), t.analysis.block4Note);
  }
  if (anaBlocks[4]) {
    setText(anaBlocks[4].querySelector("h3"), t.analysis.block5Title);
    setHTML(anaBlocks[4].querySelector(".prose p"), t.analysis.block5P);
    setText(anaBlocks[4].querySelector(".table-note"), t.analysis.block5Note);
  }

  // ── Conclusion ──
  setText(document.querySelector(".conclusion .section-head h2"), t.conclusion.title);
  setEach(document.querySelectorAll(".conclusion-card > p"), (p, i) => setHTML(p, i === 0 ? t.conclusion.p1 : t.conclusion.p2));
  setEach(document.querySelectorAll(".conclusion-list li"), (li, i) => setHTML(li, i === 0 ? t.conclusion.li1 : t.conclusion.li2));
  setText(document.querySelector(".chip-note"), t.conclusion.chipNote);

  // ── Citation ──
  setText(document.querySelector(".citation-note"), t.citation.note);
  setText(document.getElementById("copy-btn"), t.citation.copy);

  // ── Footer ──
  setText(document.querySelector(".footer-text"), t.footer.team);
  setText(document.querySelector(".footer-meta"), t.footer.meta);

  // ── 通用：图表徽章 / 表格标签 / 表头 ──
  setEach(document.querySelectorAll(".fig-badge"), (el) => {
    const zh = t.common.figBadges[el.textContent.trim()];
    if (zh) setText(el, zh);
  });
  setEach(document.querySelectorAll(".tag"), (el) => {
    const zh = t.common.tags[el.textContent.trim()];
    if (zh) setText(el, zh);
  });
  setEach(document.querySelectorAll(".res-table th"), (el) => {
    const zh = t.common.tableHeads[el.textContent.trim()];
    if (zh) setText(el, zh);
  });

  // 重新排版 MathJax（中文内容中包含行内公式）
  if (window.MathJax && MathJax.typesetPromise) {
    try { MathJax.typesetPromise(); } catch (e) { /* noop */ }
  }
}
