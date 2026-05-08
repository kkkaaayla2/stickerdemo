"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  /** 是否已解锁（true 时点点向四周飞散并淡出） */
  unlocked: boolean;
  /** 点点数量，默认 36 */
  count?: number;
}

/**
 * 未投票时的"动感闪烁"动效：
 * - 渲染 N 个随机位置的小白点，循环呼吸闪烁
 * - 解锁时所有点向四周飞散 + 淡出，让位给堆叠贴纸
 */
export function SparkleField({ unlocked, count = 40 }: Props) {
  const points = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      // 飞散方向：以中心为参考点，沿径向向外
      const angle = Math.atan2(y - 50, x - 50) + (Math.random() - 0.5) * 0.6;
      const dist = 100 + Math.random() * 140;
      // 白噪音质感：绝大部分为微粒，少量中亮点提供层次
      const tier = Math.random();
      const size =
        tier > 0.93 ? 1.8 + Math.random() * 1.0   // 亮点 ~7%
        : tier > 0.72 ? 0.9 + Math.random() * 0.7  // 中粒 ~21%
        : 0.3 + Math.random() * 0.5;               // 微粒 ~72%
      return {
        id: i,
        x,
        y,
        size,
        delay: Math.random() * 2.0,
        duration: 1.0 + Math.random() * 1.4,
        flyX: Math.cos(angle) * dist,
        flyY: Math.sin(angle) * dist,
        flyDuration: 0.55 + Math.random() * 0.4,
        flyDelay: Math.random() * 0.18,
      };
    });
  }, [count]);

  // 飞散完成后真正卸载 DOM
  const [removed, setRemoved] = useState(false);
  useEffect(() => {
    if (!unlocked) return;
    const t = setTimeout(() => setRemoved(true), 1200);
    return () => clearTimeout(t);
  }, [unlocked]);

  if (removed) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {points.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: "rgba(46,123,92,0.55)",
            boxShadow:
              "0 0 3px rgba(46,123,92,0.4), 0 0 6px rgba(46,123,92,0.2)",
          }}
          animate={
            !unlocked
              ? {
                  opacity: [0.25, 1, 0.25],
                  scale: [0.6, 1.3, 0.6],
                }
              : {
                  opacity: 0,
                  x: p.flyX,
                  y: p.flyY,
                  scale: 0.3,
                }
          }
          transition={
            !unlocked
              ? {
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              : {
                  duration: p.flyDuration,
                  delay: p.flyDelay,
                  ease: [0.25, 0.1, 0.25, 1],
                }
          }
        />
      ))}
    </div>
  );
}
