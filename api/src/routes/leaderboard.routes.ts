import { Request, Response, Router } from "express";
import LeaderBoardService from "../services/leaderboard.service";
import tryCatch from "../utils/try-catch.util";
import { ILeaderBoardWin } from "../interfaces/leaderboard.interface";

const router = Router();

router.get("/wins", async (_req: Request, res: Response) => {
  const { code, ...response } = await tryCatch<ILeaderBoardWin[]>(
    LeaderBoardService.getCurrentLeaderboardWins.bind(LeaderBoardService)
  );

  return res.status(code).send(response);
});

router.get("/is-open", async (_req: Request, res: Response) => {
  const { code, ...response } = await tryCatch<boolean>(
    LeaderBoardService.isGameOpen.bind(LeaderBoardService)
  );

  return res.status(code).send(response);
});

export default router;
