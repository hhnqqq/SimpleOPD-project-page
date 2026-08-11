// SimpleOPD 完整中英文翻译 - 严格逐句对照原文
const translations = {
  zh: {
    // ========== Hero 区域 ==========
    heroTagline: "将 IMO 金牌级<strong>证明推理</strong>能力从长上下文教师模型迁移到短上下文学生模型——<strong>跨 tokenizer</strong>，无需在教师轨迹上进行监督微调。",
    heroAffil: "P1 团队 · 上海人工智能实验室",
    
    // Metrics
    metricStudents: "个学生模型",
    metricStudentsLabel: "Qwen3 · Qwen3.5 · Intern-S2 · GLM · Gemma",
    metricGain: "最大提升",
    metricGainLabel: "ProofBench 推理性能",
    metricAlign: "token 对齐率",
    metricAlignLabel: "跨 tokenizer 文本匹配",
    
    // ========== TL;DR ==========
    tldrTitle: "概览",
    tldrP1: "在线策略蒸馏（OPD）提供了一种从更强教师模型迁移推理能力的有前景的方法，但面临的挑战包括<strong>tokenizer 不匹配</strong>、<strong>教师-学生分布不匹配</strong>、<strong>响应长度爆炸</strong>和<strong>训练不稳定</strong>。在这项工作中，我们研究了一种设置，其中 OPD 将证明推理能力从长上下文推理模型 <span class=\"chip-teacher\">SU-01</span> 迁移到短上下文学生模型。为了处理 tokenizer 差异，我们在<strong>共享文本空间</strong>中执行 OPD，仅对齐在学生和教师 tokenizer 下占据相同文本跨度的 token。",
    tldrP2: "朴素的 OPD 会导致过度的生成长度和频繁截断，破坏训练稳定性。我们引入了<strong>学生参考 KL 损失</strong>并<strong>掩盖特殊终止 token 的优势</strong>（<span class=\"mono\">&lt;/think&gt;</span>、<span class=\"mono\">&lt;|im_end|&gt;</span>）。这约束了学生不会过度偏离其初始策略，缓解了分布不匹配并促进了稳定的长度增长。",
    tldrP3: "在同族和异族学生——<span class=\"chip-student\">Qwen3</span>、<span class=\"chip-student\">Qwen3.5</span>、<span class=\"chip-student\">Intern-S2-Preview</span>、<span class=\"chip-student\">GLM-4.7-Flash</span>、<span class=\"chip-student\">Gemma-4-26B</span>——上的实验显示了数学推理的持续提升，尤其是自然语言数学证明。值得注意的是，<strong>Intern-S2-Preview 在 ProofBench 上提升了 <span class=\"highlight\">21.2 分</span></strong>，达到 55.2 并超越了 Gemini-2.5-Pro——同时也提升了诸如 HLE 和 HiPhO 等科学基准，表明 OPD 迁移的推理能力泛化到了数学训练领域之外。",
    
    // ========== Takeaways ==========
    takeawayTitle: "核心要点",
    tk1Title: "共享文本空间",
    tk1Desc: "跨 tokenizer OPD 无需完整的 token 级对齐即可工作：使用学生生成的文本作为共享空间，仅对齐在两个 tokenizer 下占据相同文本跨度的 token。",
    tk2Title: "长度爆炸",
    tk2Desc: "直接的跨 tokenizer OPD 能够迁移证明推理能力，但会导致长度过度增长、频繁截断和训练不稳定。",
    tk3Title: "稳定化",
    tk3Desc: "掩盖特殊终止 token 的优势加上学生参考 KL 损失可以稳定训练、减少截断并提升最终性能。当教师和学生差距更大时，需要更大的 KL 权重。",
    tk4Title: "可泛化",
    tk4Desc: "SimpleOPD 在模型家族间有效，无需在教师轨迹上进行监督微调，适度增加蒸馏长度可以进一步提升长推理蒸馏效果。",
    
    // ========== Method ==========
    methodTitle: "跨 Tokenizer 在线策略蒸馏",
    methodIntro: "完整的方法总结如下——从学生采样，到跨度级 token 对齐，到稳定化的策略目标。",
    
    // ========== Setup ==========
    setupTitle: "教师、学生与数据",
    setupTeacherTitle: "教师：SU-01",
    setupTeacherDesc: "由我们团队开发的 IMO 金牌级数学推理模型，为其证明生成能力的在线策略蒸馏提供 token 级监督。",
    setupStudentTitle: "学生",
    setupStudentDesc: "同词表和跨 tokenizer 设置，涵盖架构和 tokenizer 设计：",
    setupDataTitle: "训练数据 — 数学证明问题",
    setupEvalTitle: "评估",
    setupEvalDesc: "ProofBench（不可验证，DeepSeek-V4-Flash 评判，4 次采样平均）加上 AnswerBench 和 AIME25（可验证；首先基于规则的验证器，GPT-OSS-120B 备用，8 次采样平均）。Temperature 1.0 · top-p 0.95 · 重复惩罚 1.0 · 最大响应长度 160K token。在最多 3 次尝试中采用最佳 checkpoint。",
    
    // ========== Results ==========
    resultsTitle: "结果与分析",
    resultsSub: "从不稳定到稳定提升——掩盖和参考 KL 如何稳定跨 tokenizer OPD，以及它在证明和科学基准上取得的成果。",
    
    // 3.1 Training Instability
    resultsBlock1Title: "3.1 在线策略蒸馏中的训练不稳定性",
    resultsBlock1P: "在 OPD 训练期间，Intern-S2-Preview 显示出适度的提升但有明显的退化迹象：<strong>截断率</strong>和<strong>重复率</strong>大幅上升，而平均响应长度急剧增长。这种影响对 Qwen3.5-35B-A3B 更为明显，其任务性能随着持续高截断率而恶化。表面上的性能提升可能以越来越冗长和不稳定的生成行为为代价。",
    
    // 3.1.2 Special-Token Masking
    resultsBlock2Title: "3.1.2 特殊 Token 掩盖",
    resultsBlock2P: "许多生成的响应无法发出终止 token，如 <span class=\"mono\">&lt;/think&gt;</span>，这表明学生受到教师长输出的强烈影响，并逐渐失去正确终止的能力。因此，我们在结构 token <span class=\"mono\">&lt;/think&gt;</span> 和 <span class=\"mono\">&lt;|im_end|&gt;</span> 上<strong>掩盖 OPD 损失</strong>——即在它们的优势计算中将教师对数概率设置为学生对数概率。掩盖可以部分缓解与长度相关的不稳定性，但无法解决长度扩张问题：截断在后期阶段继续上升。",
    
    // 3.1.3 Student Reference KL
    resultsBlock3Title: "3.1.3 学生参考 KL 损失",
    resultsBlock3P: "我们引入了<strong>学生参考 KL 损失</strong>（\\(k_{\\mathrm{KL}}=0.5\\)）以防止学生策略过度偏离其初始分布，在蒸馏期间保留通用能力。截断率有效降低到<strong>接近零</strong>，而 AIME25 和 AnswerBench 显著改善。通过锚定策略，参考 KL 抑制了过度冗长的倾向。",
    
    // Main results table
    mainResultsTitle: "跨学生家族的主要结果",
    mainResultsNote: "所有学生家族——同词表和跨 tokenizer——都显示出一致的提升。AMOBench（澳大利亚数学奥林匹克）进一步验证了推理迁移。",
    
    // Ablation table
    ablationTitle: "消融研究：稳定化技术",
    ablationNote: "掩盖特殊 token 的优势并添加学生参考 KL 对于稳定训练和达到最佳性能至关重要。",
    
    // Length effect table
    lengthTitle: "蒸馏长度的影响",
    lengthNote: "适度增加蒸馏序列长度（4K → 8K）进一步提升了长推理迁移，尤其是在跨 tokenizer 设置中。",
    
    // OOD table
    oodTitle: "分布外泛化",
    oodNote: "SimpleOPD 在科学推理基准（HLE、HiPhO）上也显示出提升，表明学到的推理能力超出了数学训练领域。",
    
    // ========== Analysis ==========
    whyTitle: "为什么有效",
    
    // 3.3.1 Lexical Overlap
    whyBlock1Title: "3.3.1 词汇重叠",
    whyBlock1P: "尽管存在 tokenizer 差异，学生生成的文本中有很大一部分可以通过共享的表面跨度与教师 token 匹配。因此，跨 tokenizer OPD 中的部分对齐保留了大量可用的训练信号——<strong>无需完整的 tokenizer 兼容性</strong>。",
    
    // 3.3.2 OOD Generalization
    whyBlock2Title: "3.3.2 分布外泛化",
    whyBlock2P: "仅在数学证明数据上训练，Intern-S2-OPD 保持了其广泛的科学推理能力——甚至在 HiPhO 上超越了 SU-01（38.6 → 41.1），表明 OPD 可能进一步有益于面向物理的推理。",
    
    // 3.3.3 Effect of Training Data
    whyBlock3Title: "3.3.3 训练数据的影响",
    whyBlock3P: "以证明为重点的数据是更好的迁移媒介：在 ProofBench@4 上达到 44.50，接近教师 SU-01。添加可验证的数学数据仅略微帮助 AnswerBench@8（80.10 → 81.10），同时削弱了证明迁移（44.50 → 38.50）。",
    
    // ========== Summary ==========
    summaryTitle: "总结",
    summaryP1: "我们研究了从长上下文推理模型（<span class=\"chip-teacher\">SU-01</span>）到短上下文学生模型的在线策略蒸馏。为了处理 tokenizer 差异，我们在共享文本空间中执行 OPD，仅对齐在学生和教师 tokenizer 下占据相同文本跨度的 token。朴素的蒸馏导致了长度爆炸和高截断率；我们引入了<strong>学生参考 KL 损失</strong>并<strong>掩盖了特殊终止 token 的优势</strong>以稳定训练。",
    summaryP2: "这些技术显著减少了长度爆炸和截断，同时提高了推理性能。跨同族和异族学生模型的实验显示出一致的提升，Intern-S2-Preview 在 ProofBench 上实现了 21.2 分的提升——一种有效且通用的长上下文推理蒸馏方法。",
    
    // ========== Citation ==========
    citationTitle: "引用",
    citationNote: "我们将很快发布代码和 arXiv 版本。",
    
    // ========== Footer ==========
    footerTeam: "P1 团队 · 上海人工智能实验室",
    footerMeta: "本页面为项目概览；所有图表均来自官方论文。"
  }
};
