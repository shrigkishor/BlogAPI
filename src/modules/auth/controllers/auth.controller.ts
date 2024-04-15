import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from 'src/guards/local.guard';
import { SignUpDto } from '../dto/signup.dto';
import { Response, Request } from 'express';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async loginUser(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    const data = await this.authService.login(req.user);
    return data;
  }
}
