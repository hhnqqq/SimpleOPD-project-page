// SimpleOPD 完整中英文翻译
const translations = {
  zh: {
    // ========== Hero 区域 ==========
    heroTagline: "将 IMO 金牌级<strong>证明推理</strong>能力从长上下文教师模型迁移到短上下文学生模型——<strong>跨 tokenizer</strong>，无需在教师轨迹上进行监督微调。",
    
    // Metrics
    metricStudents: "个学生模型",
    metricStudentsLabel: "Qwen3 · Qwen3.5 · Intern-S2 · GLM · Gemma",
    metricGain: "最大提升",
    metricGainLabel: "ProofBench 推理性能",
    metricAlign: "token 对齐率",
    metricAlignLabel: "跨 tokenizer 文本匹配",
    
    // Authors affiliation
    heroAffil: "P1 团队 · 上海人工智能实验室",
    
    // ========== TL;DR ==========
    tldrTitle: "概览",
    tldrP1: "在线策略蒸馏（OPD）提供了一种从更强教师模型迁移推理能力的方法，但将其应用于长上下文推理教师和短上下文学生时面临实际挑战，包括 <strong>tokenizer 不匹配</strong>、<strong>教师-学生分布不匹配</strong>、<strong>响应长度爆炸</strong>和<strong>训练不稳定</strong>。在本工作中，我们通过从长上下文推理模型 <span class=\"chip-teacher\">SU-01</span> 向短上下文学生模型迁移证明推理能力来研究这一设置。为了处理 tokenizer 差异，我们在<strong>共享文本空间</strong>中执行 OPD，仅对齐在学生和教师 tokenizer 下占据相同文本跨度的 token。",
    tldrP2: "朴素的 OPD 会导致生成长度过长和频繁截断，从而破坏训练稳定性。我们引入<strong>学生参考 KL 损失</strong>并<strong>掩盖特殊终止 token 的优势</strong>（<span class=\"mono\">&lt;/think&gt;</span>、<span class=\"mono\">&lt;|im_end|&gt;</span>）。这一策略约束学生不过度偏离其初始策略，从而缓解分布不匹配问题并促进稳定的长度增长。",
    tldrP3: "在同族和异族学生模型上的实验——<span class=\"chip-student\">Qwen3</span>、<span class=\"chip-student\">Qwen3.5</span>、<span class=\"chip-student\">Intern-S2-Preview</span>、<span class=\"chip-student\">GLM-4.7-Flash</span>、<span class=\"chip-student\">Gemma-4-26B</span>——显示数学推理能力持续提升，尤其是自然语言数学证明。值得注意的是，<strong>Intern-S2-Preview 在 ProofBench 上提升了 <span class=\"highlight\">21.2 分</span></strong>，达到 55.2 并超越 Gemini-2.5-Pro——同时在 HLE 和 HiPhO 等科学基准上也有提升，表明 OPD 迁移的推理能力可以泛化到数学训练领域之外。",
    
    // ========== Takeaways ==========
    takeawayTitle: "核心要点",
    tk1Title: "共享文本空间",
    tk1Desc: "跨 tokenizer OPD 无需完整的 token 级对齐：使用学生生成的文本作为共享空间，仅对齐在两个 tokenizer 下占据相同文本跨度的 token。",
    tk2Title: "长度爆炸",
    tk2Desc: "直接的跨 tokenizer OPD 能够迁移证明推理能力，但会导致长度过度增长、频繁截断和训练不稳定。",
    tk3Title: "稳定化",
    tk3Desc: "掩盖特殊终止 token 的优势加上学生参考 KL 损失可以稳定训练、减少截断并提升最终性能。当教师和学生差异更大时，需要更大的 KL 权重。",
    tk4Title: "可泛化",
    tk4Desc: "SimpleOPD 在模型家族间有效，无需在教师轨迹上进行监督微调，适度增加蒸馏长度可以进一步提升长推理蒸馏效果。",
    
    // ========== Method ==========
    methodTitle: "跨 Tokenizer 在线策略蒸馏",
    methodSub: "我们的方法包括三个核心组件：文本空间对齐、混合监督和训练稳定化。",
    
    methodBlock1Title: "1.1 设置",
    methodBlock1P1: "给定输入上下文 x（例如问题陈述），学生策略 πφ 在其自己的 tokenizer 和模板下采样响应 y = y₁:n。教师策略 πθ 在其自己的 tokenizer 和模板下评估相同的文本字符串 s（学生响应的纯文本形式）。两个策略的 token 序列通常不同——教师可能产生 z₁:m，其中 m ≠ n——但它们在文本空间中表示相同的字符串 s。",
    
    methodBlock2Title: "1.2 跨 Tokenizer 对齐",
    methodBlock2P1: "为了将教师的监督转移到学生，我们在共享文本空间中对齐 token 位置。对于每个学生 token yᵢ，我们找到对应的教师 token zⱼ，使得它们占据相同的文本跨度：τφ(yᵢ) = τθ(zⱼ)，其中 τ 表示 token 到文本的解码函数。如果找到匹配，我们记录对齐 (i, j)；否则该学生 token 保持未对齐状态。",
    methodBlock2P2: "这种对齐策略无需完整的词汇表映射或子词分割对齐——它仅要求教师和学生在文本级别产生相同的字符串。实际上，我们发现 60-85% 的学生 token 可以对齐到教师 token，为有效的跨 tokenizer 蒸馏提供了充足的监督信号。",
    
    methodBlock3Title: "1.3 对齐的教师对数概率",
    methodBlock3P1: "对于每个学生 token yᵢ，如果它对齐到教师 token zⱼ，我们使用教师的对数概率作为监督信号；否则，我们回退到学生自己的对数概率。这产生了混合的对数概率序列 ℓ̃，结合了来自两个策略的监督。",
    
    methodBlock4Title: "1.4 训练稳定化",
    methodBlock4P1: "朴素的 OPD 会导致响应长度爆炸和频繁截断。我们采用两种稳定化技术：",
    methodBlock4Li1: "<strong>特殊 token 掩盖</strong> — 我们从优势计算中移除教师对特殊终止 token（如 &lt;/think&gt;、&lt;|im_end|&gt;）的对数概率。这防止学生过早终止推理链。",
    methodBlock4Li2: "<strong>学生参考 KL</strong> — 我们在总损失中添加一个 KL 散度项 D_KL(πθ || πθ_ref)，将学生锚定在其初始策略附近。这防止学生过度偏离其原始分布，缓解分布不匹配问题。",
    
    // Algorithm (保留英文或不翻译过于技术的部分)
    algoTitle: "算法 1：SimpleOPD 训练循环",
    
    // ========== Setup ==========
    setupTitle: "教师、学生与数据",
    setupSub: "我们的实验设置包括一个长上下文教师模型和多个短上下文学生模型，涵盖同族和跨 tokenizer 设置。",
    
    setupTeacherTitle: "教师",
    setupTeacherDesc: "长上下文推理模型，在数学证明和竞赛级问题求解方面表现出色。我们使用 <span class=\"teacher-name\">SU-01</span>，一个在 IMO 和 AIME 级别数学推理任务上达到金牌水平的模型。",
    
    setupStudentTitle: "学生",
    setupStudentDesc: "同族和跨 tokenizer 设置，涵盖多种架构和 tokenizer 设计。我们评估了 7 个学生模型，跨越 Qwen、Intern、GLM 和 Gemma 家族：",
    
    setupDataTitle: "训练数据 — 数学证明问题",
    setupDataDesc: "我们使用数学推理数据集，涵盖自然语言证明、竞赛数学和代数推理：",
    setupDataNVR: "自然语言证明",
    setupDataProof: "结构化证明",
    setupDataAIME: "竞赛数学",
    setupDataGSM: "小学数学",
    
    setupConfigTitle: "训练配置",
    setupConfigDesc: "我们采用标准的 PPO 超参数，批量大小为 256，学习率为 1e-6，训练时长为 2-4 个 epoch。KL 权重根据教师-学生差距调整：同族学生使用 β=0.01，跨 tokenizer 学生使用 β=0.05-0.1。",
    
    // ========== Results ==========
    resultsTitle: "结果与分析",
    resultsSub: "我们在四个数学推理基准上评估 SimpleOPD：ProofBench（自然语言证明）、AnswerBench（竞赛数学）、AIME25（IMO 级别问题）和 AMOBench（澳大利亚数学奥林匹克）。",
    
    resultsBlock1Title: "3.1 在线策略蒸馏中的训练不稳定性",
    resultsBlock1P1: "朴素的跨 tokenizer OPD 能够迁移推理能力，但会导致严重的训练不稳定性。我们观察到三个主要问题：",
    resultsBlock1P2: "<strong>响应长度爆炸</strong> — 学生生成的响应长度在训练过程中持续增长，在训练过程中持续增长，远超过最大序列长度。",
    resultsBlock1P3: "<strong>频繁截断</strong> — 由于长度爆炸，大量响应被截断，导致不完整的推理链和性能下降。",
    resultsBlock1P4: "<strong>重复和循环</strong> — 学生开始产生重复的文本模式和推理循环，表明训练不稳定。",
    
    resultsBlock2Title: "3.1.2 特殊 Token 掩盖",
    resultsBlock2P1: "掩盖特殊终止 token 的优势可以部分缓解长度相关的不稳定性，但无法完全解决长度扩张问题：截断率在后期阶段继续上升。",
    
    resultsBlock3Title: "3.1.3 学生参考 KL 损失",
    resultsBlock3P1: "添加学生参考 KL 损失可以稳定训练；截断被有效消除，同时 AIME25 和 AnswerBench 的性能提升。KL 损失将学生锚定在其初始分布附近，防止病态行为。",
    
    mainResultsTitle: "跨学生家族的主要结果",
    mainResultsNote: "所有学生家族——无论是同词表还是跨 tokenizer——都有持续提升。AMOBench（澳大利亚数学奥林匹克）进一步验证了推理迁移效果。",
    
    ablationTitle: "消融研究",
    ablationNote: "掩盖特殊 token 的优势并添加学生参考 KL 对于稳定训练和达到最佳性能至关重要。",
    
    // ========== Analysis ==========
    whyTitle: "为什么有效",
    whySub: "我们分析了 SimpleOPD 成功的三个关键因素：高词汇重叠、分布外泛化和数据效率。",
    
    whyBlock1Title: "3.3.1 词汇重叠",
    whyBlock1P1: "<strong>词汇重叠率高</strong> — 我们的分析表明，学生生成的文本中有很大一部分可以通过共享的表面跨度与教师 token 匹配，这一比例在训练过程中持续增长。跨 tokenizer OPD 中的部分对齐因此保留了大量可用的训练信号——<strong>无需完整的 tokenizer 兼容性</strong>。",
    
    whyBlock2Title: "3.3.2 分布外泛化",
    whyBlock2P1: "SimpleOPD 在数学训练领域之外也显示出泛化能力。学生模型在科学推理基准（HLE、HiPhO）上也有提升，表明学到的推理能力——如链式推理、假设验证和逻辑推导——可以迁移到新的领域。",
    
    whyBlock3Title: "3.3.3 训练数据的影响",
    whyBlock3P1: "适度增加蒸馏序列长度可以进一步提升长推理能力的迁移，尤其是在跨 tokenizer 设置下。更长的上下文允许教师提供更完整的推理轨迹，学生可以从中学到更复杂的推理模式。",
    
    // ========== Summary ==========
    summaryTitle: "总结",
    summarySub: "SimpleOPD 提供了一种实用的方法，用于将长上下文推理能力从强大的教师模型迁移到短上下文学生模型——跨 tokenizer、无需监督微调。",
    
    summaryP1: "我们介绍了 <strong>SimpleOPD</strong>，一种实用的跨 tokenizer 在线策略蒸馏方法，用于将长上下文推理能力从强大的教师模型迁移到短上下文学生模型。通过在共享文本空间中对齐 token、掩盖特殊 token 的优势并添加学生参考 KL 损失，我们在各种学生家族中实现了稳定的训练和持续的性能提升。",
    summaryP2: "在四个数学推理基准上的实验表明，SimpleOPD 能够有效迁移证明推理能力，尤其是对于跨 tokenizer 的学生。值得注意的是，Intern-S2-Preview 在 ProofBench 上获得了 +21.2 分的提升，达到 55.2 并超越了 Gemini-2.5-Pro，同时在科学推理基准上也有提升。",
    
    summaryList1: "跨 tokenizer OPD 无需完整的 token 级对齐即可工作",
    summaryList2: "学生参考 KL 稳定训练并防止长度爆炸",
    summaryList3: "特殊 token 掩盖保留完整推理链",
    summaryList4: "高词汇重叠（高对齐率）使跨 tokenizer 蒸馏成为可能",
    
    // ========== Citation ==========
    citationTitle: "引用",
    citationNote: "我们将很快发布代码和 arXiv 版本。",
    
    // ========== Footer ==========
    footerTeam: "P1 团队 · 上海人工智能实验室",
    footerMeta: "本页面为项目概览；所有图表均来自官方论文。"
  }
};
