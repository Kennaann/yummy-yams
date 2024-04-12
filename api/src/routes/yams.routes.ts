import { Request, Response, Router } from "express";
import AuthService from "../services/auth.service";
import { IUserTokenData } from "../interfaces/user.interface";
import YamsService from "../services/yams.service";

const router = Router();

router.get(
  "/",
  AuthService.authenticateToken,
  async (req: Request, res: Response) => {
    const user: IUserTokenData = req.body.user;
    const { code, ...response } = await YamsService.getYamsResults(user.email);

    res.status(code).send(response);
  }
);

export default router;
