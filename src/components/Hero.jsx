import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { useTheme } from '../context/ThemeContext';

const Hero = () => {
    const { isDark } = useTheme();
    // We retain mousePos state for potential other interactions,
    // but the updated Spline scene handles its own mouse-follow logic.
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className={`relative h-screen w-full overflow-hidden flex items-center transition-colors duration-500 ${isDark ? 'bg-[#0D0D0F] text-white' : 'bg-gray-50 text-gray-900'}`}>

            {/* INTERACTIVE 3D BACKGROUND - MOUSE RESPONSIVE */}
            <div className="absolute inset-0 z-0">
                <Suspense fallback={
                    <div className={`w-full h-full flex items-center justify-center ${isDark ? 'bg-[#0D0D0F]' : 'bg-gray-50'}`}>
                        <div className="w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[150px] animate-pulse" />
                    </div>
                }>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2.5 }}
                        className="w-full h-full"
                    >
                        {/* 
                            This is a working Spline scene URL. 
                            Note: The previous URL (p84VzG9J996N768M) returned a 403 Forbidden error, 
                            which means it was either unpublished, deleted, or set to private.
                        */}
                        <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
                    </motion.div>
                </Suspense>

                {/* Critical Overlay: 'pointer-events-none' lets mouse events pass 
                    through to the Spline model behind it, while ensuring text is readable.
                */}
                <div className={`absolute inset-0 pointer-events-none bg-gradient-to-r to-transparent z-[1] ${isDark ? 'from-[#0D0D0F] via-[#0D0D0F]/80' : 'bg-white'}`} />
            </div>

            {/* LEFT-ALIGNED HERO BLOCK */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-12 grid grid-cols-12 gap-4 pointer-events-none">
                <div className="col-span-12 lg:col-span-7 pointer-events-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className={`inline-block px-3 py-1 border rounded-full text-[10px] tracking-[0.2em] uppercase mb-8 backdrop-blur-sm ${isDark ? 'border-white/20 bg-white/5' : 'border-black/20 bg-black/5 text-gray-700'}`}>
                            Creative Technology Studio
                        </span>

                        <h1 className="text-7xl md:text-[9rem] font-medium leading-[0.8] tracking-tighter mb-8">
                            PIXELORA <br />
                            <span className="opacity-30 italic">Labs</span>
                        </h1>

                        <div className={`flex items-start gap-12 mt-12 border-l pl-8 ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                            <p className={`text-lg max-w-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                A boutique web agency crafting digital monuments through code, 3D motion, and avant-garde UI design.
                            </p>

                            <div className="hidden md:block">
                                <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-2 font-bold">Stack</div>
                                <ul className={`text-[10px] space-y-1 font-mono ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    <li>— REACT / NEXT.JS</li>
                                    <li>— THREE.JS / SPLINE</li>
                                    <li>— TAILWIND / GSAP</li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* FLOATING ACTION BOX (Right Side) */}
                <div className="col-span-12 lg:col-span-5 flex items-end justify-end pb-12 pointer-events-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        whileHover={{ y: -5 }}
                        className={`p-8 backdrop-blur-xl border rounded-2xl max-w-xs z-20 ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}
                    >
                        <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Have a vision?</h3>
                        <p className={`text-sm mb-6 leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            We specialize in turning complex ideas into simple, high-converting digital products.
                        </p>
                        <button className={`w-full py-4 font-bold text-xs uppercase tracking-widest transition-all duration-500 rounded-sm hover:bg-purple-600 hover:text-white ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>
                            Start a Project
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* DYNAMIC SCROLL PROGRESS */}
            <div className="absolute bottom-12 right-12 flex items-center gap-4 z-10">
                <div className={`h-[1px] w-24 relative overflow-hidden ${isDark ? 'bg-white/20' : 'bg-black/20'}`}>
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-purple-500"
                    />
                </div>
                <span className="text-[10px] font-mono opacity-50 tracking-widest uppercase">Scroll</span>
            </div>
        </section>
    );
};

export default Hero;