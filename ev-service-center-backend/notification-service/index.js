import app from "./src/app.js";
import sequelize from "./src/config/db.js";

const PORT = process.env.PORT || 5005;

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'notification-service' });
});
sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Notification Service running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ DB Connection Error:", err));
