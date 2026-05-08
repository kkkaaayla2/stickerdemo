"use client";

import React from "react";
import {
  ComparisonObject,
  OptionConfig,
  VoteRecord,
} from "@/lib/types";
import { ObjectGrid, ObjectGridHandle } from "./ObjectGrid";
interface Props {
  question: string;
  objects: ComparisonObject[];
  options: OptionConfig;
  votes: VoteRecord[];
  unlocked: boolean;
  hoverObjId: string | null;
  highlightVoteId: string | null;
  gridRef: React.Ref<ObjectGridHandle>;
  onSelfDrag?: (vote: VoteRecord, p: { x: number; y: number }) => void;
}

/**
 * 横评墙第二页（横评图）：
 * 题目卡片 + 2 列对象网格
 */
export function WallStage({
  question,
  objects,
  options,
  votes,
  unlocked,
  hoverObjId,
  highlightVoteId,
  gridRef,
  onSelfDrag,
}: Props) {
  return (
    <div className="absolute inset-0 bg-white px-3 pt-2.5 pb-2.5 flex flex-col">
      {/* 题目卡片 */}
      <div className="rounded-xl bg-white border border-ink5 px-3 py-1.5 mb-2 shrink-0 flex items-center gap-2">
        <span
          className="px-2 py-[3px] text-[11px] font-bold text-white rounded-md shrink-0"
          style={{ background: "#FF2442" }}
        >
          横评墙
        </span>
        <div className="text-[14px] font-semibold text-ink leading-[20px] truncate">
          {question}
        </div>
      </div>

      {/* 网格区域 */}
      <div className="relative flex-1 min-h-0">
        <ObjectGrid
          ref={gridRef}
          objects={objects}
          options={options}
          votes={votes}
          unlocked={unlocked}
          hoverObjId={hoverObjId}
          highlightVoteId={highlightVoteId}
          onSelfDrag={onSelfDrag}
        />
      </div>
    </div>
  );
}
