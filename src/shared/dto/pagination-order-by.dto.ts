import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, Max, Min, ValidateNested } from "class-validator";
import { OrderByDTO } from "./order-by.dto";

export class PaginationOrderByDTO {
  @ApiProperty({ name: "page", required: false })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(1000)
  @Transform(({ value }) => +value)
  page?: number;

  @ApiProperty({ name: "pageSize", required: false })
  @IsOptional()
  @Min(1)
  @Max(1000)
  @Transform(({ value }) => +value)
  pageSize?: number;

  @ApiProperty({ name: "orderBy", required: false, type: [OrderByDTO], example: [{ order_column: "name", order_direction: "asc" }] })
  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => OrderByDTO)
  orderBy?: OrderByDTO[]
}