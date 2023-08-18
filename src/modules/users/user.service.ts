import { Injectable } from '@nestjs/common';
import { UserRepository } from '../shared/database/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  me() {
    return { msg: 'OK' };
  }
}
