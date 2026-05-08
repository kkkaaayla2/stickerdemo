# 小红书 · 横评墙 Demo

> 贴出你的态度 · 贴贴投票 · 夯拉墙
> iPhone 15 Pro 竖屏可交互 demo（部署 Vercel）

## 一句话介绍

为小红书新增的「横评墙」功能：在原有「单议题 N 选项」投票基础上，扩展为「**N 个评价对象 × 红蓝两个对立选项**」的多对象横评，并提供**撕、拖、贴**的物理化贴纸交互。

## 演示流程

入口页（[`/`](./app/page.tsx)）提供两条路径：

1. **作者视角**：`/publish` → 1:1 复刻原发布界面 → 点击「投票」打开抽屉 → 切换「横评模式」 → 填题目 / 添加 2-6 个对象 → 完成 → 回到发布界面（多了「投票 · 2 个选项」标签）→ 发布笔记
2. **投票者视角**：`/note/wall-demo` → 1:1 复刻笔记浏览界面 → 横评墙带闪烁蒙层 → 长按贴纸 → 拖到目标对象 → 第 1 张触发解锁 → 所有对象的堆叠票一次性揭晓 → 自己投的那张脉冲高亮

## 技术栈

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS（设计 token 严格对齐 `prd/设计系统.png`）
- Framer Motion（撕拽贴纸、抽屉、堆叠出场）
- Zustand（轻量跨页状态：草稿 + 横评墙投票）

## 文件结构 (Harness)

```
小红书demo/
├── prd/                              # 现有 PRD 与原图
├── app/
│   ├── layout.tsx                    # 根布局（viewport + 字体）
│   ├── globals.css                   # 全局样式 + 贴纸纸纤维 / 蒙层扫光
│   ├── page.tsx                      # 入口（演示菜单）
│   ├── publish/page.tsx              # 发布流程页
│   └── note/[id]/page.tsx            # 笔记浏览页
├── components/
│   ├── frame/PhoneFrame.tsx          # iPhone 15 Pro 外壳（灵动岛/状态栏）
│   ├── icons.tsx                     # 全部 SVG 图标
│   ├── publish/                      # 发布相关
│   │   ├── PublishScreen.tsx
│   │   ├── ImageStrip.tsx            # 顶部图片栏
│   │   ├── ComparisonThumb.tsx       # 系统生成的横评图缩略
│   │   ├── ChipBar.tsx               # 话题/用户/投票 + 投票标签
│   │   ├── BottomBar.tsx             # 标记地点/可见性/草稿/发布
│   │   └── VoteSheet/                # 投票抽屉（经典 / 横评 双 Tab）
│   │       ├── index.tsx
│   │       ├── ModeTabs.tsx
│   │       ├── ClassicForm.tsx
│   │       └── ComparisonForm.tsx
│   └── note/                         # 笔记浏览
│       ├── NoteScreen.tsx
│       └── ComparisonWall/           # ⭐ 横评墙核心
│           ├── index.tsx
│           ├── layout.ts             # 2 列布局规则（PRD 4.3）
│           ├── ObjectGrid.tsx
│           ├── ObjectCell.tsx        # 蒙层 / 堆叠 / 计数 Pill
│           ├── Sticker.tsx           # 单张圆形贴纸（撕痕 + 高光）
│           ├── TearableSticker.tsx   # 可撕拽贴纸（长按 + drag）
│           └── StickerBox.tsx        # 底部贴纸盒
├── lib/
│   ├── store.ts                      # Zustand: 草稿 + 投票
│   ├── types.ts                      # ComparisonWall / Vote 等类型
│   ├── mockData.ts                   # 预置 4 个对象 + 历史投票
│   └── haptics.ts                    # vibrate 触感封装
├── package.json / tsconfig.json / tailwind.config.ts / next.config.ts
└── README.md
```

## 本地启动

```bash
# 1. 安装 Node.js 20+（windows 直接装 https://nodejs.org/zh-cn）
# 2. 在项目根目录：
npm install
npm run dev
# → http://localhost:3000
```

## 部署到 Vercel

1. 把项目推到 GitHub
2. [vercel.com/new](https://vercel.com/new) 选择该仓库 → 一路 Next 即可
3. Framework Preset 自动识别为 Next.js，无需额外环境变量

## 关键交互对照 PRD

| PRD 条目 | 实现位置 |
| -------- | -------- |
| 4.3 2 列布局规则 | `components/note/ComparisonWall/layout.ts` |
| 5.1 发布端 4 步 | `components/publish/*` + `VoteSheet/*` |
| 5.1.5 横评图自动生成 | `components/publish/ComparisonThumb.tsx` |
| 5.2.1 闪烁蒙层 | `globals.css .mask-sweep` + `animate-shimmer` |
| 5.2.2 撕拖交互 | `TearableSticker.tsx`（长按 → drag → onDrop hitTest）|
| 5.2.3 首张解锁 | `ComparisonWall/index.tsx` 的 `vote()` 触发 `unlocked: true` |
| 5.2.4 持续投票 / 剩余保留 | `useWallStore.myStickers` |
| 5.2.5 本人贴纸高亮 | `Sticker.tsx animate-breathe` + `highlightVoteId` |
| 5.2.6 X 人已参与 | 信息条 |
| 5.2.7 查看结果 | `unlock()` 按钮 |

## 设备适配

- 桌面浏览器：模拟 iPhone 15 Pro 黑色机身边框 + 灵动岛
- 手机访问：自动隐藏外壳、铺满屏幕
- 推荐 Chrome DevTools → Toggle Device Toolbar → iPhone 15 Pro 预览

## 后续可拓展

- 贴纸数量降级（千 / 万级时切换为热力图）
- 作者后台投票数据导出
- 评论区贴纸引用（评论时插入自己投的那张）
