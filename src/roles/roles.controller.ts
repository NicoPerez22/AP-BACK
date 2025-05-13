import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get('')
  @UseGuards(AuthGuard)
  profile(@Request() req: any) {
    return req;
  }
}
