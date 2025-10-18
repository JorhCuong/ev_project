import express from 'express';
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import sequelize from './config/db.js';
import bookingRoutes from './routes/bookingRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

// Swagger config
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Booking Service API",
      version: "1.0.0",
      description: "Booking Service for EV System",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5002}`,
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Đường dẫn đến các file có mô tả @swagger
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use('/api/bookings', bookingRoutes);

app.get('/', (req, res) => res.send('📅 Booking Service is running'));
app.get('/health', (req, res) => res.json({ status: 'ok' }));

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('✅ Database connected for Booking Service.');
  } catch (err) {
    console.error('❌ Database connection failed:', err);
  }
})();

export default app;
