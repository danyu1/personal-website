import type { Metadata } from 'next'
import PriorSystemsShowcase from '@/components/PriorSystemsShowcase'
import TechGridBackground from '@/components/TechGridBackground'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Prior Systems - Quantitative Trading Platform | Daniel A. Hernandez',
  description: 'Full-stack algorithmic trading backtesting platform with Black-Scholes options pricing, real-time portfolio tracking, and 15+ technical indicators. Built with Next.js, FastAPI, and PostgreSQL.',
  keywords: 'algorithmic trading, backtesting, options pricing, Black-Scholes, portfolio management, Next.js, FastAPI, TypeScript, quantitative finance, prior systems',
  openGraph: {
    title: 'Prior Systems - Quantitative Trading Platform',
    description: '15K+ lines of production code handling real-time portfolio tracking and algorithmic trading strategies',
    images: ['/images/prior-systems/hero-demo.gif'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prior Systems - Quantitative Trading Platform',
    description: 'Full-stack algorithmic trading platform with Black-Scholes options pricing and real-time analytics',
    images: ['/images/prior-systems/hero-preview.png'],
  },
}

export default function PriorSystemsPage() {
  return (
    <div className="min-h-screen text-slate-200 relative">
      <TechGridBackground />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/50 backdrop-blur-sm bg-[rgb(3,7,18)]/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-slate-400 hover:text-amber-500 transition-colors duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm font-mono">Back to Portfolio</span>
            </Link>
            <div className="h-4 w-px bg-slate-700"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
              <div>
                <div className="font-mono text-sm font-medium text-white">Daniel A. Hernandez</div>
                <div className="text-xs text-slate-500 font-mono">
                  CS + Data Science @ UChicago &apos;28
                </div>
              </div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-4 text-sm font-mono">
            <a
              className="text-slate-400 hover:text-amber-500 transition-colors duration-200"
              href="https://priorsystems.net"
              target="_blank"
              rel="noopener noreferrer"
            >
              Live Site
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 relative z-10">
        <PriorSystemsShowcase />
      </main>

      {/* Footer */}
      <footer className="py-10 border-t border-slate-800/60 bg-gradient-to-b from-transparent to-slate-950/60 relative z-10">
        <div className="max-w-5xl mx-auto px-4 text-sm text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>© {new Date().getFullYear()} Daniel A. Hernandez</div>
          <Link
            href="/"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-700 hover:bg-slate-900 hover:border-amber-500/50 transition-colors duration-200"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Portfolio
          </Link>
        </div>
      </footer>
    </div>
  )
}
