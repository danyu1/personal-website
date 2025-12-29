import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[rgb(3,7,18)] text-slate-200 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-amber-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-slate-400 mb-8">The page you are looking for does not exist.</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-amber-500 text-slate-900 font-semibold rounded-lg hover:bg-amber-400 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
