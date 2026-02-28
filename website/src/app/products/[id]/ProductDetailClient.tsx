"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, ShoppingCart, ZoomIn, X } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

function RelatedProductCard({ product }: { product: Product }) {
    const [activeColorIdx, setActiveColorIdx] = useState(0);

    const activeImage = useMemo(() => {
        if (activeColorIdx === 0) return product.primaryImage;
        if (product.additionalImages && activeColorIdx - 1 < product.additionalImages.length) {
            return product.additionalImages[activeColorIdx - 1];
        }
        return product.primaryImage;
    }, [activeColorIdx, product]);

    return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col min-w-[280px] w-[280px] md:min-w-[320px] md:w-[320px]">
            <Link
                href={`/product-view?id=${product.id}`}
                className="aspect-[4/3] bg-[#F3F4F6] flex items-center justify-center overflow-hidden p-4 group"
            >
                {activeImage ? (
                    <img
                        src={activeImage}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                ) : (
                    <div className="text-[10px] text-gray-300 font-bold uppercase tracking-widest text-center">Industrial Product</div>
                )}
            </Link>
            <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-xs font-bold text-[#1A1A54] uppercase tracking-wide mb-3 line-clamp-1">
                    {product.name}
                </h3>

                {/* Color Selector */}
                {product.colors.length > 0 && (
                    <div className="flex items-center gap-2 mb-5 mt-1 border-t border-gray-50 pt-3">
                        <span className="text-[9px] font-bold text-gray-400 tracking-[0.15em] uppercase">Colors:</span>
                        <div className="flex gap-1" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                            {product.colors.map((c, idx) => (
                                <div
                                    key={`${c.id}-${idx}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setActiveColorIdx(idx);
                                    }}
                                    className={`w-4 h-4 rounded-full border border-gray-200 cursor-pointer overflow-hidden relative transition-all ${activeColorIdx === idx ? 'ring-2 ring-offset-1 ring-[#1A1A54] scale-110' : 'hover:scale-110'}`}
                                >
                                    <div className="w-full h-full" style={{ backgroundColor: c.hexCode }} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-auto">
                    <Link
                        href={`/product-view?id=${product.id}`}
                        className="block w-full text-center text-[10px] font-bold text-[#1A1A54] tracking-wider uppercase py-2.5 border border-gray-200 rounded hover:bg-[#1A1A54] hover:text-white transition-colors"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function ProductDetailClient({
    product,
    initialRelatedProducts = []
}: {
    product: Product;
    initialRelatedProducts?: Product[];
}) {
    const { addItem } = useCart();
    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedWeightIndex, setSelectedWeightIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedThumb, setSelectedThumb] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Randomize on component load
    const shuffledProducts = useMemo(() => {
        return [...initialRelatedProducts].sort(() => Math.random() - 0.5);
    }, [initialRelatedProducts.length, product.id]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const scrollAmount = container.clientWidth * 0.8;
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    const relatedProducts = initialRelatedProducts;
    const allImages = [product.primaryImage, ...(product.additionalImages || [])].filter(Boolean) as string[];

    const handleAddToInquiry = () => {
        addItem({
            id: product.id,
            name: product.name,
            capacity: product.capacity,
            weight: product.weight[selectedWeightIndex] || product.weight[0],
            selectedColor: product.colors[selectedColor]?.name || "Natural",
            colorHex: product.colors[selectedColor]?.hexCode || "#E5E7EB",
            quantity,
            image: allImages[selectedThumb] || allImages[0] || "",
        });

        // Reset to defaults
        setSelectedColor(0);
        setSelectedThumb(0);
        setSelectedWeightIndex(0);
        setQuantity(1);
    };

    return (
        <div className="min-h-screen font-sans bg-[#E4E4E4]">
            <Navbar variant="inner" />

            <main className="pt-24 pb-20 px-6 md:px-10 max-w-[1400px] mx-auto">
                {/* Back link */}
                <Link
                    href="/#products"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#1A1A54] transition-colors mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    BACK
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                    {/* ── Left: Image Gallery ── */}
                    <div>
                        {/* Main Image */}
                        <div className="aspect-square bg-white rounded-lg border border-gray-200 flex items-center justify-center relative overflow-hidden mb-4 p-8">
                            {allImages.length > 0 ? (
                                <img src={allImages[selectedThumb] || allImages[0]} alt={product.name} className="object-contain w-full h-full" />
                            ) : (
                                <div className="text-gray-300 text-sm font-bold tracking-widest uppercase">Product Image</div>
                            )}
                            <button
                                onClick={() => setIsZoomed(true)}
                                className="absolute bottom-4 right-4 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center text-gray-400 hover:text-[#1A1A54] transition-colors"
                            >
                                <ZoomIn className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Thumbnail strip */}
                        {allImages.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {allImages.map((imgUrl, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedThumb(i)}
                                        className={`w-[70px] h-[70px] min-w-[70px] rounded border-2 flex items-center justify-center transition-colors overflow-hidden ${selectedThumb === i
                                            ? "border-[#1A1A54]"
                                            : "border-gray-200 hover:border-gray-300"
                                            } bg-white p-1`}
                                    >
                                        <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-contain" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ── Right: Product Info ── */}
                    <div>
                        {/* Category badge */}
                        <span className="inline-block bg-blue-50 text-[#3B82F6] text-[10px] font-bold tracking-[0.1em] px-3 py-1 rounded mb-3">
                            {product.category}
                        </span>

                        <h1 className="text-3xl md:text-4xl font-black text-[#1A1A54] mb-4 tracking-tight">
                            {product.name}
                        </h1>

                        <p className="text-gray-500 text-sm leading-relaxed mb-8">
                            {product.description}
                        </p>

                        {/* Price & Stock card */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                            <div className="flex items-center justify-between mb-5">
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 tracking-[0.15em] uppercase mb-1">
                                        Estimated Price
                                    </p>
                                    <p className="text-xl font-black text-[#1A1A54]">Contact for Quote</p>
                                </div>
                            </div>

                            {/* Tint Color Selector */}
                            <div className="mb-5">
                                <p className="text-[10px] font-bold text-gray-400 tracking-[0.15em] uppercase mb-3">
                                    Select Material Tint
                                </p>
                                <div className="flex gap-2.5">
                                    {product.colors.map((c, i) => (
                                        <button
                                            key={`${c.id}-${i}`}
                                            onClick={() => {
                                                setSelectedColor(i);
                                                // Link color to the matching image index (0 for primary, 1+ for variants)
                                                if (i < allImages.length) {
                                                    setSelectedThumb(i);
                                                }
                                            }}
                                            className={`w-9 h-9 rounded-full border-2 transition-all ${selectedColor === i
                                                ? "border-[#1A1A54] scale-110"
                                                : "border-gray-200 hover:border-gray-400"
                                                }`}
                                            style={{ backgroundColor: c.hexCode }}
                                            title={c.name}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Weight Selection */}
                            {product.weight.length > 1 && (
                                <div className="mb-5">
                                    <p className="text-[10px] font-bold text-gray-400 tracking-[0.15em] uppercase mb-3">
                                        Select Weight Variant
                                    </p>
                                    <div className="flex flex-wrap gap-2.5">
                                        {product.weight.map((w, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setSelectedWeightIndex(i)}
                                                className={`px-4 py-2 border text-sm font-medium rounded-lg transition-all ${selectedWeightIndex === i
                                                    ? "bg-[#1A1A54] border-[#1A1A54] text-white"
                                                    : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                                                    }`}
                                            >
                                                {w}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Quantity */}
                            <div className="mb-5">
                                <p className="text-[10px] font-bold text-gray-400 tracking-[0.15em] uppercase mb-3">
                                    Quantity
                                </p>
                                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white w-fit">
                                    <button
                                        onClick={() => setQuantity(quantity <= 50 ? 1 : quantity - 50)}
                                        className="px-3 py-2 text-gray-400 hover:bg-gray-50 transition-colors text-sm"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
                                        className="w-16 text-center font-bold text-[#1A1A54] text-sm focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <button
                                        onClick={() => setQuantity(quantity < 50 ? 50 : quantity + 50)}
                                        className="px-3 py-2 text-gray-400 hover:bg-gray-50 transition-colors text-sm"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Add to Inquiry Button */}
                            <button
                                onClick={handleAddToInquiry}
                                className="w-full bg-[#1A1A54] hover:bg-[#2A2A64] text-white font-bold tracking-[0.1em] uppercase py-4 rounded-lg flex items-center justify-center gap-3 transition-colors text-sm shadow-lg shadow-[#1A1A54]/20"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Add to Inquiry
                            </button>
                        </div>

                        {/* Specs */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white rounded-lg border border-gray-200 p-5">
                                <p className="text-[10px] font-bold text-gray-400 tracking-[0.15em] uppercase mb-1">Capacity</p>
                                <p className="text-xl font-black text-[#1A1A54]">
                                    {product.capacity && parseFloat(product.capacity) > 0 ? (
                                        <>
                                            {product.capacity}
                                            <span className="text-sm font-normal text-gray-400 ml-1.5">
                                                / {(parseFloat(product.capacity) * 0.264172).toFixed(1)} Gal
                                            </span>
                                        </>
                                    ) : "-NA-"}
                                </p>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-200 p-5">
                                <p className="text-[10px] font-bold text-gray-400 tracking-[0.15em] uppercase mb-1">Weight</p>
                                <p className="text-xl font-black text-[#1A1A54]">
                                    {product.weight.length > 0 && product.weight[0] !== "" ? (
                                        <>
                                            {product.weight.join('/')}
                                            {product.weightTolerance && product.weightTolerance !== "± 0g" && (
                                                <span className="text-sm font-normal text-gray-400 ml-1.5">{product.weightTolerance}</span>
                                            )}
                                        </>
                                    ) : "-NA-"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ════════════ RELATED CONTAINERS ════════════ */}
                <section className="mt-24">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-black text-[#1A1A54] tracking-tight uppercase">
                            Related Containers
                        </h2>
                        <div className="flex gap-2">
                            <button
                                onClick={() => scroll('left')}
                                className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-[#1A1A54] hover:border-[#1A1A54] transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => scroll('right')}
                                className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-[#1A1A54] hover:border-[#1A1A54] transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4 rotate-180" />
                            </button>
                        </div>
                    </div>

                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto gap-5 pb-6 no-scrollbar scroll-smooth"
                    >
                        {shuffledProducts.map((rp, idx) => (
                            <RelatedProductCard key={`${rp.id}-${idx}`} product={rp} />
                        ))}
                    </div>
                </section>
            </main>

            {/* Zoom Modal */}
            {isZoomed && (
                <div
                    className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-6 md:p-12 cursor-zoom-out"
                    onClick={() => setIsZoomed(false)}
                >
                    <img
                        src={allImages[selectedThumb] || allImages[0]}
                        alt={product.name}
                        className="max-w-full max-h-full object-contain animate-in zoom-in-95 duration-200"
                    />
                    <button
                        onClick={() => setIsZoomed(false)}
                        className="absolute top-8 right-8 text-white hover:text-gray-300 transition-colors p-2"
                    >
                        <X className="w-8 h-8" />
                    </button>
                </div>
            )}

            <Footer />
        </div>
    );
}
