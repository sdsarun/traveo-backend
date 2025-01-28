import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ParamsFindTripByTripIdDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  trip_id: string;
}