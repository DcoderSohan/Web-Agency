import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const TestimonialsFilmstrip = () => {
    const { isDark } = useTheme();
    const [expandedIndex, setExpandedIndex] = useState(0);

    const reviews = [
        {
            company: "PIXELORA",
            quote: "Sohan and his team delivered a top-tier digital experience that truly captured our agency's vision.",
            person: "Project Lead",
            year: "2026"
        },
        {
            company: "KONKAN REALTY",
            quote: "The property management system is seamless. It has completely transformed how we handle our listings.",
            person: "Operations Head",
            year: "2025"
        },
        {
            company: "OVALEN",
            quote: "The 3D watch gallery is stunning. The GSAP animations make the product feel incredibly premium.",
            person: "Brand Manager",
            year: "2026"
        },
        {
            company: "MEJWANI",
            quote: "A perfect blend of culture and technology. Our booking system is now a core part of our business.",
            person: "Founder",
            year: "2026"
        }
    ];

    return (
        <section className={`py-32 px-4 overflow-hidden transition-colors duration-500 ${isDark ? 'bg-[#0D0D0F]' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto">

                <div className="mb-16">
                    <h2 className="text-[10px] uppercase tracking-[0.5em] text-gray-500 font-bold mb-4">04 — Success Records</h2>
                    <h3 className={`text-4xl md:text-6xl font-medium tracking-tighter ${isDark ? 'text-white' : 'text-gray-900'}`}>Client Stories.</h3>
                </div>

                <div className="flex flex-col md:flex-row h-[500px] gap-2">
                    {reviews.map((item, i) => (
                        <motion.div
                            key={i}
                            onMouseEnter={() => setExpandedIndex(i)}
                            animate={{
                                flex: expandedIndex === i ? 4 : 1,
                            }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className={`relative overflow-hidden group cursor-pointer rounded-2xl border p-8 flex flex-col justify-between transition-colors duration-500 ${isDark ? 'bg-[#161618] border-white/5' : 'bg-white border-black/5 shadow-sm'}`}
                        >
                            {/* Background Accent for Active Item */}
                            <div className={`absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent transition-opacity duration-500 ${expandedIndex === i ? 'opacity-100' : 'opacity-0'}`} />

                            <div className="relative z-10 flex justify-between items-start">
                                {/* Company Name - Rotated when collapsed, Normal when expanded */}
                                <motion.h4
                                    animate={{
                                        rotate: expandedIndex === i ? 0 : -90,
                                        x: expandedIndex === i ? 0 : -10,
                                        y: expandedIndex === i ? 0 : 40
                                    }}
                                    className={`text-2xl font-bold whitespace-nowrap origin-left transition-colors ${isDark ? (expandedIndex === i ? 'text-white' : 'text-gray-600') : (expandedIndex === i ? 'text-gray-900' : 'text-gray-400')}`}
                                >
                                    {item.company}
                                </motion.h4>
                                <span className="text-[10px] font-mono text-gray-500">{item.year}</span>
                            </div>

                            {/* Content - Only fully visible when expanded */}
                            <motion.div
                                animate={{
                                    opacity: expandedIndex === i ? 1 : 0,
                                    y: expandedIndex === i ? 0 : 20
                                }}
                                className="relative z-10 max-w-lg"
                            >
                                <p className={`text-xl md:text-2xl leading-relaxed italic mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                    "{item.quote}"
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-[1px] bg-blue-500" />
                                    <span className="text-xs uppercase tracking-widest text-gray-500">{item.person}</span>
                                </div>
                            </motion.div>

                            {/* Collapsed Indicator */}
                            {expandedIndex !== i && (
                                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col gap-1">
                                    <div className="w-1 h-1 bg-gray-700 rounded-full" />
                                    <div className="w-1 h-1 bg-gray-700 rounded-full" />
                                    <div className="w-1 h-1 bg-gray-700 rounded-full" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsFilmstrip;