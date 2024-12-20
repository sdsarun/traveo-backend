import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Users } from "src/database/models/users.model";
import { FindAllUsersDTO } from "./dto/find-all-users.dto";
import { FindOptions, Transaction } from "sequelize";
import { Op } from "sequelize";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users) private readonly users: typeof Users
  ) { }

}