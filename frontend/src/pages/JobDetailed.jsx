import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const JobDetailed = () => {
  const { role } = useParams();
  
  // Ensure the page scrolls to the top when navigated to
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [role]);
  
  // Format the role slug (e.g., 'design-lead') into a display title ('Design Lead')
  const formattedRole = role ? role.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Design Lead';

  // We split the role into two words if possible for the big brutalist headline
  const roleWords = formattedRole.split(' ');
  const word1 = roleWords[0] || 'Design';
  const word2 = roleWords.slice(1).join(' ') || 'Lead';

  return (
    <main className="bg-[#faf9f9] text-[#1a1c1c] min-h-screen overflow-x-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-5 md:px-16 pt-12 md:pt-24 pb-24">
        
        {/* ── HERO SECTION ── */}
        <header className="pt-4 pb-16 md:pt-8 md:pb-32 border-b-2 border-black">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            <div className="md:col-span-8">
              <div className="mb-8">
                <span className="font-['JetBrains_Mono'] text-[12px] font-bold uppercase bg-black text-white px-3 py-1">Hiring: Open Position</span>
              </div>
              <h1 className="font-['Syne'] text-[clamp(40px,12vw,120px)] font-extrabold uppercase leading-[0.9] m-0 break-words text-black">
                {word1}<br/>{word2}
              </h1>
            </div>
            <div className="md:col-span-4 flex flex-col gap-4 mt-8 md:mt-0">
              <div className="flex items-center gap-3 border-b border-black pb-3">
                <span className="material-symbols-outlined text-black">location_on</span>
                <p className="font-['JetBrains_Mono'] text-[12px] font-medium uppercase m-0 text-black">Remote / London, UK</p>
              </div>
              <div className="flex items-center gap-3 border-b border-black pb-3">
                <span className="material-symbols-outlined text-black">schedule</span>
                <p className="font-['JetBrains_Mono'] text-[12px] font-medium uppercase m-0 text-black">Full-Time (40H/Week)</p>
              </div>
              <div className="flex items-center gap-3 border-b border-black pb-3">
                <span className="material-symbols-outlined text-black">payments</span>
                <p className="font-['JetBrains_Mono'] text-[12px] font-medium uppercase m-0 text-black">£95k — £120k + Equity</p>
              </div>
            </div>
          </div>
        </header>

        {/* ── Content Sections: Bento Grid Approach ── */}
        <section className="grid grid-cols-1 md:grid-cols-12 border-x-2 border-black bg-white">
          
          {/* Role Overview */}
          <div className="md:col-span-7 border-b-2 md:border-r-2 border-black p-8 md:p-12">
            <h2 className="font-['Syne'] text-[32px] font-bold uppercase mb-8 text-black m-0">The Mission</h2>
            <p className="font-['Geist'] text-[18px] leading-[1.6] text-[#5d5f5f] mb-6 m-0">
              VTRC Technologies is seeking a {formattedRole} to architect the next generation of industrial-grade digital interfaces. This isn't just a UI/UX role; it's an invitation to define the visual language of precision engineering.
            </p>
            <p className="font-['Geist'] text-[18px] leading-[1.6] text-[#5d5f5f] m-0">
              You will lead the transition from visual chaos to clinical clarity, ensuring our systems operate with the same efficiency as the machinery they control. Your work will set the standard for permanence and structural honesty across our entire product ecosystem.
            </p>
          </div>
          
          {/* Key Stats/Context */}
          <div className="md:col-span-5 border-b-2 border-black p-8 md:p-12 bg-[#f4f3f3]">
            <h3 className="font-['JetBrains_Mono'] text-[12px] font-bold uppercase mb-8 opacity-60 text-black m-0">Context</h3>
            <ul className="space-y-6 list-none p-0 m-0">
              <li className="flex gap-4">
                <span className="font-['Syne'] text-[32px] font-bold leading-none text-black">01</span>
                <p className="font-['Geist'] text-[16px] leading-[1.6] text-[#5d5f5f] m-0 mt-1">Leading a high-performance squad of 4 multidisciplinary designers.</p>
              </li>
              <li className="flex gap-4">
                <span className="font-['Syne'] text-[32px] font-bold leading-none text-black">02</span>
                <p className="font-['Geist'] text-[16px] leading-[1.6] text-[#5d5f5f] m-0 mt-1">Reporting directly to the CTO and Head of Product.</p>
              </li>
              <li className="flex gap-4">
                <span className="font-['Syne'] text-[32px] font-bold leading-none text-black">03</span>
                <p className="font-['Geist'] text-[16px] leading-[1.6] text-[#5d5f5f] m-0 mt-1">Responsible for the global Design System (VTRC Light Narrative).</p>
              </li>
            </ul>
          </div>
          
          {/* Responsibilities */}
          <div className="md:col-span-6 border-b-2 md:border-r-2 border-black p-8 md:p-12">
            <h2 className="font-['Syne'] text-[32px] font-bold uppercase mb-8 text-black m-0">Responsibilities</h2>
            <div className="space-y-4">
              <div className="p-6 border border-black hover:bg-black hover:text-white transition-all duration-300 group cursor-pointer">
                <h4 className="font-['JetBrains_Mono'] text-[12px] uppercase font-bold mb-3 text-black group-hover:text-white m-0">Systems Architecture</h4>
                <p className="font-['Geist'] text-[16px] leading-[1.6] text-[#5d5f5f] group-hover:text-white/80 m-0">Audit and expand our design tokens to support complex data visualization and industrial monitoring tools.</p>
              </div>
              <div className="p-6 border border-black hover:bg-black hover:text-white transition-all duration-300 group cursor-pointer">
                <h4 className="font-['JetBrains_Mono'] text-[12px] uppercase font-bold mb-3 text-black group-hover:text-white m-0">Technical Leadership</h4>
                <p className="font-['Geist'] text-[16px] leading-[1.6] text-[#5d5f5f] group-hover:text-white/80 m-0">Mentor designers on structural clarity, brutalist aesthetics, and front-end feasibility.</p>
              </div>
              <div className="p-6 border border-black hover:bg-black hover:text-white transition-all duration-300 group cursor-pointer">
                <h4 className="font-['JetBrains_Mono'] text-[12px] uppercase font-bold mb-3 text-black group-hover:text-white m-0">Product Strategy</h4>
                <p className="font-['Geist'] text-[16px] leading-[1.6] text-[#5d5f5f] group-hover:text-white/80 m-0">Translate complex engineering requirements into seamless, authoritative user journeys.</p>
              </div>
            </div>
          </div>
          
          {/* Requirements */}
          <div className="md:col-span-6 border-b-2 border-black p-8 md:p-12">
            <h2 className="font-['Syne'] text-[32px] font-bold uppercase mb-8 text-black m-0">Requirements</h2>
            <ul className="space-y-6 font-['Geist'] text-[16px] leading-[1.6] text-[#5d5f5f] list-none p-0 m-0">
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-black mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span>8+ years of experience in Product Design, with at least 2 years in a leadership role.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-black mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span>A portfolio demonstrating obsession with grid systems, typography, and functional minimalism.</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-black mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span>Proficiency in designing for technical audiences (DevTools, Industrial SaaS, or Fintech).</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-black mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span>Deep understanding of CSS, React, and how design tokens manifest in code.</span>
              </li>
            </ul>
          </div>
          
        </section>

        {/* ── Application Section ── */}
        <section className="grid grid-cols-1 md:grid-cols-12 border-x-2 border-b-2 border-black w-full bg-white">
          <div className="md:col-span-5 p-8 md:p-12 md:border-r-2 border-b-2 md:border-b-0 border-black bg-black text-white">
            <h2 className="font-['Syne'] text-[32px] font-bold uppercase mb-8 text-white m-0">Apply for this role</h2>
            <p className="font-['Geist'] text-[16px] leading-[1.6] mb-12 opacity-80 m-0">
              We do not require cover letters. We require clarity. Submit your portfolio and a brief statement on why functional minimalism matters in industrial software.
            </p>
            <div className="flex flex-col gap-6">
              <div className="p-6 border border-white">
                <p className="font-['JetBrains_Mono'] text-[12px] font-bold uppercase mb-2 m-0 opacity-80">Step 01</p>
                <p className="font-['Geist'] text-[16px] font-bold m-0">Portfolio Review (Technical Focus)</p>
              </div>
              <div className="p-6 border border-white">
                <p className="font-['JetBrains_Mono'] text-[12px] font-bold uppercase mb-2 m-0 opacity-80">Step 02</p>
                <p className="font-['Geist'] text-[16px] font-bold m-0">Technical Interview with CTO</p>
              </div>
            </div>
          </div>
          <div className="md:col-span-7 p-8 md:p-12">
            <form className="space-y-8 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="font-['JetBrains_Mono'] text-[12px] font-medium uppercase text-black">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. MARCUS AURELIUS"
                    className="w-full bg-transparent border-t-0 border-x-0 border-b-2 border-black py-3 font-['Geist'] text-[16px] text-black placeholder-black/30 focus:outline-none focus:border-b-4 focus:ring-0 transition-all rounded-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-['JetBrains_Mono'] text-[12px] font-medium uppercase text-black">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="m.aurelius@vtrc.tech"
                    className="w-full bg-transparent border-t-0 border-x-0 border-b-2 border-black py-3 font-['Geist'] text-[16px] text-black placeholder-black/30 focus:outline-none focus:border-b-4 focus:ring-0 transition-all rounded-none"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-['JetBrains_Mono'] text-[12px] font-medium uppercase text-black">Portfolio Link (URL)</label>
                <input 
                  type="url" 
                  placeholder="https://"
                  className="w-full bg-transparent border-t-0 border-x-0 border-b-2 border-black py-3 font-['Geist'] text-[16px] text-black placeholder-black/30 focus:outline-none focus:border-b-4 focus:ring-0 transition-all rounded-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-['JetBrains_Mono'] text-[12px] font-medium uppercase text-black">Why VTRC? (Max 100 Words)</label>
                <textarea 
                  rows="4"
                  placeholder="Explain your design philosophy in relation to our mission."
                  className="w-full bg-transparent border-2 border-black p-4 font-['Geist'] text-[16px] text-black placeholder-black/30 focus:outline-none focus:ring-0 focus:border-[3px] transition-all resize-none rounded-none"
                ></textarea>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 border border-black p-4 hover:bg-[#eeeeee] transition-colors cursor-pointer group">
                  <span className="material-symbols-outlined text-black text-[24px]">upload_file</span>
                  <span className="font-['JetBrains_Mono'] text-[12px] font-bold uppercase text-black">Upload CV (PDF Only)</span>
                </div>
              </div>
              <button 
                type="submit" 
                className="w-full md:w-auto bg-black text-white font-['Syne'] text-[20px] font-bold uppercase tracking-tighter px-12 py-5 border-2 border-black hover:bg-transparent hover:text-black transition-colors duration-300 cursor-pointer"
              >
                Submit Application
              </button>
            </form>
          </div>
        </section>

        {/* ── Visual Anchor / Office Culture ── */}
        <section className="py-16">
          <div className="relative w-full aspect-[21/9] border-2 border-black overflow-hidden group">
            <img 
              alt="Office Culture"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7Y_h21gegpC9ojcfKniYH-jwqyFAlGbCoCNMM41_RICs7Z8XcydDmZvSZUwamCaej1WjPl2yN5035hWNyh5Ijnm8h_jYuLBm3NYpaqfEAWqOTYRRO5ZmTXBoMgJ1wUwnUSe3Qg8Ka-YSs-aAH70jCpc75LaGIWiiRZjvv6RY-M7IA0EFB-esCd_ptRrABWfnG6ZFVDHPkatPl7HR0r9GZgA4Ss9Qk6Un-lb27Fa2gfnjb8OYnJZsqOpxiL1FMfFJrxTHFSNSr8g"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute bottom-6 left-6 bg-[#faf9f9] px-4 py-2 border border-black">
              <p className="font-['JetBrains_Mono'] text-[12px] font-medium uppercase m-0 text-black">VTRC HQ // London Sector 04</p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
};

export default JobDetailed;
