import express from "express";
import cors from "cors";
import studentRoutes from "./routes/student.routes";
import { errorHandler } from "./middleware/error.middleware";
import authRoutes from "./auth/auth.routes";
import aiRoutes from "./ai/ai.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/students", studentRoutes);
app.use("/auth", authRoutes);

app.use(errorHandler);

app.use("/ai", aiRoutes);

export default app;
