"use client";

import { motion } from "framer-motion";

export default function AboutUs() {
    return (
        <section id="nosotros" className="section-container relative z-10">
            <motion.h2
                className="section-title title-glow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ duration: 0.6 }}
            >
                Nuestra <span className="text-primary text-glow">Historia</span>
            </motion.h2>
            <motion.p
                className="section-subtitle"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
            >
                Más que un restaurante, una experiencia
            </motion.p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                {/* Image */}
                <motion.div
                    className="relative rounded-2xl overflow-hidden h-72 sm:h-96 shadow-[0_0_40px_rgba(255,255,255,0.05)] border border-white/10"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "0px" }}
                    transition={{ duration: 0.7 }}
                >
                    <img
                        src="/images/nosotros.jpg"
                        alt="Equipo de Las Juntas Bar Restaurante"
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent" />
                </motion.div>

                {/* Text */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "0px" }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8">
                        Las Juntas Bar Restaurante nació con la pasión de ofrecer a cada visitante una experiencia
                        gastronómica única, donde los sabores auténticos de Costa Rica se fusionan con lo mejor de
                        la cocina internacional. Ubicados en el corazón de San Luis de Santo Domingo de Heredia,
                        rodeados de naturaleza y tradición, abrimos nuestras puertas para que cada comida se
                        convierta en un momento especial.
                    </p>
                    <p className="text-xs text-gray-600 italic mb-8">
                        (Texto provisional — será reemplazado por la historia real del restaurante)
                    </p>

                    {/* Contact details */}
                    <div className="space-y-4">
                        {[
                            { icon: "📍", text: "San Luis de Santo Domingo de Heredia, Costa Rica" },
                            { icon: "📞", text: "WhatsApp: 8345-2464", href: "https://wa.me/50683452464" },
                            { icon: "📧", text: "lasjuntasrestaurante@gmail.com", href: "mailto:lasjuntasrestaurante@gmail.com" },
                            { icon: "📘", text: "Facebook: RestauranteLasJuntas", href: "https://facebook.com/RestauranteLasJuntas" },
                        ].map(({ icon, text, href }) => (
                            <div key={text} className="flex items-center gap-3 text-gray-400">
                                <span className="text-xl">{icon}</span>
                                {href ? (
                                    <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                                        {text}
                                    </a>
                                ) : (
                                    <span>{text}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
