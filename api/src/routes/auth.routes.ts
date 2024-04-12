import { Request, Response, Router } from "express";
import type { IRegisterUserDTO } from "../interfaces/auth.interface";
import AuthService from "../services/auth.service";

const router = Router();

router.post(
  "/register",
  async (req: Request<{}, {}, IRegisterUserDTO>, res: Response) => {
    const { code, ...response } = await AuthService.registerUser(req.body);

    res.status(code).send(response);
  }
);

router.post("/login", async (req: Request, res: Response) => {
  const { code, ...response } = await AuthService.loginUser(req.body);

  res.status(code).send(response);
});

export default router;
