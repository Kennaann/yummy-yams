import { Request, Response, Router } from "express";
import PastriesController from "../controllers/pastries.controller";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const { code, ...response } = await PastriesController.getAllPastries();

  res.status(code).send(response);
});

export default router;
