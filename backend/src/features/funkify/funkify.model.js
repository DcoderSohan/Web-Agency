import mongoose from "mongoose";

// Base Products (e.g., Blank T-Shirt, Blank Mug)
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true }, // e.g., "T-Shirt", "Mug"
    colors: [{ type: String }], // Array of hex codes or color names
    baseImage: { type: String, required: true }, // The blank product image URL
    price: { type: Number, required: true },
    description: { type: String }
}, { timestamps: true });

// User Designs (saved customized products)
const designSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // Optional for guests
    guestId: { type: String }, // For unauthenticated users tracking
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'FunkifyProduct', required: true },
    designData: { type: Object, required: true }, // Fabric.js JSON state
    previewImage: { type: String, required: true }, // Exported PNG with watermark
}, { timestamps: true });

// Orders placed from Funkify Studio
const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    design: { type: mongoose.Schema.Types.ObjectId, ref: 'FunkifyDesign', required: true },
    shippingAddress: { type: String, required: true },
    paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    orderStatus: { type: String, enum: ['Processing', 'Printed', 'Shipped', 'Delivered'], default: 'Processing' },
    amount: { type: Number, required: true }
}, { timestamps: true });

export const FunkifyProduct = mongoose.model("FunkifyProduct", productSchema);
export const FunkifyDesign = mongoose.model("FunkifyDesign", designSchema);
export const FunkifyOrder = mongoose.model("FunkifyOrder", orderSchema);
