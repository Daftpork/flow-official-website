/**
 * Translation Data for i18n
 * Supports English (en) and Chinese (zh)
 */

export type Language = "en" | "zh";

export const translations = {
  en: {
    // Navigation
    nav: {
      linso: "Linso",
      flow: "Flow",
      showcase: "Show Case",
      download: "Download",
      resources: "Resources",
      language: "English",
    },

    // Hero Section
    hero: {
      lines: ["Speak to type", "AI understands your flow"],
      subtitle: "Linso Flow — Context-Aware Voice AI for macOS",
      cta: "Download for Free",
    },

    // Efficiency Section
    efficiency: {
      title: "10x Efficiency Boost",
      subtitle: "Traditional Typing 20-30 wpm → Voice + AI 150-200 wpm",
      traditional: {
        title: "Traditional Input",
        subtitle: "Write a thank you email",
        items: [
          "Think → Type → Edit/Format",
          "Frequent window switching between apps",
          "Mechanical input, interrupted thinking flow",
        ],
      },
      flow: {
        title: "Linso Flow",
        subtitle: "Write a thank you email",
        items: [
          "Voice → Intent → Smart Output",
          "Auto-reads current page context",
          "Remembers conversation history",
        ],
      },
    },

    // Features Section
    features: {
      title: "Intelligent Core Features",
      subtitle: "The AI engine that powers your productivity.",
      floatingWindow: {
        title: "Global Floating Window",
        subtitle: "One-click activation in any app. Supports Voice, Text, and File inputs.",
      },
      contextAwareness: {
        title: "Context Awareness",
        subtitle: "Auto-reads Browser/Word/Excel. No copy-paste required.",
      },
      smartMemory: {
        title: "Smart Memory",
        subtitle: "Short-term + Permanent memory. Automatically referenced in AI interactions.",
      },
    },

    // Workflow Section
    workflow: {
      title: "Seamless Workflows",
      subtitle: "From emails to data analysis, handle tasks without breaking your stride.",
      steps: [
        {
          title: "Article Summary",
          desc: "Browse web + \"Summarize key points.\" Auto-reads and summarizes.",
        },
        {
          title: "Instant Translation",
          desc: "Select text + \"Translate to German.\" Outputs translation directly.",
        },
        {
          title: "Data Analysis",
          desc: "Extract insights from tables. Formats data instantly.",
        },
      ],
    },

    // Pricing Section
    pricing: {
      title: "Subscription Plans",
      subtitle: "The AI engine that powers your productivity.",
      monthly: "Monthly",
      yearly: "Yearly",
      save: "Save 20%",
      perMonth: "/month",
      billedYearly: "Billed yearly",
      downloadFree: "Download for Free",
      trialNote: "🎁 14-day free trial of all Pro features",
      plans: {
        free: {
          name: "Free",
          description: "For personal exploration",
          features: [
            "Smart Voice Transcription, Auto-Removes Filler Words",
            "4,000 Words/Week AI Assistance Quota",
            "Supports 60+ Languages",
            "Global Shortcut for One-Click Activation",
            "Basic Context Understanding",
          ],
        },
        pro: {
          name: "Pro",
          description: "For power users",
          features: [
            "Includes All Basic Features",
            "Unlimited AI Assistance Quota",
            "Smart Context: Auto-Reads Web Pages & Documents",
            "Personal Memory: Saves Custom Info",
            "Deep Integration: Optimized For Chrome/Safari/Word/Excel",
            "Streaming Output: Natural Typing Effect",
            "Priority Technical Support",
          ],
        },
      },
    },

    // CTA Section
    cta: {
      phrases: ["Flow", "Context-Aware Voice AI", "Speak to type", "Next-Gen AI Voice Input"],
      subtitle: "Download Linso and get your life in order with AI.",
      button: "Download for Free",
    },

    // Footer
    footer: {
      company: "OCTO AI PTE. LTD.",
      copyright: "© 2025 Linso. All rights reserved.",
      terms: "Terms of Service",
      privacy: "Privacy Policy",
    },
  },

  zh: {
    // 导航
    nav: {
      linso: "Linso",
      flow: "Flow",
      showcase: "案例展示",
      download: "下载",
      resources: "资源",
      language: "中文",
    },

    // 首屏
    hero: {
      lines: ["语音即输入", "AI 理解你的心流"],
      subtitle: "Linso Flow — macOS 智能语音 AI 助手",
      cta: "免费下载",
    },

    // 效率对比
    efficiency: {
      title: "效率提升 10 倍",
      subtitle: "传统打字 20-30 字/分钟 → 语音 + AI 150-200 字/分钟",
      traditional: {
        title: "传统输入",
        subtitle: "写一封感谢邮件",
        items: [
          "思考 → 打字 → 编辑/排版",
          "频繁在应用之间切换窗口",
          "机械输入，打断思维流程",
        ],
      },
      flow: {
        title: "Linso Flow",
        subtitle: "写一封感谢邮件",
        items: [
          "语音 → 意图 → 智能输出",
          "自动读取当前页面上下文",
          "记忆对话历史",
        ],
      },
    },

    // 核心功能
    features: {
      title: "智能核心功能",
      subtitle: "驱动您生产力的 AI 引擎。",
      floatingWindow: {
        title: "全局悬浮窗",
        subtitle: "任意应用一键唤起，支持语音、文字、文件输入。",
      },
      contextAwareness: {
        title: "上下文感知",
        subtitle: "自动读取浏览器/Word/Excel，无需复制粘贴。",
      },
      smartMemory: {
        title: "智能记忆",
        subtitle: "短期 + 永久记忆，AI 交互时自动引用。",
      },
    },

    // 工作流程
    workflow: {
      title: "无缝工作流",
      subtitle: "从邮件到数据分析，轻松处理任务不打断心流。",
      steps: [
        {
          title: "文章摘要",
          desc: "浏览网页 + \"总结要点\"，自动阅读并生成摘要。",
        },
        {
          title: "即时翻译",
          desc: "选中文本 + \"翻译成德语\"，直接输出翻译结果。",
        },
        {
          title: "数据分析",
          desc: "从表格中提取洞察，即时格式化数据。",
        },
      ],
    },

    // 定价
    pricing: {
      title: "订阅方案",
      subtitle: "驱动您生产力的 AI 引擎。",
      monthly: "月付",
      yearly: "年付",
      save: "省 20%",
      perMonth: "/月",
      billedYearly: "按年计费",
      downloadFree: "免费下载",
      trialNote: "🎁 14 天免费试用所有 Pro 功能",
      plans: {
        free: {
          name: "免费版",
          description: "个人探索使用",
          features: [
            "智能语音转录，自动去除语气词",
            "每周 4,000 字 AI 辅助额度",
            "支持 60+ 种语言",
            "全局快捷键一键唤起",
            "基础上下文理解",
          ],
        },
        pro: {
          name: "专业版",
          description: "高效能用户首选",
          features: [
            "包含所有基础功能",
            "无限 AI 辅助额度",
            "智能上下文：自动读取网页和文档",
            "个人记忆：保存自定义信息",
            "深度集成：针对 Chrome/Safari/Word/Excel 优化",
            "流式输出：自然打字效果",
            "优先技术支持",
          ],
        },
      },
    },

    // 行动召唤
    cta: {
      phrases: ["Flow", "智能语音 AI", "语音即输入", "新一代 AI 语音输入"],
      subtitle: "下载 Linso，用 AI 让生活井井有条。",
      button: "免费下载",
    },

    // 页脚
    footer: {
      company: "OCTO AI PTE. LTD.",
      copyright: "© 2025 Linso. 保留所有权利。",
      terms: "服务条款",
      privacy: "隐私政策",
    },
  },
} as const;

export type TranslationKeys = typeof translations.en;
