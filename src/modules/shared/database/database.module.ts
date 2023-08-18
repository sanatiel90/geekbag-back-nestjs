import { Global, Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [UserRepository, PrismaService],
  exports: [UserRepository],
})
export class DatabaseModule {}
