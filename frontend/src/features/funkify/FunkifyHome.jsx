import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const FunkifyHome = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`${SERVER_URL}/api/funkify/products`);
                if (res.data.success) {
                    setProducts(res.data.data);
                }
            } catch (err) {
                console.error("Failed to load products", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <section className="bg-black text-white min-h-screen pt-32 pb-24 px-5 md:px-16 overflow-hidden">
            <div className="max-w-[1440px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-20"
                >
                    <h1 className="font-['Syne'] text-[clamp(40px,6vw,90px)] font-extrabold uppercase leading-[0.9] tracking-[-0.03em] mb-6">
                        Funkify <span className="text-white/40">It</span>
                    </h1>
                    <p className="font-['Geist'] text-[18px] md:text-[22px] text-white/60 max-w-[600px] mx-auto">
                        Your imagination, our canvas. Design premium products in real-time and we'll ship them straight to your door.
                    </p>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {products.map((product, idx) => (
                            <motion.div
                                key={product._id}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="group relative border-2 border-white/10 bg-white/5 rounded-2xl overflow-hidden backdrop-blur-sm transition-colors hover:border-white/30"
                            >
                                <div className="aspect-[4/3] overflow-hidden bg-white/5">
                                    <img 
                                        src={product.baseImage} 
                                        alt={product.name}
                                        className="w-full h-full object-cover mix-blend-overlay opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                                    />
                                </div>
                                <div className="p-8">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-['Syne'] text-[24px] md:text-[28px] font-bold uppercase mb-2">
                                                {product.name}
                                            </h3>
                                            <span className="font-['JetBrains_Mono'] text-[12px] uppercase tracking-widest text-white/50 border border-white/20 px-3 py-1 rounded-full">
                                                {product.category}
                                            </span>
                                        </div>
                                        <p className="font-['Syne'] text-[24px] font-bold">
                                            ₹{product.price}
                                        </p>
                                    </div>
                                    <p className="font-['Geist'] text-[15px] text-white/60 mb-8 line-clamp-2">
                                        {product.description}
                                    </p>
                                    
                                    <Link 
                                        to={`/funkify/editor/${product._id}`}
                                        className="block w-full text-center bg-white text-black font-['JetBrains_Mono'] text-[14px] font-bold uppercase tracking-widest py-4 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        Start Designing
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default FunkifyHome;
