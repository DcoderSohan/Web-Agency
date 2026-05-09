import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const JournalDetailed = () => {
  const { articleId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [articleId]);

  // Format title for display
  const formattedTitle = articleId 
    ? articleId.split('-').map(word => word.toUpperCase()).join(' ')
    : 'THE ETHICS OF PERMANENCE IN DIGITAL INFRASTRUCTURE';

  return (
    <main className="bg-[#faf9f9] text-[#1a1c1c] min-h-screen overflow-x-hidden">
      
      <article className="w-full max-w-[1440px] mx-auto px-5 md:px-16 pt-12 md:pt-24 pb-24">
        <header className="max-w-4xl mx-auto md:mx-0">
          <div className="mb-8">
            <span className="bg-black text-white font-['JetBrains_Mono'] text-[12px] font-bold px-3 py-1 uppercase inline-block tracking-widest">
              Perspectives
            </span>
          </div>
          <h1 className="font-['Syne'] text-[clamp(40px,8vw,120px)] leading-[0.9] font-extrabold text-black mb-12 break-words">
            {formattedTitle}
          </h1>

          {/* Metadata Bar */}
          <div className="border border-black py-6 px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="flex flex-col">
              <span className="font-['JetBrains_Mono'] text-[12px] uppercase text-[#5d5f5f] mb-1 font-medium tracking-widest">Author</span>
              <span className="font-['Geist'] text-[18px] font-bold text-black">DR. ELARA VANCE</span>
            </div>
            <div className="flex flex-col">
              <span className="font-['JetBrains_Mono'] text-[12px] uppercase text-[#5d5f5f] mb-1 font-medium tracking-widest">Date Published</span>
              <span className="font-['Geist'] text-[18px] font-bold text-black">OCTOBER 24, 2024</span>
            </div>
            <div className="flex flex-col">
              <span className="font-['JetBrains_Mono'] text-[12px] uppercase text-[#5d5f5f] mb-1 font-medium tracking-widest">Read Time</span>
              <span className="font-['Geist'] text-[18px] font-bold text-black">14 MINUTE READ</span>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <section className="mb-24">
          <div className="w-full aspect-[21/9] border-2 border-black overflow-hidden grayscale">
            <img 
              className="w-full h-full object-cover" 
              alt="Monolithic Structural Integrity" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuACmEIvrfIdSRmD66M71OsqddI1vUUKxQimU-iRY3tQN84-AMdRN2uJ2kSzEbtVMPk4v44vPM9SB6PSpz9_YbluFkfGLnCy98nLkpHsmu_PVMdnz0cNo0KV4EMAUcv-Bzv3tBTal1UHCfkS0WsIMK5L7Le_5XYc_bhTXKqG31lw2W-8jEZVlTe1UwLYxjIHDcnbggZ9_RnMMx0h6VqPbG8qVp0LCzIwap-pG2Rr4XCopfyuH-9TSBym26sSa-zZZci6D7IISWJsvA"
            />
          </div>
          <p className="font-['JetBrains_Mono'] text-[12px] text-[#5d5f5f] mt-4 text-right uppercase tracking-widest font-medium">
            FIG 01. MONOLITHIC STRUCTURAL INTEGRITY IN THE CLOUD ECOSYSTEM.
          </p>
        </section>

        {/* Content Body */}
        <section className="max-w-3xl mx-auto">
          <div className="space-y-12 font-['Geist'] text-[18px] md:text-[20px] text-black leading-relaxed">
            <p className="first-letter:text-7xl first-letter:font-extrabold first-letter:mr-3 first-letter:float-left first-letter:leading-none">
              In an era defined by ephemeral experiences and rapid-cycle obsolescence, the concept of permanence in digital infrastructure has shifted from a technical requirement to an ethical imperative. As we architect the foundations of the next century's data transit, we must ask ourselves: are we building for the fiscal quarter, or for the millennium?
            </p>

            <h2 className="font-['Syne'] text-[32px] md:text-[40px] font-bold text-black mt-16 mb-6 leading-tight">
              THE FRAGILITY OF THE EPHEMERAL
            </h2>
            <p>
              The current paradigm of software development rewards speed over stability. This "move fast and break things" philosophy has birthed a global digital environment that is paradoxically both omnipresent and incredibly fragile. When the infrastructure supporting our civic discourse, financial systems, and personal histories is built on brittle stacks of dependencies, we face a systemic risk of digital erasure.
            </p>

            {/* Pull Quote */}
            <blockquote className="border border-black bg-[#f4f3f3] p-8 md:p-12 my-16">
              <p className="font-['Syne'] text-[24px] md:text-[32px] italic leading-tight text-black font-bold m-0">
                "Sustainability in technology is not merely an environmental metric; it is an architectural commitment to the continuity of human knowledge."
              </p>
              <footer className="mt-8 font-['JetBrains_Mono'] text-[12px] uppercase tracking-widest text-[#5d5f5f] font-bold">
                — VTRC ARCHITECTURAL MANIFESTO
              </footer>
            </blockquote>

            <p>
              Permanence requires a rejection of the proprietary black box. To ensure that digital artifacts remain accessible across generations, we must prioritize open standards and resilient hardware configurations that can be maintained without specialized vendor support. This is the "Brutalist" approach to engineering—visible structures, honest materials, and a design that prioritizes function and longevity over decorative trends.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-16">
              <div className="border-2 border-black p-8">
                <span className="material-symbols-outlined text-black mb-4 text-[32px]">terminal</span>
                <h3 className="font-['Syne'] text-[24px] font-bold mb-4 text-black uppercase">LOGICAL RIGOR</h3>
                <p className="text-[16px] text-[#5d5f5f] m-0">
                  Code that persists must be written with the assumption that its original authors will not be there to maintain it.
                </p>
              </div>
              <div className="border-2 border-black p-8">
                <span className="material-symbols-outlined text-black mb-4 text-[32px]">hard_drive</span>
                <h3 className="font-['Syne'] text-[24px] font-bold mb-4 text-black uppercase">HARDWARE PARITY</h3>
                <p className="text-[16px] text-[#5d5f5f] m-0">
                  Decoupling logical state from specific hardware generations is essential for cross-epoch data retrieval.
                </p>
              </div>
            </div>

            <p>
              The ethics of permanence demand that we view infrastructure as a public utility, regardless of its private ownership. When a system becomes foundational to society, its preservation becomes a collective responsibility. VTRC Technologies champions this perspective by implementing redundant archival layers and protocol-agnostic data structures.
            </p>
          </div>

          {/* Article Footer / Tags */}
          <div className="mt-24 pt-12 border-t-2 border-black flex flex-wrap gap-4">
            <span className="font-['JetBrains_Mono'] text-[12px] font-bold px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors cursor-pointer uppercase tracking-widest">INFRASTRUCTURE</span>
            <span className="font-['JetBrains_Mono'] text-[12px] font-bold px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors cursor-pointer uppercase tracking-widest">ETHICS</span>
            <span className="font-['JetBrains_Mono'] text-[12px] font-bold px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors cursor-pointer uppercase tracking-widest">SYSTEMS DESIGN</span>
            <span className="font-['JetBrains_Mono'] text-[12px] font-bold px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors cursor-pointer uppercase tracking-widest">FUTURE-PROOFING</span>
          </div>
        </section>
      </article>

      {/* Next Article Section */}
      <section className="bg-[#eeeeee] py-24">
        <div className="max-w-[1440px] mx-auto px-5 md:px-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
            <div className="max-w-2xl">
              <span className="font-['JetBrains_Mono'] text-[12px] font-bold uppercase text-[#5d5f5f] mb-4 block tracking-widest">
                Up Next
              </span>
              <h2 className="font-['Syne'] text-[clamp(32px,5vw,64px)] text-black font-extrabold leading-tight m-0 uppercase">
                DECENTRALIZED COMPUTE IN URBAN ENVIRONMENTS
              </h2>
            </div>
            <Link to="/journal/decentralized-compute" className="group flex items-center gap-4 bg-black text-white px-8 py-6 border-2 border-black transition-all hover:bg-transparent hover:text-black shrink-0 no-underline cursor-pointer">
              <span className="font-['JetBrains_Mono'] text-[12px] font-bold uppercase tracking-widest">Read Article</span>
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-2">arrow_forward</span>
            </Link>
          </div>
          <div className="w-full h-1 bg-black"></div>
        </div>
      </section>

    </main>
  );
};

export default JournalDetailed;
