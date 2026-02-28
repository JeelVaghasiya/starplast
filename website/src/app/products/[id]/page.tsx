import { getProducts, getProductById } from "@/data/products";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const products = await getProducts();
    return products.map((p) => ({ id: String(p.id) }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) {
        notFound();
    }

    const allProducts = await getProducts();
    const relatedProducts = product.relatedIds
        .map((rid) => allProducts.find((p) => String(p.id) === String(rid)))
        .filter(Boolean);

    return <ProductDetailClient product={product} initialRelatedProducts={relatedProducts as any} />;
}
