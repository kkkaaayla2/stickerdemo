"use client";

import { useDraftStore } from "@/lib/store";
import { gridLayoutFor } from "@/components/note/ComparisonWall/layout";

/**
 * 横评图缩略图（图片栏中显示的那张系统生成图）
 */
export function ComparisonThumb() {
  const { question, objects } = useDraftStore();
  const valid = objects.filter((o) => o.name.trim().length > 0);
  const layout = gridLayoutFor(Math.max(2, valid.length));
  return (
    <div className="h-[105px] w-[80px] rounded-md overflow-hidden bg-white relative border border-ink5">
      <div className="px-1.5 pt-1.5 text-[7px] leading-[8px] text-ink/85 font-semibold line-clamp-2">
        {question || "已落地上海，求锐评新天地餐厅"}
      </div>
      <div
        className="grid gap-[2px] p-1"
        style={{
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        {layout.map((cell, i) => {
          const obj = valid[i];
          if (!obj) return null;
          return (
            <div
              key={obj.id}
              className="bg-coverMint/70 rounded-[3px] flex items-center justify-center text-[6.5px] text-ink/80 font-medium"
              style={{
                gridColumn: cell.colSpan === 2 ? "1 / span 2" : undefined,
                aspectRatio: "1.4 / 1",
              }}
            >
              {obj.name.slice(0, 6) || `对象${i + 1}`}
            </div>
          );
        })}
      </div>
      <div className="absolute bottom-1 right-1 text-[6px] bg-black/55 text-white rounded px-1 py-[1px]">
        横评
      </div>
    </div>
  );
}
