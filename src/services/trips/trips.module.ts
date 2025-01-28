import { Module } from "@nestjs/common";
import { TripsService } from "./trips.service";
import { TripsController } from "./trips.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Trips } from "src/database/models/trips.model";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Trips]),
    UsersModule,
  ],
  providers: [TripsService],
  controllers: [TripsController],
  exports: [SequelizeModule, TripsService]
})
export class TripsModule {}