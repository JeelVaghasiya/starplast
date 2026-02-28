"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getProducts, getProductById, Product } from "@/data/products";
import ProductDetailClient from "@/app/products/[id]/ProductDetailClient";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

function ProductLoader() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        async function loadProduct() {
            setLoading(true);
            try {
                const p = await getProductById(id as string);
                if (p) {
                    setProduct(p);
                    const allProducts = await getProducts();

                    // 1. Get explicit related products
                    const explicitRelated = p.relatedIds
                        .map((rid) => allProducts.find((allP) => String(allP.id) === String(rid)))
                        .filter(Boolean) as Product[];

                    // 2. Get all other products for the full randomized list
                    const otherProducts = allProducts.filter(allP => allP.id !== p.id);

                    // Combine them (explicit first)
                    const fullList = [...explicitRelated, ...otherProducts.filter(op => !explicitRelated.find(er => er.id === op.id))];

                    setRelatedProducts(fullList);
                } else {
                    setProduct(null); // Product not found
                    setRelatedProducts([]);
                }
            } catch (error) {
                console.error("Error loading product:", error);
                setProduct(null); // Ensure product is null on error
                setRelatedProducts([]);
            } finally {
                setLoading(false);
            }
        }
        loadProduct();
    }, [id]);

    // Check for invalid or missing ID after useEffect has potentially set loading to false
    if (typeof id !== 'string' || id.trim() === '') {
        return (
            <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
                <Navbar variant="inner" />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-[#1A1A54] mb-2">No Product Selected</h2>
                        <a href="/" className="text-blue-500 hover:underline">Back to catalog</a>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#E5E7EB]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A1A54] mx-auto mb-4"></div>
                    <p className="text-gray-500 font-medium">Loading technical specifications...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
                <Navbar variant="inner" />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-[#1A1A54] mb-2">Product Not Found</h2>
                        <p className="text-gray-500 mb-6">The product ID "{id}" doesn't exist in our catalog.</p>
                        <a href="/" className="text-white bg-[#1A1A54] px-6 py-3 rounded-lg font-bold">Return to Home</a>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return <ProductDetailClient product={product} initialRelatedProducts={relatedProducts} />;
}

export default function ProductViewPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#E5E7EB]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A1A54]"></div>
            </div>
        }>
            <ProductLoader />
        </Suspense>
    );
}
