"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const occasions = [
    "Cena familiar",
    "Cumpleaños",
    "Aniversario",
    "Reunión de negocios",
    "Cita romántica",
    "Celebración especial",
    "Otro",
];

export default function Reservations() {
    const [form, setForm] = useState({
        name: "",
        date: "",
        time: "",
        guests: "2",
        occasion: occasions[0],
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

        const mensaje = `Hola 👋, quiero confirmar mi reserva en el restaurante:\n\n👤 Nombre: ${form.name}\n📅 Fecha: ${form.date}\n⏰ Hora: ${form.time}\n👥 Personas: ${form.guests}\n\n🎉 Ocasión: ${form.occasion}\nQuedo atento(a) a la confirmación. ¡Muchas gracias! ✨`;
        const encodedMessage = encodeURIComponent(mensaje);

        window.open(`https://wa.me/50664111118?text=${encodedMessage}`, "_blank");
    };

    const inputClasses =
        "w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all duration-300";

    return (
        <section id="reservas" className="py-20 sm:py-28 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h2
                    className="section-title title-glow"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px" }}
                    transition={{ duration: 0.6 }}
                >
                    Reserva Tu <span className="text-primary text-glow">Mesa</span>
                </motion.h2>
                <motion.p
                    className="section-subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    Asegura tu lugar para una experiencia inolvidable
                </motion.p>

                <motion.div
                    className="max-w-xl mx-auto"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <form
                        onSubmit={handleSubmit}
                        className="glass-card p-6 sm:p-10 space-y-5 shadow-[0_0_40px_rgba(198,40,40,0.15)]"
                    >
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

                        {/* Date + Time */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Hora *</label>
                                <input
                                    type="time"
                                    name="time"
                                    value={form.time}
                                    onChange={handleChange}
                                    min="11:00"
                                    max="22:00"
                                    className={inputClasses}
                                />
                                {errors.time && <p className="text-red-400 text-xs mt-1">{errors.time}</p>}
                            </div>
                        </div>

                        {/* Guests + Occasion */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Personas *</label>
                                <select name="guests" value={form.guests} onChange={handleChange} className={inputClasses}>
                                    {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                                        <option key={n} value={n} className="bg-dark">{n} {n === 1 ? "persona" : "personas"}</option>
                                    ))}
                                </select>
                                {errors.guests && <p className="text-red-400 text-xs mt-1">{errors.guests}</p>}
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Tipo de Ocasión</label>
                                <select name="occasion" value={form.occasion} onChange={handleChange} className={inputClasses}>
                                    {occasions.map((o) => (
                                        <option key={o} value={o} className="bg-dark">{o}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3.5 rounded-full bg-primary text-white font-semibold text-lg
                         hover:bg-primary-light transition-all duration-300 hover:shadow-lg hover:shadow-primary/20
                         focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark mt-4"
                        >
                            Confirmar Reserva por WhatsApp
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
