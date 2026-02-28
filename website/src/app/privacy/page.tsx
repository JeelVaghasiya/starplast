"use client";

import Link from "next/link";
import Image from "next/image";
import { COMPANY_INFO } from "@/data/api";

export default function PrivacyPolicyPage() {
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
                <h1 className="text-4xl md:text-5xl font-light text-[#1A1A54] mb-3 italic tracking-tight">
                    Privacy Policy
                </h1>
                <div className="inline-flex items-center gap-2 bg-blue-50 text-[#3B82F6] text-xs font-medium px-3 py-1.5 rounded mb-10">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                    Effective Date: Feb 18 2026
                </div>

                <hr className="border-gray-100 mb-10" />

                {/* Intro blockquote */}
                <div className="bg-[#F9FAFB] rounded-lg p-6 mb-12 border-l-4 border-gray-200">
                    <p className="text-gray-600 text-sm leading-relaxed italic">
                        Welcome to Star Plast. This privacy policy explains how we handle personal information on
                        our website Star Plast (referred to as &apos;the Website&apos;). By using the Website, you agree to the
                        terms of this policy.
                    </p>
                </div>

                {/* Sections */}
                <div className="space-y-10">
                    {/* 1. Company Information */}
                    <section>
                        <h2 className="text-lg font-bold text-[#1A1A54] mb-4 flex items-center gap-2">
                            <span className="text-[#3B82F6]">📋</span> 1. Company Information
                        </h2>
                        <div className="bg-[#F9FAFB] rounded-lg overflow-hidden border border-gray-100">
                            <div className="grid grid-cols-3 gap-px bg-gray-100">
                                <div className="bg-[#F9FAFB] p-4">
                                    <p className="text-[9px] font-bold text-gray-400 tracking-[0.15em] uppercase mb-1">Company Name</p>
                                    <p className="text-sm text-[#1A1A54] font-medium">Star Plast</p>
                                </div>
                                <div className="bg-[#F9FAFB] p-4">
                                    <p className="text-[9px] font-bold text-gray-400 tracking-[0.15em] uppercase mb-1">Contact Email</p>
                                    <p className="text-sm text-[#1A1A54] font-medium">{COMPANY_INFO.email}</p>
                                </div>
                                <div className="bg-[#F9FAFB] p-4">
                                    <p className="text-[9px] font-bold text-gray-400 tracking-[0.15em] uppercase mb-1">Phone Number</p>
                                    <p className="text-sm text-[#1A1A54] font-medium">{COMPANY_INFO.phone}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 2. Information Collection */}
                    <section>
                        <h2 className="text-lg font-bold text-[#1A1A54] mb-3 flex items-center gap-2">
                            <span className="text-[#3B82F6]">👥</span> 2. Information Collection
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            At Star Plast, we respect your privacy and are committed to protecting it. We do not collect any personal
                            information from users when they visit our Website. Our Website is designed purely to display our products
                            and provide information about our offerings.
                        </p>
                    </section>

                    {/* 3. Use of Information */}
                    <section>
                        <h2 className="text-lg font-bold text-[#1A1A54] mb-3 flex items-center gap-2">
                            <span className="text-[#3B82F6]">◷</span> 3. Use of Information
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Since we do not collect any personal information from our users, there is no information to use for any
                            purpose.
                        </p>
                    </section>

                    {/* 4. Data Sharing */}
                    <section>
                        <h2 className="text-lg font-bold text-[#1A1A54] mb-3 flex items-center gap-2">
                            <span className="text-[#3B82F6]">↗</span> 4. Data Sharing
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Given that we do not collect any user data, there is no personal information to share with third parties.
                        </p>
                    </section>

                    {/* 5. Data Security */}
                    <section>
                        <h2 className="text-lg font-bold text-[#1A1A54] mb-3 flex items-center gap-2">
                            <span className="text-[#3B82F6]">🔒</span> 5. Data Security
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Although we do not collect personal information, we are committed to ensuring that our Website is secure.
                            We implement appropriate technical and organizational measures to protect the Website and its contents.
                        </p>
                    </section>

                    {/* 6. Cookies and Tracking */}
                    <section>
                        <h2 className="text-lg font-bold text-[#1A1A54] mb-3 flex items-center gap-2">
                            <span className="text-[#3B82F6]">⊙</span> 6. Cookies and Tracking
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Our Website does not use cookies or other tracking technologies to collect information about your online
                            activities.
                        </p>
                    </section>

                    {/* 7. Third-Party Links */}
                    <section>
                        <h2 className="text-lg font-bold text-[#1A1A54] mb-3 flex items-center gap-2">
                            <span className="text-[#3B82F6]">↗</span> 7. Third-Party Links
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Our Website may contain links to other websites. We are not responsible for the privacy practices or the
                            content of these third-party websites. We encourage you to review the privacy policies of any third-party
                            websites you visit.
                        </p>
                    </section>

                    {/* 8. Children's Privacy */}
                    <section>
                        <h2 className="text-lg font-bold text-[#1A1A54] mb-3 flex items-center gap-2">
                            <span className="text-[#3B82F6]">😊</span> 8. Children&apos;s Privacy
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Our Website is not intended for children under the age of 18. We do not knowingly collect personal
                            information from children. If you believe that we have inadvertently collected such information, please
                            contact us, and we will take steps to delete it.
                        </p>
                    </section>

                    {/* 9. Policy Updates */}
                    <section>
                        <h2 className="text-lg font-bold text-[#1A1A54] mb-3 flex items-center gap-2">
                            <span className="text-[#3B82F6]">↻</span> 9. Policy Updates
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            We may update this privacy policy from time to time. Any changes will be posted on this page with an
                            updated effective date. We encourage you to review this policy periodically to stay informed about how we
                            are protecting your information.
                        </p>
                    </section>

                    {/* 10. Contact Us - highlighted card */}
                    <section className="bg-[#F9FAFB] rounded-2xl p-8 mt-12">
                        <h2 className="text-lg font-bold text-[#1A1A54] mb-3 flex items-center gap-2">
                            <span className="text-[#3B82F6]">📍</span> 10. Contact Us
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed mb-5">
                            If you have any questions or concerns about this privacy policy or our practices, please reach out
                            to our legal compliance team:
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
