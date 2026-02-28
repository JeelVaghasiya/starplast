import { API_BASE_URL } from "./api";

export type TintColor = {
    id: string;
    name: string;
    hexCode: string;
    imagePath: string;
};

export type Product = {
    id: string;
    name: string;
    category: string;
    description: string;
    capacity: string;
    capacityGal: string;
    weight: string[];
    weightTolerance: string;
    availability: "In Stock" | "Made to Order";
    primaryImage?: string;
    additionalImages: string[];
    colors: TintColor[];
    relatedIds: string[];
};

let productsCache: Product[] | null = null;

const fallbackProducts: Product[] = [
    {
        id: "1",
        name: "20L Standard PET Can",
        category: "INDUSTRIAL GRADE PET",
        description: "Engineered for high-performance industrial applications...",
        capacity: "20.0L",
        capacityGal: "5.3 Gal",
        weight: ["850g"],
        weightTolerance: "± 15g",
        availability: "In Stock",
        primaryImage: "",
        additionalImages: [],
        colors: [
            { id: "natural", name: "Natural Clear", hexCode: "#E8E8E8", imagePath: "" }
        ],
        relatedIds: ["2", "3", "4"],
    },
    {
        id: "2",
        name: "20L Heavy-Duty HDPE",
        category: "INDUSTRIAL GRADE HDPE",
        description: "High quality polyethylene designed for industrial chemical storage.",
        capacity: "20.0L",
        capacityGal: "5.3 Gal",
        weight: ["920g"],
        weightTolerance: "± 20g",
        availability: "In Stock",
        primaryImage: "",
        additionalImages: [],
        colors: [
            { id: "navy", name: "Navy", hexCode: "#1E3A8A", imagePath: "" }
        ],
        relatedIds: ["1", "3", "4"],
    }
];

export async function getProducts(): Promise<Product[]> {
    if (productsCache) return productsCache;

    try {
        const response = await fetch(API_BASE_URL, {
            next: { revalidate: 60 } // Cache for 60 seconds
        });

        if (!response.ok) throw new Error("Failed to fetch products");

        const text = await response.text();
        let rawData;
        try {
            rawData = JSON.parse(text);
        } catch (e) {
            console.error("Failed to parse JSON from Google Sheets API, received:", text.substring(0, 150));
            console.warn("Using fallback static product data.");
            return fallbackProducts;
        }

        // Helper to convert Google Drive Share URLs to direct image URLs
        const convertDriveUrl = (url: string) => {
            if (!url) return url;
            let id = "";

            // Handle /file/d/ID/view
            const dMatch = url.match(/\/file\/d\/([^\/?]+)/);
            if (dMatch && dMatch[1]) {
                id = dMatch[1];
            } else {
                // Handle ?id=ID
                const idMatch = url.match(/[?&]id=([^&]+)/);
                if (idMatch && idMatch[1]) {
                    id = idMatch[1];
                }
            }

            if (id) {
                // Use googleusercontent.com which is more reliable for direct <img> tags
                return `https://lh3.googleusercontent.com/d/${id}`;
            }
            return url;
        };

        const mappedProducts: Product[] = rawData
            .filter((item: any) => item && (item.id || item.name)) // Skip empty rows
            .map((item: any) => {
                // Support both camelCase and lowercase keys for robustness
                const getId = () => item.id || item.ID || item.Id || "";
                const getName = () => item.name || item.Name || "Unnamed Product";
                const getCategory = () => item.category || item.Category || "INDUSTRIAL GRADE PET";
                const getDesc = () => item.description || item.Description || "";
                const getCapacity = () => item.capacity || item.Capacity || "";
                const getCapGal = () => item.capacityGal || item.capacitygal || item.CapacityGal || "5.3 Gal";
                const getWeight = () => item.weight || item.Weight || "";
                const getWeightTol = () => item.weightTolerance || item.weighttolerance || item.WeightTolerance || "± 5g";
                const getAvail = () => item.availability || item.Availability || "In Stock";
                const getPrimaryImage = () => item.primaryImage || item.primaryimage || item.PrimaryImage || "";
                const getAddImages = () => item.additionalImages || item.additionalimages || item.AdditionalImages || "";
                const getColors = () => item.colors || item.Colors || "";
                const getRelated = () => item.relatedIds || item.relatedids || item.RelatedIds || "";

                const rawId = String(getId()).trim();
                const primaryImage = convertDriveUrl(getPrimaryImage());
                const additionalImagesRaw = getAddImages();
                const additionalImages = typeof additionalImagesRaw === 'string'
                    ? additionalImagesRaw.split(';').filter(Boolean).map(convertDriveUrl)
                    : [];

                const colorsRaw = getColors();
                const colorEntries = typeof colorsRaw === 'string'
                    ? colorsRaw.split(';').filter(Boolean).map((colorStr: string) => {
                        const parts = colorStr.split(':');
                        const name = parts.length > 1 ? parts[0].trim() : "Standard Tint";
                        const hex = parts.length > 1 ? parts[1].trim() : parts[0].trim();
                        return { name, hex };
                    })
                    : [];

                return {
                    id: rawId || "prod-" + Math.random().toString(36).substr(2, 9),
                    name: String(getName()).trim(),
                    category: String(getCategory()).trim(),
                    description: String(getDesc()).trim(),
                    capacity: getCapacity() ? `${String(getCapacity()).replace(/[Ll]/g, '').trim()}L` : "",
                    capacityGal: getCapGal(),
                    weight: typeof getWeight() === 'string'
                        ? (getWeight() as string).split(';').map((s: string) => s.trim()).filter(Boolean)
                        : (getWeight() ? [String(getWeight()).trim()] : []),
                    weightTolerance: String(getWeightTol()).trim(),
                    availability: getAvail() as any,
                    primaryImage,
                    additionalImages,
                    colors: colorEntries.map((ce: { name: string, hex: string }, idx: number) => {
                        let imgPath = "";
                        if (idx === 0) imgPath = primaryImage;
                        else if (idx - 1 < additionalImages.length) imgPath = additionalImages[idx - 1];

                        return {
                            id: `${ce.name.toLowerCase().replace(/\s+/g, '-')}-${idx}`,
                            name: ce.name,
                            hexCode: ce.hex || "#E5E7EB",
                            imagePath: imgPath
                        };
                    }),
                    relatedIds: typeof getRelated() === 'string'
                        ? (getRelated() as string).split(',').map((s: string) => s.trim()).filter(Boolean)
                        : (getRelated() ? [String(getRelated()).trim()] : [])
                };
            });

        // Deduplicate by ID
        const uniqueProductsMap = new Map<string, Product>();
        mappedProducts.forEach(p => {
            if (!uniqueProductsMap.has(p.id)) {
                uniqueProductsMap.set(p.id, p);
            } else {
                console.warn(`[Products Data] Duplicate ID skipped: ${p.id}`);
            }
        });

        productsCache = Array.from(uniqueProductsMap.values());
        console.log(`[Products Data] Loaded ${productsCache.length} unique products.`);

        return productsCache || fallbackProducts;
    } catch (error) {
        console.error("Error fetching products:", error);
        return fallbackProducts;
    }
}

export async function getProductById(id: string): Promise<Product | undefined> {
    const products = await getProducts();
    return products.find((p) => p.id === id);
}

export async function getRelatedProducts(product: Product): Promise<Product[]> {
    const products = await getProducts();
    return product.relatedIds
        .map((rid) => products.find((p) => p.id === rid))
        .filter(Boolean) as Product[];
}
