'use client';

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  Github,
  GraduationCap,
  Award,
  Sparkles,
  ChevronUp,
  Brain,
  Layers3,
  Waves,
  Trophy,
  PersonStanding,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Latent3DPlot from "@/components/Latent3DPlot";
import CourseWorkMarquee from "@/components/CourseWorkMarquee";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import ArcCometBackground from "@/components/ArcCometBackground";
import NeuralFieldBG from "@/components/NeuralFieldBG";

const FALLBACK_IMG = `data:image/svg+xml;utf8,${encodeURIComponent(
'<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900"><rect width="100%" height="100%" fill="#111"/><text x="50%" y="50%" fill="#aaa" font-family="sans-serif" font-size="24" text-anchor="middle" dominant-baseline="middle">Image not found</text></svg>'
)}`;

//Simple Tag component for pill-like labels
function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-3 py-1 rounded-full bg-slate-900/70 border border-slate-700 text-sm">
      {children}
    </span>
  );
}

/* === Reduced-motion hook === */
function usePrefersReducedMotion() {
  const prefers = useMemo(
    () =>
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false,
    []
  );
  return prefers;
}


const Section = ({
  id,
  title,
  icon,
  children,
  className = "",
}: {
  id: string;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) => (
  <section id={id} className={cn("relative py-10", className)} aria-labelledby={`${id}-title`}>
    <div className="max-w-5xl mx-auto px-4">
      <div className="flex items-center gap-2 mb-6">
        {icon}
        <h2 id={`${id}-title`} className="text-2xl font-semibold tracking-tight text-slate-100">
          {title}
        </h2>
      </div>
      {children}
    </div>
  </section>
);

export default function DanielHernandezSite() {
  /* ---------- Data ---------- */
  const coursework = [
    "Systems Programming I",
    "Systems Programming II",
    "Mathematical Foundations of Machine Learning",
    "Introduction to Data Engineering",
    "Linear Models and Experimental Design",
    "Multivariate Calculus",
    "Linear Algebra",
    "Discrete Mathematics",
    "Introduction to Computer Security",
    "Introduction to Data Science I",
  ];

  const skillsPro = [
    "Java",
    "Python",
    "PyTorch",
    "scikit-learn",
    "pandas",
    "CUDA",
    "C",
    "HTML/CSS",
    "TypeScript",
    "JavaScript",
    "React.js",
    "Git",
  ];
  const skillsExp = ["R", "Bash", "SQL", "Unix/Linux"];

  const projects = [
    {
      title: "Athlete Performance Forecasting Platform",
      stack: ["Python", "Playwright", "BeautifulSoup", "pandas", "NumPy", "PyTorch", "LSTM"],
      img: "/images/flightphase.png",
      desc:
        "End-to-end pipeline for NCAA T&F results → hierarchical LSTM for next-season peak prediction; leak-free eval and detailed diagnostics.",
      repo: "https://github.com/danyu1/FlightPhase"
    },
    {
      title: "GIT (from scratch)",
      stack: ["Java"],
      img: "/images/git.png",
      desc:
        "Simplified Git with staging/committing/branching/merging, object-store persistence, and conflict resolution implemented from first principles.",
      repo:"https://github.com/danyu1/GitFinalAssignment"
    },
    {
      title: "Custom Memory Allocator (C)",
      stack: ["C", "mmap", "POSIX"],
      img: "/images/cma.png",
      desc:
        "Dynamic allocator using first-fit strategy with splitting/coalescing, alignment guarantees, and metadata tracking; built atop mmap for granular control.",
      repo:"https://github.com/danyu1/Simple-Malloc"
    },
    {
      title: "Minimal Unix Shell (C)",
      stack: ["C", "POSIX"],
      img: "/images/minimal-shell.jpg",
      desc:
        "Unix-like shell supporting interactive/batch modes, built-ins (cd, pwd, exit), external commands via execvp, stdout redirection (>, >+), semicolon parser, and robust error handling.",
      repo:"https://github.com/danyu1/My-Shell"
    },
  ];

  const presentations = [
    {
      title:
        "Developing AI Emulator Tools for Extreme Events with Application to Heat Waves and Cold Snaps",
      venue: "UChicago Undergraduate Research Symposium 2025 – Oral Presentation",
      authors:
        "Constantino-Daniel Boscu; Daniel Hernandez; Fabio Alvarez Ventura; Advisor: Dorian Abbot",
    },
    {
      title: "Interpretable CVAE for Stochastic System Modeling",
      venue: "AGU Fall Meeting 2025 – Accepted Paper, New Orleans, LA",
      authors:
        "D. Hernandez, C. Boscu, F. Alvarez-Ventura, D.S. Abbot, J. Finkel, A. Chattopadhay, P. Hassanzadeh",
    },
    {
      title: "Interpretable CVAE for Stochastic System Modeling",
      venue:
        "Phoenix STEM Scholars Annual Research Conference 2026 – Oral Presentation (Scheduled)",
      authors:
        "D. Hernandez, C. Boscu, F. Alvarez-Ventura, D.S. Abbot, J. Finkel, A. Chattopadhay, P. Hassanzadeh",
    },
  ];

  const awards = [
    {
      group: "High School — Harvard-Westlake",
      items: [
        "SAT National Hispanic Recognition (2023)",
        "A Honor Roll (2021–2024)",
        "National Spanish Honor Society (2024)",
        "Senior Spotlight (2024) — Awarded to 5 students for excellence in character, leadership, and service at Harvard-Westlake",
      ],
    },
    {
      group: "University of Chicago",
      items: [
        "Polsky Fellow (2025) — Polsky Center for Entrepreneurship and Innovation",
      ],
    },
  ];

  /* ---------- Page ---------- */
  return (
    <div className="min-h-screen text-slate-200">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-slate-900 focus:text-white focus:px-3 focus:py-2 focus:rounded"
      >
        Skip to content
      </a>
      <NeuralFieldBG />

      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/40 border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-fuchsia-500 to-amber-400 ring-2 ring-slate-700 grid place-items-center">
              <PersonStanding className="w-7 h-7" aria-hidden />
            </div>
            <div>
              <div className="font-semibold leading-tight">Daniel A. Hernandez</div>
              <div className="text-xs text-slate-400">
                B.S. Computer Science + Minor in Data Science @ UChicago (’28)
              </div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-3 text-sm" aria-label="Primary">
            <a className="hover:underline" href="#projects">
              Projects
            </a>
            <a className="hover:underline" href="#experience">
              Experience
            </a>
            <a className="hover:underline" href="#education">
              Education
            </a>
            <a className="hover:underline" href="#awards">
              Awards
            </a>
          </nav>
          <div className="flex items-center gap-2 text-sm">
            <a
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-800/70 border border-slate-700 hover:bg-slate-800 transition"
              href="https://github.com/danyu1"
              target="_blank"
              rel="noreferrer"
              aria-label="Daniel on GitHub"
            >
              <Github className="w-4 h-4" aria-hidden /> github.com/danyu1
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="hero" className="relative pt-16 pb-6" aria-label="Hero">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-[220px,1fr] gap-8 items-center">
          
          {/* Profile photo */}
          <div className="flex flex-col items-center">
            <div className="relative w-48 h-48 rounded-2xl ring-2 ring-slate-700 overflow-hidden shadow-xl">
              <Image
                src="/images/polskyfellow.jpg"
                alt="Danny Hernandez profile photo"
                width={192}
                height={192}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="mt-3 text-xs text-slate-400 text-center">
              Polsky Fellow · University of Chicago
            </div>
          </div>

          {/* Hero text */}
          <div id="main">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight flex items-center gap-3">
              Welcome, I&apos;m Danny!
              <Zap className="w-7 h-7 text-fuchsia-300" aria-hidden />
              I&apos;m a...

            </h1>
            <p className="mt-4 text-slate-300/90 leading-relaxed">
              UChicago artificial intelligence researcher & developer exploring Conditional VAEs for regime
              transitions in dynamical systems. I&apos;m also a varsity collegiate athlete (long jump, triple jump) at the University of Chicago!
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Tag>AI Research Assistant — Geophysical Sciences</Tag>
              <Tag>Full-Stack Developer — Keysar Lab</Tag>
              <Tag>Varsity Horizontal Jumper</Tag>
            </div>
          </div>
        </div>

        {/* Animation */}
        <div className="max-w-5xl mx-auto px-4 mt-6">
          <ArcCometBackground />
        </div>
      </section>

      <Separator className="bg-slate-800/60" />

      {/* Education */}
      <Section
        id="education"
        title="Education"
        icon={<GraduationCap className="w-5 h-5 text-fuchsia-300" aria-hidden />}
      >
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="bg-slate-900/60 border-slate-800">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Image
                  src="/images/uchicagologo.png"  // put your logo file in /public/images/
                  alt="University of Chicago Logo"
                  width={36}
                  height={36}
                  className="rounded-sm"
                />
                <CardTitle className="text-slate-100">University of Chicago</CardTitle>
              </div>
              <div className="text-sm text-slate-400">
                Chicago, IL — B.S. Computer Science (’28), Minor in Data Science
              </div>
            </CardHeader>
            <CardContent className="text-sm text-slate-300">
              Coursework focus: Systems Programming I & II, Mathematical Foundations of Machine Learning, 
              Introduction to Data Engineering, Linear Models and Experimental Design, Multivariate Calculus, 
              Linear Algebra, Discrete Mathematics
            </CardContent>
          </Card>
          <Card className="bg-slate-900/60 border-slate-800">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Image
                  src="/images/hwlogo.png"  // put your logo file in /public/images/
                  alt="University of Chicago Logo"
                  width={65}
                  height={65}
                  className="rounded-sm"
                />
                <CardTitle className="text-slate-100">Harvard-Westlake</CardTitle>
              </div>
              <div className="text-sm text-slate-400">
                Studio City, CA — GPA: 3.83/4.0
              </div>
            </CardHeader>
            <CardContent className="text-sm text-slate-300">
              Coursework focus: Coursework focus: AP Calculus BC (5), AP Statistics (5), AP Computer Science A (5), AP Spanish Language and Culture (5), Honors Design and Data Structures, Honors Topics in Computer Science
            </CardContent>
          </Card> 
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" title="Skills" icon={<Layers3 className="w-5 h-5 text-amber-300" aria-hidden />}>
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="bg-slate-900/60 border-slate-800">
            <CardHeader>
              <CardTitle className="text-slate-100">Proficient</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {skillsPro.map((s) => (
                <Badge key={s} className="bg-slate-900/70 border-slate-700">
                  {s}
                </Badge>
              ))}
            </CardContent>
          </Card>
          <Card className="bg-slate-900/60 border-slate-800">
            <CardHeader>
              <CardTitle className="text-slate-100">Experience</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {skillsExp.map((s) => (
                <Badge key={s} className="bg-slate-900/70 border-slate-700">
                  {s}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience" title="Experience" icon={<Waves className="w-5 h-5 text-fuchsia-300" aria-hidden />}>
        <div className="grid gap-4">
          <Card className="bg-slate-900/60 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>
                  AI Research Assistant — University of Chicago, Geophysical Sciences (Prof. Dorian Abbot)
                </span>
                <span className="text-xs text-slate-400">Sep 2024 – Present</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-300 space-y-2">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Designed a novel CVAE to model & autoregress regime transitions in the Holton–Mass system.
                </li>
                <li>
                  Used variational inference with KL-annealing and posterior‑collapse mitigation for stable training.
                </li>
                <li>
                  Found non-trivial latent clusters via PCA aligned with physical regimes; improved interpretability.
                </li>
                <li>
                  Emulated a stochastic PDE climate system while balancing transition statistics & distributional fidelity.
                </li>
                <li>10 hrs/wk (school), 40 hrs/wk (summer); biweekly meetings; driving toward publication.</li>
              </ul>
              <div className="mt-3">
                <Latent3DPlot />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>
                  Full‑Stack Developer — UChicago Psychology (Multilingualism & Decision Making Lab)
                </span>
                <span className="text-xs text-slate-400">Aug 2025 – Present</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-300 space-y-1">
              <ul className="list-disc pl-5 space-y-1">
                <li>Modernized & deployed the lab website to improve accessibility and participation.</li>
                <li>
                  Built automated communication tools for outreach & study coordination; reduced manual workload.
                </li>
                <li>Translated research needs into robust, scalable technical solutions.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Publications */}
      <Section
        id="pubs"
        title="Publications (Forthcoming)"
        icon={<Sparkles className="w-5 h-5 text-fuchsia-300" aria-hidden />}
      >
        <Card className="bg-slate-900/60 border-slate-800">
          <CardContent className="p-4 text-sm text-slate-300">
            Hernandez D, Boscu C, Alvarez‑Ventura F, Abbot D.S, Finkel J, Chattopadhay A, Hassanzadeh P.
            <em> Interpretable Conditional Variational Autoencoder for Stochastic System Modeling</em>.
          </CardContent>
        </Card>
      </Section>

      {/* Coursework */}
      <Section
      id="coursework"
      title="Coursework"
      icon={<Brain className="w-5 h-5 text-amber-300" aria-hidden />}
      >
        <CourseWorkMarquee items={coursework} />
      </Section>

      {/* Projects */}
      <Section id="projects" title="Projects" icon={<Layers3 className="w-5 h-5 text-amber-300" aria-hidden />}>
        <ProjectsCarousel projects={projects} />
      </Section>

      {/* Presentations */}
      <Section id="talks" title="Presentations" icon={<Waves className="w-5 h-5 text-fuchsia-300" aria-hidden />}>
        <div className="grid gap-4">
          {presentations.map((t) => (
            <Card key={t.title} className="bg-slate-900/60 border-slate-800">
              <CardHeader>
                <CardTitle className="text-base text-slate-100">{t.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-300">
                <div className="text-slate-400">{t.venue}</div>
                <div className="mt-1">{t.authors}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Leadership & Activities */}
      <Section id="leadership" title="Leadership & Activities" icon={<Trophy className="w-5 h-5 text-amber-300" aria-hidden />}>
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="bg-slate-900/60 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Varsity Collegiate Track & Field Athlete</CardTitle>
              <div className="text-xs text-slate-400">UChicago (2024–Present)</div>
            </CardHeader>
            <CardContent className="text-sm text-slate-300">
              Competed as a jumper for UChicago Athletics; ranked 95th nationally in NCAA Division III triple jump as a first‑year.
            </CardContent>
          </Card>
          <Card className="bg-slate-900/60 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Phoenix STEM Scholar & Research Mentor</CardTitle>
              <div className="text-xs text-slate-400">UChicago (2024–Present)</div>
            </CardHeader>
            <CardContent className="text-sm text-slate-300">
              Selected via competitive program supporting first‑gen & underrepresented students in STEM. Mentored incoming students on research paths and course planning.
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Awards & Honors */}
      <Section id="awards" title="Awards & Honors" icon={<Award className="w-5 h-5 text-fuchsia-300" aria-hidden />}>
        <div className="grid gap-4">
          {awards.map((grp) => (
            <Card key={grp.group} className="bg-slate-900/60 border-slate-800">
              <CardHeader>
                <CardTitle className="text-base text-white">{grp.group}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-white">
                <ul className="list-disc pl-5 space-y-1">
                  {grp.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Languages */}
      <Section id="languages" title="Languages" icon={<Layers3 className="w-5 h-5 text-amber-300" aria-hidden />}>
        <div className="flex flex-wrap gap-2">
          <Tag>English — Native</Tag>
          <Tag>Spanish — Native</Tag>
        </div>
      </Section>

      {/* Footer — no contact section at the bottom */}
      <footer className="py-10 border-t border-slate-800/60 bg-gradient-to-b from-transparent to-slate-950/60">
        <div className="max-w-5xl mx-auto px-4 text-sm text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>© {new Date().getFullYear()} Daniel A. Hernandez</div>
          <a
            className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-slate-900/60 border border-slate-700 hover:bg-slate-900"
            href="#hero"
            aria-label="Back to top"
          >
            <ChevronUp className="w-4 h-4" /> Top
          </a>
        </div>
      </footer>
    </div>
  );
}
