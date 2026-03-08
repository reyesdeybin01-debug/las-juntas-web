"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatPrice } from "@/data/menuData";

const SIDES_OPTIONS = [
    "Arroz",
    "Ensalada",
    "Frijoles molidos",
    "Papas fritas",
    "Papas campesinas",
    "Papa asada",
    "Patacones",
    "Puré",
    "Pico de gallo",
    "Vegetales",
    "Yuca",
];

interface SidesModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: { id: string; name: string; price: number } | null;
    onAdd: (item: { id: string; name: string; price: number; sides: string[]; notes?: string; selectedOption?: string }) => void;
    notesPlaceholder?: string;
    itemOptions?: { label: string; options: string[] } | null;
}

const DEFAULT_PLACEHOLDER = "¿Desea algún cambio o detalle adicional en su pedido?";

export default function SidesModal({ isOpen, onClose, item, onAdd, notesPlaceholder, itemOptions }: SidesModalProps) {
    const [selectedSides, setSelectedSides] = useState<string[]>([]);
    const [notes, setNotes] = useState("");
    const [selectedOption, setSelectedOption] = useState<string>("");

    const toggleSide = useCallback((side: string) => {
        setSelectedSides((prev) => {
            if (prev.includes(side)) {
                return prev.filter((s) => s !== side);
            }
            if (prev.length >= 2) return prev;
            return [...prev, side];
        });
    }, []);

    const handleAdd = () => {
        if (!item || selectedSides.length !== 2) return;
        if (itemOptions && !selectedOption) return;
        onAdd({
            id: item.id,
            name: item.name,
            price: item.price,
            sides: selectedSides,
            notes: notes.trim() || undefined,
            selectedOption: selectedOption || undefined,
        });
        setSelectedSides([]);
        setNotes("");
        setSelectedOption("");
        onClose();
    };

    const handleClose = () => {
        setSelectedSides([]);
        setNotes("");
        setSelectedOption("");
        onClose();
    };

    const sidesOk = selectedSides.length === 2;
    const optionOk = !itemOptions || !!selectedOption;
    const canAdd = sidesOk && optionOk;

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
                        <div className="w-full max-w-md max-h-[90vh] bg-dark-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
                            {/* Header */}
                            <div className="flex items-center justify-between p-5 border-b border-white/10 shrink-0">
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

                            {/* Body - scrollable */}
                            <div className="flex-1 overflow-y-auto p-5 space-y-5">
                                {/* Sides selection */}
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <label className="text-sm font-medium text-gray-300">
                                            Seleccione 2 acompañamientos
                                        </label>
                                        <span
                                            className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                                                canAdd
                                                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                                    : "bg-white/10 text-gray-400 border border-white/10"
                                            }`}
                                        >
                                            {selectedSides.length}/2
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        {SIDES_OPTIONS.map((side) => {
                                            const isSelected = selectedSides.includes(side);
                                            const isDisabled = !isSelected && selectedSides.length >= 2;

                                            return (
                                                <button
                                                    key={side}
                                                    onClick={() => toggleSide(side)}
                                                    disabled={isDisabled}
                                                    className={`px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all duration-200 border ${
                                                        isSelected
                                                            ? "bg-primary/20 border-primary/50 text-primary-light"
                                                            : isDisabled
                                                            ? "bg-white/[0.02] border-white/[0.04] text-gray-600 cursor-not-allowed"
                                                            : "bg-white/[0.04] border-white/[0.08] text-gray-300 hover:bg-white/[0.08] hover:border-white/20"
                                                    }`}
                                                >
                                                    <span className="flex items-center gap-2">
                                                        <span
                                                            className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                                                                isSelected
                                                                    ? "bg-primary border-primary"
                                                                    : "border-gray-500"
                                                            }`}
                                                        >
                                                            {isSelected && (
                                                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                                                    <path d="M20 6L9 17l-5-5" />
                                                                </svg>
                                                            )}
                                                        </span>
                                                        {side}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

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

                                {/* Notes */}
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
                            <div className="p-5 border-t border-white/10 shrink-0">
                                <button
                                    onClick={handleAdd}
                                    disabled={!canAdd}
                                    className={`w-full py-3.5 rounded-full font-semibold text-base transition-all duration-300 ${
                                        canAdd
                                            ? "bg-primary text-white hover:bg-primary-light hover:shadow-lg hover:shadow-primary/20"
                                            : "bg-white/10 text-gray-500 cursor-not-allowed"
                                    }`}
                                >
                                {canAdd ? "Agregar al carrito" : !sidesOk ? `Seleccione ${2 - selectedSides.length} acompañamiento${selectedSides.length === 1 ? "" : "s"} mas` : "Seleccione una opcion"}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
