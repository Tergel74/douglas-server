import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { RefreshTokenDto, SignInDto, SignUpDto } from './dto/auth.dto';
import { Request, Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto, @Res() res: Response) {
    return this.authService.signUp(signUpDto, res);
  }

  @Post('sign-in')
  async signIn(@Req() req: Request, @Res() res: Response) {
    return this.authService.signIn(req, res);
  }

  // @Post('refresh-token')
  // async refreshToken(@Req() req: Request, @Res() res: Response) {
  //   return this.authService.refreshToken(req, res);
  // }
}
