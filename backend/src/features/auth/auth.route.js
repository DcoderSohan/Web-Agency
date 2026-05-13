import express from "express";
import {
  signUp,
  login,
  logout,
  getProfile,
  updateProfile,
} from "./auth.controllers.js";
import { protectRoute } from "../../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.get("/logout", logout);

authRouter.get("/profile", protectRoute, getProfile);
authRouter.put("/profile", protectRoute, updateProfile);

export default authRouter;
