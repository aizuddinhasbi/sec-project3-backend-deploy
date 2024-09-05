// server.js
import express from "express";
import cors from "cors";
import healthController from "./controllers/health.js";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

// Middleware
// Parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", healthController.getHealth);
app.post("/health", healthController.postHealth);

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
