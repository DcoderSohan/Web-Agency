import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiArrowRight,
  FiActivity,
  FiServer,
  FiShield,
  FiCloud,
  FiZap,
  FiCheckCircle,
} from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

/* ─────────────────────────────────────────────
   DOT GRID (right-side decoration like Amply)
───────────────────────────────────────────── */
const DotGrid = () => {
  const dots = [];
  for (let r = 0; r < 12; r++) {
    for (let c = 0; c < 10; c++) {
      const opacity = Math.random() > 0.45 ? Math.random() * 0.5 + 0.15 : 0.05;
      dots.push({ r, c, opacity, big: Math.random() > 0.88 });
    }
  }
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {dots.map((d, i) => (
        <div
          key={i}
          className={`absolute rounded-full ${d.big ? "w-[5px] h-[5px]" : "w-[3px] h-[3px]"}`}
          style={{
            left: `${d.c * 10 + 2}%`,
            top: `${d.r * 8 + 3}%`,
            background: d.big ? "#93C5FD" : "#3B82F6",
            opacity: d.opacity,
          }}
        />
      ))}
    </div>
  );
};

/* ─────────────────────────────────────────────
   FLOATING PILL BADGE  (like Amply's labels)
───────────────────────────────────────────── */
const FloatingPill = ({ icon, label, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    className={`absolute flex items-center gap-2 px-4 py-2 rounded-full border border-[#3B82F6]/30
      bg-[#1E2933]/90 backdrop-blur-md text-[11px] font-bold tracking-wide text-[#93C5FD]
      shadow-lg shadow-black/40 z-20 ${className}`}
  >
    <span className="text-[#3B82F6]">{icon}</span>
    {label}
  </motion.div>
);

/* ─────────────────────────────────────────────
   MAIN DASHBOARD CARD  (the big one)
───────────────────────────────────────────── */
const DashboardCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.97 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay: 0.7, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    className="relative w-full rounded-2xl overflow-hidden border border-[#3B82F6]/20
      bg-[#0F1720] shadow-2xl shadow-black/60"
    style={{ aspectRatio: "16/10" }}
  >
    {/* Card top bar */}
    <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[#3B82F6]/10 bg-[#1E2933]/60">
      <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]/50" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#93C5FD]/30" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]/20" />
      <span className="ml-3 text-[10px] font-semibold t-text-subtle tracking-widest uppercase">
        VTRC — Live Infrastructure Dashboard
      </span>
    </div>

    {/* Dashboard body */}
    <div className="p-4 grid grid-cols-3 gap-3 h-[calc(100%-40px)]">
      {/* Metric cards row */}
      {[
        {
          label: "Uptime",
          value: "99.98%",
          icon: <FiActivity size={13} />,
          up: true,
        },
        {
          label: "Nodes",
          value: "142",
          icon: <FiServer size={13} />,
          up: true,
        },
        {
          label: "Threats",
          value: "0",
          icon: <FiShield size={13} />,
          up: false,
        },
      ].map((m) => (
        <div
          key={m.label}
          className="rounded-xl border border-[#3B82F6]/10 bg-[#1E2933]/70 p-3 flex flex-col gap-1"
        >
          <div className="flex items-center justify-between">
            <span className="text-[9px] uppercase tracking-widest font-bold t-text-subtle">
              {m.label}
            </span>
            <span className="text-[#3B82F6]">{m.icon}</span>
          </div>
          <span className="text-lg font-extrabold t-text leading-none">
            {m.value}
          </span>
          <div className="flex items-center gap-1 mt-0.5">
            <FiCheckCircle
              size={9}
              className={m.up ? "text-emerald-400" : "text-[#3B82F6]"}
            />
            <span className="text-[8px] t-text-subtle font-semibold">
              {m.up ? "Nominal" : "Clear"}
            </span>
          </div>
        </div>
      ))}

      {/* Chart area */}
      <div className="col-span-2 rounded-xl border border-[#3B82F6]/10 bg-[#1E2933]/50 p-3 flex flex-col gap-2">
        <span className="text-[9px] uppercase tracking-widest font-bold t-text-subtle">
          Network Throughput — 24h
        </span>
        {/* Fake bar chart */}
        <div className="flex-1 flex items-end gap-1 pb-1">
          {[
            35, 55, 40, 70, 60, 85, 50, 90, 65, 80, 72, 95, 60, 88, 75, 92, 68,
            100, 82, 95, 70, 85, 78, 90,
          ].map((h, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{
                delay: 1.2 + i * 0.03,
                duration: 0.5,
                ease: "easeOut",
              }}
              className="flex-1 rounded-t-sm"
              style={{
                height: `${h}%`,
                background:
                  i > 18
                    ? "linear-gradient(to top, #3B82F6, #93C5FD)"
                    : "rgba(59,130,246,0.25)",
                transformOrigin: "bottom",
              }}
            />
          ))}
        </div>
      </div>

      {/* Status list */}
      <div className="col-span-1 rounded-xl border border-[#3B82F6]/10 bg-[#1E2933]/50 p-3 flex flex-col gap-2 overflow-hidden">
        <span className="text-[9px] uppercase tracking-widest font-bold t-text-subtle">
          Services
        </span>
        {["API Gateway", "Auth Service", "DB Cluster", "CDN Edge"].map(
          (s, i) => (
            <div key={s} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
              <span className="text-[9px] t-text-muted font-medium truncate">
                {s}
              </span>
            </div>
          ),
        )}
      </div>
    </div>
  </motion.div>
);

