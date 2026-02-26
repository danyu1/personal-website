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
  FileText,
  Download,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Latent3DPlot from "@/components/Latent3DPlot";
import CourseWorkGrid from "@/components/CourseWorkGrid";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import TechGridBackground from "@/components/TechGridBackground";
import Hero from "@/components/Hero";
import ConferenceShowcase from "@/components/ConferenceShowcase";

//Simple Tag component for pill-like labels
function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-3 py-1 rounded-full bg-slate-900/70 border border-slate-700 text-sm">
      {children}
    </span>
  );
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
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn("relative py-16 z-10", className, isVisible && "animate-on-scroll")}
      aria-labelledby={`${id}-title`}
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px w-8 bg-amber-500"></div>
          {icon}
          <h2
            id={`${id}-title`}
            className="text-2xl font-medium tracking-tight text-white font-mono"
          >
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
};

type AwardItem = {
  title: string;
  description?: string;
  imageSrc?: string; // path to logo/image
};

type AwardGroup = {
  group: string;
  items: AwardItem[];
};

const awards: AwardGroup[] = [
  {
    group: "Fellowships & Scholars",
    items: [
      {
        title: "Polsky Undergraduate Research Fellow, University of Chicago (Summer 2025)",
        description:
          "Full-time, paid summer fellowship ($5,000) supporting faculty-mentored research on innovation, venture creation, and applied problem-solving; contributed quantitative modeling for energy/climate-focused work.",
        imageSrc: "/images/polsky-logo.png", 
      },
      {
        title: "Quad Undergraduate Research Scholar, University of Chicago (2025–26)",
        description:
          "Competitive year-long research scholarship (~10–13 hrs/week) providing $5,000 in support for faculty-guided research and culminating in a presentation at the Undergraduate Research Symposium.",
        imageSrc: "/images/quad-scholar.png",
      },
    ],
  },
  {
    group: "High School — Harvard-Westlake",
    items: [
      {
        title: "SAT National Hispanic Recognition (2023)",
      },
      {
        title: "A Honor Roll (2021–2024)",
      },
      {
        title: "National Spanish Honor Society (2024)",
      },
      {
        title: "Senior Spotlight (2024)",
        description:
          "One of 5 seniors recognized for excellence in character, leadership, and service at Harvard-Westlake.",
      },
    ],
  },
];


