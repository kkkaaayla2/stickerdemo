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
  question: string;
  objects: ComparisonObject[];
  options: OptionConfig;
  votes: VoteRecord[];
  participants: number;
  unlocked: boolean; // 是否已揭晓（消蒙层）
}

export const DEFAULT_OPTIONS: OptionConfig = { red: "夯", blue: "拉" };

export const ME_USER_ID = "me";
