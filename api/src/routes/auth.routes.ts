import { Request, Response, Router } from "express";
import type { IRegisterUserDTO } from "../interfaces/auth.interface";
import AuthService from "../services/auth.service";
import tryCatch from "../utils/try-catch.util";

const router = Router();

router.post(
  "/register",
  async (req: Request<{}, {}, IRegisterUserDTO>, res: Response) => {
    const { code, ...response } = await tryCatch<IRegisterUserDTO>(
      AuthService.registerUser.bind(AuthService),
      req.body
    );

    res.status(code).send(response);
  }
);

router.post("/login", async (req: Request, res: Response) => {
  const { code, ...response } = await tryCatch(
    AuthService.loginUser.bind(AuthService),
    req.body
  );

  res.status(code).send(response);
});

export default router;
