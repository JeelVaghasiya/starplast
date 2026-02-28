"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
    const [activeColorIndex, setActiveColorIndex] = useState(0);

    // Get the currently active image. Index 0 corresponds to primaryImage.
    // Index > 0 corresponds to additionalImages.
    const getActiveImage = () => {
        if (activeColorIndex === 0) return product.primaryImage;
        if (product.additionalImages && activeColorIndex - 1 < product.additionalImages.length) {
            return product.additionalImages[activeColorIndex - 1];
        }
        return product.primaryImage;
    };

    const activeImage = getActiveImage();

    return (
        <Link
            href={`/product-view?id=${product.id}`}
            className="bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition-all group cursor-pointer flex flex-col h-full border border-transparent hover:border-blue-50"
        >
            <div className="aspect-square bg-[#F3F4F6] w-full rounded mb-5 flex items-center justify-center relative overflow-hidden">
                {activeImage ? (
                    <img src={activeImage} alt={product.name} className="object-contain w-full h-full" />
                ) : (
                    <div className="text-[10px] text-gray-300 font-bold tracking-widest uppercase">Industrial Product</div>
                )}
            </div>
            <h3 className="text-base font-bold text-[#1A1A54] mb-2 text-center leading-tight">
                {product.name}
            </h3>
            <p className="text-gray-400 text-xs text-center mb-5 leading-relaxed flex-1 line-clamp-2">
                {product.description}
            </p>

            <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold text-gray-400 tracking-[0.15em] uppercase">Colors:</span>
                    <div className="flex gap-1" onClick={(e) => e.preventDefault()}>
                        {product.colors.map((c, idx) => (
                            <div
                                key={`${c.id}-${idx}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveColorIndex(idx);
                                }}
                                className={`w-4 h-4 rounded-full border border-gray-200 cursor-pointer overflow-hidden relative cursor-pointer ${activeColorIndex === idx ? 'ring-2 ring-offset-1 ring-[#1A1A54]' : ''}`}
                            >
                                <div className="w-full h-full" style={{ backgroundColor: c.hexCode }} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-[#1A1A54] group-hover:text-white transition-colors">
                    <ShoppingCart className="w-3.5 h-3.5" />
                </div>
            </div>
        </Link>
    );
}
