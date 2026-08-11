// SimpleOPD 完整中英文翻译 - 严格逐句对照英文原文
const translations = {
  zh: {
    pageTitle: "SimpleOPD — 面向长上下文推理的简单 Tokenizer 无关在线策略蒸馏",

    // ========== 导航栏 ==========
    nav: {
      overview: "概览",
      method: "方法",
      experiment: "实验",
      results: "结果",
      analysis: "分析",
      citation: "引用",
      paper: "论文"
    },

    // ========== Hero 区域 ==========
    hero: {
      badge: "P1 团队 · 上海人工智能实验室 · 2026 年 7 月",
      titleSub: "面向长上下文推理的简单<br/>Tokenizer 无关在线策略蒸馏",
      tagline: "将 IMO 金牌级<strong>证明推理</strong>能力从长上下文教师模型迁移到短上下文学生模型——<strong>跨 tokenizer</strong>，无需在教师轨迹上进行监督微调。",
      affil: "<sup>†</sup>共同一作&ensp;·&ensp;<sup>✉</sup>通讯作者&ensp;·&ensp;<sup>★</sup>项目负责人<br/>P1 团队 · 上海人工智能实验室",
      btnRead: "阅读方法",
      btnCite: "引用本文",
      btnKeyResults: "关键结果",
      metrics: [
        ["分", "ProofBench 提升（Intern-S2-OPD）"],
        ["在 ProofBench 上", "超越 Gemini-2.5-Pro 与 GPT-5"],
        ["个学生模型", "Qwen3 · Qwen3.5 · Intern-S2 · GLM · Gemma"],
        ["截断率", "配合 token 掩盖 + 参考 KL"]
      ]
    },

    // ========== TL;DR ==========
    tldr: {
      overline: "概览",
      title: "TL;DR",
      p1: "在线策略蒸馏（OPD）提供了一种从更强教师模型迁移推理能力的有前景的方法，但面临的挑战包括<strong>tokenizer 不匹配</strong>、<strong>教师-学生分布不匹配</strong>、<strong>响应长度爆炸</strong>和<strong>训练不稳定</strong>。在这项工作中，我们研究了一种设置，其中 OPD 将证明推理能力从长上下文推理模型 <span class=\"chip-teacher\">SU-01</span> 迁移到短上下文学生模型。为了处理 tokenizer 差异，我们在<strong>共享文本空间</strong>中执行 OPD，仅对齐在学生和教师 tokenizer 下占据相同文本跨度的 token。",
      p2: "朴素的 OPD 会导致过度的生成长度和频繁截断，破坏训练稳定性。我们引入了<strong>学生参考 KL 损失</strong>并<strong>掩盖特殊终止 token 的优势</strong>（<span class=\"mono\">&lt;/think&gt;</span>、<span class=\"mono\">&lt;|im_end|&gt;</span>）。这约束了学生不会过度偏离其初始策略，缓解了分布不匹配并促进了稳定的长度增长。",
      p3: "在同族和异族学生——<span class=\"chip-student\">Qwen3</span>、<span class=\"chip-student\">Qwen3.5</span>、<span class=\"chip-student\">Intern-S2-Preview</span>、<span class=\"chip-student\">GLM-4.7-Flash</span>、<span class=\"chip-student\">Gemma-4-26B</span>——上的实验显示了数学推理的持续提升，尤其是自然语言数学证明。值得注意的是，<strong>Intern-S2-Preview 在 ProofBench 上提升了 <span class=\"highlight\">21.2 分</span></strong>，达到 55.2 并超越了 Gemini-2.5-Pro——同时也提升了诸如 HLE 和 HiPhO 等科学基准，表明 OPD 迁移的推理能力泛化到了数学训练领域之外。"
    },

    // ========== Takeaways ==========
    takeaways: {
      overline: "亮点",
      title: "核心要点",
      cards: [
        {
          title: "共享文本空间",
          desc: "跨 tokenizer OPD 无需完整的 token 级对齐即可工作：使用学生生成的文本作为共享空间，仅对齐在两个 tokenizer 下占据相同文本跨度的 token。"
        },
        {
          title: "长度爆炸",
          desc: "直接的跨 tokenizer OPD 能够迁移证明推理能力，但会导致长度过度增长、频繁截断和训练不稳定。"
        },
        {
          title: "稳定化",
          desc: "掩盖特殊终止 token 的优势加上学生参考 KL 损失可以稳定训练、减少截断并提升最终性能。当教师和学生差距更大时，需要更大的 KL 权重。"
        },
        {
          title: "可泛化",
          desc: "SimpleOPD 在模型家族间有效，无需在教师轨迹上进行监督微调，适度增加蒸馏长度可以进一步提升长推理蒸馏效果。"
        }
      ]
    },

    // ========== Method ==========
    method: {
      overline: "方法",
      title: "跨 Tokenizer 在线策略蒸馏",
      intro: "完整的方法总结如下——从学生采样，到跨度级 token 对齐，到稳定化的策略目标。",
      figBadge: "概览",
      figCaption: "SimpleOPD：学生在其自身 tokenizer 下采样响应；教师在其自身 tokenizer 和聊天模板下评估相同的表面字符串；监督仅通过占据相同文本跨度的 token 流动。",
      blocks: [
        {
          title: "1.1 设置",
          ps: [
            "设 \\(\\mathbf{x}\\) 表示由消息列表构成的输入对话。学生和教师可能使用不同的 tokenizer 和聊天模板，分别记为 \\(\\mathcal{C}_{\\theta}\\) 和 \\(\\mathcal{C}_{\\phi}\\)。我们首先构造学生输入上下文 \\(\\mathbf{c}_{\\theta}\\)，并用 rollout 引擎执行的学生策略 \\(\\pi_{\\theta_{\\mathrm{roll}}}\\) 采样响应 token 序列：",
            "通过学生 tokenizer 解码 \\(y_{1:n}\\) 得到响应表面字符串 \\(s\\)。我们不把学生上下文传给教师，而是使用教师自己的聊天模板重建教师上下文文本 \\(u_\\phi\\)，并拼接学生响应：",
            "其中 \\(\\oplus\\) 表示字符串拼接。然后用教师编码器对完整文本 \\(u_\\phi\\) 进行分词，得到 \\(z_{1:m}\\)。这使得教师能够在其原生 tokenizer 和聊天模板下评估学生响应——尽管 \\(z\\) 和 \\(y\\) 可能不同，被评估的响应文本在两侧是相同的。响应 token 贡献的增量文本跨度满足："
          ]
        },
        {
          title: "1.2 跨 Tokenizer 对齐",
          ps: [
            "将每个学生和教师 token 之前的累计响应文本定义为",
            "如果两次分词已经消费了相同的响应前缀，并且当前 token 贡献了相同的文本跨度，则教师位置 \\(i\\) 与学生位置 \\(t\\) 对齐：",
            "等价地，对齐的教师-学生对在共享响应字符串 \\(s\\) 中覆盖相同的起始和结束偏移。仅部分重叠的 token <em>不</em>视为对齐——一个教师 token 的对数概率不能唯一地分配给多个学生 token，多个教师 token 的对数概率也不能合并到单个学生 token 中。"
          ]
        },
        {
          title: "1.3 对齐的教师对数概率",
          ps: [
            "对每个学生位置 \\(t\\)，定义对齐指示符",
            "设 \\(\\log\\pi_\\theta\\) 和 \\(\\log\\pi_\\phi\\) 分别为学生和教师策略的对数概率。我们构造一个学生长度的教师目标：",
            "因此，对齐位置继承教师的对数概率，而未匹配的位置回退到学生自身的对数概率。我们报告词汇重叠率",
            "它衡量了接收教师监督的学生响应 token 的比例。完整的对齐过程如算法 1 所示。"
          ]
        },
        {
          title: "1.4 在线策略蒸馏目标",
          ps: [
            "跨 tokenizer 蒸馏目标定义在对齐的响应位置上：",
            "该目标是<strong>反向 KL 散度的 token 对齐代理</strong>。它只在两个 tokenizer 产生相同响应字符串局部切分的位置上比较教师和学生的概率。当 tokenizer 相同时，每个学生 token 都被对齐，目标退化为",
            "当 tokenizer 不同时，相同的响应字符串会被分解成不同的 token 序列，因此无法直接计算精确的 token 级 KL。为了在同一个 rollout 批次上进行多次策略更新，我们对未匹配位置用其更新前的对数概率替代在线对数概率，并使用固定策略优势与 PPO 裁剪损失：",
            "由此产生的目标是"
          ]
        },
        {
          title: "1.5 训练稳定化",
          ps: [
            "朴素的 OPD 会使学生变得冗长且容易截断。两个简单的修正可以保持训练稳定："
          ]
        }
      ],
      algoBadge: "算法 1",
      algoTitle: "跨 Tokenizer 在线策略蒸馏",
      algoLines: [
        "<span class=\"kw\">输入：</span>学生 \\(\\theta\\)、教师 \\(\\phi\\)、数据集 \\(\\mathcal{D}\\)",
        "<span class=\"kw\">对</span>每次 rollout 迭代<span class=\"kw\">执行</span>",
        "<span class=\"kw\">对</span>每个提示 \\(\\mathbf{x} \\sim \\mathcal{D}\\)<span class=\"kw\">执行</span>",
        "\\(c_\\theta \\leftarrow \\mathcal{C}_\\theta(\\mathbf{x})\\)<span class=\"cmt\">▷ 学生上下文</span>",
        "\\(y_{1:n} \\sim \\pi_{\\theta_{\\mathrm{roll}}}(\\cdot \\mid c_\\theta)\\)<span class=\"cmt\">▷ 采样响应</span>",
        "\\(s \\leftarrow \\mathrm{decode}(y_{1:n})\\)<span class=\"cmt\">▷ 响应表面字符串</span>",
        "\\(u_\\phi \\leftarrow \\mathcal{C}_\\phi(\\mathbf{x}) \\oplus s\\)<span class=\"cmt\">▷ 教师上下文 + 响应</span>",
        "\\(z_{1:m} \\leftarrow \\mathrm{encode}_\\phi(u_\\phi)\\)<span class=\"cmt\">▷ 教师分词</span>",
        "计算 \\(P_\\theta(t)\\)、\\(P_\\phi(i)\\)<span class=\"cmt\">▷ 累计跨度</span>",
        "\\(\\mathcal{M} \\leftarrow \\{(i,t) : P_\\phi(i){=}P_\\theta(t) \\wedge \\tau_\\phi(z_i){=}\\tau_\\theta(y_t)\\}\\)",
        "\\(\\widetilde{\\ell}_t^{\\phi} \\leftarrow\\)式 (1.3) 的各种情形<span class=\"cmt\">▷ 对齐的教师目标</span>",
        "<span class=\"kw\">结束循环</span>",
        "使用裁剪的 PPO 目标 + 学生参考 KL 更新 \\(\\theta\\)",
        "<span class=\"kw\">结束循环</span>"
      ],
      stab: [
        {
          title: "特殊 Token 掩盖",
          desc: "在结构 token <span class=\"mono\">&lt;/think&gt;</span> 和 <span class=\"mono\">&lt;|im_end|&gt;</span> 上掩盖 OPD 损失——它们控制格式和终止行为，无需与教师完全一致。"
        },
        {
          title: "学生参考 KL",
          desc: "添加参考 KL 项（\\(k_{\\mathrm{KL}} \\in \\{0.5, 1.5\\}\\)）以防止学生策略过度偏离其初始分布，保留通用能力。"
        }
      ]
    },

    // ========== Setup ==========
    setup: {
      overline: "实验设置",
      title: "教师、学生与数据",
      teacherTitle: "教师：<span class=\"teacher-name\">SU-01</span>",
      teacherDesc: "由我们团队开发的 IMO 金牌级数学推理模型，为其证明生成能力的在线策略蒸馏提供 token 级监督。",
      teacherTags: ["IMO 金牌级", "长上下文", "数学证明"],
      studentTitle: "学生",
      studentDesc: "同词表和跨 tokenizer 设置，涵盖架构和 tokenizer 设计：",
      studentLabels: ["同族", "同族", "跨 tokenizer", "跨 tokenizer", "跨 tokenizer", "跨 tokenizer", "跨 tokenizer"],
      dataTitle: "训练数据 — 数学证明问题",
      dataItems: [
        ["OPC 问题", "开放证明语料库"],
        ["AoPS 问题", "Art of Problem Solving"],
        ["书籍问题", "竞赛训练书籍"],
        ["数之谜问题", "中文数学论坛 + Evan Chen 的奥林匹克材料"]
      ],
      configTitle: "实现细节",
      configKeys: ["框架", "Rollout 迭代次数", "学习率", "Rollout 批大小", "每个提示采样数", "最大序列长度", "裁剪系数", "蒸馏系数", "每步策略更新次数", "KL 系数"],
      configNote: "<strong>评估。</strong>ProofBench（不可验证，DeepSeek-V4-Flash 评判，4 次 rollout 取平均）加上 AnswerBench 与 AIME25（可验证；先使用基于规则的验证器，GPT-OSS-120B 作为后备，8 次 rollout 取平均）。Temperature 1.0 · top-p 0.95 · 重复惩罚 1.0 · 最大响应长度 160K token。在 AIME@4 与 AnswerBench@1 的平均值上选择最佳 checkpoint。"
    },

    // ========== Results ==========
    results: {
      overline: "结果",
      title: "结果与分析",
      sub: "从不稳定到稳定提升——掩盖和参考 KL 如何稳定跨 tokenizer OPD，以及它在证明和科学基准上取得的成果。",
      block1Title: "3.1 在线策略蒸馏中的训练不稳定性",
      block1P: "在 OPD 训练期间，Intern-S2-Preview 显示出适度的提升但有明显的退化迹象：<strong>截断率</strong>和<strong>重复率</strong>大幅上升，而平均响应长度急剧增长。这种影响对 Qwen3.5-35B-A3B 更为明显，其任务性能随着持续高截断率而恶化。表面上的性能提升可能以越来越冗长和不稳定的生成行为为代价。",
      fig1Cap: "Intern-S2-Preview 的训练动态：截断率、重复率和响应长度不断上升，表明生成行为越来越不稳定。",
      fig2Cap: "Qwen3.5-35B-A3B 的训练动态：截断率和长度上升，伴随任务性能下降。",
      block2Title: "3.1.2 特殊 Token 掩盖",
      block2P: "许多生成的响应无法发出终止 token，如 <span class=\"mono\">&lt;/think&gt;</span>，这表明学生受到教师长输出的强烈影响，并逐渐失去正确终止的能力。因此，我们在结构 token <span class=\"mono\">&lt;/think&gt;</span> 和 <span class=\"mono\">&lt;|im_end|&gt;</span> 上<strong>掩盖 OPD 损失</strong>——即在它们的优势计算中将教师对数概率设置为学生对数概率。掩盖可以部分缓解与长度相关的不稳定性，但无法解决长度扩张问题：截断在后期阶段继续上升。",
      fig3Cap: "仅靠掩盖可以缓解与长度相关的不稳定性，但无法解决长度扩张问题：截断在后期阶段持续上升。",
      table21Title: "特殊 token 掩盖的效果",
      table21Note: "掩盖改善了训练稳定性，但单独使用既不能解决长度扩张，也不能提升 OPD 性能。",
      block3Title: "3.1.3 学生参考 KL 损失",
      block3P: "我们引入了<strong>学生参考 KL 损失</strong>（\\(k_{\\mathrm{KL}}=0.5\\)）以防止学生策略过度偏离其初始分布，在蒸馏期间保留通用能力。截断率有效降低到<strong>接近零</strong>，而 AIME25 和 AnswerBench 显著改善。通过锚定策略，参考 KL 抑制了过度冗长的倾向。",
      fig4Cap: "添加学生参考 KL 损失使训练稳定；截断被有效消除，同时 AIME25 和 AnswerBench 得到提升。",
      table31Title: "参考 KL 损失的效果",
      table31Note: "OPD + Ref KL：ProofBench@4 21.70 → 38.50；AnswerBench@8 76.03 → 79.10；AIME25@8 88.33 → 95.80。",
      block4Title: "3.2 主要结果",
      block4P1: "将特殊 token 掩盖与学生参考 KL 损失相结合取得了最强的结果（Qwen 系列和 Intern-S2-Preview 使用 \\(k_{\\mathrm{KL}}=0.5\\)；GLM-4.7-Flash 使用 \\(1.5\\)）。",
      mainTitle: "跨学生家族的主要结果",
      mainNote: "所有学生家族——同词表和跨 tokenizer——都显示出一致的提升。AMOBench（澳大利亚数学奥林匹克）进一步验证了推理迁移。",
      block4P2: "我们还使用 <strong>Gemini-2.5-Pro</strong> 作为评判者评估 ProofBench，采用与 SU-01 相同的评估设置。Intern-S2-OPD 从 <strong>34.0 提升到 55.2</strong>——<strong>+21.2 分</strong>的提升——超越了 Gemini-2.5-Pro 和 GPT-5，并显著缩小了与 SU-01 和 DeepSeek-V3.2-Speciale 的差距。",
      fig5Cap: "ProofBench（Gemini-2.5-Pro 评判）：Intern-S2-OPD 达到 55.2——+21.2 分的提升，超越了 Gemini-2.5-Pro 和 GPT-5，同时显著缩小了与 SU-01 和 DeepSeek-V3.2-Speciale 的差距。"
    },

    // ========== Analysis ==========
    analysis: {
      overline: "深入分析",
      title: "为什么有效",
      block1Title: "3.3.1 词汇重叠",
      block1P: "尽管存在 tokenizer 差异，学生生成的文本中有很大一部分可以通过共享的表面跨度与教师 token 匹配。因此，跨 tokenizer OPD 中的部分对齐保留了大量可用的训练信号——<strong>无需完整的 tokenizer 兼容性</strong>。",
      fig6Cap: "OPD 训练期间的词汇重叠曲线：所有模型都从较高的对齐 token 比例开始，并随时间进一步上升——学生文本的很大一部分可以通过共享表面跨度与教师 token 匹配。",
      block2Title: "3.3.2 分布外泛化",
      block2Note: "仅在数学证明数据上训练，Intern-S2-OPD 保持了其广泛的科学推理能力——甚至在 HiPhO 上超越了 SU-01（38.6 → 41.1），表明 OPD 可能进一步有益于面向物理的推理。",
      block3Title: "3.3.3 训练数据的影响",
      block3Note: "以证明为重点的数据是更好的迁移媒介：ProofBench@4 达到 44.50，接近教师 SU-01。添加可验证的数学数据仅略微帮助 AnswerBench@8（80.10 → 81.10），同时削弱了证明迁移（44.50 → 38.50）。",
      block4Title: "3.3.4 蒸馏长度的影响",
      block4Note: "对于长上下文证明推理，6k 不足以捕捉教师的推理模式。将蒸馏长度从 6k 扩展到 32k 改善了所有基准，其中 ProofBench 的提升最为显著——更长的推理轨迹能更好地逼近教师的长上下文能力。",
      block5Title: "3.3.5 GLM-4.7-Flash 上的 KL 损失",
      block5P: "当 \\(k_{\\mathrm{KL}} = 1.0\\) 时，GLM 在仅 40 步之后就达到 <strong>100% 截断</strong>——当教师和学生差异更大时，需要更强的参考 KL 系数。",
      block5Note: "更强的学生 KL 系数控制了 GLM-4.7-Flash 的截断，同时仍然允许有效的迁移。但系数过大（2.0）会过度约束策略并限制进一步的提升。"
    },

    // ========== Conclusion ==========
    conclusion: {
      overline: "结论",
      title: "总结",
      p1: "我们研究了从长上下文推理模型（<span class=\"chip-teacher\">SU-01</span>）到短上下文学生模型的在线策略蒸馏。为了处理 tokenizer 差异，我们在<strong>共享文本空间</strong>中执行 OPD，仅对齐在学生和教师 tokenizer 下占据相同文本跨度的 token。朴素蒸馏导致了严重的训练不稳定——输出长度持续增加、终止 token 经常缺失、许多响应被截断。我们引入了两个简单而有效的稳定化技术：",
      li1: "<span class=\"concl-num\">✂</span>在结构终止 token（<span class=\"mono\">&lt;/think&gt;</span>、<span class=\"mono\">&lt;|im_end|&gt;</span>）上掩盖 OPD 损失",
      li2: "<span class=\"concl-num\">⚖</span>添加参考 KL 损失以约束学生策略",
      p2: "这些技术大幅减少了长度爆炸和截断，同时提升了推理性能。跨同族和异族学生模型的实验显示出一致的提升，<strong>Intern-S2-Preview 在 ProofBench 上实现了 21.2 分的提升</strong>——一种在<strong>不同 tokenizer 和模型家族</strong>间向短上下文模型迁移长上下文推理能力的有效且可泛化的方法。",
      chipNote: "代码与 arXiv 版本即将发布"
    },

    // ========== Citation ==========
    citation: {
      overline: "BibTeX",
      title: "引用",
      note: "我们将很快发布代码和 arXiv 版本。",
      copy: "复制",
      copied: "已复制 ✓",
      pressCtrl: "按 Ctrl+C"
    },

    // ========== Footer ==========
    footer: {
      team: "P1 团队 · 上海人工智能实验室",
      meta: "本页面为项目概览；所有图表均来自官方论文。"
    },

    // ========== 通用片段 ==========
    common: {
      figBadges: {
        "Overview": "概览",
        "Fig. 1": "图 1",
        "Fig. 2": "图 2",
        "Fig. 3": "图 3",
        "Fig. 4": "图 4",
        "Fig. 5": "图 5",
        "Fig. 6": "图 6",
        "Algorithm 1": "算法 1"
      },
      tags: { "teacher": "教师", "base": "基线" },
      tableHeads: {
        "Model": "模型",
        "Length": "长度",
        "Student KL Coef.": "学生 KL 系数",
        "FrontierScience Olympiad": "FrontierScience 奥林匹克",
        "FrontierScience Research": "FrontierScience 研究"
      }
    }
  }
};
