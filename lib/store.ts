"use client";

import { create } from "zustand";
import {
  ComparisonObject,
  ComparisonWall,
  DEFAULT_OPTIONS,
  ME_USER_ID,
  OptionSide,
  VoteRecord,
} from "./types";
import { initialMockWall, makeVotesFromPreset, FIXED_PARTICIPANTS } from "./mockData";

interface DraftState {
  // 发布草稿
  noteTitle: string;      // 笔记标题（封面图1 / 标题栏3）
  question: string;       // 横评问题（缩略图2 / 横评表单4）
  objects: ComparisonObject[];
  redLabel: string;
  blueLabel: string;
  hasComparison: boolean;
  setNoteTitle: (t: string) => void;
  setQuestion: (q: string) => void;
  setObjectName: (id: string, name: string) => void;
  addObject: () => void;
  removeObject: (id: string) => void;
  setRedLabel: (s: string) => void;
  setBlueLabel: (s: string) => void;
  commitComparison: () => void;
  resetDraft: () => void;
}

interface WallState {
  wall: ComparisonWall;
  myStickers: { red: number; blue: number };
  highlightVoteId: string | null;
  unlock: () => void;
  vote: (
    objectId: string,
    side: OptionSide,
    pos: { x: number; y: number; rotation: number },
  ) => void;
  /** 把已投出的贴纸移到（同/不同）对象的指定坐标 */
  moveVote: (
    voteId: string,
    newObjectId: string,
    pos: { x: number; y: number },
  ) => void;
  /** 把已投出的贴纸收回贴纸盒（归还库存） */
  recallVote: (voteId: string) => void;
  reset: () => void;
}

const newId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

const blankObjects = (): ComparisonObject[] => [
  { id: newId(), name: "" },
  { id: newId(), name: "" },
];

export const DEFAULT_QUESTION = "已落地上海，求锐评新天地餐厅";

export const useDraftStore = create<DraftState>((set) => ({
  noteTitle: "已落地上海，求锐评新天地餐厅",
  question: DEFAULT_QUESTION,
  objects: blankObjects(),
  redLabel: "",
  blueLabel: "",
  hasComparison: false,
  setNoteTitle: (t) => set({ noteTitle: t }),
  setQuestion: (q) => set({ question: q }),
  setObjectName: (id, name) =>
    set((s) => ({
      objects: s.objects.map((o) =>
        o.id === id ? { ...o, name: name.slice(0, 16) } : o,
      ),
    })),
  addObject: () =>
    set((s) =>
      s.objects.length >= 6
        ? s
        : { objects: [...s.objects, { id: newId(), name: "" }] },
    ),
  removeObject: (id) =>
    set((s) =>
      s.objects.length <= 2
        ? s
        : { objects: s.objects.filter((o) => o.id !== id) },
    ),
  setRedLabel: (v) => set({ redLabel: v.slice(0, 4) }),
  setBlueLabel: (v) => set({ blueLabel: v.slice(0, 4) }),
  commitComparison: () => set({ hasComparison: true }),
  resetDraft: () =>
    set({
      noteTitle: "",
      question: DEFAULT_QUESTION,
      objects: blankObjects(),
      redLabel: "",
      blueLabel: "",
      hasComparison: false,
    }),
}));

export const useWallStore = create<WallState>((set, get) => ({
  wall: initialMockWall(),
  myStickers: { red: 0, blue: 0 },
  highlightVoteId: null,
  unlock: () =>
    set((s) => ({ wall: { ...s.wall, unlocked: true } })),
  vote: (objectId, side, pos) => {
    const { wall, myStickers } = get();
    if (myStickers[side] <= 0) return;
    const v: VoteRecord = {
      id: newId(),
      userId: ME_USER_ID,
      objectId,
      side,
      x: pos.x,
      y: pos.y,
      rotation: pos.rotation,
      isMe: true,
    };
    set({
      wall: {
        ...wall,
        unlocked: true,
        votes: [...wall.votes, v],
        // participants 写死，不累加
      },
      myStickers: { ...myStickers, [side]: myStickers[side] - 1 },
      highlightVoteId: v.id,
    });
  },
  moveVote: (voteId, newObjectId, pos) =>
    set((s) => {
      const v = s.wall.votes.find((vt) => vt.id === voteId);
      if (!v || !v.isMe) return s;
      return {
        wall: {
          ...s.wall,
          votes: s.wall.votes.map((vt) =>
            vt.id === voteId
              ? { ...vt, objectId: newObjectId, x: pos.x, y: pos.y }
              : vt,
          ),
        },
        highlightVoteId: voteId,
      };
    }),
  recallVote: (voteId) =>
    set((s) => {
      const v = s.wall.votes.find((vt) => vt.id === voteId);
      if (!v || !v.isMe) return s;
      return {
        wall: { ...s.wall, votes: s.wall.votes.filter((vt) => vt.id !== voteId) },
        myStickers: {
          ...s.myStickers,
          [v.side]: s.myStickers[v.side] + 1,
        },
        highlightVoteId:
          s.highlightVoteId === voteId ? null : s.highlightVoteId,
      };
    }),
  reset: () => set({ wall: initialMockWall(), myStickers: { red: 0, blue: 0 }, highlightVoteId: null }),
}));

// 从草稿生成横评墙（用作发布后浏览的笔记数据）
export function buildWallFromDraft(): ComparisonWall {
  const draft = useDraftStore.getState();
  const rawObjects = draft.objects.filter((o) => o.name.trim().length > 0);
  const objects =
    rawObjects.length >= 2
      ? rawObjects
      : [
          { id: newId(), name: "餐厅A" },
          { id: newId(), name: "餐厅B" },
        ];
  return {
    id: newId(),
    noteTitle: draft.noteTitle.trim() || draft.question || DEFAULT_QUESTION,
    question: draft.question || DEFAULT_QUESTION,
    objects,
    options: {
      red: draft.redLabel.trim() || DEFAULT_OPTIONS.red,
      blue: draft.blueLabel.trim() || DEFAULT_OPTIONS.blue,
    },
    votes: makeVotesFromPreset(objects),
    participants: FIXED_PARTICIPANTS,
    unlocked: false,
  };
}

// 给定对象数量初始化"我的贴纸数"
export function initMyStickers(n: number) {
  useWallStore.setState({ myStickers: { red: n, blue: n } });
}
