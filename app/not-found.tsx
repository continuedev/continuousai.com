import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-5 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0a0a0a 0%, #151515 100%)",
      }}
      role="main"
      id="main-content"
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(200, 255, 0, 0.03) 0%, transparent 60%)",
        }}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 p-4 px-6 md:p-6 md:px-16 z-50 flex justify-between items-center" role="banner">
        <Link
          href="/"
          className="font-mono text-xs md:text-sm tracking-[0.15em] uppercase text-[#f5f5f5] no-underline"
          aria-label="Continuous AI - Home"
        >
          Continuous AI
        </Link>
      </header>

      {/* Content */}
      <article className="text-center z-10" aria-labelledby="error-heading">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#c8ff00] mb-6" aria-hidden="true">
          404 Error
        </p>
        <h1 id="error-heading" className="text-[clamp(4rem,18vw,12rem)] font-bold leading-[0.9] mb-4 text-[#f5f5f5] font-['Outfit',sans-serif] tracking-[-0.02em]">
          <span className="sr-only">Error </span>4<span className="text-[#c8ff00]">0</span>4<span className="sr-only"> - Page not found</span>
        </h1>
        <p className="text-[clamp(1rem,3vw,1.35rem)] leading-[1.6] text-[rgba(245,245,245,0.85)] max-w-[500px] mb-8">
          This page got lost in the continuous flow of AI. Let&apos;s get you back on track.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[rgba(200,255,0,0.1)] border border-[rgba(200,255,0,0.3)] rounded-full text-[#c8ff00] no-underline font-mono text-sm transition-all duration-300 hover:bg-[#c8ff00] hover:text-[#0a0a0a]"
        >
          Back to Home
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </article>

      {/* Footer */}
      <footer className="absolute bottom-4 md:bottom-8 left-5 right-5 md:left-[8vw] md:right-[8vw] flex flex-col z-50" role="contentinfo">
        <div className="w-full border-t border-[rgba(255,255,255,0.05)]" aria-hidden="true" />
        <div className="flex items-center justify-between w-full mt-3 md:mt-6">
          <div className="flex items-center gap-2 md:gap-3 font-mono text-xs md:text-sm text-[#666]">
            Powered by
            <a
              href="https://continue.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f5f5f5] no-underline transition-colors duration-300 hover:text-[#c8ff00]"
            >
              Continue<span className="sr-only"> (opens in new tab)</span>
            </a>
          </div>
          <a
            href="https://github.com/continuedev/continuousai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs md:text-sm text-[#666] no-underline transition-colors duration-300 hover:text-[#c8ff00]"
          >
            GitHub<span className="sr-only"> repository (opens in new tab)</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
