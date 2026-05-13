import React, { useState, useEffect } from 'react';
import LogoAnimation from '../ui/LogoAnimation';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // We want to reach 100% in about 3.5 seconds
    const totalDuration = 3500;
    const intervalTime = 35; // update every 35ms
    const totalSteps = totalDuration / intervalTime; // 100 steps
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(Math.floor((currentStep / totalSteps) * 100), 100);
      setProgress(newProgress);

      if (currentStep >= totalSteps) {
        clearInterval(timer);
        setIsFadingOut(true);
        // Wait for CSS transition to finish before completing
        setTimeout(() => {
          onComplete();
        }, 800);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <main className={`fixed inset-0 w-full flex flex-col items-center justify-center bg-[#faf9f9] text-[#1a1c1c] px-5 md:px-16 overflow-hidden z-[9999] transition-opacity duration-700 ease-in-out ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>


      {/* Corner Technical Data Streams Removed as requested */}

      {/* Central Content */}
      <div className="flex flex-col items-center z-10">
        <div className="flex items-center gap-[15px] mb-12">
          <LogoAnimation className="w-24 h-16 flex-shrink-0" color="#000000" />
          <span className="font-['Syne'] text-[36px] md:text-[56px] font-bold tracking-[-0.02em] text-black whitespace-nowrap leading-none">
            VTRC
          </span>
        </div>
        <div className="font-['Syne'] text-[60px] md:text-[100px] leading-none tracking-tighter font-extrabold text-black select-none mb-6">
          {progress}<span className="text-[#5d5f5f] opacity-50">%</span>
        </div>
      </div>

      {/* Geometric Accents */}
      <div className="absolute inset-0 pointer-events-none border-[12px] border-black/5 m-4"></div>
      <div className="absolute top-1/2 left-0 w-8 h-[2px] bg-black opacity-20"></div>
      <div className="absolute top-1/2 right-0 w-8 h-[2px] bg-black opacity-20"></div>

      {/* Background Image Texture Overlay */}
      <div className="absolute inset-0 opacity-5 mix-blend-overlay pointer-events-none">
        <img
          className="w-full h-full object-cover grayscale"
          alt="Texture"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCG0GtjSKU2xeXSNixQchXi0l-GvgAG7WnPeqWtI7160_VCrnZtnJdvrr4THA-WSe9jVVZWC7bPz2ctyVUAsfXOh3hYjqYMxFdihdcp2MOIUCakOKbglg9uYoPOBYg3NLdjNOgr-sJsQTn0w9JSElMDuAzwEc3lInqUktAvQYdyadPZwrPMw0J62-0r434cHeVOBbx112wSvKZxYl0EncDLPkwAcP_PVqqeeCtJ4oDbSkhnrwwC7mNfNxPcXqEdFbHBWkLPaLlMYw"
        />
      </div>

      {/* Footer Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full z-10">
        {/* Progress Bar Rail */}
        <div className="h-2 w-full bg-[#eeeeee]">
          {/* Progress Bar Fill */}
          <div
            className="h-full bg-black transition-all duration-[35ms] ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Copyright & Meta */}
        <div className="flex justify-center items-center px-5 md:px-16 py-6">
          <span className="font-['JetBrains_Mono'] text-[12px] uppercase tracking-widest text-[#5d5f5f] font-medium text-center">
            © 2026 VTRC TECHNOLOGIES
          </span>
        </div>
      </div>

    </main>
  );
};

export default LoadingScreen;
