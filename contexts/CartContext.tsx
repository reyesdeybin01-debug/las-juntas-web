"use client";

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

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
    formatWhatsAppMessage: () => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const addItem = useCallback((item: Omit<CartItem, "quantity">) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            if (existing) {
                return prev.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
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

    const clearCart = useCallback(() => setItems([]), []);

    const totalItems = useMemo(
        () => items.reduce((sum, i) => sum + i.quantity, 0),
        [items]
    );

    const totalPrice = useMemo(
        () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
        [items]
    );

    const formatWhatsAppMessage = useCallback(() => {
        const itemsList = items
            .map(
                (i) =>
                    `• ${i.name} x${i.quantity} — ₡${(i.price * i.quantity).toLocaleString("es-CR")}`
            )
            .join("\n");
        return encodeURIComponent(
            `Hola \uD83D\uDC4B, quiero realizar el siguiente pedido:\n\n\uD83D\uDED2 Pedido:\n${itemsList}\n\n\uD83D\uDCB0 Total: \u20A1${totalPrice.toLocaleString("es-CR")}\n\nQuedo atento(a) a la confirmación. Gracias \uD83C\uDF7D\uFE0F\u2728`
        );
    }, [items, totalPrice]);

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
