import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Trips } from 'src/database/models/trips.model';
import { Users } from 'src/database/models/users.model';
import { Logger } from 'src/logger/logger.service';
import type { ServiceActionOptions } from 'src/shared/types/service-action';
import { validateDTO } from 'src/shared/utils/validation/dto.validation';
import { UsersService } from '../users/users.service';
import { BodyCreateTripDTO } from './dto/create-trip.dto';
import { ParamsFindTripByTripIdDTO } from './dto/get-trip-by-trip-id.dto';
import { BodyUpdateTripDTO, ParamsUpdateTripDTO } from './dto/update-trip.dto';

@Injectable()
export class TripsService {
  constructor(
    private readonly sqz: Sequelize,
    private readonly logger: Logger,
    private readonly usersService: UsersService,

    @InjectModel(Trips) private readonly trips: typeof Trips,
  ) {
    this.logger.setContext(TripsService.name);
  }

  get model(): typeof Trips {
    return this.trips;
  }

  async findTripBydTripId(
    params: ParamsFindTripByTripIdDTO,
    options?: ServiceActionOptions,
  ): Promise<Trips> {
    if (options?.validateDTO) {
      await validateDTO(params, options);
    }

    const trip = await this.trips.findByPk(params.trip_id, {
      transaction: options?.transaction,
      raw: true,
      include: [
        {
          model: Users,
          required: false,
        },
      ],
      nest: true,
    });

    if (!trip) {
      throw new NotFoundException("Trip does not exist.");
    }

    return trip;
  }

  async createTrip(
    body: BodyCreateTripDTO,
    options?: ServiceActionOptions,
  ): Promise<Trips> {
    if (options?.validateDTO) {
      await validateDTO(body, options);
    }

    const transaction = options?.transaction ?? (await this.sqz.transaction());

    try {
      const resultCreateTrip = await this.trips.create(
        {
          ...body,
          // created_at: dayjs().utc().toDate().toISOString(),
          // updated_at: dayjs().utc().toDate().toISOString()
        },
        {
          transaction,
          returning: true,
          raw: true,
        },
      );

      await transaction.commit();
      return resultCreateTrip;
    } catch (error) {
      this.logger.error(error, error?.stack, this.createTrip.name);
      await transaction.rollback();
      throw error;
    }
  }

  async updateTripByTripId(
    params: ParamsUpdateTripDTO,
    body: BodyUpdateTripDTO,
    options?: ServiceActionOptions,
  ): Promise<{ affectedCount: number; recordsAffected: Trips[] }> {
    if (options?.validateDTO) {
      await validateDTO(body, options);
    }

    const transaction = options?.transaction ?? (await this.sqz.transaction());
    try {
      const [affectedCount, recordsAffected] = await this.trips.update(body, {
        where: {
          id: params.trip_id,
        },
        transaction,
        returning: true,
      });

      if (!options?.transaction) {
        await transaction.commit();
      }
      return { affectedCount, recordsAffected };
    } catch (error) {
      this.logger.error(error, error?.stack, this.updateTripByTripId.name);

      if (!options?.transaction) {
        await transaction.rollback();
      }
      throw error;
    }
  }
}
