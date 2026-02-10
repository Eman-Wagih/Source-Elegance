import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", productRoutes);

export default app;
