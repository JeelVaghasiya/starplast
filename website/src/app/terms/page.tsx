"use client";

import Link from "next/link";
import Image from "next/image";
import { COMPANY_INFO } from "@/data/api";

export default function TermsOfServicePage() {
    return (
        <div className="min-h-screen font-sans bg-[#E4E4E4]">
            {/* Simple Nav */}
            <header className="w-full border-b border-gray-100">
                <div className="max-w-[900px] mx-auto flex items-center justify-between h-16 px-6">
                    <Link href="/" className="shrink-0">
                        <Image src="/logo.png" alt="Star Plast" width={180} height={80} className="h-[80px] w-auto" />
                    </Link>
                    <Link href="/" className="text-sm text-gray-600 hover:text-[#1A1A54] transition-colors">
                        Home
                    </Link>
                </div>
            </header>

            <main className="max-w-[700px] mx-auto px-6 py-16">
                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A54] mb-3 tracking-tight">
                    Terms and Services
                </h1>
                <div className="inline-flex items-center gap-2 bg-blue-50 text-[#3B82F6] text-xs font-medium px-3 py-1.5 rounded mb-10">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                    Effective Date: Feb 18 2026
                </div>

                <hr className="border-gray-100 mb-10" />

                {/* Intro */}
                <div className="bg-[#F9FAFB] rounded-lg p-6 mb-12 border-l-4 border-gray-200">
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Welcome to Star Plast. These terms and services (&ldquo;Terms&rdquo;) govern your use of our website Star Plast
                        (referred to as &ldquo;the Website&rdquo;). By accessing or using the Website, you agree to comply and be bound by
                        these Terms.
                    </p>
                </div>

                {/* Sections */}
                <div className="space-y-10">
                    {/* 1. Website Use */}
                    <section>
                        <h2 className="text-lg font-bold text-[#1A1A54] mb-4 flex items-center gap-2">
                            <span className="text-[#3B82F6]">🌐</span> 1. Website Use
                        </h2>
                        <div className="space-y-3 text-gray-500 text-sm leading-relaxed">
                            <p>
                                <strong className="text-[#1A1A54]">Permitted Use:</strong> You are granted a non-exclusive, non-transferable, revocable license to access and use the Website
                                strictly in accordance with these Terms for your personal or internal business purposes related to evaluating Star Plast
                                products.
                            </p>
                            <p>
                                <strong className="text-[#1A1A54]">Prohibited Conduct:</strong> You agree not to use the Website for any unlawful purpose, to solicit others to perform or
                                participate in any unlawful acts, or to violate any international, federal, or state regulations, rules, laws, or local
                                ordinances.
                            </p>
                        </div>
                    </section>

                    {/* 2. Intellectual Property Rights */}
                    <section>
                        <h2 className="text-lg font-bold text-[#1A1A54] mb-3 flex items-center gap-2">
                            <span className="text-[#3B82F6]">✓</span> 2. Intellectual Property Rights
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            All content included on this site, such as text, graphics, logos, button icons, images, and software, is the property of
                            Star Plast or its content suppliers and protected by international copyright laws. You are granted a limited license to
                            download or print portions of the material from the different areas of the Website solely for your own non-commercial
                            use.
                        </p>
                    </section>

                    {/* 3. Product Information */}
                    <section>
                        <h2 className="text-lg font-bold text-[#1A1A54] mb-3 flex items-center gap-2">
                            <span className="text-[#3B82F6]">📦</span> 3. Product Information
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            While we strive for accuracy, Star Plast does not warrant that product descriptions or other content of this site are
                            accurate, complete, reliable, current, or error-free. We reserve the right to change or discontinue products at any time
                            without prior notice.
                        </p>
                    </section>

                    {/* 4. Third-Party Links */}
                    <section>
                        <h2 className="text-lg font-bold text-[#1A1A54] mb-3 flex items-center gap-2">
                            <span className="text-[#3B82F6]">🔗</span> 4. Third-Party Links
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            The Website may include links to other websites. These links are provided for your convenience to provide further
                            information. They do not signify that we endorse the website(s). Star Plast has no responsibility for the content of the
                            linked website(s).
                        </p>
                    </section>

                    {/* 5. Disclaimers and Limitation of Liability */}
                    <section>
                        <h2 className="text-lg font-bold text-[#1A1A54] mb-3 flex items-center gap-2">
                            <span className="text-[#3B82F6]">⚠</span> 5. Disclaimers and Limitation of Liability
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            The Website is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. Star Plast makes no representations or warranties of
                            any kind, express or implied. In no event shall Star Plast be liable for any direct, indirect, incidental, special, or
                            consequential damages arising out of your use of the Website.
                        </p>
                    </section>

                    {/* 6. Indemnification */}
                    <section>
                        <h2 className="text-lg font-bold text-[#1A1A54] mb-3 flex items-center gap-2">
                            <span className="text-[#3B82F6]">🏛</span> 6. Indemnification
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            You agree to indemnify, defend, and hold harmless Star Plast and its affiliates from any claim or demand, including
                            reasonable attorneys&apos; fees, made by any third-party due to or arising out of your breach of these Terms.
                        </p>
                    </section>

                    {/* 7. Governing Law */}
                    <section>
                        <h2 className="text-lg font-bold text-[#1A1A54] mb-3 flex items-center gap-2">
                            <span className="text-[#3B82F6]">⚖</span> 7. Governing Law and Dispute Resolution
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            These Terms shall be governed by and construed in accordance with the laws of the State of Karnataka, India. Any
                            dispute arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in Bengaluru.
                        </p>
                    </section>

                    {/* 8. Changes to Terms */}
                    <section>
                        <h2 className="text-lg font-bold text-[#1A1A54] mb-3 flex items-center gap-2">
                            <span className="text-[#3B82F6]">↻</span> 8. Changes to Terms
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Star Plast reserves the right, at our sole discretion, to update, change, or replace any part of these Terms by posting
                            updates and changes to our website. It is your responsibility to check our website periodically for changes.
                        </p>
                    </section>

                    {/* 10. Contact Us - highlighted card */}
                    <section className="bg-[#F9FAFB] rounded-2xl p-8 mt-12">
                        <h2 className="text-lg font-bold text-[#1A1A54] mb-3 flex items-center gap-2">
                            <span className="text-[#3B82F6]">📍</span> 10. Contact Us
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed mb-5">
                            If you have any questions or concerns about these terms or our industrial solutions,
                            please reach out to our legal compliance team:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="bg-white rounded-lg p-4 border border-gray-100 flex items-center gap-3">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                                <div>
                                    <p className="text-[9px] font-bold text-gray-400 tracking-[0.15em] uppercase">Email</p>
                                    <p className="text-sm text-[#1A1A54] font-medium">{COMPANY_INFO.email}</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg p-4 border border-gray-100 flex items-center gap-3">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                <div>
                                    <p className="text-[9px] font-bold text-gray-400 tracking-[0.15em] uppercase">Phone / WhatsApp</p>
                                    <p className="text-sm text-[#1A1A54] font-medium">{COMPANY_INFO.phone}</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            {/* Simple Footer */}
            <footer className="border-t border-gray-100 py-8">
                <div className="max-w-[700px] mx-auto px-6 text-center">
                    <p className="text-xs text-gray-400">© 2026 Star Plast. All rights reserved.</p>
                    <div className="flex items-center justify-center gap-3 mt-3">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                    </div>
                </div>
            </footer>
        </div>
    );
}
