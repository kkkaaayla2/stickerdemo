"use client";

import { Plus } from "@/components/icons";
import { useEffect, useState } from "react";

interface Props {
  onValidChange?: (valid: boolean) => void;
}

export function ClassicForm({ onValidChange }: Props) {
  const [question, setQuestion] = useState("");
  const [opts, setOpts] = useState(["", ""]);

  const isValid =
    question.trim().length > 0 &&
    opts.filter((o) => o.trim().length > 0).length >= 2;

  useEffect(() => {
    onValidChange?.(isValid);
  }, [isValid, onValidChange]);

  const add = () => opts.length < 6 && setOpts([...opts, ""]);
  return (
    <div className="pt-4">
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full bg-transparent text-[15px] placeholder:text-ink3 outline-none py-2"
        placeholder="请填写投票问题"
      />
      <div className="mt-2 space-y-3">
        {opts.map((v, i) => (
          <input
            key={i}
            value={v}
            onChange={(e) => {
              const n = [...opts];
              n[i] = e.target.value;
              setOpts(n);
            }}
            className="w-full h-11 rounded-md bg-ink5/60 px-3 text-[14px] placeholder:text-ink3 outline-none"
            placeholder={`选项 ${i + 1}`}
          />
        ))}
        <button
          onClick={add}
          className="w-full h-11 rounded-md border border-dashed border-ink4 text-ink2 text-[14px] flex items-center justify-center gap-1"
        >
          <Plus />
          <span>添加选项</span>
        </button>
      </div>
    </div>
  );
}
