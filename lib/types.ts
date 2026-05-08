export type OptionSide = "red" | "blue";

export interface ComparisonObject {
  id: string;
  name: string;
}

export interface OptionConfig {
  red: string; // 默认 "夯"
  blue: string; // 默认 "拉"
}

export interface VoteRecord {
  id: string;
  userId: string;
  objectId: string;
  side: OptionSide;
  // 在格子内的相对位置（0~1），用于堆叠展示
  x: number;
  y: number;
  rotation: number; // 角度
  isMe?: boolean;
}

export interface ComparisonWall {
  id: string;
  /** 笔记标题（封面图 / 正文标题，对应发布页 noteTitle） */
  noteTitle: string;
  /** 横评问题（横评图题目卡 / 横评表单） */
  question: string;
  objects: ComparisonObject[];
  options: OptionConfig;
  votes: VoteRecord[];
  participants: number;
  unlocked: boolean;
}

export const DEFAULT_OPTIONS: OptionConfig = { red: "夯", blue: "拉" };

export const ME_USER_ID = "me";
