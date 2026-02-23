"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const { totalItems, setIsOpen } = useCart();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { href: "#inicio", label: "Inicio" },
        { href: "#destacados", label: "Lo Más Pedido" },
        { href: "#menu", label: "Menú" },
        { href: "#nosotros", label: "Nosotros" },
        { href: "#reservas", label: "Reservas" },
        { href: "#contacto", label: "Contacto" },
    ];

    const handleNavClick = () => setIsMobileOpen(false);

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled
                ? "bg-dark/90 backdrop-blur-xl border-b border-white/5 py-3"
                : "bg-transparent py-5"
                }`}
            aria-label="Navegación principal"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                {/* Logo */}
                <a href="#inicio" className="flex items-center">
                    <img
                        src="/images/logo.png"
                        alt="Las Juntas Logo"
                        className="w-[90px] lg:w-[140px] h-auto object-contain transition-transform hover:scale-105 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] mix-blend-lighten"
                    />
                </a>

                {/* Desktop links */}
                <ul className="hidden lg:flex items-center gap-8">
                    {navLinks.map(({ href, label }) => (
                        <li key={href}>
                            <a
                                href={href}
                                className="text-sm font-medium text-gray-300 hover:text-primary transition-all duration-300 tracking-wide hover:drop-shadow-[0_0_8px_rgba(198,40,40,0.8)]"
                            >
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Cart + Hamburger */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="relative p-2 text-gray-300 hover:text-primary transition-colors"
                        aria-label="Abrir carrito"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center font-semibold">
                                {totalItems}
                            </span>
                        )}
                    </button>

                    <button
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                        className="lg:hidden p-2 text-gray-300 hover:text-primary transition-colors"
                        aria-label="Menú de navegación"
                        aria-expanded={isMobileOpen}
                    >
                        <div className="w-6 flex flex-col gap-1.5">
                            <span className={`block h-0.5 bg-current transition-all duration-300 ${isMobileOpen ? "rotate-45 translate-y-2" : ""}`} />
                            <span className={`block h-0.5 bg-current transition-all duration-300 ${isMobileOpen ? "opacity-0" : ""}`} />
                            <span className={`block h-0.5 bg-current transition-all duration-300 ${isMobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed inset-0 top-0 bg-dark/98 backdrop-blur-2xl z-40 lg:hidden flex flex-col items-center justify-center gap-8"
                    >
                        {navLinks.map(({ href, label }, i) => (
                            <motion.a
                                key={href}
                                href={href}
                                onClick={handleNavClick}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }}
                                className="text-2xl font-light text-white hover:text-primary transition-colors tracking-wider"
                            >
                                {label}
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
