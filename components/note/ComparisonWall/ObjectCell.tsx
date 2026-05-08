"use client";

import React from "react";
import { ComparisonObject, OptionConfig, VoteRecord } from "@/lib/types";
import { Sticker } from "./Sticker";
import { SparkleField } from "./SparkleField";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";

interface Props {
  obj: ComparisonObject;
  options: OptionConfig;
  votes: VoteRecord[];
  unlocked: boolean;
  isOver: boolean;
  highlightVoteId: string | null;
  forwardRef?: React.Ref<HTMLDivElement>;
  spanFull?: boolean;
  /** 在 4 列网格中的起始列（奇数末位格居中用） */
  colStart?: number;
  /** 自己投出的贴纸被拖动并松手 */
  onSelfDrag?: (vote: VoteRecord, p: { x: number; y: number }) => void;
}

/**
 * 单个对象格子：
 * - 锁定态：深色"星空"底 + 居中对象名 + 闪烁点点动效（SparkleField）
 * - 解锁态：浅色底 + 对象名小标签 + 堆叠贴纸 + 底部夯/拉计数
 * - 解锁瞬间：所有点点向四周飞散并淡出
 */
export function ObjectCell({
  obj,
  options,
  votes,
  unlocked,
  isOver,
  highlightVoteId,
  forwardRef,
  spanFull,
  colStart,
  onSelfDrag,
}: Props) {
  const reds = votes.filter((v) => v.side === "red").length;
  const blues = votes.filter((v) => v.side === "blue").length;

  return (
    <div
      ref={forwardRef}
      data-cell-id={obj.id}
      className={[
        "relative rounded-xl overflow-hidden transition-all duration-500",
        isOver
          ? "ring-2 ring-xhsRed/70 shadow-[0_0_0_4px_rgba(255,36,66,0.18)]"
          : "ring-0",
      ].join(" ")}
      style={{
        gridColumn: colStart ? `${colStart} / span 2` : "span 2",
        background: unlocked
          ? "linear-gradient(135deg, #F1FAF5 0%, #E2F2EA 60%, #D7EDE3 100%)"
          : "#DCF0E2",
        boxShadow:
          "inset 0 0 0 1px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.04)",
        transition: "background 600ms ease-out",
      }}
    >
      {/* 闪烁点点（锁定时持续；解锁时飞散并淡出） */}
      <SparkleField unlocked={unlocked} count={spanFull ? 220 : 150} />

      {/* 磨砂玻璃蒙层（锁定时叠在星点之上，解锁时淡出） */}
      <AnimatePresence>
        {!unlocked && (
          <motion.div
            key="frost"
            className="absolute inset-0 z-10 overflow-hidden pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
            style={{
              backdropFilter: "blur(5px) saturate(1.15)",
              WebkitBackdropFilter: "blur(5px) saturate(1.15)",
              background:
                "linear-gradient(155deg, rgba(255,255,255,0.30) 0%, rgba(220,240,226,0.18) 60%, rgba(255,255,255,0.26) 100%)",
            }}
          >
            {/* 斜向扫光条 */}
            <div
              className="glass-sweep absolute inset-y-0 w-[45%]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.38) 50%, transparent)",
                left: "-45%",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 解锁后的对象名小标签 */}
      <AnimatePresence>
        {unlocked && (
          <motion.div
            key="name-pill"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="absolute top-2 left-2.5 z-20 text-[12.5px] font-semibold text-ink/85 bg-white/85 backdrop-blur px-2 py-0.5 rounded-md"
          >
            {obj.name}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 锁定时的对象名（居中大字 + 白色，叠在星空上） */}
      <AnimatePresence>
        {!unlocked && (
          <motion.div
            key="name-center"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
          >
            <div
              className="text-[26px] font-bold"
              style={{
                color: "rgba(46,123,92,0.82)",
                textShadow:
                  "0 1px 3px rgba(255,255,255,0.7), 0 0 12px rgba(46,123,92,0.25)",
                letterSpacing: "0.02em",
              }}
            >
              {obj.name}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 贴纸堆叠
          外层 div 负责定位（translate 不被 Framer Motion 覆盖），
          内层 motion.div 只做 scale/opacity 入场动画 */}
      <AnimatePresence>
        {unlocked &&
          votes.map((v, i) => (
            <div
              key={v.id}
              style={{
                position: "absolute",
                left: `${v.x * 100}%`,
                top: `${v.y * 100}%`,
                transform: "translate(-50%, -50%)",
                zIndex: v.isMe ? 50 : 5 + i * 0.01,
              }}
            >
              <motion.div
                initial={
                  v.isMe
                    ? { scale: 1.4, opacity: 0 }
                    : { scale: 0.6, opacity: 0 }
                }
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.32,
                  delay: v.isMe ? 0 : 0.4 + Math.min(i * 0.006, 0.5),
                  type: "spring",
                  damping: 14,
                  stiffness: 280,
                }}
              >
                {v.isMe ? (
                  <DraggableSelfSticker
                    vote={v}
                    label={v.side === "red" ? options.red : options.blue}
                    size={spanFull ? 30 : 28}
                    onDragEnd={(p) => onSelfDrag?.(v, p)}
                  />
                ) : (
                  <Sticker
                    side={v.side}
                    label={v.side === "red" ? options.red : options.blue}
                    size={spanFull ? 28 : 26}
                    rotation={v.rotation}
                  />
                )}
              </motion.div>
            </div>
          ))}
      </AnimatePresence>

      {/* 解锁后的计数条 */}
      {unlocked && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="absolute left-2.5 right-2.5 bottom-2 z-30 flex items-center gap-1.5 text-[11px]"
        >
          <CountPill label={options.red} count={reds} side="red" />
          <CountPill label={options.blue} count={blues} side="blue" />
        </motion.div>
      )}

      {/* 拖拽悬停高亮 */}
      {isOver && !unlocked && (
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
          <div className="px-2.5 py-1 rounded-full bg-xhsRed text-white font-semibold text-[12px] shadow-lg">
            松开贴上
          </div>
        </div>
      )}
      {isOver && unlocked && (
        <div className="absolute inset-0 z-40 ring-2 ring-xhsRed/80 rounded-xl pointer-events-none" />
      )}
    </div>
  );
}

