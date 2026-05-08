import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import LogoAnimation from "./LogoAnimation";

const Hero = () => {
  const services = ["Website Development", "Enterprise Solutions", "Marketing & SEO"];

  return (
    <section className="relative h-screen w-full flex items-center justify-start bg-[#050505] overflow-hidden px-6 md:px-20">

      {/* ── BACKGROUND WATERMARK ── */}
      <div className="absolute inset-0 z-0 flex items-center justify-end overflow-hidden pointer-events-none translate-x-[15%]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.2, scale: 1.1 }}
          transition={{ duration: 5, ease: "easeOut" }}
          className="relative w-full h-full flex items-center justify-center"
        >
          <LogoAnimation className="w-[140vw] md:w-[90vw] h-auto opacity-100" isBackground={true} />

          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#050505] w-1/2 left-0" />
        </motion.div>
      </div>

      {/* ── LEFT ALIGNED CONTENT ── */}
      <div className="relative z-10 w-full max-w-6xl mt-20">

        {/* BRAND NAME */}
        <div className="flex flex-col mb-8">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(4rem,15vw,16rem)] font-black text-white leading-[0.8] tracking-tighter"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            VTRC
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            transition={{ delay: 0.5, duration: 1.2 }}
            className="flex items-center gap-6 mt-4"
          >
            <div className="h-[2px] bg-white flex-1 max-w-[100px]" />
            <span 
              className="text-white text-[clamp(0.8rem,2vw,1.2rem)] font-black uppercase tracking-[0.8em] whitespace-nowrap opacity-80"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              Technologies
            </span>
          </motion.div>
        </div>

        {/* SUBTEXT & CTA */}
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-white text-lg md:text-2xl font-light leading-relaxed mb-12"
          >
            <span className="inline-block min-w-[300px]">
              <ScrambleText words={["Web Development", "Enterprise Solutions", "UI UX Design", "Cloud Infrastructure"]} />
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <a
              href="#contact"
              className="relative group inline-flex items-center gap-6 px-10 py-5 bg-white text-black rounded-full font-black uppercase tracking-[0.2em] text-[10px] overflow-hidden transition-all duration-500 hover:pr-14"
              style={{ fontFamily: 'var(--font-accent)' }}
            >
              <span className="relative z-10">Start a Project</span>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:right-8">
                <FiArrowRight className="text-lg" />
              </div>

              {/* Animated Background Sweep */}
              <div className="absolute inset-0 w-0 bg-white/20 transition-all duration-500 group-hover:w-full" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ServiceTicker = ({ service, index, isLast }) => {
  const [itemIndex, setItemIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setItemIndex((prev) => (prev + 1) % service.items.length);
    }, 2500 + index * 500); // Staggered timing
    return () => clearInterval(timer);
  }, [index, service.items.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 + index * 0.2, duration: 0.8 }}
      className={`
        flex-1 flex flex-col items-center justify-center py-6 md:py-10 px-6
        ${!isLast ? 'md:border-r border-white/05' : ''}
        group hover:bg-white/05 transition-colors cursor-default
      `}
    >
      <span className="text-white/20 text-[9px] font-black uppercase tracking-[0.4em] mb-1">
        {service.label}
      </span>
      <div className="h-6 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={service.items[itemIndex]}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="text-white/80 text-[11px] md:text-xs font-black uppercase tracking-[0.2em]"
          >
            {service.items[itemIndex]}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const ScrambleText = ({ words }) => {
  const [index, setIndex] = React.useState(0);
  const [displayText, setDisplayText] = React.useState(words[0]);
  const chars = "!@#$%^&*()_+{}:<>?[]-=";
  const isFirstMount = React.useRef(true);

  React.useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      const timer = setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
      }, 3000);
      return () => clearTimeout(timer);
    }

    let iteration = 0;
    let interval = null;
    const targetWord = words[index];

    interval = setInterval(() => {
      setDisplayText(
        targetWord
          .split("")
          .map((letter, i) => {
            if (i < iteration) {
              return targetWord[i];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= targetWord.length) {
        clearInterval(interval);
        const timer = setTimeout(() => {
          setIndex((prev) => (prev + 1) % words.length);
        }, 3000);
        return () => clearTimeout(timer);
      }

      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [index, words]);

  return (
    <span className="text-gray-400 font-bold" style={{ fontFamily: '"Smooch Sans", sans-serif', fontSize: '1.2em' }}>
      {displayText}
    </span>
  );
};

export default Hero;