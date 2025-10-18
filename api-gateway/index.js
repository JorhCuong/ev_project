import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

// helper to create proxy with path rewrite disabled, keep original path
const proxyTo = (target) => createProxyMiddleware({
  target,
  changeOrigin: true,
  proxyTimeout: 30000,
  timeout: 30000,
  logLevel: "warn"
});

// Proxy các route
app.use("/api/auth", createProxyMiddleware({ target: process.env.AUTH_SERVICE, changeOrigin: true }));
app.use("/api/booking", createProxyMiddleware({ target: process.env.BOOKING_SERVICE, changeOrigin: true }));
app.use("/api/finance", createProxyMiddleware({ target: process.env.FINANCE_SERVICE, changeOrigin: true }));
app.use("/api/inventory", createProxyMiddleware({ target: process.env.INVENTORY_SERVICE, changeOrigin: true }));
app.use("/api/notification", createProxyMiddleware({ target: process.env.NOTIFICATION_SERVICE, changeOrigin: true }));
app.use("/api/vehicle", createProxyMiddleware({ target: process.env.VEHICLE_SERVICE, changeOrigin: true }));
app.use("/api/workorder", createProxyMiddleware({ target: process.env.WORKORDER_SERVICE, changeOrigin: true }));
app.use("/api/chat", createProxyMiddleware({ target: process.env.CHAT_SERVICE, changeOrigin: true }));

// health
app.get("/health", (req, res) => res.json({ status: "ok", service: "api-gateway" }));

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
