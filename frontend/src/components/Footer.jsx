import React from 'react';
import { Link } from 'react-router-dom';
import LogoAnimation from './LogoAnimation';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#faf9f9] border-t-2 border-black mt-24">
      {/* MAIN FOOTER ROW */}
      <div className="flex flex-col md:flex-row justify-between items-start w-full max-w-[1440px] mx-auto px-5 md:px-16 py-10 md:py-12 flex-wrap gap-12 box-border">

        {/* BRAND */}
        <div className="flex flex-col gap-4 max-w-[260px] m-0">
          <div className="flex items-center gap-3">
            <LogoAnimation className="w-10 h-7 flex-shrink-0" color="#000000" />
            <span className="font-['Syne'] text-[32px] font-bold tracking-[-0.02em] text-black">
              VTRC
            </span>
          </div>
          <p className="font-['JetBrains_Mono'] text-[12px] font-medium text-[#5d5f5f] uppercase leading-[1.6]">
            VTRC TECHNOLOGIES: Engineering the infrastructure of the next century.
          </p>
        </div>

        {/* LINK COLUMNS */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 w-full md:w-auto">

          {/* Navigation */}
          <div className="flex flex-col gap-2">
            <span className="font-['JetBrains_Mono'] text-[12px] font-bold uppercase text-[#1a1c1c] mb-2 tracking-[0.08em]">
              Navigation
            </span>
            <Link to="/work" className="font-['JetBrains_Mono'] text-[12px] text-[#5d5f5f] underline transition-colors duration-200 hover:text-black">Work</Link>
            <Link to="/services" className="font-['JetBrains_Mono'] text-[12px] text-[#5d5f5f] underline transition-colors duration-200 hover:text-black">Services</Link>
            <Link to="/careers" className="font-['JetBrains_Mono'] text-[12px] text-[#5d5f5f] underline transition-colors duration-200 hover:text-black">Careers</Link>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-2">
            <span className="font-['JetBrains_Mono'] text-[12px] font-bold uppercase text-[#1a1c1c] mb-2 tracking-[0.08em]">
              Legal
            </span>
            <Link to="/privacy" className="font-['JetBrains_Mono'] text-[12px] text-[#5d5f5f] underline transition-colors duration-200 hover:text-black">Privacy</Link>
            <Link to="/terms" className="font-['JetBrains_Mono'] text-[12px] text-[#5d5f5f] underline transition-colors duration-200 hover:text-black">Terms</Link>
            <Link to="/contact-us" className="font-['JetBrains_Mono'] text-[12px] text-[#5d5f5f] underline transition-colors duration-200 hover:text-black">Contact</Link>
          </div>

          {/* Network */}
          <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
            <span className="font-['JetBrains_Mono'] text-[12px] font-bold uppercase text-[#1a1c1c] mb-2 tracking-[0.08em]">
              Network
            </span>
            <a href="https://twitter.com/vtrc_tech" target="_blank" rel="noopener noreferrer" className="font-['JetBrains_Mono'] text-[12px] text-[#5d5f5f] underline transition-colors duration-200 hover:text-black">X / Twitter</a>
            <a href="https://github.com/vtrc-tech" target="_blank" rel="noopener noreferrer" className="font-['JetBrains_Mono'] text-[12px] text-[#5d5f5f] underline transition-colors duration-200 hover:text-black">GitHub</a>
          </div>

        </div>
      </div>

      {/* COPYRIGHT ROW */}
      <div className="w-full border-t border-black/20 max-w-[1440px] mx-auto px-5 md:px-16 py-6 flex flex-col md:flex-row justify-between flex-wrap gap-2 opacity-80 box-border">
        <span className="font-['JetBrains_Mono'] text-[12px] text-[#1a1c1c]">
          © {currentYear} VTRC TECHNOLOGIES. ALL RIGHTS RESERVED.
        </span>
        <span className="font-['JetBrains_Mono'] text-[12px] text-[#1a1c1c]">
          37.7749° N, 122.4194° W
        </span>
      </div>
    </footer>
  );
};

export default Footer;