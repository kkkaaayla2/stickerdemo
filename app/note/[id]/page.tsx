"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PhoneFrame } from "@/components/frame/PhoneFrame";
import { NoteScreen } from "@/components/note/NoteScreen";

export default function NotePage() {
  return (
    <Suspense fallback={<div className="min-h-[100svh] bg-[#1a1a1a]" />}>
      <Inner />
    </Suspense>
  );
}

function Inner() {
  const sp = useSearchParams();
  const isAuthor = sp.get("author") === "1";
  return (
    <PhoneFrame>
      <NoteScreen isAuthor={isAuthor} />
    </PhoneFrame>
  );
}
