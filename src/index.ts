import express from "express";
import dotenv from "dotenv";
import router from "./routes/routes";

dotenv.config();

const app = express();

app.get("/api", router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});

//test
