"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { Sticker } from "./Sticker";
import { OptionSide } from "@/lib/types";
import { tap, tear, stick } from "@/lib/haptics";

interface Props {
  side: OptionSide;
  label: string;
  count: number;
  /** 拖拽落下回调，返回 true=命中区域，false=回弹 */
  onDrop: (e: { clientX: number; clientY: number }) => boolean;
}

/**
 * 可撕拽贴纸：
 * - 长按 180ms 视觉抬起 + 震动（"撕下"反馈）
 * - 也允许直接拖拽（更响应）
 * - 拖动 → 整张飞行；松手 → 调用 onDrop 判断落点
 */
export function TearableSticker({ side, label, count, onDrop }: Props) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [picked, setPicked] = useState(false);
  const longPressRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const armPick = () => {
    if (picked) return;
    setPicked(true);
    tear();
  };

  return (
    <div className="relative w-[64px] h-[64px] flex items-center justify-center">
      {/* 计数徽标 */}
      {count > 0 && (
        <div className="absolute -top-1 -right-1 z-30 min-w-[20px] h-[20px] px-1 rounded-full bg-white text-[10px] font-bold text-ink shadow-md flex items-center justify-center tabular-nums border border-ink5">
          ×{count}
        </div>
      )}

      {/* 静态底层（贴纸盒里那张静止的） */}
      <div className={count <= 0 ? "opacity-25 grayscale" : ""}>
        <Sticker side={side} label={label} size={56} />
      </div>

      {/* 顶层可拖拽 */}
      {count > 0 && (
        <motion.div
          drag
          dragMomentum={false}
          dragElastic={0}
          style={{
            x,
            y,
            position: "absolute",
            zIndex: 60,
            cursor: picked ? "grabbing" : "grab",
            touchAction: "none",
          }}
          animate={
            picked
              ? { scale: 1.18, rotate: side === "red" ? -8 : 8 }
              : { scale: 1, rotate: 0 }
          }
          transition={{ type: "spring", damping: 18, stiffness: 360 }}
          onPointerDown={() => {
            if (longPressRef.current) clearTimeout(longPressRef.current);
            longPressRef.current = setTimeout(armPick, 180);
          }}
          onPointerUp={() => {
            if (longPressRef.current) clearTimeout(longPressRef.current);
            if (!picked) tap(8);
          }}
          onDragStart={() => {
            if (longPressRef.current) clearTimeout(longPressRef.current);
            armPick();
          }}
          onDragEnd={(_, info) => {
            const ok = onDrop({
              clientX: info.point.x,
              clientY: info.point.y,
            });
            if (ok) stick();
            else tap(10);
            x.set(0);
            y.set(0);
            setPicked(false);
          }}
        >
          <Sticker
            side={side}
            label={label}
            size={56}
            className={
              picked ? "drop-shadow-[0_10px_18px_rgba(0,0,0,0.35)]" : ""
            }
          />
        </motion.div>
      )}
    </div>
  );
}
