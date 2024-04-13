import { Request, Response, Router } from "express";
import type { IRegisterUserDTO } from "../interfaces/auth.interface";
import tryCatch from "../utils/try-catch.util";
import AuthController from "../controllers/auth.controller";
import { ICreateUserModel } from "../interfaces/user.interface";

const router = Router();

router.post(
  "/register",
  async (req: Request<{}, {}, IRegisterUserDTO>, res: Response) => {
    const { code, ...response } = await tryCatch<
      IRegisterUserDTO,
      ICreateUserModel
    >(AuthController.registerUser.bind(AuthController), req.body);

    res.status(code).send(response);
  }
);

router.post("/login", async (req: Request, res: Response) => {
  const { code, ...response } = await tryCatch(
    AuthController.loginUser.bind(AuthController),
    req.body
  );

  res.status(code).send(response);
});

export default router;
