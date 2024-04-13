import { Request, Response, Router } from "express";
import PastriesService from "../services/pastries.service";
import tryCatch from "../utils/try-catch.util";
import { IPastry } from "../interfaces/pastries.interface";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  const { code, ...response } = await tryCatch<IPastry[]>(
    PastriesService.getAllPastries.bind(PastriesService)
  );

  res.status(code).send(response);
});

export default router;
