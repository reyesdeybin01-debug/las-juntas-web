"use client";

import { motion } from "framer-motion";

export default function Contact() {
    return (
        <section id="contacto" className="section-container relative z-10">
            <motion.h2
                className="section-title title-glow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ duration: 0.6 }}
            >
                Encuéntranos
            </motion.h2>
            <motion.p
                className="section-subtitle"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
            >
                Visítanos en San Luis de Santo Domingo de Heredia
            </motion.p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Map */}
                <motion.div
                    className="rounded-2xl overflow-hidden h-72 sm:h-96 border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.05)]"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px" }}
                    transition={{ duration: 0.6 }}
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15720.11!2d-84.08!3d10.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSan+Luis+de+Santo+Domingo+de+Heredia!5e0!3m2!1ses!2scr!4v1700000000000"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Ubicación de Las Juntas Bar Restaurante"
                    />
                </motion.div>

                {/* Contact info */}
                <motion.div
                    className="flex flex-col justify-center gap-6"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <a
                        href="https://wa.me/50664111118"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-card-hover p-5 flex items-center gap-4"
                    >
                        <span className="text-3xl">📞</span>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">WhatsApp</p>
                            <p className="text-white font-medium">+506 6411-1118</p>
                        </div>
                    </a>

                    <a
                        href="https://facebook.com/RestauranteLasJuntas"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-card-hover p-5 flex items-center gap-4"
                    >
                        <span className="text-3xl">📘</span>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Facebook</p>
                            <p className="text-white font-medium">RestauranteLasJuntas</p>
                        </div>
                    </a>

                    <a
                        href="mailto:lasjuntasrestaurante@gmail.com"
                        className="glass-card-hover p-5 flex items-center gap-4"
                    >
                        <span className="text-3xl">📧</span>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Email</p>
                            <p className="text-white font-medium">lasjuntasrestaurante@gmail.com</p>
                        </div>
                    </a>

                    <a
                        href="https://www.lasjuntascr.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-card-hover p-5 flex items-center gap-4"
                    >
                        <span className="text-3xl">🌐</span>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">Sitio Web</p>
                            <p className="text-white font-medium">www.lasjuntascr.com</p>
                        </div>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
