"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { featuredDishes, formatPrice, ITEM_OPTIONS } from "@/data/menuData";
import ProductModal from "./ProductModal";
import SidesModal from "./SidesModal";

// IDs that belong to the "Platos Fuertes" category (Mar, Pollo, Res, Cerdo)
const PLATOS_FUERTES_IDS = new Set([
    "ma1","ma2","ma3","ma4","ma5","ma6",
    "po1","po2","po3","po4","po5",
    "re1","re2","re3","re4","re5","re6","re7","re8","re9","re10","re11",
    "cd1","cd2","cd3","cd4",
]);

// Items that need the "término de cocción" placeholder (Mar, Res, Hamburguesas)
const TERMINO_IDS = new Set([
    "ma1","ma2","ma3","ma4","ma5","ma6",
    "re1","re2","re3","re4","re5","re6","re7","re8","re9","re10","re11",
    "hb1","hb2","hb3","hb4","hb5","hb6","hb7","hb8",
]);
const TERMINO_PLACEHOLDER = "¿Desea algún cambio en su pedido? Indique el término de cocción (1/4, medio, 3/4, bien cocido)";

export default function FeaturedDishes() {
    const { addItem } = useCart();
    const [pendingItem, setPendingItem] = useState<{ id: string; name: string; price: number } | null>(null);
    const [modalType, setModalType] = useState<"product" | "sides" | null>(null);
    const [notesPlaceholder, setNotesPlaceholder] = useState<string | undefined>(undefined);
    const [pendingOptions, setPendingOptions] = useState<{ label: string; options: string[] } | null>(null);

    const handleClickAdd = useCallback((dish: { id: string; name: string; price: number }) => {
        setPendingItem(dish);
        setNotesPlaceholder(TERMINO_IDS.has(dish.id) ? TERMINO_PLACEHOLDER : undefined);
        setPendingOptions(ITEM_OPTIONS[dish.id] || null);
        if (PLATOS_FUERTES_IDS.has(dish.id)) {
            setModalType("sides");
        } else {
            setModalType("product");
        }
    }, []);

    const handleCloseModal = useCallback(() => {
        setPendingItem(null);
        setModalType(null);
    }, []);

    const handleAddProduct = useCallback(
        (item: { id: string; name: string; price: number; notes?: string }) => {
            addItem(item);
        },
        [addItem]
    );

    const handleAddWithSides = useCallback(
        (item: { id: string; name: string; price: number; sides: string[]; notes?: string }) => {
            addItem(item);
        },
        [addItem]
    );

    return (
        <>
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
                                    onClick={() => handleClickAdd({ id: dish.id, name: dish.name, price: dish.price })}
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

            {/* Modals */}
            <ProductModal
                isOpen={modalType === "product"}
                onClose={handleCloseModal}
                item={pendingItem}
                onAdd={handleAddProduct}
                notesPlaceholder={notesPlaceholder}
                itemOptions={pendingOptions}
            />
            <SidesModal
                isOpen={modalType === "sides"}
                onClose={handleCloseModal}
                item={pendingItem}
                onAdd={handleAddWithSides}
                notesPlaceholder={notesPlaceholder}
                itemOptions={pendingOptions}
            />
        </>
    );
}
