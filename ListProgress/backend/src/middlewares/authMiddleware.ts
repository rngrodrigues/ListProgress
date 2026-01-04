import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Chave secreta para validar tokens JWT
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// Interface do payload que esperamos no token
interface JwtPayload {
  id: string;
  email: string;
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization; // Pega header Authorization
  console.log("AUTH HEADER:", authHeader);

  // Se não houver token, retorna erro 401
  if (!authHeader) {
    console.log("Token NÃO informado");
    return res.status(401).json({ message: "Token não informado" });
  }

  const [, token] = authHeader.split(" "); // Header normalmente "Bearer <token>"
  console.log("TOKEN RECEBIDO:", token);

  try {
    // Verifica e decodifica token
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & { type: string };

// Permitir apenas access tokens
if (decoded.type !== "access") {
  return res.status(401).json({ message: "Token inválido para essa rota" });
}

    console.log("JWT DECODED:", decoded);

    // Adiciona usuário autenticado à requisição para acesso nos controllers
    req.user = {
      id: decoded.id,
      email: decoded.email
    };
    console.log("REQ.USER DEFINIDO:", req.user);

    next(); // Continua para o próximo middleware ou rota
  } catch (err) {
    console.log("Token inválido:", err);
    return res.status(401).json({ message: "Token inválido" });
  }
}

// Extensão da interface Request do Express para incluir user
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
