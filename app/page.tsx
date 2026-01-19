"use client";

import { useEffect, useState } from "react";
import CursorTrail from "./components/CursorTrail";

const ICON_SUFFIX = "-boxes";
export default function Home() {
  const [currentHash, setCurrentHash] = useState("");

  useEffect(() => {
    // Set initial hash
    setCurrentHash(window.location.hash.slice(1));

    // Listen for hash changes
    const handleHashChange = () => {
      setCurrentHash(window.location.hash.slice(1));
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleAnchorClick = (id: string) => {
    if (currentHash === id) {
      // Remove hash if already selected
      window.history.pushState(
        "",
        document.title,
        window.location.pathname + window.location.search
      );
      setCurrentHash("");
    } else {
      // Add/update hash
      window.location.hash = id;
    }
  };
  return (
    <>
      <CursorTrail />
      <div className="min-h-screen px-8 sm:px-20 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-['Molengo',sans-serif] text-[48px] sm:text-[56px] text-white mb-12 leading-tight">
              Continuous AI
            </h1>

            <p className="font-['Molengo',sans-serif] text-[20px] sm:text-[26px] text-white leading-relaxed text-balance">
              Developers are drowning in AI-generated code. Continuous AI
              addresses this by automating the workflows around code, not just
              the code itself. The role of the software engineer is shifting
              from prompting AI to designing processes that run automatically.
            </p>
          </div>
        </div>

        <footer className="pb-16 sm:pb-8 pt-4">
          <div className="flex flex-col items-center justify-center gap-0.5">
            <span className="font-['Molengo',sans-serif] text-white text-base tracking-wider opacity-50">
              Powered by
            </span>
            <a
              href="https://continue.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <img
                src="/continue-logo-white.svg"
                alt="Continue"
                className="h-12 w-auto"
              />
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}
