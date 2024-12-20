import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class OrderByDTO {
  @ApiProperty({ name: "order_column", required: false })
  @IsOptional()
  @IsString()
  order_column?: string;

  @ApiProperty({ name: "order_direction", required: false, enum: ["asc", "desc"] })
  @IsOptional()
  @IsEnum(["asc", "desc"])
  order_direction?: "asc" | "desc"
}