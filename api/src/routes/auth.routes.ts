import { Request, Response, Router } from "express";
import type { IAuthUserData } from "../interfaces/auth.interface";
import tryCatch from "../utils/try-catch.util";
import AuthController from "../controllers/auth.controller";
import { ICreateUserModel } from "../interfaces/user.interface";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  const { code, ...response } = await tryCatch<IAuthUserData, ICreateUserModel>(
    AuthController.registerUser.bind(AuthController),
    req.body
  );

  res.status(code).send(response);
});

router.post("/login", async (req: Request, res: Response) => {
  const { code, ...response } = await tryCatch<IAuthUserData>(
    AuthController.loginUser.bind(AuthController),
    req.body
  );

  res.status(code).send(response);
});

export default router;
