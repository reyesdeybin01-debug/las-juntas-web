"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/data/menuData";

export default function Cart() {
    const {
        items, isOpen, setIsOpen,
        removeItem, updateQuantity, clearCart,
        totalItems, totalPrice, formatWhatsAppMessage,
        deliveryType, setDeliveryType,
    } = useCart();

    const canSend = items.length > 0 && deliveryType !== null;
    const whatsappUrl = `https://wa.me/50683452464?text=${formatWhatsAppMessage()}`;

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
                                    Tu Pedido <span className="text-gray-500 text-sm font-normal">({totalItems})</span>
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
                                        <p className="text-gray-500 text-lg mb-2">Tu carrito esta vacio</p>
                                        <p className="text-gray-600 text-sm">Agrega platillos desde el menu</p>
                                    </div>
                                ) : (
                                    items.map((item, idx) => (
                                        <div
                                            key={`${item.id}-${idx}`}
                                            className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-medium text-white truncate">
                                                        {item.name}
                                                        {item.selectedOption && (
                                                            <span className="text-primary-light font-normal"> - {item.selectedOption}</span>
                                                        )}
                                                    </h4>
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

                                            {/* Sides */}
                                            {item.sides && item.sides.length > 0 && (
                                                <p className="text-xs text-gray-400 mt-2 pl-1">
                                                    <span className="text-gray-500 font-medium">Acomp:</span> {item.sides.join(", ")}
                                                </p>
                                            )}

                                            {/* Notes */}
                                            {item.notes && (
                                                <p className="text-xs text-gray-400 mt-1 pl-1 italic">
                                                    <span className="text-gray-500 font-medium not-italic">Nota:</span> {item.notes}
                                                </p>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Footer */}
                            {items.length > 0 && (
                                <div className="border-t border-white/10 p-6 space-y-4">
                                    {/* Subtotal */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400">Subtotal aprox.</span>
                                        <span className="text-2xl font-bold text-accent">{formatPrice(totalPrice)}</span>
                                    </div>

                                    {/* Delivery type selector */}
                                    <div className="space-y-2">
                                        <p className="text-sm text-gray-400 font-medium">Tipo de entrega *</p>
                                        <label
                                            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 ${deliveryType === "pickup"
                                                    ? "bg-primary/10 border-primary/40 text-white"
                                                    : "bg-white/[0.03] border-white/[0.08] text-gray-400 hover:border-white/20"
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="deliveryType"
                                                value="pickup"
                                                checked={deliveryType === "pickup"}
                                                onChange={() => setDeliveryType("pickup")}
                                                className="sr-only"
                                            />
                                            <span
                                                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${deliveryType === "pickup" ? "border-primary" : "border-gray-500"
                                                    }`}
                                            >
                                                {deliveryType === "pickup" && (
                                                    <span className="w-2 h-2 rounded-full bg-primary" />
                                                )}
                                            </span>
                                            <span className="text-sm">Paso a recoger al restaurante</span>
                                        </label>
                                        <label
                                            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 ${deliveryType === "delivery"
                                                    ? "bg-primary/10 border-primary/40 text-white"
                                                    : "bg-white/[0.03] border-white/[0.08] text-gray-400 hover:border-white/20"
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="deliveryType"
                                                value="delivery"
                                                checked={deliveryType === "delivery"}
                                                onChange={() => setDeliveryType("delivery")}
                                                className="sr-only"
                                            />
                                            <span
                                                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${deliveryType === "delivery" ? "border-primary" : "border-gray-500"
                                                    }`}
                                            >
                                                {deliveryType === "delivery" && (
                                                    <span className="w-2 h-2 rounded-full bg-primary" />
                                                )}
                                            </span>
                                            <span className="text-sm">Deseo envio a domicilio</span>
                                        </label>
                                    </div>

                                    {/* Delivery note */}
                                    {deliveryType === "delivery" && (
                                        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                                            <p className="text-xs text-amber-300 leading-relaxed">
                                                Al enviar el pedido, compartiras tu ubicacion por WhatsApp para que el restaurante calcule el costo del envio.
                                            </p>
                                        </div>
                                    )}

                                    {/* Send button */}
                                    <a
                                        href={canSend ? whatsappUrl : undefined}
                                        target={canSend ? "_blank" : undefined}
                                        rel="noopener noreferrer"
                                        onClick={(e) => { if (!canSend) e.preventDefault(); }}
                                        className={`block w-full py-3.5 rounded-full text-center font-semibold transition-all duration-300 ${canSend
                                                ? "bg-green-600 text-white hover:bg-green-500 hover:shadow-lg hover:shadow-green-600/20"
                                                : "bg-white/10 text-gray-500 cursor-not-allowed"
                                            }`}
                                    >
                                        Enviar Pedido por WhatsApp
                                    </a>

                                    {!deliveryType && (
                                        <p className="text-xs text-center text-gray-500">Seleccione tipo de entrega para enviar</p>
                                    )}

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
