import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ShoppingBag, 
    Palette, 
    Plus, 
    Trash2, 
    ExternalLink, 
    RefreshCw, 
    Package, 
    Truck, 
    CheckCircle, 
    Clock, 
    AlertCircle,
    User,
    DollarSign,
    Layers,
    Tag,
    Eye
} from 'lucide-react';
import { userDataContext } from '../../context/UserContext';

const FunkifyManager = () => {
    const { serverUrl } = useContext(userDataContext);
    const [activeSubTab, setActiveSubTab] = useState('orders'); // 'orders' | 'products'
    
    // Data State
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // New Product form state
    const [newProduct, setNewProduct] = useState({
        name: '',
        category: 'Apparel',
        price: '',
        baseImage: '',
        description: '',
        colors: '' // comma-separated colors e.g. #ffffff, #000000
    });
    const [creatingProduct, setCreatingProduct] = useState(false);
    const [formError, setFormError] = useState('');
    const [formSuccess, setFormSuccess] = useState(false);

    // Selected order for detailed preview modal
    const [selectedOrder, setSelectedOrder] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [ordersRes, productsRes] = await Promise.all([
                axios.get(`${serverUrl}/api/funkify/orders/admin`, { withCredentials: true }),
                axios.get(`${serverUrl}/api/funkify/products`, { withCredentials: true })
            ]);

            if (ordersRes.data.success) {
                setOrders(ordersRes.data.data);
            }
            if (productsRes.data.success) {
                setProducts(productsRes.data.data);
            }
        } catch (err) {
            console.error("Error loading admin data", err);
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        try {
            const [ordersRes, productsRes] = await Promise.all([
                axios.get(`${serverUrl}/api/funkify/orders/admin`, { withCredentials: true }),
                axios.get(`${serverUrl}/api/funkify/products`, { withCredentials: true })
            ]);

            if (ordersRes.data.success) setOrders(ordersRes.data.data);
            if (productsRes.data.success) setProducts(productsRes.data.data);
        } catch (err) {
            console.error("Refresh failed", err);
        } finally {
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Update order delivery/printed status
    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            const res = await axios.put(
                `${serverUrl}/api/funkify/orders/admin/${orderId}`, 
                { status: newStatus }, 
                { withCredentials: true }
            );
            if (res.data.success) {
                // Update local state
                setOrders(prev => prev.map(o => o._id === orderId ? { ...o, orderStatus: newStatus } : o));
                if (selectedOrder && selectedOrder._id === orderId) {
                    setSelectedOrder(prev => ({ ...prev, orderStatus: newStatus }));
                }
            }
        } catch (err) {
            console.error("Failed to update status", err);
            alert("Error updating order status.");
        }
    };

    // Create Base Product
    const handleCreateProduct = async (e) => {
        e.preventDefault();
        setFormError('');
        setFormSuccess(false);
        setCreatingProduct(true);

        // Simple validation
        if (!newProduct.name || !newProduct.price || !newProduct.baseImage) {
            setFormError('Required fields are missing.');
            setCreatingProduct(false);
            return;
        }

        // Parse colors
        const colorsArray = newProduct.colors 
            ? newProduct.colors.split(',').map(c => c.trim()) 
            : ['#ffffff'];

        try {
            const res = await axios.post(
                `${serverUrl}/api/funkify/products`, 
                {
                    name: newProduct.name,
                    category: newProduct.category,
                    price: parseFloat(newProduct.price),
                    baseImage: newProduct.baseImage,
                    description: newProduct.description,
                    colors: colorsArray
                }, 
                { withCredentials: true }
            );

            if (res.data.success) {
                setProducts(prev => [res.data.data, ...prev]);
                setNewProduct({
                    name: '',
                    category: 'Apparel',
                    price: '',
                    baseImage: '',
                    description: '',
                    colors: ''
                });
                setFormSuccess(true);
            }
        } catch (err) {
            setFormError(err.response?.data?.message || 'Error creating product.');
        } finally {
            setCreatingProduct(false);
        }
    };

    // Order status display formatting
    const getStatusIcon = (status) => {
        switch (status) {
            case 'Delivered': return <CheckCircle size={16} className="text-green-500" />;
            case 'Shipped': return <Truck size={16} className="text-blue-500" />;
            case 'Printed': return <Package size={16} className="text-purple-500" />;
            default: return <Clock size={16} className="text-amber-500" />;
        }
    };

    const getPaymentBadgeClass = (status) => {
        switch (status) {
            case 'Completed': return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
            case 'Pending': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
            default: return 'bg-rose-500/10 text-rose-600 border-rose-500/20';
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="w-8 h-8 rounded-full border-t-2 border-slate-800 animate-spin"></div>
                <p className="text-slate-400 font-mono text-[11px] uppercase tracking-wider">Loading Customizer Ledger...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8 h-full relative">
            
            {/* Header Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => setActiveSubTab('orders')}
                        className={`flex items-center gap-2 px-5 py-3 rounded-lg text-xs font-bold uppercase tracking-widest font-mono border transition-all ${
                            activeSubTab === 'orders' 
                            ? 'bg-black text-white border-black' 
                            : 'bg-white text-slate-500 border-slate-200 hover:text-black hover:bg-slate-50'
                        }`}
                    >
                        <ShoppingBag size={14} />
                        Studio Orders ({orders.length})
                    </button>
                    <button 
                        onClick={() => setActiveSubTab('products')}
                        className={`flex items-center gap-2 px-5 py-3 rounded-lg text-xs font-bold uppercase tracking-widest font-mono border transition-all ${
                            activeSubTab === 'products' 
                            ? 'bg-black text-white border-black' 
                            : 'bg-white text-slate-500 border-slate-200 hover:text-black hover:bg-slate-50'
                        }`}
                    >
                        <Palette size={14} />
                        Studio Catalog ({products.length})
                    </button>
                </div>

                <button 
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-500 hover:text-black rounded-lg transition-colors font-mono text-[11px] uppercase tracking-wider"
                >
                    <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
                    Sync Nodes
                </button>
            </div>

            {/* Sub-Tab content */}
            <AnimatePresence mode="wait">
                {activeSubTab === 'orders' ? (
                    // Studio Orders View
                    <motion.div
                        key="orders-subtab"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm flex flex-col"
                    >
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-mono text-[10px] uppercase tracking-widest">
                                        <th className="py-4 px-6">Order ID / Client</th>
                                        <th className="py-4 px-6">Product Details</th>
                                        <th className="py-4 px-6 text-center">Custom design</th>
                                        <th className="py-4 px-6">Payment</th>
                                        <th className="py-4 px-6">Amount</th>
                                        <th className="py-4 px-6">Production Status</th>
                                        <th className="py-4 px-6 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-[13px]">
                                    {orders.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="py-12 text-center text-slate-400 font-mono">
                                                No studio custom orders recorded.
                                            </td>
                                        </tr>
                                    ) : (
                                        orders.map((order) => (
                                            <tr key={order._id} className="hover:bg-slate-50/50 transition-colors">
                                                {/* ID & Client */}
                                                <td className="py-4 px-6">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="font-mono text-black font-bold uppercase">#{order._id.substring(order._id.length - 8)}</span>
                                                        <div className="flex items-center gap-1.5 text-slate-500 text-[12px]">
                                                            <User size={12} />
                                                            <span>{order.user?.name || "Client"}</span>
                                                        </div>
                                                        <span className="text-slate-400 text-[11px] font-mono">{order.user?.email || "anonymous"}</span>
                                                    </div>
                                                </td>

                                                {/* Product */}
                                                <td className="py-4 px-6">
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-slate-800">{order.design?.product?.name || "Printed Merchandise"}</span>
                                                        <span className="text-slate-400 text-[11px] font-mono">{order.design?.product?.category || "Accessory"}</span>
                                                    </div>
                                                </td>

                                                {/* Thumbnail preview */}
                                                <td className="py-4 px-6 text-center">
                                                    <div className="flex justify-center">
                                                        <div 
                                                            onClick={() => setSelectedOrder(order)}
                                                            className="w-10 h-10 rounded border border-slate-200 bg-slate-100 overflow-hidden cursor-pointer hover:border-black transition-colors relative group"
                                                        >
                                                            {order.design?.previewImage ? (
                                                                <img 
                                                                    src={order.design.previewImage} 
                                                                    alt="Preview" 
                                                                    className="w-full h-full object-contain"
                                                                />
                                                            ) : (
                                                                <span className="text-[9px] text-slate-400 font-mono">None</span>
                                                            )}
                                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                                <Eye size={12} className="text-white" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Payment */}
                                                <td className="py-4 px-6">
                                                    <span className={`inline-block px-2.5 py-0.5 rounded-full border text-[11px] font-bold ${getPaymentBadgeClass(order.paymentStatus)}`}>
                                                        {order.paymentStatus}
                                                    </span>
                                                </td>

                                                {/* Amount */}
                                                <td className="py-4 px-6 font-bold text-black">
                                                    ₹{order.amount}
                                                </td>

                                                {/* Order status dropdown */}
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-2">
                                                        {getStatusIcon(order.orderStatus)}
                                                        <select 
                                                            value={order.orderStatus} 
                                                            onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                                                            className="bg-transparent border-0 border-b border-slate-200 text-slate-700 font-bold focus:outline-none focus:border-black text-[12px] pb-0.5 cursor-pointer py-1"
                                                        >
                                                            <option value="Processing">In Production</option>
                                                            <option value="Printed">Printed</option>
                                                            <option value="Shipped">Shipped</option>
                                                            <option value="Delivered">Delivered</option>
                                                        </select>
                                                    </div>
                                                </td>

                                                {/* Actions */}
                                                <td className="py-4 px-6 text-right">
                                                    <button 
                                                        onClick={() => setSelectedOrder(order)}
                                                        className="text-slate-400 hover:text-black font-mono text-[11px] uppercase tracking-wider border border-slate-200 hover:border-black px-3 py-1 rounded transition-colors"
                                                    >
                                                        Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                ) : (
                    // Catalog & Product Addition
                    <motion.div
                        key="products-subtab"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                    >
                        {/* List base products */}
                        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm">
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-slate-400">Available Products</h3>
                                <span className="font-mono text-[11px] bg-slate-100 px-2 py-1 rounded font-bold">{products.length} Node(s)</span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-mono text-[10px] uppercase tracking-widest">
                                            <th className="py-4 px-6">Visual</th>
                                            <th className="py-4 px-6">Product Detail</th>
                                            <th className="py-4 px-6">Colors Offered</th>
                                            <th className="py-4 px-6">Base Price</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 text-[13px]">
                                        {products.length === 0 ? (
                                            <tr>
                                                <td colSpan="4" className="py-12 text-center text-slate-400 font-mono">
                                                    No products cataloged yet.
                                                </td>
                                            </tr>
                                        ) : (
                                            products.map((prod) => (
                                                <tr key={prod._id} className="hover:bg-slate-50/50 transition-colors">
                                                    {/* Image */}
                                                    <td className="py-4 px-6">
                                                        <div className="w-12 h-12 rounded border border-slate-200 bg-slate-50 overflow-hidden shrink-0">
                                                            <img 
                                                                src={prod.baseImage} 
                                                                alt={prod.name} 
                                                                className="w-full h-full object-contain"
                                                            />
                                                        </div>
                                                    </td>

                                                    {/* Details */}
                                                    <td className="py-4 px-6">
                                                        <div className="flex flex-col max-w-[240px]">
                                                            <span className="font-bold text-slate-800">{prod.name}</span>
                                                            <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 mt-0.5">{prod.category}</span>
                                                            <p className="text-slate-500 text-[11px] mt-1 line-clamp-1">{prod.description}</p>
                                                        </div>
                                                    </td>

                                                    {/* Colors */}
                                                    <td className="py-4 px-6">
                                                        <div className="flex items-center gap-1.5 flex-wrap max-w-[150px]">
                                                            {prod.colors?.map((col, cIdx) => (
                                                                <div 
                                                                    key={cIdx} 
                                                                    style={{ backgroundColor: col }}
                                                                    title={col}
                                                                    className="w-4 h-4 rounded-full border border-slate-200 shadow-sm shrink-0"
                                                                />
                                                            ))}
                                                        </div>
                                                    </td>

                                                    {/* Price */}
                                                    <td className="py-4 px-6 font-bold text-black">
                                                        ₹{prod.price}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Add Base Product Form */}
                        <div className="lg:col-span-4 bg-white border border-slate-100 rounded-xl p-6 shadow-sm h-fit">
                            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                                <Plus size={14} /> Catalog New Product
                            </h3>

                            <form onSubmit={handleCreateProduct} className="flex flex-col gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Product Name *</label>
                                    <input 
                                        type="text"
                                        required
                                        value={newProduct.name}
                                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                        placeholder="e.g. Minimalist Crewneck Hoodie"
                                        className="border border-slate-200 px-4 py-2.5 rounded-lg text-slate-800 text-[13px] focus:outline-none focus:border-black transition-colors"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Category</label>
                                        <select 
                                            value={newProduct.category}
                                            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                            className="border border-slate-200 px-3 py-2.5 rounded-lg text-slate-800 text-[13px] focus:outline-none focus:border-black transition-colors cursor-pointer"
                                        >
                                            <option value="Apparel">Apparel</option>
                                            <option value="Accessories">Accessories</option>
                                            <option value="Prints">Prints</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Base Price (₹) *</label>
                                        <input 
                                            type="number"
                                            required
                                            min="1"
                                            value={newProduct.price}
                                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                            placeholder="e.g. 1499"
                                            className="border border-slate-200 px-4 py-2.5 rounded-lg text-slate-800 text-[13px] focus:outline-none focus:border-black transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Blank Base Image URL *</label>
                                    <input 
                                        type="url"
                                        required
                                        value={newProduct.baseImage}
                                        onChange={(e) => setNewProduct({ ...newProduct, baseImage: e.target.value })}
                                        placeholder="https://domain.com/blank-product.jpg"
                                        className="border border-slate-200 px-4 py-2.5 rounded-lg text-slate-800 text-[13px] focus:outline-none focus:border-black transition-colors"
                                    />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Description</label>
                                    <textarea 
                                        rows="3"
                                        value={newProduct.description}
                                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                        placeholder="Add descriptive product text here..."
                                        className="border border-slate-200 px-4 py-2.5 rounded-lg text-slate-800 text-[13px] focus:outline-none focus:border-black transition-colors resize-none"
                                    />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Colors (Hex array, comma list)</label>
                                    <input 
                                        type="text"
                                        value={newProduct.colors}
                                        onChange={(e) => setNewProduct({ ...newProduct, colors: e.target.value })}
                                        placeholder="#ffffff, #000000, #ff0000"
                                        className="border border-slate-200 px-4 py-2.5 rounded-lg text-slate-800 text-[13px] focus:outline-none focus:border-black transition-colors"
                                    />
                                </div>

                                {formError && (
                                    <div className="text-red-600 font-mono text-[11px] flex items-center gap-1.5 bg-red-50 p-2.5 border border-red-200 rounded">
                                        <AlertCircle size={14} />
                                        {formError}
                                    </div>
                                )}

                                {formSuccess && (
                                    <div className="text-green-600 font-mono text-[11px] flex items-center gap-1.5 bg-green-50 p-2.5 border border-green-200 rounded">
                                        <CheckCircle size={14} />
                                        Product cataloged successfully!
                                    </div>
                                )}

                                <button 
                                    type="submit"
                                    disabled={creatingProduct}
                                    className="w-full bg-black text-white py-3.5 rounded-lg text-xs font-mono font-bold uppercase tracking-widest hover:scale-[1.01] transition-transform active:scale-[0.99] disabled:opacity-50"
                                >
                                    {creatingProduct ? 'Registering...' : 'Catalog Product'}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Detailed Order Modal */}
            <AnimatePresence>
                {selectedOrder && (
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center px-4 py-12">
                        {/* Overlay */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedOrder(null)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                        />
                        
                        {/* Card */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 15 }}
                            className="bg-white border border-slate-100 w-full max-w-[800px] rounded-2xl shadow-xl z-10 overflow-hidden flex flex-col max-h-[85vh]"
                        >
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                                <div>
                                    <span className="font-mono text-xs font-bold text-slate-400 uppercase">Customizer Design Commission</span>
                                    <h3 className="font-mono text-sm font-bold uppercase mt-1">Order ID: #{selectedOrder._id}</h3>
                                </div>
                                <button 
                                    onClick={() => setSelectedOrder(null)}
                                    className="p-2 border border-slate-100 hover:border-black rounded transition-colors text-slate-500 hover:text-black font-bold font-mono text-[14px]"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col md:flex-row gap-8">
                                {/* Visual Print Preview */}
                                <div className="w-full md:w-[300px] shrink-0 flex flex-col gap-4">
                                    <div className="aspect-square bg-slate-100 border border-slate-200 rounded-xl overflow-hidden flex items-center justify-center shadow-inner">
                                        {selectedOrder.design?.previewImage ? (
                                            <img 
                                                src={selectedOrder.design.previewImage} 
                                                alt="Custom design detail preview" 
                                                className="w-full h-full object-contain"
                                            />
                                        ) : (
                                            <span className="font-mono text-[10px] text-slate-400">NO_VISUAL_DATA</span>
                                        )}
                                    </div>
                                    {selectedOrder.design?.previewImage && (
                                        <a 
                                            href={selectedOrder.design.previewImage} 
                                            target="_blank" 
                                            rel="noreferrer"
                                            className="w-full text-center flex items-center justify-center gap-2 border border-slate-200 text-slate-600 hover:text-black hover:border-black py-2.5 rounded-lg text-xs font-mono font-bold uppercase transition-colors"
                                        >
                                            <ExternalLink size={12} />
                                            Print-Ready Image (Cloud)
                                        </a>
                                    )}
                                </div>

                                {/* Information & Shipping Details */}
                                <div className="flex-1 flex flex-col justify-between">
                                    <div className="flex flex-col gap-6">
                                        <div>
                                            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block">Product Description</span>
                                            <h4 className="font-bold text-slate-900 text-[18px]">{selectedOrder.design?.product?.name || "Merchandise Item"}</h4>
                                            <p className="text-slate-500 text-[12px] mt-1">{selectedOrder.design?.product?.description}</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="border border-slate-100 p-3 rounded-lg">
                                                <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest block mb-1">Commission Price</span>
                                                <span className="font-bold text-black text-sm">₹{selectedOrder.amount}</span>
                                            </div>
                                            <div className="border border-slate-100 p-3 rounded-lg">
                                                <span className="font-mono text-[9px] text-slate-400 uppercase tracking-widest block mb-1">Receipt reference</span>
                                                <span className="font-mono text-slate-800 text-[11px] font-bold truncate block">{selectedOrder.razorpayOrderId || "N/A"}</span>
                                            </div>
                                        </div>

                                        <div>
                                            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider block mb-2">Recipient Delivery Node</span>
                                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-slate-600 text-[12px] leading-relaxed">
                                                <p className="font-bold text-slate-800">{selectedOrder.user?.name}</p>
                                                <p className="mt-1">{selectedOrder.shippingAddress}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action row */}
                                    <div className="border-t border-slate-100 pt-6 mt-8 flex items-center justify-between gap-4">
                                        <div className="flex flex-col">
                                            <span className="font-mono text-[9px] text-slate-400 uppercase">Change Node Status</span>
                                            <select 
                                                value={selectedOrder.orderStatus} 
                                                onChange={(e) => handleUpdateStatus(selectedOrder._id, e.target.value)}
                                                className="border border-slate-200 text-slate-800 font-bold focus:outline-none focus:border-black text-[12px] px-3 py-1.5 rounded-lg mt-1"
                                            >
                                                <option value="Processing">In Production</option>
                                                <option value="Printed">Printed</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                            </select>
                                        </div>
                                        <button 
                                            onClick={() => setSelectedOrder(null)}
                                            className="bg-black text-white py-3 px-6 rounded-lg text-xs font-mono font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform active:scale-[0.98]"
                                        >
                                            Confirm Inspection
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default FunkifyManager;
