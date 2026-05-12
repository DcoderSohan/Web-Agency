import express from "express";
import { createInquiry, getInquiries, deleteInquiry } from "../controllers/inquiry.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", createInquiry);
router.get("/", protectRoute, getInquiries);
router.delete("/:id", protectRoute, deleteInquiry);

export default router;
