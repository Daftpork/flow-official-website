"use client";

import React, { useEffect, useRef, useState } from "react";
import UnicornStudio from "@/lib/unicorn-studio";

const HeroBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // 使用 ref 追踪初始化状态，防止 React 严格模式下的双重渲染
  const isInitialized = useRef(false);

  useEffect(() => {
    // 如果已经初始化过，直接跳过
    if (isInitialized.current || !containerRef.current) return;

    const initUnicorn = async () => {
      try {
        await UnicornStudio.init({
          target: containerRef.current!,
          filePath: "/data/unicornstudio_hero_remix.json",
          fps: 60,
          scale: 1,
          dpi: 1.5,
          interactivity: true,
          production: true,
          lazyLoad: false,
          onLoaded: () => {
            setIsLoaded(true);
          },
        });

        isInitialized.current = true;
      } catch (err) {
        console.error("Unicorn Studio failed to load:", err);
        // 即使加载失败也显示背景区域
        setIsLoaded(true);
      }
    };

    initUnicorn();

    // Cleanup: 组件卸载时销毁实例
    return () => {
      UnicornStudio.destroy();
      isInitialized.current = false;
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black pointer-events-none">
      {/* 这一层 div 用于承载 canvas */}
      <div
        ref={containerRef}
        className={`w-full h-full transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};

// 使用 React.memo 包裹组件，防止不必要的重渲染
export default React.memo(HeroBackground);
