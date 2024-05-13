import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes";

dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(router);

export default app;
