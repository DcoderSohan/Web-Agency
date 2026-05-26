import express from 'express';
import { 
    getAllProducts, 
    createProduct, 
    saveDesign, 
    getDesignById, 
    createOrder, 
    verifyPayment, 
    mockVerifyPayment,
    getUserOrders, 
    getAllOrders, 
    updateOrderStatus 
} from './funkify.controller.js';
import { protectRoute } from '../../middlewares/auth.middleware.js';

const router = express.Router();

// Products
router.get('/products', getAllProducts);
router.post('/products', protectRoute, createProduct);

// Designs
router.post('/designs', saveDesign);
router.get('/designs/:id', getDesignById);

// Orders & Payments
router.post('/orders/create', protectRoute, createOrder);
router.post('/orders/verify', protectRoute, verifyPayment);
router.post('/orders/mock-verify', protectRoute, mockVerifyPayment);
router.get('/orders/me', protectRoute, getUserOrders);
router.get('/orders/admin', protectRoute, getAllOrders);
router.put('/orders/admin/:id', protectRoute, updateOrderStatus);

export default router;
