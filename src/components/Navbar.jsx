import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight, FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const navLinks = ['Solutions', 'Services', 'About', 'Careers'];

/* ── VTRC Logo SVG ───────────────────────────── */
import LogoAnimation from './LogoAnimation';


/* ── THEME TOGGLE BUTTON ─────────────────────── */
const ThemeToggle = ({ isDark, onToggle }) => (
    <button
        id="theme-toggle"
        onClick={onToggle}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        className={`relative w-10 h-10 rounded-full flex items-center justify-center
            transition-colors duration-200 focus:outline-none focus-visible:ring-2
            focus-visible:ring-[#3B82F6]/60
            ${isDark
                ? 'bg-white/08 hover:bg-white/14 text-yellow-300'
                : 'bg-[#3B82F6]/10 hover:bg-[#3B82F6]/20 text-[#1E40AF]'
            }`}
    >
        {/* Swap icon with a quick scale/fade — no layout shift */}
        <AnimatePresence mode="wait" initial={false}>
            <motion.span
                key={isDark ? 'moon' : 'sun'}
                initial={{ scale: 0.6, opacity: 0, rotate: -30 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.6, opacity: 0, rotate: 30 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="flex items-center justify-center"
            >
                {isDark ? <FiMoon size={16} /> : <FiSun size={16} />}
            </motion.span>
        </AnimatePresence>
    </button>
);

/* ── NAVBAR ──────────────────────────────────── */
const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const { isDark, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 60);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeMobile = useCallback(() => setMobileMenu(false), []);

    return (
        <>
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 w-full z-[100] transition-all duration-400 ${isScrolled
                    ? 'py-3 backdrop-blur-2xl border-b'
                    : 'py-5 bg-transparent'
                    }`}
                style={isScrolled ? {
                    background: 'var(--nav-bg)',
                    borderColor: 'var(--nav-border)',
                } : {}}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">

                    {/* LOGO */}
                    <a href="#" id="nav-logo" className="flex items-center gap-3 group">
                        <LogoAnimation 
                            className="w-10 h-7 flex-shrink-0" 
                            color={isDark ? '#E2E8F0' : '#0F1720'} 
                        />
                        <div className="flex flex-col leading-none">
                            <span className={`font-black text-[24px] tracking-[0.2em] uppercase transition-colors ${isDark ? 'text-white' : 'text-[#0F1720]'}`}>
                                VTRC
                            </span>
                            <span className="text-[8px] font-semibold tracking-[0.35em] uppercase text-[#3B82F6]">
                                TECHNOLOGIES
                            </span>
                        </div>
                    </a>

                    {/* DESKTOP NAV LINKS */}
                    <div className="hidden md:flex items-center gap-10">
                        {navLinks.map((item) => (
                            <a
                                key={item}
                                id={`nav-${item.toLowerCase()}`}
                                href={`#${item.toLowerCase()}`}
                                className={`relative text-[11px] font-semibold uppercase tracking-[0.2em]
                                    transition-colors duration-200 group
                                    ${isDark
                                        ? 't-text-muted hover:t-text'
                                        : 't-text-muted hover:t-text'
                                    }`}
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] rounded-full bg-[#3B82F6] transition-all duration-300 group-hover:w-full" />
                            </a>
                        ))}
                    </div>

                    {/* RIGHT ACTIONS */}
                    <div className="flex items-center gap-3">

                        {/* THEME TOGGLE */}
                        <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

                        {/* CTA */}
                        <a
                            href="#contact"
                            id="nav-contact"
                            className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full
                                text-[11px] font-bold uppercase tracking-widest text-white
                                bg-[#3B82F6] hover:bg-[#2563EB] transition-all duration-200
                                shadow-lg shadow-[#3B82F6]/25 hover:shadow-[#3B82F6]/40 hover:-translate-y-0.5"
                        >
                            Contact <FiArrowUpRight size={11} />
                        </a>

                        {/* MOBILE BURGER */}
                        <button
                            id="nav-mobile-menu"
                            onClick={() => setMobileMenu(!mobileMenu)}
                            className="md:hidden flex flex-col gap-1.5 w-9 h-9 items-center justify-center rounded-full
                                hover:bg-[#3B82F6]/10 transition-colors"
                            aria-label="Toggle menu"
                        >
                            <motion.span
                                animate={{ rotate: mobileMenu ? 45 : 0, y: mobileMenu ? 6 : 0 }}
                                transition={{ duration: 0.25 }}
                                className={`block w-5 h-0.5 rounded-full ${isDark ? 'bg-[#E2E8F0]' : 'bg-[#0F1720]'}`}
                            />
                            <motion.span
                                animate={{ opacity: mobileMenu ? 0 : 1 }}
                                transition={{ duration: 0.2 }}
                                className="block w-3 h-0.5 rounded-full bg-[#3B82F6] self-start ml-1"
                            />
                            <motion.span
                                animate={{ rotate: mobileMenu ? -45 : 0, y: mobileMenu ? -6 : 0 }}
                                transition={{ duration: 0.25 }}
                                className={`block w-5 h-0.5 rounded-full ${isDark ? 'bg-[#E2E8F0]' : 'bg-[#0F1720]'}`}
                            />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* ── MOBILE MENU ───────────────────────── */}
            <AnimatePresence>
                {mobileMenu && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-[90] flex flex-col justify-center items-center gap-10"
                        style={{ background: 'var(--surface-bg)' }}
                    >
                        {/* Decorative orb */}
                        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-[#3B82F6]/05 blur-[80px] pointer-events-none" />

                        {/* Theme toggle inside mobile menu */}
                        <div className="absolute top-6 right-6">
                            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
                        </div>

                        {[...navLinks, 'Contact'].map((item, i) => (
                            <motion.a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                onClick={closeMobile}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.07 + 0.05 }}
                                className={`text-5xl font-bold tracking-tight transition-colors
                                    ${isDark
                                        ? 't-text-muted hover:t-text'
                                        : 't-text-muted hover:t-text'
                                    }`}
                            >
                                {item}
                            </motion.a>
                        ))}

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.45 }}
                        >
                            <a
                                href="#contact"
                                onClick={closeMobile}
                                className="btn-brand"
                            >
                                Get in Touch <FiArrowUpRight />
                            </a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;