import { Router } from "express";
import LeaderBoardService from "../services/leaderboard.service";

const router = Router();

router.get("/wins", async (_req, res) => {
  const { code, ...response } =
    await LeaderBoardService.getCurrentLeaderboardWins();

  return res.status(code).send(response.data);
});

export default router;
