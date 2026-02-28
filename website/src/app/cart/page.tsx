"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function CartPage() {
    const { items, removeItem, updateQuantity, totalItems, totalUnits } = useCart();
    const [notes, setNotes] = useState("");

    const formatMessage = () => {
        let message = "STAR PLAST - FORMAL INQUIRY\n\n";

        const getColorName = (color: string, hex: string) => {
            const genericNames = ["primary", "variant", "default", "standard tint", "color"];
            const normalizedColor = color ? color.toLowerCase().trim() : "";

            // If the name is already a real color (not a generic placeholder or hex), use it
            if (normalizedColor &&
                !genericNames.some(gn => normalizedColor.includes(gn)) &&
                !normalizedColor.includes("#")) {
                return normalizedColor;
            }

            const targetHex = hex.toUpperCase().trim();

            // Helper to convert hex to RGB
            const hexToRgb = (h: string) => {
                const r = parseInt(h.slice(1, 3), 16);
                const g = parseInt(h.slice(3, 5), 16);
                const b = parseInt(h.slice(5, 7), 16);
                return { r, g, b };
            };

            // Comprehensive CSS Color Library (140+ colors)
            const colorLib: Record<string, string> = {
                "#F0F8FF": "alice blue", "#FAEBD7": "antique white", "#00FFFF": "aqua", "#7FFFD4": "aquamarine", "#F0FFFF": "azure",
                "#F5F5DC": "beige", "#FFE4C4": "bisque", "#000000": "black", "#FFEBCD": "blanched almond", "#0000FF": "blue",
                "#8A2BE2": "blue violet", "#A52A2A": "brown", "#DEB887": "burly wood", "#5F9EA0": "cadet blue", "#7FFF00": "chartreuse",
                "#D2691E": "chocolate", "#FF7F50": "coral", "#6495ED": "cornflower blue", "#FFF8DC": "cornsilk", "#DC143C": "crimson",
                "#00008B": "dark blue", "#008B8B": "dark cyan", "#B8860B": "dark goldenrod", "#A9A9A9": "dark gray", "#006400": "dark green",
                "#BDB76B": "dark khaki", "#8B008B": "dark magenta", "#556B2F": "dark olive green", "#FF8C00": "dark orange", "#9932CC": "dark orchid",
                "#8B0000": "dark red", "#E9967A": "dark salmon", "#8FBC8F": "dark sea green", "#483D8B": "dark slate blue", "#2F4F4F": "dark slate gray",
                "#00CED1": "dark turquoise", "#9400D3": "dark violet", "#FF1493": "deep pink", "#00BFFF": "deep sky blue", "#696969": "dim gray",
                "#1E90FF": "dodger blue", "#B22222": "fire brick", "#FFFAF0": "floral white", "#228B22": "forest green", "#FF00FF": "fuchsia",
                "#DCDCDC": "gainsboro", "#F8F8FF": "ghost white", "#FFD700": "gold", "#DAA520": "goldenrod", "#808080": "gray",
                "#008000": "green", "#ADFF2F": "green yellow", "#F0FFF0": "honeydew", "#FF69B4": "hot pink", "#CD5C5C": "indian red",
                "#4B0082": "indigo", "#FFFFF0": "ivory", "#F0E68C": "khaki", "#E6E6FA": "lavender", "#FFF0F5": "lavender blush",
                "#7CFC00": "lawn green", "#FFFACD": "lemon chiffon", "#ADD8E6": "light blue", "#F08080": "light coral", "#E0FFFF": "light cyan",
                "#FAFAD2": "light goldenrod yellow", "#D3D3D3": "light gray", "#90EE90": "light green", "#FFB6C1": "light pink", "#FFA07A": "light salmon",
                "#20B2AA": "light sea green", "#87CEFA": "light sky blue", "#778899": "light slate gray", "#B0C4DE": "light steel blue", "#FFFFE0": "light yellow",
                "#00FF00": "lime", "#32CD32": "lime green", "#FAF0E6": "linen", "#800000": "maroon", "#66CDAA": "medium aquamarine",
                "#0000CD": "medium blue", "#BA55D3": "medium orchid", "#9370DB": "medium purple", "#3CB371": "medium sea green", "#7B68EE": "medium slate blue",
                "#00FA9A": "medium spring green", "#48D1CC": "medium turquoise", "#C71585": "medium violet red", "#191970": "midnight blue", "#F5FFFA": "mint cream",
                "#FFE4E1": "misty rose", "#FFE4B5": "moccasin", "#FFDEAD": "navajo white", "#000080": "navy", "#FDF5E6": "old lace",
                "#808000": "olive", "#6B8E23": "olive drab", "#FFA500": "orange", "#FF4500": "orange red", "#DA70D6": "orchid",
                "#EEE8AA": "pale goldenrod", "#98FB98": "pale green", "#AFEEEE": "pale turquoise", "#DB7093": "pale violet red", "#FFEFD5": "papaya whip",
                "#FFDAB9": "peach puff", "#CD853F": "peru", "#FFC0CB": "pink", "#DDA0DD": "plum", "#B0E0E6": "powder blue",
                "#800080": "purple", "#663399": "rebecca purple", "#FF0000": "red", "#BC8F8F": "rosy brown", "#4169E1": "royal blue",
                "#8B4513": "saddle brown", "#FA8072": "salmon", "#F4A460": "sandy brown", "#2E8B57": "sea green", "#FFF5EE": "sea shell",
                "#A0522D": "sienna", "#C0C0C0": "silver", "#87CEEB": "sky blue", "#6A5ACD": "slate blue", "#708090": "slate gray",
                "#FFFAFA": "snow", "#00FF7F": "spring green", "#4682B4": "steel blue", "#D2B48C": "tan", "#008080": "teal",
                "#D8BFD8": "thistle", "#FF6347": "tomato", "#40E0D0": "turquoise", "#EE82EE": "violet", "#F5DEB3": "wheat",
                "#FFFFFF": "white", "#F5F5F5": "white smoke", "#FFFF00": "yellow", "#9ACD32": "yellow green",
                // Specific Star Plast common variants
                "#E5E7EB": "natural", "#E8E8E8": "natural", "#F3F4F6": "natural", "#F9FAFB": "clear", "#1A1A54": "star navy"
            };

            if (colorLib[targetHex]) return colorLib[targetHex];

            // If no exact match, find nearest color using RGB distance
            try {
                const targetRgb = hexToRgb(targetHex);
                let nearestColor = "natural";
                let minDistance = Infinity;

                for (const [libHex, libName] of Object.entries(colorLib)) {
                    const libRgb = hexToRgb(libHex);
                    const dist = Math.sqrt(
                        Math.pow(targetRgb.r - libRgb.r, 2) +
                        Math.pow(targetRgb.g - libRgb.g, 2) +
                        Math.pow(targetRgb.b - libRgb.b, 2)
                    );

                    if (dist < minDistance) {
                        minDistance = dist;
                        nearestColor = libName;
                    }
                }
                return nearestColor;
            } catch (e) {
                return normalizedColor || "natural";
            }
        };

        items.forEach((item, index) => {
            message += `${index + 1}. ${item.name}\n`;
            message += `Capacity: ${item.capacity || "-NA-"}\n`;
            message += `Weight: ${item.weight || "-NA-"}\n`;
            message += `Color: ${getColorName(item.selectedColor, item.colorHex)}\n`;
            message += `Qty: ${item.quantity.toLocaleString()} UNITS\n\n`;
        });

        message += `Note: ${notes || "No additional notes"}\n`;

        return encodeURIComponent(message);
    };

    const sendInquiry = () => {
        if (items.length === 0) return;
        const encodedText = formatMessage();
        const whatsappUrl = `https://wa.me/919535255655?text=${encodedText}`;
        window.open(whatsappUrl, "_blank");
    };

    return (
        <div className="min-h-screen font-sans bg-[#E4E4E4]">
            <Navbar variant="inner" />

            <main className="pt-28 pb-24 px-6 md:px-10 max-w-[1400px] mx-auto">
                {/* Header */}
                <div className="mb-2">
                    <h1 className="text-3xl md:text-4xl font-black text-[#1A1A54] tracking-tight">
                        Inquiry Review
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">
                        Review your technical specifications before final submission.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                    {/* ── Left: Inquiry Items ── */}
                    <div className="lg:col-span-2 space-y-5">
                        {items.length === 0 && (
                            <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                                <p className="text-gray-400 mb-4 text-sm">Your inquiry list is empty.</p>
                                <Link href="/#products" className="text-[#3B82F6] hover:underline font-medium text-sm">
                                    Continue browsing products
                                </Link>
                            </div>
                        )}

                        {items.map((item) => (
                            <div
                                key={`${item.id}-${item.selectedColor}-${item.weight}`}
                                className="bg-white rounded-xl border border-gray-200 p-5 md:p-6 flex flex-col md:flex-row gap-5"
                            >
                                {/* Product Preview */}
                                <div className="w-full md:w-40 h-40 bg-[#F9FAFB] rounded-lg border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
                                    {item.image ? (
                                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center">
                                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 16l5-5 4 4 4-4 5 5" /></svg>
                                            <span className="text-[10px] text-gray-300 mt-1 font-medium uppercase tracking-wider">
                                                No Image
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Details */}
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-4">
                                        <h3 className="text-lg font-bold text-[#1A1A54]">{item.name}</h3>
                                        <button
                                            onClick={() => removeItem(item.id, item.selectedColor, item.weight)}
                                            className="text-gray-300 hover:text-red-500 transition-colors p-1"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Specs row */}
                                    <div className="flex gap-10 mb-3">
                                        <div>
                                            <p className="text-[9px] font-bold text-gray-400 tracking-[0.15em] uppercase mb-0.5">
                                                Capacity
                                            </p>
                                            <p className="text-sm font-bold text-[#1A1A54]">{item.capacity && item.capacity !== "0L" ? item.capacity : "-NA-"}</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-bold text-gray-400 tracking-[0.15em] uppercase mb-0.5">
                                                Weight
                                            </p>
                                            <p className="text-sm font-bold text-[#1A1A54]">{item.weight && item.weight !== "" ? item.weight : "-NA-"}</p>
                                        </div>
                                    </div>

                                    {/* Color */}
                                    <div className="flex items-center gap-2 mb-5">
                                        <span className="text-[9px] font-bold text-gray-400 tracking-[0.15em] uppercase">
                                            Color/Tint:
                                        </span>
                                        <div
                                            className="w-4 h-4 rounded-full border border-gray-200"
                                            style={{ backgroundColor: item.colorHex }}
                                        />
                                    </div>

                                    {/* Quantity */}
                                    <div>
                                        <p className="text-[9px] font-bold text-gray-400 tracking-[0.15em] uppercase mb-2">
                                            Inquiry Quantity
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity <= 50 ? 1 : item.quantity - 50, item.selectedColor, item.weight)}
                                                    className="px-3 py-2 text-gray-400 hover:bg-gray-50 transition-colors text-sm"
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) => updateQuantity(item.id, Math.max(1, parseInt(e.target.value) || 0), item.selectedColor, item.weight)}
                                                    className="w-16 text-center font-bold text-[#1A1A54] text-sm focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                />
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity < 50 ? 50 : item.quantity + 50, item.selectedColor, item.weight)}
                                                    className="px-3 py-2 text-gray-400 hover:bg-gray-50 transition-colors text-sm"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                                                Units
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ── Right: Inquiry Summary ── */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 sticky top-28">
                            <h2 className="text-xl font-black text-[#1A1A54] mb-6">Inquiry Summary</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">Unique Line Items</span>
                                    <span className="font-bold text-[#1A1A54]">{totalItems} Items</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">Total Units</span>
                                    <span className="font-bold text-[#1A1A54]">{totalUnits.toLocaleString()} Units</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-6">
                                <p className="text-[10px] font-bold text-gray-400 tracking-[0.15em] uppercase mb-3">
                                    Project Notes
                                </p>
                                <textarea
                                    placeholder="Special requirements, color references, or timeline details..."
                                    rows={4}
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    className="w-full text-sm border border-gray-200 rounded-lg py-3 px-4 bg-white text-[#1A1A54] placeholder-gray-300 focus:outline-none focus:border-[#1A1A54] transition-colors resize-none"
                                />
                            </div>

                            <button
                                onClick={sendInquiry}
                                disabled={items.length === 0}
                                className="w-full bg-[#1A1A54] hover:bg-[#2A2A64] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold tracking-[0.1em] uppercase py-4 rounded-lg mt-6 transition-colors shadow-lg shadow-[#1A1A54]/20 text-sm"
                            >
                                Send Formal Inquiry
                            </button>

                            <p className="text-center text-[10px] text-gray-400 mt-4 leading-relaxed">
                                By submitting, you agree to Star Plast technical specifications<br />
                                and manufacturing terms of service.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