/* ─────────────────────────────────────────────
   SMALL FLOATING CARD — Cloud
───────────────────────────────────────────── */
const CloudCard = () => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 1.1, duration: 0.7 }}
    className="absolute -bottom-6 -left-10 w-52 rounded-xl border border-[#3B82F6]/25
      bg-[#0F1720]/95 backdrop-blur-md p-4 shadow-xl shadow-black/50 z-20"
  >
    <div className="flex items-center gap-2 mb-3">
      <div className="w-7 h-7 rounded-lg bg-[#3B82F6]/15 flex items-center justify-center">
        <FiCloud size={13} className="text-[#3B82F6]" />
      </div>
      <span className="text-[10px] font-bold text-white tracking-wide">
        Cloud Deploy
      </span>
    </div>
    <div className="space-y-1.5">
      {[
        { label: "Instances", val: "48" },
        { label: "Regions", val: "12" },
        { label: "Latency", val: "8ms" },
      ].map((r) => (
        <div key={r.label} className="flex justify-between">
          <span className="text-[9px] text-[#93C5FD]/45 font-medium">
            {r.label}
          </span>
          <span className="text-[9px] text-white font-bold">{r.val}</span>
        </div>
      ))}
    </div>
    {/* progress bar */}
    <div className="mt-3 h-1 rounded-full bg-[#1E2933]">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "78%" }}
        transition={{ delay: 1.6, duration: 1, ease: "easeOut" }}
        className="h-full rounded-full bg-gradient-to-r from-[#3B82F6] to-[#93C5FD]"
      />
    </div>
    <span className="text-[8px] text-[#93C5FD]/35 mt-1 block">
      78% capacity utilized
    </span>
  </motion.div>
);

