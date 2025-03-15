import express from "express";
import dotenv from "dotenv";
import router from "./routes/routes";
import cors from "cors";

dotenv.config();

const app = express();

// CORS Configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3001", // Allow your frontend URL
  credentials: true, // Allow credentials (cookies, authorization headers, etc)
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
