import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const WhyChooseUs = () => {
    const { isDark } = useTheme();
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const reasons = [
        {
            id: "01",
            title: "Performance First Architecture",
            description: "We don't sacrifice speed for beauty. Our codebases are optimized for lightning-fast load times and SEO dominance.",
            accent: "from-blue-600/20"
        },
        {
            id: "02",
            title: "Cinematic User Experiences",
            description: "Using GSAP and 3D integration, we create immersive journeys that keep users engaged far longer than static sites.",
            accent: "from-purple-600/20"
        },
        {
            id: "03",
            title: "Full-Cycle Digital Strategy",
            description: "From initial wireframes to post-launch scaling, we act as your technical partners, not just a service provider.",
            accent: "from-emerald-600/20"
        }
    ];

    return (
        <section className={`relative py-32 overflow-hidden transition-colors duration-500 ${isDark ? 'bg-[#0D0D0F] text-white' : 'bg-white text-gray-900'}`}>
            {/* DYNAMIC BACKGROUND ACCENT */}
            <AnimatePresence>
                {hoveredIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`absolute inset-0 bg-gradient-to-br ${reasons[hoveredIndex].accent} to-transparent pointer-events-none transition-colors duration-700`}
                    />
                )}
            </AnimatePresence>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-12 gap-8">

                    {/* LEFT SIDE: STATIC HEADER */}
                    <div className="col-span-12 lg:col-span-5 mb-16 lg:mb-0">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-[10px] uppercase tracking-[0.5em] text-gray-500 font-bold mb-6"
                        >
                            03 — Why Us
                        </motion.h2>
                        <h3 className="text-5xl md:text-6xl font-medium leading-tight">
                            The bridge between <br />
                            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isDark ? 'from-white to-gray-500' : 'from-gray-900 to-gray-400'}`}>
                                concept & reality.
                            </span>
                        </h3>
                        <p className={`mt-8 max-w-sm font-light leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            We combine technical rigor with creative intuition to solve problems that others haven't even identified yet.
                        </p>
                    </div>

                    {/* RIGHT SIDE: INTERACTIVE LIST */}
                    <div className="col-span-12 lg:col-span-7 space-y-4">
                        {reasons.map((item, index) => (
                            <motion.div
                                key={item.id}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className={`group relative border-b py-8 cursor-crosshair transition-all duration-300 ${isDark ? 'border-white/10' : 'border-black/10'}`}
                            >
                                <div className="flex items-start gap-8">
                                    <span className={`text-sm font-mono pt-2 transition-colors ${isDark ? 'text-gray-600 group-hover:text-white' : 'text-gray-400 group-hover:text-black'}`}>
                                        {item.id}
                                    </span>

                                    <div className="flex-1">
                                        <h4 className="text-3xl md:text-4xl font-medium mb-4 group-hover:translate-x-2 transition-transform duration-500">
                                            {item.title}
                                        </h4>

                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{
                                                height: hoveredIndex === index ? "auto" : 0,
                                                opacity: hoveredIndex === index ? 1 : 0
                                            }}
                                            transition={{ duration: 0.4, ease: "circOut" }}
                                            className="overflow-hidden"
                                        >
                                            <p className={`leading-relaxed max-w-lg pb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                                {item.description}
                                            </p>
                                        </motion.div>
                                    </div>

                                    {/* VISUAL INDICATOR */}
                                    <div className="hidden md:block overflow-hidden">
                                        <motion.div
                                            animate={{
                                                rotate: hoveredIndex === index ? 45 : 0,
                                                scale: hoveredIndex === index ? 1.5 : 1
                                            }}
                                            className={`w-12 h-12 border flex items-center justify-center rounded-full transition-colors ${isDark ? 'border-white/20 group-hover:border-white' : 'border-black/20 group-hover:border-black'}`}
                                        >
                                            <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-white' : 'bg-black'}`} />
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;