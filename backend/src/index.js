import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
import todoRouter from "./routes/todo.route.js";
import statRouter from "./routes/stat.route.js";
import cors from "cors";
import { app, server } from "./config/socket.js";

import projectRouter from "./routes/projectRoute.js";
import inquiryRouter from "./routes/inquiry.route.js";
import userRouter from "./routes/user.route.js";
import quotationRouter from "./routes/quotation.route.js";
import blogRouter from "./routes/blog.route.js";
import careerRouter from "./routes/career.route.js";

dotenv.config();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      process.env.FRONTEND_URL,
      process.env.ADMIN_URL,
    ],
    credentials: true,
  }),
);
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
app.use("/api/todos", todoRouter);
app.use("/api/stats", statRouter);
app.use("/api/projects", projectRouter);
app.use("/api/inquiries", inquiryRouter);
app.use("/api/users", userRouter);
app.use("/api/quotations", quotationRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/careers", careerRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

server.listen(port, () => {
  connectDB();
  console.log(`✅ Server is running on port ${port}`);
});
