import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const About = () => {
    const { isDark } = useTheme();
    // Splits the headline into individual words for targeted animation
    const headline = "We don’t just build websites; we architect digital monuments that command attention and redefine industry standards.";
    const words = headline.split(" ");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const wordVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <section className={`relative py-24 px-6 md:px-12 overflow-hidden transition-colors duration-500 ${isDark ? 'bg-[#0D0D0F] text-white' : 'bg-gray-50 text-gray-900'}`}>
            <div className="max-w-7xl mx-auto">

                {/* PART 1: KINETIC HEADLINE WITH HOVER */}
                <div className="mb-32">
                    <motion.h2
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-[10px] uppercase tracking-[0.5em] text-blue-500 font-bold mb-8"
                    >
                        01 — The Manifesto
                    </motion.h2>

                    <motion.h3
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-4xl md:text-7xl font-medium leading-[1.1] tracking-tight max-w-5xl flex flex-wrap gap-x-[0.3em] gap-y-[0.1em]"
                    >
                        {words.map((word, i) => (
                            <motion.span
                                key={i}
                                variants={wordVariants}
                                whileHover={{
                                    scale: 1.1,
                                    color: "#3B82F6", // Blue-500
                                    transition: { duration: 0.2 }
                                }}
                                className="inline-block cursor-default transition-colors duration-300"
                            >
                                {word === "monuments" || word === "digital" ? (
                                    <span className={`transition-colors hover:text-blue-400 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                                        {word}
                                    </span>
                                ) : word === "redefine" ? (
                                    <span className="italic font-light opacity-80 hover:opacity-100 transition-opacity">
                                        {word}
                                    </span>
                                ) : (
                                    word
                                )}
                            </motion.span>
                        ))}
                    </motion.h3>
                </div>
            </div>
        </section>
    );
};

export default About;