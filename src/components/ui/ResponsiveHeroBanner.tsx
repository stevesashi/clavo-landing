"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";

interface NavLink {
    label: string;
    href: string;
    isActive?: boolean;
}

interface Partner {
    logoUrl: string;
    href: string;
}

interface ResponsiveHeroBannerProps {
    logoUrl?: string;
    backgroundImageUrl?: string;
    navLinks?: NavLink[];
    ctaButtonText?: string;
    ctaButtonHref?: string;
    badgeText?: string;
    badgeLabel?: string;
    title?: string;
    titleLine2?: string;
    description?: string;
    primaryButtonText?: string;
    primaryButtonHref?: string;
    secondaryButtonText?: string;
    secondaryButtonHref?: string;
    partnersTitle?: string;
    partners?: Partner[];
}

const ResponsiveHeroBanner: React.FC<ResponsiveHeroBannerProps> = ({
    logoUrl = "/logo.png",
    backgroundImageUrl = "/solar-bg2.jpg",
    navLinks = [
        { label: "Pricing", href: "/pricing" },
        { label: "About Us", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" }
    ],
    ctaButtonText = "Book Demo",
    ctaButtonHref = "/book-demo",
    badgeLabel = "New",
    badgeText = "The Only Platform With Built-In National Compliance",
    title = "#1 AI Hiring Intelligence",
    titleLine2 = "& Compliance Platform in GCC.",
    description = "Screen 500 CVs in 90 seconds. Conduct AI interviews 24/7. Track nationalization across 6 GCC countries. Map talent markets in real time. Smart notes for every interview. One platform. Zero penalty risk.",
    primaryButtonText = "Book Demo",
    primaryButtonHref = "/book-demo",
    secondaryButtonText = "See How It Works",
    secondaryButtonHref = "#features",
    partnersTitle = "Trusted by innovative teams around the world",
    partners = []
}) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Floating dust particles
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const particleCount = window.innerWidth < 768 ? 4 : 8;
        const particles = Array.from({ length: particleCount }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedY: Math.random() * 0.4 + 0.1,
            speedX: (Math.random() - 0.5) * 0.2,
            opacity: Math.random() * 0.5 + 0.1,
        }));

        let animId: number;
        let isVisible = false;

        const observer = new IntersectionObserver(
            ([entry]) => { isVisible = entry.isIntersecting; },
            { threshold: 0 }
        );
        observer.observe(canvas);

        const animate = () => {
            if (isVisible) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                particles.forEach(p => {
                    p.y -= p.speedY;
                    p.x += p.speedX;
                    if (p.y < 0) {
                        p.y = canvas.height;
                        p.x = Math.random() * canvas.width;
                    }
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(167, 139, 250, ${p.opacity})`;
                    ctx.fill();
                });
            }
            animId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            cancelAnimationFrame(animId);
            observer.disconnect();
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <section className="w-full min-h-screen overflow-hidden relative">
            {/* CSS keyframes */}
            <style>{`
                @keyframes kenBurns {
                    0%   { transform: scale(1) translateX(0px); }
                    50%  { transform: scale(1.08) translateX(-20px); }
                    100% { transform: scale(1) translateX(0px); }
                }
                @keyframes glowPulse {
                    0%, 100% { opacity: 0.6; }
                    50%      { opacity: 1; }
                }
            `}</style>

            {/* Background image — Ken Burns slow zoom */}
            <img
                src={backgroundImageUrl}
                alt=""
                className="w-full h-full object-cover absolute top-0 right-0 bottom-0 left-0"
                style={{
                    transformOrigin: "center center",
                }}
            />

            {/* Purple/lavender color tint overlay */}
            <div style={{
                position: "absolute",
                inset: 0,
                zIndex: 1,
                pointerEvents: "none",
                background: "linear-gradient(135deg, rgba(88,28,220,0.55) 0%, rgba(124,58,237,0.45) 40%, rgba(167,139,250,0.35) 70%, rgba(196,181,253,0.2) 100%)",
                mixBlendMode: "color" as any,
            }}/>

            {/* Purple radial glow overlay */}
            <div style={{
                position: "absolute",
                inset: 0,
                zIndex: 2,
                pointerEvents: "none",
                background: "radial-gradient(ellipse at 60% 40%, rgba(139,92,246,0.25) 0%, rgba(109,40,217,0.15) 40%, transparent 70%)",
            }}/>

            {/* Glow pulse overlay */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    background: "radial-gradient(ellipse at 85% 20%, rgba(139,92,246,0.15) 0%, transparent 50%)",
                }}
            />

            {/* Floating dust particles canvas */}
            <canvas
                ref={canvasRef}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 w-full h-full"
            />

            {/* Vignette ring */}
            <div className="pointer-events-none absolute inset-0 ring-1 ring-black/30" />

            <header className="z-10 xl:top-4 relative">
                <div className="mx-6">
                    <div className="flex items-center justify-between pt-4">
                        <a href="#" className="inline-flex items-center">
                            <img
                                src="/logo-purple.png"
                                alt="Clavo AI"
                                style={{ height: 125, width: "auto", objectFit: "contain" }}
                            />
                        </a>
                        <nav className="hidden md:flex items-center gap-2">
                            <div className="flex items-center gap-1 rounded-full bg-white/5 px-1 py-1 ring-1 ring-white/10 backdrop-blur">
                                {navLinks.map((link, index) => (
                                    <a
                                        key={index}
                                        href={link.href}
                                        className={`px-3 py-2 text-sm font-medium hover:text-white transition-colors ${link.isActive ? 'text-white/90' : 'text-white/80'}`}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                                <a
                                    href="/early-access"
                                    className="ml-1 inline-flex items-center rounded-full px-3.5 py-2 text-sm font-medium transition-colors"
                                    style={{
                                        color: "#a78bfa",
                                        border: "1px solid rgba(167,139,250,0.35)",
                                        background: "rgba(167,139,250,0.08)",
                                    }}
                                >
                                    Join Early Access
                                </a>
                                <a
                                    href={ctaButtonHref}
                                    className="ml-1 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-medium text-neutral-900 hover:bg-white/90 transition-colors"
                                >
                                    {ctaButtonText}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                        <path d="M7 7h10v10" />
                                        <path d="M7 17 17 7" />
                                    </svg>
                                </a>
                            </div>
                        </nav>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 backdrop-blur"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-white/90">
                                <path d="M4 5h16" /><path d="M4 12h16" /><path d="M4 19h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile nav dropdown */}
            {mobileMenuOpen && (
                <div
                    className="md:hidden relative z-50 mx-4 mt-2 rounded-2xl overflow-hidden"
                    style={{
                        background: "rgba(8,6,18,0.96)",
                        border: "1px solid rgba(167,139,250,0.2)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
                    }}
                >
                    <nav className="flex flex-col p-4 gap-1">
                        {navLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-4 py-3 text-sm font-medium text-white/80 hover:text-white rounded-xl hover:bg-white/[0.06] transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                        <div className="mt-2 flex flex-col gap-2">
                            <a
                                href="/early-access"
                                onClick={() => setMobileMenuOpen(false)}
                                className="w-full text-center rounded-xl py-3 text-sm font-semibold"
                                style={{
                                    color: "#a78bfa",
                                    border: "1px solid rgba(167,139,250,0.35)",
                                    background: "rgba(167,139,250,0.08)",
                                }}
                            >
                                Join Early Access
                            </a>
                            <a
                                href={ctaButtonHref}
                                onClick={() => setMobileMenuOpen(false)}
                                className="w-full text-center rounded-xl py-3 text-sm font-semibold text-neutral-900 bg-white"
                            >
                                {ctaButtonText}
                            </a>
                        </div>
                    </nav>
                </div>
            )}

            <div className="z-10 relative">
                <div className="sm:pt-28 md:pt-32 lg:pt-40 max-w-7xl mx-auto pt-28 px-6 pb-16">
                    <div className="mx-auto max-w-3xl text-center">
                        <motion.div
                            className="mb-6 inline-flex items-center gap-3 rounded-full bg-white/10 px-2.5 py-2 ring-1 ring-white/15 backdrop-blur"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.4 }}
                        >
                            <span className="inline-flex items-center text-xs font-medium text-neutral-900 bg-white/90 rounded-full py-0.5 px-2">
                                {badgeLabel}
                            </span>
                            <span className="text-sm font-medium text-white/90">
                                {badgeText}
                            </span>
                        </motion.div>

                        <h1 className="hero-title sm:text-5xl md:text-6xl lg:text-7xl text-4xl text-white" style={{ fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                            <motion.span
                                style={{ display: "block" }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 1.6 }}
                            >
                                {title}
                            </motion.span>
                            <motion.span
                                className="text-[#a78bfa]"
                                style={{ display: "block" }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 1.75 }}
                            >
                                {titleLine2}
                            </motion.span>
                        </h1>

                        <motion.p
                            className="hero-desc sm:text-lg text-base text-white/80 max-w-2xl mt-6 mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.9 }}
                        >
                            {description}
                        </motion.p>

                        <motion.div
                            className="hero-buttons flex flex-col sm:flex-row sm:gap-4 mt-10 gap-3 items-center justify-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 2.1 }}
                        >
                            <a
                                href={primaryButtonHref}
                                className="inline-flex items-center gap-2 text-sm font-medium text-white bg-[#a78bfa] hover:bg-[#7c3aed] rounded-full py-3 px-6 transition-colors"
                            >
                                {primaryButtonText}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                                </svg>
                            </a>
                            <a
                                href={secondaryButtonHref}
                                className="inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/15 px-6 py-3 text-sm font-medium text-white/90 hover:text-white hover:bg-white/15 transition-colors"
                            >
                                {secondaryButtonText}
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                    <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
                                </svg>
                            </a>
                        </motion.div>
                    </div>

                    {partners.length > 0 && (
                        <div className="mx-auto mt-20 max-w-5xl">
                            <p className="text-sm text-white/70 text-center">{partnersTitle}</p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 text-white/70 mt-6 items-center justify-items-center gap-4">
                                {partners.map((partner, index) => (
                                    <a
                                        key={index}
                                        href={partner.href}
                                        className="inline-flex items-center justify-center bg-center w-[120px] h-[36px] bg-cover rounded-full opacity-80 hover:opacity-100 transition-opacity"
                                        style={{ backgroundImage: `url(${partner.logoUrl})` }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom fade — blends hero into next section */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                bottom: 0, left: 0, right: 0,
                height: "280px",
                background: "linear-gradient(to bottom, transparent, #030608)",
                pointerEvents: "none",
                zIndex: 5,
              }}
            />
        </section>
    );
};

export default ResponsiveHeroBanner;
