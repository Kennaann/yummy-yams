import { Request, Response, Router } from "express";
import YamsController from "../controllers/yams.controller";

const router = Router();

router.get("/", async (_req, res: Response) => {
  const { code, ...response } = await YamsController.getYamsResults();

  res.status(code).send(response);
});

export default router;
