import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const reviews = [
  {
    company: "NEXORA CORP",
    sector: "FinTech",
    quote:
      "VTRC Technologies transformed our legacy banking infrastructure into a real-time, cloud-native platform. The results exceeded every benchmark we had set.",
    person: "Chief Technology Officer",
    year: "2025",
  },
  {
    company: "ASTRA HEALTH",
    sector: "HealthTech",
    quote:
      "The HIPAA-compliant data platform VTRC built for us processes over 2 million records daily with zero downtime. Truly future-ready engineering.",
    person: "Head of Engineering",
    year: "2025",
  },
  {
    company: "MERIDIAN LOGISTICS",
    sector: "Supply Chain",
    quote:
      "Our route optimization AI reduced delivery costs by 34% in the first quarter. VTRC's team is exceptionally reliable and deeply skilled.",
    person: "Operations Director",
    year: "2026",
  },
  {
    company: "SOLARIS ENERGY",
    sector: "CleanTech",
    quote:
      "The IoT monitoring dashboard VTRC built gives us real-time visibility across 200+ sites. A seamless blend of elegant design and robust engineering.",
    person: "VP of Digital Products",
    year: "2026",
  },
];

const Clients = () => {
  const { isDark } = useTheme();
  const [expandedIndex, setExpandedIndex] = useState(0);

  return (
    <section
      id="about-clients"
      className="t-section-alt py-32 px-4 overflow-hidden border-t border-[#3B82F6]/08"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-8 h-[1px] bg-[#3B82F6] rounded-full" />
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#3B82F6]">
              04 — Client Stories
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight t-text"
          >
            Trusted by Industry{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #3B82F6, #93C5FD)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Leaders.
            </span>
          </motion.h2>
        </div>

        {/* FILMSTRIP TESTIMONIALS */}
        <div className="flex flex-col md:flex-row h-auto md:h-[480px] gap-3">
          {reviews.map((item, i) => (
            <motion.div
              key={i}
              onMouseEnter={() => setExpandedIndex(i)}
              animate={{ flex: expandedIndex === i ? 4 : 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden group cursor-pointer rounded-2xl border p-8
                                flex flex-col justify-between t-card hover:border-[#3B82F6]/30 transition-colors duration-400"
              id={`testimonial-${i}`}
            >
              {/* Glow on active */}
              <div
                className={`absolute inset-0 bg-gradient-to-br from-[#3B82F6]/06 to-transparent
                                transition-opacity duration-500 ${expandedIndex === i ? "opacity-100" : "opacity-0"}`}
              />

              {/* Top: company + sector + year */}
              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <motion.h4
                    animate={{
                      rotate: expandedIndex === i ? 0 : -90,
                      x: expandedIndex === i ? 0 : -10,
                      y: expandedIndex === i ? 0 : 50,
                    }}
                    className={`text-xl font-bold whitespace-nowrap origin-left transition-colors ${
                      expandedIndex === i ? "t-text" : "t-text-subtle"
                    }`}
                  >
                    {item.company}
                  </motion.h4>
                  {expandedIndex === i && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[10px] font-bold uppercase tracking-widest text-[#3B82F6] mt-1 block"
                    >
                      {item.sector}
                    </motion.span>
                  )}
                </div>
                <span className="text-[10px] font-mono t-text-subtle">
                  {item.year}
                </span>
              </div>

              {/* Quote */}
              <motion.div
                animate={{
                  opacity: expandedIndex === i ? 1 : 0,
                  y: expandedIndex === i ? 0 : 20,
                }}
                className="relative z-10 max-w-lg"
              >
                <div className="w-8 h-[1px] bg-[#3B82F6] mb-6" />
                <p className="text-lg md:text-xl leading-relaxed t-text-muted mb-8 font-light">
                  "{item.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-[1px] bg-[#3B82F6]/60" />
                  <span className="text-xs uppercase tracking-widest t-text-subtle">
                    {item.person}
                  </span>
                </div>
              </motion.div>

              {/* Collapsed indicator */}
              {expandedIndex !== i && (
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col gap-1">
                  <div className="w-1 h-1 bg-[#3B82F6]/30 rounded-full" />
                  <div className="w-1 h-1 bg-[#3B82F6]/30 rounded-full" />
                  <div className="w-1 h-1 bg-[#3B82F6]/30 rounded-full" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
