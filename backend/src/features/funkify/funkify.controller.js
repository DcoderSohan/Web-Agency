import { FunkifyProduct, FunkifyDesign, FunkifyOrder } from './funkify.model.js';
import cloudinary from '../../config/cloudinaryConfig.js';
import razorpayInstance from '../../config/razorpay.js';
import crypto from 'crypto';

// Products
export const getAllProducts = async (req, res) => {
    try {
        let products = await FunkifyProduct.find();
        if (products.length === 0) {
            const defaultProducts = [
                {
                    name: "Premium Blank T-Shirt",
                    category: "Apparel",
                    colors: ["#ffffff", "#000000", "#ff0000", "#0000ff"],
                    baseImage: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=80",
                    price: 999,
                    description: "100% Cotton, bio-washed premium t-shirt ready for your custom designs."
                },
                {
                    name: "Ceramic Coffee Mug",
                    category: "Accessories",
                    colors: ["#ffffff", "#000000"],
                    baseImage: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&auto=format&fit=crop&q=80",
                    price: 399,
                    description: "Classic 11oz white ceramic mug. Microwave and dishwasher safe."
                }
            ];
            await FunkifyProduct.insertMany(defaultProducts);
            products = await FunkifyProduct.find();
        }
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching products", error: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const product = new FunkifyProduct(req.body);
        await product.save();
        res.status(201).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating product", error: error.message });
    }
};

// Designs
export const saveDesign = async (req, res) => {
    try {
        const { productId, designData, previewImageBase64, guestId } = req.body;
        const userId = req.user?._id; // from auth middleware, if logged in

        let previewUrl = '';

        // Try Cloudinary upload — fallback to storing base64 directly if it fails
        try {
            if (previewImageBase64 && cloudinary?.config()?.cloud_name) {
                const uploadedImage = await cloudinary.uploader.upload(previewImageBase64, {
                    folder: "funkify_designs",
                    resource_type: "image",
                });
                previewUrl = uploadedImage.secure_url;
            }
        } catch (uploadError) {
            console.warn("Cloudinary upload failed, saving base64 preview directly:", uploadError.message);
        }

        // If Cloudinary failed or wasn't configured, store the base64 directly
        if (!previewUrl) {
            // Store a truncated version (first 500KB) to avoid DB bloat
            previewUrl = previewImageBase64?.substring(0, 500000) || '';
        }

        const design = new FunkifyDesign({
            user: userId,
            guestId: !userId ? guestId : undefined,
            product: productId,
            designData,
            previewImage: previewUrl,
        });

        await design.save();
        res.status(201).json({ success: true, data: design });
    } catch (error) {
        console.error("Save design error:", error);
        res.status(500).json({ success: false, message: "Error saving design", error: error.message });
    }
};

export const getDesignById = async (req, res) => {
    try {
        const design = await FunkifyDesign.findById(req.params.id).populate('product');
        if (!design) return res.status(404).json({ success: false, message: "Design not found" });
        res.status(200).json({ success: true, data: design });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching design", error: error.message });
    }
};

// Orders and Payments
export const createOrder = async (req, res) => {
    try {
        const { designId, shippingAddress, amount } = req.body;
        const userId = req.user._id; // Require login for orders

        // Check if Razorpay is configured
        if (razorpayInstance) {
            // Real Razorpay flow
            const options = {
                amount: amount * 100, // Razorpay works in paise
                currency: "INR",
                receipt: `receipt_order_${Date.now()}`
            };

            const razorpayOrder = await razorpayInstance.orders.create(options);

            const newOrder = new FunkifyOrder({
                user: userId,
                design: designId,
                shippingAddress,
                amount,
                razorpayOrderId: razorpayOrder.id,
                paymentStatus: 'Pending',
            });

            await newOrder.save();
            res.status(200).json({ success: true, data: { order: newOrder, razorpayOrder }, mode: 'razorpay' });
        } else {
            // Mock/Fake Payment flow — no Razorpay configured
            const mockOrderId = `mock_order_${Date.now()}_${Math.random().toString(36).substring(7)}`;

            const newOrder = new FunkifyOrder({
                user: userId,
                design: designId,
                shippingAddress,
                amount,
                razorpayOrderId: mockOrderId,
                paymentStatus: 'Pending',
            });

            await newOrder.save();

            res.status(200).json({
                success: true,
                data: {
                    order: newOrder,
                    razorpayOrder: {
                        id: mockOrderId,
                        amount: amount * 100,
                        currency: 'INR'
                    }
                },
                mode: 'mock'
            });
        }
    } catch (error) {
        console.error("Create order error:", error);
        res.status(500).json({ success: false, message: "Error creating order", error: error.message });
    }
};

// Mock payment verification (for when Razorpay isn't configured)
export const mockVerifyPayment = async (req, res) => {
    try {
        const { orderId } = req.body;

        const order = await FunkifyOrder.findByIdAndUpdate(
            orderId,
            {
                paymentStatus: 'Completed',
                razorpayPaymentId: `mock_pay_${Date.now()}`,
                orderStatus: 'Processing'
            },
            { new: true }
        ).populate('design').populate('user');

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.status(200).json({ success: true, message: "Mock payment verified successfully", data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error verifying mock payment", error: error.message });
    }
};

export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

        const generated_signature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        if (generated_signature === razorpay_signature) {
            const order = await FunkifyOrder.findByIdAndUpdate(
                orderId,
                { paymentStatus: 'Completed', razorpayPaymentId: razorpay_payment_id, orderStatus: 'Processing' },
                { new: true }
            ).populate('design').populate('user');

            res.status(200).json({ success: true, message: "Payment verified successfully", data: order });
        } else {
            await FunkifyOrder.findByIdAndUpdate(orderId, { paymentStatus: 'Failed' });
            res.status(400).json({ success: false, message: "Invalid signature" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Error verifying payment", error: error.message });
    }
};

// User/Admin Orders
export const getUserOrders = async (req, res) => {
    try {
        const orders = await FunkifyOrder.find({ user: req.user._id })
            .populate('design')
            .sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching user orders", error: error.message });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await FunkifyOrder.find()
            .populate('design')
            .populate('user', 'name email')
            .sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching orders", error: error.message });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await FunkifyOrder.findByIdAndUpdate(req.params.id, { orderStatus: status }, { new: true });
        res.status(200).json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating order status", error: error.message });
    }
};
