"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import IntroAnimation from "./IntroAnimation";

export default function IntroWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showIntro, setShowIntro] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    // Only show intro on home page
    if (pathname !== "/") {
      setIntroComplete(true);
      return;
    }

    const seen = sessionStorage.getItem("clavo_intro_seen");
    if (!seen) {
      setShowIntro(true);
    } else {
      setIntroComplete(true);
    }
  }, [pathname]);

  const handleComplete = () => {
    sessionStorage.setItem("clavo_intro_seen", "1");
    setIntroComplete(true);
    setTimeout(() => setShowIntro(false), 700);
  };

  return (
    <>
      {showIntro && <IntroAnimation onComplete={handleComplete} />}
      <div style={{
        opacity: introComplete ? 1 : 0,
        transition: "opacity 0.8s ease",
        transitionDelay: "0.1s",
      }}>
        {children}
      </div>
    </>
  );
}
