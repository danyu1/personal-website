import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-200 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-medium text-white mb-3 tracking-tight">404</h1>
        <h2 className="text-xl font-medium mb-3 text-zinc-300">Page not found</h2>
        <p className="text-zinc-500 mb-8 text-sm">The page you are looking for does not exist.</p>
        <Link
          href="/"
          className="inline-block px-5 py-2.5 bg-white text-black font-mono text-sm hover:bg-zinc-200 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
