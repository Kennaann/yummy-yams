import { Request, Response, Router } from "express";
import tryCatch from "../utils/try-catch.util";
import { IPastry } from "../interfaces/pastries.interface";
import PastriesController from "../controllers/pastries.controller";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  const { code, ...response } = await tryCatch<IPastry[]>(
    PastriesController.getAllPastries.bind(PastriesController)
  );

  res.status(code).send(response);
});

export default router;
