"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/data/menuData";

export default function Cart() {
    const {
        items, isOpen, setIsOpen,
        removeItem, updateQuantity, clearCart,
        totalItems, totalPrice, formatWhatsAppMessage,
    } = useCart();

    const whatsappUrl = `https://wa.me/50664111118?text=${formatWhatsAppMessage()}`;

    return (
        <>
            {/* Floating cart button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-primary text-white shadow-[0_0_20px_rgba(198,40,40,0.5)]
                   flex items-center justify-center hover:bg-primary-light hover:scale-110 hover:shadow-[0_0_30px_rgba(198,40,40,0.8)] transition-all duration-300"
                aria-label="Abrir carrito de pedidos"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-6 h-6 bg-accent text-dark text-xs rounded-full flex items-center justify-center font-bold">
                        {totalItems}
                    </span>
                )}
            </button>

            {/* Slide-over panel */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        />

                        {/* Panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-dark-card border-l border-white/10 z-50 flex flex-col"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-white/10">
                                <h2 className="text-xl font-bold">
                                    🛒 Tu Pedido <span className="text-gray-500 text-sm font-normal">({totalItems})</span>
                                </h2>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                    aria-label="Cerrar carrito"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                        <path d="M18 6L6 18M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Items */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                {items.length === 0 ? (
                                    <div className="text-center py-20">
                                        <p className="text-gray-500 text-lg mb-2">Tu carrito está vacío</p>
                                        <p className="text-gray-600 text-sm">Agrega platillos desde el menú</p>
                                    </div>
                                ) : (
                                    items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                                        >
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-medium text-white truncate">{item.name}</h4>
                                                <p className="text-accent text-sm font-semibold mt-0.5">
                                                    {formatPrice(item.price * item.quantity)}
                                                </p>
                                            </div>

                                            {/* Quantity controls */}
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-7 h-7 rounded-full bg-white/10 text-white hover:bg-primary/30 transition-colors flex items-center justify-center text-sm"
                                                    aria-label="Reducir cantidad"
                                                >
                                                    −
                                                </button>
                                                <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-7 h-7 rounded-full bg-white/10 text-white hover:bg-primary/30 transition-colors flex items-center justify-center text-sm"
                                                    aria-label="Aumentar cantidad"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="p-1.5 text-gray-500 hover:text-red-400 transition-colors"
                                                aria-label="Eliminar del carrito"
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                                    <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Footer */}
                            {items.length > 0 && (
                                <div className="border-t border-white/10 p-6 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400">Total</span>
                                        <span className="text-2xl font-bold text-accent">{formatPrice(totalPrice)}</span>
                                    </div>

                                    <a
                                        href={whatsappUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full py-3.5 rounded-full bg-green-600 text-white text-center font-semibold
                               hover:bg-green-500 transition-all duration-300 hover:shadow-lg hover:shadow-green-600/20"
                                    >
                                        📲 Enviar Pedido por WhatsApp
                                    </a>

                                    <button
                                        onClick={clearCart}
                                        className="w-full py-2 text-sm text-gray-500 hover:text-red-400 transition-colors"
                                    >
                                        Vaciar carrito
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
