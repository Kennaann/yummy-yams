import { Request, Response, Router } from "express";
import YamsController from "../controllers/yams.controller";
import AuthService from "../services/auth.service";
import { IUserTokenData } from "../interfaces/user.interface";

const router = Router();

router.get(
  "/",
  AuthService.authenticateToken,
  async (req: Request, res: Response) => {
    const user: IUserTokenData = req.body.user;
    const { code, ...response } = await YamsController.getYamsResults(
      user.email
    );

    res.status(code).send(response);
  }
);

export default router;
