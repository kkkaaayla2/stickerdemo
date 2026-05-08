"use client";

import { useEffect, useRef, useState } from "react";
import { ObjectGridHandle } from "./ObjectGrid";
import { StickerBox } from "./StickerBox";
import { WallStage } from "./WallStage";
import { useWallStore } from "@/lib/store";
import { OptionSide, VoteRecord } from "@/lib/types";
import { NoteCover } from "../NoteCover";
import { ImagePager } from "../ImagePager";

/**
 * 横评墙容器：
 * - 上半部分：图片轮播（封面 / 横评图）固定 4:3 比例
 * - 下半部分：信息条 + 贴纸盒（始终可见，便于撕拽到第二页的目标格）
 */

export function ComparisonWall() {
  const { wall, myStickers, highlightVoteId, vote, moveVote, recallVote, unlock } =
    useWallStore();
  const gridRef = useRef<ObjectGridHandle>(null);
  const stickerBoxRef = useRef<HTMLDivElement>(null);
  const [hoverObj, setHoverObj] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [isDraggingSticker, setIsDraggingSticker] = useState(false);
  // 封面图/正文标题用笔记标题（1/3/5/6 联动）
  const coverTitle = wall.noteTitle || wall.question;

  // 只在真正拖着贴纸时才做 hit test，避免普通滑动触发"松开贴上"
  const handlePointerMove = (e: React.PointerEvent) => {
    if (page !== 1 || !isDraggingSticker) return;
    const id = gridRef.current?.hitTest(e.clientX, e.clientY) ?? null;
    if (id !== hoverObj) setHoverObj(id);
  };

  const handleDrop = (
    side: OptionSide,
    p: { clientX: number; clientY: number },
  ): boolean => {
    setHoverObj(null);
    // 落点不在第二页内（横评图）则视为无效
    if (page !== 1) return false;
    const objId = gridRef.current?.hitTest(p.clientX, p.clientY) ?? null;
    if (!objId) return false;
    const rect = gridRef.current?.getRect(objId);
    if (!rect) return false;
    const x = (p.clientX - rect.left) / rect.width;
    const y = (p.clientY - rect.top) / rect.height;
    vote(objId, side, {
      x: clamp(x, 0.22, 0.78),
      y: clamp(y, 0.22, 0.78),
      rotation: -18 + Math.random() * 36,
    });
    return true;
  };

  // 切回封面页时清掉悬停
  useEffect(() => {
    if (page !== 1) setHoverObj(null);
  }, [page]);

  /**
   * 已投出贴纸被拖动并松手：
   * 1) 落点在某个 cell 内 → 移动到该 cell 的对应坐标
   * 2) 落点在贴纸盒内    → 收回（归还库存）
   * 3) 都不是             → 不处理（贴纸自动回到原位）
   */
  const handleSelfDrag = (
    v: VoteRecord,
    p: { x: number; y: number },
  ) => {
    const objId = gridRef.current?.hitTest(p.x, p.y) ?? null;
    if (objId) {
      const rect = gridRef.current?.getRect(objId);
      if (!rect) return;
      const nx = clamp((p.x - rect.left) / rect.width, 0.22, 0.78);
      const ny = clamp((p.y - rect.top) / rect.height, 0.22, 0.78);
      moveVote(v.id, objId, { x: nx, y: ny });
      return;
    }
    const sb = stickerBoxRef.current;
    if (sb) {
      const r = sb.getBoundingClientRect();
      if (
        p.x >= r.left &&
        p.x <= r.right &&
        p.y >= r.top &&
        p.y <= r.bottom
      ) {
        recallVote(v.id);
      }
    }
  };

  return (
    <div className="flex flex-col" onPointerMove={handlePointerMove}>
      {/* 图片轮播 */}
      <ImagePager
        pages={[
          <NoteCover key="cover" question={coverTitle} />,
          <WallStage
            key="stage"
            question={wall.question}
            objects={wall.objects}
            options={wall.options}
            votes={wall.votes}
            unlocked={wall.unlocked}
            hoverObjId={hoverObj}
            highlightVoteId={highlightVoteId}
            gridRef={gridRef}
            onSelfDrag={handleSelfDrag}
          />,
        ]}
        onPageChange={setPage}
      />

      {/* 固定高度信息条：两页均占同等高度，贴纸盒位置不随页切换位移 */}
      <div className="px-4 h-[32px] flex items-center">
        {page === 0 && (
          <div className="w-full text-[11px] text-ink3 text-center">
            ← 左滑查看横评墙
          </div>
        )}
        {page === 1 && (
          <div className="w-full flex items-center justify-between text-[12px]">
            <span className="text-ink2">
              <span className="font-semibold text-ink">{wall.participants}</span>
              <span className="text-ink3"> 人已参与</span>
            </span>
            <div className="flex items-center gap-3">
              {!wall.unlocked && (
                <button
                  onClick={unlock}
                  className="text-xhsRed font-semibold active:opacity-80"
                >
                  查看结果
                </button>
              )}
              {wall.unlocked && (
                <span className="text-ink3">
                  已投出{" "}
                  <span className="text-ink font-semibold tabular-nums">
                    {wall.votes.filter((v) => v.isMe).length}
                  </span>{" "}
                  张
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 贴纸盒 */}
      <div className="mt-2">
        <StickerBox
          ref={stickerBoxRef}
          red={myStickers.red}
          blue={myStickers.blue}
          options={wall.options}
          onDropAt={handleDrop}
          onDragStart={() => setIsDraggingSticker(true)}
          onDragEnd={() => { setIsDraggingSticker(false); setHoverObj(null); }}
        />
      </div>
    </div>
  );
}

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}
