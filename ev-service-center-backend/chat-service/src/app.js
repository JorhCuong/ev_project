import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import chatRoutes from "./routes/chatRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Chat Service API",
      version: "1.0.0",
      description: "Handles real-time chat messages between customers and staff",
    },
    servers: [{ url: `http://localhost:${process.env.PORT || 5008}` }],
  },
  apis: ["./src/routes/*.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// Routes
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("Chat service running 🚀");
});

export default app;
