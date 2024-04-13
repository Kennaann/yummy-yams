import { Request, Response, Router } from "express";
import { IUserTokenData } from "../interfaces/user.interface";
import YamsService from "../services/yams.service";
import authenticateToken from "../middlewares/auth.middleware";
import tryCatch from "../utils/try-catch.util";

const router = Router();

router.get("/", authenticateToken, async (req: Request, res: Response) => {
  const user: IUserTokenData = req.body.user;
  const { code, ...response } = await tryCatch(
    YamsService.getYamsResults.bind(YamsService),
    user.email
  );

  res.status(code).send(response);
});

export default router;
