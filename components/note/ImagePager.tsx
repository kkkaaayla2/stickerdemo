"use client";

import React, { useEffect, useRef, useState } from "react";

interface Props {
  pages: React.ReactNode[];
  /** 宽:高比，默认 3:4（竖版，宽 3 高 4） */
  aspectRatio?: string;
  onPageChange?: (i: number) => void;
}

/**
 * 横向图片轮播（笔记图片区）
 * - 容器宽 100%、aspect-ratio 决定高度（默认 3:4，纵向 4 横向 3）
 * - scroll-snap 实现原生顺滑横滑
 * - 右上角"1/N"，底部胶囊圆点指示
 */
export function ImagePager({
  pages,
  aspectRatio = "3 / 4",
  onPageChange,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    onPageChange?.(active);
  }, [active, onPageChange]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el || el.clientWidth === 0) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== active) setActive(i);
  };

  return (
    <div className="relative w-full" style={{ aspectRatio }}>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="absolute inset-0 flex overflow-x-auto no-scrollbar"
        style={{
          scrollSnapType: "x mandatory",
          overscrollBehaviorX: "contain",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {pages.map((p, i) => (
          <div
            key={i}
            className="relative h-full w-full shrink-0"
            style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
          >
            {p}
          </div>
        ))}
      </div>

      {/* 右上角页码 */}
      {pages.length > 1 && (
        <div className="absolute top-3 right-3 z-20 px-2 h-[22px] rounded-full bg-black/45 text-white text-[11px] font-medium tabular-nums flex items-center backdrop-blur-sm">
          {active + 1}/{pages.length}
        </div>
      )}

      {/* 底部小圆点 */}
      {pages.length > 1 && (
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/22 backdrop-blur-sm">
          {pages.map((_, i) => (
            <span
              key={i}
              className={[
                "rounded-full transition-all duration-300",
                i === active
                  ? "w-3.5 h-1.5 bg-white"
                  : "w-1.5 h-1.5 bg-white/65",
              ].join(" ")}
            />
          ))}
        </div>
      )}
    </div>
  );
}
