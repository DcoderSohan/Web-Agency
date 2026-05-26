import React, { useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';

const FunkifyCTA = () => {
    const buttonRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    // Magnetic effect logic
    const handleMouseMove = (e) => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        buttonRef.current.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (buttonRef.current) {
            buttonRef.current.style.transform = `translate(0px, 0px)`;
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-[9000]">
            {/* Tooltip */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                className="absolute -top-12 right-0 whitespace-nowrap bg-white text-black font-['JetBrains_Mono'] text-[12px] font-bold px-4 py-2 pointer-events-none"
            >
                Design Your Own Product
                <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white rotate-45"></div>
            </motion.div>

            {/* Glowing Backdrop */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-40 animate-pulse pointer-events-none"></div>

            {/* Magnetic Button */}
            <motion.div
                ref={buttonRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                className="relative transition-transform duration-100 ease-linear"
            >
                <Link 
                    to="/funkify"
                    className="flex items-center gap-2 bg-black/80 backdrop-blur-md border border-white/20 text-white px-6 py-4 rounded-full font-['Syne'] font-bold text-[16px] uppercase tracking-wide shadow-2xl hover:bg-black transition-colors"
                >
                    <span className="text-xl">✨</span>
                    Funkify It
                </Link>
            </motion.div>
        </div>
    );
};

export default FunkifyCTA;
