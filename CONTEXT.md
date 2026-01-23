# Linso Flow - Design System Context

## 1. Visual Aesthetic (视觉基调)
- **Theme:** Ultra-modern Dark Mode. Sleek, minimalist, high-contrast.
- **Backgrounds:** Deep black (`bg-black` / #000000).

## 2. Design Tokens & Color Mapping (设计变量映射)
> **CRITICAL RULE:** Use Tailwind CSS (Zinc Palette). Do not use magic hex codes.

### A. Text Colors (文字颜色)
- **Primary (Headings/High-Priority Body):**
  - Source: `#FFFFFF`
  - Token: `text-white`
- **Secondary (Standard Body/Subtitles):**
  - Source: `#B4B4B4`
  - Token: `text-zinc-400`
- **Tertiary (Captions/Meta):**
  - Token: `text-zinc-500`

### B. Borders & Dividers (边框与分割线)
- **Global Border Rule:** `border-white/15` (White at 15% opacity).
- **Usage:** Apply this to all Cards, Separators, and Floating UI borders.

## 3. Typography (排版)
- **Font Family:** Inter (or SF Pro Display) - Clean, sans-serif.
- **Hierarchy (Text Styles):**

  ### Headings (标题层级)
  - **H1 (Hero Title):**
    - Size: ~64px-80px
    - Weight: `font-semibold`
    - Color: `text-white`
  
  - **H2 (Section Title):**
    - Size: ~56px
    - Weight: `font-semibold`
    - Color: `text-white`

  - **H3 (Card/Feature Title):**
    - Size: ~28px
    - Weight: `font-semibold`
    - Note: Used for "Traditional Input" / "Linso Flow" / "Global Floating Window" titles.

  ### Subtitles & Body (副标题与正文 - Context Dependent)
  
  - **Hero Subtitle:** (Text directly under Hero H1)
    - Size: ~28px
    - Color: `text-white`
    - Weight: `font-medium`

  - **Section Subtitle:** (e.g., "Traditional Typing..." line)
    - Size: ~16px
    - Style: Often directly under H2.
    - Color: `text-zinc-400`.
    - Weight: `font-normal`

  - **Body Level 1 (High Emphasis):**
    - **Usage:** Highlighted Cards (Pro Plan), "Linso Flow" Comparison Column.
    - Color: `text-white`
    - Size: 16px.
    - Weight: `font-normal`

  - **Body Level 2 (Standard):**
    - **Usage:** Feature descriptions, Workflow steps, "Traditional Input" list.
    - Color: `text-zinc-400`
    - Size: 16px.
    - Weight: `font-normal`

  - **Caption / Meta:** (e.g., "Write a thank you email")
    - Size: 13px - 14px
    - Color: `text-zinc-500`
    - Style: Italic.

## 4. UI Component Specs (组件微规范)

### A. Primary Button (The "Download" CTA)
- Shape: Pill/Capsule (Rounded-full).
- Color: Solid White (`bg-white`) background, Black text.
- **Interaction:** On hover, the text performs a vertical flip animation (the original text slides up and out, while a duplicate text slides up from below to take its place). The background color remains stable or changes negligibly.

### B. Sticky Section (Workflow)
- Behavior: Left content scrolls, Right image sticks/fades.
- Transition: Smooth opacity and y-axis movement using Framer Motion.

## 5. Layout & Spacing
- **Container:** Max-width 1040px, centered.
- **Section Spacing:** Generous breathing room (approx 180px between major sections).
- **Internal Layout:** Use Flexbox for component interiors.

## 5. Layout & Spacing (布局与间距)
- **Container:** Max-width 1040px, centered.
- **Section Spacing (Macro):** - `gap-45` (180px) between major sections (e.g., Hero -> Efficiency -> Features).
  
- **Micro-Spacing Rhythm (Use standard Tailwind classes):**
  - **Component Internals (Tight):** `gap-2` (8px).
    - Usage: Space between illustrations and text, or H3 title and Body text inside a card.
  - **Element Grouping (Medium):** `gap-4` (16px).
    - Usage: Space between Section Title and Subtitle/Pill.
  - **Module Separation (Large):** `gap-12` (48px).
    - Usage: Space between Section Header (Title group) and the Content (Grid/Cards) below it.

## 6. Tech Stack & Guidelines
- **Framework:** Next.js 14 (App Router).
- **Styling:** Tailwind CSS.
- **Animation:** Framer Motion (Required for all interactions).
- **Icons:** Lucide React.