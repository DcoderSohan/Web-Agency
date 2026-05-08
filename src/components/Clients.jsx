import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const reviews = [
  {
    company: "NEXORA CORP",
    sector: "FinTech",
    quote: "VTRC Technologies transformed our legacy banking infrastructure into a real-time, cloud-native platform. The results exceeded every benchmark we had set.",
    person: "Chief Technology Officer",
    year: "2025",
    accent: "#3B82F6",
  },
  {
    company: "ASTRA HEALTH",
    sector: "HealthTech",
    quote: "The HIPAA-compliant data platform processes over 2 million records daily with zero downtime. Truly future-ready engineering.",
    person: "Head of Engineering",
    year: "2025",
    accent: "#60A5FA",
  },
  {
    company: "MERIDIAN LOG",
    sector: "Supply Chain",
    quote: "Our route optimization AI reduced delivery costs by 34% in the first quarter. VTRC's team is exceptionally reliable.",
    person: "Operations Director",
    year: "2026",
    accent: "#93C5FD",
  },
  {
    company: "SOLARIS",
    sector: "CleanTech",
    quote: "The IoT monitoring dashboard gives us real-time visibility across 200+ sites. A seamless blend of design and engineering.",
    person: "VP of Digital Products",
    year: "2026",
    accent: "#FFFFFF",
  },
];

// ─── Progress Dot: own component so hooks are called correctly ───
const ProgressDot = ({ index, total, progress }) => {
  const start = index / total;
  const mid   = (index + 0.5) / total;
  const end   = (index + 1) / total;

  const scale   = useTransform(progress, [start, mid, end], [0.5, 1.4, 0.5]);
  const opacity = useTransform(progress, [start, mid, end], [0.2, 1,   0.2]);

  return (
    <motion.div
      style={{ scale, opacity, willChange: "transform, opacity" }}
      className="w-1.5 h-1.5 rounded-full bg-white"
    />
  );
};

// ─── Perspective Card ───
const PerspectiveCard = ({ item, index, total, progress }) => {
  const start  = index / total;
  const center = (index + 0.5) / total;
  const end    = (index + 1) / total;

  const z        = useTransform(progress, [start, center, end], [-700, 0, 700]);
  const opacity  = useTransform(progress, [start, center, end], [0, 1, 0]);
  const scale    = useTransform(progress, [start, center, end], [0.8, 1, 1.2]);
  const rotateX  = useTransform(progress, [start, center, end], [25, 0, -25]);
  const visibility = useTransform(progress, (v) =>
    v > start - 0.15 && v < end + 0.15 ? "visible" : "hidden"
  );

  return (
    <motion.div
      style={{ z, opacity, scale, rotateX, visibility, transformStyle: "preserve-3d", willChange: "transform, opacity" }}
      className="absolute w-[90%] max-w-3xl bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 md:p-20 shadow-2xl overflow-hidden group"
    >
      {/* Accent glow */}
      <div
        className="absolute -top-40 -right-40 w-80 h-80 blur-[100px] opacity-10 group-hover:opacity-25 transition-opacity duration-700 pointer-events-none"
        style={{ backgroundColor: item.accent }}
      />

      <div className="relative z-10 flex flex-col gap-10">
        {/* Company header */}
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-3" style={{ fontFamily: "Orbitron, sans-serif" }}>
              {item.company}
            </h4>
            <div className="flex items-center gap-3">
              <span className="w-10 h-[1px] bg-white/20" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/40 italic">{item.sector}</span>
            </div>
          </div>
          <div className="text-6xl text-white/05 font-black italic select-none">"</div>
        </div>

        {/* Quote */}
        <p className="text-xl md:text-3xl leading-snug text-white/70 font-light italic tracking-tight">
          "{item.quote}"
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-white/05 pt-10">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-full bg-white/05 border border-white/10 flex items-center justify-center text-lg font-bold">
              {item.company.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-tight text-white mb-1" style={{ fontFamily: "Orbitron, sans-serif" }}>
                {item.person}
              </p>
              <p className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-medium">
                Year of Excellence • {item.year}
              </p>
            </div>
          </div>
          <div className="hidden md:flex gap-2">
            {["Verified", "Success", "Impact"].map((tag) => (
              <span key={tag} className="text-[8px] uppercase tracking-widest px-4 py-2 border border-white/05 rounded-full text-white/20">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Clients Section ───
const Clients = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Pre-compute kinetic text transforms at hook level (not inside JSX)
  const textX1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const textX2 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-black overflow-hidden border-t border-white/05">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">

        {/* Kinetic background typography */}
        <div className="absolute inset-0 flex flex-col justify-center pointer-events-none select-none opacity-[0.025]">
          <motion.p style={{ x: textX1, willChange: "transform" }} className="text-[18vw] font-black whitespace-nowrap leading-none">
            IMPACT • TRUST • IMPACT • TRUST
          </motion.p>
          <motion.p style={{ x: textX2, willChange: "transform" }} className="text-[18vw] font-black whitespace-nowrap leading-none">
            CLIENTS • VOICES • CLIENTS • VOICES
          </motion.p>
        </div>

        {/* Header */}
        <div className="absolute top-20 left-10 md:left-20 z-20">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-[10px] font-bold uppercase tracking-[0.8em] text-white/30 block mb-6"
          >
            Global Impact
          </motion.span>
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]" style={{ fontFamily: "Orbitron, sans-serif" }}>
            Trusted <br /> <span className="text-white/20">Voices.</span>
          </h2>
        </div>

        {/* 3D card field */}
        <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: "2000px" }}>
          {reviews.map((item, index) => (
            <PerspectiveCard
              key={index}
              item={item}
              index={index}
              total={reviews.length}
              progress={scrollYProgress}
            />
          ))}
        </div>

        {/* Progress dots — each dot is its own component to respect hooks rules */}
        <div className="absolute right-10 md:right-20 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-30">
          {reviews.map((_, i) => (
            <ProgressDot key={i} index={i} total={reviews.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
