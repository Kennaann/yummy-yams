import { Request, Response, Router } from "express";
import type { IRegisterUserDTO } from "../interfaces/user.interface";
import AuthController from "../controllers/auth.controller";

const router = Router();

router.post(
  "/register",
  async (req: Request<{}, {}, IRegisterUserDTO>, res: Response) => {
    const { code, ...response } = await AuthController.registerUser(req.body);

    res.status(code).send(response);
  }
);

router.post("/login", async (req: Request, res: Response) => {
  const { code, ...response } = await AuthController.loginUser(req.body);

  res.status(code).send(response);
});

export default router;
