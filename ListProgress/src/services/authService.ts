import { UserRepository } from '../repository/userRepository.ts';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userRepository = new UserRepository();

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export class AuthService {

  async register(email: string, password: string, name?: string) {
    const existingUser = await userRepository.getUserByEmail(email);

    if (existingUser) {
      throw new Error('Email já cadastrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userRepository.createUser({
      email,
      password: hashedPassword,
      name
    });

    if (!newUser) {
      throw new Error('Erro ao criar usuário');
    }

     const token = jwt.sign(
    { id: newUser.id, email: newUser.email },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  return {
    token,
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name
    }
  };
  }

  async login(email: string, password: string) {
    const user = await userRepository.getUserByEmail(email);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new Error('Senha incorreta');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    };
  }
}
