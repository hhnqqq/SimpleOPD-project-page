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
      location.reload(); // 重新加载恢复英文
    }
  });
});

function applyTranslations(t) {
  // ========== Hero ==========
  const tagline = document.querySelector(".hero-tagline");
  if (tagline) tagline.innerHTML = t.heroTagline;
  
  const affil = document.querySelector(".hero-affil");
  if (affil && t.heroAffil) affil.textContent = t.heroAffil;
  
  // Metrics
  const metrics = document.querySelectorAll(".metric");
  if (metrics[0]) {
    const unit = metrics[0].querySelector(".metric-unit");
    const label = metrics[0].querySelector(".metric-label");
    if (unit) unit.textContent = t.metricStudents;
    if (label) label.textContent = t.metricStudentsLabel;
  }
  if (metrics[1]) {
    const unit = metrics[1].querySelector(".metric-unit");
    const label = metrics[1].querySelector(".metric-label");
    if (unit) unit.textContent = t.metricGain;
    if (label) label.textContent = t.metricGainLabel;
  }
  if (metrics[2]) {
    const unit = metrics[2].querySelector(".metric-unit");
    const label = metrics[2].querySelector(".metric-label");
    if (unit) unit.textContent = t.metricAlign;
    if (label) label.textContent = t.metricAlignLabel;
  }
  
  // ========== Section Titles ==========
  const sectionMap = [
    { selector: ".tldr .section-head h2", key: "tldrTitle" },
    { selector: ".takeaways .section-head h2", key: "takeawayTitle" },
    { selector: ".method .section-head h2", key: "methodTitle" },
    { selector: ".method .section-sub", key: "methodSub" },
    { selector: ".setup .section-head h2", key: "setupTitle" },
    { selector: ".setup .section-sub", key: "setupSub" },
    { selector: ".results .section-head h2", key: "resultsTitle" },
    { selector: ".results .section-sub", key: "resultsSub" },
    { selector: ".analysis .section-head h2", key: "whyTitle" },
    { selector: ".analysis .section-sub", key: "whySub" },
    { selector: ".summary .section-head h2", key: "summaryTitle" },
    { selector: ".summary .section-sub", key: "summarySub" },
    { selector: ".citation .section-head h2", key: "citationTitle" }
  ];
  
  sectionMap.forEach(({ selector, key }) => {
    const el = document.querySelector(selector);
    if (el && t[key]) el.textContent = t[key];
  });
  
  // ========== TL;DR ==========
  const tldrPs = document.querySelectorAll(".tldr-card p");
  if (tldrPs[0]) tldrPs[0].innerHTML = t.tldrP1;
  if (tldrPs[1]) tldrPs[1].innerHTML = t.tldrP2;
  if (tldrPs[2]) tldrPs[2].innerHTML = t.tldrP3;
  
  // ========== Takeaways ==========
  const tkCards = document.querySelectorAll(".takeaway-card");
  const tkData = [
    { title: "tk1Title", desc: "tk1Desc" },
    { title: "tk2Title", desc: "tk2Desc" },
    { title: "tk3Title", desc: "tk3Desc" },
    { title: "tk4Title", desc: "tk4Desc" }
  ];
  
  tkCards.forEach((card, i) => {
    if (tkData[i]) {
      const h3 = card.querySelector("h3");
      const p = card.querySelector("p");
      if (h3) h3.textContent = t[tkData[i].title];
      if (p) p.textContent = t[tkData[i].desc];
    }
  });
  
  // ========== Method ==========
  const methodBlocks = document.querySelectorAll(".method .stab-card, .method .opd-diagram");
  // Method block titles (h3)
  const methodTitles = document.querySelectorAll(".method h3");
  if (methodTitles[0] && t.methodBlock1Title) methodTitles[0].textContent = t.methodBlock1Title;
  if (methodTitles[1] && t.methodBlock2Title) methodTitles[1].textContent = t.methodBlock2Title;
  if (methodTitles[2] && t.methodBlock3Title) methodTitles[2].textContent = t.methodBlock3Title;
  if (methodTitles[3] && t.methodBlock4Title) methodTitles[3].textContent = t.methodBlock4Title;
  
  // Method block paragraphs (需要根据实际 HTML 结构调整)
  const methodPs = document.querySelectorAll(".method .stab-card p, .method .content-text p");
  // 这里简化处理，实际需要更精确的选择器
  
  // ========== Setup ==========
  const setupCards = document.querySelectorAll(".setup-card");
  if (setupCards[0]) {
    const h3 = setupCards[0].querySelector("h3");
    const p = setupCards[0].querySelector("p");
    if (h3) h3.innerHTML = t.setupTeacherTitle;
    if (p) p.innerHTML = t.setupTeacherDesc;
  }
  if (setupCards[1]) {
    const h3 = setupCards[1].querySelector("h3");
    const p = setupCards[1].querySelector("p");
    if (h3) h3.textContent = t.setupStudentTitle;
    if (p) p.innerHTML = t.setupStudentDesc;
  }
  if (setupCards[2]) {
    const h3 = setupCards[2].querySelector("h3");
    const p = setupCards[2].querySelector("p");
    if (h3) h3.textContent = t.setupDataTitle;
    if (p) p.innerHTML = t.setupDataDesc;
  }
  
  // ========== Results ==========
  // Main results table
  const mainResultsTitle = document.querySelector(".results .table-title");
  if (mainResultsTitle) mainResultsTitle.textContent = t.mainResultsTitle;
  
  const mainResultsNote = document.querySelector(".results .table-note");
  if (mainResultsNote) mainResultsNote.textContent = t.mainResultsNote;
  
  // Ablation table
  const ablationTitle = document.querySelectorAll(".results .table-title")[1];
  if (ablationTitle) ablationTitle.textContent = t.ablationTitle;
  
  const ablationNote = document.querySelectorAll(".results .table-note")[1];
  if (ablationNote) ablationNote.textContent = t.ablationNote;
  
  // Results block titles
  const resultsH3 = document.querySelectorAll(".results h3");
  if (resultsH3[0] && t.resultsBlock1Title) resultsH3[0].textContent = t.resultsBlock1Title;
  if (resultsH3[1] && t.resultsBlock2Title) resultsH3[1].textContent = t.resultsBlock2Title;
  if (resultsH3[2] && t.resultsBlock3Title) resultsH3[2].textContent = t.resultsBlock3Title;
  
  // ========== Analysis ==========
  const whyH3 = document.querySelectorAll(".analysis h3");
  if (whyH3[0] && t.whyBlock1Title) whyH3[0].textContent = t.whyBlock1Title;
  if (whyH3[1] && t.whyBlock2Title) whyH3[1].textContent = t.whyBlock2Title;
  if (whyH3[2] && t.whyBlock3Title) whyH3[2].textContent = t.whyBlock3Title;
  
  const whyPs = document.querySelectorAll(".analysis .analysis-prose p, .analysis .content-text p");
  if (whyPs[0] && t.whyBlock1P1) whyPs[0].innerHTML = t.whyBlock1P1;
  if (whyPs[1] && t.whyBlock2P1) whyPs[1].innerHTML = t.whyBlock2P1;
  if (whyPs[2] && t.whyBlock3P1) whyPs[2].innerHTML = t.whyBlock3P1;
  
  // ========== Summary ==========
  const summaryPs = document.querySelectorAll(".summary .content-text p, .summary p");
  if (summaryPs[0] && t.summaryP1) summaryPs[0].innerHTML = t.summaryP1;
  if (summaryPs[1] && t.summaryP2) summaryPs[1].innerHTML = t.summaryP2;
  
  // Summary list
  const summaryLis = document.querySelectorAll(".summary ul li, .summary ol li");
  if (summaryLis[0] && t.summaryList1) summaryLis[0].textContent = t.summaryList1;
  if (summaryLis[1] && t.summaryList2) summaryLis[1].textContent = t.summaryList2;
  if (summaryLis[2] && t.summaryList3) summaryLis[2].textContent = t.summaryList3;
  if (summaryLis[3] && t.summaryList4) summaryLis[3].textContent = t.summaryList4;
  
  // ========== Citation ==========
  const citationNote = document.querySelector(".citation-note");
  if (citationNote) citationNote.textContent = t.citationNote;
  
  // ========== Footer ==========
  const footerText = document.querySelector(".footer-text");
  const footerMeta = document.querySelector(".footer-meta");
  if (footerText) footerText.textContent = t.footerTeam;
  if (footerMeta) footerMeta.textContent = t.footerMeta;
}
