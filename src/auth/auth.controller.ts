import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() user: any) {
    return this.authService.registerUser(user);
  }

  @Post('login')
  login(@Body() user: any) {
    return this.authService.login(user);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  profile(@Request() req: any) {
    return req.user;
  }
}
