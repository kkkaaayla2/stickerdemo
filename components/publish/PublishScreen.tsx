"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Mic } from "../icons";
import { ImageStrip } from "./ImageStrip";
import { ChipBar } from "./ChipBar";
import { BottomBar } from "./BottomBar";
import { VoteSheet } from "./VoteSheet";
import {
  buildWallFromDraft,
  initMyStickers,
  useDraftStore,
  useWallStore,
} from "@/lib/store";

export function PublishScreen() {
  const router = useRouter();
  const [sheetOpen, setSheetOpen] = useState(false);
  const { hasComparison, noteTitle, setNoteTitle } = useDraftStore();

  const onPublish = () => {
    if (hasComparison) {
      const wall = buildWallFromDraft();
      // 保留 buildWallFromDraft 里的预设票数和参与人数
      useWallStore.setState({
        wall,
        myStickers: { red: wall.objects.length, blue: wall.objects.length },
        highlightVoteId: null,
      });
      router.push(`/note/${wall.id}`);
    } else {
      // 没创建横评，直接进入预置的演示笔记
      const n = useWallStore.getState().wall.objects.length;
      initMyStickers(n);
      router.push("/note/wall-demo");
    }
  };

  return (
    <div className="relative h-full w-full bg-white text-ink overflow-hidden">
      {/* 顶部固定栏：渐变蒙层 + 返回键，滚动时盖住下方内容 */}
      <div
        className="absolute inset-x-0 top-0 z-20 h-12 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.92) 60%, rgba(255,255,255,0) 100%)",
        }}
      />
      <button className="absolute top-2 left-2 p-2 z-30 text-ink pointer-events-auto">
        <ChevronLeft />
      </button>

      <div className="h-full overflow-y-auto pb-[calc(env(safe-area-inset-bottom)+96px)] no-scrollbar">
        <div className="h-12" />
        <ImageStrip />

        {/* 标题与正文 */}
        <div className="px-4 mt-5">
          <input
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            placeholder="添加标题"
            className="w-full bg-transparent text-[19px] font-semibold text-ink placeholder:text-ink3 outline-none"
          />
          <div className="mt-3 flex items-center gap-2 text-[15px] text-ink3">
            <span>展开说说</span>
            <Mic className="text-ink3" />
          </div>
        </div>

        <div className="h-[120px]" />

        <ChipBar onClickVote={() => setSheetOpen(true)} />

        <BottomBar onPublish={onPublish} />
      </div>

      <VoteSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        afterCommit={() => {
          // 横评模式提交完成 → 关闭抽屉，回到发布界面（多了 投票·2个选项 标签）
          setSheetOpen(false);
        }}
      />
    </div>
  );
}
