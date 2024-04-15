import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersModel } from '../schema/user.schema';
import { ValidateUserDetails } from 'src/types/validate-user.types';
import { compareHash, hashPassword } from 'src/utils/helpers';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from '../dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name)
    private readonly userModel: UsersModel,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { username, email, password } = signUpDto;

    const HashPassword = await hashPassword(password);
    const user = await this.userModel.create({
      username,
      email,
      password: HashPassword,
    });

    const token = this.jwtService.sign({ _id: user._id });
    return { token };
  }

  async login(user: Users): Promise<any> {
    return user;
  }

  async validateUser(userDetails: ValidateUserDetails) {
    const user = await this.userModel.findOne({
      email: userDetails.email.toLowerCase(),
    });
    if (!user) throw new UnauthorizedException('Invalid Email');

    const isPasswordValid = await compareHash(
      userDetails.password,
      user.password,
    );

    if (!isPasswordValid) throw new UnauthorizedException('Invalid password');

    return user;
  }
}
