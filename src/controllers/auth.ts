import { sign, verify } from "jsonwebtoken";
import { compare } from "bcryptjs";
import { IUser } from "@src/models/User";
import UserService from "@src/services/UserService";
import { Request, Response, RequestHandler } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export async function login(req: Request, res: Response) {
  const { account_username, password } = req.body;
  if (!account_username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }
  const user = await UserService.getUserByUsername(account_username);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  const valid = await compare(password, user.password_hash);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });
  const token = sign(
    { userId: user._id, isAdmin: user.is_teacher },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
  res.json({ token, user });
}

export const authenticateJWT: RequestHandler = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    res.status(401).json({ error: "No token" });
    return;
  }
  try {
    const payload = verify(auth.split(" ")[1], JWT_SECRET);
    (req as any).user = payload;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};
