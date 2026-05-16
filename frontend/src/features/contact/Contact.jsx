import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Easily change the map location here
  const mapConfig = {
    lat: 16.8103151,
    lng: 73.3370135,
    name: "RATNAGIRI, MAHARASHTRA"
  };

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/inquiries`, formData);
      if (response.data.success) {
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#faf9f9] text-[#1a1c1c] min-h-screen overflow-x-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-5 md:px-16 pt-12 md:pt-24 pb-24">

        {/* ── HERO SECTION ── */}
        <section className="mb-24">
          <h1 className="font-['Syne'] text-[clamp(40px,8vw,120px)] leading-[0.9] tracking-[-0.04em] font-extrabold text-black mb-12 break-words m-0 uppercase">
            SAY HELLO
          </h1>
          <div className="grid grid-cols-12 gap-6 border-t-2 border-black pt-8">
            <div className="col-span-12 md:col-span-6">
              <p className="font-['Geist'] text-[18px] leading-[1.6] text-[#5d5f5f] max-w-lg m-0">
                We partner with ambitious organizations to build resilient digital infrastructure. Let's discuss your next engineering challenge.
              </p>
            </div>
            <div className="col-span-12 md:col-span-6 flex justify-start md:justify-end items-end mt-4 md:mt-0">
              <div className="font-['JetBrains_Mono'] text-[12px] font-medium text-black border border-black px-4 py-2 uppercase tracking-widest">
                Availability: Q4 2024
              </div>
            </div>
          </div>
        </section>

        {/* ── Main Content Cluster (Bento Layout) ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">

          {/* Contact Form Section */}
          <section className="md:col-span-8 border-2 border-black p-6 md:p-8 bg-white">
            {success ? (
              <div className="py-20 text-center">
                <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-8">
                  <span className="material-symbols-outlined text-[40px]">check</span>
                </div>
                <h2 className="font-['Syne'] text-[32px] font-bold uppercase mb-4">Transmission Received</h2>
                <p className="font-['Geist'] text-[18px] text-[#5d5f5f] mb-12">Our operators will process your brief and respond within 24 standard cycles.</p>
                <button
                  onClick={() => setSuccess(false)}
                  className="bg-black text-white px-10 py-4 font-['JetBrains_Mono'] text-[14px] font-bold uppercase tracking-widest border-2 border-black hover:bg-transparent hover:text-black transition-all"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form className="space-y-12" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-['JetBrains_Mono'] text-[12px] font-medium uppercase text-[#5d5f5f]">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="ALEX RIVERA"
                      className="w-full bg-transparent border-t-0 border-x-0 border-b-2 border-black py-4 font-['Syne'] text-[24px] md:text-[32px] font-bold text-black placeholder-black/20 focus:outline-none focus:border-b-4 focus:ring-0 transition-all rounded-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-['JetBrains_Mono'] text-[12px] font-medium uppercase text-[#5d5f5f]">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ALEX@COMPANY.IO"
                      className="w-full bg-transparent border-t-0 border-x-0 border-b-2 border-black py-4 font-['Syne'] text-[24px] md:text-[32px] font-bold text-black placeholder-black/20 focus:outline-none focus:border-b-4 focus:ring-0 transition-all rounded-none"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-['JetBrains_Mono'] text-[12px] font-medium uppercase text-[#5d5f5f]">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-transparent border-t-0 border-x-0 border-b-2 border-black py-4 font-['Syne'] text-[24px] md:text-[32px] font-bold text-black placeholder-black/20 focus:outline-none focus:border-b-4 focus:ring-0 transition-all rounded-none"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-['JetBrains_Mono'] text-[12px] font-medium uppercase text-[#5d5f5f]">Project Details</label>
                  <textarea
                    rows="4"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="DESCRIBE YOUR SYSTEM ARCHITECTURE NEEDS..."
                    className="w-full bg-transparent border-t-0 border-x-0 border-b-2 border-black py-4 font-['Geist'] text-[18px] text-black placeholder-black/20 focus:outline-none focus:border-b-4 focus:ring-0 resize-none break-words transition-all rounded-none"
                  ></textarea>
                </div>

                {error && (
                  <p className="font-['JetBrains_Mono'] text-[12px] text-red-600 font-bold uppercase tracking-widest">{error}</p>
                )}

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-8">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="nda"
                      className="w-6 h-6 border-2 border-black rounded-none checked:bg-black focus:ring-0 cursor-pointer appearance-none checked:after:content-['✓'] checked:after:text-white flex items-center justify-center text-sm font-bold"
                    />
                    <label htmlFor="nda" className="font-['JetBrains_Mono'] text-[12px] font-medium uppercase text-black cursor-pointer">Request NDA</label>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full md:w-auto bg-black text-white font-['Syne'] text-[20px] md:text-[24px] font-bold px-12 py-5 border-2 border-black transition-colors duration-300 hover:bg-transparent hover:text-black flex items-center justify-center gap-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'SENDING...' : 'SEND BRIEF'}
                    <span className="material-symbols-outlined text-[24px]">arrow_forward</span>
                  </button>
                </div>
              </form>
            )}
          </section>

          {/* Sidebar Info Section */}
          <aside className="md:col-span-4 space-y-6">

            {/* Location Box */}
            <div className="border-2 border-black p-6 md:p-8 bg-[#f4f3f3]">
              <h3 className="font-['JetBrains_Mono'] text-[12px] font-medium uppercase text-[#5d5f5f] mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">location_on</span>
                Global Headquarters
              </h3>
              <address className="not-italic font-['Syne'] text-[20px] md:text-[24px] font-bold leading-tight text-black break-words m-0">
                Ratnagiri<br />
                Maharashtra<br />
                415612
              </address>
              <div className="mt-8 pt-8 border-t border-black/20">
                <img
                  alt="HQ Building"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsZA6Yb7hO6LwJtKuuXH7L982AXEBD2EJQg-AQJ120KmC3R3oDnM7lOY2EoGKG3fx9oOv4MUc6TgNY8l3p4-SvTzUUQUiWcHDrUY0ewVcV1wk2z5yb7Lrm8RyVffBda8PpRMq86clqBIyepm_Hn_08KGNFoUs0OAf-T-PnxDLvceVBCVU6EXJssPm_qRGN5j86z7ogMmZnvEh7tFg9FgME3zL56pV6EfPzPluZx6mgskjeaR7hAqyWioq8gmkcN_Ua3NO3JhYsTg"
                  className="w-full grayscale h-48 object-cover border border-black"
                />
              </div>
            </div>

            {/* Connect Box */}
            <div className="border-2 border-black p-6 md:p-8 bg-black text-white">
              <h3 className="font-['JetBrains_Mono'] text-[12px] font-medium uppercase opacity-60 mb-6 flex items-center gap-2 text-white">
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>alternate_email</span>
                Connect
              </h3>
              <ul className="flex flex-wrap gap-x-6 gap-y-4 list-none p-0 m-0">
                <li>
                  <a href="#" className="font-['Syne'] text-[18px] font-bold text-white no-underline hover:underline flex items-center gap-1 group">
                    LINKEDIN <span className="material-symbols-outlined opacity-0 group-hover:opacity-100 transition-opacity text-[18px]">north_east</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="font-['Syne'] text-[18px] font-bold text-white no-underline hover:underline flex items-center gap-1 group">
                    GITHUB <span className="material-symbols-outlined opacity-0 group-hover:opacity-100 transition-opacity text-[18px]">north_east</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="font-['Syne'] text-[18px] font-bold text-white no-underline hover:underline flex items-center gap-1 group">
                    TWITTER / X <span className="material-symbols-outlined opacity-0 group-hover:opacity-100 transition-opacity text-[18px]">north_east</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Direct Contact */}
            <div className="border-2 border-black p-6 md:p-8 bg-white flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
              <h3 className="font-['JetBrains_Mono'] text-[12px] font-medium uppercase text-[#5d5f5f] m-0">Direct Inquiry</h3>
              <p className="font-['Syne'] text-[18px] md:text-[20px] font-bold text-black select-all m-0 break-all">hello@vtrc.tech</p>
            </div>

          </aside>
        </div>

        {/* ── Featured Map Section ── */}
        <section className="mt-24 border-2 border-black overflow-hidden relative group">
          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
          <div className="w-full h-[400px] bg-[#e3e2e2] flex items-center justify-center relative">
            <iframe
              src={`https://maps.google.com/maps?q=${mapConfig.lat},${mapConfig.lng}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
              className="w-full h-full border-0 grayscale opacity-80"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Washington DC Map"
            ></iframe>
            <div className="absolute z-20 top-6 left-6 bg-black text-white p-4 border border-white">
              <p className="font-['JetBrains_Mono'] text-[12px] font-medium whitespace-normal m-0 uppercase tracking-widest">
                {mapConfig.name} // {Math.abs(mapConfig.lat)}° {mapConfig.lat >= 0 ? 'N' : 'S'}, {Math.abs(mapConfig.lng)}° {mapConfig.lng >= 0 ? 'E' : 'W'}
              </p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
};

export default Contact;
