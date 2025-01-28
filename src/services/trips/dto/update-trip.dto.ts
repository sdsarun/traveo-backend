import { BodyCreateTripDTO } from './create-trip.dto';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty, OmitType } from '@nestjs/swagger';

export class ParamsUpdateTripDTO {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  trip_id: string;
}

export class BodyUpdateTripDTO extends OmitType(BodyCreateTripDTO, ['user_id']) {}
