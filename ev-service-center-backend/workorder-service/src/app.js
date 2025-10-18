import express from 'express';
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import sequelize from './config/db.js';
import workOrderRoutes from './routes/workOrderRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());

// Swagger setup 
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",   
    info: {
        title: `${process.env.SERVICE_NAME} API`,
        version: "1.0.0",
        description: `API documentation for ${process.env.SERVICE_NAME}`,
    },
    servers: [
        {
            url: `http://localhost:${process.env.PORT || 5007}`,
        },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/workorders', workOrderRoutes);

app.get('/', (req, res) => res.send('🧾 WorkOrder Service is running'));
app.get('/health', (req, res) => res.json({ status: 'ok' }));

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('✅ Database connected for WorkOrder Service.');
  } catch (err) {
    console.error('❌ Database connection failed:', err);
  }
})();

export default app;
