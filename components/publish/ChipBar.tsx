"use client";

import { Hash, At, VoteIcon, Pencil } from "../icons";
import { useDraftStore } from "@/lib/store";

interface Props {
  onClickVote: () => void;
}

export function ChipBar({ onClickVote }: Props) {
  const { hasComparison } = useDraftStore();
  return (
    <div className="px-4">
      {hasComparison && (
        <button
          onClick={onClickVote}
          className="mb-2 flex items-center gap-1 px-3 h-7 rounded-full bg-ink5 text-[12.5px] text-ink2"
        >
          <span>投票 · 2个选项</span>
          <Pencil className="text-ink3" />
        </button>
      )}
      <div className="flex gap-2">
        <Chip>
          <Hash className="text-ink2" />
          <span>话题</span>
        </Chip>
        <Chip>
          <At className="text-ink2" />
          <span>用户</span>
        </Chip>
        <Chip onClick={onClickVote} active={hasComparison}>
          <VoteIcon className="text-ink2" />
          <span>投票</span>
        </Chip>
      </div>
    </div>
  );
}

function Chip({
  children,
  onClick,
  active,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "flex items-center gap-1 px-3 h-8 rounded-full text-[13px]",
        active
          ? "bg-xhsRedLight text-xhsRed"
          : "bg-ink5 text-ink2 active:bg-ink5/70",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
