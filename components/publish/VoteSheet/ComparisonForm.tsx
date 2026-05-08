"use client";

import { Plus, Close } from "@/components/icons";
import { useDraftStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";

export function ComparisonForm() {
  const {
    question,
    setQuestion,
    objects,
    setObjectName,
    addObject,
    removeObject,
    redLabel,
    blueLabel,
    setRedLabel,
    setBlueLabel,
  } = useDraftStore();

  return (
    <div className="pt-3">
      {/* 题目 */}
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full bg-transparent text-[15px] font-medium placeholder:text-ink3 outline-none py-2"
        placeholder="请填写横评问题"
      />

      {/* 对象列表 */}
      <div className="mt-2">
        <div className="text-[12px] text-ink3 px-1 pb-1.5">评价对象</div>
        <div className="space-y-2">
          <AnimatePresence initial={false}>
            {objects.map((o, i) => (
              <motion.div
                key={o.id}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 44 }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2"
              >
                <span className="w-5 text-center text-[12px] text-ink3 tabular-nums">
                  {i + 1}
                </span>
                <input
                  value={o.name}
                  onChange={(e) => setObjectName(o.id, e.target.value)}
                  maxLength={16}
                  placeholder={`对象 ${i + 1}（≤16字）`}
                  className="flex-1 h-10 rounded-md bg-ink5/60 px-3 text-[14px] placeholder:text-ink3 outline-none"
                />
                <span className="text-[11px] text-ink4 w-9 text-right tabular-nums">
                  {o.name.length}/16
                </span>
                {objects.length > 2 && (
                  <button
                    onClick={() => removeObject(o.id)}
                    className="w-7 h-7 rounded-full bg-ink5 flex items-center justify-center text-ink2"
                  >
                    <Close />
                  </button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {objects.length < 6 && (
          <button
            onClick={addObject}
            className="mt-2 w-full h-10 rounded-md border border-dashed border-ink4 text-ink2 text-[13.5px] flex items-center justify-center gap-1"
          >
            <Plus />
            <span>添加对象（{objects.length}/6）</span>
          </button>
        )}
      </div>

      {/* 选项文案 */}
      <div className="mt-5">
        <div className="text-[12px] text-ink3 px-1 pb-1.5">
          选项文案（颜色固定 · 不可增减数量）
        </div>
        <div className="space-y-2">
          <LabelInput
            color="red"
            value={redLabel}
            onChange={setRedLabel}
            placeholder="选项 1"
          />
          <LabelInput
            color="blue"
            value={blueLabel}
            onChange={setBlueLabel}
            placeholder="选项 2"
          />
        </div>
        <div className="mt-2 px-1 text-[11.5px] text-ink3 leading-[16px]">
          示例：夯/拉 · 行/不行 · 买/不买 · 推/不推
        </div>
      </div>
    </div>
  );
}

function LabelInput({
  color,
  value,
  onChange,
  placeholder,
}: {
  color: "red" | "blue";
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  const isRed = color === "red";
  return (
    <div className="flex items-center gap-2">
      <span
        className="w-2 h-2 rounded-full shrink-0"
        style={{ background: isRed ? "#FF2442" : "#2A6BFF" }}
      />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, 8))}
        placeholder={placeholder}
        maxLength={8}
        className="flex-1 h-10 rounded-md bg-ink5/60 px-3 text-[14px] placeholder:text-ink3 outline-none"
      />
    </div>
  );
}
