import { DeletedObjectJSON, UserJSON } from '@clerk/express';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Users } from 'src/database/models/users.model';
import dayjs from 'src/lib/dayjs';
import { Logger } from 'src/logger/logger.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly logger: Logger,
    private readonly sqz: Sequelize,

    @InjectModel(Users) private readonly users: typeof Users,
  ) {
    this.logger.setContext(UsersService.name);
  }

  get usersModel(): typeof Users {
    return this.users;
  }

  async findUsers(): Promise<Users[]> {
    const listUsers = await this.users.findAll({
      where: {},
      raw: true,
    });

    return listUsers;
  }

  async isUserExistByUserId(
    userId: string,
    transaction?: Transaction,
  ): Promise<boolean> {
    const users = await this.users.findByPk(userId, { transaction, raw: true });
    return !!users;
  }

  async createUserFromWebhook(payload: UserJSON): Promise<void> {
    await this.users.create(
      {
        id: payload.id,
        username: payload.username,
        last_name: payload.last_name,
        first_name: payload.first_name,
      },
      { returning: true },
    );
  }

  async deleteUserFromWebhook(payload: DeletedObjectJSON): Promise<void> {
    if (!payload.deleted || !payload.id) {
      return;
    }

    await this.sqz.transaction(async (t) => {
      await this.users.destroy({ where: { id: payload?.id }, transaction: t });
    });
  }

  async updateUserFromWebhook(payload: UserJSON): Promise<void> {
    await this.sqz.transaction(async (t) => {
      await this.users.upsert(
        {
          id: payload.id,
          username: payload.username,
          last_name: payload.last_name,
          first_name: payload.first_name,
          updated_at: dayjs(payload.updated_at).utc().toDate(),
        },
        {
          conflictFields: ['id'],
          transaction: t,
        },
      );
    });
  }
}
