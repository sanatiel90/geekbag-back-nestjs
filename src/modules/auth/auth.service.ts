import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDTO } from './dto/register-dto';
import { UserRepository } from '../shared/database/repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  login() {
    return 'faz o login';
  }

  async register(registerDTO: RegisterDTO) {
    const { email, name, password } = registerDTO;

    const emailUsed = await this.userRepository.findUnique({
      where: {
        email,
      },
    });

    if (emailUsed) {
      throw new ConflictException('E-mail já está sendo usado');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepository.create({
      data: {
        email,
        name,
        password: hashPassword,
        categories: {
          createMany: {
            data: [
              { name: 'Hqs', icon: 'comics', order: 1 },
              { name: 'Mangás', icon: 'mangas', order: 2 },
              { name: 'Animes', icon: 'animes', order: 3 },
              { name: 'Filmes', icon: 'movies', order: 4 },
              { name: 'Séries', icon: 'series', order: 5 },
              { name: 'Games', icon: 'games', order: 6 },
              { name: 'Board Games', icon: 'boardgames', order: 7 },
              { name: 'Livros', icon: 'books', order: 8 },
            ],
          },
        },
      },
    });

    const accessToken = await this.generateAccessToken(user.id);

    return { accessToken };
  }

  generateAccessToken(userId: string) {
    return this.jwtService.signAsync(userId);
  }
}
