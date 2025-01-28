import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class BodyCreateTripDTO {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  user_id?: string | null;

  @ApiProperty({ required: true, example: "Taiwan" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false, example: "Taiwan thin me hoi." })
  @IsString()
  @IsOptional()
  description?: string | null;

  @ApiProperty({ required: false, example: "2024-12-01" })
  @IsDateString()
  @IsOptional()
  start_date?: Date | null;

  @ApiProperty({ required: false, example: "2024-12-05" })
  @IsDateString()
  @IsOptional()
  end_date?: Date | null;
}
