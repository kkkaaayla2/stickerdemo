"use client";

import Link from "next/link";
import { PhoneFrame } from "@/components/frame/PhoneFrame";

export default function HomePage() {
  return (
    <PhoneFrame>
      <div className="h-full w-full flex flex-col bg-white text-ink">
        <div className="px-6 pt-8">
          <div className="text-[12px] tracking-widest text-xhsRed font-semibold">
            XIAOHONGSHU · DEMO
          </div>
          <h1 className="mt-1 text-[28px] font-extrabold leading-tight">
            横评墙
          </h1>
          <div className="mt-1 text-[14px] text-ink2">
            贴贴投票 · 夯拉墙
            <span className="ml-1.5 text-ink3">贴出你的态度</span>
          </div>
        </div>

        <div className="px-5 mt-6 grid gap-3">
          <Link
            href="/publish"
            className="rounded-2xl bg-gradient-to-br from-xhsRed to-[#FF6B7E] text-white p-5 active:scale-[0.99] transition-transform"
          >
            <div className="text-[12px] opacity-80">流程 1 / 作者视角</div>
            <div className="text-[18px] font-bold mt-1">从发布开始体验</div>
            <div className="text-[12px] opacity-90 mt-1.5">
              发布界面 → 投票 → 横评模式 → 完成 → 发布笔记
            </div>
          </Link>

          <Link
            href="/note/wall-demo"
            className="rounded-2xl bg-ink5/70 text-ink p-5 active:scale-[0.99] transition-transform"
          >
            <div className="text-[12px] text-ink3">流程 2 / 投票者视角</div>
            <div className="text-[18px] font-bold mt-1">直接体验贴贴投票</div>
            <div className="text-[12px] text-ink2 mt-1.5">
              进入一篇预置横评笔记，长按贴纸 → 拖到对象 → 揭晓结果
            </div>
          </Link>
        </div>

        <div className="px-6 mt-auto pb-8">
          <Section title="复刻的 4 个原界面">
            <Bullet>① 初始发布界面</Bullet>
            <Bullet>② 投票按钮入口（弹窗）+ 经典/横评 Tab</Bullet>
            <Bullet>③ 选项设置完成（带「投票·2个选项」标签）</Bullet>
            <Bullet>④ 其他用户笔记浏览页</Bullet>
          </Section>
          <Section title="横评墙核心交互">
            <Bullet>长按贴纸 → 撕下（震动 + 抬起 + 旋转）</Bullet>
            <Bullet>拖到对象格 → 高亮目标 → 松手投票</Bullet>
            <Bullet>第 1 张触发解锁，所有蒙层同时消散</Bullet>
            <Bullet>自己刚投的贴纸脉冲呼吸高亮</Bullet>
          </Section>
        </div>
      </div>
    </PhoneFrame>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4">
      <div className="text-[11px] tracking-widest text-ink3 font-semibold mb-1.5">
        {title.toUpperCase()}
      </div>
      <div className="space-y-1 text-[12.5px] text-ink2 leading-[18px]">
        {children}
      </div>
    </div>
  );
}
function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-1.5">
      <span className="text-xhsRed">•</span>
      <span>{children}</span>
    </div>
  );
}
