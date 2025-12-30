import { UserRepository } from '../repositories/userRepository.ts';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userRepository = new UserRepository();

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export class AuthService {

  async register(email: string, password: string, name?: string) {
    try {
      const existingUser = await userRepository.getUserByEmail(email);

      if (existingUser) {
        console.error('Email já cadastrado:', email);
        throw { statusCode: 400, message: 'Email já cadastrado' };
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await userRepository.createUser({
        email,
        password: hashedPassword,
        name
      });

      if (!newUser) {
        console.error('Erro ao criar usuário para o email:', email);
        throw { statusCode: 500, message: 'Erro ao criar usuário' };
      }

      const token = jwt.sign(
        { id: newUser.id, email: newUser.email },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      console.log('Usuário criado com sucesso:', newUser.email);

      return {
        token,
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name
        }
      };
    } catch (error) {
      console.error('Erro no registro de usuário:', error);
      throw error; 
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await userRepository.getUserByEmail(email);

      if (!user) {
        console.error('Usuário não encontrado:', email);
        throw { statusCode: 404, message: 'Usuário não encontrado' };
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        console.error('Senha incorreta para o email:', email);
        throw { statusCode: 401, message: 'Senha incorreta' };
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '1h' }
      );
      console.log('Usuário logado com sucesso:', user.email);

      return {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      };
    } catch (error) {
      console.error('Erro no login de usuário:', error);
      throw error; 
    }
  }
}
