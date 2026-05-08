"use client";

import { Pin, Lock, ComponentsIcon, Gear, ChevronRight } from "../icons";

interface Props {
  onPublish: () => void;
}

export function BottomBar({ onPublish }: Props) {
  return (
    <>
      <div className="mt-4 px-4 space-y-0">
        <Row icon={<Pin className="text-ink2" />} label="标记地点" />
        <LocationChips />
        <Row icon={<Lock className="text-ink2" />} label="公开可见" />
        <Row
          icon={<ComponentsIcon className="text-ink2" />}
          label="添加组件"
          rightExtra={<span className="text-ink3 text-[13px]">可添加文件</span>}
        />
        <Row icon={<Gear className="text-ink2" />} label="高级选项" />
      </div>

      <div className="px-4 pt-2 pb-2 text-[12px] text-ink3">笔记内容声明 ›</div>

      {/* 操作按钮 */}
      <div className="absolute inset-x-0 bottom-0 px-4 pb-5 pt-3 bg-white">
        <div className="flex gap-3">
          <button className="flex-1 h-12 rounded-full border border-ink4 text-ink text-[15px] font-medium">
            存草稿
          </button>
          <button
            onClick={onPublish}
            className="flex-[1.4] h-12 rounded-full bg-xhsRed text-white text-[15px] font-semibold active:bg-xhsRed/90"
          >
            发布笔记
          </button>
        </div>
      </div>
    </>
  );
}

function Row({
  icon,
  label,
  rightExtra,
}: {
  icon: React.ReactNode;
  label: string;
  rightExtra?: React.ReactNode;
}) {
  return (
    <button className="w-full flex items-center justify-between py-3 border-b border-[#F0F0F0]">
      <div className="flex items-center gap-2.5">
        {icon}
        <span className="text-[14.5px] text-ink">{label}</span>
      </div>
      <div className="flex items-center gap-1">
        {rightExtra}
        <ChevronRight className="text-ink4" />
      </div>
    </button>
  );
}

function LocationChips() {
  const tags = ["上海千古情景区", "上海世博园", "东浩兰生上海世博", "上海美术"];
  return (
    <div className="flex gap-2 -mt-1.5 pb-2 overflow-x-auto no-scrollbar">
      {tags.map((t) => (
        <span
          key={t}
          className="shrink-0 px-2.5 h-6 rounded-md bg-[#F4F8FF] text-[#86A6D8] text-[12px] flex items-center"
        >
          {t}
        </span>
      ))}
    </div>
  );
}
