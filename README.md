# SimpleOPD — Project Page

> **Simple Tokenizer-Agnostic On-Policy Distillation of Long-Context Reasoning**
>
> Transferring gold-medal-level proof-reasoning from the long-context teacher **SU-01** to short-context
> student models — across tokenizers, without SFT on teacher trajectories.

A polished, single-page project website with animated effects (token-particle hero background, scroll
reveal, animated counters, magnetic cards, and more).

## Structure

```
SimpleOPD-project-page/
├── index.html      # full page content
├── css/style.css   # design system + animations
├── js/main.js      # particles, reveals, counters, interactions
├── assets/         # official paper figures (7 PNGs)
└── README.md
```

## Content

All content extracted from the official paper source:
- **Title:** Simple Tokenizer-Agnostic On-Policy Distillation **of** Long-Context Reasoning
- **Students:** Qwen3-4B, Qwen3-30B-A3B, Qwen3.5-4B, Qwen3.5-35B-A3B, Intern-S2-Preview, GLM-4.7-Flash, Gemma-4-26B-A4B
- **Benchmarks:** ProofBench@4, AnswerBench@8, AIME25@8, AMOBench@8
- **Figures:** All 7 official PNG figures from the paper (intro overview, training dynamics × 4, ProofBench comparison, lexical overlap)
- **Tables:** Main results with AMOBench column, ablation studies, OOD generalization, data/length/KL effects

## Host on GitHub Pages

**Option A — project site (recommended):**

1. Create a GitHub repository, e.g. `SimpleOPD-project-page`.
2. Upload the contents of this folder (index.html, css/, js/, assets/).
3. Go to **Settings → Pages → Build and deployment → Branch** and select `main` + `/ (root)`.
4. Your site will be live at `https://<username>.github.io/SimpleOPD-project-page/`.

**Option B — user/organization site:**

1. Create a repository named `<username>.github.io` (or `<org>.github.io`).
2. Put `index.html`, `css/`, `js/`, and `assets/` at the repository root.
3. The site appears at `https://<username>.github.io/`.

**Option C — any static host:** the page is fully static (HTML/CSS/JS, MathJax via CDN), so it also works
as-is on Vercel, Netlify, Cloudflare Pages, etc.

## Notes

- **Math rendering:** uses MathJax 3 from CDN — requires internet access.
- **Fonts:** Inter / Fraunces / JetBrains Mono from Google Fonts.
- **Figures:** All official figures from the paper ZIP are included in `assets/`.
- **Paper:** [Official paper PDF](https://github.com/yourusername/SimpleOPD) · [Notion source](https://app.notion.com/p/SimpleOPD-Simple-Tokenizer-Agnostic-On-Policy-Distillation-for-Long-Context-Reasoning-38ec37a600c080919c4bd481ee8305ff)

## Local preview

```bash
cd SimpleOPD-project-page
python3 -m http.server 8000
# open http://localhost:8000
```
