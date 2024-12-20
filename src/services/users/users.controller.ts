import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ClerkClient, clerkClient, requireAuth } from '@clerk/express';
import { Request, Response } from 'express';


const checker = requireAuth();

@ApiBearerAuth()
@Controller({ path: 'users' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(
    @Req() req: Request,
    @Query() query: Parameters<ClerkClient['users']['getUserList']>[0],
  ) {
    return clerkClient.users.getUserList(query);
  }
}
