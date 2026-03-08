"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatPrice } from "@/data/menuData";

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: { id: string; name: string; price: number } | null;
    onAdd: (item: { id: string; name: string; price: number; notes?: string; selectedOption?: string }) => void;
    notesPlaceholder?: string;
    itemOptions?: { label: string; options: string[] } | null;
}

const DEFAULT_PLACEHOLDER = "¿Desea algún cambio o detalle adicional en su pedido?";

export default function ProductModal({ isOpen, onClose, item, onAdd, notesPlaceholder, itemOptions }: ProductModalProps) {
    const [notes, setNotes] = useState("");
    const [selectedOption, setSelectedOption] = useState<string>("");

    const handleAdd = () => {
        if (!item) return;
        if (itemOptions && !selectedOption) return;
        onAdd({
            id: item.id,
            name: item.name,
            price: item.price,
            notes: notes.trim() || undefined,
            selectedOption: selectedOption || undefined,
        });
        setNotes("");
        setSelectedOption("");
        onClose();
    };

    const handleClose = () => {
        setNotes("");
        setSelectedOption("");
        onClose();
    };

    const canAdd = !itemOptions || !!selectedOption;

    return (
        <AnimatePresence>
            {isOpen && item && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed inset-0 z-[61] flex items-center justify-center p-4"
                    >
                        <div className="w-full max-w-md bg-dark-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                            {/* Header */}
                            <div className="flex items-center justify-between p-5 border-b border-white/10">
                                <div>
                                    <h3 className="text-lg font-bold text-white">{item.name}</h3>
                                    <p className="text-accent font-semibold mt-0.5">{formatPrice(item.price)}</p>
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
                            <div className="p-5 space-y-4">
                                {/* Option selection */}
                                {itemOptions && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            {itemOptions.label} *
                                        </label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {itemOptions.options.map((opt) => (
                                                <button
                                                    key={opt}
                                                    onClick={() => setSelectedOption(opt)}
                                                    className={`px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all duration-200 border ${
                                                        selectedOption === opt
                                                            ? "bg-primary/20 border-primary/50 text-primary-light"
                                                            : "bg-white/[0.04] border-white/[0.08] text-gray-300 hover:bg-white/[0.08] hover:border-white/20"
                                                    }`}
                                                >
                                                    <span className="flex items-center gap-2">
                                                        <span
                                                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                                                selectedOption === opt ? "border-primary" : "border-gray-500"
                                                            }`}
                                                        >
                                                            {selectedOption === opt && (
                                                                <span className="w-2 h-2 rounded-full bg-primary" />
                                                            )}
                                                        </span>
                                                        {opt}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">
                                        Detalles adicionales o modificaciones (opcional)
                                    </label>
                                    <textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        placeholder={notesPlaceholder || DEFAULT_PLACEHOLDER}
                                        rows={3}
                                        className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all duration-300 resize-none text-sm"
                                    />
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="p-5 border-t border-white/10">
                                <button
                                    onClick={handleAdd}
                                    disabled={!canAdd}
                                    className={`w-full py-3.5 rounded-full font-semibold text-base transition-all duration-300 ${
                                        canAdd
                                            ? "bg-primary text-white hover:bg-primary-light hover:shadow-lg hover:shadow-primary/20"
                                            : "bg-white/10 text-gray-500 cursor-not-allowed"
                                    }`}
                                >
                                    {canAdd ? "Agregar al carrito" : "Seleccione una opcion"}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