/* ─────────────────────────────────────────────
   SMALL FLOATING CARD — Alerts
───────────────────────────────────────────── */
const AlertCard = () => (
  <motion.div
    initial={{ opacity: 0, x: -15 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 1.3, duration: 0.7 }}
    className="absolute -top-5 -right-6 w-48 rounded-xl border border-[#3B82F6]/20
      bg-[#0F1720]/95 backdrop-blur-md p-3 shadow-xl shadow-black/50 z-20"
  >
    <div className="flex items-center gap-2 mb-2">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
      </span>
      <span className="text-[9px] font-bold text-white tracking-wider uppercase">
        All Systems Go
      </span>
    </div>
    <div className="space-y-1">
      {[
        "Zero active incidents",
        "24/7 monitoring live",
        "Auto-scale enabled",
      ].map((t) => (
        <div key={t} className="flex items-center gap-1.5">
          <FiCheckCircle size={8} className="text-emerald-400 flex-shrink-0" />
          <span className="text-[8px] text-[#93C5FD]/50">{t}</span>
        </div>
      ))}
    </div>
  </motion.div>
);

/* ─────────────────────────────────────────────
   STAGGER VARIANTS
───────────────────────────────────────────── */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
const Hero = () => {
  const { isDark } = useTheme();

  return (
    <section
      id="hero"
      className="t-section relative min-h-screen w-full overflow-hidden flex items-center"
    >
      {/* ── AMBIENT GLOW ─────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          animate={{ opacity: [0.12, 0.22, 0.12], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[10%] w-[600px] h-[600px] rounded-full bg-[#3B82F6]/15 blur-[160px]"
        />
        <motion.div
          animate={{ opacity: [0.05, 0.1, 0.05], scale: [1.1, 1, 1.1] }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
          className="absolute bottom-0 left-[5%] w-[400px] h-[400px] rounded-full bg-[#93C5FD]/05 blur-[120px]"
        />
        {/* Top divider accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/30 to-transparent" />
      </div>

      {/* ── GRID LINES (full width) ──────── */}
      <div className="absolute inset-0 vtrc-grid z-0 pointer-events-none" />

      {/* ── TWO-COLUMN LAYOUT ────────────── */}
      <div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pt-32 pb-20
        grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
      >
        {/* ════════════════════════════════
            LEFT — TEXT CONTENT
        ════════════════════════════════ */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col"
        >
          {/* Category label (Amply style) */}
          <motion.div variants={item} className="mb-6">
            <span className="text-[11px] font-black uppercase tracking-[0.35em] text-[#3B82F6]">
              VTRC Technologies
            </span>
          </motion.div>

          {/* BIG HEADLINE */}
          <motion.h1
            variants={item}
            className="text-[clamp(2.8rem,7.5vw,6rem)] font-extrabold leading-[1.0] tracking-[-0.035em] t-text mb-6"
          >
            Innovate.
            <br />
            <span
              style={{
                background:
                  "linear-gradient(120deg,#3B82F6 0%,#93C5FD 60%,#E2E8F0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Integrate.
            </span>
            <br />
            Elevate.
          </motion.h1>

          {/* DESCRIPTION */}
          <motion.p
            variants={item}
            className="t-text-muted text-base md:text-[17px] font-light leading-relaxed max-w-[420px] mb-10"
          >
            VTRC Technologies delivers intelligent, scalable, and future-ready
            solutions — empowering businesses to connect, operate, and grow at
            speed.
          </motion.p>

          {/* CTA BUTTONS (Amply style — pill primary, ghost secondary) */}
          <motion.div
            variants={item}
            className="flex flex-wrap items-center gap-4 mb-14"
          >
            <a
              id="hero-cta-primary"
              href="#about"
              className="group relative flex items-center gap-2.5 px-7 py-3.5 rounded-full
                text-[12px] font-bold uppercase tracking-[0.16em] text-white
                bg-[#3B82F6] hover:bg-[#2563EB] transition-all duration-300
                shadow-lg shadow-[#3B82F6]/30 hover:shadow-[#3B82F6]/50 overflow-hidden"
            >
              <span
                className="absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%]
                transition-transform duration-700
                bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12"
              />
              <span className="relative">Discover More</span>
              <FiArrowUpRight
                size={14}
                className="relative group-hover:rotate-45 transition-transform duration-300"
              />
            </a>

            <a
              id="hero-cta-secondary"
              href="#services"
              className="group flex items-center gap-2.5 px-2 py-2 text-[12px] font-bold
                uppercase tracking-[0.16em] t-text-muted hover:t-text transition-colors duration-300"
            >
              View Services
              <span className="block w-5 h-px bg-current group-hover:w-8 transition-all duration-300" />
            </a>
          </motion.div>

          {/* TRUST ROW — small logos/labels */}
          <motion.div variants={item} className="flex flex-col gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] t-text-faint">
              Trusted by industry leaders
            </span>
            <div className="flex flex-wrap gap-5">
              {[
                "FinTech",
                "HealthTech",
                "CleanTech",
                "Gov&Defence",
                "Logistics",
              ].map((sector) => (
                <span
                  key={sector}
                  className="text-[10px] font-semibold uppercase tracking-widest t-text-subtle hover:text-[#3B82F6] transition-colors cursor-default"
                >
                  {sector}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ════════════════════════════════
            RIGHT — FLOATING CARDS VISUAL
        ════════════════════════════════ */}
        <div className="relative lg:pl-10 hidden lg:block">
          {/* DOT GRID — right quadrant only */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <DotGrid />
          </div>

          {/* MAIN DASHBOARD CARD */}
          <div className="relative">
            <DashboardCard />

            {/* FLOATING PILL — top */}
            <FloatingPill
              icon={<FiZap size={11} />}
              label="Real-time Analytics"
              delay={1.5}
              className="-top-4 left-6"
            />

            {/* FLOATING PILL — mid-right */}
            <FloatingPill
              icon={<FiCloud size={11} />}
              label="Multi-cloud Infrastructure"
              delay={1.7}
              className="top-1/3 -right-6"
            />

            {/* CLOUD STATS CARD — bottom-left */}
            <CloudCard />

            {/* ALERT CARD — top-right */}
            <AlertCard />
          </div>

          {/* AMBIENT GLOW behind cards */}
          <div className="absolute inset-0 -z-10 rounded-3xl bg-[#3B82F6]/04 blur-2xl scale-110" />
        </div>
      </div>

      {/* ── SCROLL LINE ──────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-16 bg-gradient-to-b from-transparent via-[#3B82F6]/50 to-transparent"
        />
        <span className="text-[8px] font-bold uppercase tracking-[0.35em] text-[#3B82F6]/35 rotate-90 origin-center mt-2">
          Scroll
        </span>
      </motion.div>

      {/* ── STAT STRIP (bottom) ───────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-0 left-0 right-0 z-10
          border-t border-[#3B82F6]/10 bg-[#0B1219]/80 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#3B82F6]/08">
            {[
              { val: "150+", label: "Projects Delivered" },
              { val: "98%", label: "Client Satisfaction" },
              { val: "5+", label: "Years of Excellence" },
              { val: "24/7", label: "Expert Support" },
            ].map((s) => (
              <div
                key={s.label}
                className="py-5 px-6 flex items-center gap-4 group cursor-default"
              >
                <span
                  className="text-2xl font-extrabold"
                  style={{
                    background: "linear-gradient(135deg,#3B82F6,#93C5FD)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {s.val}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#93C5FD]/40 group-hover:text-[#93C5FD]/70 transition-colors leading-tight">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
