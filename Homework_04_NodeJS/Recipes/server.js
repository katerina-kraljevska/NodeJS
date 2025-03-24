import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import router from "./routes/recipeRoutes.js";

dotenv.config();

const app = express();
// const PORT = process.env.PORT;
const PORT = 3001;

app.use(express.json());

app.use("/api", router);

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Sever is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
