"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ModeTabs } from "./ModeTabs";
import { ClassicForm } from "./ClassicForm";
import { ComparisonForm } from "./ComparisonForm";
import { useDraftStore } from "@/lib/store";

interface Props {
  open: boolean;
  onClose: () => void;
  afterCommit?: () => void;
}

export type VoteMode = "classic" | "comparison";

export function VoteSheet({ open, onClose, afterCommit }: Props) {
  const [mode, setMode] = useState<VoteMode>("comparison");
  const [classicValid, setClassicValid] = useState(false);
  const { commitComparison, objects, redLabel, blueLabel } = useDraftStore();

  // 横评模式完成条件：≥2 个对象已填名 + 两个选项名都已填
  const filledObjects = objects.filter((o) => o.name.trim().length > 0).length;
  const comparisonValid =
    filledObjects >= 2 && redLabel.trim().length > 0 && blueLabel.trim().length > 0;

  const canDone = mode === "classic" ? classicValid : comparisonValid;

  const handleDone = () => {
    if (!canDone) return;
    if (mode === "comparison") commitComparison();
    afterCommit?.();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="mask"
            className="absolute inset-0 z-40 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            key="sheet"
            className="absolute inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl shadow-sheet flex flex-col"
            style={{ height: "calc(100% - 132px)" }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
          >
            <div className="pt-2 flex flex-col items-center">
              <div className="h-[3px] w-9 rounded-full bg-ink5" />
            </div>
            <ModeTabs mode={mode} onChange={setMode} />

            <div className="flex-1 overflow-y-auto px-5 pb-2 no-scrollbar">
              {mode === "classic" ? (
                <ClassicForm onValidChange={setClassicValid} />
              ) : (
                <ComparisonForm />
              )}
            </div>

            <div className="px-5 pt-3 pb-5 flex gap-3 border-t border-ink5/70">
              <button
                onClick={onClose}
                className="flex-1 h-11 rounded-full border border-ink4 text-ink text-[15px] font-medium"
              >
                取消
              </button>
              <button
                onClick={handleDone}
                disabled={!canDone}
                className="flex-1 h-11 rounded-full text-white text-[15px] font-semibold transition-colors duration-200"
                style={{
                  background: canDone ? "#FF2442" : "#FFBCC7",
                  cursor: canDone ? "pointer" : "not-allowed",
                }}
              >
                完成
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
