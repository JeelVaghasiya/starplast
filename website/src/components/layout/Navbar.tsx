"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";

type NavbarProps = {
    /** "main" = homepage with section links, "inner" = subpages with Home button */
    variant?: "main" | "inner";
};

export function Navbar({ variant = "main" }: NavbarProps) {
    const { totalItems } = useCart();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        if (variant !== "main") {
            setIsScrolled(true);
            return;
        }

        const handleScroll = () => {
            const threshold = window.innerHeight * 2;
            setIsScrolled(window.scrollY > threshold);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => window.removeEventListener("scroll", handleScroll);
    }, [variant]);

    const scrollTo = (id: string) => {
        setMobileOpen(false);
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${isScrolled
                ? "bg-[#E4E4E4]/90 backdrop-blur-md border-[#E4E4E4] h-20"
                : "bg-transparent border-transparent h-24"
                }`}
        >
            <div className="max-w-[1400px] mx-auto flex items-center justify-between h-full px-6 md:px-10">
                {/* Logo — already contains "STAR PLAST" text */}
                <Link href="/" className="shrink-0">
                    <Image src="/logo.png" alt="Star Plast" width={160} height={60} className={`w-auto transition-all duration-500 ${isScrolled ? "h-[88px]" : "h-[88px]"}`} />
                </Link>

                {/* Desktop Navigation */}
                {variant === "main" ? (
                    <nav className="hidden md:flex items-center gap-10">
                        <button
                            onClick={() => scrollTo("about")}
                            className="text-[12px] font-medium text-gray-800 tracking-[0.15em] hover:text-[#1A1A54] transition-colors uppercase"
                        >
                            About
                        </button>
                        <button
                            onClick={() => scrollTo("products")}
                            className="text-[12px] font-medium text-gray-800 tracking-[0.15em] hover:text-[#1A1A54] transition-colors uppercase"
                        >
                            Products
                        </button>
                        <button
                            onClick={() => scrollTo("contact")}
                            className="text-[12px] font-medium text-gray-800 tracking-[0.15em] hover:text-[#1A1A54] transition-colors uppercase"
                        >
                            Contact
                        </button>
                    </nav>
                ) : (
                    <nav className="hidden md:flex items-center gap-10">
                        <Link
                            href="/"
                            className="text-[12px] font-medium text-gray-800 tracking-[0.15em] hover:text-[#1A1A54] transition-colors uppercase"
                        >
                            Home
                        </Link>
                    </nav>
                )}

                {/* Right Actions */}
                <div className="flex items-center gap-4">
                    <Link href="/cart" className="relative p-2 text-gray-700 hover:text-[#1A1A54] transition-colors">
                        <ShoppingCart className="w-5 h-5" strokeWidth={1.5} />
                        {totalItems > 0 && (
                            <span className="absolute -top-0.5 -right-0.5 bg-[#1A1A54] text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                    {variant === "main" ? (
                        <button
                            onClick={() => scrollTo("contact")}
                            className="hidden sm:flex items-center justify-center bg-[#1A1A54] text-white text-[11px] font-bold tracking-[0.15em] uppercase px-6 py-2.5 rounded hover:bg-[#2A2A64] transition-colors cursor-pointer"
                        >
                            Request Quote
                        </button>
                    ) : (
                        <Link
                            href="/#contact"
                            className="hidden sm:flex items-center justify-center bg-[#1A1A54] text-white text-[11px] font-bold tracking-[0.15em] uppercase px-6 py-2.5 rounded hover:bg-[#2A2A64] transition-colors"
                        >
                            Request Quote
                        </Link>
                    )}

                    {/* Mobile Menu Button */}
                    <button className="md:hidden p-2 text-gray-700" onClick={() => setMobileOpen(!mobileOpen)}>
                        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
                    <div className="flex flex-col py-4 px-6 gap-1">
                        {variant === "main" ? (
                            <>
                                <button
                                    onClick={() => scrollTo("about")}
                                    className="py-3 text-left text-sm font-medium text-gray-800 tracking-wider uppercase border-b border-gray-50"
                                >
                                    About
                                </button>
                                <button
                                    onClick={() => scrollTo("products")}
                                    className="py-3 text-left text-sm font-medium text-gray-800 tracking-wider uppercase border-b border-gray-50"
                                >
                                    Products
                                </button>
                                <button
                                    onClick={() => scrollTo("contact")}
                                    className="py-3 text-left text-sm font-medium text-gray-800 tracking-wider uppercase"
                                >
                                    Contact
                                </button>
                            </>
                        ) : (
                            <Link
                                href="/"
                                className="py-3 text-left text-sm font-medium text-gray-800 tracking-wider uppercase"
                            >
                                Home
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
