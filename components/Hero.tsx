"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Parallax effect
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // Fade out text as user scrolls down
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full flex items-center justify-center overflow-hidden"
            id="inicio"
        >
            {/* Dark Premium Gradient Background */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#111111] via-[#0A0A0A] to-[#050505]">
                {/* Subtle radial glow to give depth */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_60%)] pointer-events-none" />
            </div>

            {/* Content Container */}
            <motion.div
                className="relative z-20 flex flex-col items-center justify-center px-4 w-full h-full text-center"
                style={{ opacity }}
            >
                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-6xl sm:text-7xl lg:text-8xl font-serif text-white tracking-wider text-glow mb-2"
                >
                    Las Juntas
                </motion.h1>

                {/* Subtitle */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    className="text-xl sm:text-2xl lg:text-3xl font-light text-primary-light tracking-[0.2em] uppercase mb-8"
                >
                    Bar Restaurante
                </motion.h2>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                    className="text-lg sm:text-xl text-gray-300 max-w-2xl font-light italic mb-12 drop-shadow-md"
                >
                    "Donde el sabor se encuentra con la naturaleza"
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row gap-6"
                >
                    <a href="#menu" className="btn-primary text-lg px-10 py-4 shadow-[0_0_20px_rgba(198,40,40,0.5)] hover:scale-105 transition-all">
                        Ver Menú
                    </a>
                    <a href="#reservas" className="btn-secondary text-lg px-10 py-4 backdrop-blur-md bg-white/5 hover:bg-white/10 border border-white/20 transition-all">
                        Reservar Mesa
                    </a>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator Arrow */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
            >
                <motion.a
                    href="#destacados"
                    className="text-white/60 hover:text-white transition-colors flex flex-col items-center"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    aria-label="Deslizar hacia abajo"
                >
                    <span className="text-xs uppercase tracking-[0.2em] mb-2 font-medium">Explorar</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                </motion.a>
            </motion.div>
        </section>
    );
}
