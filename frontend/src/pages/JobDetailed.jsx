import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const JobDetailed = () => {
  const { role } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const SERVER_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchJob();
  }, [role]);

  const fetchJob = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${SERVER_URL}/api/careers/${role}`);
      if (response.data.success) {
        setJob(response.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch job details", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="bg-[#faf9f9] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="font-['JetBrains_Mono'] text-[12px] font-bold uppercase tracking-widest">SCANNING TALENT NODE...</p>
        </div>
      </main>
    );
  }

  if (!job) {
    return (
      <main className="bg-[#faf9f9] min-h-screen flex items-center justify-center p-5">
        <div className="text-center max-w-md border-2 border-black p-12">
          <h1 className="font-['Syne'] text-[32px] font-black mb-4 uppercase">NODE NOT FOUND</h1>
          <p className="font-['Geist'] text-[16px] text-[#5d5f5f] mb-8 uppercase font-bold">The requested position has been filled or deprecated.</p>
          <Link to="/careers" className="inline-block bg-black text-white px-8 py-4 font-['JetBrains_Mono'] text-[12px] font-bold uppercase no-underline">Return to Careers</Link>
        </div>
      </main>
    );
  }

  // Format the jobTitle for display split
  const jobTitleWords = job.jobTitle.split(' ');
  const word1 = jobTitleWords[0];
  const word2 = jobTitleWords.slice(1).join(' ');

  return (
    <main className="bg-[#faf9f9] text-[#1a1c1c] min-h-screen overflow-x-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-5 md:px-16 pt-12 md:pt-24 pb-24">
        
        {/* ── HERO SECTION ── */}
        <header className="pt-4 pb-16 md:pt-8 md:pb-32 border-b-2 border-black">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            <div className="md:col-span-8">
              <div className="mb-8">
                <span className="font-['JetBrains_Mono'] text-[12px] font-bold uppercase bg-black text-white px-3 py-1">
                    {job.isOpen ? "Hiring: Open Position" : "Position Closed"}
                </span>
              </div>
              <h1 className="font-['Syne'] text-[clamp(40px,12vw,120px)] font-extrabold uppercase leading-[0.9] m-0 break-words text-black">
                {word1}<br/>{word2}
              </h1>
            </div>
            <div className="md:col-span-4 flex flex-col gap-4 mt-8 md:mt-0">
              <div className="flex items-center gap-3 border-b border-black pb-3">
                <span className="material-symbols-outlined text-black">location_on</span>
                <p className="font-['JetBrains_Mono'] text-[12px] font-medium uppercase m-0 text-black">{job.location}</p>
              </div>
              <div className="flex items-center gap-3 border-b border-black pb-3">
                <span className="material-symbols-outlined text-black">schedule</span>
                <p className="font-['JetBrains_Mono'] text-[12px] font-medium uppercase m-0 text-black">{job.jobType}</p>
              </div>
              {job.salaryRange && (
                  <div className="flex items-center gap-3 border-b border-black pb-3">
                    <span className="material-symbols-outlined text-black">payments</span>
                    <p className="font-['JetBrains_Mono'] text-[12px] font-medium uppercase m-0 text-black">{job.salaryRange}</p>
                  </div>
              )}
            </div>
          </div>
        </header>

        {/* ── Content Sections: Bento Grid Approach ── */}
        <section className="grid grid-cols-1 md:grid-cols-12 border-x-2 border-black bg-white">
          
          {/* Role Overview */}
          <div className="md:col-span-7 border-b-2 md:border-r-2 border-black p-8 md:p-12">
            <h2 className="font-['Syne'] text-[32px] font-bold uppercase mb-8 text-black m-0">The Mission</h2>
            <p className="font-['Geist'] text-[18px] leading-[1.6] text-[#5d5f5f] mb-6 m-0">
              {job.description}
            </p>
          </div>
          
          {/* Key Stats/Context */}
          <div className="md:col-span-5 border-b-2 border-black p-8 md:p-12 bg-[#f4f3f3]">
            <h3 className="font-['JetBrains_Mono'] text-[12px] font-bold uppercase mb-8 opacity-60 text-black m-0">Context</h3>
            <ul className="space-y-6 list-none p-0 m-0">
              <li className="flex gap-4">
                <span className="font-['Syne'] text-[32px] font-bold leading-none text-black">01</span>
                <p className="font-['Geist'] text-[16px] leading-[1.6] text-[#5d5f5f] m-0 mt-1">Department: {job.department}</p>
              </li>
              <li className="flex gap-4">
                <span className="font-['Syne'] text-[32px] font-bold leading-none text-black">02</span>
                <p className="font-['Geist'] text-[16px] leading-[1.6] text-[#5d5f5f] m-0 mt-1">Reporting to the Core Operations Unit.</p>
              </li>
              <li className="flex gap-4">
                <span className="font-['Syne'] text-[32px] font-bold leading-none text-black">03</span>
                <p className="font-['Geist'] text-[16px] leading-[1.6] text-[#5d5f5f] m-0 mt-1">Responsible for scaling the {job.department.toLowerCase()} axis.</p>
              </li>
            </ul>
          </div>
          
          {/* Requirements */}
          <div className="md:col-span-6 border-b-2 md:border-r-2 border-black p-8 md:p-12">
            <h2 className="font-['Syne'] text-[32px] font-bold uppercase mb-8 text-black m-0">Requirements</h2>
            <ul className="space-y-6 font-['Geist'] text-[16px] leading-[1.6] text-[#5d5f5f] list-none p-0 m-0">
              {job.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-black mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Benefits */}
          <div className="md:col-span-6 border-b-2 border-black p-8 md:p-12">
            <h2 className="font-['Syne'] text-[32px] font-bold uppercase mb-8 text-black m-0">Benefits</h2>
            <div className="space-y-4">
              {job.benefits.map((benefit, idx) => (
                <div key={idx} className="p-6 border border-black hover:bg-black hover:text-white transition-all duration-300 group cursor-pointer">
                    <h4 className="font-['JetBrains_Mono'] text-[12px] uppercase font-bold text-black group-hover:text-white m-0">
                        {benefit}
                    </h4>
                </div>
              ))}
            </div>
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
                <p className="font-['Geist'] text-[16px] font-bold m-0">Technical Interview with Core Operators</p>
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
                  placeholder="Explain your philosophy in relation to our mission."
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
                disabled={!job.isOpen}
                className={`w-full md:w-auto font-['Syne'] text-[20px] font-bold uppercase tracking-tighter px-12 py-5 border-2 border-black transition-colors duration-300 cursor-pointer ${job.isOpen ? 'bg-black text-white hover:bg-transparent hover:text-black' : 'bg-gray-200 text-gray-500 cursor-not-allowed border-gray-200'}`}
              >
                {job.isOpen ? 'Submit Application' : 'Position Closed'}
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
