"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Share, Heart, Star, Comment } from "../icons";
import { ComparisonWall } from "./ComparisonWall";
import { NoteBody } from "./NoteBody";
import { CommentsSection } from "./CommentsSection";
import { initMyStickers, useWallStore } from "@/lib/store";

interface Props {
  isAuthor?: boolean;
}

/**
 * 笔记浏览页：
 * 顶部导航 → 图片轮播（封面 + 横评图）→ 信息条 + 贴纸盒 → 底部操作栏
 */
export function NoteScreen({ isAuthor }: Props) {
  const router = useRouter();
  const { wall } = useWallStore();

  useEffect(() => {
    const ms = useWallStore.getState().myStickers;
    if (ms.red === 0 && ms.blue === 0) {
      initMyStickers(wall.objects.length);
    }
  }, [wall.objects.length]);

  return (
    <div className="relative h-full w-full flex flex-col bg-white text-ink overflow-hidden no-bounce">
      {/* 顶部导航 */}
      <TopBar
        onBack={() => router.push("/publish")}
        showFollow={!isAuthor}
      />

      {/* 中间主体（可垂直滚动）*/}
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain pb-[56px] no-scrollbar">
        <ComparisonWall />
        <NoteBody question={wall.noteTitle || wall.question} />
        <CommentsSection />
      </div>

      {/* 底部操作条 */}
      <ActionBar />
    </div>
  );
}

function TopBar({
  onBack,
  showFollow,
}: {
  onBack: () => void;
  showFollow: boolean;
}) {
  return (
    <div className="relative z-30 px-3 h-12 shrink-0 flex items-center bg-white">
      {/* 左侧：返回 + 头像 + 名字 紧贴 */}
      <button onClick={onBack} className="p-1.5 -ml-1.5 text-ink shrink-0">
        <ChevronLeft />
      </button>
      <div className="flex items-center gap-2 ml-1.5 min-w-0">
        <Avatar />
        <span className="text-[14.5px] font-medium text-ink whitespace-nowrap">
          赵梓涵
        </span>
      </div>

      {/* 右侧：关注按钮 + 分享 */}
      <div className="ml-auto flex items-center gap-2.5 shrink-0">
        {showFollow && (
          <button className="px-3 h-7 rounded-full border border-xhsRed text-xhsRed text-[13px] font-medium active:bg-xhsRed/5">
            关注
          </button>
        )}
        <button className="p-1 text-ink">
          <Share />
        </button>
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#FFC1CC] to-[#FFE4E1] border border-white shadow-sm flex items-center justify-center text-[10px] font-bold text-white shrink-0">
      头
    </div>
  );
}

function ActionBar() {
  return (
    <div className="absolute inset-x-0 bottom-0 z-30 h-[56px] pb-[6px] px-3 flex items-center gap-2.5 bg-white/95 backdrop-blur border-t border-ink5/60">
      <div className="flex-1 h-9 rounded-full bg-ink5/80 px-3 text-[13px] text-ink3 flex items-center">
        说点什么...
      </div>
      <ActionItem icon={<Heart className="text-ink2" />} count={24} />
      <ActionItem icon={<Star className="text-ink2" />} count={7} />
      <ActionItem icon={<Comment className="text-ink2" />} count={30} />
    </div>
  );
}

function ActionItem({
  icon,
  count,
}: {
  icon: React.ReactNode;
  count: number;
}) {
  return (
    <button className="flex items-center gap-1 text-ink2 active:opacity-70">
      {icon}
      <span className="text-[13px] font-medium tabular-nums">{count}</span>
    </button>
  );
}
