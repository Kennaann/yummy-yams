import { Request, Response, Router } from "express";
import type { IRegisterUserDTO } from "../interfaces/user.interface";
import UserController from "../controllers/user.controller";

const router = Router();

router.post(
  "/register",
  async (req: Request<{}, {}, IRegisterUserDTO>, res: Response) => {
    const { code, ...response } = await UserController.registerUser(req.body);

    res.status(code).send(response);
  }
);

export default router;
