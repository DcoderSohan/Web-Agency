import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Work = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects`);
      if (response.data.success) {
        setProjects(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  // Logic to determine column span based on index
  const getColSpan = (index) => {
    const pattern = [8, 4, 4, 8, 12];
    return pattern[index % pattern.length];
  };

  return (
    <main className="bg-[#faf9f9] text-[#1a1c1c] min-h-screen">
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
              <span className="material-symbols-outlined text-[32px] text-black animate-bounce">
                arrow_downward
              </span>
            </div>
          </div>
        </section>

        {/* ── PROJECT GRID ── */}
        <section className="py-16 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-6">
          {loading ? (
            <div className="col-span-12 py-32 flex flex-col items-center justify-center">
               <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
               <p className="mt-6 font-['JetBrains_Mono'] text-xs uppercase tracking-widest font-bold">Initializing Monuments...</p>
            </div>
          ) : (
            projects.map((project, index) => {
              const span = getColSpan(index);
              const isOverlay = span === 12;

              if (isOverlay) {
                return (
                  <Link 
                    key={project._id}
                    to={project.link || "#"} 
                    className="col-span-1 md:col-span-12 border-2 border-black overflow-hidden group relative block no-underline cursor-pointer h-[400px] md:h-[600px]"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <div className="bg-black text-white p-8 md:p-12 border-2 border-black text-center w-full max-w-2xl mx-auto flex flex-col items-center">
                        <h2 className="font-['Syne'] text-[clamp(32px,5vw,64px)] leading-none font-bold uppercase mb-4 text-white m-0">
                          {project.title}
                        </h2>
                        <p className="font-['JetBrains_Mono'] text-[11px] md:text-[12px] font-medium uppercase tracking-[0.2em] mb-8 text-white m-0">
                          {project.subtitle || project.category}
                        </p>
                        <button className="bg-white text-black px-8 py-3 border-2 border-transparent font-['JetBrains_Mono'] text-[12px] font-bold uppercase cursor-pointer hover:bg-black hover:text-white hover:border-white transition-colors duration-200">
                          View Project
                        </button>
                      </div>
                    </div>
                  </Link>
                );
              }

              return (
                <Link 
                  key={project._id}
                  to={project.link || "#"} 
                  className={`col-span-1 md:col-span-${span} border-2 border-black overflow-hidden group cursor-pointer bg-white flex flex-col block no-underline`}
                >
                  <div className={`h-[300px] md:h-[500px] bg-[#eeeeee] relative overflow-hidden ${span === 8 ? '' : 'flex-grow'}`}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale transition-transform duration-1000 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 md:p-8 bg-[#faf9f9] border-t-2 border-black flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h2 className="font-['Syne'] text-[24px] md:text-[32px] font-bold uppercase text-black m-0 leading-tight">
                        {project.title}
                      </h2>
                      <p className="font-['JetBrains_Mono'] text-[12px] font-medium text-[#5d5f5f] uppercase mt-2 mb-0 tracking-widest">
                        {project.subtitle || project.category}
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-[32px] text-black transition-transform duration-300 group-hover:translate-x-2 shrink-0 self-end md:self-center">
                      arrow_forward
                    </span>
                  </div>
                </Link>
              );
            })
          )}
          
          {!loading && projects.length === 0 && (
            <div className="col-span-12 py-32 border-2 border-dashed border-black/10 flex flex-col items-center justify-center text-center">
               <p className="font-['Syne'] text-2xl font-bold uppercase text-black">No Monuments Found</p>
               <p className="font-['Geist'] text-[#5d5f5f] mt-2">The digital archive is currently empty.</p>
            </div>
          )}
        </section>

        {/* ── STATS SECTION ── */}
        <section className="py-16 md:py-24 border-t-2 border-black">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-6 md:p-8 bg-[#f4f3f3] border border-black flex flex-col gap-2">
              <p className="font-['JetBrains_Mono'] text-[12px] font-medium text-[#5d5f5f] uppercase m-0 tracking-widest">Projects</p>
              <p className="font-['Syne'] text-[32px] md:text-[40px] font-bold text-black m-0 leading-none">{projects.length > 0 ? `${projects.length}+` : "0"}</p>
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
          <Link to="/contact-us" className="bg-white text-black px-12 py-5 border-2 border-transparent font-['JetBrains_Mono'] text-[12px] font-bold uppercase cursor-pointer hover:bg-transparent hover:text-white hover:border-white transition-colors duration-200 tracking-widest w-full md:w-auto">
            Contact Strategy Team
          </Link>
        </section>
      </div>
    </main>
  );
};

export default Work;
