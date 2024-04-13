import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(403).send({ message: "No token provided" });

  jwt.verify(
    token,
    process.env.TOKEN_SECRET as string,
    (err: any, user: any) => {
      if (err) {
        console.error(err);
        return res.status(403).send({ message: "Invalid token" });
      }

      req.body.user = user;
      next();
    }
  );
}

export default authenticateToken;
