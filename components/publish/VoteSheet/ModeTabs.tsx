"use client";

import { motion } from "framer-motion";
import { VoteMode } from "./index";

interface Props {
  mode: VoteMode;
  onChange: (m: VoteMode) => void;
}

export function ModeTabs({ mode, onChange }: Props) {
  return (
    <div className="pt-3 px-5">
      <div className="flex items-center justify-center gap-8 text-[16px] relative">
        <Tab
          active={mode === "classic"}
          onClick={() => onChange("classic")}
          label="经典模式"
        />
        <Tab
          active={mode === "comparison"}
          onClick={() => onChange("comparison")}
          label="横评模式"
          isNew
        />
      </div>
    </div>
  );
}

function Tab({
  active,
  onClick,
  label,
  isNew,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  isNew?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="relative pb-2 flex items-center gap-1"
    >
      <span
        className={[
          "transition-colors",
          active ? "text-ink font-semibold" : "text-ink3",
        ].join(" ")}
      >
        {label}
      </span>
      {isNew && (
        <span className="absolute -top-1 -right-7 text-[9px] px-1 h-3.5 leading-[14px] rounded-sm bg-xhsRed text-white font-semibold">
          NEW
        </span>
      )}
      {active && (
        <motion.span
          layoutId="tabline"
          className="absolute left-1/2 -translate-x-1/2 bottom-0 h-[3px] w-6 rounded-full bg-xhsRed"
        />
      )}
    </button>
  );
}
