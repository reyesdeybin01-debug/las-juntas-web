"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { menuCategories, formatPrice } from "@/data/menuData";
import type { MenuCategory, SubCategory, MenuItem } from "@/data/menuData";

function MenuItemCard({ item }: { item: MenuItem }) {
    const { addItem } = useCart();

    return (
        <div className="flex items-center justify-between gap-3 p-3 sm:p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-primary/30 hover:bg-white/[0.06] transition-all duration-300 group">
            <div className="flex-1 min-w-0">
                <h4 className="text-sm sm:text-base font-medium text-white group-hover:text-primary-light transition-colors truncate">
                    {item.name}
                </h4>
                {item.description && (
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{item.description}</p>
                )}
                <span className="text-accent text-sm font-semibold mt-1 block">
                    {formatPrice(item.price)}
                </span>
            </div>
            <button
                onClick={() => addItem({ id: item.id, name: item.name, price: item.price })}
                className="shrink-0 w-9 h-9 rounded-full bg-primary/10 border border-primary/30 text-primary-light
                   hover:bg-primary hover:text-white hover:border-primary transition-all duration-300
                   flex items-center justify-center"
                aria-label={`Agregar ${item.name} al pedido`}
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                </svg>
            </button>
        </div>
    );
}

function SubCategorySection({ sub }: { sub: SubCategory }) {
    return (
        <div className="mb-8">
            <h3 className="text-lg font-semibold text-primary-light mb-4 flex items-center gap-2">
                <span className="w-8 h-px bg-primary/40" />
                {sub.name}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sub.items.map((item) => (
                    <MenuItemCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}

function CategoryContent({ category }: { category: MenuCategory }) {
    return (
        <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
        >
            {/* Banner */}
            <div className="relative h-40 sm:h-56 rounded-2xl overflow-hidden mb-8">
                <img
                    src={category.banner}
                    alt={category.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
                <div className="absolute bottom-4 left-6">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">{category.name}</h3>
                </div>
            </div>

            {/* Note */}
            {category.note && (
                <div className="glass-card p-4 mb-6 border-l-4 border-accent">
                    <p className="text-sm text-gray-300 italic">📌 {category.note}</p>
                </div>
            )}

            {/* Items */}
            {category.subcategories ? (
                category.subcategories.map((sub) => (
                    <SubCategorySection key={sub.name} sub={sub} />
                ))
            ) : category.items ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {category.items.map((item) => (
                        <MenuItemCard key={item.id} item={item} />
                    ))}
                </div>
            ) : null}
        </motion.div>
    );
}

export default function Menu() {
    const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);

    const current = menuCategories.find((c) => c.id === activeCategory) || menuCategories[0];

    return (
        <section id="menu" className="section-container">
            <motion.h2
                className="section-title title-glow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ duration: 0.6 }}
            >
                Nuestro <span className="text-primary">Menú</span>
            </motion.h2>
            <motion.p
                className="section-subtitle"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
            >
                Una experiencia gastronómica para todos los gustos
            </motion.p>

            {/* Category tabs */}
            <div className="sticky top-14 sm:top-16 z-30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3 bg-dark/80 backdrop-blur-xl border-y border-white/5 mb-8 overflow-x-auto scrollbar-hide">
                <div className="flex gap-2 min-w-max">
                    {menuCategories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${activeCategory === cat.id
                                ? "bg-primary text-white shadow-[0_0_15px_rgba(198,40,40,0.6)]"
                                : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                                }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Category content */}
            <AnimatePresence mode="wait">
                <CategoryContent category={current} />
            </AnimatePresence>
        </section>
    );
}
