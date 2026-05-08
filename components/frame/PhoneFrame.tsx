"use client";

import React from "react";

/**
 * iPhone 15 Pro 容器（393×852pt 逻辑像素）
 * - 桌面访问：显示设备外壳 + 灵动岛
 * - 移动端访问：自动占满屏幕，不显示外壳
 */
export function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] w-full bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
      {/* 外壳容器：桌面浏览器看见硬件边框；窄屏直接铺满 */}
      <div
        className="relative bg-black md:rounded-[54px] md:border-[10px] md:border-black md:shadow-[0_30px_80px_rgba(0,0,0,0.6),0_0_0_2px_#2c2c2c_inset] overflow-hidden"
        style={{
          width: "min(100vw, 393px)",
          height: "min(100dvh, 852px)",
        }}
      >
        {/* 屏幕白底 */}
        <div className="absolute inset-0 bg-white">
          {/* 内容区 */}
          <div className="absolute inset-0">
            {children}
          </div>
        </div>


        {/* Home 指示条 */}
        <div className="pointer-events-none absolute bottom-1.5 left-1/2 -translate-x-1/2 h-[5px] w-[134px] rounded-full bg-black/85" />
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="absolute inset-x-0 top-0 h-[44px] flex items-end justify-between px-7 pb-1.5 z-30 text-black">
      <div className="flex items-center gap-1.5 text-[15px] font-semibold tabular-nums">
        <span>16:45</span>
        <BedIcon />
      </div>
      <div className="flex items-center gap-1.5">
        <SignalIcon />
        <WifiIcon />
        <BatteryIcon />
      </div>
    </div>
  );
}

function DynamicIsland() {
  return (
    <div className="pointer-events-none absolute top-[10px] left-1/2 -translate-x-1/2 z-40 h-[34px] w-[120px] rounded-full bg-black" />
  );
}

function BedIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 12V7h4a3 3 0 0 1 3 3v2h11v6h-2v-2H5v2H3v-6Zm4-4a1 1 0 0 0-1 1v3h3V9a1 1 0 0 0-1-1H7Z" />
    </svg>
  );
}
function SignalIcon() {
  return (
    <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
      <rect x="0" y="7" width="3" height="4" rx="0.5" />
      <rect x="4.5" y="5" width="3" height="6" rx="0.5" />
      <rect x="9" y="3" width="3" height="8" rx="0.5" />
      <rect x="13.5" y="0" width="3" height="11" rx="0.5" />
    </svg>
  );
}
function WifiIcon() {
  return (
    <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor">
      <path d="M8 11a1.4 1.4 0 1 0 0-2.8A1.4 1.4 0 0 0 8 11Zm0-4.4A4.5 4.5 0 0 1 11.2 8L12.8 6.4A6.7 6.7 0 0 0 3.2 6.4L4.8 8A4.5 4.5 0 0 1 8 6.6Zm0-3.2A7.7 7.7 0 0 1 13.5 4.7L15 3.2A9.9 9.9 0 0 0 1 3.2L2.5 4.7A7.7 7.7 0 0 1 8 3.4Z" />
    </svg>
  );
}
function BatteryIcon() {
  return (
    <div className="relative flex items-center">
      <div className="relative h-[12px] w-[24px] rounded-[3px] border border-black/35 flex items-center px-[1.5px]">
        <div className="h-[8px] w-[18px] rounded-[1.5px] bg-[#39C45A]" />
      </div>
      <div className="ml-[1px] h-[5px] w-[1.5px] rounded-r bg-black/35" />
      <span className="absolute inset-0 flex items-center justify-center text-[8px] font-semibold text-white tracking-tighter">
        83
      </span>
    </div>
  );
}
