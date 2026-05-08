"use client";

interface Props {
  question: string;
}

/**
 * 笔记封面图（4:3 横版青色封面）
 * - 全尺寸青色背景
 * - 顶部偏左：白色大引号 ❝
 * - 居中：标题大字（自然换行）
 * - 右下：青色装饰小横条
 */
export function NoteCover({ question }: Props) {
  return (
    <div className="absolute inset-0 bg-coverMint overflow-hidden">
      {/* 顶部大引号 */}
      <div
        className="absolute top-1 left-5 text-[68px] leading-none font-black select-none"
        style={{ color: "rgba(255,255,255,0.78)" }}
      >
        ❝
      </div>

      {/* 居中标题 */}
      <div className="absolute inset-0 flex items-center justify-center px-7">
        <div
          className="text-center font-black"
          style={{
            color: "rgba(60,60,60,0.92)",
            fontSize: "36px",
            lineHeight: "48px",
            letterSpacing: "1px",
            wordBreak: "break-word",
          }}
        >
          {question}
        </div>
      </div>

      {/* 底部偏右的小色条（mint 横条） */}
      <div className="absolute bottom-5 right-5 h-[3px] w-[26px] rounded-full bg-[#9ED7C2]" />
    </div>
  );
}
