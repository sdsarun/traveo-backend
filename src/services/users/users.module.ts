import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Users } from "src/database/models/users.model";
import { UsersController } from "./users.controller";

@Module({
  imports: [
    SequelizeModule.forFeature([Users]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService, SequelizeModule]
})
export class UsersModule {}