import { Router } from "express";
import healthRouter from "./health.routes";
import authRouter from "./auth.routes";
import pastriesRouter from "./pastries.routes";

const router = Router();

router.use("/health", healthRouter);
router.use("/auth", authRouter);
router.use("/pastries", pastriesRouter);

export default router;
