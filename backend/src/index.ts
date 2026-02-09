import path from "path"
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize, { testConnection } from "./config/database";

import authRoutes from "./routes/authRoutes";
import itemsRoutes from "./routes/itemsRoutes";
import ordersRoutes from "./routes/ordersRoutes";
import usersRoutes from "./routes/usersRoutes";

import Item from "./models/Item";
import Order from "./models/Order";
import User from "./models/User";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Add middleware
app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    }),
);
app.use(express.json());

// TODO: Add routes
app.use("/api/auth", authRoutes);
app.use("/api/items", itemsRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/users", usersRoutes);

// Serve static files from backend/public
app.use(
  "/images",
  express.static(path.join(__dirname, "../public/images"))
)

// Add a test route
app.get("/api/health", (req, res) =>
    res.json({ status: "ok", message: "Artwork API is running!" }),
);

// Error handling middleware
app.use(
    (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
    ) => {
      console.error(err.stack);
      res.status(500).json({ message: "Something went wrong!" });
    },
);

// Start server function
const startServer = async () => {
  // Test database connection
  await testConnection();
  // Sync database (creates tables if they don't exist)
  await sequelize.sync({ force: false, alter: true });
  console.log("✅ Database synced");
  // TODO: Start Express server
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📚 API Documentation: http://localhost:${PORT}/api/health`);
  });
};

// Call startServer
startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});