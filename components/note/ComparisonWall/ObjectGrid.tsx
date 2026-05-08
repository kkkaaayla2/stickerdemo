"use client";

import React, { useImperativeHandle, useRef, forwardRef } from "react";
import { ComparisonObject, OptionConfig, VoteRecord } from "@/lib/types";
import { gridLayoutFor, gridRowCountFor } from "./layout";
import { ObjectCell } from "./ObjectCell";

export interface ObjectGridHandle {
  hitTest: (clientX: number, clientY: number) => string | null;
  getRect: (objId: string) => DOMRect | null;
}

interface Props {
  objects: ComparisonObject[];
  votes: VoteRecord[];
  options: OptionConfig;
  unlocked: boolean;
  hoverObjId: string | null;
  highlightVoteId: string | null;
  onSelfDrag?: (vote: VoteRecord, p: { x: number; y: number }) => void;
}

export const ObjectGrid = forwardRef<ObjectGridHandle, Props>(function ObjectGrid(
  { objects, votes, options, unlocked, hoverObjId, highlightVoteId, onSelfDrag },
  ref,
) {
  const cellRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useImperativeHandle(
    ref,
    () => ({
      hitTest(x, y) {
        for (const o of objects) {
          const el = cellRefs.current[o.id];
          if (!el) continue;
          const r = el.getBoundingClientRect();
          if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) {
            return o.id;
          }
        }
        return null;
      },
      getRect(objId) {
        const el = cellRefs.current[objId];
        return el ? el.getBoundingClientRect() : null;
      },
    }),
    [objects],
  );

  const layout = gridLayoutFor(objects.length);
  const rowCount = gridRowCountFor(objects.length);

  return (
    <div
      className="grid gap-2 h-full"
      style={{
        gridTemplateColumns: "repeat(4, 1fr)",
        gridTemplateRows: `repeat(${rowCount}, minmax(0, 1fr))`,
      }}
    >
      {layout.map((cell) => {
        const obj = objects[cell.index];
        if (!obj) return null;
        const cellVotes = votes.filter((v) => v.objectId === obj.id);
        return (
          <ObjectCell
            key={obj.id}
            forwardRef={(el) => {
              cellRefs.current[obj.id] = el;
            }}
            obj={obj}
            options={options}
            votes={cellVotes}
            unlocked={unlocked}
            isOver={hoverObjId === obj.id}
            highlightVoteId={highlightVoteId}
            spanFull={false}
            colStart={cell.colStart}
            onSelfDrag={onSelfDrag}
          />
        );
      })}
    </div>
  );
});
