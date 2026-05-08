/**
 * 布局规则（4 列内部网格，每格固定占 2 列，等宽等高）
 *  n=2 → 1 行 2 格
 *  n=3 → 2 行；第 3 格居中（colStart=2，即第 2-3 列）
 *  n=4 → 2 行 4 格
 *  n=5 → 3 行；第 5 格居中
 *  n=6 → 3 行 6 格
 */
export interface CellPos {
  index: number;
  /** 在 4 列网格中的起始列（1-based），默认 "auto" */
  colStart?: number;
}

export function gridLayoutFor(n: number): CellPos[] {
  return Array.from({ length: n }, (_, i) => {
    const isLast = i === n - 1;
    const isOdd = n % 2 === 1;
    // 末位格且总数为奇数 → 居中（colStart = 2）
    const colStart = isOdd && isLast ? 2 : undefined;
    return { index: i, colStart };
  });
}

/** 需要的行数 */
export function gridRowCountFor(n: number): number {
  return Math.ceil(n / 2);
}
