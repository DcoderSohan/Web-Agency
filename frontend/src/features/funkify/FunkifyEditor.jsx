import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Canvas, FabricImage, IText, FabricText, Rect } from 'fabric';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const SERVER_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const FunkifyEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const canvasRef = useRef(null);
    const fabricRef = useRef(null);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeObject, setActiveObject] = useState(null);
    const [canvasReady, setCanvasReady] = useState(false);

    // Tools state
    const [textColor, setTextColor] = useState('#ffffff');

    // Fetch product data
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`${SERVER_URL}/api/funkify/products`);
                if (res.data.success) {
                    const match = res.data.data.find(p => p._id === id);
                    if (match) {
                        setProduct(match);
                    } else {
                        setProduct({
                            _id: id,
                            name: "Custom Product",
                            baseImage: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=80",
                            price: 999
                        });
                    }
                }
            } catch (err) {
                console.error("Error loading products", err);
                setProduct({
                    _id: id,
                    name: "Custom Product",
                    baseImage: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=80",
                    price: 999
                });
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    // Initialize Fabric Canvas (Fabric v7 API)
    useEffect(() => {
        if (loading || !product || !canvasRef.current || fabricRef.current) return;

        const initCanvas = async () => {
            try {
                const fc = new Canvas(canvasRef.current, {
                    width: 600,
                    height: 600,
                    backgroundColor: '#1a1a1a',
                    preserveObjectStacking: true,
                });

                // Load background product image using Fabric v7 Promise API
                try {
                    const img = await FabricImage.fromURL(product.baseImage, { crossOrigin: 'anonymous' });

                    const scale = Math.min(500 / img.width, 500 / img.height);
                    img.set({
                        scaleX: scale,
                        scaleY: scale,
                        originX: 'center',
                        originY: 'center',
                        left: 300,
                        top: 300,
                        selectable: false,
                        evented: false,
                        hoverCursor: 'default',
                    });

                    fc.add(img);
                    fc.sendObjectToBack(img);
                    fc.renderAll();
                } catch (imgErr) {
                    console.warn("Could not load product image, using placeholder:", imgErr);
                    // Add a placeholder rect if image fails
                    const placeholder = new Rect({
                        left: 100,
                        top: 100,
                        width: 400,
                        height: 400,
                        fill: '#2a2a2a',
                        stroke: '#444',
                        strokeWidth: 2,
                        selectable: false,
                        evented: false,
                        rx: 12,
                        ry: 12,
                    });
                    fc.add(placeholder);
                    fc.sendObjectToBack(placeholder);

                    const label = new FabricText(product.name || 'Product', {
                        left: 300,
                        top: 300,
                        originX: 'center',
                        originY: 'center',
                        fontSize: 24,
                        fontFamily: 'Syne, sans-serif',
                        fill: '#666',
                        selectable: false,
                        evented: false,
                    });
                    fc.add(label);
                    fc.renderAll();
                }

                fc.on('selection:created', (e) => {
                    const sel = e.selected?.[0] || null;
                    setActiveObject(sel);
                });
                fc.on('selection:updated', (e) => {
                    const sel = e.selected?.[0] || null;
                    setActiveObject(sel);
                });
                fc.on('selection:cleared', () => setActiveObject(null));

                fabricRef.current = fc;
                setCanvasReady(true);
            } catch (err) {
                console.error("Canvas init error:", err);
            }
        };

        initCanvas();

        return () => {
            if (fabricRef.current) {
                fabricRef.current.dispose();
                fabricRef.current = null;
            }
        };
    }, [loading, product]);

    // Add text tool
    const addText = useCallback(() => {
        const fc = fabricRef.current;
        if (!fc) return;

        const text = new IText('Your Text', {
            left: 200 + Math.random() * 100,
            top: 200 + Math.random() * 100,
            fontFamily: 'Syne, sans-serif',
            fill: textColor,
            fontSize: 36,
            fontWeight: 'bold',
        });
        fc.add(text);
        fc.setActiveObject(text);
        fc.renderAll();
    }, [textColor]);

    // Upload image tool (Fabric v7 Promise API)
    const handleImageUpload = useCallback(async (e) => {
        const fc = fabricRef.current;
        if (!fc) return;
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (f) => {
            try {
                const dataUrl = f.target.result;
                const img = await FabricImage.fromURL(dataUrl);
                // Scale down large images to fit canvas
                const maxDim = 250;
                const imgScale = Math.min(maxDim / img.width, maxDim / img.height, 1);
                img.set({
                    left: 150 + Math.random() * 100,
                    top: 150 + Math.random() * 100,
                    scaleX: imgScale,
                    scaleY: imgScale,
                });
                fc.add(img);
                fc.setActiveObject(img);
                fc.renderAll();
            } catch (err) {
                console.error("Image upload to canvas failed:", err);
                alert("Failed to add image. Please try a different file.");
            }
        };
        reader.readAsDataURL(file);
        // Reset file input so same file can be re-selected
        e.target.value = '';
    }, []);

    // Delete selected object
    const deleteSelected = useCallback(() => {
        const fc = fabricRef.current;
        if (!fc || !activeObject) return;
        fc.remove(activeObject);
        fc.discardActiveObject();
        fc.renderAll();
        setActiveObject(null);
    }, [activeObject]);

    // Text color change
    const handleTextColorChange = useCallback((e) => {
        const color = e.target.value;
        setTextColor(color);
        if (activeObject && activeObject.type === 'i-text') {
            activeObject.set('fill', color);
            fabricRef.current?.renderAll();
        }
    }, [activeObject]);

    // Save design & navigate to checkout
    const saveDesign = async () => {
        const fc = fabricRef.current;
        if (!fc) return;
        setSaving(true);

        try {
            // 1. Add watermark temporarily
            const watermark = new FabricText('VTRC Technologies', {
                left: fc.width - 20,
                top: fc.height - 20,
                originX: 'right',
                originY: 'bottom',
                fontSize: 13,
                fontFamily: 'JetBrains Mono, monospace',
                fill: 'rgba(255,255,255,0.4)',
                selectable: false,
                evented: false,
            });
            fc.add(watermark);
            fc.renderAll();

            // 2. Export canvas
            const designData = fc.toJSON();
            const previewImageBase64 = fc.toDataURL({
                format: 'png',
                quality: 1,
                multiplier: 1,
            });

            // 3. Remove watermark
            fc.remove(watermark);
            fc.renderAll();

            // 4. Store preview in sessionStorage as fallback
            try {
                sessionStorage.setItem('funkify_preview', previewImageBase64);
            } catch (storageErr) {
                console.warn("Could not cache preview in sessionStorage");
            }

            // 5. Save to API
            const res = await axios.post(`${SERVER_URL}/api/funkify/designs`, {
                productId: product._id,
                designData,
                previewImageBase64,
                guestId: 'guest_' + Date.now()
            });

            if (res.data.success) {
                navigate(`/funkify/checkout?designId=${res.data.data._id}`);
            } else {
                alert("Failed to save design. Please try again.");
            }

        } catch (error) {
            console.error("Error saving design", error);
            alert("Failed to save design. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex justify-center items-center">
                <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <section className="bg-black text-white min-h-screen pt-24 pb-12 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="px-8 py-4 border-b border-white/10 flex justify-between items-center bg-black/50 backdrop-blur-md sticky top-0 z-50">
                <div>
                    <h1 className="font-['Syne'] text-[24px] font-bold uppercase tracking-tight">{product?.name}</h1>
                    <p className="font-['Geist'] text-[14px] text-white/50">Design Studio — Customize your product</p>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/funkify')}
                        className="border border-white/20 text-white/70 font-['JetBrains_Mono'] text-[13px] px-6 py-3 uppercase hover:bg-white/10 transition-colors"
                    >
                        ← Back
                    </button>
                    <button
                        onClick={saveDesign}
                        disabled={saving || !canvasReady}
                        className="bg-white text-black font-['JetBrains_Mono'] text-[14px] font-bold px-8 py-3 uppercase hover:scale-105 transition-transform disabled:opacity-50"
                    >
                        {saving ? 'Saving...' : 'Save & Checkout →'}
                    </button>
                </div>
            </div>

            {/* Main Editor Area */}
            <div className="flex-1 flex px-8 py-8 gap-8">

                {/* Tools Sidebar */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-[280px] bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-5 backdrop-blur-md h-fit sticky top-32"
                >
                    <h3 className="font-['Syne'] text-[18px] font-bold uppercase border-b border-white/10 pb-4 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[20px]">construction</span>
                        Tools
                    </h3>

                    <button
                        onClick={addText}
                        className="w-full flex items-center justify-center gap-2 border border-white/20 bg-transparent py-3 rounded-xl hover:bg-white hover:text-black transition-all duration-300 font-['Geist'] font-medium text-[14px]"
                    >
                        <span className="material-symbols-outlined text-[20px]">title</span>
                        Add Text
                    </button>

                    <label className="w-full flex items-center justify-center gap-2 border border-white/20 bg-transparent py-3 rounded-xl hover:bg-white hover:text-black transition-all duration-300 font-['Geist'] font-medium cursor-pointer text-[14px]">
                        <span className="material-symbols-outlined text-[20px]">image</span>
                        Upload Image
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>

                    {/* Text Color Picker — only shows when a text is selected */}
                    {activeObject && activeObject.type === 'i-text' && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="border border-white/10 p-4 rounded-xl"
                        >
                            <label className="block font-['Geist'] text-[12px] text-white/60 mb-3 uppercase tracking-widest">Text Color</label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="color"
                                    value={textColor}
                                    onChange={handleTextColorChange}
                                    className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0 p-0"
                                />
                                <span className="font-['JetBrains_Mono'] text-[12px] text-white/70">{textColor}</span>
                            </div>
                        </motion.div>
                    )}

                    {/* Active selection info */}
                    {activeObject && (
                        <div className="text-[11px] font-['JetBrains_Mono'] text-white/40 uppercase tracking-widest bg-white/5 px-3 py-2 rounded-lg text-center">
                            Selected: {activeObject.type === 'i-text' ? 'Text' : 'Image'}
                        </div>
                    )}

                    <button
                        onClick={deleteSelected}
                        disabled={!activeObject}
                        className="w-full mt-auto flex items-center justify-center gap-2 border border-red-500/50 text-red-400 py-3 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-red-400 font-['Geist'] text-[14px]"
                    >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                        Delete Selected
                    </button>
                </motion.div>

                {/* Canvas Area */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex-1 flex justify-center items-center bg-[#0d0d0d] rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(255,255,255,0.03)] border border-white/10 p-6"
                >
                    <div className="bg-[#111] rounded-xl shadow-2xl border border-white/5 p-2">
                        <canvas ref={canvasRef} />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FunkifyEditor;
