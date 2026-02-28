"use client";

import Link from "next/link";
import Image from "next/image";
import { SOCIAL_LINKS } from "@/data/api";

export function Footer() {
    return (
        <footer className="bg-[#E4E4E4] pt-16 pb-6 border-t border-gray-300">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10">
                {/* Main Footer Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-14">
                    {/* Brand Logo — already contains "STAR PLAST" text */}
                    <div className="col-span-2 md:col-span-1 lg:col-span-1">
                        <Link href="/" className="inline-block">
                            <Image src="/logo.png" alt="Star Plast" width={140} height={140} className="h-35 w-auto -mt-8.5" />
                        </Link>
                    </div>

                    {/* Links Column 1 — no Certifications */}
                    <div className="space-y-3">
                        <Link href="/#about" className="block text-sm text-gray-600 hover:text-[#1A1A54] transition-colors">
                            About
                        </Link>
                        <Link href="/#products" className="block text-sm text-gray-600 hover:text-[#1A1A54] transition-colors">
                            Products
                        </Link>
                        <Link href="/#contact" className="block text-sm text-gray-600 hover:text-[#1A1A54] transition-colors">
                            Contact
                        </Link>
                    </div>

                    {/* Links Column 2 */}
                    <div className="space-y-3">
                        <Link href="/terms" className="block text-sm text-gray-600 hover:text-[#1A1A54] transition-colors">
                            Terms & Conditions
                        </Link>
                        <Link href="/privacy" className="block text-sm text-gray-600 hover:text-[#1A1A54] transition-colors">
                            Privacy Policy
                        </Link>

                    </div>

                    {/* Social Links Column — with WhatsApp */}
                    <div className="space-y-3">
                        <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-600 hover:text-[#1A1A54] transition-colors">
                            WhatsApp
                        </a>
                        <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-600 hover:text-[#1A1A54] transition-colors">
                            Instagram
                        </a>
                        <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-600 hover:text-[#1A1A54] transition-colors">
                            Facebook
                        </a>
                        <a href={SOCIAL_LINKS.phone} className="block text-sm text-gray-600 hover:text-[#1A1A54] transition-colors">
                            Phone
                        </a>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-300 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex flex-wrap gap-3 text-xs font-semibold text-[#1A1A54]">
                        <span>© {new Date().getFullYear()} Star Plast Inc.</span>
                        <span className="text-gray-300">·</span>
                        <Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy</Link>
                        <span className="text-gray-300">·</span>
                        <Link href="/terms" className="hover:text-blue-600 transition-colors">Terms</Link>
                    </div>

                    <div className="flex items-center gap-5 text-xs font-semibold text-[#1A1A54]">
                        <span className="flex items-center gap-1.5 cursor-pointer hover:text-blue-600 transition-colors">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                            English (IN)
                        </span>
                        <span className="cursor-pointer hover:text-blue-600 transition-colors">₹ INR</span>

                        {/* Social icons — WhatsApp, Instagram, Facebook, Phone */}
                        <div className="flex items-center gap-3 ml-1">
                            {/* WhatsApp */}
                            <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
                            </a>
                            {/* Phone */}
                            <a href={SOCIAL_LINKS.phone} className="hover:text-blue-600 transition-colors">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                            </a>
                            {/* Instagram */}
                            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                            </a>
                            {/* Facebook */}
                            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
