import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

interface RefreshTokenPayload {
  id: string;
  email: string;
  type: "refresh";
}

export async function refreshTokenController(req: Request, res: Response) {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token não fornecido' });
    }

    // Verifica se o refresh token é válido
    const decoded = jwt.verify(refreshToken, JWT_SECRET) as RefreshTokenPayload;

    // Confirma que é realmente um refresh token
    if (decoded.type !== "refresh") {
      return res.status(401).json({ message: "Token inválido para refresh" });
    }

    // --- Gera novos tokens ---
    const newAccessToken = jwt.sign(
      {
        id: decoded.id,
        email: decoded.email,
        type: "access"
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    const newRefreshToken = jwt.sign(
      {
        id: decoded.id,
        email: decoded.email,
        type: "refresh"
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log("Novo access token payload:", jwt.decode(newAccessToken));
    console.log("Novo refresh token payload:", jwt.decode(newRefreshToken));

    // Retorna os dois tokens
    return res.json({ 
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    });

  } catch (err) {
    console.error('Erro ao validar refresh token:', err);
    return res.status(401).json({ message: 'Refresh token inválido ou expirado' });
  }
}
