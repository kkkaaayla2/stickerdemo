"use client";

import React, { forwardRef } from "react";
import { OptionConfig } from "@/lib/types";
import { TearableSticker } from "./TearableSticker";

interface Props {
  red: number;
  blue: number;
  options: OptionConfig;
  onDropAt: (
    side: "red" | "blue",
    e: { clientX: number; clientY: number },
  ) => boolean;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

/**
 * 底部贴纸盒（PRD 5.2.1）
 * 红 × N + 蓝 × N，N = 对象数
 */
export const StickerBox = forwardRef<HTMLDivElement, Props>(function StickerBox(
  { red, blue, options, onDropAt, onDragStart, onDragEnd },
  ref,
) {
  return (
    <div ref={ref} className="px-4 pb-3">
      <div
        className="rounded-2xl px-4 pt-3 pb-3 relative"
        style={{
          background:
            "linear-gradient(180deg, #FFF8F2 0%, #FFEFE0 100%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.9), 0 2px 6px rgba(120,80,40,0.08)",
        }}
      >
        {/* 顶部撕纸条带 */}
        <div
          className="absolute -top-[6px] left-3 right-3 h-[8px]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 4px 8px, #FFF8F2 4px, transparent 4.4px)",
            backgroundSize: "8px 8px",
          }}
        />
        <div className="mb-2 text-[12.5px] text-ink2 font-medium">
          <span className="font-bold text-ink">贴纸盒</span>
          <span className="ml-1.5 text-ink3">按住撕下，拖到对象上</span>
        </div>
        <div className="flex items-center justify-around py-1">
          <TearableSticker
            side="red"
            label={options.red}
            count={red}
            onDrop={(e) => onDropAt("red", e)}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          />
          <div className="h-12 w-px bg-ink5" />
          <TearableSticker
            side="blue"
            label={options.blue}
            count={blue}
            onDrop={(e) => onDropAt("blue", e)}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          />
        </div>
      </div>
    </div>
  );
});
