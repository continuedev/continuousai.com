"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [activeSection, setActiveSection] = useState("manifesto");

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style jsx global>{`
        :root {
          --bg: #0a0a0a;
          --fg: #f5f5f5;
          --accent: #c8ff00;
          --muted: #666;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: 'Syne', sans-serif;
          background: var(--bg);
          color: var(--fg);
          line-height: 1.6;
          overflow-x: hidden;
          overflow-y: auto;
          position: static;
          height: auto;
        }

        .snap-container {
          scroll-snap-type: y mandatory;
          overflow-y: auto;
          overflow-x: hidden;
          height: 100vh;
          height: 100dvh;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .snap-container::-webkit-scrollbar {
          display: none;
        }

        .snap-section {
          scroll-snap-align: start;
          min-height: 100vh;
          min-height: 100dvh;
        }

        @media (max-width: 768px) {
          .snap-section {
            min-height: 100vh;
            min-height: 100dvh;
            padding-top: 0;
            padding-bottom: 0;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          40% {
            transform: translateX(-50%) translateY(-10px);
          }
          60% {
            transform: translateX(-50%) translateY(-5px);
          }
        }

        @keyframes heartbeat-pulse {
          0%, 100% { transform: scaleY(1); opacity: 0.5; }
          7% { transform: scaleY(1.25); opacity: 0.7; }
          14% { transform: scaleY(1); opacity: 0.5; }
          21% { transform: scaleY(1.5); opacity: 0.85; }
          35% { transform: scaleY(1); opacity: 0.5; }
        }

        @keyframes line-flicker {
          0%, 100% { opacity: 0.2; }
          7% { opacity: 0.4; }
          14% { opacity: 0.2; }
          21% { opacity: 0.55; }
          35% { opacity: 0.2; }
        }

        .heartbeat-icon {
          animation: heartbeat-pulse 1s ease-in-out infinite;
        }

        .heartbeat-line {
          animation: line-flicker 1s ease-in-out infinite;
        }

        .heartbeat-link:hover .heartbeat-icon,
        .heartbeat-link:hover .heartbeat-line {
          opacity: 1 !important;
          animation: none;
        }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 p-4 px-6 md:p-6 md:px-16 z-50 flex justify-between items-center mix-blend-difference" role="banner">
        <a href="/" className="font-mono text-xs md:text-sm tracking-[0.15em] uppercase text-[var(--fg)] no-underline" aria-label="Continuous AI - Home">
          Continuous AI
        </a>
      </header>

      {/* Heartbeat - Full width across bottom, only visible on last section */}
      <a
        href="/heartbeat"
        aria-label="View heartbeat visualization"
        aria-hidden={activeSection !== 'vision'}
        tabIndex={activeSection === 'vision' ? 0 : -1}
        className={`heartbeat-link fixed bottom-0 left-0 right-0 z-40 pointer-events-auto transition-all duration-500 ${activeSection === 'vision' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'}`}
      >
        <svg width="100%" height="60" viewBox="0 0 1200 60" preserveAspectRatio="none" fill="none">
          {/* Macro - distant echoes */}
          <rect className="heartbeat-line" style={{ animationDelay: '0.2s' }} x="0" y="2" width="1200" height="1" fill="#0d0d0e" />
          
          <rect className="heartbeat-line" style={{ animationDelay: '0.18s' }} x="0" y="8" width="1200" height="1" fill="#101011" />
          
          <rect className="heartbeat-line" style={{ animationDelay: '0.15s' }} x="0" y="14" width="1200" height="1" fill="#131314" />
          
          {/* Medium scale - fragmenting */}
          <rect className="heartbeat-line" style={{ animationDelay: '0.12s' }} x="0" y="20" width="500" height="1" fill="#161617" />
          <rect className="heartbeat-line" style={{ animationDelay: '0.12s' }} x="540" y="20" width="400" height="1" fill="#171718" />
          <rect className="heartbeat-line" style={{ animationDelay: '0.12s' }} x="980" y="20" width="220" height="1" fill="#161617" />
          
          {/* Fine scale - green emerging */}
          <rect className="heartbeat-line" style={{ animationDelay: '0.08s' }} x="0" y="26" width="900" height="2" fill="#1a1f0a" />
          <rect className="heartbeat-line" style={{ animationDelay: '0.08s' }} x="940" y="26" width="260" height="2" fill="#191e09" />
          
          {/* Near core */}
          <rect className="heartbeat-line" style={{ animationDelay: '0.04s' }} x="0" y="32" width="1050" height="2" fill="#1e2a0c" />
          <rect className="heartbeat-line" style={{ animationDelay: '0.04s' }} x="1080" y="32" width="120" height="2" fill="#1d280b" />
          
          {/* Inner glow */}
          <rect className="heartbeat-line" style={{ animationDelay: '0.02s' }} x="0" y="38" width="1100" height="3" fill="#2a3d10" />
          <rect className="heartbeat-line" style={{ animationDelay: '0.02s' }} x="1130" y="38" width="70" height="3" fill="#28390f" />
          
          <rect className="heartbeat-line" style={{ animationDelay: '0.01s' }} x="0" y="44" width="1150" height="4" fill="#3a5214" />
          <rect className="heartbeat-line" style={{ animationDelay: '0.01s' }} x="1170" y="44" width="30" height="4" fill="#384f13" />
          
          {/* Core line */}
          <rect className="heartbeat-icon" x="0" y="52" width="1200" height="6" fill="#c8ff00" style={{ transformOrigin: 'center' }} />
        </svg>
      </a>

      {/* Navigation Dots - Desktop */}
      <nav className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-[100] flex-col gap-4 hidden md:flex" aria-label="Page sections">
        {[
          { id: "manifesto", label: "The Manifesto" },
          { id: "ecosystem", label: "The Ecosystem" },
          { id: "vision", label: "The Vision" },
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            aria-label={`Navigate to ${label}`}
            aria-current={activeSection === id ? "true" : undefined}
            className={`w-3 h-3 rounded-full border-none cursor-pointer transition-all duration-300 relative group ${
              activeSection === id
                ? "bg-[var(--accent)] scale-[1.3]"
                : "bg-[var(--muted)] hover:bg-[var(--accent)] hover:scale-[1.3]"
            }`}
          >
            <span className="absolute right-6 top-1/2 -translate-y-1/2 font-mono text-[0.7rem] text-[var(--muted)] whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:text-[var(--fg)] transition-opacity duration-300 pointer-events-none" aria-hidden="true">
              {label}
            </span>
          </button>
        ))}
      </nav>

      {/* Navigation Dots - Mobile */}
      <nav className="fixed right-5 top-20 z-[100] flex flex-col gap-2.5 md:hidden" aria-label="Page sections">
        {[
          { id: "manifesto", label: "The Manifesto" },
          { id: "ecosystem", label: "The Ecosystem" },
          { id: "vision", label: "The Vision" },
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            aria-label={`Navigate to ${label}`}
            aria-current={activeSection === id ? "true" : undefined}
            className={`w-2 h-2 rounded-full border-none cursor-pointer transition-all duration-300 ${
              activeSection === id
                ? "bg-[var(--accent)] scale-[1.3]"
                : "bg-[var(--muted)]"
            }`}
          />
        ))}
      </nav>

      <main id="main-content" className="snap-container" role="main">
      {/* Section 1: The Manifesto */}
      <section
        id="manifesto"
        aria-labelledby="manifesto-heading"
        className="snap-section flex flex-col justify-center px-5 md:px-[8vw] pt-16 pb-24 md:pb-16 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #151515 100%)",
        }}
      >
        <div
          className="absolute -top-1/2 -right-[20%] w-[80vw] h-[80vw] pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(200, 255, 0, 0.03) 0%, transparent 60%)",
          }}
        />
        <div className="max-w-[900px]">
          <p
            className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--accent)] mb-8"
            style={{ animation: "fadeInUp 0.8s ease forwards" }}
            aria-hidden="true"
          >
            The Manifesto
          </p>
          <h1
            id="manifesto-heading"
            className="text-[clamp(2.5rem,10vw,5.5rem)] font-bold leading-[1.05] mb-6 md:mb-8 pr-1 font-['Outfit',sans-serif] tracking-[-0.02em]"
            style={{ animation: "fadeInUp 0.8s ease 0.2s forwards", opacity: 0 }}
          >
            <span className="text-[var(--accent)]">Continuous</span> AI
          </h1>
          <p
            className="text-[clamp(1rem,3vw,1.35rem)] leading-[1.6] md:leading-[1.8] text-[rgba(245,245,245,0.85)] max-w-[700px]"
            style={{ animation: "fadeInUp 0.8s ease 0.4s forwards", opacity: 0 }}
          >
            Developers are drowning in AI-generated code. Continuous AI addresses this by automating the workflows around code, not just the code itself. The role of the software engineer is shifting from prompting AI to designing processes that run automatically.
          </p>
          <div
            className="mt-8 md:mt-10"
            style={{ animation: "fadeInUp 0.8s ease 0.6s forwards", opacity: 0 }}
          >
            <div className="flex items-center gap-3">
              <a
                href="https://blog.continue.dev/ai-is-glue"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-[rgba(200,255,0,0.1)] border border-[rgba(200,255,0,0.3)] rounded-full text-[var(--accent)] no-underline font-mono text-sm transition-all duration-300 hover:bg-[var(--accent)] hover:text-[var(--bg)] hover:translate-x-2"
              >
                AI is Glue
                <svg className="w-4 h-4 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <span className="sr-only">(opens in new tab)</span>
              </a>
              <a
                href="https://open.spotify.com/track/2aJDlirz6v2a4HREki98cP"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[rgba(255,255,255,0.15)] text-[var(--muted)] transition-all duration-300 hover:border-[#1DB954] hover:text-[#1DB954] hover:bg-[rgba(29,185,84,0.1)] hover:scale-110"
                aria-label="Listen to Glue on Spotify (opens in new tab)"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
              </a>
              <a
                href="https://music.apple.com/us/song/glue/1295087431"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[rgba(255,255,255,0.15)] text-[var(--muted)] transition-all duration-300 hover:border-[#FC3C44] hover:text-[#FC3C44] hover:bg-[rgba(252,60,68,0.1)] hover:scale-110"
                aria-label="Listen to Glue on Apple Music (opens in new tab)"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              </a>
              <a
                href="https://www.youtube.com/watch?v=A7ZxRs45tTg"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[rgba(255,255,255,0.15)] text-[var(--muted)] transition-all duration-300 hover:border-[#FF0000] hover:text-[#FF0000] hover:bg-[rgba(255,0,0,0.1)] hover:scale-110"
                aria-label="Watch Glue on YouTube (opens in new tab)"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex-col items-center gap-2 opacity-50 hidden md:flex" style={{ animation: "bounce 2s infinite" }} aria-hidden="true">
          <span className="font-mono text-[0.7rem] tracking-[0.2em] uppercase">Scroll</span>
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Section 2: The Ecosystem */}
      <section
        id="ecosystem"
        aria-labelledby="ecosystem-heading"
        className="snap-section flex flex-col justify-center px-5 md:px-[8vw] pt-24 md:pt-16 pb-16 relative overflow-hidden bg-[#0d0d0d]"
      >
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(200, 255, 0, 0.2), transparent)" }}
        />
        <div className="max-w-[1000px]">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--accent)] mb-4 md:mb-8" aria-hidden="true">
            The Ecosystem
          </p>
          <h2 id="ecosystem-heading" className="text-[clamp(2.5rem,10vw,5.5rem)] font-bold leading-[1.05] mb-6 md:mb-8 font-['Outfit',sans-serif] tracking-[-0.02em]">
            Building <span className="text-[var(--accent)]">Together</span>
          </h2>
          <p className="text-[clamp(1rem,3vw,1.35rem)] leading-[1.6] md:leading-[1.8] text-[rgba(245,245,245,0.85)] max-w-[700px] mb-8 md:mb-10">
            The best developer tools are converging around a shared goal: agents that keep pace with code generation, catch issues before and after they ship, and give every engineer the guardrails to move fast with confidence.
          </p>
          <ul className="flex flex-wrap gap-1 md:gap-3 my-3 md:my-10 list-none p-0" aria-label="Partner tools and integrations">
            {[
              "Continue", "GitHub", "Snyk", "Devin",
              "Vercel", "Sentry", "Datadog", "Jules",
              "PostHog", "Linear", "Notion", "Cognee",
              "LaunchDarkly", "Graphene", "dltHub", "Confluent"
            ].map((tool) => (
              <li
                key={tool}
                className="px-2 py-1 md:px-4 md:py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-md font-mono text-[10px] md:text-sm text-[rgba(245,245,245,0.7)] transition-all duration-300 hover:bg-[rgba(200,255,0,0.1)] hover:border-[rgba(200,255,0,0.3)] hover:text-[var(--accent)] hover:-translate-y-0.5"
              >
                {tool}
              </li>
            ))}
          </ul>
          <a
            href="/jan2026"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 md:px-6 md:py-3 bg-[rgba(200,255,0,0.1)] border border-[rgba(200,255,0,0.3)] rounded-full text-[var(--accent)] no-underline font-mono text-sm transition-all duration-300 hover:bg-[var(--accent)] hover:text-[var(--bg)] hover:translate-x-2"
          >
            Jan 2026 Dinner
            <svg className="w-4 h-4 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <span className="sr-only">(opens in new tab)</span>
          </a>
        </div>
      </section>

      {/* Section 3: The Vision */}
      <section
        id="vision"
        aria-labelledby="vision-heading"
        className="snap-section flex flex-col justify-center px-5 md:px-[8vw] py-16 md:py-16 relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #0d0d0d 0%, #111 50%, #0a0a0a 100%)",
        }}
      >
        <div
          className="absolute top-[20%] -left-[10%] w-[60vw] h-[60vw] pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(200, 255, 0, 0.02) 0%, transparent 50%)",
          }}
        />
        <div className="max-w-[900px]">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--accent)] mb-4" aria-hidden="true">
            The Vision
          </p>
          <h2 id="vision-heading" className="text-[clamp(2rem,8vw,5rem)] font-bold leading-[1.05] mb-4 font-['Outfit',sans-serif] tracking-[-0.02em]">
            Ship as Fast as <span className="text-[var(--accent)]">You Code</span>
          </h2>
          <p className="text-[clamp(1rem,3vw,1.35rem)] leading-[1.6] md:leading-[1.8] text-[rgba(245,245,245,0.85)] max-w-[700px]">
            AI made your engineers 10x faster at writing code. Now they&apos;re drowning in the stuff that isn&apos;t code. Continuous AI closes that gap.
          </p>
          <p className="text-[clamp(1.1rem,4vw,2.75rem)] font-bold text-[var(--fg)] mt-4 leading-[1.15]">
            Your best engineers&apos; standards,<br />
            <span className="text-[var(--accent)]">now the whole team&apos;s.</span>
          </p>
          <p className="text-[clamp(1rem,3vw,1.35rem)] leading-[1.6] md:leading-[1.8] text-[rgba(245,245,245,0.85)] max-w-[700px] mt-4">
            Junior engineers ship like staff. Staff engineers focus on what matters.
          </p>
          
          {/* Continue button - part of content flow */}
          <a
            href="https://continue.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 md:px-6 md:py-3 bg-[rgba(200,255,0,0.1)] border border-[rgba(200,255,0,0.3)] rounded-full text-[var(--accent)] no-underline font-mono text-sm transition-all duration-300 hover:bg-[var(--accent)] hover:text-[var(--bg)] hover:translate-x-2"
          >
            Continue
            <svg className="w-4 h-4 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <span className="sr-only">(opens in new tab)</span>
          </a>
        </div>

        {/* Footer - pinned to bottom, above heartbeat animation */}
        <footer className="absolute bottom-[70px] md:bottom-[76px] left-5 right-5 md:left-[8vw] md:right-[8vw] flex flex-col z-50" role="contentinfo">
          <div className="w-full border-t border-[rgba(255,255,255,0.05)]" aria-hidden="true" />
          <div className="flex items-center justify-between w-full mt-3 md:mt-6">
            <div className="flex items-center gap-2 md:gap-3 font-mono text-xs md:text-sm text-[var(--muted)]">
              Powered by
              <a href="https://continue.dev" target="_blank" rel="noopener noreferrer" className="text-[var(--fg)] no-underline transition-colors duration-300 hover:text-[var(--accent)]">
                Continue<span className="sr-only"> (opens in new tab)</span>
              </a>
            </div>
            <a href="https://github.com/continuedev/continuousai.com" target="_blank" rel="noopener noreferrer" className="font-mono text-xs md:text-sm text-[var(--muted)] no-underline transition-colors duration-300 hover:text-[var(--accent)]">
              GitHub<span className="sr-only"> repository (opens in new tab)</span>
            </a>
          </div>
        </footer>
      </section>
      </main>
    </>
  );
}

