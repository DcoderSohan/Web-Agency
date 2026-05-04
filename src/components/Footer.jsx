import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiArrowUpRight, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const VtrcLogoFull = ({ isDark }) => (
    <div className="flex items-center gap-3">
        <svg viewBox="0 0 56 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-7">
            <polygon points="0,4 10,4 18,36 8,36" fill="none" stroke={isDark ? '#E2E8F0' : '#0F1720'} strokeWidth="1.5" />
            <line x1="0" y1="4" x2="18" y2="4" stroke={isDark ? '#E2E8F0' : '#0F1720'} strokeWidth="1.5" />
            <line x1="5" y1="12" x2="13" y2="12" stroke={isDark ? '#E2E8F0' : '#0F1720'} strokeWidth="0.8" />
            <line x1="8" y1="22" x2="16" y2="22" stroke={isDark ? '#E2E8F0' : '#0F1720'} strokeWidth="0.8" />
            <path d="M18 36 L28 10 L44 2 L40 14 L30 18 L26 30 Z" fill="none" stroke="#3B82F6" strokeWidth="1.5" />
            <circle cx="28" cy="10" r="2" fill="#3B82F6" />
            <circle cx="44" cy="2" r="2" fill="#93C5FD" />
            <circle cx="40" cy="14" r="1.5" fill="#3B82F6" />
            <line x1="28" y1="10" x2="44" y2="2" stroke="#3B82F6" strokeWidth="0.8" strokeDasharray="3,2" />
            <line x1="44" y1="2" x2="40" y2="14" stroke="#3B82F6" strokeWidth="0.8" />
            <line x1="40" y1="14" x2="30" y2="18" stroke="#93C5FD" strokeWidth="0.8" />
        </svg>
        <div className="flex flex-col leading-none">
            <span className="font-black text-[15px] tracking-[0.2em] uppercase t-text">VTRC</span>
            <span className="text-[8px] font-semibold tracking-[0.35em] uppercase text-[#3B82F6]">TECHNOLOGIES</span>
        </div>
    </div>
);

const Footer = () => {
    const { isDark } = useTheme();
    const currentYear = new Date().getFullYear();

    return (
        <footer
            id="contact"
            className="t-section pt-24 pb-12 px-6 md:px-12 border-t border-[#3B82F6]/10 relative overflow-hidden"
        >
            {/* BACKGROUND WATERMARK */}
            <div className="absolute bottom-0 right-0 opacity-[0.015] pointer-events-none translate-y-1/4 select-none">
                <h2 className="text-[22vw] font-black leading-none tracking-tighter text-white">VTRC</h2>
            </div>

            {/* Grid pattern */}
            <div className="absolute inset-0 vtrc-grid pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* ── MAIN CTA ── */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-24 gap-12">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-4 mb-8"
                        >
                            <div className="w-8 h-[1px] bg-[#3B82F6] rounded-full" />
                            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#3B82F6]">
                                Get in Touch
                            </span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-5xl md:text-8xl font-extrabold tracking-tight leading-none mb-10"
                        >
                            LET'S BUILD{' '}
                            <span
                                style={{
                                    background: 'linear-gradient(135deg, #3B82F6, #93C5FD)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}
                            >
                                THE FUTURE.
                            </span>
                        </motion.h2>

                        <motion.div
                            whileHover={{ x: 10 }}
                            className="inline-flex items-center gap-4 group cursor-pointer"
                        >
                            <div className="w-14 h-14 rounded-full bg-[#3B82F6] flex items-center justify-center text-white transition-transform group-hover:rotate-45 glow-blue-sm">
                                <FiArrowUpRight size={24} />
                            </div>
                            <span className="text-xl md:text-2xl font-light border-b border-[#3B82F6]/30 pb-1 t-text-muted group-hover:t-text group-hover:border-[#3B82F6] transition-all">
                                start a conversation
                            </span>
                        </motion.div>
                    </div>

                    {/* CONTACT DETAILS */}
                    <div className="space-y-4 text-right">
                        {[
                            { icon: <FiMail size={14} />, text: 'hello@vtrc.com' },
                            { icon: <FiPhone size={14} />, text: '+1 123 456 7890' },
                            { icon: <FiMapPin size={14} />, text: 'San Francisco, CA' },
                        ].map((item) => (
                            <div key={item.text} className="flex items-center gap-2 justify-end t-text-muted hover:text-[#3B82F6] transition-colors cursor-pointer">
                                <span className="text-[#3B82F6]">{item.icon}</span>
                                <span className="text-sm font-light">{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── LINKS GRID ── */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24 border-t border-[#3B82F6]/08 pt-12">
                    {/* Navigation */}
                    <div>
                        <h4 className="text-[10px] uppercase tracking-widest text-[#3B82F6] font-bold mb-6">
                            Company
                        </h4>
                        <ul className="space-y-4 text-sm font-light t-text-muted">
                            {['Solutions', 'Services', 'About', 'Careers', 'Contact'].map(item => (
                                <li key={item} className="hover:text-[#3B82F6] transition-colors cursor-pointer">{item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-[10px] uppercase tracking-widest text-[#3B82F6] font-bold mb-6">
                            Services
                        </h4>
                        <ul className="space-y-4 text-sm font-light t-text-muted">
                            {['Enterprise Software', 'Cloud Integration', 'Cybersecurity', 'Data & Analytics', 'Managed Services'].map(item => (
                                <li key={item} className="hover:text-[#3B82F6] transition-colors cursor-pointer">{item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-[10px] uppercase tracking-widest text-[#3B82F6] font-bold mb-6">
                            Social
                        </h4>
                        <ul className="space-y-4 text-sm font-light t-text-muted">
                            {[
                                { icon: <FiLinkedin size={13} />, label: 'LinkedIn' },
                                { icon: <FiTwitter  size={13} />, label: 'Twitter' },
                                { icon: <FiGithub   size={13} />, label: 'GitHub' },
                            ].map(item => (
                                <li key={item.label} className="flex items-center gap-2 hover:text-[#3B82F6] transition-colors cursor-pointer">
                                    <span className="text-[#3B82F6]">{item.icon}</span>
                                    {item.label}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter stub */}
                    <div>
                        <h4 className="text-[10px] uppercase tracking-widest text-[#3B82F6] font-bold mb-6">
                            Newsletter
                        </h4>
                        <p className="text-sm font-light t-text-subtle mb-4 leading-relaxed">
                            Stay ahead with our technology insights and industry updates.
                        </p>
                        <div className="flex gap-2">
                            <input
                                id="footer-email"
                                type="email"
                                placeholder="your@email.com"
                                className="flex-1 px-3 py-2 text-xs rounded-md t-card border text-sm t-text placeholder:t-text-subtle focus:outline-none focus:border-[#3B82F6]/60"
                            />
                            <button
                                id="footer-subscribe"
                                className="px-3 py-2 rounded-md bg-[#3B82F6] text-white text-xs font-bold hover:bg-[#2563EB] transition-colors"
                            >
                                →
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── BOTTOM BAR ── */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-[#3B82F6]/08 pt-10">
                    <VtrcLogoFull isDark={isDark} />

                    <p className="text-[10px] uppercase tracking-[0.2em] t-text-subtle">
                        © {currentYear} VTRC Technologies. All Rights Reserved.
                    </p>

                    <div className="flex gap-8">
                        {['Privacy Policy', 'Terms of Service'].map(item => (
                            <span key={item} className="text-[10px] uppercase tracking-widest t-text-subtle cursor-pointer hover:text-[#3B82F6] transition-colors">
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;