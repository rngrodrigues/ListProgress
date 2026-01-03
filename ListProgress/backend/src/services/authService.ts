import { UserRepository } from '../repositories/userRepository.ts';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userRepository = new UserRepository();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export class AuthService {

  /**
   * Registra um novo usuário.
   * - Verifica se o email já está cadastrado
   * - Cria hash da senha
   * - Insere usuário no banco
   * - Gera token JWT de 1 hora
   */
  async register(email: string, password: string, name?: string) {
    try {
      // Checa se usuário já existe
      const existingUser = await userRepository.getUserByEmail(email);
      if (existingUser) {
        console.error('Email já cadastrado:', email);
        throw { statusCode: 400, message: 'Email já cadastrado' };
      }

      // Gera hash da senha para segurança
      const hashedPassword = await bcrypt.hash(password, 10);

      // Cria usuário no banco
      const newUser = await userRepository.createUser({
        email,
        password: hashedPassword,
        name
      });

      if (!newUser) {
        console.error('Erro ao criar usuário para o email:', email);
        throw { statusCode: 500, message: 'Erro ao criar usuário' };
      }

      // Gera token JWT com id e email
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

  /**
   * Login de usuário existente.
   * - Verifica se usuário existe
   * - Compara senha com hash armazenado
   * - Gera token JWT de 1 hora
   */
  async login(email: string, password: string) {
    try {
      // Busca usuário pelo email
      const user = await userRepository.getUserByEmail(email);

      if (!user) {
        console.error('Usuário não encontrado:', email);
        throw { statusCode: 404, message: 'Usuário não encontrado' };
      }

      // Compara senha informada com hash do banco
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        console.error('Senha incorreta para o email:', email);
        throw { statusCode: 401, message: 'Senha incorreta' };
      }

      // Gera token JWT
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
