import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

interface JwtPayload {
  id: string;
  email: string;
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  console.log("AUTH HEADER:", authHeader);

  if (!authHeader) {
    console.log("Token NÃO informado");
    return res.status(401).json({ message: "Token não informado" });
  }

  const [, token] = authHeader.split(" ");
  console.log("TOKEN RECEBIDO:", token);

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & { type: string };

    if (decoded.type !== "access") {
      return res.status(401).json({ message: "Token inválido para essa rota" });
    }

    console.log("JWT DECODED:", decoded);

    req.user = {
      id: decoded.id,
      email: decoded.email
    };
    console.log("REQ.USER DEFINIDO:", req.user);

    next();
  } catch (err) {
    console.log("Token inválido:", err);
    return res.status(401).json({ message: "Token inválido" });
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}
