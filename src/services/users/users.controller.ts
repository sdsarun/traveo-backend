import { Controller, Get } from "@nestjs/common";
import { UsersService } from "./users.service";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Users } from "src/database/models/users.model";

@ApiBearerAuth()
@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

  @Get()
  async findUsers(): Promise<Users[]> {
    return this.usersService.findUsers();
  }
}