function CountPill({
  label,
  count,
  side,
}: {
  label: string;
  count: number;
  side: "red" | "blue";
}) {
  const isRed = side === "red";
  return (
    <div
      className="flex items-center gap-1 px-1.5 h-[18px] rounded-md bg-white/85 backdrop-blur tabular-nums"
      style={{
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
      }}
    >
      <span
        className="inline-block w-2 h-2 rounded-full"
        style={{ background: isRed ? "#F53354" : "#3D7FFF" }}
      />
      <span className={isRed ? "text-wallRed" : "text-wallBlue"}>
        {label}:{count}
      </span>
    </div>
  );
}

/**
 * 自己投出的贴纸（金色徽章方案）：
 * - 立得正，不旋转
 * - 双层金色环（白色内边 + 金色外边 + 暖光辉），与红/蓝贴纸都形成强对比
 * - 顶部金色胶囊"我贴的"+ 星星图标，浮动呼吸
 * - 右上角白底金星徽章，呼吸缩放
 */
function SelfSticker({
  side,
  label,
  size,
}: {
  side: "red" | "blue";
  label: string;
  size: number;
}) {
  return (
    <div className="relative">
      {/* 双层金色辉光环（zIndex 明确低于角标） */}
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-[24px] pointer-events-none"
        style={{
          zIndex: 1,
          boxShadow:
            "0 0 0 2px #fff, 0 0 0 4px #FFB800, 0 4px 14px rgba(255,184,0,0.55), 0 0 22px rgba(255,184,0,0.35)",
        }}
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      />

      <Sticker side={side} label={label} size={size} rotation={0} />

      {/* 右上角白底金星徽章（zIndex 高于金环） */}
      <motion.div
        className="absolute -top-1 -right-1 w-[16px] h-[16px] rounded-full bg-white flex items-center justify-center pointer-events-none"
        style={{
          zIndex: 20,
          boxShadow:
            "0 1px 3px rgba(0,0,0,0.18), 0 0 0 1.5px rgba(255,184,0,0.35)",
        }}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <span
          style={{
            color: "#FF8E2B",
            fontSize: "11px",
            lineHeight: 1,
            fontWeight: 700,
          }}
        >
          ★
        </span>
      </motion.div>
    </div>
  );
}

/**
 * 可拖拽的"我"的贴纸：
 * - 拖动时整张飞行
 * - 松手由上层 onDragEnd 检测落点（移到另一格 / 收回贴纸盒 / 无效回弹）
 */
function DraggableSelfSticker({
  vote,
  label,
  size,
  onDragEnd,
}: {
  vote: VoteRecord;
  label: string;
  size: number;
  onDragEnd: (p: { x: number; y: number }) => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      style={{
        x,
        y,
        cursor: "grab",
        touchAction: "none",
      }}
      whileDrag={{ scale: 1.12, zIndex: 200 }}
      onDragEnd={(_, info) => {
        onDragEnd({ x: info.point.x, y: info.point.y });
        x.set(0);
        y.set(0);
      }}
    >
      <SelfSticker side={vote.side} label={label} size={size} />
    </motion.div>
  );
}
