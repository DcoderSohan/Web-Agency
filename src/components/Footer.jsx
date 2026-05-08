import React from 'react';
import { motion } from 'framer-motion';
import { FiInstagram, FiTwitter, FiLinkedin, FiFacebook, FiYoutube, FiArrowUpRight, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        company: [
            { name: 'Home', path: '/' },
            { name: 'About Us', path: '/about-us' },
            { name: 'Portfolio', path: '/portfolio' },
            { name: 'Services', path: '/services' },
            { name: 'Contact', path: '/contact-us' }
        ],
        services: [
            { name: 'Web Development', path: '#' },
            { name: 'UI/UX Design', path: '#' },
            { name: 'Enterprise Solutions', path: '#' },
            { name: 'Digital Marketing', path: '#' },
            { name: 'SEO Optimization', path: '#' }
        ]
    };

    return (
        <footer className="bg-black text-white relative overflow-hidden">
            {/* ── 1. THE MAP SECTION (Integrated) ── */}
            <div className="relative h-[350px] w-full grayscale invert brightness-[0.6] contrast-[1.1] border-b border-white/05">
                <iframe
                    title="VTRC Location"
                    src="https://www.google.com/maps/place/Shree+Vitthal+Rakhumai+Mandir,+Amberkarwadi/@16.8100055,73.3386096,550m/data=!3m1!1e3!4m6!3m5!1s0x3bea717523ce896f:0x7d2fb257f2b9cc4d!8m2!3d16.8103125!4d73.3383125!16s%2Fg%2F11j92c70nc?entry=ttu"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
                {/* ── 2. MAIN GRID ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">

                    {/* Brand Info */}
                    <div className="lg:col-span-1">
                        <h3 className="text-xl font-black tracking-tighter mb-6 uppercase" style={{ fontFamily: 'Orbitron, sans-serif' }}>VTRC</h3>
                        <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-xs">
                            Architecting digital legacies through precision engineering and high-end design. We kill the ordinary.
                        </p>
                        <div className="flex gap-4">
                            {[FiFacebook, FiTwitter, FiInstagram, FiLinkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-all">
                                    <Icon size={14} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 mb-8">Navigation</h4>
                        <ul className="space-y-4">
                            {footerLinks.company.map(link => (
                                <li key={link.name}>
                                    <Link to={link.path} className="text-sm text-white/40 hover:text-white transition-colors inline-flex items-center group">
                                        {link.name} <FiArrowUpRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 mb-8">Capabilities</h4>
                        <ul className="space-y-4">
                            {footerLinks.services.map(link => (
                                <li key={link.name}>
                                    <a href={link.path} className="text-sm text-white/40 hover:text-white transition-colors">{link.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 mb-8">Connect</h4>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <FiMail className="text-white/40 mt-1" />
                                <div>
                                    <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Email</p>
                                    <p className="text-sm">hello@vtrc.tech</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <FiMapPin className="text-white/40 mt-1" />
                                <div>
                                    <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Office</p>
                                    <p className="text-sm">Manhattan, NYC</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── 3. LEGAL & COPYRIGHT ── */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/05 gap-8">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/20">
                        © {currentYear} VTRC Technologies. All rights reserved.
                    </p>
                    <div className="flex gap-8">
                        <a href="#" className="text-[10px] uppercase tracking-[0.3em] text-white/20 hover:text-white">Privacy</a>
                        <a href="#" className="text-[10px] uppercase tracking-[0.3em] text-white/20 hover:text-white">Terms</a>
                    </div>
                </div>
            </div>

            {/* ── 4. MASSIVE SIGNATURE ── */}
            <div className="relative select-none pointer-events-none mt-12 mb-[-2vw]">
                <h2
                    className="text-[20vw] font-black leading-none tracking-tighter text-center uppercase text-white/05"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                    VTRC
                </h2>
                <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 overflow-hidden whitespace-nowrap">
                    <motion.div
                        animate={{ x: [0, -1000] }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="text-[5vw] font-black uppercase text-white/10 flex gap-20"
                    >
                        <span>VTRC TECHNOLOGIES</span>
                        <span>VTRC TECHNOLOGIES</span>
                        <span>VTRC TECHNOLOGIES</span>
                        <span>VTRC TECHNOLOGIES</span>
                    </motion.div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;