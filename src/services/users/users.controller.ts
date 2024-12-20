import { ClerkClient, clerkClient } from '@clerk/express';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiBearerAuth()
@Controller({ path: 'users' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(
    @Query() query: Parameters<ClerkClient['users']['getUserList']>[0],
  ) {
    return clerkClient.users.getUserList(query);
  }
}
