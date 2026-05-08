"use client";

import React from "react";
import { OptionSide } from "@/lib/types";

/**
 * 贴纸（圆角矩形 / 软方块）：
 * - 浅色"纸基"外层 + 渐变主体
 * - 装饰椭圆环 + 散落星点 + 小符号
 * - 底部白色挂条
 * - 支持 1-3 字自适应字号
 *
 * viewBox: 100 × 92（接近 1:0.92，圆角软方块）
 */

interface Props {
  side: OptionSide;
  label: string;
  size?: number; // 容器宽度，高度 = size * 0.92
  rotation?: number;
  highlight?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Sticker = React.forwardRef<HTMLDivElement, Props>(function Sticker(
  { side, label, size = 56, rotation = 0, highlight, className, style },
  ref,
) {
  const isRed = side === "red";
  const showDeco = size >= 38; // 大尺寸才显示装饰与底部挂条

  const text = (label || "").slice(0, 3) || (isRed ? "夯" : "拉");
  const len = text.length;
  const fontSize =
    size * (len === 1 ? 0.56 : len === 2 ? 0.36 : 0.26);
  const tracking =
    len === 1 ? "0.02em" : len === 2 ? "-0.02em" : "-0.06em";

  // 红：基于 #FF2442 柔化，降低饱和度、提亮
  // 蓝：基于用户指定参考色 #3D7FFF 柔化
  const colors = isRed
    ? {
        paper: "#FFF0F2",
        bodyTop: "#FF8898",
        bodyMid: "#F53354",
        bodyDark: "#CC2244",
      }
    : {
        paper: "#EBF2FF",
        bodyTop: "#7AAEFF",
        bodyMid: "#3D7FFF",
        bodyDark: "#2A60CC",
      };

  const gradId = React.useId();

  return (
    <div
      ref={ref}
      className={["relative select-none", className ?? ""].join(" ")}
      style={{
        width: size,
        height: size * 0.92,
        ...style,
      }}
    >
      {/* 旋转层 */}
      <div
        className="relative w-full h-full"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <svg
          viewBox="0 0 100 92"
          className="absolute inset-0 w-full h-full drop-shadow-[0_2px_5px_rgba(0,0,0,0.18)]"
          preserveAspectRatio="none"
        >
          <defs>
            <radialGradient
              id={`bg-${gradId}`}
              cx="34%"
              cy="28%"
              r="85%"
            >
              <stop offset="0%" stopColor={colors.bodyTop} />
              <stop offset="55%" stopColor={colors.bodyMid} />
              <stop offset="100%" stopColor={colors.bodyDark} />
            </radialGradient>
          </defs>

          {/* 浅色外层（纸基） */}
          <rect
            x="1"
            y="1"
            width="98"
            height="90"
            rx="22"
            ry="22"
            fill={colors.paper}
          />

          {/* 主体彩色 */}
          <rect
            x="5"
            y="5"
            width="90"
            height="82"
            rx="18"
            ry="18"
            fill={`url(#bg-${gradId})`}
          />

          {/* 顶部白色高光 */}
          <ellipse
            cx="40"
            cy="18"
            rx="22"
            ry="8"
            fill="rgba(255,255,255,0.22)"
          />

          {showDeco && (
            <>
              {/* 装饰椭圆环（轨道） */}
              <ellipse
                cx="50"
                cy="50"
                rx="40"
                ry="10"
                fill="none"
                stroke="rgba(255,255,255,0.42)"
                strokeWidth="1.4"
                transform="rotate(-12 50 50)"
              />
              {/* 散落小亮点 */}
              <circle cx="22" cy="16" r="1.6" fill="white" opacity="0.95" />
              <circle cx="78" cy="34" r="1.2" fill="white" opacity="0.75" />
              <circle cx="68" cy="68" r="1.4" fill="white" opacity="0.85" />
              <circle cx="28" cy="68" r="1.0" fill="white" opacity="0.65" />
              <circle cx="14" cy="54" r="0.9" fill="white" opacity="0.6" />
              {/* 椭圆环上的小符号 */}
              {isRed ? (
                <text
                  x="86"
                  y="52"
                  fontSize="6"
                  fill="white"
                  opacity="0.9"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  ✦
                </text>
              ) : (
                <>
                  <text
                    x="84"
                    y="54"
                    fontSize="5.5"
                    fill="white"
                    opacity="0.8"
                    textAnchor="middle"
                    fontWeight="bold"
                  >
                    ×
                  </text>
                  <text
                    x="38"
                    y="58"
                    fontSize="5"
                    fill="white"
                    opacity="0.65"
                    textAnchor="middle"
                    fontWeight="bold"
                  >
                    ⌁
                  </text>
                </>
              )}
            </>
          )}
        </svg>

        {/* 文字（HTML 渲染，完整居中覆盖整个贴纸主体） */}
        <div
          className="absolute inset-0 flex items-center justify-center font-extrabold text-white pointer-events-none"
          style={{
            fontSize: `${fontSize}px`,
            letterSpacing: tracking,
            lineHeight: 1,
            textShadow:
              "0 1px 2px rgba(0,0,0,0.22), 0 0 1px rgba(0,0,0,0.18)",
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
});
