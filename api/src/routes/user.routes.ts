import { Request, Response, Router } from "express";
import type { IUserDTO } from "../interfaces/user.interface";
import UserController from "../controllers/user.controller";

const router = Router();

router.post("/create", (req: Request<{}, {}, IUserDTO>, res: Response) => {
  const response = UserController.createUser(req.body);

  res.send(response);
});

export default router;