export default function DanielHernandezSite() {
  /* ---------- Data ---------- */
  const courseworkCategories = [
    {
      category: "Computer Systems",
      items: [
        {
          name: "Systems Programming I",
          url: "http://collegecatalog.uchicago.edu/search/?P=CMSC+14300",
        },
        {
          name: "Systems Programming II",
          url: "http://collegecatalog.uchicago.edu/search/?P=CMSC+14400",
        },
        {
          name: "Introduction to Computer Security",
          url: "http://collegecatalog.uchicago.edu/search/?P=CMSC+23200",
        },
      ],
    },
    {
      category: "Machine Learning & Data",
      items: [
        {
          name: "Mathematical Foundations of Machine Learning",
          url: "http://collegecatalog.uchicago.edu/search/?P=CMSC+25300",
        },
        {
          name: "Introduction to Data Engineering",
          url: "http://collegecatalog.uchicago.edu/search/?P=DATA+25900",
        },
        {
          name: "Introduction to Data Science I",
          url: "http://collegecatalog.uchicago.edu/search/?P=CMSC+11111",
        },
        {
          name: "Introduction to Data Science II",
          url: "http://collegecatalog.uchicago.edu/search/?P=CMSC+11211",
        },
        {
          name: "Linear Models and Experimental Design",
          url: "http://collegecatalog.uchicago.edu/search/?P=STAT+22400",
        },
      ],
    },
    {
      category: "Mathematics",
      items: [
        {
          name: "Multivariate Calculus",
          url: "http://collegecatalog.uchicago.edu/search/?P=MATH+20300",
        },
        {
          name: "Linear Algebra",
          url: "http://collegecatalog.uchicago.edu/search/?P=MATH+20250",
        },
        {
          name: "Discrete Mathematics",
          url: "http://collegecatalog.uchicago.edu/search/?P=CMSC+27100",
        },
        {
          name: "Theory of Algorithms",
          url: "http://collegecatalog.uchicago.edu/search/?P=CMSC+27200",
        },
      ],
    },
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
      title: "Prior Systems",
      stack: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "Chart.js", "Python"],
      img: "prior-systems-logo.svg",
      desc:
        "Accessible algorithmic trading platform with Black-Scholes options pricing, 15+ technical indicators, real-time portfolio tracking. 15K+ lines of code serving 10+ active users from UChicago organizations and casual users.",
      repo: "https://github.com/danyu1/relay-trader"
    },
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
      title: "AI Emulation of Stochastic Sudden Stratospheric Warming with Interpretable Latent Structure",
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

  const conferenceExperiences = [
    {
      title: "AGU Fall Meeting 2025",
      location: "New Orleans, LA",
      date: "December 13-19, 2025",
      logo: "/images/agu-logo.PNG",
      description:
        "Attended the American Geophysical Union (AGU) Fall Meeting 2025, one of the largest international Earth and space science conferences. Presented research on AI emulation of stochastic sudden stratospheric warming, networked with leading researchers in climate science and machine learning, and attended cutting-edge talks on geophysical modeling and computational methods.",
      highlights: [
        "Presented original research on interpretable AI methods for climate system modeling",
        "Networked with researchers from leading institutions including MIT, NASA GSIS, Nvidia Research, KBR and UC Santa Cruz",
        "Attended technical sessions on machine learning applications in Earth sciences and climate dynamics",
      ],
      images: [
        {
          src: "/images/presenting-at-agu.JPG",
          alt: "Presenting research at AGU 2025",
        },
        {
          src: "/images/agu-poster.png",
          alt: "Poster",
        },
        {
          src: "/images/canel-street.JPG",
          alt: "Canel Street in New Orleans",
        },
        {
          src: "/images/agu-talk.JPG",
          alt: "Attending Oral Presentation on Gray Swans",
        },
      ],
    },
    {
      title: "Aspen Ideas: Climate Chicago",
      location: "Chicago, IL",
      date: "July 20-22, 2025",
      logo: "/images/aspen-logo.png",
      description:
        "Attended Aspen Ideas: Climate Chicago, a premier solutions-oriented convening featuring leaders (Governers of Michigan, Alaska and Chicago), innovators, policymakers, scientists, business and NGO leaders, energy experts, and artists focused on elevating climate and energy solutions. The event was held at Willis Tower's Convene and included main stage keynotes, breakout panels, workshops, and roundtable sessions. UChicago's Institute for Climate and Sustainable Growth served as the official academic thought partner, co-curating sessions on climate finance, carbon removal, and carbon markets.",
      highlights: [
        "Engaged with dialogues aimed at combating climate change through education, inspiration, and actionable solutions",
        "Attended sessions on climate finance, carbon markets, and cutting-edge resilience strategies at one of Chicago's most iconic venues",
      ],
      images: [
        {
          src: "/images/aspen-chicago.JPG",
          alt: "Aspen Ideas Climate Chicago at Willis Tower",
        },
        {
          src: "/images/aspen-panel.jpg",
          alt: "Conference sessions",
        },
      ],
    },
  ];

  /* ---------- Page ---------- */
  return (
    <div className="min-h-screen text-slate-200 relative">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-slate-900 focus:text-white focus:px-3 focus:py-2 focus:rounded"
      >
        Skip to content
      </a>
      <TechGridBackground />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/50 backdrop-blur-sm bg-[rgb(3,7,18)]/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
            <div>
              <div className="font-mono text-sm font-medium text-white">Daniel A. Hernandez</div>
              <div className="text-xs text-slate-500 font-mono">
                CS + Data Science @ UChicago &apos;28
              </div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-1 text-sm font-mono" aria-label="Primary">
            <a className="px-3 py-1.5 text-slate-400 hover:text-amber-500 hover:bg-slate-900/50 transition-colors duration-200" href="#projects">
              Projects
            </a>
            <a className="px-3 py-1.5 text-slate-400 hover:text-amber-500 hover:bg-slate-900/50 transition-colors duration-200" href="#experience">
              Experience
            </a>
            <a className="px-3 py-1.5 text-slate-400 hover:text-amber-500 hover:bg-slate-900/50 transition-colors duration-200" href="#education">
              Education
            </a>
            <a className="px-3 py-1.5 text-slate-400 hover:text-amber-500 hover:bg-slate-900/50 transition-colors duration-200" href="#awards">
              Awards
            </a>
          </nav>
          <div className="flex items-center gap-2 text-sm">
            <a
              className="inline-flex items-center gap-2 px-4 py-1.5 border border-slate-800 text-slate-400 hover:border-amber-500/50 hover:text-amber-500 transition-all duration-300 font-mono text-xs group"
              href="https://github.com/danyu1"
              target="_blank"
              rel="noreferrer"
              aria-label="Daniel on GitHub"
            >
              <Github className="w-3.5 h-3.5" aria-hidden />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content - add top padding for fixed header */}
      <main id="main" className="pt-20 relative z-10">
        <Hero />
      </main>

      <Separator className="bg-slate-800/30 relative z-10" />

      {/* Education */}
      <Section
        id="education"
        title="Education"
        icon={<GraduationCap className="w-5 h-5 text-amber-500" aria-hidden />}
      >
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="bg-slate-900/30 border-slate-800/50 hover:border-slate-700 transition-colors duration-300">
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
          <Card className="bg-slate-900/30 border-slate-800/50 hover:border-slate-700 transition-colors duration-300">
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
              Coursework focus: AP Calculus BC (5), AP Statistics (5), AP Computer Science A (5), AP Spanish Language and Culture (5), Honors Design and Data Structures, Honors Topics in Computer Science
            </CardContent>
          </Card> 
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" title="Skills" icon={<Layers3 className="w-5 h-5 text-amber-500" aria-hidden />}>
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="bg-slate-900/30 border-slate-800/50 hover:border-slate-700 transition-colors duration-300">
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
          <Card className="bg-slate-900/30 border-slate-800/50 hover:border-slate-700 transition-colors duration-300">
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
<Section id="experience" title="Experience" icon={<Waves className="w-5 h-5 text-amber-500" aria-hidden />}>
        <div className="grid gap-4 max-w-none">
          <Card className="bg-slate-900/30 border-slate-800/50 hover:border-slate-700 transition-colors duration-300">
            <CardHeader>
              <div className="flex items-center gap-4">
                <img
                  src="/images/geosci.jpg"
                  alt="UChicago Geophysical Sciences"
                  className="w-16 h-16 object-contain rounded-lg bg-white/5 p-2"
                />
                <div className="flex-1">
                  <CardTitle className="text-white flex items-center justify-between flex-wrap gap-2">
                    <span className="flex-1 min-w-[300px]">
                      Deep Learning Assistant Researcher — University of Chicago, Geophysical Sciences (Prof. Dorian Abbot)
                    </span>
                    <span className="text-xs text-slate-400 whitespace-nowrap">Sep 2024 – Present</span>
                  </CardTitle>
                </div>
              </div>
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
              <div className="mt-4 flex items-center gap-3">
                <a
                  href="/papers/ssw-cvae-emulator.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-amber-500/50 hover:text-amber-400"
                >
                  <FileText className="w-4 h-4" />
                  Preview Paper
                </a>
                <a
                  href="/papers/ssw-cvae-emulator.pdf"
                  download="AI_Emulation_SSW_CVAE.pdf"
                  className="inline-flex items-center gap-2 rounded-lg bg-amber-500/10 border border-amber-500/30 px-4 py-2 text-sm font-medium text-amber-500 transition hover:bg-amber-500/20"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </a>
              </div>
            </CardContent>
          </Card>

          

          <Card className="bg-slate-900/30 border-slate-800/50 hover:border-slate-700 transition-colors duration-300">
            <CardHeader>
              <div className="flex items-center gap-4">
                <img
                  src="/images/xlab.png"
                  alt="XLab"
                  className="w-16 h-16 object-contain rounded-lg bg-white/5 p-2"
                />
                <div className="flex-1">
                  <CardTitle className="text-white flex items-center justify-between flex-wrap gap-2">
                    <span className="flex-1 min-w-[300px]">
                      Computer Vision Researcher — XLab Nuclear Risk and Security Working Group
                    </span>
                    <span className="text-xs text-slate-400 whitespace-nowrap">October 2025 – December 2025</span>
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-slate-300 space-y-1">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Developed automated workflow using Python and geospatial analysis tools (Google Earth Engine, GeoPandas, GDAL) to identify and geolocate AI data centers globally through satellite imagery analysis.
                </li>
                <li>
                  Leveraged machine learning frameworks (TensorFlow, PyTorch) to build classification models that identify data center characteristics from remote sensing imagery.
                </li>
                <li>
                  Produced comprehensive technical report documenting proof-of-concept methodology, validation results, and recommendations for workflow automation.
                </li>
                <li>
                  OSINT techniques and computer vision algorithms to analyze satellite data from multiple sources (Sentinel, Landsat, Planet Labs) for data center detection and capacity estimation.
                </li>
            </ul>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/30 border-slate-800/50 hover:border-slate-700 transition-colors duration-300">
            <CardHeader>
              <div className="flex items-center gap-4">
                <img
                  src="/images/LMI.png"
                  alt="LMI Limu Emu"
                  className="w-16 h-16 object-contain rounded-lg bg-white/5 p-2"
                />
                <div className="flex-1">
                  <CardTitle className="text-white flex items-center justify-between flex-wrap gap-2">
                    <span className="flex-1 min-w-[300px]">
                      Software Engineering Intern — Liberty Mutual Insurance
                    </span>
                    <span className="text-xs text-slate-400 whitespace-nowrap">June 2026 – August 2026</span>
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-slate-300 space-y-1">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Incoming Software Engineering Intern at Liberty Mutual Insurance (Fortune 100) for Summer 2026, joining the Application Development and Rate Optimization team.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/30 border-slate-800/50 hover:border-slate-700 transition-colors duration-300">
            <CardHeader>
              <div className="flex items-center gap-4">
                <img
                  src="/images/oracle-trading.png"
                  alt="Oracle Trading"
                  className="w-16 h-16 object-contain rounded-lg bg-white/5 p-2"
                />
                <div className="flex-1">
                  <CardTitle className="text-white flex items-center justify-between flex-wrap gap-2">
                    <span className="flex-1 min-w-[300px]">
                      Trader & Analyst — Oracle Trading
                    </span>
                    <span className="text-xs text-slate-400 whitespace-nowrap">Jan 2026 – Present</span>
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-slate-300 space-y-1">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Member of UChicago&apos;s premier prediction markets research and trading club, actively trading a ~$100K fund on Polymarket.
                </li>
                <li>
                  Apply quantitative strategies to prediction markets, leveraging statistical analysis and probabilistic reasoning for trade execution.
                </li>
                <li>
                  Part of a select team sponsored by Polymarket and DRW—the only entity on campus enabling members to actively trade their club&apos;s bankroll.
                </li>
              </ul>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>Sponsored by:</span>
                  <img
                    src="/images/polymarket-logo.png"
                    alt="Polymarket"
                    className="h-8 object-contain"
                  />
                  <img
                    src="/images/drw-logo.png"
                    alt="DRW"
                    className="h-8 object-contain"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </Section>

      {/* Publications */}
      <Section
        id="pubs"
        title="Publications"
        icon={<Sparkles className="w-5 h-5 text-amber-500" aria-hidden />}
      >
        <Card className="bg-slate-900/30 border-slate-800/50 hover:border-slate-700 transition-colors duration-300">
          <CardContent className="p-4 text-sm text-slate-300">
            Hernandez D, Boscu C, Alvarez‑Ventura F, Abbot D.S, Finkel J, Chattopadhay A, Hassanzadeh P.
            <em> AI Emulation of Stochastic Sudden Stratospheric Warming with Interpretable Latent Structure. AGU James.</em>.
          </CardContent>
        </Card>
      </Section>

      {/* Coursework */}
      <Section
      id="coursework"
      title="Coursework"
      icon={<Brain className="w-5 h-5 text-amber-500" aria-hidden />}
      >
        <CourseWorkGrid courses={courseworkCategories} />
      </Section>

      {/* Projects */}
      <Section id="projects" title="Projects" icon={<Layers3 className="w-5 h-5 text-amber-500" aria-hidden />}>
        <ProjectsCarousel projects={projects} />
      </Section>

      {/* Presentations */}
      <Section id="talks" title="Presentations" icon={<Waves className="w-5 h-5 text-amber-500" aria-hidden />}>
        <div className="grid gap-4">
          {presentations.map((t, idx) => (
            <Card key={`${t.title}-${idx}`} className="bg-slate-900/30 border-slate-800/50 hover:border-slate-700 transition-colors duration-300">
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
      <Section id="leadership" title="Leadership & Activities" icon={<Trophy className="w-5 h-5 text-amber-500" aria-hidden />}>
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="bg-slate-900/30 border-slate-800/50 hover:border-slate-700 transition-colors duration-300">
            <CardHeader>
              <CardTitle className="text-white">Varsity Collegiate Track & Field Athlete</CardTitle>
              <div className="text-xs text-slate-400">UChicago (2024–Present)</div>
            </CardHeader>
            <CardContent className="text-sm text-slate-300">
              Competed as a jumper for UChicago Athletics; ranked 95th nationally in NCAA Division III triple jump as a first‑year.
            </CardContent>
          </Card>
          <Card className="bg-slate-900/30 border-slate-800/50 hover:border-slate-700 transition-colors duration-300">
            <CardHeader>
              <CardTitle className="text-white">Phoenix STEM Scholar & Research Mentor</CardTitle>
              <div className="text-xs text-slate-400">UChicago (2024–Present)</div>
            </CardHeader>
            <CardContent className="text-sm text-slate-300">
              Selected via competitive program supporting first‑gen & underrepresented students in STEM. Mentored incoming students on research paths and course planning.
            </CardContent>
          </Card>
        </div>

        {/* Conference Experience - Full Width Breakout */}
        <div className="mt-12 -mx-6 md:-mx-12 lg:-mx-24">
          <div className="px-6 md:px-12 lg:px-24 py-8 bg-gradient-to-b from-slate-900/20 to-transparent border-y border-slate-800/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-amber-500"></div>
              <h3 className="text-xl font-medium tracking-tight text-white font-mono">
                Conference Experience
              </h3>
            </div>
            <div className="space-y-12">
              {conferenceExperiences.map((conference, idx) => (
                <ConferenceShowcase key={idx} experience={conference} />
              ))}
            </div>
          </div>
        </div>
      </Section>

     {/* Awards & Honors */}
<Section
  id="awards"
  title="Awards & Honors"
  icon={<Award className="w-5 h-5 text-amber-500" aria-hidden />}
>
  <div className="grid gap-4">
    {awards.map((grp) => (
      <Card
        key={grp.group}
        className="bg-slate-900/30 border-slate-800/50 hover:border-slate-700 transition-colors duration-300"
      >
        <CardHeader>
          <CardTitle className="text-base text-white">
            {grp.group}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {grp.items.map((it) => (
            <div
              key={it.title}
              className="flex items-start gap-3"
            >
              {it.imageSrc && (
                <img
                  src={it.imageSrc}
                  alt={it.title}
                  className="w-15 h-15 rounded-md object-contain mt-0.5"
                />
              )}
              <div className="text-sm text-white">
                <div className="font-medium">
                  {it.title}
                </div>
                {it.description && (
                  <p className="text-xs text-slate-300 mt-1 leading-snug">
                    {it.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    ))}
  </div>
</Section>

      {/* Languages */}
      <Section id="languages" title="Languages" icon={<Layers3 className="w-5 h-5 text-amber-500" aria-hidden />}>
        <div className="flex flex-wrap gap-2">
          <Tag>English — Native</Tag>
          <Tag>Spanish — Native</Tag>
        </div>
      </Section>

      {/* Footer — no contact section at the bottom */}
      <footer className="py-10 border-t border-slate-800/60 bg-gradient-to-b from-transparent to-slate-950/60 relative z-10">
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
