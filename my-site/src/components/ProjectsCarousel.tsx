'use client';

import React, { useState } from "react";
import { Github, ExternalLink, Eye } from "lucide-react";
import Link from "next/link";

const FALLBACK_IMG = "/fallback.png";

type Project = {
  title: string;
  img: string;
  desc: string;
  stack: string[];
  repo: string;
};

export default function ProjectsCarousel({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {projects.map((p) => (
        <ProjectCard key={p.title} project={p} />
      ))}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [imgSrc, setImgSrc] = useState(project?.img || FALLBACK_IMG);
  const isPriorSystems = project.title === "Prior Systems";

  return (
    <article className="group flex flex-col bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors duration-200 overflow-hidden">
      <div className="relative w-full aspect-video bg-black/30 overflow-hidden">
        <img
          src={imgSrc}
          onError={() => setImgSrc(FALLBACK_IMG)}
          alt={project.title}
          className={`absolute inset-0 w-full h-full ${
            isPriorSystems ? "object-contain p-6" : "object-cover"
          }`}
          style={{
            filter: "saturate(0.9)",
            transition: "transform 350ms ease-out",
          }}
        />
      </div>
      <div className="flex flex-col flex-1 p-3.5 gap-2">
        <h3 className="text-[15px] font-medium tracking-tight text-white leading-snug">
          {project.title}
        </h3>
        <p className="text-[12.5px] text-zinc-400 leading-snug line-clamp-3">
          {project.desc}
        </p>
        <div className="flex flex-wrap gap-1 mt-auto pt-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="px-1.5 py-0.5 bg-white/[0.03] border border-white/10 text-[10px] font-mono text-zinc-300"
            >
              {s}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1.5 border-t border-white/10 mt-1">
          {isPriorSystems && (
            <Link
              href="/projects/prior-systems"
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-white text-black font-mono text-[10px] hover:bg-zinc-200 transition-colors"
            >
              <Eye className="w-3 h-3" />
              <span>Showcase</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </Link>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 border border-white/15 text-zinc-300 font-mono text-[10px] hover:border-white/40 hover:text-white transition-colors"
            >
              <Github className="w-3 h-3" />
              <span>Repo</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
