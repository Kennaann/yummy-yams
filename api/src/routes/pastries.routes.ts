import { Request, Response, Router } from "express";
import PastriesService from "../services/pastries.service";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const { code, ...response } = await PastriesService.getAllPastries();

  res.status(code).send(response);
});

export default router;
