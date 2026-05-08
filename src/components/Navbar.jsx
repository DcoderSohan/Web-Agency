import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight, FiSun, FiMoon } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const navLinks = ['Home', 'About Us', 'Portfolio', 'Services', 'Contact Us'];

/* ── VTRC Logo SVG ───────────────────────────── */
import LogoAnimation from './LogoAnimation';


/* ── THEME TOGGLE BUTTON ─────────────────────── */
const ThemeToggle = ({ isDark, onToggle }) => (
    <button
        id="theme-toggle"
        onClick={onToggle}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        className={`relative w-8 h-8 rounded-full flex items-center justify-center
            transition-colors duration-200 focus:outline-none focus-visible:ring-2
            focus-visible:ring-[#3B82F6]/60
            ${isDark
                ? 'bg-white/08 hover:bg-white/14 text-yellow-300'
                : 'bg-black/05 hover:bg-black/10 text-gray-600'
            }`}
    >
        <AnimatePresence mode="wait" initial={false}>
            <motion.span
                key={isDark ? 'moon' : 'sun'}
                initial={{ scale: 0.6, opacity: 0, rotate: -30 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.6, opacity: 0, rotate: 30 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="flex items-center justify-center"
            >
                {isDark ? <FiMoon size={14} /> : <FiSun size={14} />}
            </motion.span>
        </AnimatePresence>
    </button>
);

/* ── NAVBAR ──────────────────────────────────── */
const Navbar = () => {
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const { isDark, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeMobile = useCallback(() => setMobileMenu(false), []);

    return (
        <>
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-6 left-0 w-full z-[100] px-4 md:px-8 pointer-events-none"
            >
                <nav className={`
                    mx-auto max-w-6xl pointer-events-auto
                    flex justify-between items-center px-6 py-3
                    rounded-2xl transition-all duration-500
                    ${isScrolled
                        ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-lg border border-white/20 dark:border-white/10'
                        : 'bg-white/95 dark:bg-zinc-900/90 backdrop-blur-md shadow-md'
                    }
                `}>
                    {/* LOGO */}
                    <Link to="/" id="nav-logo" className="flex items-center gap-2 group">
                        <LogoAnimation
                            className="w-8 h-6 flex-shrink-0"
                            color={isDark ? '#E2E8F0' : '#0F1720'}
                        />
                    </Link>

                    {/* DESKTOP NAV LINKS */}
                    <div className="hidden md:flex items-center gap-10">
                        {navLinks.map((item) => {
                            const path = item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`;
                            const isActive = location.pathname === path;
                            return (
                                <Link
                                    key={item}
                                    id={`nav-${item.toLowerCase().replace(' ', '-')}`}
                                    to={path}
                                    className={`relative text-[11px] font-bold uppercase tracking-[0.2em]
                                        transition-all duration-300
                                        ${isActive 
                                            ? 'text-white' 
                                            : isDark ? 'text-white/50 hover:text-white' : 'text-gray-500 hover:text-black'}`}
                                >
                                    {item}
                                    {isActive && (
                                        <motion.div 
                                            layoutId="nav-underline"
                                            className="absolute -bottom-2 left-0 w-full h-[1.5px] bg-white"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* RIGHT ACTIONS */}
                    <div className="flex items-center gap-4">
                        {/* THEME TOGGLE */}
                        <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

                        {/* MOBILE BURGER */}
                        <button
                            id="nav-mobile-menu"
                            onClick={() => setMobileMenu(!mobileMenu)}
                            className="md:hidden flex flex-col gap-1 w-8 h-8 items-center justify-center rounded-lg
                                bg-black/05 dark:bg-white/05 hover:bg-black/10 transition-colors"
                            aria-label="Toggle menu"
                        >
                            <motion.span
                                animate={{ rotate: mobileMenu ? 45 : 0, y: mobileMenu ? 5 : 0 }}
                                className={`block w-4 h-0.5 ${isDark ? 'bg-white' : 'bg-black'}`}
                            />
                            <motion.span
                                animate={{ opacity: mobileMenu ? 0 : 1 }}
                                className="block w-4 h-0.5 bg-[#3B82F6]"
                            />
                            <motion.span
                                animate={{ rotate: mobileMenu ? -45 : 0, y: mobileMenu ? -5 : 0 }}
                                className={`block w-4 h-0.5 ${isDark ? 'bg-white' : 'bg-black'}`}
                            />
                        </button>
                    </div>
                </nav>
            </motion.div>

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

                        {[...navLinks].map((item, i) => {
                            const path = item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`;
                            return (
                                <motion.div
                                    key={item}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.07 + 0.05 }}
                                >
                                    <Link
                                        to={path}
                                        onClick={closeMobile}
                                        className={`text-5xl font-bold tracking-tight transition-colors
                                            ${isDark
                                                ? 't-text-muted hover:t-text'
                                                : 't-text-muted hover:t-text'
                                            }`}
                                    >
                                        {item}
                                    </Link>
                                </motion.div>
                            );
                        })}

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