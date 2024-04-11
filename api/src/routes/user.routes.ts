import { Request, Response, Router } from "express";
import type { ICreateUserDTO } from "../interfaces/user.interface";
import UserController from "../controllers/user.controller";

const router = Router();

router.post(
  "/create",
  async (req: Request<{}, {}, ICreateUserDTO>, res: Response) => {
    const { code, ...response } = await UserController.createUser(req.body);

    res.status(code).send(response);
  }
);

export default router;
