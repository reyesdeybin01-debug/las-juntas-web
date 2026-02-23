"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

export default function CameraScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const frameIndexRef = useRef(0);
    const rafRef = useRef<number>(0);

    const [manifest, setManifest] = useState<string[]>([]);
    const [loadProgress, setLoadProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [manifestError, setManifestError] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

    // Overlay visibility ranges
    const overlay2Opacity = useTransform(scrollYProgress, [0.1, 0.15, 0.4, 0.45], [0, 1, 1, 0]);
    const overlay3Opacity = useTransform(scrollYProgress, [0.55, 0.6, 0.8, 0.85], [0, 1, 1, 0]);
    const overlay4Opacity = useTransform(scrollYProgress, [0.9, 0.95, 1.0, 1.0], [0, 1, 1, 1]);

    const overlayY2 = useTransform(scrollYProgress, [0.1, 0.15, 0.4, 0.45], [30, 0, 0, -30]);
    const overlayY3 = useTransform(scrollYProgress, [0.55, 0.6, 0.8, 0.85], [30, 0, 0, -30]);
    const overlayY4 = useTransform(scrollYProgress, [0.9, 0.95, 1.0, 1.0], [30, 0, 0, 0]);

    // Fetch manifest
    useEffect(() => {
        fetch("/frames/manifest.json")
            .then((res) => {
                if (!res.ok) throw new Error("Manifest not found");
                return res.json();
            })
            .then((data: string[]) => setManifest(data))
            .catch(() => setManifestError(true));
    }, []);

    // Preload images
    useEffect(() => {
        if (manifest.length === 0) return;

        let loaded = 0;
        const total = manifest.length;
        const images: HTMLImageElement[] = new Array(total);

        manifest.forEach((src, i) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                loaded++;
                images[i] = img;
                setLoadProgress(Math.round((loaded / total) * 100));
                if (loaded === total) {
                    imagesRef.current = images;
                    setIsLoaded(true);
                }
            };
            img.onerror = () => {
                loaded++;
                setLoadProgress(Math.round((loaded / total) * 100));
                if (loaded === total) {
                    imagesRef.current = images;
                    setIsLoaded(true);
                }
            };
        });
    }, [manifest]);

    // Draw frame on canvas
    const drawFrame = useCallback(() => {
        const canvas = canvasRef.current;
        const images = imagesRef.current;
        if (!canvas || images.length === 0) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = images[frameIndexRef.current];
        if (!img) return;

        // DPR cap: max 2 on mobile
        const isMobile = window.innerWidth <= 768;
        const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 2 : 3);

        const cw = canvas.clientWidth;
        const ch = canvas.clientHeight;

        if (canvas.width !== cw * dpr || canvas.height !== ch * dpr) {
            canvas.width = cw * dpr;
            canvas.height = ch * dpr;
            ctx.scale(dpr, dpr);
        }

        ctx.clearRect(0, 0, cw, ch);

        // "contain" drawing
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const topPadding = 90; // Changed from 100 to 90 as per instruction
        const availableHeight = ch - topPadding;
        const canvasRatio = cw / availableHeight;

        let drawW: number, drawH: number, drawX: number, drawY: number;

        if (imgRatio > canvasRatio) {
            drawW = cw;
            drawH = cw / imgRatio;
            drawX = 0;
            drawY = topPadding + (availableHeight - drawH) / 2;
        } else {
            drawH = availableHeight;
            drawW = availableHeight * imgRatio;
            drawX = (cw - drawW) / 2;
            drawY = topPadding;
        }

        ctx.drawImage(img, drawX, drawY, drawW, drawH);
    }, []);

    // Animation loop
    useEffect(() => {
        if (!isLoaded) return;

        const loop = () => {
            drawFrame();
            rafRef.current = requestAnimationFrame(loop);
        };
        rafRef.current = requestAnimationFrame(loop);

        return () => cancelAnimationFrame(rafRef.current);
    }, [isLoaded, drawFrame]);

    // Map scroll progress to frame index
    useMotionValueEvent(progress, "change", (v) => {
        if (imagesRef.current.length === 0) return;
        const idx = Math.min(
            Math.floor(v * imagesRef.current.length),
            imagesRef.current.length - 1
        );
        frameIndexRef.current = Math.max(0, idx);
    });

    // Resize handler
    useEffect(() => {
        const handleResize = () => drawFrame();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [drawFrame]);

    if (manifestError) {
        return (
            <div className="h-screen flex items-center justify-center bg-dark text-center p-8">
                <div className="glass-card p-8 max-w-md">
                    <h2 className="text-2xl font-bold text-primary mb-4">⚠️ Frames no encontrados</h2>
                    <p className="text-gray-400">
                        No se pudo cargar el manifest de frames. Ejecuta{" "}
                        <code className="text-accent bg-dark-surface px-2 py-1 rounded">npm run dev</code>{" "}
                        para generar <code className="text-accent bg-dark-surface px-2 py-1 rounded">public/frames/manifest.json</code> automáticamente.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <section ref={containerRef} className="relative" style={{ height: "200vh" }} id="inicio">
            {/* Sticky canvas */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full"
                    style={{ background: "#0A0A0A" }}
                />

                {/* Loader */}
                {!isLoaded && manifest.length > 0 && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark z-50">
                        <div className="text-center">
                            <div className="relative w-24 h-24 mx-auto mb-6">
                                <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="45" fill="none" stroke="#1A1A1A" strokeWidth="6" />
                                    <circle
                                        cx="50" cy="50" r="45" fill="none" stroke="#C62828" strokeWidth="6"
                                        strokeDasharray={`${2 * Math.PI * 45}`}
                                        strokeDashoffset={`${2 * Math.PI * 45 * (1 - loadProgress / 100)}`}
                                        strokeLinecap="round"
                                        className="transition-all duration-300"
                                    />
                                </svg>
                                <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-white">
                                    {loadProgress}%
                                </span>
                            </div>
                            <p className="text-gray-400 text-sm tracking-widest uppercase">Cargando experiencia</p>
                        </div>
                    </div>
                )}

                {/* Overlays */}
                {isLoaded && (
                    <>
                        {/* Top dark gradient to ensure Navbar legibility */}
                        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-dark via-dark/80 to-transparent pointer-events-none z-10" />

                        {/* Tagline 1 */}
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none px-4"
                            style={{ opacity: overlay2Opacity, y: overlayY2 }}
                        >
                            <p className="text-3xl sm:text-4xl lg:text-5xl font-light text-white text-center max-w-4xl leading-relaxed text-glow bg-dark/20 backdrop-blur-sm p-6 rounded-3xl border border-white/10">
                                Cocina auténtica costarricense<br />
                                <span className="text-primary-light font-medium">con alma internacional.</span>
                            </p>
                        </motion.div>

                        {/* Tagline 2 */}
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none px-4"
                            style={{ opacity: overlay3Opacity, y: overlayY3 }}
                        >
                            <p className="text-3xl sm:text-4xl lg:text-5xl font-light text-white text-center max-w-4xl leading-relaxed text-glow bg-dark/20 backdrop-blur-sm p-6 rounded-3xl border border-white/10">
                                Desde la leña hasta tu mesa.<br />
                                <span className="text-accent font-medium">Cada plato, una experiencia.</span>
                            </p>
                        </motion.div>

                        {/* CTA */}
                        <motion.div
                            className="absolute inset-0 flex flex-col items-center justify-end pb-32 z-30 px-4"
                            style={{ opacity: overlay4Opacity, y: overlayY4 }}
                        >
                            <div className="flex flex-col sm:flex-row gap-6">
                                <a href="#menu" className="btn-primary text-xl px-10 py-4 shadow-[0_0_30px_rgba(198,40,40,0.6)] hover:scale-105 transition-all pointer-events-auto">
                                    Ver Menú
                                </a>
                                <a href="#reservas" className="btn-secondary text-xl px-10 py-4 backdrop-blur-md bg-white/5 hover:bg-white/10 border border-white/20 transition-all pointer-events-auto">
                                    Reservar Mesa
                                </a>
                            </div>
                        </motion.div>

                        {/* Scroll indicator */}
                        <motion.div
                            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none text-glow"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <p className="text-xs text-white/70 tracking-[0.25em] font-medium uppercase">Desliza para explorar</p>
                            <motion.svg
                                width="24" height="24" viewBox="0 0 24 24" fill="none"
                                className="text-white/80"
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </motion.svg>
                        </motion.div>
                    </>
                )}
                {/* Vignette overlay */}
                <div className="absolute inset-0 pointer-events-none" style={{
                    background: "radial-gradient(ellipse at center, transparent 50%, rgba(10,10,10,0.6) 100%)"
                }} />
            </div>
        </section>
    );
}
