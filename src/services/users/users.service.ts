import { DeletedObjectJSON, UserJSON } from '@clerk/express';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
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

  async findUsers() {
    const listUsers = await this.users.findAll({
      where: {},
    });

    return listUsers;
  }

  async createUserFromWebhook(payload: UserJSON) {
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

  async deleteUserFromWebhook(payload: DeletedObjectJSON) {
    if (!payload.deleted || !payload.id) {
      return;
    }

    await this.sqz.transaction(async (t) => {
      await this.users.destroy({ where: { id: payload?.id }, transaction: t });
    });
  }

  async updateUserFromWebhook(payload: UserJSON) {
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
