"use client";

import React from "react";
import { Filter, Heart, Mic, ImageIcon, Dislike } from "../icons";

interface Comment {
  id: string;
  initial: string;
  bg: string; // gradient class for avatar
  name: string;
  text: string;
  meta: string; // 日期 + 地点
  likes: number;
}

const COMMENTS: Comment[] = [
  {
    id: "c1",
    initial: "栗",
    bg: "from-[#FFD2A8] to-[#F49E5C]",
    name: "栗子小姐",
    text: "麻六记的环境是真的可以，菜品也还不错，就是排队太长了",
    meta: "05-08 上海 · 回复",
    likes: 1,
  },
  {
    id: "c2",
    initial: "酒",
    bg: "from-[#A8D8FF] to-[#5C9EE8]",
    name: "酒酒小本JC",
    text: "鼎泰丰永远的神，小笼包还是 yyds",
    meta: "05-09 上海 · 回复",
    likes: 18,
  },
  {
    id: "c3",
    initial: "h",
    bg: "from-[#FFD8E4] to-[#E8758F]",
    name: "hediyu",
    text: "外婆家最近变难吃了 性价比也不如从前",
    meta: "05-10 杭州 · 回复",
    likes: 3,
  },
  {
    id: "c4",
    initial: "潋",
    bg: "from-[#D6C7FF] to-[#9276E8]",
    name: "潋潋",
    text: "绿茶餐厅 pass",
    meta: "05-09 北京 · 回复",
    likes: 0,
  },
  {
    id: "c5",
    initial: "薯",
    bg: "from-[#C7E8C7] to-[#65B065]",
    name: "小红薯E190F1",
    text: "都还行吧，看心情。麻六记最近排队太久了，人均也越来越贵",
    meta: "05-09 江苏 · 回复",
    likes: 2,
  },
  {
    id: "c6",
    initial: "P",
    bg: "from-[#FFE0AD] to-[#E8B158]",
    name: "Peonytang",
    text: "我觉得鼎泰丰还可以的，至少出品稳定 😋",
    meta: "05-09 上海 · 回复",
    likes: 1,
  },
  {
    id: "c7",
    initial: "假",
    bg: "from-[#A8E8DA] to-[#5CB7A8]",
    name: "假momo",
    text: "新天地的店都是装修 > 菜",
    meta: "05-08 上海 · 回复",
    likes: 4,
  },
];

const TOTAL = 63;

export function CommentsSection() {
  return (
    <div className="border-t border-ink5/60">
      {/* Header */}
      <div className="px-4 pt-3 flex items-center gap-1 text-[13.5px] text-ink2">
        <span>
          共 <span className="text-ink font-medium tabular-nums">{TOTAL}</span>{" "}
          条评论
        </span>
        <Filter className="text-ink3" />
      </div>

      {/* 评论输入 */}
      <CommentInput />

      {/* 评论列表 */}
      <div className="px-4 pt-1 pb-4 space-y-5">
        {COMMENTS.map((c) => (
          <CommentItem key={c.id} {...c} />
        ))}
      </div>
    </div>
  );
}

function CommentInput() {
  return (
    <div className="mt-3 px-4 flex items-center gap-2.5">
      <MyAvatar />
      <div className="flex-1 h-9 rounded-full bg-ink5/60 px-3 flex items-center text-[13px] text-ink3">
        留下你的想法吧
      </div>
      <button className="text-ink2 active:opacity-70">
        <Mic className="text-ink2" />
      </button>
      <button className="text-ink2 active:opacity-70">
        <ImageIcon className="text-ink2" />
      </button>
    </div>
  );
}

function CommentItem({ initial, bg, name, text, meta, likes }: Comment) {
  return (
    <div className="flex items-start gap-2.5">
      <div
        className={`shrink-0 w-9 h-9 rounded-full bg-gradient-to-br ${bg} border border-white shadow-sm flex items-center justify-center text-[12px] font-bold text-white`}
      >
        {initial}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[12.5px] text-ink3">{name}</div>
        <div className="mt-0.5 text-[14px] leading-[20px] text-ink/95 break-words">
          {text}
        </div>
        <div className="mt-1 text-[11.5px] text-ink3">{meta}</div>
      </div>
      <div className="shrink-0 flex flex-col items-center gap-2 pt-0.5 text-ink3">
        <button className="flex flex-col items-center active:opacity-60">
          <Heart className="text-ink3 w-[18px] h-[18px]" />
          <span className="text-[11px] tabular-nums leading-none mt-0.5">
            {likes}
          </span>
        </button>
        <button className="active:opacity-60">
          <Dislike className="text-ink3 w-[16px] h-[16px]" />
        </button>
      </div>
    </div>
  );
}

function MyAvatar() {
  return (
    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#FFC1CC] to-[#FFE4E1] border border-white shadow-sm flex items-center justify-center text-[10px] font-bold text-white shrink-0">
      头
    </div>
  );
}
