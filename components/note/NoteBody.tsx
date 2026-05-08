"use client";

import { Dislike } from "../icons";

/**
 * 笔记正文区（横评墙下方继续下滑可看）
 * 题目（=问题）/ 正文 / 话题 tag / 日期与不喜欢按钮
 */
export function NoteBody({ question }: { question: string }) {
  return (
    <div className="px-4 pt-3">
      <div className="text-[17px] font-semibold leading-[24px] text-ink">
        {question}
      </div>

      {/* 日期 / 地点 / 不喜欢 */}
      <div className="mt-3 pb-3 flex items-center justify-between text-[12px] text-ink3">
        <span>05-08 上海</span>
        <button className="flex items-center gap-1 px-1 -mr-1 text-ink3 active:opacity-70">
          <Dislike className="text-ink3" />
          <span>不喜欢</span>
        </button>
      </div>
    </div>
  );
}
