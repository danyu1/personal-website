'use client';

import React from "react";
import { ExternalLink } from "lucide-react";

interface CourseWorkGridProps {
  courses: {
    category: string;
    items: {
      name: string;
      url: string;
    }[];
  }[];
}

export default function CourseWorkGrid({ courses }: CourseWorkGridProps) {
  return (
    <div className="w-full">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
        {courses.map((category) => (
          <div key={category.category} className="group relative">
            {/* Category Header */}
            <div className="mb-3 pb-2 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-mono text-zinc-300 uppercase tracking-wider">
                  {category.category}
                </h3>
                <span className="text-[10px] font-mono text-zinc-600 tabular-nums">
                  {String(category.items.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Course List */}
            <ul className="space-y-1.5">
              {category.items.map((course) => (
                <li key={course.name} className="group/item relative">
                  <a
                    href={course.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-start gap-2 text-lg text-zinc-400 hover:text-white transition-colors duration-200 group/link"
                  >
                    <span className="leading-snug flex-1">{course.name}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-60 transition-opacity duration-200 flex-shrink-0 mt-1" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
