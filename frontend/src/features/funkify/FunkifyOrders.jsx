import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const SERVER_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const FunkifyOrders = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [checkingAuth, setCheckingAuth] = useState(true);

    // Auth forms (if not logged in)
    const [isLogin, setIsLogin] = useState(true);
    const [authEmail, setAuthEmail] = useState('');
    const [authPassword, setAuthPassword] = useState('');
    const [authName, setAuthName] = useState('');
    const [authError, setAuthError] = useState('');
    const [authLoading, setAuthLoading] = useState(false);

    // Check user auth
    const checkUserAuth = async () => {
        try {
            const res = await axios.get(`${SERVER_URL}/api/auth/profile`, { withCredentials: true });
            if (res.data.success) {
                setUser(res.data.user);
                // Load orders directly if user is logged in
                fetchUserOrders();
            } else {
                setLoading(false);
            }
        } catch (err) {
            setUser(null);
            setLoading(false);
        } finally {
            setCheckingAuth(false);
        }
    };

    // Fetch orders
    const fetchUserOrders = async () => {
        try {
            const res = await axios.get(`${SERVER_URL}/api/funkify/orders/me`, { withCredentials: true });
            if (res.data.success) {
                setOrders(res.data.data);
            }
        } catch (err) {
            console.error("Error fetching orders", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkUserAuth();
    }, []);

    // Handle Auth Submit
    const handleAuthSubmit = async (e) => {
        e.preventDefault();
        setAuthError('');
        setAuthLoading(true);

        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
        const payload = isLogin 
            ? { email: authEmail, password: authPassword }
            : { name: authName, email: authEmail, password: authPassword };

        try {
            const res = await axios.post(`${SERVER_URL}${endpoint}`, payload, { withCredentials: true });
            if (res.data.success) {
                setUser(res.data.user);
                // Immediately load their orders
                setLoading(true);
                const ordersRes = await axios.get(`${SERVER_URL}/api/funkify/orders/me`, { withCredentials: true });
                if (ordersRes.data.success) {
                    setOrders(ordersRes.data.data);
                }
            }
        } catch (err) {
            setAuthError(err.response?.data?.message || "Authentication failed.");
        } finally {
            setAuthLoading(false);
            setLoading(false);
        }
    };

    // Helper to get status colors
    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return 'text-green-400 border-green-500/20 bg-green-500/5';
            case 'Pending': return 'text-amber-400 border-amber-500/20 bg-amber-500/5';
            case 'Failed': return 'text-red-400 border-red-500/20 bg-red-500/5';
            default: return 'text-white/60 border-white/10 bg-white/5';
        }
    };

    const getOrderStatusText = (status) => {
        switch (status) {
            case 'Processing': return 'In Production';
            case 'Shipped': return 'Dispatched & Shipping';
            case 'Delivered': return 'Handed Over / Delivered';
            default: return 'Order Confirmed';
        }
    };

    if (checkingAuth || loading) {
        return (
            <div className="min-h-screen bg-black flex justify-center items-center">
                <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <section className="bg-black text-white min-h-screen pt-32 pb-24 px-5 md:px-16 overflow-hidden">
            <div className="max-w-[1000px] mx-auto">
                <AnimatePresence mode="wait">
                    {!user ? (
                        // Not Logged In screen
                        <motion.div
                            key="auth-view"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            className="max-w-[500px] mx-auto bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md relative"
                        >
                            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full blur-2xl pointer-events-none"></div>

                            <div className="flex gap-4 border-b border-white/10 pb-6 mb-8">
                                <button 
                                    onClick={() => { setIsLogin(true); setAuthError(''); }}
                                    className={`font-['Syne'] text-[18px] font-bold uppercase pb-2 border-b-2 transition-all ${isLogin ? 'border-white text-white' : 'border-transparent text-white/40'}`}
                                >
                                    Login
                                </button>
                                <button 
                                    onClick={() => { setIsLogin(false); setAuthError(''); }}
                                    className={`font-['Syne'] text-[18px] font-bold uppercase pb-2 border-b-2 transition-all ${!isLogin ? 'border-white text-white' : 'border-transparent text-white/40'}`}
                                >
                                    Register
                                </button>
                            </div>

                            <h2 className="font-['Syne'] text-[24px] font-extrabold uppercase mb-2">Track Orders</h2>
                            <p className="font-['Geist'] text-[14px] text-white/55 mb-6">
                                Please sign in to verify identity and inspect your design order nodes and delivery status.
                            </p>

                            <form onSubmit={handleAuthSubmit} className="flex flex-col gap-4">
                                {!isLogin && (
                                    <div className="flex flex-col gap-2">
                                        <label className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider text-white/50">Full Name</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={authName}
                                            onChange={(e) => setAuthName(e.target.value)}
                                            placeholder="Enter name"
                                            className="bg-white/5 border border-white/10 p-4 rounded-xl text-white font-['Geist'] focus:outline-none focus:border-white transition-colors"
                                        />
                                    </div>
                                )}

                                <div className="flex flex-col gap-2">
                                    <label className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider text-white/50">Email Address</label>
                                    <input 
                                        type="email" 
                                        required
                                        value={authEmail}
                                        onChange={(e) => setAuthEmail(e.target.value)}
                                        placeholder="operator@organization.com"
                                        className="bg-white/5 border border-white/10 p-4 rounded-xl text-white font-['Geist'] focus:outline-none focus:border-white transition-colors"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider text-white/50">Password</label>
                                    <input 
                                        type="password" 
                                        required
                                        value={authPassword}
                                        onChange={(e) => setAuthPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="bg-white/5 border border-white/10 p-4 rounded-xl text-white font-['Geist'] focus:outline-none focus:border-white transition-colors"
                                    />
                                </div>

                                {authError && (
                                    <p className="text-red-400 font-['Geist'] text-[13px] mt-2 bg-red-950/20 border border-red-500/30 p-3 rounded-lg">
                                        {authError}
                                    </p>
                                )}

                                <button 
                                    type="submit" 
                                    disabled={authLoading}
                                    className="w-full bg-white text-black font-['JetBrains_Mono'] text-[14px] font-bold uppercase py-4 rounded-xl mt-4 hover:scale-[1.01] transition-transform"
                                >
                                    {authLoading ? 'Signing In...' : 'Verify Identity'}
                                </button>
                            </form>
                        </motion.div>
                    ) : (
                        // Orders List View
                        <motion.div
                            key="orders-view"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            className="flex flex-col gap-12"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-end border-b border-white/10 pb-8">
                                <div>
                                    <h1 className="font-['Syne'] text-[36px] font-extrabold uppercase tracking-tight">Your Orders</h1>
                                    <p className="font-['Geist'] text-[15px] text-white/50">Tracking all design commissions for {user.name}.</p>
                                </div>
                                <Link 
                                    to="/funkify"
                                    className="border border-white/20 hover:bg-white hover:text-black font-['JetBrains_Mono'] text-[12px] font-bold uppercase tracking-wider px-6 py-3 rounded-full transition-colors"
                                >
                                    Return to Studio
                                </Link>
                            </div>

                            {/* Orders */}
                            {orders.length === 0 ? (
                                <div className="text-center py-20 border-2 border-dashed border-white/10 rounded-3xl bg-white/5">
                                    <span className="material-symbols-outlined text-[48px] text-white/20 mb-4">shopping_bag</span>
                                    <h3 className="font-['Syne'] text-[20px] font-bold uppercase mb-2">No active orders found</h3>
                                    <p className="font-['Geist'] text-[14px] text-white/40 mb-8 max-w-sm mx-auto">
                                        You haven't commissioned any custom product design orders in this sequence cycle yet.
                                    </p>
                                    <Link 
                                        to="/funkify"
                                        className="bg-white text-black font-['JetBrains_Mono'] text-[13px] font-bold uppercase tracking-widest px-8 py-4 hover:scale-105 transition-transform inline-block"
                                    >
                                        Create Custom Design
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-8">
                                    {orders.map((order) => (
                                        <div 
                                            key={order._id}
                                            className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-8 backdrop-blur-md relative overflow-hidden group"
                                        >
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/5 to-transparent rounded-full pointer-events-none"></div>

                                            {/* Left: Preview Image */}
                                            <div className="w-full md:w-[220px] aspect-square bg-[#f0f0f0] rounded-2xl border border-white/15 overflow-hidden flex items-center justify-center shrink-0">
                                                {order.design?.previewImage ? (
                                                    <img 
                                                        src={order.design.previewImage} 
                                                        alt="Commissioned Design" 
                                                        className="w-full h-full object-contain"
                                                    />
                                                ) : (
                                                    <span className="font-['JetBrains_Mono'] text-[10px] text-black/50">NO_VISUAL_DATA</span>
                                                )}
                                            </div>

                                            {/* Right: Info */}
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>
                                                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                                                        <div>
                                                            <span className="font-['JetBrains_Mono'] text-[11px] text-white/40 uppercase block">Order ID</span>
                                                            <span className="font-['JetBrains_Mono'] text-[12px] font-bold uppercase tracking-wider">{order._id.substring(order._id.length - 8)}</span>
                                                        </div>
                                                        <div>
                                                            <span className="font-['JetBrains_Mono'] text-[11px] text-white/40 uppercase block text-right">Commissioned Date</span>
                                                            <span className="font-['Geist'] text-[13px] text-white/80">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                                        </div>
                                                    </div>

                                                    <h3 className="font-['Syne'] text-[22px] font-bold uppercase tracking-tight mb-2 text-white">
                                                        {order.design?.product?.name || "Custom Printed Product"}
                                                    </h3>
                                                    
                                                    <div className="flex flex-wrap gap-3 mb-6">
                                                        <span className={`font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider border px-3 py-1 rounded-full ${getStatusColor(order.paymentStatus)}`}>
                                                            Payment: {order.paymentStatus}
                                                        </span>
                                                        <span className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider border border-white/15 bg-white/5 text-white/80 px-3 py-1 rounded-full">
                                                            Status: {getOrderStatusText(order.orderStatus)}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="border-t border-white/10 pt-4 flex flex-col md:flex-row md:items-end justify-between gap-6">
                                                    <div>
                                                        <span className="font-['JetBrains_Mono'] text-[10px] text-white/40 uppercase tracking-widest block mb-1">Destination node</span>
                                                        <p className="font-['Geist'] text-[12px] text-white/60 max-w-md line-clamp-2 leading-relaxed">
                                                            {order.shippingAddress}
                                                        </p>
                                                    </div>
                                                    <div className="text-right shrink-0">
                                                        <span className="font-['JetBrains_Mono'] text-[10px] text-white/40 uppercase block">Amount Paid</span>
                                                        <span className="font-['Syne'] text-[24px] font-black">₹{order.amount}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default FunkifyOrders;
