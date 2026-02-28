"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type CartItem = {
    id: string;
    name: string;
    capacity: string;
    weight: string;
    selectedColor: string;
    colorHex: string;
    quantity: number;
    image?: string;
};

type CartContextType = {
    items: CartItem[];
    addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
    removeItem: (id: string, selectedColor: string, weight: string) => void;
    updateQuantity: (id: string, quantity: number, selectedColor: string, weight: string) => void;
    clearCart: () => void;
    totalItems: number;
    totalUnits: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "starplast_inquiry_cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [loaded, setLoaded] = useState(false);

    // Load from localStorage
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                setItems(JSON.parse(stored));
            }
        } catch {
            // ignore
        }
        setLoaded(true);
    }, []);

    // Persist to localStorage
    useEffect(() => {
        if (loaded) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        }
    }, [items, loaded]);

    const addItem = useCallback((item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.id === item.id && i.selectedColor === item.selectedColor && i.weight === item.weight);
            if (existing) {
                return prev.map((i) =>
                    i.id === item.id && i.selectedColor === item.selectedColor && i.weight === item.weight
                        ? { ...i, quantity: i.quantity + (item.quantity || 1) }
                        : i
                );
            }
            return [...prev, { ...item, quantity: item.quantity || 1 }];
        });
    }, []);

    const removeItem = useCallback((id: string, selectedColor: string, weight: string) => {
        setItems((prev) => prev.filter((i) => !(i.id === id && i.selectedColor === selectedColor && i.weight === weight)));
    }, []);

    const updateQuantity = useCallback((id: string, quantity: number, selectedColor: string, weight: string) => {
        setItems((prev) =>
            prev.map((i) => (i.id === id && i.selectedColor === selectedColor && i.weight === weight ? { ...i, quantity: Math.max(1, quantity) } : i))
        );
    }, []);

    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    const totalItems = items.length;
    const totalUnits = items.reduce((sum, i) => sum + i.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalUnits }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
}
