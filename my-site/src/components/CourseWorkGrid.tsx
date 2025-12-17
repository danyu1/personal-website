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
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {courses.map((category, idx) => (
          <div
            key={category.category}
            className="group relative"
            style={{
              animationDelay: `${idx * 0.1}s`,
            }}
          >
            {/* Category Header */}
            <div className="mb-4 pb-3 border-b border-slate-800/50">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                <h3 className="text-sm font-mono text-amber-500 uppercase tracking-wider">
                  {category.category}
                </h3>
              </div>
              <div className="mt-1 text-xs font-mono text-slate-600">
                {category.items.length} {category.items.length === 1 ? 'course' : 'courses'}
              </div>
            </div>

            {/* Course List */}
            <ul className="space-y-2.5">
              {category.items.map((course, courseIdx) => (
                <li
                  key={course.name}
                  className="group/item relative"
                  style={{
                    animationDelay: `${(idx * 0.1) + (courseIdx * 0.05)}s`,
                  }}
                >
                  <a
                    href={course.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-start gap-2 pl-4 text-sm text-slate-400 hover:text-amber-500 transition-colors duration-300 group/link"
                  >
                    {/* Bullet point */}
                    <div className="absolute left-0 top-2 w-1 h-1 bg-slate-700 group-hover/link:bg-amber-500 transition-colors duration-300"></div>

                    {/* Hover line effect */}
                    <div className="absolute left-0 top-1.5 w-0 h-px bg-amber-500/50 group-hover/link:w-2 transition-all duration-300"></div>

                    <span className="leading-relaxed flex-1">{course.name}</span>

                    <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 flex-shrink-0 mt-0.5" />
                  </a>
                </li>
              ))}
            </ul>

            {/* Subtle background grid on hover */}
            <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-slate-900/20 border border-slate-800/30"></div>
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-amber-500/30"></div>
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-amber-500/30"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
