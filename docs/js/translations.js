// 完整的中英文翻译数据
const translations = {
  zh: {
    // Hero 区域
    heroTagline: "将 IMO 金牌级<strong>证明推理</strong>能力从长上下文教师模型迁移到短上下文学生模型——<strong>跨 tokenizer</strong>，无需在教师轨迹上进行监督微调。",
    
    // Metrics
    metricStudents: "个学生模型",
    metricStudentsLabel: "Qwen3 · Qwen3.5 · Intern-S2 · GLM · Gemma",
    metricGain: "最大提升",
    metricGainLabel: "ProofBench 推理性能",
    metricAlign: "token 对齐率",
    metricAlignLabel: "跨 tokenizer 文本匹配",
    
    // TL;DR
    tldrTitle: "概览",
    tldrP1: "在线策略蒸馏（OPD）提供了一种从更强教师模型迁移推理能力的方法，但将其应用于长上下文推理教师和短上下文学生时面临实际挑战，包括 <strong>tokenizer 不匹配</strong>、<strong>教师-学生分布不匹配</strong>、<strong>响应长度爆炸</strong>和<strong>训练不稳定</strong>。在本工作中，我们通过从长上下文推理模型 <span class=\"chip-teacher\">SU-01</span> 向短上下文学生模型迁移证明推理能力来研究这一设置。为了处理 tokenizer 差异，我们在<strong>共享文本空间</strong>中执行 OPD，仅对齐在学生和教师 tokenizer 下占据相同文本跨度的 token。",
    tldrP2: "朴素的 OPD 会导致生成长度过长和频繁截断，从而破坏训练稳定性。我们引入<strong>学生参考 KL 损失</strong>并<strong>掩盖特殊终止 token 的优势</strong>（<span class=\"mono\">&lt;/think&gt;</span>、<span class=\"mono\">&lt;|im_end|&gt;</span>）。这一策略约束学生不过度偏离其初始策略，从而缓解分布不匹配问题并促进稳定的长度增长。",
    tldrP3: "在同族和异族学生模型上的实验——<span class=\"chip-student\">Qwen3</span>、<span class=\"chip-student\">Qwen3.5</span>、<span class=\"chip-student\">Intern-S2-Preview</span>、<span class=\"chip-student\">GLM-4.7-Flash</span>、<span class=\"chip-student\">Gemma-4-26B</span>——显示数学推理能力持续提升，尤其是自然语言数学证明。值得注意的是，<strong>Intern-S2-Preview 在 ProofBench 上提升了 <span class=\"highlight\">21.2 分</span></strong>，达到 55.2 并超越 Gemini-2.5-Pro——同时在 HLE 和 HiPhO 等科学基准上也有提升，表明 OPD 迁移的推理能力可以泛化到数学训练领域之外。",
    
    // Takeaways
    takeawayTitle: "核心要点",
    tk1Title: "共享文本空间",
    tk1Desc: "跨 tokenizer OPD 无需完整的 token 级对齐：使用学生生成的文本作为共享空间，仅对齐在两个 tokenizer 下占据相同文本跨度的 token。",
    tk2Title: "长度爆炸",
    tk2Desc: "直接的跨 tokenizer OPD 能够迁移证明推理能力，但会导致长度过度增长、频繁截断和训练不稳定。",
    tk3Title: "稳定化",
    tk3Desc: "掩盖特殊终止 token 的优势加上学生参考 KL 损失可以稳定训练、减少截断并提升最终性能。当教师和学生差异更大时，需要更大的 KL 权重。",
    tk4Title: "可泛化",
    tk4Desc: "SimpleOPD 在模型家族间有效，无需在教师轨迹上进行监督微调，适度增加蒸馏长度可以进一步提升长推理蒸馏效果。",
    
    // Method
    methodTitle: "跨 Tokenizer 在线策略蒸馏",
    methodIntro: "我们的方法包括三个核心组件：",
    
    // Setup
    setupTitle: "教师、学生与数据",
    setupTeacherTitle: "教师",
    setupTeacherDesc: "长上下文推理模型，在数学证明和竞赛级问题求解方面表现出色：",
    setupStudentTitle: "学生",
    setupStudentDesc: "同族和跨 tokenizer 设置，涵盖多种架构和 tokenizer 设计：",
    setupDataTitle: "数据",
    setupDataDesc: "数学推理数据集，涵盖自然语言证明、竞赛数学和代数推理：",
    
    // Results
    resultsTitle: "结果与分析",
    mainResultsTitle: "跨学生家族的主要结果",
    mainResultsNote: "所有学生家族——无论是同词表还是跨 tokenizer——都有持续提升。AMOBench（澳大利亚数学奥林匹克）进一步验证了推理迁移效果。",
    
    ablationTitle: "消融研究：稳定化技术",
    ablationNote: "掩盖特殊 token 的优势并添加学生参考 KL 对于稳定训练和达到最佳性能至关重要。",
    
    lengthTitle: "蒸馏长度的影响",
    lengthNote: "适度增加蒸馏序列长度（4K → 8K）可以进一步提升长推理能力的迁移，尤其是在跨 tokenizer 设置下。",
    
    oodTitle: "分布外泛化",
    oodNote: "SimpleOPD 在科学推理基准（HLE、HiPhO）上也有提升，表明学到的推理能力可以超出数学训练领域。",
    
    // Why it works
    whyTitle: "为什么有效",
    whyP1: "<strong>词汇重叠率高</strong> — 我们的分析表明，学生生成的 token 中有 60-85% 在文本空间中与教师 token 对齐，这一比例在训练过程中持续增长。这种高重叠率使得跨 tokenizer 蒸馏成为可能。",
    whyP2: "<strong>稳定化至关重要</strong> — 没有学生参考 KL 损失，训练会遭遇严重的长度爆炸（响应长度 → 12K+ token）和频繁的截断（>40%），导致性能下降。参考 KL 将学生锚定在其初始分布附近，防止病态行为。",
    whyP3: "<strong>掩盖特殊 token</strong> — 屏蔽教师对特殊终止 token 的优势（如 <span class=\"mono\">&lt;/think&gt;</span>、<span class=\"mono\">&lt;|im_end|&gt;</span>）可以防止学生过早终止推理链，允许更长、更完整的推理轨迹。",
    
    // Summary
    summaryTitle: "总结",
    summaryP1: "我们介绍了 <strong>SimpleOPD</strong>，一种实用的跨 tokenizer 在线策略蒸馏方法，用于将长上下文推理能力从强大的教师模型迁移到短上下文学生模型。通过在共享文本空间中对齐 token、掩盖特殊 token 的优势并添加学生参考 KL 损失，我们在各种学生家族中实现了稳定的训练和持续的性能提升。",
    summaryP2: "在四个数学推理基准上的实验表明，SimpleOPD 能够有效迁移证明推理能力，尤其是对于跨 tokenizer 的学生。值得注意的是，Intern-S2-Preview 在 ProofBench 上获得了 +21.2 分的提升，达到 55.2 并超越了 Gemini-2.5-Pro，同时在科学推理基准上也有提升。",
    summaryHighlight: "核心见解：高词汇重叠使跨 tokenizer OPD 成为可能；学生参考 KL 稳定训练；特殊 token 掩盖保留完整推理链。",
    
    // Citation
    citationTitle: "引用",
    citationNote: "我们将很快发布代码和 arXiv 版本。",
    
    // Footer
    footerTeam: "P1 团队 · 上海人工智能实验室",
    footerMeta: "本页面为项目概览；所有图表均来自官方论文。"
  }
};
