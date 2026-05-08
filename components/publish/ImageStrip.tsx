"use client";

import React from "react";
import { Plus } from "../icons";
import { useDraftStore } from "@/lib/store";
import { ComparisonThumb } from "./ComparisonThumb";

/**
 * 顶部图片栏：
 * - 左侧：原有的"新天地这几家餐厅能吃吗"占位图（原图保留）
 * - 中间：横评模式完成后插入的横评图
 * - 右侧："+" 添加按钮
 */
export function ImageStrip() {
  const { hasComparison } = useDraftStore();
  return (
    <div className="px-4 pt-2">
      <div className="flex gap-2">
        <BaseCover />
        {hasComparison && (
          <div className="animate-floatIn">
            <ComparisonThumb />
          </div>
        )}
        <AddBox />
      </div>
    </div>
  );
}

function BaseCover() {
  const { noteTitle } = useDraftStore();
  return (
    <div className="h-[105px] w-[80px] rounded-md overflow-hidden bg-coverMint flex items-center justify-center text-[10px] leading-[13px] text-ink/85 px-1.5 text-center font-medium">
      {noteTitle.trim() ? (
        <span className="line-clamp-3">{noteTitle}</span>
      ) : (
        <span className="text-ink3 text-[9px]">添加标题</span>
      )}
    </div>
  );
}

function AddBox() {
  return (
    <div className="h-[105px] w-[80px] rounded-md bg-[#F2F2F4] flex items-center justify-center text-ink3">
      <Plus />
    </div>
  );
}
