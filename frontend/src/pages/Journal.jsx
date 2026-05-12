import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Journal = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-[#faf9f9] text-[#1a1c1c] min-h-screen overflow-x-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-5 md:px-16 pt-12 md:pt-32 pb-24">

        {/* ── HERO SECTION ── */}
        <header className="mb-16 md:mb-24">
          <h1 className="font-['Syne'] text-[clamp(40px,12vw,120px)] font-extrabold uppercase leading-[0.9] mb-4 m-0 break-words text-black">
            THE JOURNAL
          </h1>
          <div className="h-1 bg-black w-full mb-6"></div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="font-['JetBrains_Mono'] text-[12px] md:text-[14px] font-medium uppercase tracking-[0.2em] text-[#5d5f5f] m-0">
              Technical Dispatches from the Vanguard of Infrastructure
            </p>
            <div className="flex gap-4">
              <span className="font-['JetBrains_Mono'] text-[12px] font-bold text-black bg-[#eeeeee] px-3 py-1 border border-black">ISSUE 004</span>
              <span className="font-['JetBrains_Mono'] text-[12px] font-bold text-black bg-[#eeeeee] px-3 py-1 border border-black">2026 VOL. I</span>
            </div>
          </div>
        </header>

        {/* ── FEATURED ARTICLE ── */}
        <Link to="/journal/permanence-in-the-digital-age" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-24 items-stretch group cursor-pointer no-underline block">
          <div className="lg:col-span-7 border-2 border-black overflow-hidden bg-[#eeeeee] relative">
            <img
              className="w-full h-[400px] lg:h-[600px] object-cover grayscale brightness-90 group-hover:scale-105 transition-transform duration-700"
              alt="Brutalist Architecture"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkCzEH2QUeDVbfpvgMW7ctmGguJFk0TFw74t65t_RNDi3SYvdNA7fVvHjBmV52W2mFUC4pztlOYS7r3I6xZI42NvzSSXqPXIcsV4k05R-ZMtxCCu935YQeXudwiFAqZvScmaCLgej4Af4_H-s_QAcHaNo851Tf6eehLY1YSxHkvosZElgECb1WiA1oPYTH-r_kXvYDfcM-FzR9Zyq5CBEn_fnND9ZV0M2UvoPgD651-8oYGZzeqzQSD7DhALZjCVC2C0CKmGvZKw"
            />
          </div>
          <div className="lg:col-span-5 flex flex-col justify-between py-4">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="font-['JetBrains_Mono'] text-[12px] font-bold text-black border-2 border-black px-3 py-1 uppercase tracking-widest">ARCHITECTURE</span>
                <span className="font-['JetBrains_Mono'] text-[12px] font-medium text-[#5d5f5f] uppercase tracking-widest">AUG 14, 2024</span>
              </div>
              <h2 className="font-['Syne'] text-[32px] md:text-[48px] font-bold leading-[1.1] mb-8 text-black cursor-pointer hover:underline decoration-4 underline-offset-8 m-0">
                PERMANENCE IN THE DIGITAL AGE: RECLAIMING THE MONOLITH
              </h2>
              <p className="font-['Geist'] text-[18px] leading-[1.6] text-[#5d5f5f] mb-8 max-w-lg m-0">
                An examination of physical infrastructure's role in a decentralized world. We argue for the return of architectural density and the elimination of decorative superfluity in technical environments.
              </p>
            </div>
            <div className="flex items-center gap-4 border-2 border-black w-fit px-6 py-3 group-hover:bg-black group-hover:text-white transition-colors duration-300">
              <span className="font-['JetBrains_Mono'] text-[12px] uppercase font-bold tracking-widest text-black group-hover:text-white transition-colors">Read Investigation</span>
              <span className="material-symbols-outlined text-[20px] text-black group-hover:text-white transition-colors group-hover:translate-x-2">arrow_forward</span>
            </div>
          </div>
        </Link>

        {/* ── SECONDARY GRID ── */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">

          {/* Article 02 */}
          <Link to="/journal/low-latency-brutalism" className="flex flex-col border-t-2 border-black pt-8 group cursor-pointer block no-underline">
            <div className="flex justify-between items-center mb-6">
              <span className="font-['JetBrains_Mono'] text-[12px] font-bold bg-black text-white px-3 py-1 uppercase tracking-widest">SYSTEMS</span>
              <span className="font-['JetBrains_Mono'] text-[12px] font-medium text-[#5d5f5f] uppercase tracking-widest">JUL 28, 2024</span>
            </div>
            <h3 className="font-['Syne'] text-[24px] md:text-[32px] font-bold mb-4 text-black group-hover:underline decoration-2 underline-offset-4 m-0 leading-tight">
              LOW-LATENCY BRUTALISM
            </h3>
            <p className="font-['Geist'] text-[16px] leading-[1.6] text-[#5d5f5f] mb-8 flex-grow m-0">
              Stripping back the protocol layers for maximum structural efficiency. A technical deep-dive into zero-overhead network topologies.
            </p>
            <div className="flex items-center justify-between border-b-2 border-black pb-4 group-hover:bg-[#eeeeee] px-2 transition-colors">
              <span className="font-['JetBrains_Mono'] text-[12px] font-bold text-black uppercase tracking-widest">READ FULL PAPER</span>
              <span className="material-symbols-outlined text-[20px] text-black">open_in_new</span>
            </div>
          </Link>

          {/* Article 03 */}
          <Link to="/journal/the-morality-of-the-grid" className="flex flex-col border-t-2 border-black pt-8 group cursor-pointer block no-underline">
            <div className="flex justify-between items-center mb-6">
              <span className="font-['JetBrains_Mono'] text-[12px] font-bold bg-black text-white px-3 py-1 uppercase tracking-widest">ETHICS</span>
              <span className="font-['JetBrains_Mono'] text-[12px] font-medium text-[#5d5f5f] uppercase tracking-widest">JUL 15, 2024</span>
            </div>
            <h3 className="font-['Syne'] text-[24px] md:text-[32px] font-bold mb-4 text-black group-hover:underline decoration-2 underline-offset-4 m-0 leading-tight">
              THE MORALITY OF THE GRID
            </h3>
            <p className="font-['Geist'] text-[16px] leading-[1.6] text-[#5d5f5f] mb-8 flex-grow m-0">
              Why visual order dictates operational integrity. Exploring the philosophical connection between strict layouts and software reliability.
            </p>
            <div className="flex items-center justify-between border-b-2 border-black pb-4 group-hover:bg-[#eeeeee] px-2 transition-colors">
              <span className="font-['JetBrains_Mono'] text-[12px] font-bold text-black uppercase tracking-widest">READ FULL PAPER</span>
              <span className="material-symbols-outlined text-[20px] text-black">open_in_new</span>
            </div>
          </Link>

          {/* Article 04 */}
          <Link to="/journal/bare-metal-optimization" className="flex flex-col border-t-2 border-black pt-8 group cursor-pointer block no-underline">
            <div className="flex justify-between items-center mb-6">
              <span className="font-['JetBrains_Mono'] text-[12px] font-bold bg-black text-white px-3 py-1 uppercase tracking-widest">HARDWARE</span>
              <span className="font-['JetBrains_Mono'] text-[12px] font-medium text-[#5d5f5f] uppercase tracking-widest">JUN 30, 2024</span>
            </div>
            <h3 className="font-['Syne'] text-[24px] md:text-[32px] font-bold mb-4 text-black group-hover:underline decoration-2 underline-offset-4 m-0 leading-tight">
              BARE METAL OPTIMIZATION
            </h3>
            <p className="font-['Geist'] text-[16px] leading-[1.6] text-[#5d5f5f] mb-8 flex-grow m-0">
              Bypassing the hypervisor for direct silicon engagement. Performance metrics from the latest VTRC node deployments.
            </p>
            <div className="flex items-center justify-between border-b-2 border-black pb-4 group-hover:bg-[#eeeeee] px-2 transition-colors">
              <span className="font-['JetBrains_Mono'] text-[12px] font-bold text-black uppercase tracking-widest">READ FULL PAPER</span>
              <span className="material-symbols-outlined text-[20px] text-black">open_in_new</span>
            </div>
          </Link>

        </section>

        {/* ── NEWSLETTER SUBSCRIPTION ── */}
        <section className="mt-32 border-2 border-black p-8 md:p-12 bg-[#f4f3f3] flex flex-col md:flex-row items-start md:items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="font-['Syne'] text-[32px] md:text-[40px] font-bold leading-tight mb-4 text-black m-0">
              ENGINEERED UPDATES.
            </h2>
            <p className="font-['Geist'] text-[18px] leading-[1.6] text-[#5d5f5f] m-0">
              Subscribe to receive monthly technical bulletins. No marketing, only documentation.
            </p>
          </div>
          <div className="md:w-1/2 w-full">
            <form className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="TERMINAL@ORGANIZATION.COM"
                className="w-full bg-transparent border-t-0 border-x-0 border-b-2 border-black py-4 font-['JetBrains_Mono'] text-[12px] md:text-[14px] text-black placeholder-black/30 focus:outline-none focus:border-b-4 focus:ring-0 transition-all rounded-none"
              />
              <button
                type="submit"
                className="bg-black text-white py-5 px-6 font-['JetBrains_Mono'] text-[12px] md:text-[14px] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] border-2 border-black hover:bg-transparent hover:text-black transition-colors duration-300 cursor-pointer w-full text-center"
              >
                ESTABLISH CONNECTION
              </button>
            </form>
          </div>
        </section>

      </div>
    </main>
  );
};

export default Journal;
