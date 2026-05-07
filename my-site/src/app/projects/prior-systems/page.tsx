import type { Metadata } from 'next'
import PriorSystemsShowcase from '@/components/PriorSystemsShowcase'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Prior Systems — Quantitative Trading Platform | Daniel A. Hernandez',
  description: 'Full-stack algorithmic trading backtesting platform with Black–Scholes options pricing, real-time portfolio tracking, and 15+ technical indicators. Built with Next.js, FastAPI, and PostgreSQL.',
  keywords: 'algorithmic trading, backtesting, options pricing, Black-Scholes, portfolio management, Next.js, FastAPI, TypeScript, quantitative finance, prior systems',
  openGraph: {
    title: 'Prior Systems — Quantitative Trading Platform',
    description: 'Real-time portfolio tracking and algorithmic trading strategies',
    images: ['/images/prior-systems/hero-demo.gif'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prior Systems — Quantitative Trading Platform',
    description: 'Full-stack algorithmic trading platform with Black-Scholes options pricing and real-time analytics',
    images: ['/images/prior-systems/hero-preview.png'],
  },
}

export default function PriorSystemsPage() {
  return (
    <div className="min-h-screen text-zinc-200 relative">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-sm bg-[#0a0a0a]/85">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-base font-mono">Back to Portfolio</span>
            </Link>
            <div className="h-4 w-px bg-white/15" />
            <div className="font-mono text-base font-medium text-white">
              Daniel A. Hernandez
              <span className="text-zinc-500 ml-2 hidden sm:inline">
                · CS + Data Science @ UChicago &apos;28
              </span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-4 text-base font-mono">
            <a
              className="text-zinc-400 hover:text-white transition-colors duration-200"
              href="https://priorsystems.net"
              target="_blank"
              rel="noopener noreferrer"
            >
              Live Site ↗
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 relative z-10">
        <PriorSystemsShowcase />
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 relative z-10">
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8 text-base text-zinc-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>© {new Date().getFullYear()} Daniel A. Hernandez</div>
          <Link
            href="/"
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/5 border border-white/15 hover:bg-white/10 hover:border-white/30 transition-colors duration-200 font-mono text-sm"
          >
            <ChevronLeft className="w-3.5 h-3.5" /> Back to Portfolio
          </Link>
        </div>
      </footer>
    </div>
  )
}
