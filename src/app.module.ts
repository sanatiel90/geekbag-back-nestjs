import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './modules/shared/database/database.module';
import { UserModule } from './modules/users/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/AuthGuard';

@Module({
  imports: [UserModule, DatabaseModule, AuthModule],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
