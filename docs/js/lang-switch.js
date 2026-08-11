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
  // Hero
  const tagline = document.querySelector(".hero-tagline");
  if (tagline) tagline.innerHTML = t.heroTagline;
  
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
  
  // Section titles
  const sections = [
    { selector: ".tldr .section-head h2", text: t.tldrTitle },
    { selector: ".takeaways .section-head h2", text: t.takeawayTitle },
    { selector: ".method .section-head h2", text: t.methodTitle },
    { selector: ".setup .section-head h2", text: t.setupTitle },
    { selector: ".results .section-head h2", text: t.resultsTitle },
    { selector: ".analysis .section-head h2", text: t.whyTitle },
    { selector: ".summary .section-head h2", text: t.summaryTitle },
    { selector: ".citation .section-head h2", text: t.citationTitle }
  ];
  
  sections.forEach(({ selector, text }) => {
    const el = document.querySelector(selector);
    if (el) el.textContent = text;
  });
  
  // TL;DR paragraphs
  const tldrPs = document.querySelectorAll(".tldr-card p");
  if (tldrPs[0]) tldrPs[0].innerHTML = t.tldrP1;
  if (tldrPs[1]) tldrPs[1].innerHTML = t.tldrP2;
  if (tldrPs[2]) tldrPs[2].innerHTML = t.tldrP3;
  
  // Takeaways
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
  
  // Method intro
  const methodIntro = document.querySelector(".method-intro");
  if (methodIntro) methodIntro.textContent = t.methodIntro;
  
  // Setup cards
  const setupCards = document.querySelectorAll(".setup-card h3");
  if (setupCards[0]) setupCards[0].textContent = t.setupTeacherTitle;
  if (setupCards[1]) setupCards[1].textContent = t.setupStudentTitle;
  if (setupCards[2]) setupCards[2].textContent = t.setupDataTitle;
  
  const setupDescs = document.querySelectorAll(".setup-card > p");
  if (setupDescs[0]) setupDescs[0].textContent = t.setupTeacherDesc;
  if (setupDescs[1]) setupDescs[1].textContent = t.setupStudentDesc;
  if (setupDescs[2]) setupDescs[2].textContent = t.setupDataDesc;
  
  // Table titles
  const tableTitles = document.querySelectorAll(".table-title");
  if (tableTitles[0]) tableTitles[0].textContent = t.mainResultsTitle;
  if (tableTitles[1]) tableTitles[1].textContent = t.ablationTitle;
  
  // Table notes
  const tableNotes = document.querySelectorAll(".table-note");
  if (tableNotes[0]) tableNotes[0].textContent = t.mainResultsNote;
  if (tableNotes[1]) tableNotes[1].textContent = t.ablationNote;
  
  // Why it works
  const whyPs = document.querySelectorAll(".analysis .content-text p");
  if (whyPs[0]) whyPs[0].innerHTML = t.whyP1;
  if (whyPs[1]) whyPs[1].innerHTML = t.whyP2;
  if (whyPs[2]) whyPs[2].innerHTML = t.whyP3;
  
  // Summary
  const summaryPs = document.querySelectorAll(".summary .content-text p");
  if (summaryPs[0]) summaryPs[0].innerHTML = t.summaryP1;
  if (summaryPs[1]) summaryPs[1].innerHTML = t.summaryP2;
  
  const summaryHighlight = document.querySelector(".summary-highlight");
  if (summaryHighlight) summaryHighlight.innerHTML = t.summaryHighlight;
  
  // Citation note
  const citationNote = document.querySelector(".citation-note");
  if (citationNote) citationNote.textContent = t.citationNote;
  
  // Footer
  const footerText = document.querySelector(".footer-text");
  const footerMeta = document.querySelector(".footer-meta");
  if (footerText) footerText.textContent = t.footerTeam;
  if (footerMeta) footerMeta.textContent = t.footerMeta;
}
