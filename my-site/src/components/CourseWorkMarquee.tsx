'use client';

import React from "react";

interface CourseworkMarqueeProps {
  items: string[];
}

export default function CourseworkMarquee({ items }: CourseworkMarqueeProps) {
  return (
    <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-4">
      {/* soft blend to sections above/below */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-transparent to-black/20" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-transparent to-black/20" />
      
      <div className="overflow-hidden">
        <div className="flex gap-3 animate-[scrollX_22s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:animate-none px-4">
          {items.concat(items, items).map((c, idx) => (
            <span
              key={`${c}-${idx}`}
              className="shrink-0 px-3 py-1 rounded-full bg-slate-900/70 border border-slate-700 text-sm whitespace-nowrap"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* custom animation */}
      <style>
        {`
          @keyframes scrollX { 
            0% { transform: translateX(0); } 
            100% { transform: translateX(-33.333%); } 
          }
        `}
      </style>
    </div>
  );
}