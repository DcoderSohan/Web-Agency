import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const SERVER_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const FunkifyCheckout = () => {
    const [searchParams] = useSearchParams();
    const designId = searchParams.get('designId');
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [design, setDesign] = useState(null);
    const [loading, setLoading] = useState(true);
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [processingOrder, setProcessingOrder] = useState(false);

    // Auth forms
    const [isLogin, setIsLogin] = useState(true);
    const [authEmail, setAuthEmail] = useState('');
    const [authPassword, setAuthPassword] = useState('');
    const [authName, setAuthName] = useState('');
    const [authError, setAuthError] = useState('');
    const [authLoading, setAuthLoading] = useState(false);

    // Shipping Form
    const [shipping, setShipping] = useState({
        name: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        pinCode: '',
        phone: ''
    });

    // Cached preview from sessionStorage (fallback)
    const [cachedPreview, setCachedPreview] = useState(null);

    useEffect(() => {
        try {
            const preview = sessionStorage.getItem('funkify_preview');
            if (preview) setCachedPreview(preview);
        } catch (_) {}
    }, []);

    // Check Authentication on Mount
    const checkUserAuth = async () => {
        try {
            const res = await axios.get(`${SERVER_URL}/api/auth/profile`, { withCredentials: true });
            if (res.data.success) {
                setUser(res.data.user);
                setShipping(prev => ({ ...prev, name: res.data.user.name }));
            }
        } catch (err) {
            setUser(null);
        } finally {
            setCheckingAuth(false);
        }
    };

    // Fetch saved design
    const fetchDesignDetails = async () => {
        if (!designId) {
            alert("No design identifier found. Returning to studio.");
            navigate('/funkify');
            return;
        }
        try {
            const res = await axios.get(`${SERVER_URL}/api/funkify/designs/${designId}`);
            if (res.data.success) {
                setDesign(res.data.data);
            } else {
                alert("Design not found.");
                navigate('/funkify');
            }
        } catch (err) {
            console.error("Error loading design", err);
            alert("Error loading your customized design.");
            navigate('/funkify');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkUserAuth();
        fetchDesignDetails();
    }, [designId]);

    // Handle Authentication Submit
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
                setShipping(prev => ({ ...prev, name: res.data.user.name }));
            }
        } catch (err) {
            setAuthError(err.response?.data?.message || "Authentication failed. Try again.");
        } finally {
            setAuthLoading(false);
        }
    };

    // Load Razorpay Script Dynamically
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            if (window.Razorpay) return resolve(true);
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    // Handle Payment (Real Razorpay or Mock)
    const handlePayment = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!shipping.name || !shipping.addressLine1 || !shipping.city || !shipping.state || !shipping.pinCode || !shipping.phone) {
            alert("Please fill all required shipping information.");
            return;
        }

        setProcessingOrder(true);

        try {
            const fullAddress = `${shipping.name}, ${shipping.addressLine1}${shipping.addressLine2 ? ', ' + shipping.addressLine2 : ''}, ${shipping.city}, ${shipping.state} - ${shipping.pinCode}. Phone: ${shipping.phone}`;

            // 1. Create order in Backend
            const res = await axios.post(`${SERVER_URL}/api/funkify/orders/create`, {
                designId: design._id,
                shippingAddress: fullAddress,
                amount: design.product.price
            }, { withCredentials: true });

            if (!res.data.success) {
                throw new Error(res.data.message || "Failed to create order");
            }

            const { order, razorpayOrder } = res.data.data;
            const paymentMode = res.data.mode; // 'razorpay' or 'mock'

            if (paymentMode === 'razorpay') {
                // Real Razorpay Payment Flow
                const isLoaded = await loadRazorpayScript();
                if (!isLoaded) {
                    alert("Razorpay SDK failed to load. Falling back to mock payment.");
                    await handleMockPayment(order._id);
                    return;
                }

                const options = {
                    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                    amount: razorpayOrder.amount,
                    currency: razorpayOrder.currency,
                    name: "VTRC Technologies",
                    description: `Funkify It Order: ${design.product.name}`,
                    order_id: razorpayOrder.id,
                    handler: async function (response) {
                        try {
                            const verifyRes = await axios.post(`${SERVER_URL}/api/funkify/orders/verify`, {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                orderId: order._id
                            }, { withCredentials: true });

                            if (verifyRes.data.success) {
                                sessionStorage.removeItem('funkify_preview');
                                navigate('/funkify/orders');
                            } else {
                                alert("Payment verification failed.");
                            }
                        } catch (verifyErr) {
                            console.error("Verification error", verifyErr);
                            alert("Error verifying payment transaction.");
                        } finally {
                            setProcessingOrder(false);
                        }
                    },
                    prefill: {
                        name: user.name,
                        email: user.email,
                        contact: shipping.phone
                    },
                    theme: { color: "#000000" },
                    modal: {
                        ondismiss: () => setProcessingOrder(false)
                    }
                };

                const rzp = new window.Razorpay(options);
                rzp.open();

            } else {
                // Mock Payment Flow
                await handleMockPayment(order._id);
            }

        } catch (err) {
            console.error("Order payment setup error", err);
            alert(err.response?.data?.message || "Error setting up order payment. Please try again.");
            setProcessingOrder(false);
        }
    };

    // Mock Payment Handler
    const handleMockPayment = async (orderId) => {
        try {
            // Simulate a brief payment processing delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            const verifyRes = await axios.post(`${SERVER_URL}/api/funkify/orders/mock-verify`, {
                orderId
            }, { withCredentials: true });

            if (verifyRes.data.success) {
                sessionStorage.removeItem('funkify_preview');
                navigate('/funkify/orders');
            } else {
                alert("Mock payment verification failed.");
            }
        } catch (err) {
            console.error("Mock payment error:", err);
            alert("Error processing mock payment.");
        } finally {
            setProcessingOrder(false);
        }
    };

    // Get preview image source (Cloudinary URL or sessionStorage fallback)
    const getPreviewSrc = () => {
        if (design?.previewImage) {
            // Check if it's a data URL (base64) or a Cloudinary URL
            if (design.previewImage.startsWith('data:') || design.previewImage.startsWith('http')) {
                return design.previewImage;
            }
        }
        // Fallback to cached session preview
        return cachedPreview || null;
    };

    if (loading || checkingAuth) {
        return (
            <div className="min-h-screen bg-black flex justify-center items-center">
                <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const previewSrc = getPreviewSrc();

    return (
        <section className="bg-black text-white min-h-screen pt-32 pb-24 px-5 md:px-16 overflow-hidden">
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Left Side: Order Checkout & Auth */}
                <div className="lg:col-span-7 flex flex-col gap-8">
                    <AnimatePresence mode="wait">
                        {!user ? (
                            // Auth State
                            <motion.div
                                key="auth-box"
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 30 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md relative"
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
                                        Create Account
                                    </button>
                                </div>

                                <h2 className="font-['Syne'] text-[24px] font-extrabold uppercase mb-2 tracking-tight">
                                    {isLogin ? 'Unlock Checkout' : 'Register Secure Account'}
                                </h2>
                                <p className="font-['Geist'] text-[14px] text-white/55 mb-6">
                                    {isLogin ? 'Please log in to finalize your custom product design order.' : 'Create a secure agency account to process payments and track shipment progress.'}
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
                                                placeholder="e.g. John Doe"
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
                                        className="w-full bg-white text-black font-['JetBrains_Mono'] text-[14px] font-bold uppercase py-4 rounded-xl mt-4 hover:scale-[1.01] transition-transform active:scale-[0.99] disabled:opacity-50"
                                    >
                                        {authLoading ? 'Authorizing...' : isLogin ? 'Sign In & Proceed' : 'Register & Proceed'}
                                    </button>
                                </form>
                            </motion.div>
                        ) : (
                            // Checkout State (Shipping Address Form)
                            <motion.div
                                key="checkout-box"
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 30 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md"
                            >
                                <div className="flex justify-between items-center border-b border-white/10 pb-6 mb-8">
                                    <div>
                                        <span className="font-['JetBrains_Mono'] text-[10px] text-green-400 uppercase tracking-widest border border-green-500/20 px-2 py-0.5 rounded bg-green-500/5">Authenticated</span>
                                        <h2 className="font-['Syne'] text-[24px] font-extrabold uppercase mt-2">Shipping Information</h2>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-['Geist'] text-[14px] text-white/50">Operator</p>
                                        <p className="font-['JetBrains_Mono'] text-[12px] font-bold">{user.name}</p>
                                    </div>
                                </div>

                                {/* Mock Payment Notice */}
                                <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl mb-6 flex items-start gap-3">
                                    <span className="material-symbols-outlined text-yellow-400 text-[20px] mt-0.5">info</span>
                                    <p className="font-['Geist'] text-[13px] text-yellow-200/80 leading-relaxed">
                                        <strong>Demo Mode:</strong> Payment is simulated. No real charges will be made. Your order will be processed instantly.
                                    </p>
                                </div>

                                <form onSubmit={handlePayment} className="flex flex-col gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider text-white/50">Recipient Name *</label>
                                        <input
                                            type="text"
                                            required
                                            value={shipping.name}
                                            onChange={(e) => setShipping({ ...shipping, name: e.target.value })}
                                            placeholder="Enter recipient's name"
                                            className="bg-white/5 border border-white/10 p-4 rounded-xl text-white font-['Geist'] focus:outline-none focus:border-white transition-colors"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider text-white/50">Street Address *</label>
                                        <input
                                            type="text"
                                            required
                                            value={shipping.addressLine1}
                                            onChange={(e) => setShipping({ ...shipping, addressLine1: e.target.value })}
                                            placeholder="House No, Building, Street, Area"
                                            className="bg-white/5 border border-white/10 p-4 rounded-xl text-white font-['Geist'] focus:outline-none focus:border-white transition-colors mb-2"
                                        />
                                        <input
                                            type="text"
                                            value={shipping.addressLine2}
                                            onChange={(e) => setShipping({ ...shipping, addressLine2: e.target.value })}
                                            placeholder="Apartment, Landmark, Suite (Optional)"
                                            className="bg-white/5 border border-white/10 p-4 rounded-xl text-white font-['Geist'] focus:outline-none focus:border-white transition-colors"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-2">
                                            <label className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider text-white/50">City *</label>
                                            <input
                                                type="text"
                                                required
                                                value={shipping.city}
                                                onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                                                placeholder="e.g. Mumbai"
                                                className="bg-white/5 border border-white/10 p-4 rounded-xl text-white font-['Geist'] focus:outline-none focus:border-white transition-colors"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider text-white/50">State / Region *</label>
                                            <input
                                                type="text"
                                                required
                                                value={shipping.state}
                                                onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                                                placeholder="e.g. Maharashtra"
                                                className="bg-white/5 border border-white/10 p-4 rounded-xl text-white font-['Geist'] focus:outline-none focus:border-white transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-2">
                                            <label className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider text-white/50">Pin / Postal Code *</label>
                                            <input
                                                type="text"
                                                required
                                                value={shipping.pinCode}
                                                onChange={(e) => setShipping({ ...shipping, pinCode: e.target.value })}
                                                placeholder="e.g. 400001"
                                                className="bg-white/5 border border-white/10 p-4 rounded-xl text-white font-['Geist'] focus:outline-none focus:border-white transition-colors"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider text-white/50">Phone Number *</label>
                                            <input
                                                type="tel"
                                                required
                                                value={shipping.phone}
                                                onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
                                                placeholder="10-digit mobile number"
                                                className="bg-white/5 border border-white/10 p-4 rounded-xl text-white font-['Geist'] focus:outline-none focus:border-white transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processingOrder}
                                        className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-['JetBrains_Mono'] text-[15px] font-bold uppercase py-5 rounded-xl mt-4 hover:scale-[1.01] transition-transform active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-3 shadow-lg shadow-green-500/20"
                                    >
                                        {processingOrder ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Processing Payment...
                                            </>
                                        ) : (
                                            <>
                                                <span className="material-symbols-outlined text-[20px]">shopping_cart_checkout</span>
                                                Place Order & Pay (₹{design?.product?.price})
                                            </>
                                        )}
                                    </button>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Side: Design Details & Summary */}
                <div className="lg:col-span-5">
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sticky top-32 flex flex-col gap-6 backdrop-blur-md">
                        <h3 className="font-['Syne'] text-[18px] font-bold uppercase border-b border-white/10 pb-4">Order Summary</h3>

                        <div className="aspect-square bg-[#111] rounded-2xl overflow-hidden border border-white/10 relative shadow-inner">
                            {previewSrc ? (
                                <img
                                    src={previewSrc}
                                    alt="Custom Design Preview"
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-white/30 gap-3">
                                    <span className="material-symbols-outlined text-[48px]">image</span>
                                    <span className="font-['JetBrains_Mono'] text-[12px]">Preview loading...</span>
                                </div>
                            )}
                            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full text-[10px] font-['JetBrains_Mono'] uppercase tracking-widest text-white/80">
                                Customized Design Preview
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <span className="font-['JetBrains_Mono'] text-[11px] uppercase text-white/40 tracking-wider">Product Selection</span>
                            <h4 className="font-['Syne'] text-[20px] font-bold uppercase text-white">{design?.product?.name}</h4>
                            <p className="font-['Geist'] text-[14px] text-white/55">{design?.product?.description}</p>
                        </div>

                        <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
                            <div className="flex justify-between items-center text-[14px] font-['Geist']">
                                <span className="text-white/60">Base Price</span>
                                <span>₹{design?.product?.price}</span>
                            </div>
                            <div className="flex justify-between items-center text-[14px] font-['Geist']">
                                <span className="text-white/60">Custom Printing</span>
                                <span className="text-green-400 font-bold uppercase tracking-wider text-[11px]">Free Included</span>
                            </div>
                            <div className="flex justify-between items-center text-[14px] font-['Geist']">
                                <span className="text-white/60">Standard Delivery</span>
                                <span className="text-green-400 font-bold uppercase tracking-wider text-[11px]">Free Shipping</span>
                            </div>

                            <div className="border-t border-white/10 pt-4 mt-2 flex justify-between items-center">
                                <span className="font-['Syne'] text-[18px] font-bold uppercase">Total Amount</span>
                                <span className="font-['Syne'] text-[24px] font-bold text-white">₹{design?.product?.price}</span>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/5 p-4 rounded-xl text-[12px] font-['Geist'] text-white/50 flex gap-3 items-start leading-relaxed">
                            <span className="material-symbols-outlined text-[16px] text-white/70 mt-0.5">lock</span>
                            <p>Demo mode active — payments are simulated. In production, all payments are securely processed by Razorpay using 256-bit encryption.</p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default FunkifyCheckout;
