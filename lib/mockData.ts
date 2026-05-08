import { ComparisonWall, VoteRecord } from "./types";

/**
 * 各区域数量 n 对应的基础票数预设
 * 每项为 [红(夯)票数, 蓝(拉)票数]
 * n=2/4 由用户指定，其余由设计者补全，
 * 整体保持贴近真实评测风格（有明显夯区、有明显拉区、有胶着区）
 */
export const BASE_VOTES: Record<number, Array<[number, number]>> = {
  2: [
    [36, 9],   // 明显夯
    [14, 60],  // 明显拉
  ],
  3: [
    [36, 9],   // 明显夯
    [14, 60],  // 明显拉
    [53, 46],  // 胶着偏夯
  ],
  4: [
    [36, 9],   // 明显夯
    [14, 60],  // 明显拉
    [53, 46],  // 胶着偏夯
    [7,  24],  // 明显拉
  ],
  5: [
    [36, 9],   // 明显夯
    [14, 60],  // 明显拉
    [53, 46],  // 胶着偏夯
    [7,  24],  // 明显拉
    [28, 33],  // 轻微胶着偏拉
  ],
  6: [
    [36, 9],   // 明显夯
    [14, 60],  // 明显拉
    [53, 46],  // 胶着偏夯
    [7,  24],  // 明显拉
    [28, 33],  // 轻微胶着偏拉
    [41, 19],  // 偏夯
  ],
};

/** 固定参与人数（写死） */
export const FIXED_PARTICIPANTS = 87;

// 伪随机数（基于字符串 seed，保证每次渲染位置一致）
const seed = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return () => {
    h = (h * 9301 + 49297) % 233280;
    return h / 233280;
  };
};

export function makeVotes(
  objId: string,
  redCount: number,
  blueCount: number,
): VoteRecord[] {
  const r = seed(objId);
  const out: VoteRecord[] = [];
  for (let i = 0; i < redCount; i++) {
    out.push({
      id: `${objId}-r-${i}`,
      userId: `u-${i}`,
      objectId: objId,
      side: "red",
      x: 0.08 + r() * 0.84,
      y: 0.18 + r() * 0.74,
      rotation: -25 + r() * 50,
    });
  }
  for (let i = 0; i < blueCount; i++) {
    out.push({
      id: `${objId}-b-${i}`,
      userId: `u-${100 + i}`,
      objectId: objId,
      side: "blue",
      x: 0.08 + r() * 0.84,
      y: 0.18 + r() * 0.74,
      rotation: -25 + r() * 50,
    });
  }
  return out;
}

/** 根据对象列表和预设票数生成完整 votes 数组 */
export function makeVotesFromPreset(
  objects: { id: string }[],
): VoteRecord[] {
  const preset = BASE_VOTES[objects.length] ?? BASE_VOTES[4];
  return objects.flatMap((obj, i) => {
    const [red, blue] = preset[i] ?? [20, 20];
    return makeVotes(obj.id, red, blue);
  });
}

// demo 阶段：模拟一篇"静安寺餐厅横评"已有 87 人参与的状态
// unlocked = false（磨砂蒙层还在），需要用户撕第一张才解锁
export function initialMockWall(): ComparisonWall {
  const objects = [
    { id: "obj-1", name: "麻六记" },
    { id: "obj-2", name: "外婆家" },
    { id: "obj-3", name: "鼎泰丰" },
    { id: "obj-4", name: "绿茶餐厅" },
  ];
  return {
    id: "wall-demo",
    question: "已落地上海，求锐评新天地餐厅",
    objects,
    options: { red: "夯", blue: "拉" },
    votes: makeVotesFromPreset(objects),
    participants: FIXED_PARTICIPANTS,
    unlocked: false,
  };
}
