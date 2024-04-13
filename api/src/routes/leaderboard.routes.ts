import { Request, Response, Router } from "express";
import LeaderBoardController from "../controllers/leaderboard.controller";
import tryCatch from "../utils/try-catch.util";
import { ILeaderBoardWin } from "../interfaces/leaderboard.interface";

const router = Router();

router.get("/wins", async (_req: Request, res: Response) => {
  const { code, ...response } = await tryCatch<ILeaderBoardWin[]>(
    LeaderBoardController.getCurrentLeaderboardWins.bind(LeaderBoardController)
  );

  return res.status(code).send(response);
});

router.get("/is-open", async (_req: Request, res: Response) => {
  const { code, ...response } = await tryCatch<boolean>(
    LeaderBoardController.isGameOpen.bind(LeaderBoardController)
  );

  return res.status(code).send(response);
});

export default router;
