import express from "express";
import { 
    createJob, 
    getJobs, 
    getOpenJobs, 
    getJobBySlug, 
    updateJob, 
    deleteJob 
} from "../controllers/career.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public routes
router.get("/", getOpenJobs);
router.get("/all", getJobs);
router.get("/:slug", getJobBySlug);

// Admin routes
router.post("/", protectRoute, createJob);
router.put("/:id", protectRoute, updateJob);
router.delete("/:id", protectRoute, deleteJob);

export default router;
