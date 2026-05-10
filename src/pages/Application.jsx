import React, { useEffect } from 'react';

const Application = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="flex-grow pt-12 pb-24 px-5 md:px-16 max-w-[1440px] mx-auto w-full min-h-screen bg-[#faf9f9] text-[#1a1c1c]">
      {/* Hero Section */}
      <section className="mb-24">
        <p className="font-['JetBrains_Mono'] text-[12px] font-medium uppercase tracking-[0.3em] mb-4 text-[#747878]">Application // Ref: 2024-SP</p>
        <h1 className="font-['Syne'] text-[clamp(40px,8vw,120px)] font-extrabold tracking-[-0.04em] leading-[0.9] text-black m-0">
          SPECULATIVE<br/>APPLICATION
        </h1>
        <div className="mt-12 h-px w-full bg-black"></div>
      </section>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Sidebar: Values */}
        <aside className="lg:col-span-4 order-2 lg:order-1 border-2 border-black p-6 bg-[#f4f3f3]">
          <div className="flex items-center gap-2 mb-8">
            <span className="material-symbols-outlined text-black">terminal</span>
            <h2 className="font-['JetBrains_Mono'] text-[12px] uppercase font-bold tracking-widest text-black m-0">CRITERIA_MANIFESTO</h2>
          </div>
          <div className="space-y-12">
            <div>
              <h3 className="font-['Syne'] text-[32px] font-bold mb-2 text-black leading-[40px] m-0">RIGOR.</h3>
              <p className="font-['Geist'] text-[16px] text-[#444748] leading-relaxed m-0">We operate at the intersection of absolute precision and creative intuition. If your work cannot withstand intense scrutiny, it does not belong here.</p>
            </div>
            <div>
              <h3 className="font-['Syne'] text-[32px] font-bold mb-2 text-black leading-[40px] m-0">CLARITY.</h3>
              <p className="font-['Geist'] text-[16px] text-[#444748] leading-relaxed m-0">Complexity is a failure of communication. We seek minds that can distill massive technical challenges into elegant, transparent solutions.</p>
            </div>
            <div>
              <h3 className="font-['Syne'] text-[32px] font-bold mb-2 text-black leading-[40px] m-0">SPEED.</h3>
              <p className="font-['Geist'] text-[16px] text-[#444748] leading-relaxed m-0">The future is moving. We value velocity without sacrificing integrity. Decision-making is decentralized; execution is immediate.</p>
            </div>
          </div>
          <div className="mt-12 pt-12 border-t border-[#c4c7c7]">
            <img 
              className="w-full grayscale filter contrast-125 border border-black" 
              alt="High-contrast macro photograph" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQWJp8aUoXaV6k1RJR23yl17KcIBgoDNacbW6xDISoJmOmydIUvUs23vfypvl-325qirTd9ntwOCncFiIpgPQfFjgGgkaILy1sB-iITXzXDjaaV5Pz7Tc1HceAIQykmWsjZzHdBjpg4_bFAo0k1puUj33KJBuJNmxA8U0w5asd_8xWEeXRkyxjbEPcsUmUWR_J5YNRGyDzxva0wiQPgnldlJM7Jdhtxt0ETp35W1df0-ZB-HPI-8KGpwoh73VtdUK8MdrIgTYLMA"
            />
          </div>
        </aside>

        {/* Form: Dossier Submission */}
        <form className="lg:col-span-8 order-1 lg:order-2 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label className="font-['JetBrains_Mono'] text-[12px] font-medium uppercase tracking-widest text-[#747878]" htmlFor="name">01_FULL_NAME / ID</label>
              <input 
                className="bg-transparent border-b-2 border-black focus:border-black focus:ring-0 px-0 py-4 font-['Syne'] text-[32px] font-bold placeholder:text-[#e3e2e2] transition-colors outline-none w-full" 
                id="name" 
                placeholder="SURNAME, FIRST NAME" 
                type="text"
              />
            </div>
            
            {/* Discipline */}
            <div className="flex flex-col gap-2 relative">
              <label className="font-['JetBrains_Mono'] text-[12px] font-medium uppercase tracking-widest text-[#747878]" htmlFor="discipline">02_TECHNICAL_DISCIPLINE</label>
              <select 
                className="bg-transparent border-b-2 border-black focus:border-black focus:ring-0 px-0 py-4 font-['Syne'] text-[32px] font-bold appearance-none cursor-pointer outline-none w-full" 
                id="discipline"
              >
                <option>ENGINEERING</option>
                <option>DESIGN</option>
                <option>RESEARCH</option>
                <option>OPERATIONS</option>
              </select>
              <span className="material-symbols-outlined absolute right-0 bottom-4 pointer-events-none text-black">expand_more</span>
            </div>
          </div>

          {/* Portfolio */}
          <div className="flex flex-col gap-2">
            <label className="font-['JetBrains_Mono'] text-[12px] font-medium uppercase tracking-widest text-[#747878]" htmlFor="portfolio">03_DOSSIER_URL / PORTFOLIO</label>
            <input 
              className="bg-transparent border-b-2 border-black focus:border-black focus:ring-0 px-0 py-4 font-['Syne'] text-[32px] md:text-[32px] text-[24px] font-bold placeholder:text-[#e3e2e2] outline-none w-full" 
              id="portfolio" 
              placeholder="HTTPS://DOMAIN.COM/WORK" 
              type="url"
            />
          </div>

          {/* The Pitch */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-end mb-4">
              <label className="font-['JetBrains_Mono'] text-[12px] font-medium uppercase tracking-widest text-[#747878]" htmlFor="pitch">04_THE_PITCH</label>
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#747878]">MIN_100_WORDS_REQUIRED</span>
            </div>
            <textarea 
              className="bg-[#f4f3f3] border-2 border-black focus:border-black focus:ring-0 p-6 font-['Geist'] text-[18px] placeholder:text-[#c4c7c7] resize-none outline-none w-full" 
              id="pitch" 
              placeholder="DESCRIBE YOUR CONTRIBUTION TO THE TECHNOLOGICAL REVOLUTION. WHY VTRC? WHY NOW?" 
              rows="8"
            ></textarea>
          </div>

          {/* Action */}
          <div className="pt-8">
            <button 
              className="group relative w-full bg-black text-white py-8 border-2 border-black overflow-hidden transition-all duration-300 hover:bg-transparent hover:text-black cursor-pointer" 
              type="submit"
              onClick={(e) => e.preventDefault()}
            >
              <div className="relative z-10 flex items-center justify-center gap-4">
                <span className="font-['Syne'] text-[32px] font-bold tracking-tighter uppercase">SUBMIT DOSSIER</span>
                <span className="material-symbols-outlined text-4xl group-hover:translate-x-2 transition-transform duration-300">arrow_forward</span>
              </div>
            </button>
            <p className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-widest mt-4 text-center text-[#747878] m-0">By submitting, you acknowledge that all data provided is subject to rigorous technical review.</p>
          </div>
        </form>

      </div>
    </main>
  );
};

export default Application;
