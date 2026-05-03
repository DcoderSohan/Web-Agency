import React from 'react';
import {
    SiMongodb, SiExpress, SiReact, SiNodedotjs,
    SiTailwindcss, SiFramer, SiThreedotjs, SiGreensock
} from 'react-icons/si';
import { useTheme } from '../context/ThemeContext';

const Tech = () => {
    const { isDark } = useTheme();
    const techs = [
        { name: 'MongoDB', icon: <SiMongodb />, color: 'hover:text-emerald-500' },
        { name: 'Express', icon: <SiExpress />, color: 'hover:text-gray-400' },
        { name: 'React', icon: <SiReact />, color: 'hover:text-cyan-400' },
        { name: 'Node.js', icon: <SiNodedotjs />, color: 'hover:text-green-500' },
        { name: 'Tailwind', icon: <SiTailwindcss />, color: 'hover:text-sky-400' },
        { name: 'Framer', icon: <SiFramer />, color: 'hover:text-pink-500' },
        { name: 'Three.js', icon: <SiThreedotjs />, color: isDark ? 'hover:text-white' : 'hover:text-gray-900' },
        { name: 'GSAP', icon: <SiGreensock />, color: 'hover:text-lime-400' },
    ];

    // We double the array to ensure the loop is seamless
    const scrollItems = [...techs, ...techs];

    return (
        <section className={`py-20 overflow-hidden border-y transition-colors duration-500 ${isDark ? 'bg-[#0D0D0F] border-white/5' : 'bg-gray-50 border-black/5'}`}>
            <div className="max-w-7xl mx-auto px-6 mb-12 text-center lg:text-left">
                <h2 className="text-[10px] uppercase tracking-[0.5em] text-purple-500 font-bold mb-4">
                    02 — The Arsenal
                </h2>
                <p className={`text-2xl font-light ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Powered by the cutting edge.</p>
            </div>

            <div className="relative flex overflow-hidden">
                {/* The Scrolling Container */}
                <div className="flex whitespace-nowrap animate-scroll py-4">
                    {scrollItems.map((tech, index) => (
                        <div
                            key={index}
                            className={`flex items-center gap-4 px-12 py-6 mx-4 backdrop-blur-md border rounded-xl transition-all duration-500 group ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20' : 'bg-black/5 border-black/10 hover:bg-black/10 hover:border-black/20'}`}
                        >
                            <span className={`text-4xl transition-colors duration-500 ${isDark ? 'text-gray-600' : 'text-gray-400'} ${tech.color}`}>
                                {tech.icon}
                            </span>
                            <span className={`text-xl font-medium tracking-tight transition-colors duration-500 ${isDark ? 'text-gray-500 group-hover:text-white' : 'text-gray-600 group-hover:text-black'}`}>
                                {tech.name}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Gradient Fades for the edges to make it look "Cinematic" */}
                <div className={`absolute inset-y-0 left-0 w-32 bg-gradient-to-r to-transparent z-10 ${isDark ? 'from-[#0D0D0F]' : 'from-gray-50'}`} />
                <div className={`absolute inset-y-0 right-0 w-32 bg-gradient-to-l to-transparent z-10 ${isDark ? 'from-[#0D0D0F]' : 'from-gray-50'}`} />
            </div>
        </section>
    );
};

export default Tech;