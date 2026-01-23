import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /**
       * 色彩系统 (Clean Dark Mode)
       */
      colors: {
        // 页面背景 - 纯黑
        page: "#000000",
        
        // 文字系统 (Zinc Palette Mapping)
        text: {
          primary: "#FFFFFF", // H1, H2, High-Emphasis Body
          secondary: "#B4B4B4", // Zinc-400 (Body, Subtitles)
          tertiary: "#71717A", // Zinc-500 (Captions)
        },

        // 交互色
        accent: {
          DEFAULT: "#FFFFFF",
          hover: "#F4F4F5", // Zinc-100
        },
      },

      /**
       * 字体系统
       */
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "sans-serif",
        ],
      },

      /**
       * 字号与字重系统
       * 严格对应 CONTEXT.md 的 Hierarchy
       */
      fontSize: {
        // H1 Hero Title (~64px-80px)
        "h1": ["4.5rem", { lineHeight: "1.1", letterSpacing: "0", fontWeight: "600" }],
        
        // H2 Section Title (~56px)
        "h2": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.01em", fontWeight: "600" }],
        
        // H3 Card/Feature Title (~28px) -> Context 指定为 SemiBold
        "h3": ["1.75rem", { lineHeight: "1.2", fontWeight: "600" }],
        
        // Hero Subtitle (~28px) -> Context 指定为 Medium
        "hero-sub": ["1.75rem", { lineHeight: "1.6", fontWeight: "500" }],

        // Body Standard (16px)
        "body": ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
        
        // Caption / Meta (13px - 14px)
        "caption": ["0.875rem", { lineHeight: "1.4" }],
      },

      /**
       * 圆角系统
       */
      borderRadius: {
        "card": "20px", // Context 4.B
        "pill": "9999px", // Context 4.A
      },

      /**
       * 间距系统扩展
       */
      spacing: {
        "45": "11.25rem", // 180px - Context 5 (Section Spacing)
      },

      /**
       * 容器最大宽度
       */
      maxWidth: {
        "container": "1040px", // Context 5
      },
    },
  },
  plugins: [],
};

export default config;