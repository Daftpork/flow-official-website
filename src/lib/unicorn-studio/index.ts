/**
 * Unicorn Studio SDK Wrapper
 * 包装 CDN 加载的 Unicorn Studio SDK
 */

interface UnicornInitOptions {
  target: HTMLElement;
  filePath: string;
  fps?: number;
  scale?: number;
  dpi?: number;
  interactivity?: boolean;
  lazyLoad?: boolean;
  production?: boolean;
  onLoaded?: () => void;
}

interface UnicornSDK {
  addScene: (options: {
    elementId?: string;
    element?: HTMLElement;
    fps?: number;
    scale?: number;
    dpi?: number;
    production?: boolean;
    interactivity?: boolean;
    lazyLoad?: boolean;
    filePath?: string;
    projectId?: string;
  }) => Promise<{ destroy: () => void }>;
  destroy: () => void;
}

// 扩展 Window 类型
declare global {
  interface Window {
    UnicornStudio?: UnicornSDK;
  }
}

// 全局状态
let sdk: UnicornSDK | null = null;
let loadPromise: Promise<UnicornSDK> | null = null;
let currentScene: { destroy: () => void } | null = null;

// 加载 SDK
const loadSDK = (): Promise<UnicornSDK> => {
  if (sdk) return Promise.resolve(sdk);
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("UnicornStudio can only be used in browser"));
      return;
    }

    // 检查是否已加载
    if (window.UnicornStudio) {
      sdk = window.UnicornStudio;
      resolve(sdk);
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.0.2/dist/unicornStudio.umd.js";
    script.async = true;

    script.onload = () => {
      sdk = window.UnicornStudio || null;
      if (sdk) {
        resolve(sdk);
      } else {
        reject(new Error("UnicornStudio SDK not found after load"));
      }
    };

    script.onerror = () => {
      reject(new Error("Failed to load UnicornStudio SDK"));
    };

    document.head.appendChild(script);
  });

  return loadPromise;
};

// 初始化场景
const init = async (options: UnicornInitOptions): Promise<void> => {
  const unicorn = await loadSDK();

  const {
    target,
    filePath,
    fps = 60,
    scale = 1,
    dpi = 1.5,
    interactivity = true,
    lazyLoad = false,
    production = true,
    onLoaded,
  } = options;

  // 为 target 元素设置唯一 ID
  const elementId = target.id || `unicorn-${Date.now()}`;
  if (!target.id) {
    target.id = elementId;
  }

  // 创建场景
  currentScene = await unicorn.addScene({
    elementId,
    filePath,
    fps,
    scale,
    dpi,
    production,
    interactivity,
    lazyLoad,
  });

  // 触发加载完成回调
  if (onLoaded) {
    requestAnimationFrame(() => {
      onLoaded();
    });
  }
};

// 销毁场景
const destroy = (): void => {
  if (currentScene) {
    currentScene.destroy();
    currentScene = null;
  }
};

const UnicornStudio = {
  init,
  destroy,
  loadSDK,
};

export default UnicornStudio;
