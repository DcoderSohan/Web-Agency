import React from "react";

const FeaturedWork = () => {
  return (
    <section id="work" className="bg-[#faf9f9]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-16 py-16 md:py-24 box-border">

        {/* ── HEADER ── */}
        <div className="flex justify-between items-end mb-12 flex-wrap gap-4">
          <h2 className="font-['Syne'] text-[32px] leading-[40px] font-bold uppercase text-black m-0">
            Featured Work
          </h2>
          <div className="font-['JetBrains_Mono'] text-[12px] font-medium border-2 border-black px-4 py-2 uppercase text-black">
            Selected Output 01–03
          </div>
        </div>

        {/* ── BENTO GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* ── CARD 1: THE MONOLITH ── */}
          <div className="work-card col-span-1 md:col-span-8 border-2 border-black overflow-hidden cursor-pointer">
            <div className="aspect-video overflow-hidden bg-[#eee]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2d3B4lhZoFv0OsstqUPAh1rfIcaivks99_3TquYJHIYXU1nXgPKOPhWAzkzF-oMQGDWOpT3ITITIvf7pvz9WzCeOK-48PHAinZjOYZEgqnFIWkNqP2HiE_dq9_w9RdS0Y6OMJzvIa9RjUYMvb4bzUpTVllHaKhH0sVIuvXwDVgP9oLXyOKWDXblk8-fJO-9VbWhzc-xAEi8guNNc9oKhEDOf_P2FQcPImMb2q585XzyYSICuWse-q9FocvEpolxIufxhlUMfjyw"
                alt="The Monolith"
                className="img-grayscale w-full h-full object-cover"
              />
            </div>
            <div className="p-7 md:p-8 bg-[#faf9f9] border-t-2 border-black flex justify-between items-center gap-4">
              <div>
                <h3 className="font-['Syne'] text-[clamp(20px,3vw,32px)] font-bold uppercase text-black m-0">
                  THE MONOLITH
                </h3>
                <p className="font-['JetBrains_Mono'] text-[12px] text-[#5d5f5f] mt-2 mb-0">
                  Centralized Data Core v2.0
                </p>
              </div>
              <span className="material-symbols-outlined arrow-icon text-[32px] text-black shrink-0">
                arrow_forward
              </span>
            </div>
          </div>

          {/* ── CARD 2: VOID SYSTEM ── */}
          <div className="work-card col-span-1 md:col-span-4 border-2 border-black flex flex-col">
            <div className="p-7 md:p-7 flex-grow bg-black text-white">
              <div className="mb-8 font-['JetBrains_Mono'] text-[11px] font-medium border border-[#858383] px-3 py-1 inline-block uppercase text-white tracking-[0.05em]">
                SYSTEM ARCHITECTURE
              </div>
              <h3 className="font-['Syne'] text-[clamp(22px,2.5vw,32px)] font-bold uppercase text-white mb-4">
                VOID SYSTEM
              </h3>
              <p className="font-['Geist'] text-[15px] leading-[1.6] text-[#858383] m-0">
                A zero-latency communication protocol designed for hyper-secure
                environments where failure is not an option.
              </p>
            </div>
            <div className="aspect-square bg-[#eee] overflow-hidden border-t-2 border-black">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWx1VjpAHhcCPno6S_VkmIzAnCNpdCIH_Okylebt9pQ9AfBgbyLsYmjQ0K8KWWO06UBb_H6roahIUdYJB23HilNiqbW91BSXZEEHA0IM7OASdshJXCp-_BJ3ZFhP29j8802MCcnZJgM3uy0bMg52Ph47w-vicdRm1sBiwLb-n9NVy4DoBTM7dIVJmhy2PMLUSpkpK2cQuDbwuJSENizx07g-aE5iazR4t0zrS2K0rPdy20AXWEBuu5JyJmeLbvAIOaAp-0WoMp3A"
                alt="Void System"
                className="img-grayscale w-full h-full object-cover"
              />
            </div>
          </div>

          {/* ── CARD 3: CHRONOS ── */}
          <div className="work-card col-span-1 md:col-span-12 border-2 border-black overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="overflow-hidden border-b-2 md:border-b-0 md:border-r-2 border-black bg-[#eee] aspect-video md:aspect-auto">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKF_7qJO4JpmV1CKeJbHyx3W9ZyJ3uGly2f7is6MtmvWZtyv6aFPJ93LSS8VF15P_NgL-KFXVkLI6s2s0kGM0aE_HiFClaNQmVjcf2uEIDQCc-68_U80oWithdNBmUEBZv2wmR5gnFCAmVtaNlm9XUwlpWpD4oogNEq16qKKlbkL7zOZ8u4W84kuaReLSpY5H8iX5jDWMD7JITgjOqZIr-uek5nJAJdhkq2UIb3tZtp0QOwBSMcMfymJBWK9152zuUFmShLw20aA"
                  alt="Chronos"
                  className="img-grayscale w-full h-full object-cover block"
                />
              </div>
              <div className="p-7 md:p-12 flex flex-col justify-center bg-[#faf9f9]">
                <h3 className="font-['Syne'] text-[clamp(32px,4vw,64px)] leading-[1] tracking-[-0.03em] font-bold uppercase text-black mb-6">
                  CHRONOS
                </h3>
                <p className="font-['Geist'] text-[18px] leading-[1.6] text-[#5d5f5f] mb-8">
                  Universal time-sync engine for distributed ledgers. Precise to the
                  nanosecond. Built to last for centuries.
                </p>
                <button className="w-fit border-2 border-black px-9 py-3.5 font-['JetBrains_Mono'] text-[12px] font-medium uppercase bg-transparent text-black cursor-pointer tracking-[0.05em] transition-colors duration-200 hover:bg-black hover:text-white">
                  View Technical Specs
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
