import React, { useState } from "react";
import { motion } from "framer-motion";

const VTRC_LETTERS = ["V", "T", "R", "C"];

/**
 * AnimatedLogo (Admin)
 * On hover: image slides up & fades out, "VTRC" letters rise letter-by-letter from below.
 * On mouse-leave: reverses smoothly.
 *
 * size: 'sm' | 'md' (default 'md')
 * inverted: true → white letters (for dark backgrounds)
 */
const AnimatedLogo = ({ size = "md", inverted = false }) => {
  const [hovered, setHovered] = useState(false);

  const imgSize =
    size === "sm" ? { width: 44, height: 28 } : { width: 60, height: 36 };
  const fontSize = size === "sm" ? 14 : 18;
  const letterColor = inverted ? "#fff" : "#000";

  return (
    <div
      style={{
        position: "relative",
        width: imgSize.width,
        height: imgSize.height,
        clipPath: "inset(0 -60px)",
        cursor: "pointer",
        flexShrink: 0,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* IMAGE — slides UP on hover */}
      <motion.img
        src="/VTRCLogo.png"
        alt="VTRC Logo"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
        animate={hovered ? { y: "-110%", opacity: 0 } : { y: "0%", opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* TEXT letters — rise from BELOW on hover */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        {VTRC_LETTERS.map((letter, i) => (
          <motion.span
            key={letter}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize,
              color: letterColor,
              lineHeight: 1,
              display: "block",
              letterSpacing: "0.05em",
            }}
            animate={hovered ? { y: 0, opacity: 1 } : { y: "130%", opacity: 0 }}
            transition={{
              duration: 0.32,
              ease: [0.4, 0, 0.2, 1],
              delay: hovered ? i * 0.055 : (VTRC_LETTERS.length - 1 - i) * 0.04,
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default AnimatedLogo;
