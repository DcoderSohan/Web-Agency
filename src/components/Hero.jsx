import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import LogoAnimation from "./LogoAnimation";
import HeroAnimation from "./HeroAnimation";

const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center bg-[#050505] overflow-hidden">

      {/* ── SOPHISTICATED BACKGROUND ── */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 0.4, scale: 1.05 }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="relative w-full h-full flex items-center justify-center"
        >
          <LogoAnimation className="w-[70vw] h-auto opacity-100" isBackground={true} />
          
          {/* Subtle radial mask to keep focus on center text */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_85%)]" />
          <div className="absolute inset-0 bg-[#050505]/10" />
        </motion.div>
      </div>

      {/* ── CENTERED MINIMAL CONTENT ── */}
      <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center text-center">

        {/* 1. Subtle Badge */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[#3B82F6] text-[10px] font-black uppercase tracking-[0.5em] mb-2"
        >
          VTRC Technologies
        </motion.span>

        {/* 2. Main Animation (The focus) */}
        <div className="mb-2">
          <HeroAnimation />
        </div>

        {/* 3. Concise Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-white/40 text-base md:text-lg font-light tracking-wide max-w-lg leading-relaxed"
        >
          High-performance engineering for the modern web.
          We build digital infrastructure that scales.
        </motion.p>

        {/* 4. Refined Primary Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-8"
        >
          <a
            href="#contact"
            className="group flex items-center gap-3 text-white text-[11px] font-black uppercase tracking-[0.3em] hover:text-[#3B82F6] transition-colors"
          >
            Start a Project
            <FiArrowRight className="text-lg group-hover:translate-x-2 transition-transform" />
          </a>

          {/* Minimalist underline animation */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 1.2, duration: 1 }}
            className="h-[1px] bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent mt-2 opacity-50"
          />
        </motion.div>
      </div>

      {/* ── CORNER UTILITY (Optional, very faint) ── */}
      <div className="absolute bottom-10 px-10 w-full flex justify-between items-center text-[9px] text-white/10 font-bold uppercase tracking-[0.2em]">
        <span>© 2026 VTRC</span>
        <div className="flex gap-6">
          <span className="hover:text-white/40 cursor-pointer">Github</span>
          <span className="hover:text-white/40 cursor-pointer">LinkedIn</span>
        </div>
      </div>

    </section>
  );
};

export default Hero;