"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { formatPrice } from "@/data/menuData";

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    sides?: string[];
    notes?: string;
    selectedOption?: string;
}

export type DeliveryType = "pickup" | "delivery" | null;

interface CartContextType {
    items: CartItem[];
    addItem: (item: Omit<CartItem, "quantity">) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    deliveryType: DeliveryType;
    setDeliveryType: (type: DeliveryType) => void;
    formatWhatsAppMessage: () => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [deliveryType, setDeliveryType] = useState<DeliveryType>(null);

    const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
        setItems((prev) => {
            const matchKey = (a: Omit<CartItem, "quantity">, b: CartItem) =>
                a.id === b.id &&
                (a.sides || []).join(",") === (b.sides || []).join(",") &&
                (a.notes || "") === (b.notes || "") &&
                (a.selectedOption || "") === (b.selectedOption || "");
            const existing = prev.find((i) => matchKey(item, i));
            if (existing) {
                return prev.map((i) =>
                    matchKey(item, i) ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    }, []);

    const removeItem = useCallback((id: string) => {
        setItems((prev) => prev.filter((i) => i.id !== id));
    }, []);

    const updateQuantity = useCallback((id: string, quantity: number) => {
        if (quantity <= 0) {
            setItems((prev) => prev.filter((i) => i.id !== id));
            return;
        }
        setItems((prev) =>
            prev.map((i) => (i.id === id ? { ...i, quantity } : i))
        );
    }, []);

    const clearCart = useCallback(() => {
        setItems([]);
        setDeliveryType(null);
    }, []);

    const totalItems = useMemo(
        () => items.reduce((sum, i) => sum + i.quantity, 0),
        [items]
    );

    const totalPrice = useMemo(
        () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
        [items]
    );

    const formatWhatsAppMessage = useCallback(() => {
        const itemLines = items
            .map((i) => {
                const displayName = i.selectedOption
                    ? `${i.name} (${i.selectedOption})`
                    : i.name;
                let line = `- ${displayName} x${i.quantity} -- ${formatPrice(i.price)}`;
                if (i.sides && i.sides.length > 0) {
                    line += `\n  Acompañamientos: ${i.sides.join(", ")}`;
                }
                if (i.notes && i.notes.trim()) {
                    line += `\n  Nota: ${i.notes.trim()}`;
                }
                return line;
            })
            .join("\n\n");

        const subtotal = formatPrice(totalPrice);

        let mensaje = `Hola, me gustaria hacer el siguiente pedido:\n\nPEDIDO:\n${itemLines}\n\n`;

        if (deliveryType === "pickup") {
            mensaje += `Subtotal aproximado: ${subtotal}\n*El total final se confirma con el restaurante (incluye empaque)\n\nPaso a recoger. Gracias!`;
        } else if (deliveryType === "delivery") {
            mensaje += `Subtotal aproximado: ${subtotal}\n*El total final se confirma con el restaurante (incluye empaque y envio)\n\nEnvio a domicilio, les comparto mi ubicacion. Gracias!`;
        }

        return encodeURIComponent(mensaje);
    }, [items, totalPrice, deliveryType]);

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                totalItems,
                totalPrice,
                isOpen,
                setIsOpen,
                deliveryType,
                setDeliveryType,
                formatWhatsAppMessage,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
}
