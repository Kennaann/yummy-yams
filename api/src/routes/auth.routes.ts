import { Request, Response, Router } from "express";
import AuthController from "../controllers/auth.controller";
import type { IRegisterUserDTO } from "../interfaces/auth.interface";

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
