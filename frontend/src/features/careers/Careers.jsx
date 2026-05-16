import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const SERVER_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/careers`);
      if (response.data.success) {
        setJobs(response.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch job openings", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#faf9f9] text-[#1a1c1c] min-h-screen">
      <div className="w-full max-w-[1440px] mx-auto px-5 md:px-16 pt-12 md:pt-24 pb-24">

        {/* ── HERO SECTION ── */}
        <section className="pt-4 pb-16 md:pt-8 md:pb-32 flex flex-col items-start gap-8">
          <div className="inline-block bg-black text-white px-3 py-1 font-['JetBrains_Mono'] text-[12px] font-medium tracking-[0.05em] uppercase">
            JOIN THE REVOLUTION
          </div>
          <h1 className="font-['Syne'] text-[clamp(40px,8vw,120px)] leading-[0.9] tracking-[-0.04em] font-extrabold uppercase max-w-4xl break-words m-0 text-black">
            JOIN THE FUTURE
          </h1>
          <p className="font-['Geist'] text-[18px] leading-[1.6] max-w-2xl text-[#5d5f5f] m-0">
            We are building the next generation of digital infrastructure. VTRC Technologies is seeking architects, engineers, and visionaries to redefine technical excellence.
          </p>
        </section>

        {/* ── Culture Bento Grid ── */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-32">

          <div className="col-span-1 md:col-span-8 border border-black p-8 flex flex-col justify-between bg-white">
            <div>
              <h2 className="font-['Syne'] text-[32px] md:text-[40px] font-bold text-black mb-4 m-0 leading-tight uppercase">Our Engineering DNA</h2>
              <p className="font-['Geist'] text-[16px] leading-[1.6] text-[#5d5f5f] max-w-xl m-0">
                We prioritize structural integrity over superficial aesthetics. Our culture is built on radical transparency, peer review, and the pursuit of the "optimal path."
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="border border-black px-4 py-2 font-['JetBrains_Mono'] text-[12px] font-medium text-black">01 / Rigor</div>
              <div className="border border-black px-4 py-2 font-['JetBrains_Mono'] text-[12px] font-medium text-black">02 / Clarity</div>
              <div className="border border-black px-4 py-2 font-['JetBrains_Mono'] text-[12px] font-medium text-black">03 / Speed</div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-4 border border-black aspect-square relative overflow-hidden">
            <img
              alt="Office Culture"
              className="object-cover w-full h-full grayscale"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmH8-ugyYH5J56Bz9lQGkA4McbjO0cZE3tNS3mxFg8ZjA88T-mgTJ0k_uqtgKxf2sYApvFdePbGipJ5woQA7pvvVwCh2qr5HPBuMXnJrbL3PcGQWwmN0UGHuesTrVSMx6MzUh8kUhpWL9mJlHuKwaWQz5hVNQGXQZgAXTbj_KAUZICHrRDMkbZhZpi5cvj2gkrhyBYXvl9u_QGrFWpH0xiT7p6x8sujK03VtCphGHB42d-EKrpBxdz7cIXxeaWTNISqdiiwb_xyA"
            />
          </div>

          <div className="col-span-1 md:col-span-4 border border-black aspect-[4/5] relative overflow-hidden">
            <img
              alt="Workspace"
              className="object-cover w-full h-full grayscale"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkvctF3YmuNo70oBNIY7NYX8I_7DMke4ZFwxtdBcpe5unOJA6aOTQ83HNyh8i4jkW9X8JHGYqFFLJPWUYNiDAN3tbXI8bq6MArrOvMiiQs2yGyJZE0iWOF2noIU_gH4AU0Q9RC9eZxmoTkX6X08doOtq5RZ0s7LR3RgoEPZdbqoNCc4djOcQAnhoiH40mvB5S6JjKnYtI8cmdDSvwewfJUlB6RXk4pwIkj1T1M1ZTpTdRow7VW1T8GR75loOpC0ILQAxqBr8NitQ"
            />
          </div>

          <div className="col-span-1 md:col-span-8 border border-black p-8 md:p-12 bg-black text-white flex flex-col justify-center">
            <h2 className="font-['Syne'] text-[32px] md:text-[40px] font-bold text-white mb-8 m-0 leading-tight uppercase">Manifesto</h2>
            <div className="space-y-8">
              <div className="border-b border-white/20 pb-4">
                <span className="font-['JetBrains_Mono'] text-[12px] opacity-60 block mb-2 font-medium">01</span>
                <p className="font-['Syne'] text-[24px] md:text-[32px] font-bold leading-tight m-0 uppercase">Function defines form, always.</p>
              </div>
              <div className="border-b border-white/20 pb-4">
                <span className="font-['JetBrains_Mono'] text-[12px] opacity-60 block mb-2 font-medium">02</span>
                <p className="font-['Syne'] text-[24px] md:text-[32px] font-bold leading-tight m-0 uppercase">Complexity is a debt we refuse to accumulate.</p>
              </div>
              <div>
                <span className="font-['JetBrains_Mono'] text-[12px] opacity-60 block mb-2 font-medium">03</span>
                <p className="font-['Syne'] text-[24px] md:text-[32px] font-bold leading-tight m-0 uppercase">Humanity is served through technical precision.</p>
              </div>
            </div>
          </div>

        </section>

        {/* ── Open Roles Section ── */}
        <section className="mb-32">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-black pb-8 mb-8 gap-4">
            <h2 className="font-['Syne'] text-[clamp(40px,5vw,64px)] leading-[1] font-bold uppercase m-0 text-black">Open Roles</h2>
            <div className="font-['JetBrains_Mono'] text-[12px] font-medium text-[#5d5f5f] mb-2 uppercase tracking-widest">
                {loading ? "SCANNING GRID..." : `AVAILABILITY: ${jobs.length} POSITIONS`}
            </div>
          </div>

          <div className="flex flex-col">
            {loading ? (
                <div className="py-20 text-center">
                    <div className="inline-block w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : jobs.length === 0 ? (
                <div className="py-20 text-center border-b border-black/10">
                    <p className="font-['JetBrains_Mono'] text-[14px] font-bold uppercase tracking-widest text-[#5d5f5f]">No vacancies detected in the current node cycle.</p>
                </div>
            ) : (
                jobs.map((job) => (
                    <Link 
                        key={job._id}
                        to={`/careers/${job.slug}`} 
                        className="group border-b border-black/20 py-8 flex flex-col md:flex-row md:items-center justify-between hover:bg-black hover:text-white transition-all duration-300 px-4 cursor-pointer no-underline"
                    >
                        <div className="flex flex-col gap-3">
                            <h3 className="font-['Syne'] text-[24px] md:text-[32px] font-bold text-black group-hover:text-white m-0 transition-colors uppercase">
                                {job.jobTitle}
                            </h3>
                            <div className="flex gap-4">
                                <span className="font-['JetBrains_Mono'] text-[12px] font-medium text-[#5d5f5f] group-hover:text-white/70 uppercase">
                                    {job.location} / {job.department}
                                </span>
                                <span className="font-['JetBrains_Mono'] text-[12px] font-medium text-[#5d5f5f] group-hover:text-white/70 uppercase">
                                    {job.jobType}
                                </span>
                            </div>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <span className="material-symbols-outlined text-[32px] group-hover:translate-x-2 transition-transform text-black group-hover:text-white">arrow_forward</span>
                        </div>
                    </Link>
                ))
            )}
          </div>
        </section>

        {/* ── CTA Section ── */}
        <section className="border-2 border-black p-12 md:p-16 flex flex-col items-center text-center gap-8 bg-[#f4f3f3]">
          <h2 className="font-['Syne'] text-[clamp(40px,5vw,64px)] font-bold text-black m-0 leading-tight uppercase">Don't see your fit?</h2>
          <p className="font-['Geist'] text-[18px] leading-[1.6] text-[#5d5f5f] max-w-xl m-0">
            We are always looking for exceptional talent. If you believe you can contribute to the VTRC mission, send us your dossier.
          </p>
          <Link to="/application" className="bg-black text-white font-['JetBrains_Mono'] text-[12px] font-bold px-12 py-5 border-2 border-transparent hover:bg-transparent hover:text-black hover:border-black transition-colors duration-300 uppercase tracking-[0.05em] cursor-pointer inline-block no-underline">
            Send Speculative Application
          </Link>
        </section>

      </div>
    </main>
  );
};

export default Careers;
