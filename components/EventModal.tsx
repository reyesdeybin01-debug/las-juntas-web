"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EVENT_TYPES = [
    "Cumpleaños",
    "Aniversario",
    "Reunión empresarial",
    "Boda",
    "Graduación",
    "Despedida",
    "Otro",
];

interface EventModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function EventModal({ isOpen, onClose }: EventModalProps) {
    const [form, setForm] = useState({
        name: "",
        eventType: EVENT_TYPES[0],
        guests: "10",
        date: "",
        time: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const today = new Date().toISOString().split("T")[0];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};
        if (!form.name.trim()) newErrors.name = "Nombre requerido";
        if (!form.date) newErrors.date = "Fecha requerida";
        if (!form.time) newErrors.time = "Hora requerida";
        if (!form.guests) newErrors.guests = "Cantidad requerida";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        const mensaje = `Hola, me gustaria consultar sobre el salon de eventos:\n\nNombre: ${form.name}\nTipo de evento: ${form.eventType}\nCantidad de personas: ${form.guests}\nFecha: ${form.date}\nHora: ${form.time}\n\nQuedo pendiente de la informacion. Gracias!`;
        const encoded = encodeURIComponent(mensaje);
        window.open(`https://wa.me/50683452464?text=${encoded}`, "_blank");
        onClose();
    };

    const handleClose = () => {
        setErrors({});
        onClose();
    };

    const inputClasses =
        "w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all duration-300";

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed inset-0 z-[61] flex items-center justify-center p-4"
                    >
                        <div className="w-full max-w-lg max-h-[90vh] bg-dark-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
                            {/* Header */}
                            <div className="flex items-center justify-between p-5 border-b border-white/10 shrink-0">
                                <div>
                                    <h3 className="text-lg font-bold text-white">Consulta - Salón de Eventos</h3>
                                    <p className="text-sm text-gray-400 mt-0.5">Complete los datos para consultar disponibilidad</p>
                                </div>
                                <button
                                    onClick={handleClose}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                    aria-label="Cerrar"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                        <path d="M18 6L6 18M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Body */}
                            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Nombre Completo *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Tu nombre"
                                        className={inputClasses}
                                    />
                                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                                </div>

                                {/* Event type */}
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Tipo de Evento *</label>
                                    <select
                                        name="eventType"
                                        value={form.eventType}
                                        onChange={handleChange}
                                        className={inputClasses}
                                    >
                                        {EVENT_TYPES.map((t) => (
                                            <option key={t} value={t} className="bg-dark">{t}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Guests + Date */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Personas *</label>
                                        <select
                                            name="guests"
                                            value={form.guests}
                                            onChange={handleChange}
                                            className={inputClasses}
                                        >
                                            {Array.from({ length: 100 }, (_, i) => i + 1).map((n) => (
                                                <option key={n} value={n} className="bg-dark">{n} persona{n !== 1 ? "s" : ""}</option>
                                            ))}
                                        </select>
                                        {errors.guests && <p className="text-red-400 text-xs mt-1">{errors.guests}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Fecha *</label>
                                        <input
                                            type="date"
                                            name="date"
                                            value={form.date}
                                            onChange={handleChange}
                                            min={today}
                                            className={inputClasses}
                                        />
                                        {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date}</p>}
                                    </div>
                                </div>

                                {/* Time */}
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Hora *</label>
                                    <input
                                        type="time"
                                        name="time"
                                        value={form.time}
                                        onChange={handleChange}
                                        min="08:00"
                                        max="22:00"
                                        className={inputClasses}
                                    />
                                    {errors.time && <p className="text-red-400 text-xs mt-1">{errors.time}</p>}
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    className="w-full py-3.5 rounded-full bg-primary text-white font-semibold text-base
                                        hover:bg-primary-light transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 mt-2"
                                >
                                    Consultar por WhatsApp
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
