import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { Strategy } from 'passport-jwt';
import { UsersModel } from '../schema/user.schema';
import { UsersRepository } from '../repositories/token.repository';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'access-token',
) {
  constructor(private userRepo: UsersRepository) {
    super({
      jwtFromRequest: (req: Request) =>
        req.headers.authorization?.split(' ')[1] || req.cookies.accessToken,
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload): Promise<any> {
    const user = await this.userRepo.findById(payload.sub);
    if (user) return user;
    throw new UnauthorizedException('Unauthorized');
  }
}
