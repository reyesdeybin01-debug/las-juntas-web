"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EventModal from "./EventModal";

interface NewsItem {
    id: number;
    title: string;
    image: string;
    action: "none" | "modal" | "whatsapp";
}

const NEWS_ITEMS: NewsItem[] = [
    {
        id: 1,
        title: "Música en Vivo",
        image: "/images/news/Musica_en_vivo.jpeg",
        action: "none",
    },
    {
        id: 2,
        title: "Se Renta Salón para Eventos",
        image: "/images/news/salon_de_evento.png",
        action: "modal",
    },
    {
        id: 3,
        title: "Soda Las Juntas - Nuevo Local",
        image: "/images/news/nuevo_local.jpeg",
        action: "whatsapp",
    },
];

export default function News() {
    const [active, setActive] = useState(0);
    const [eventModalOpen, setEventModalOpen] = useState(false);
    const total = NEWS_ITEMS.length;

    const goTo = useCallback(
        (index: number) => {
            setActive(index);
        },
        []
    );

    const next = useCallback(() => {
        setActive((prev) => (prev + 1) % total);
    }, [total]);

    const prev = useCallback(() => {
        setActive((prev) => (prev - 1 + total) % total);
    }, [total]);

    // Auto-rotate every 5 seconds
    useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, [next]);

    // Swipe support
    const [touchStart, setTouchStart] = useState<number | null>(null);

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.touches[0].clientX);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStart === null) return;
        const diff = touchStart - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) next();
            else prev();
        }
        setTouchStart(null);
    };

    // Calculate position relative to active
    const getOffset = (index: number) => {
        let offset = index - active;
        if (offset > total / 2) offset -= total;
        if (offset < -total / 2) offset += total;
        return offset;
    };

    const handleCardClick = (item: NewsItem) => {
        if (item.action === "modal") {
            setEventModalOpen(true);
        } else if (item.action === "whatsapp") {
            const mensaje = "Hola, me gustaria saber la ubicacion de Soda Las Juntas. Gracias!";
            window.open(`https://wa.me/50683452464?text=${encodeURIComponent(mensaje)}`, "_blank");
        }
    };

    return (
        <>
            <section id="noticias" className="py-20 sm:py-28 relative z-10 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h2
                        className="section-title title-glow"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "0px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-primary">Noticias</span>
                    </motion.h2>
                    <motion.p
                        className="section-subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "0px" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Enterate de lo que está pasando en Las Juntas
                    </motion.p>

                    {/* 3D Carousel */}
                    <motion.div
                        className="relative mt-12"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "0px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div
                            className="relative w-full h-[300px] sm:h-[400px] lg:h-[450px]"
                            style={{ perspective: "1200px" }}
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                        >
                            {NEWS_ITEMS.map((item, index) => {
                                const offset = getOffset(index);
                                const isActive = offset === 0;
                                const absOffset = Math.abs(offset);

                                if (absOffset > 2) return null;

                                const translateX = offset * 280;
                                const rotateY = offset * -35;
                                const scale = isActive ? 1 : 0.75 - absOffset * 0.05;
                                const zIndex = 10 - absOffset;
                                const opacity = isActive ? 1 : 0.5 - (absOffset - 1) * 0.15;

                                const isClickable = item.action !== "none";

                                return (
                                    <motion.div
                                        key={item.id}
                                        className={`absolute top-0 left-1/2 w-[280px] sm:w-[380px] lg:w-[500px] h-full ${
                                            isClickable ? "cursor-pointer" : ""
                                        }`}
                                        animate={{
                                            x: `calc(-50% + ${translateX}px)`,
                                            rotateY: rotateY,
                                            scale: scale,
                                            opacity: opacity,
                                            zIndex: zIndex,
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 200,
                                            damping: 30,
                                            mass: 1,
                                        }}
                                        style={{
                                            transformStyle: "preserve-3d",
                                        }}
                                        onClick={() => {
                                            if (!isActive) {
                                                goTo(index);
                                            } else if (isClickable) {
                                                handleCardClick(item);
                                            }
                                        }}
                                    >
                                        <div
                                            className={`w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative group ${
                                                isClickable && isActive ? "transition-transform duration-300 hover:scale-[1.02]" : ""
                                            }`}
                                        >
                                            {/* Image */}
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className={`w-full h-full object-cover ${
                                                    isClickable && isActive
                                                        ? "transition-transform duration-700 group-hover:scale-105"
                                                        : ""
                                                }`}
                                            />

                                            {/* Gradient overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                                            {/* Title */}
                                            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                                                <h3
                                                    className={`font-bold text-white leading-tight transition-all duration-300 ${
                                                        isActive
                                                            ? "text-xl sm:text-2xl lg:text-3xl"
                                                            : "text-base sm:text-lg"
                                                    }`}
                                                >
                                                    {item.title}
                                                </h3>
                                            </div>

                                            {/* Active glow border */}
                                            {isActive && (
                                                <div className="absolute inset-0 rounded-2xl border-2 border-primary/30 pointer-events-none" />
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Navigation arrows */}
                        <button
                            onClick={prev}
                            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-dark/80 backdrop-blur-md border border-white/10 text-white hover:bg-primary/30 hover:border-primary/50 transition-all duration-300 flex items-center justify-center"
                            aria-label="Anterior"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>
                        <button
                            onClick={next}
                            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-dark/80 backdrop-blur-md border border-white/10 text-white hover:bg-primary/30 hover:border-primary/50 transition-all duration-300 flex items-center justify-center"
                            aria-label="Siguiente"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>

                        {/* Dots */}
                        <div className="flex justify-center gap-2 mt-8">
                            {NEWS_ITEMS.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goTo(index)}
                                    className={`rounded-full transition-all duration-300 ${
                                        index === active
                                            ? "w-8 h-2.5 bg-primary"
                                            : "w-2.5 h-2.5 bg-white/20 hover:bg-white/40"
                                    }`}
                                    aria-label={`Ir a noticia ${index + 1}`}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Event Modal */}
            <EventModal isOpen={eventModalOpen} onClose={() => setEventModalOpen(false)} />
        </>
    );
}
