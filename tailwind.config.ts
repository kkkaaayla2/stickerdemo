import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 小红书品牌色
        xhsRed: "#FF2442",
        xhsRedLight: "#FFE8EC",
        xhsRedSoft: "#FFCCD3",
        // 横评墙红蓝固定色（对齐小红书品牌色）
        wallRed: "#FF2442",
        wallRedDeep: "#CC1A33",
        wallBlue: "#3D7FFF",
        wallBlueDeep: "#2A60CC",
        // 中性色（设计系统）
        ink: "#333333",
        ink2: "#666666",
        ink3: "#999999",
        ink4: "#CCCCCC",
        ink5: "#F5F5F5",
        // 笔记封面（图4 青色）
        coverMint: "#C8EFE2",
      },
      fontFamily: {
        sans: [
          "PingFang SC",
          "Hiragino Sans GB",
          "Microsoft YaHei",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      boxShadow: {
        sticker: "0 2px 4px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.10)",
        stickerLift:
          "0 8px 16px rgba(0,0,0,0.25), 0 16px 32px rgba(0,0,0,0.18)",
        sheet: "0 -4px 24px rgba(0,0,0,0.08)",
      },
      keyframes: {
        shimmer: {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "0.85" },
        },
        sweep: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(150%)" },
        },
        breathe: {
          "0%, 100%": {
            transform: "scale(1)",
            filter: "drop-shadow(0 0 0 rgba(255,228,0,0))",
          },
          "50%": {
            transform: "scale(1.06)",
            filter: "drop-shadow(0 0 8px rgba(255,228,0,0.95))",
          },
        },
        floatIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.6s ease-in-out infinite",
        sweep: "sweep 2.4s ease-in-out infinite",
        breathe: "breathe 1.6s ease-in-out infinite",
        floatIn: "floatIn 0.4s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
