import dotenv from "dotenv";
import app from "./src/app.js";

dotenv.config();
const PORT = process.env.PORT || 5001;

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "auth-service" });
});

app.listen(PORT, () => {
  console.log(`🚀 Auth Service running on port ${PORT}`);
});
