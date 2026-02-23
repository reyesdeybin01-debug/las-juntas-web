"use client";

import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { featuredDishes, formatPrice } from "@/data/menuData";

export default function FeaturedDishes() {
    const { addItem } = useCart();

    return (
        <section id="destacados" className="section-container relative z-10">
            <motion.h2
                className="section-title title-glow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ duration: 0.6 }}
            >
                Lo Más <span className="text-primary text-glow">Pedido</span>
            </motion.h2>
            <motion.p
                className="section-subtitle"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
            >
                Los favoritos de nuestros clientes
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {featuredDishes.map((dish, i) => (
                    <motion.div
                        key={dish.id}
                        className="glass-card-hover overflow-hidden group cursor-pointer"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "0px" }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                        <div className="relative h-52 sm:h-56 overflow-hidden">
                            <img
                                src={dish.image}
                                alt={dish.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
                            <span className="absolute top-4 right-4 bg-primary/90 text-white text-sm font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                                {formatPrice(dish.price)}
                            </span>
                        </div>
                        <div className="p-5">
                            <h3 className="text-lg font-semibold text-white mb-3">{dish.name}</h3>
                            <button
                                onClick={() => addItem({ id: dish.id, name: dish.name, price: dish.price })}
                                className="w-full py-2.5 px-4 rounded-full bg-primary/10 border border-primary/30 text-primary-light text-sm font-medium
                           hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                            >
                                Agregar al pedido
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
