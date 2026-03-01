"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ShoppingCart } from "lucide-react";
import { getProducts, type Product } from "@/data/products";
import { SOCIAL_LINKS } from "@/data/api";
import ProductCard from "@/components/ProductCard";

const TOTAL_FRAMES = 82;

function getFramePath(index: number): string {
  const num = String(index).padStart(3, "0");
  return `/images/scrollytelling/ezgif-frame-${num}.png`;
}

export default function Home() {
  /* ─── Scrollytelling state ─── */
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [visibleCount, setVisibleCount] = useState(4);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const formattedMessage = `Name: ${name}\nEmail: ${email}\n\n${message}\n`;
    const encodedMessage = encodeURIComponent(formattedMessage);
    const whatsappUrl = `https://wa.me/919535255655?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  // Preload all scrollytelling frames
  useEffect(() => {
    let loadedCount = 0;
    const imgs: HTMLImageElement[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          imagesRef.current = imgs;
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          imagesRef.current = imgs;
          setImagesLoaded(true);
        }
      };
      imgs.push(img);
    }
  }, []);

  // Fetch live products
  useEffect(() => {
    getProducts().then(data => {
      setProducts(data);
      setLoadingProducts(false);
    });
  }, []);

  // Draw frame on canvas based on scroll progress
  useEffect(() => {
    if (!imagesLoaded) return;
    const canvas = canvasRef.current;
    const hero = heroRef.current;
    if (!canvas || !hero) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function drawFrame(idx: number) {
      const img = imagesRef.current[idx];
      if (!img || !ctx || !canvas) return;
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      const cW = canvas.offsetWidth;
      const cH = canvas.offsetHeight;
      const iW = img.naturalWidth;
      const iH = img.naturalHeight;

      const isMobile = window.innerWidth < 768;
      const scale = isMobile ? Math.min(cW / iW, cH / iH) : Math.max(cW / iW, cH / iH);

      const dW = iW * scale;
      const dH = iH * scale;
      const dx = (cW - dW) / 2;
      const dy = (cH - dH) / 2;
      ctx.clearRect(0, 0, cW, cH);
      ctx.drawImage(img, dx, dy, dW, dH);
    }

    drawFrame(0);

    const onScroll = () => {
      const rect = hero.getBoundingClientRect();
      const scrollableHeight = hero.offsetHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / scrollableHeight));
      const frameIdx = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * (TOTAL_FRAMES - 1)));
      drawFrame(frameIdx);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [imagesLoaded]);

  const displayedProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen font-sans">
      <Navbar variant="main" />

      <main>
        {/* ════════════ HERO – Scrollytelling ONLY ════════════ */}
        <div ref={heroRef} className="relative" style={{ height: "300vh" }}>
          <section className="sticky top-0 w-full h-screen overflow-hidden bg-[#E4E4E4]">
            {/* Static first frame for instant perceived load */}
            {!imagesLoaded && (
              <img
                src={getFramePath(1)}
                alt="Star Plast Hero"
                className="w-full h-full object-contain md:object-cover"
                fetchPriority="high"
              />
            )}
            {/* Canvas activates once all frames are loaded */}
            <canvas
              ref={canvasRef}
              className={`w-full h-full absolute inset-0 transition-opacity duration-500 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}
              style={{ imageRendering: "auto" }}
            />
          </section>
        </div>

        {/* ════════════ INDUSTRIAL CATALOG ════════════ */}
        <section id="products" className="py-24 px-6 md:px-10 max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#1A1A54] mb-3 tracking-tight">
              Industrial Catalog
            </h2>
            <p className="text-gray-400 text-sm md:text-base">
              High-performance container lineup for manufacturing and logistics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {loadingProducts ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse">
                  <div className="aspect-[4/3] bg-gray-100" />
                  <div className="p-4">
                    <div className="h-4 bg-gray-100 rounded w-2/3 mb-3" />
                    <div className="h-10 bg-gray-100 rounded" />
                  </div>
                </div>
              ))
            ) : (
              products.slice(0, visibleCount).reduce((acc: Product[], p) => {
                if (!acc.find(item => item.id === p.id)) acc.push(p);
                return acc;
              }, []).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>

          {products.length > visibleCount && (
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setVisibleCount(prev => prev + 4)}
                className="bg-white px-8 py-3 rounded-full text-xs font-bold text-[#1A1A54] tracking-wider shadow-sm hover:shadow-md transition-all border border-gray-100"
              >
                Load More Products <span className="ml-1 text-gray-400">↓</span>
              </button>
            </div>
          )}
        </section>

        {/* ════════════ ABOUT US ════════════ */}
        <section id="about" className="py-20 px-6 md:px-10 max-w-[1400px] mx-auto border-t border-gray-300/50">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            <div className="lg:w-1/3 shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-8 h-[2px] bg-[#D4A843]" />
                <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A54]">About Us</h2>
              </div>
            </div>
            <div className="lg:w-2/3 space-y-5 text-gray-500 text-[15px] leading-relaxed">
              <p>
                Founded in 2014, Starplast began with a singular focus: to create durable, high-quality
                plastic components that solved everyday industrial challenges. What started with one manual
                injection molding machine has evolved into a global powerhouse of manufacturing excellence.
              </p>
              <p>
                Our heritage is built on a foundation of relentless innovation. Throughout the decades, we
                have consistently invested in cutting-edge technology and sustainable processes. Every product
                we create tells a story of precision engineering, crafted by a team that refuses to compromise
                on quality or integrity.
              </p>
              <p>
                Today, we are more than just a manufacturer; we are a strategic partner to some of the world&apos;s
                most recognizable brands, providing the material backbone for the infrastructure of tomorrow.
              </p>
            </div>
          </div>
        </section>

        {/* ════════════ OUR MISSION ════════════ */}
        <section className="py-20 px-6 md:px-0 relative mb-16 overflow-hidden">
          <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col md:flex-row justify-between items-start gap-10">
            <div className="bg-white rounded-r-[40px] md:rounded-r-[60px] p-8 md:p-14 w-full lg:w-3/4 shadow-[0_20px_50px_rgba(0,0,0,0.04)] ml-0 md:ml-[-3rem] lg:ml-[-8rem] md:pl-14 lg:pl-44">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-black text-[#1A1A54] leading-[1.15] mb-14 tracking-tight">
                &ldquo;To empower global industries<br />
                through <span className="text-gray-400 italic font-medium">sustainable</span><br />
                manufacturing and<br />
                uncompromising{" "}
                <span className="border-b-[5px] border-[#1A1A54] pb-0.5">product</span><br />
                <span className="border-b-[5px] border-[#1A1A54] pb-0.5">excellence</span>.&rdquo;
              </h2>

              <div className="space-y-8 max-w-xl">
                <div className="flex gap-5">
                  <div className="mt-0.5 w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1A54" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-[#1A1A54] font-bold text-base mb-1">Environmental Stewardship</h4>
                    <p className="text-gray-400 leading-relaxed text-sm">Reducing our carbon footprint through circular economy practices and recycled material integration.</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="mt-0.5 w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1A54" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                  </div>
                  <div>
                    <h4 className="text-[#1A1A54] font-bold text-base mb-1">Pioneering Innovation</h4>
                    <p className="text-gray-400 leading-relaxed text-sm">Developing advanced polymer solutions that meet the evolving needs of the modern world.</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="mt-0.5 w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1A54" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                  </div>
                  <div>
                    <h4 className="text-[#1A1A54] font-bold text-base mb-1">Client Centricity</h4>
                    <p className="text-gray-400 leading-relaxed text-sm">Building long-term value through transparency, reliability, and tailored engineering services.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:flex lg:w-1/4 items-center justify-end pt-12 pr-8">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A54] mr-3 whitespace-nowrap">Our Mission</h2>
              <div className="w-10 h-[2px] bg-[#D4A843]" />
            </div>
          </div>
        </section>

        {/* ════════════ CONTACT US ════════════ */}
        <section id="contact" className="py-20 px-6 md:px-10 max-w-[1400px] mx-auto">
          <h2 className="text-3xl md:text-[48px] font-black text-[#1A1A54] mb-6 tracking-tight">Contact Us</h2>

          {/* Social Icons — WhatsApp, Phone, Instagram, Facebook */}
          <div className="flex gap-3 mb-14">
            <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border-2 border-[#3B82F6] flex items-center justify-center text-[#3B82F6] hover:bg-blue-50 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
            </a>
            <a href={SOCIAL_LINKS.phone} className="w-10 h-10 rounded-full border-2 border-[#3B82F6] flex items-center justify-center text-[#3B82F6] hover:bg-blue-50 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
            </a>
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border-2 border-[#3B82F6] flex items-center justify-center text-[#3B82F6] hover:bg-blue-50 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
            </a>
            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border-2 border-[#3B82F6] flex items-center justify-center text-[#3B82F6] hover:bg-blue-50 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14">
            {/* Left: Address + Google Map */}
            <div>
              {/* Contact Info */}
              <div className="mb-5">
                <p className="text-sm text-gray-500 mb-1 -mt-6">
                  <span className="font-semibold text-[#1A1A54]">Email:</span>{" "}
                  <a
                    href="mailto:starplast.co.in@gmail.com"
                    className="hover:text-[#1A1A54] transition-colors"
                  >
                    starplast.co.in@gmail.com
                  </a>
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold text-[#1A1A54]">Phone:</span>{" "}
                  <a
                    href="tel:+919535255655"
                    className="hover:text-[#1A1A54] transition-colors"
                  >
                    +91 9535-255-655
                  </a>
                </p>
              </div>

              <h3 className="text-2xl font-bold text-[#1A1A54] mb-1">Head Office</h3>
              <p className="text-gray-400 text-sm mb-6">
                Kalika Nagar, Peenya, Bengaluru<br />
                Industrial Estate, 8th Main Rd, 2nd Stage
              </p>
              {/* Real Google Maps Embed */}
              <div className="aspect-[4/3] w-full rounded-xl overflow-hidden border border-gray-300 mb-5">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3115.2581657310843!2d77.49833604134271!3d13.011789223491055!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3cf3dc15205b%3A0x2b23d62249a79806!2sSTAR%20PLAST!5e0!3m2!1sen!2sin!4v1772111074432!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Star Plast Location"
                />
              </div>

              <a
                href="https://maps.google.com/?q=STAR+PLAST+Peenya+Bengaluru"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white px-6 py-2.5 rounded-full text-xs font-bold text-[#1A1A54] shadow-sm hover:shadow-md transition-all border border-gray-100 inline-block"
              >
                Show on map
              </a>
            </div>

            {/* Right: Contact Form */}
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg shadow-gray-200/50">
              <h3 className="text-2xl font-black text-[#1A1A54] mb-2 tracking-tight">
                Tell us about your requirement
              </h3>
              <p className="text-gray-400 text-xs mb-8 leading-relaxed">
                Looking for quote, any kind of help regarding our products and service?<br />
                Post your query now, and we&apos;ll get in touch with you soon!
              </p>

              <form onSubmit={handleContactSubmit} className="space-y-6">
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border-b border-gray-200 py-3 bg-transparent text-[#1A1A54] placeholder-gray-400 focus:outline-none focus:border-[#1A1A54] transition-colors text-sm"
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border-b border-gray-200 py-3 bg-transparent text-[#1A1A54] placeholder-gray-400 focus:outline-none focus:border-[#1A1A54] transition-colors text-sm"
                />
                <textarea
                  placeholder="Message"
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full border-b border-gray-200 py-3 bg-transparent text-[#1A1A54] placeholder-gray-400 focus:outline-none focus:border-[#1A1A54] transition-colors resize-none text-sm"
                />
                <div className="flex items-start gap-2 pt-2">
                  <input type="checkbox" id="consent" required className="mt-1 accent-[#1A1A54]" />
                  <label htmlFor="consent" className="text-[11px] text-gray-400 leading-relaxed">
                    I agree to the processing of my personal data in accordance with the{" "}
                    <Link href="/privacy" className="underline hover:text-gray-600">Privacy Policy</Link>
                  </label>
                </div>
                <button type="submit" className="w-full bg-[#1A1A54] hover:bg-[#2A2A64] text-white font-medium py-3.5 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#1A1A54]/20 text-sm">
                  Send{" "}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
