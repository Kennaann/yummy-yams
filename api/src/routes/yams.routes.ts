import { Request, Response, Router } from "express";
import { IUserTokenData } from "../interfaces/user.interface";
import authenticateToken from "../middlewares/auth.middleware";
import tryCatch from "../utils/try-catch.util";
import YamsController from "../controllers/yams.controller";
import { YamsResults } from "../interfaces/yams.interface";

const router = Router();

router.get("/", authenticateToken, async (req: Request, res: Response) => {
  const user: IUserTokenData = req.body.user;
  const { code, ...response } = await tryCatch<YamsResults>(
    YamsController.getYamsResults.bind(YamsController),
    user.email
  );

  res.status(code).send(response);
});

export default router;
