import { UserRepository } from '../repositories/userRepository.ts';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userRepository = new UserRepository();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export class AuthService {

  private generateAccessToken(id: string, email: string) {
    return jwt.sign(
      { id, email, type: 'access' }, 
      JWT_SECRET,
      { expiresIn: '1h' }
    );
  }

  private generateRefreshToken(id: string, email: string) {
    return jwt.sign(
      { id, email, type: 'refresh' }, 
      JWT_SECRET,
      { expiresIn: '7d' }
    );
  }

  async register(email: string, password: string, name?: string) {
    const existingUser = await userRepository.getUserByEmail(email);
    if (existingUser) throw { statusCode: 400, message: 'Email já cadastrado' };

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userRepository.createUser({
      email,
      password: hashedPassword,
      name
    });

    if (!newUser) throw { statusCode: 500, message: 'Erro ao criar usuário' };

    const accessToken = this.generateAccessToken(newUser.id, newUser.email);
    const refreshToken = this.generateRefreshToken(newUser.id, newUser.email);

    return {
      accessToken,
      refreshToken,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
      }
    };
  }

  async login(email: string, password: string) {
    const user = await userRepository.getUserByEmail(email);
    if (!user) throw { statusCode: 404, message: 'Usuário não encontrado' };

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw { statusCode: 401, message: 'Senha incorreta' };

    if (!user.id || !user.email) throw new Error('Usuário inválido: faltando id ou email');

    const accessToken = this.generateAccessToken(user.id, user.email);
    const refreshToken = this.generateRefreshToken(user.id, user.email);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    };
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const decoded = jwt.verify(refreshToken, JWT_SECRET) as { id: string; email: string; type: string };
      
      if (decoded.type !== 'refresh') {
        throw new Error('Token inválido para refresh');
      }

      const newAccessToken = this.generateAccessToken(decoded.id, decoded.email);
      return { accessToken: newAccessToken };
    } catch (err) {
      console.error('Erro ao validar refresh token:', err);
      throw { statusCode: 401, message: 'Refresh token inválido ou expirado' };
    }
  }
}
