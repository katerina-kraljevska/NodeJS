import express from "express";
import trainersRouter from "./routes/trainers.routes.js";

const app = express();
const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || "0.0.0.0";

app.use(express.json());
app.use("/api", trainersRouter);

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
