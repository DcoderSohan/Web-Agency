import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Services = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-[#faf9f9] text-[#1a1c1c] min-h-screen">
      {/* Container wrapper for centering */}
      <div className="w-full max-w-[1440px] mx-auto px-5 md:px-16 pt-12 md:pt-24 pb-24">

        {/* ── HERO SECTION ── */}
        <header className="mb-24">
          <p className="font-['JetBrains_Mono'] text-[12px] font-medium text-[#5d5f5f] uppercase mb-4 tracking-[0.2em]">
            [ OUR CAPABILITIES ]
          </p>
          <h1 className="font-['Syne'] text-[clamp(40px,8vw,120px)] leading-[0.9] tracking-[-0.04em] font-extrabold uppercase max-w-4xl break-words mb-12 text-black m-0">
            WEBSITES BUILT FOR <span className="italic text-transparent" style={{ WebkitTextStroke: '2px black' }}>GROWTH</span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 border-2 border-black p-6 md:p-8 bg-[#f4f3f3]">
              <p className="font-['Geist'] text-[18px] leading-[1.6] text-black max-w-2xl m-0">
                We design and develop custom websites, web apps, and digital platforms that look sharp, load fast, and help your business win better customers.
              </p>
            </div>
            <div className="md:col-span-4 border-2 border-black p-6 md:p-8 flex items-center justify-center bg-black text-white">
              <span className="material-symbols-outlined text-[64px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                architecture
              </span>
            </div>
          </div>
        </header>

        {/* ── Services Section 01 - DESIGN ── */}
        <section className="mb-32">
          <div className="flex flex-col md:flex-row gap-6 border border-black p-4">
            <div className="md:w-1/3 p-6 md:p-8 border-2 border-black bg-black text-white flex flex-col justify-between min-h-[400px]">
              <span className="font-['Syne'] text-[160px] leading-none opacity-20 font-extrabold m-0">01</span>
              <h2 className="font-['Syne'] text-[clamp(40px,5vw,64px)] leading-[1.1] font-bold uppercase m-0 text-white">DESIGN</h2>
            </div>
            <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <p className="font-['JetBrains_Mono'] text-[12px] font-medium uppercase mb-6 text-[#5d5f5f] tracking-widest">Visual Architecture / UI & UX / Systems</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <h3 className="font-['Syne'] text-[24px] md:text-[32px] font-bold uppercase text-black m-0">SYSTEMIC CLARITY</h3>
                    <p className="text-[#5d5f5f] font-['Geist'] text-[16px] leading-[1.6] m-0">We design frameworks, not just screens. Every element is governed by a rigorous set of logic that ensures scalability and brand coherence across all touchpoints.</p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-['Syne'] text-[24px] md:text-[32px] font-bold uppercase text-black m-0">TECHNICAL BEAUTY</h3>
                    <p className="text-[#5d5f5f] font-['Geist'] text-[16px] leading-[1.6] m-0">Minimalist aesthetics meet complex functionality. We strip away the noise to reveal the core utility of your product, creating interfaces that feel inevitable.</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="border border-black px-3 py-1 font-['JetBrains_Mono'] text-[12px] font-medium bg-[#eeeeee] text-black uppercase">Interaction Design</span>
                <span className="border border-black px-3 py-1 font-['JetBrains_Mono'] text-[12px] font-medium bg-[#eeeeee] text-black uppercase">Design Tokens</span>
                <span className="border border-black px-3 py-1 font-['JetBrains_Mono'] text-[12px] font-medium bg-[#eeeeee] text-black uppercase">Prototyping</span>
                <span className="border border-black px-3 py-1 font-['JetBrains_Mono'] text-[12px] font-medium bg-[#eeeeee] text-black uppercase">Brand Identity</span>
              </div>
            </div>
          </div>
          <div className="h-64 w-full border border-black mt-6 overflow-hidden">
            <img
              alt="Brutalist Design"
              className="w-full h-full object-cover grayscale contrast-125"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9ask3Pkgzkf1tk2OwJNypa9qMHImLhAXsfgg1I_LE61Aj6tihaf3fS_WRtt3X7x9qI-W_kjicKzitg9MMfv13cI_3j8LFig9kezOTdtzHd7nKTUOiyFA2l1XXgumPVF5iCpXcPU56QVVM861AFGAXfbKa-xu01wYxJp3zMMYPW8W36hUzo3Tarwnz1gM3Q0aHpComaIHQe90p2IwvqbECi_J_5Mn3sbizy1xs8gNbjeY0Lchb41F5hDC0tIyrQJQnp-8Ji90uKw"
            />
          </div>
        </section>

        {/* ── Services Section 02 - DEV ── */}
        <section className="mb-32">
          <div className="flex flex-col md:flex-row-reverse gap-6 border border-black p-4">
            <div className="md:w-1/3 p-6 md:p-8 border-2 border-black bg-black text-white flex flex-col justify-between min-h-[400px]">
              <span className="font-['Syne'] text-[160px] leading-none opacity-20 font-extrabold m-0">02</span>
              <h2 className="font-['Syne'] text-[clamp(40px,5vw,64px)] leading-[1.1] font-bold uppercase m-0 text-white">DEV</h2>
            </div>
            <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <p className="font-['JetBrains_Mono'] text-[12px] font-medium uppercase mb-6 text-[#5d5f5f] tracking-widest">Front-end / Back-end / Architecture</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <h3 className="font-['Syne'] text-[24px] md:text-[32px] font-bold uppercase text-black m-0">ENGINEERED STACK</h3>
                    <p className="text-[#5d5f5f] font-['Geist'] text-[16px] leading-[1.6] m-0">We build with performance as the primary metric. Our codebases are lean, secure, and built using industry-standard technologies that stand the test of time.</p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-['Syne'] text-[24px] md:text-[32px] font-bold uppercase text-black m-0">API FIRST</h3>
                    <p className="text-[#5d5f5f] font-['Geist'] text-[16px] leading-[1.6] m-0">Highly decoupled architectures that allow for seamless integration and future-proofing. We build the backbone of modern digital enterprises.</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="border border-black px-3 py-1 font-['JetBrains_Mono'] text-[12px] font-medium bg-[#eeeeee] text-black uppercase">Cloud Infrastructure</span>
                <span className="border border-black px-3 py-1 font-['JetBrains_Mono'] text-[12px] font-medium bg-[#eeeeee] text-black uppercase">Node.JS / React</span>
                <span className="border border-black px-3 py-1 font-['JetBrains_Mono'] text-[12px] font-medium bg-[#eeeeee] text-black uppercase">Backend Systems</span>
                <span className="border border-black px-3 py-1 font-['JetBrains_Mono'] text-[12px] font-medium bg-[#eeeeee] text-black uppercase">CI/CD Pipelines</span>
              </div>
            </div>
          </div>
          <div className="h-64 w-full border border-black mt-6 overflow-hidden">
            <img
              alt="Clean Code Concept"
              className="w-full h-full object-cover grayscale brightness-90"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdPfdGGERaxGry8-hpaWzTKMMB40sJfgEHrdhXlZIoNFrfZUDElLnBCd0q7X-vNY9_B_I4DAuvdlu_zuWH4t18GtbKBwAwyWlrZeDvbTrUoCxGJC___ut_TYmRwtzlxtlIjiAqbY7mkbfqety5Ra3QyB2iSOAe3_nDW9styObqQDg2HKjM78GwK1AzmwtmvfpfvO7JNrrLnl3ekjuO5BUtQXdqer4uVQSALvT2ViTUwMgBeX8TwEINjmWzN2jKdpIK71BL88cU_A"
            />
          </div>
        </section>

        {/* ── Services Section 03 - STRATEGY ── */}
        <section className="mb-32">
          <div className="flex flex-col md:flex-row gap-6 border border-black p-4">
            <div className="md:w-1/3 p-6 md:p-8 border-2 border-black bg-black text-white flex flex-col justify-between min-h-[400px]">
              <span className="font-['Syne'] text-[160px] leading-none opacity-20 font-extrabold m-0">03</span>
              <h2 className="font-['Syne'] text-[clamp(40px,5vw,64px)] leading-[1.1] font-bold uppercase m-0 text-white">STRATEGY</h2>
            </div>
            <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <p className="font-['JetBrains_Mono'] text-[12px] font-medium uppercase mb-6 text-[#5d5f5f] tracking-widest">Roadmapping / Product / Market Analysis</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <h3 className="font-['Syne'] text-[24px] md:text-[32px] font-bold uppercase text-black m-0">LEAN ALIGNMENT</h3>
                    <p className="text-[#5d5f5f] font-['Geist'] text-[16px] leading-[1.6] m-0">We bridge the gap between business objectives and technical feasibility. Our strategy is data-driven and focused on long-term sustainability.</p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-['Syne'] text-[24px] md:text-[32px] font-bold uppercase text-black m-0">MARKET RIGOR</h3>
                    <p className="text-[#5d5f5f] font-['Geist'] text-[16px] leading-[1.6] m-0">Analyzing trends to build what stays, not what passes. We provide the roadmap for navigating the volatile landscape of modern tech.</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="border border-black px-3 py-1 font-['JetBrains_Mono'] text-[12px] font-medium bg-[#eeeeee] text-black uppercase">Technical Audits</span>
                <span className="border border-black px-3 py-1 font-['JetBrains_Mono'] text-[12px] font-medium bg-[#eeeeee] text-black uppercase">Product Vision</span>
                <span className="border border-black px-3 py-1 font-['JetBrains_Mono'] text-[12px] font-medium bg-[#eeeeee] text-black uppercase">Growth Logic</span>
                <span className="border border-black px-3 py-1 font-['JetBrains_Mono'] text-[12px] font-medium bg-[#eeeeee] text-black uppercase">Risk Mitigation</span>
              </div>
            </div>
          </div>
          <div className="h-64 w-full border border-black mt-6 overflow-hidden">
            <img
              alt="Business Strategy"
              className="w-full h-full object-cover grayscale contrast-150"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwDg2ImQ6DWaBQrm4FDpE0tS04ypTvpAkkW5ak_l--RQGOdJXocCPP8iyPBhQGsSFuNtZgdztVGmxTDbAc85jzYBl-Gmc0ELyX-xej5bwxT5-HzC3Nk_2WuJIqajzS046B2gWkbw1nOPxoTAd5BSRvU5yLhf2sPzzRqCG5memp8oPe-XY3aPloLWXot6AzfaGo27sy1GIRyzHeY8Ie9phhninVxl5pMA8j1Vd0s7ABnUKhU3UI8QRUnIRjXWus1BHxRYXpwZPzNA"
            />
          </div>
        </section>

        {/* ── CTA SECTION ── */}
        <section className="border-2 border-black bg-black text-white p-12 md:p-20 text-center flex flex-col items-center">
          <h2 className="font-['Syne'] text-[clamp(32px,5vw,64px)] leading-none font-bold uppercase mb-8 text-white m-0">
            Ready to Build?
          </h2>
          <p className="max-w-2xl w-full font-['Geist'] text-[18px] leading-[1.6] text-[#858383] mb-12 m-0">
            Share your idea, goals, or current website problem. We will help turn it into a clear plan and a polished web experience.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center w-full md:w-auto">
            <Link to="/contact-us" className="bg-white text-black px-12 py-5 font-['JetBrains_Mono'] text-[12px] font-bold uppercase border-2 border-transparent hover:bg-transparent hover:text-white hover:border-white transition-all duration-300 tracking-widest w-full md:w-auto cursor-pointer">
              Contact Us
            </Link>
            <Link to="/work" className="bg-transparent text-white px-12 py-5 font-['JetBrains_Mono'] text-[12px] font-bold uppercase border-2 border-white hover:bg-white hover:text-black transition-all duration-300 tracking-widest w-full md:w-auto cursor-pointer">
              See Our Work
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
};

export default Services;
