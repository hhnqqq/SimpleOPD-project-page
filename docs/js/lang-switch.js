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
  // Hero
  const tagline = document.querySelector(".hero-tagline");
  if (tagline && t.heroTagline) tagline.innerHTML = t.heroTagline;
  
  const affil = document.querySelector(".hero-affil");
  if (affil && t.heroAffil) affil.textContent = t.heroAffil;
  
  // Metrics
  const metrics = document.querySelectorAll(".metric");
  if (metrics[0]) {
    const unit = metrics[0].querySelector(".metric-unit");
    const label = metrics[0].querySelector(".metric-label");
    if (unit && t.metricStudents) unit.textContent = t.metricStudents;
    if (label && t.metricStudentsLabel) label.textContent = t.metricStudentsLabel;
  }
  if (metrics[1]) {
    const unit = metrics[1].querySelector(".metric-unit");
    const label = metrics[1].querySelector(".metric-label");
    if (unit && t.metricGain) unit.textContent = t.metricGain;
    if (label && t.metricGainLabel) label.textContent = t.metricGainLabel;
  }
  if (metrics[2]) {
    const unit = metrics[2].querySelector(".metric-unit");
    const label = metrics[2].querySelector(".metric-label");
    if (unit && t.metricAlign) unit.textContent = t.metricAlign;
    if (label && t.metricAlignLabel) label.textContent = t.metricAlignLabel;
  }
  
  // Section titles and subs
  const titleMap = [
    [".tldr .section-head h2", "tldrTitle"],
    [".takeaways .section-head h2", "takeawayTitle"],
    [".method .section-head h2", "methodTitle"],
    [".method .section-sub", "methodIntro"],
    [".setup .section-head h2", "setupTitle"],
    [".results .section-head h2", "resultsTitle"],
    [".results .section-sub", "resultsSub"],
    [".analysis .section-head h2", "whyTitle"],
    [".summary .section-head h2", "summaryTitle"],
    [".citation .section-head h2", "citationTitle"]
  ];
  
  titleMap.forEach(([sel, key]) => {
    const el = document.querySelector(sel);
    if (el && t[key]) el.textContent = t[key];
  });
  
  // TL;DR
  const tldrPs = document.querySelectorAll(".tldr-card p");
  if (tldrPs[0] && t.tldrP1) tldrPs[0].innerHTML = t.tldrP1;
  if (tldrPs[1] && t.tldrP2) tldrPs[1].innerHTML = t.tldrP2;
  if (tldrPs[2] && t.tldrP3) tldrPs[2].innerHTML = t.tldrP3;
  
  // Takeaways
  const tkCards = document.querySelectorAll(".takeaway-card");
  [
    ["tk1Title", "tk1Desc"],
    ["tk2Title", "tk2Desc"],
    ["tk3Title", "tk3Desc"],
    ["tk4Title", "tk4Desc"]
  ].forEach(([titleKey, descKey], i) => {
    if (tkCards[i]) {
      const h3 = tkCards[i].querySelector("h3");
      const p = tkCards[i].querySelector("p");
      if (h3 && t[titleKey]) h3.textContent = t[titleKey];
      if (p && t[descKey]) p.textContent = t[descKey];
    }
  });
  
  // Setup cards
  const setupCards = document.querySelectorAll(".setup-card");
  if (setupCards[0]) {
    const h3 = setupCards[0].querySelector("h3");
    const p = setupCards[0].querySelector("p");
    if (h3 && t.setupTeacherTitle) h3.textContent = t.setupTeacherTitle;
    if (p && t.setupTeacherDesc) p.innerHTML = t.setupTeacherDesc;
  }
  if (setupCards[1]) {
    const h3 = setupCards[1].querySelector("h3");
    const p = setupCards[1].querySelector("p");
    if (h3 && t.setupStudentTitle) h3.textContent = t.setupStudentTitle;
    if (p && t.setupStudentDesc) p.innerHTML = t.setupStudentDesc;
  }
  if (setupCards[2]) {
    const h3 = setupCards[2].querySelector("h3");
    if (h3 && t.setupDataTitle) h3.textContent = t.setupDataTitle;
  }
  if (setupCards[3]) {
    const h3 = setupCards[3].querySelector("h3");
    const p = setupCards[3].querySelector("p");
    if (h3 && t.setupEvalTitle) h3.textContent = t.setupEvalTitle;
    if (p && t.setupEvalDesc) p.textContent = t.setupEvalDesc;
  }
  
  // Results blocks (h3 titles)
  const resultsH3 = document.querySelectorAll(".results h3");
  if (resultsH3[0] && t.resultsBlock1Title) resultsH3[0].innerHTML = t.resultsBlock1Title;
  if (resultsH3[1] && t.resultsBlock2Title) resultsH3[1].innerHTML = t.resultsBlock2Title;
  if (resultsH3[2] && t.resultsBlock3Title) resultsH3[2].innerHTML = t.resultsBlock3Title;
  
  // Results paragraphs
  const resultsPs = document.querySelectorAll(".results .prose p");
  if (resultsPs[0] && t.resultsBlock1P) resultsPs[0].innerHTML = t.resultsBlock1P;
  if (resultsPs[1] && t.resultsBlock2P) resultsPs[1].innerHTML = t.resultsBlock2P;
  if (resultsPs[2] && t.resultsBlock3P) resultsPs[2].innerHTML = t.resultsBlock3P;
  
  // Tables
  const tableTitles = document.querySelectorAll(".table-title");
  const tableNotes = document.querySelectorAll(".table-note");
  if (tableTitles[0] && t.mainResultsTitle) tableTitles[0].textContent = t.mainResultsTitle;
  if (tableNotes[0] && t.mainResultsNote) tableNotes[0].textContent = t.mainResultsNote;
  if (tableTitles[1] && t.ablationTitle) tableTitles[1].textContent = t.ablationTitle;
  if (tableNotes[1] && t.ablationNote) tableNotes[1].textContent = t.ablationNote;
  if (tableTitles[2] && t.lengthTitle) tableTitles[2].textContent = t.lengthTitle;
  if (tableNotes[2] && t.lengthNote) tableNotes[2].textContent = t.lengthNote;
  if (tableTitles[3] && t.oodTitle) tableTitles[3].textContent = t.oodTitle;
  if (tableNotes[3] && t.oodNote) tableNotes[3].textContent = t.oodNote;
  
  // Analysis
  const whyH3 = document.querySelectorAll(".analysis h3");
  if (whyH3[0] && t.whyBlock1Title) whyH3[0].innerHTML = t.whyBlock1Title;
  if (whyH3[1] && t.whyBlock2Title) whyH3[1].innerHTML = t.whyBlock2Title;
  if (whyH3[2] && t.whyBlock3Title) whyH3[2].innerHTML = t.whyBlock3Title;
  
  const whyPs = document.querySelectorAll(".analysis .analysis-prose p");
  if (whyPs[0] && t.whyBlock1P) whyPs[0].innerHTML = t.whyBlock1P;
  if (whyPs[1] && t.whyBlock2P) whyPs[1].innerHTML = t.whyBlock2P;
  if (whyPs[2] && t.whyBlock3P) whyPs[2].innerHTML = t.whyBlock3P;
  
  // Summary
  const summaryPs = document.querySelectorAll(".summary .content-text p");
  if (summaryPs[0] && t.summaryP1) summaryPs[0].innerHTML = t.summaryP1;
  if (summaryPs[1] && t.summaryP2) summaryPs[1].innerHTML = t.summaryP2;
  
  // Citation
  const citationNote = document.querySelector(".citation-note");
  if (citationNote && t.citationNote) citationNote.textContent = t.citationNote;
  
  // Footer
  const footerText = document.querySelector(".footer-text");
  const footerMeta = document.querySelector(".footer-meta");
  if (footerText && t.footerTeam) footerText.textContent = t.footerTeam;
  if (footerMeta && t.footerMeta) footerMeta.textContent = t.footerMeta;
}
