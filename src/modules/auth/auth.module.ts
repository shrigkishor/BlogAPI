import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { UsersRepository } from './repositories/token.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UsersSchema,
      },
    ]),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, AccessTokenStrategy,UsersRepository],
})
export class AuthModule {}
