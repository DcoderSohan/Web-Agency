import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { isDark, toggleTheme } = useTheme();
    const [mobileMenu, setMobileMenu] = useState(false);

    // Handle glassmorphism effect on scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 w-full z-[100] transition-all duration-500 px-6 py-4 md:px-12 ${isScrolled
                ? (isDark ? 'bg-white/5 backdrop-blur-xl border-b border-white/10 py-3' : 'bg-black/5 backdrop-blur-xl border-b border-black/10 py-3')
                : 'bg-transparent py-6'
                } ${isDark ? 'text-white' : 'text-black'}`}
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center">

                {/* LOGO */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 group cursor-pointer"
                >
                    <div className={`w-8 h-8 flex items-center justify-center rounded-sm group-hover:rotate-90 transition-transform duration-500 ${isDark ? 'bg-white' : 'bg-black'}`}>
                        <span className={`font-black text-xs ${isDark ? 'text-black' : 'text-white'}`}>P</span>
                    </div>
                    <span className={`text-sm font-bold tracking-[0.3em] uppercase hidden sm:block ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
                        PIXELORA.labs
                    </span>
                </motion.div>

                {/* DESKTOP LINKS */}
                <div className="hidden md:flex items-center gap-12">
                    {['Work', 'Services', 'Agency', 'Tech'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className={`relative text-[10px] font-bold uppercase tracking-[0.2em] transition-colors group ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}
                        >
                            {item}
                            <span className={`absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full ${isDark ? 'bg-white' : 'bg-black'}`} />
                        </a>
                    ))}
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-6">
                    {/* THEME TOGGLE */}
                    <button
                        onClick={toggleTheme}
                        className={`relative w-12 h-6 rounded-full border flex items-center px-1 group overflow-hidden ${isDark ? 'border-white/20 bg-white/5' : 'border-black/20 bg-black/5'}`}
                    >
                        <motion.div
                            animate={{ x: isDark ? 24 : 0 }}
                            className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}
                        >
                            {isDark ? <FiMoon /> : <FiSun />}
                        </motion.div>
                    </button>

                    {/* CONTACT CTA (MINIMAL) */}
                    <button className={`hidden lg:block text-[10px] font-bold uppercase tracking-widest border px-6 py-2 rounded-full transition-all ${isDark ? 'text-white border-white/20 hover:bg-white hover:text-black' : 'text-black border-black/20 hover:bg-black hover:text-white'}`}>
                        Let's Talk
                    </button>

                    {/* MOBILE MENU TOGGLE */}
                    <button
                        className="md:hidden text-2xl"
                        onClick={() => setMobileMenu(!mobileMenu)}
                    >
                        {mobileMenu ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </div>

            {/* MOBILE OVERLAY */}
            <AnimatePresence>
                {mobileMenu && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        className={`fixed inset-0 h-screen z-[90] flex flex-col justify-center items-center gap-8 ${isDark ? 'bg-[#0D0D0F] text-white' : 'bg-white text-black'}`}
                    >
                        {['Work', 'Services', 'Agency', 'Tech', 'Contact'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                onClick={() => setMobileMenu(false)}
                                className="text-4xl font-light uppercase tracking-tighter hover:italic transition-all"
                            >
                                {item}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;