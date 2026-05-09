import React from 'react';
import { Link } from 'react-router-dom';

const Work = () => {
  return (
    <main className="bg-[#faf9f9] text-[#1a1c1c] min-h-screen">
      {/* Container wrapper for centering */}
      <div className="w-full max-w-[1440px] mx-auto px-5 md:px-16 pt-12 md:pt-24 pb-24">

        {/* ── HERO SECTION ── */}
        <section className="pb-16 md:pb-24 border-b-2 border-black flex flex-col justify-center">
          <div className="mb-12">
            <p className="font-['JetBrains_Mono'] text-[12px] font-medium text-black mb-6 uppercase tracking-[0.2em]">
              Selected Works // 2026
            </p>
            <h1 className="font-['Syne'] text-[clamp(40px,8vw,120px)] leading-[0.9] tracking-[-0.04em] font-extrabold text-black uppercase break-words">
              PROVING THE<br className="hidden md:block" /> IMPOSSIBLE<br className="hidden md:block" /> PERMANENT
            </h1>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <p className="max-w-[560px] font-['Geist'] text-[18px] leading-[1.6] text-[#5d5f5f] m-0">
              VTRC Technologies architected the digital foundations for the world's most ambitious industrial and creative entities. We do not design interfaces; we engineer digital monuments.
            </p>
            <div className="flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[32px] text-black">
                arrow_downward
              </span>
            </div>
          </div>
        </section>

        {/* ── PROJECT GRID ── */}
        <section className="py-16 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* CHRONOS MONOLITH - Span 8 */}
          <Link to="/work/chronos-monolith" className="col-span-1 md:col-span-8 border-2 border-black overflow-hidden group cursor-pointer bg-white block no-underline">
            <div className="h-[300px] md:h-[500px] bg-[#eeeeee] relative overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoSZ7xdo_dM7kwdhHXoc4a_NWr3zq_f9_zISloGnofsyNCJ3rTFqdhNwID-MGoYkECNiUbDK0ygm-1wqpXelAz-OtgZG7e-uqfaku_WYmvTd2ZV27Lp6EvSRycBDtVOHhwarBTLCbn4i43TXeC98vht068gwo_RFp2PL1K183WBXgo2uynjZcVIiTXRcy5ExQMeC3vCWLVFIfTQb_Znrx3Lu6_OlZzl4suu_rxWc33vjt4wMPWUJahOk2WF2tlxIhPpFduuOKCtg"
                alt="Chronos Monolith"
                className="w-full h-full object-cover grayscale transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6 md:p-8 bg-[#faf9f9] border-t-2 border-black flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="font-['Syne'] text-[24px] md:text-[32px] font-bold uppercase text-black m-0">
                  CHRONOS MONOLITH
                </h2>
                <p className="font-['JetBrains_Mono'] text-[12px] font-medium text-[#5d5f5f] uppercase mt-2 mb-0 tracking-widest">
                  Infrastructure / Blockchain
                </p>
              </div>
              <span className="material-symbols-outlined text-[32px] text-black transition-transform duration-300 group-hover:translate-x-2 shrink-0 self-end md:self-center">
                arrow_forward
              </span>
            </div>
          </Link>

          {/* NOIR STUDIOS - Span 4 */}
          <Link to="/work/noir-studios" className="col-span-1 md:col-span-4 border-2 border-black overflow-hidden group cursor-pointer bg-white flex flex-col block no-underline">
            <div className="h-[300px] md:h-[500px] bg-[#eeeeee] relative overflow-hidden flex-grow">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4zpjzPCT99upY39xledrOQ7f7ZIwMnU4fLO9BhuC8voRMtYkou-b6wn01zNJ49Kiq8dTFcGJDcrPCY-BWdKx2Fw3fpNuZstsnneFKBukhGQ94ZT8_CGiBnbNlPQmEpdR1JL1PKzid9RECH0pYBDg0BTFhfBs-4VCjp9baJrcowJqZ03r7d8bey76wIqEd9k7L2x5_hIbdGFRSKUp0h4AO7btbrXwrk1O7ULxbPRuqjsD580A8k_kkJ-sguUhd5vAip7FXU5gVcA"
                alt="Noir Studios"
                className="w-full h-full object-cover grayscale transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6 md:p-8 bg-[#faf9f9] border-t-2 border-black">
              <h2 className="font-['Syne'] text-[24px] md:text-[32px] font-bold uppercase text-black m-0 mb-2">
                NOIR STUDIOS
              </h2>
              <p className="font-['JetBrains_Mono'] text-[12px] font-medium text-[#5d5f5f] uppercase m-0 tracking-widest">
                Creative / Digital Archive
              </p>
            </div>
          </Link>

          {/* VANTAGE AI - Span 4 */}
          <Link to="/work/vantage-ai" className="col-span-1 md:col-span-4 border-2 border-black overflow-hidden group cursor-pointer bg-white flex flex-col block no-underline">
            <div className="aspect-square bg-[#eeeeee] relative overflow-hidden flex-grow">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3D5jluBWbSU8BBuFNd4tTng2omGtokwcrV-Nju0tEZ9eSgxCh0hJkrlDOW5tVylnRfedUiEXlR3cwuALj1UQYn7gS-2RoFfYqlkFXSGMfkFGI4EZ_DR-eEto-OvUmCEbkCnNnKvYSmJkWcZyfGGLqhiYa3fTw1SLcNCvOkqny6GA5x7L2OptS-WPdxbNdZ-wwuhV4gqBF09UEmuLLW94ktWWSwSflTzawg66VkpggKcsc1hNQl1zaWKib6FGpOGzQLXBFoyZbyQ"
                alt="Vantage AI"
                className="w-full h-full object-cover grayscale transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6 md:p-8 bg-[#faf9f9] border-t-2 border-black">
              <h2 className="font-['Syne'] text-[24px] md:text-[32px] font-bold uppercase text-black m-0 mb-2">
                VANTAGE AI
              </h2>
              <p className="font-['JetBrains_Mono'] text-[12px] font-medium text-[#5d5f5f] uppercase m-0 tracking-widest">
                Machine Learning / SaaS
              </p>
            </div>
          </Link>

          {/* TIMELESS CORE - Span 8 */}
          <Link to="/work/timeless-core" className="col-span-1 md:col-span-8 border-2 border-black overflow-hidden group cursor-pointer bg-white flex flex-col block no-underline">
            <div className="h-[300px] md:h-[400px] bg-[#eeeeee] relative overflow-hidden flex-grow">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwbk_k7IOCqK_DwpNSukkV8_y6q2ox_pPHcjeCjEXhcKKmEYe1UUbhBT6Ngb-gzThP-Nn5bgTmxdykk2l60CAn7JKaAYEPvRmtJZ-fy7vL9Ia5r_DcdxyKC09Pgq9UsE70Ddk5iH-7-A_eE6CBhPhKtDVmgK8Hdc0gWrgzH45qh3eA7_RCJSBUfCErNeD5HTlU15g0QUjM1fLppZk_pi7TqA2ZZ_qMO_d9HvAf5xFqmH2wByyYjfeI9pZyqRN_Bt6xBoVKBl3LPg"
                alt="Timeless Core"
                className="w-full h-full object-cover grayscale transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6 md:p-8 bg-[#faf9f9] border-t-2 border-black flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="font-['Syne'] text-[24px] md:text-[32px] font-bold uppercase text-black m-0">
                  TIMELESS CORE
                </h2>
                <p className="font-['JetBrains_Mono'] text-[12px] font-medium text-[#5d5f5f] uppercase mt-2 mb-0 tracking-widest">
                  E-Commerce / Global Logistics
                </p>
              </div>
              <span className="material-symbols-outlined text-[32px] text-black transition-transform duration-300 group-hover:translate-x-2 shrink-0 self-end md:self-center">
                arrow_forward
              </span>
            </div>
          </Link>

          {/* AXIS GLOBAL - Span 12 Overlay */}
          <Link to="/work/axis-global" className="col-span-1 md:col-span-12 border-2 border-black overflow-hidden group relative block no-underline cursor-pointer">
            <div className="h-[400px] md:h-[600px] bg-[#eeeeee] relative overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdQMYDZvBdFOk7OxLlmf0SJjE3fWqyLY_rZ-QDU8SqaqwEwQauTACJYDK2hVqbjOVN33LRxPEp6rGwb1UuK9dSW5phUB00VD9oANFkdFJmj4RqTkqhIwExR_XU4m-i1BEunYFOf09ubRDLwBMI4n5cuHtGtVcRUmHJLazuKgbtim864qAxJxWHHJZP7n2dVh6JujcKAomrpxWcbLGUkCJLdrgOOFiPT3kTTw0Akr66BfME1ceS-xfmIlzxOT4cJTVpXoMXGgeW1A"
                alt="Axis Global"
                className="w-full h-full object-cover grayscale transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="bg-black text-white p-8 md:p-12 border-2 border-black text-center w-full max-w-2xl mx-auto flex flex-col items-center">
                  <h2 className="font-['Syne'] text-[clamp(32px,5vw,64px)] leading-none font-bold uppercase mb-4 text-white m-0">
                    AXIS GLOBAL
                  </h2>
                  <p className="font-['JetBrains_Mono'] text-[11px] md:text-[12px] font-medium uppercase tracking-[0.2em] mb-8 text-white m-0">
                    Flagship Enterprise Portal
                  </p>
                  <button className="bg-white text-black px-8 py-3 border-2 border-transparent font-['JetBrains_Mono'] text-[12px] font-bold uppercase cursor-pointer hover:bg-black hover:text-white hover:border-white transition-colors duration-200">
                    View Case Study
                  </button>
                </div>
              </div>
            </div>
          </Link>

        </section>

        {/* ── STATS SECTION ── */}
        <section className="py-16 md:py-24 border-t-2 border-black">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            <div className="p-6 md:p-8 bg-[#f4f3f3] border border-black flex flex-col gap-2">
              <p className="font-['JetBrains_Mono'] text-[12px] font-medium text-[#5d5f5f] uppercase m-0 tracking-widest">Projects</p>
              <p className="font-['Syne'] text-[32px] md:text-[40px] font-bold text-black m-0 leading-none">140+</p>
            </div>

            <div className="p-6 md:p-8 bg-[#f4f3f3] border border-black flex flex-col gap-2">
              <p className="font-['JetBrains_Mono'] text-[12px] font-medium text-[#5d5f5f] uppercase m-0 tracking-widest">Years</p>
              <p className="font-['Syne'] text-[32px] md:text-[40px] font-bold text-black m-0 leading-none">12</p>
            </div>

            <div className="p-6 md:p-8 bg-[#f4f3f3] border border-black flex flex-col gap-2">
              <p className="font-['JetBrains_Mono'] text-[12px] font-medium text-[#5d5f5f] uppercase m-0 tracking-widest">Uptime</p>
              <p className="font-['Syne'] text-[32px] md:text-[40px] font-bold text-black m-0 leading-none">99.9%</p>
            </div>

            <div className="p-6 md:p-8 bg-[#f4f3f3] border border-black flex flex-col gap-2">
              <p className="font-['JetBrains_Mono'] text-[12px] font-medium text-[#5d5f5f] uppercase m-0 tracking-widest">Awards</p>
              <p className="font-['Syne'] text-[32px] md:text-[40px] font-bold text-black m-0 leading-none">42</p>
            </div>

          </div>
        </section>

        {/* ── CTA SECTION ── */}
        <section className="bg-black text-white p-12 md:p-20 text-center flex flex-col items-center">
          <h2 className="font-['Syne'] text-[clamp(32px,5vw,64px)] leading-none font-bold uppercase mb-8 text-white m-0">
            BUILD THE PERMANENT
          </h2>
          <p className="max-w-[600px] w-full font-['Geist'] text-[18px] leading-[1.6] text-[#858383] mb-12 m-0">
            Our queue for Q4 is opening. We seek partners who value structural integrity and long-form digital strategy.
          </p>
          <button className="bg-white text-black px-12 py-5 border-2 border-transparent font-['JetBrains_Mono'] text-[12px] font-bold uppercase cursor-pointer hover:bg-transparent hover:text-white hover:border-white transition-colors duration-200 tracking-widest w-full md:w-auto">
            Contact Strategy Team
          </button>
        </section>

      </div>
    </main>
  );
};

export default Work;
