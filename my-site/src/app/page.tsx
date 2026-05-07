'use client';

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  Github,
  GraduationCap,
  Award,
  Sparkles,
  ChevronUp,
  Layers3,
  Waves,
  Trophy,
  FileText,
  Download,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Latent3DPlot from "@/components/Latent3DPlot";
import CourseWorkGrid from "@/components/CourseWorkGrid";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import Hero from "@/components/Hero";
import ConferenceShowcase from "@/components/ConferenceShowcase";

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
      className={cn(
        "relative py-10 z-10 border-t border-white/10",
        className,
        isVisible && "animate-on-scroll"
      )}
      aria-labelledby={`${id}-title`}
    >
      <div className="max-w-[1700px] mx-auto px-16 lg:px-28">
        <div className="flex items-center gap-4 mb-7">
          <div className="h-0.5 w-14 bg-white/60"></div>
          {icon}
          <h2
            id={`${id}-title`}
            className="text-4xl font-medium tracking-tight text-white font-mono"
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
        {
          name: "Distributed Systems",
          url: "http://collegecatalog.uchicago.edu/search/?P=CMSC+23310",
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
        {
          name: "Options and Volatility Products",
          url: "http://collegecatalog.uchicago.edu/search/?P=FINM+37500",
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
        "Accessible algorithmic trading platform with Black-Scholes options pricing, 15+ technical indicators, and real-time portfolio tracking. Used by students from UChicago organizations and individual traders.",
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
    <div className="min-h-screen text-zinc-200 relative">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-zinc-900 focus:text-white focus:px-3 focus:py-2 focus:rounded"
      >
        Skip to content
      </a>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-sm bg-[#0a0a0a]/85">
        <div className="max-w-[1700px] mx-auto px-16 lg:px-28 py-3.5 flex items-center justify-between">
          <div className="font-mono text-lg font-medium text-white">
            Daniel A. Hernandez
            <span className="text-zinc-500 ml-2 hidden sm:inline">· CS + Data Science @ UChicago &apos;28</span>
          </div>
          <nav className="hidden md:flex items-center gap-1 text-lg font-mono" aria-label="Primary">
            <a className="px-3 py-1.5 text-zinc-400 hover:text-white transition-colors duration-200" href="#education">
              Education
            </a>
            <a className="px-3 py-1.5 text-zinc-400 hover:text-white transition-colors duration-200" href="#experience">
              Experience
            </a>
            <a className="px-3 py-1.5 text-zinc-400 hover:text-white transition-colors duration-200" href="#research">
              Research
            </a>
            <a className="px-3 py-1.5 text-zinc-400 hover:text-white transition-colors duration-200" href="#projects">
              Projects
            </a>
            <a className="px-3 py-1.5 text-zinc-400 hover:text-white transition-colors duration-200" href="#awards">
              Awards
            </a>
            <a className="px-3 py-1.5 text-zinc-400 hover:text-white transition-colors duration-200" href="#leadership">
              Activities
            </a>
          </nav>
          <div className="flex items-center gap-2 text-lg">
            <a
              className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/15 text-zinc-300 hover:border-white/40 hover:text-white transition-all duration-300 font-mono text-base"
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

      {/* Education */}
      <Section
        id="education"
        title="Education"
        icon={<GraduationCap className="w-5 h-5 text-white/80" aria-hidden />}
      >
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="bg-white/[0.02] border-white/10 hover:border-white/20 transition-colors duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-4">
                <Image
                  src="/images/uchicagologo.png"
                  alt="University of Chicago Logo"
                  width={88}
                  height={88}
                  className="rounded-sm"
                />
                <CardTitle className="text-zinc-100 text-3xl tracking-tight">University of Chicago</CardTitle>
              </div>
              <div className="text-lg text-zinc-400">
                Chicago, IL — B.S. Computer Science (&apos;28), Minor in Data Science
              </div>
            </CardHeader>
            <CardContent className="text-lg text-zinc-300 leading-relaxed">
              Coursework focus: Systems Programming I & II, Distributed Systems, Mathematical
              Foundations of Machine Learning, Introduction to Data Engineering, Linear Models
              and Experimental Design, Multivariate Calculus, Linear Algebra, Discrete
              Mathematics, Options and Volatility Products
            </CardContent>
          </Card>
          <Card className="bg-white/[0.02] border-white/10 hover:border-white/20 transition-colors duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-4">
                <Image
                  src="/images/hwlogo.png"
                  alt="Harvard-Westlake Logo"
                  width={88}
                  height={88}
                  className="rounded-sm"
                />
                <CardTitle className="text-zinc-100 text-3xl tracking-tight">Harvard-Westlake</CardTitle>
              </div>
              <div className="text-lg text-zinc-400">Studio City, CA — GPA: 3.83/4.0</div>
            </CardHeader>
            <CardContent className="text-lg text-zinc-300 leading-relaxed">
              Coursework focus: AP Calculus BC (5), AP Statistics (5), AP Computer Science A
              (5), AP Spanish Language and Culture (5), Honors Design and Data Structures,
              Honors Topics in Computer Science
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Skills & Languages */}
      <Section
        id="skills"
        title="Skills & Languages"
        icon={<Layers3 className="w-5 h-5 text-white/80" aria-hidden />}
      >
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="bg-white/[0.02] border-white/10 hover:border-white/20 transition-colors duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-zinc-100 text-lg">Proficient</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-1.5">
              {skillsPro.map((s) => (
                <Badge key={s} className="bg-white/[0.03] border-white/15 text-lg px-2.5 py-0.5">
                  {s}
                </Badge>
              ))}
            </CardContent>
          </Card>
          <Card className="bg-white/[0.02] border-white/10 hover:border-white/20 transition-colors duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-zinc-100 text-lg">Experience</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-1.5">
              {skillsExp.map((s) => (
                <Badge key={s} className="bg-white/[0.03] border-white/15 text-lg px-2.5 py-0.5">
                  {s}
                </Badge>
              ))}
            </CardContent>
          </Card>
          <Card className="bg-white/[0.02] border-white/10 hover:border-white/20 transition-colors duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-zinc-100 text-lg">Languages</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-1.5">
              <Badge className="bg-white/[0.03] border-white/15 text-lg px-2.5 py-0.5">
                English — Native
              </Badge>
              <Badge className="bg-white/[0.03] border-white/15 text-lg px-2.5 py-0.5">
                Spanish — Native
              </Badge>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Experience */}
<Section id="experience" title="Experience" icon={<Waves className="w-5 h-5 text-white/80" aria-hidden />}>
        <div className="space-y-3">
          <Card className="bg-white/[0.02] border-white/10 hover:border-white/20 transition-colors duration-300">
            <CardHeader>
              <div className="flex items-center gap-4">
                <img
                  src="/images/geosci.jpg"
                  alt="UChicago Geophysical Sciences"
                  className="w-24 h-24 object-contain rounded-lg bg-white/5 p-2"
                />
                <div className="flex-1">
                  <CardTitle className="text-white flex items-center justify-between flex-wrap gap-2 text-2xl">
                    <span className="flex-1 min-w-[300px]">
                      Deep Learning Assistant Researcher — University of Chicago, Geophysical Sciences (Prof. Dorian Abbot)
                    </span>
                    <span className="text-base text-zinc-400 whitespace-nowrap">Sep 2024 – Present</span>
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="text-lg text-zinc-300 space-y-2">
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
                  className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.03] px-4 py-2 text-lg font-medium text-zinc-200 transition hover:border-white/40 hover:text-white"
                >
                  <FileText className="w-4 h-4" />
                  Preview Paper
                </a>
                <a
                  href="/papers/ssw-cvae-emulator.pdf"
                  download="AI_Emulation_SSW_CVAE.pdf"
                  className="inline-flex items-center gap-2 rounded-lg bg-white/10 border border-white/25 px-4 py-2 text-lg font-medium text-white transition hover:bg-white/15 hover:border-white/40"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Other roles — each on its own row */}
          <Card className="bg-white/[0.02] border-white/10 hover:border-white/20 transition-colors duration-300">
            <CardHeader>
              <div className="flex items-center gap-4">
                <img
                  src="/images/xlab.png"
                  alt="XLab"
                  className="w-24 h-24 object-contain rounded-lg bg-white/5 p-2"
                />
                <div className="flex-1">
                  <CardTitle className="text-white flex items-center justify-between flex-wrap gap-2 text-2xl">
                    <span className="flex-1 min-w-[300px]">
                      Computer Vision Researcher — XLab Nuclear Risk and Security Working Group
                    </span>
                    <span className="text-base text-zinc-400 whitespace-nowrap">October 2025 – December 2025</span>
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="text-lg text-zinc-300 space-y-1">
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

          <Card className="bg-white/[0.02] border-white/10 hover:border-white/20 transition-colors duration-300">
            <CardHeader>
              <div className="flex items-center gap-4">
                <img
                  src="/images/oracle-trading.png"
                  alt="Oracle Trading"
                  className="w-24 h-24 object-contain rounded-lg bg-white/5 p-2"
                />
                <div className="flex-1">
                  <CardTitle className="text-white flex items-center justify-between flex-wrap gap-2 text-2xl">
                    <span className="flex-1 min-w-[300px]">
                      Software Engineer & Analyst — Oracle Trading
                    </span>
                    <span className="text-base text-zinc-400 whitespace-nowrap">Jan 2026 – Present</span>
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="text-lg text-zinc-300 space-y-1">
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
                <div className="flex items-center gap-3 text-base text-zinc-400">
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

          <Card className="bg-white/[0.02] border-white/10 hover:border-white/20 transition-colors duration-300">
            <CardHeader>
              <div className="flex items-center gap-4">
                <img
                  src="/images/popid.png"
                  alt="PopID"
                  className="w-24 h-24 object-contain rounded-lg bg-white/5 p-2"
                />
                <div className="flex-1">
                  <CardTitle className="text-white flex items-center justify-between flex-wrap gap-2 text-2xl">
                    <span className="flex-1 min-w-[300px]">
                      Software Engineer Intern — Recognition Algorithms &amp; SDK, PopID
                    </span>
                    <span className="text-base text-zinc-400 whitespace-nowrap">Jun – Aug 2026 · Los Angeles, CA</span>
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="text-lg text-zinc-300 space-y-1">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Will develop and benchmark facial and palm recognition algorithms, evaluating model performance across RGB and NIR imaging conditions for production biometric pipelines.
                </li>
                <li>
                  Will contribute to Java SDK development controlling sensor hardware in proprietary biometric cameras, including code review, refactoring, and integration testing.
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/[0.02] border-white/10 hover:border-white/20 transition-colors duration-300">
            <CardHeader>
              <div className="flex items-center gap-4">
                <img
                  src="/images/ms_logo.png"
                  alt="Morgan Stanley"
                  className="w-24 h-24 object-contain rounded-lg bg-white/5 p-2"
                />
                <div className="flex-1">
                  <CardTitle className="text-white flex items-center justify-between flex-wrap gap-2 text-2xl">
                    <span className="flex-1 min-w-[300px]">
                      Equity Derivatives Trading &amp; Structuring Summer Analyst — Morgan Stanley
                    </span>
                    <span className="text-base text-zinc-400 whitespace-nowrap">Summer 2027</span>
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="text-lg text-zinc-300 space-y-1">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Incoming Summer Analyst on the Equity Derivatives Trading &amp; Structuring desk, working on structured products and derivatives solutions for institutional clients.
                </li>
              </ul>
            </CardContent>
          </Card>

        </div>
      </Section>

      {/* Research — Publications + Presentations combined */}
      <Section
        id="research"
        title="Research"
        icon={<Sparkles className="w-5 h-5 text-white/80" aria-hidden />}
      >
        {/* Publication */}
        <Card className="bg-white/[0.02] border-white/10 hover:border-white/20 transition-colors duration-300 mb-3">
          <CardHeader className="pb-2">
            <div className="flex items-baseline justify-between flex-wrap gap-2">
              <CardTitle className="text-zinc-100 text-lg">
                AI Emulation of Stochastic Sudden Stratospheric Warming with Interpretable Latent Structure
              </CardTitle>
              <span className="text-base font-mono text-zinc-500 uppercase tracking-wider">
                Publication · AGU JAMES
              </span>
            </div>
          </CardHeader>
          <CardContent className="text-lg text-zinc-300 leading-relaxed">
            Hernandez D, Boscu C, Alvarez‑Ventura F, Abbot D.S, Finkel J, Chattopadhay A, Hassanzadeh P.
          </CardContent>
        </Card>

        {/* Presentations as 3-col grid */}
        <div className="text-base font-mono text-zinc-500 mb-2 uppercase tracking-wider">
          Presentations
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {presentations.map((t, idx) => (
            <Card key={`${t.title}-${idx}`} className="bg-white/[0.02] border-white/10 hover:border-white/20 transition-colors duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg leading-snug text-zinc-100">{t.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-lg text-zinc-300 leading-snug space-y-1">
                <div className="text-zinc-400">{t.venue}</div>
                <div className="text-base">{t.authors}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" title="Projects" icon={<Layers3 className="w-5 h-5 text-white/80" aria-hidden />}>
        <ProjectsCarousel projects={projects} />
      </Section>

      {/* Coursework */}
      <Section
        id="coursework"
        title="Coursework"
        icon={<GraduationCap className="w-5 h-5 text-white/80" aria-hidden />}
      >
        <CourseWorkGrid courses={courseworkCategories} />
      </Section>

      {/* Awards & Honors */}
      <Section
        id="awards"
        title="Awards & Honors"
        icon={<Award className="w-5 h-5 text-white/80" aria-hidden />}
      >
        <div className="grid md:grid-cols-2 gap-4">
          {awards.map((grp) => (
            <Card
              key={grp.group}
              className="bg-white/[0.02] border-white/10 hover:border-white/20 transition-colors duration-300"
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-3xl text-white tracking-tight">{grp.group}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {grp.items.map((it) => (
                  <div key={it.title} className="flex items-start gap-4">
                    {it.imageSrc && (
                      <img
                        src={it.imageSrc}
                        alt={it.title}
                        className="w-20 h-20 rounded-sm object-contain mt-0.5 flex-shrink-0"
                      />
                    )}
                    <div className="text-white min-w-0">
                      <div className="text-xl font-medium leading-snug">{it.title}</div>
                      {it.description && (
                        <p className="text-base text-zinc-400 mt-1 leading-snug">
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

      {/* Leadership & Activities + Conferences */}
      <Section
        id="leadership"
        title="Leadership & Activities"
        icon={<Trophy className="w-5 h-5 text-white/80" aria-hidden />}
      >
        {/* Activities — 2-col */}
        <div className="grid md:grid-cols-2 gap-3 mb-4">
          <Card className="bg-white/[0.02] border-white/10 hover:border-white/20 transition-colors duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-white">
                Varsity Collegiate Track & Field Athlete
              </CardTitle>
              <div className="text-base text-zinc-400">UChicago · 2024–Present</div>
            </CardHeader>
            <CardContent className="text-lg text-zinc-300 leading-snug">
              Competed as a jumper for UChicago Athletics; ranked 95th nationally in NCAA
              Division III triple jump as a first‑year.
            </CardContent>
          </Card>
          <Card className="bg-white/[0.02] border-white/10 hover:border-white/20 transition-colors duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-white">
                Phoenix STEM Scholar & Research Mentor
              </CardTitle>
              <div className="text-base text-zinc-400">UChicago · 2024–Present</div>
            </CardHeader>
            <CardContent className="text-lg text-zinc-300 leading-snug">
              Selected via competitive program supporting first‑gen & underrepresented students
              in STEM. Mentored incoming students on research paths and course planning.
            </CardContent>
          </Card>
        </div>

        {/* Conferences — 2-col */}
        <div className="text-base font-mono text-zinc-500 mb-2 uppercase tracking-wider">
          Conference Experience
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {conferenceExperiences.map((conference, idx) => (
            <ConferenceShowcase key={idx} experience={conference} />
          ))}
        </div>
      </Section>

      {/* Footer — no contact section at the bottom */}
      <footer className="py-8 border-t border-white/10 relative z-10">
        <div className="max-w-[1700px] mx-auto px-16 lg:px-28 text-lg text-zinc-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>© {new Date().getFullYear()} Daniel A. Hernandez</div>
          <a
            className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 border border-white/15 hover:bg-white/10 hover:border-white/30"
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
