import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiInstagram, FiLinkedin, FiArrowUpRight } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
    const { isDark } = useTheme();
    const currentYear = new Date().getFullYear();

    return (
        <footer className={`pt-24 pb-12 px-6 md:px-12 border-t relative overflow-hidden transition-colors duration-500 ${isDark ? 'bg-[#0D0D0F] text-white border-white/5' : 'bg-gray-50 text-gray-900 border-black/5'}`}>

            {/* BACKGROUND ACCENT */}
            <div className="absolute bottom-0 right-0 opacity-[0.02] pointer-events-none translate-y-1/4">
                <h2 className="text-[25vw] font-bold leading-none select-none">PIXELORA</h2>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* MAIN CTA SECTION */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-32">
                    <div className="max-w-2xl">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-8xl font-medium tracking-tighter leading-none mb-8"
                        >
                            LET'S CREATE <br />
                            <span className="text-gray-600 italic font-light">LEGACIES.</span>
                        </motion.h2>

                        <motion.div
                            whileHover={{ x: 10 }}
                            className="inline-flex items-center gap-4 group cursor-pointer"
                        >
                            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white transition-transform group-hover:rotate-45">
                                <FiArrowUpRight size={32} />
                            </div>
                            <span className={`text-xl md:text-2xl font-light border-b pb-1 transition-all ${isDark ? 'border-white/20 group-hover:border-white' : 'border-black/20 group-hover:border-black'}`}>
                                start a conversation
                            </span>
                        </motion.div>
                    </div>

                    <div className="mt-16 lg:mt-0 text-right">
                        <p className="text-xs uppercase tracking-[0.4em] text-gray-500 mb-2">Based in</p>
                        <p className="text-xl font-medium">Ratnagiri, Maharashtra</p>
                    </div>
                </div>

                {/* SECONDARY LINKS GRID */}
                <div className={`grid grid-cols-2 md:grid-cols-4 gap-12 mb-24 border-t pt-12 ${isDark ? 'border-white/5' : 'border-black/5'}`}>
                    {/* Navigation */}
                    <div>
                        <h4 className="text-[10px] uppercase tracking-widest text-gray-600 font-bold mb-6">Explore</h4>
                        <ul className={`space-y-4 text-sm font-light ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            <li className={`transition-colors cursor-pointer ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>About</li>
                            <li className={`transition-colors cursor-pointer ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>Work</li>
                            <li className={`transition-colors cursor-pointer ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>Careers</li>
                            <li className={`transition-colors cursor-pointer ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>Contact</li>
                        </ul>
                    </div>

                    {/* Socials */}
                    <div>
                        <h4 className="text-[10px] uppercase tracking-widest text-gray-600 font-bold mb-6">Social</h4>
                        <ul className={`space-y-4 text-sm font-light ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            <li className={`flex items-center gap-2 transition-colors cursor-pointer ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>
                                <FiGithub /> Github
                            </li>
                            <li className={`flex items-center gap-2 transition-colors cursor-pointer ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>
                                <FiLinkedin /> LinkedIn
                            </li>
                            <li className={`flex items-center gap-2 transition-colors cursor-pointer ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>
                                <FiInstagram /> Instagram
                            </li>
                        </ul>
                    </div>

                    {/* Contact Details */}
                    <div className="col-span-2 md:col-span-1 md:ml-auto">
                        <h4 className="text-[10px] uppercase tracking-widest text-gray-600 font-bold mb-6">Inquiries</h4>
                        <p className={`text-sm font-light transition-colors cursor-pointer mb-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}>
                            hello@pixelora.labs
                        </p>
                        <p className={`text-sm font-light ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            +91 98765 43210
                        </p>
                    </div>
                </div>

                {/* BOTTOM BAR */}
                <div className={`flex flex-col md:flex-row justify-between items-center gap-6 border-t pt-12 ${isDark ? 'border-white/5' : 'border-black/5'}`}>
                    <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>
                            <span className="font-bold text-xs">SS</span>
                        </div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-600">
                            &copy; {currentYear} Design by Sohan — Pixelora
                        </p>
                    </div>

                    <div className="flex gap-8">
                        <span className={`text-[10px] uppercase tracking-widest text-gray-600 cursor-pointer transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>Privacy</span>
                        <span className={`text-[10px] uppercase tracking-widest text-gray-600 cursor-pointer transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}>Terms</span>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;