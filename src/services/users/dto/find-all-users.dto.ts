import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator";
import { PaginationOrderByDTO } from "src/shared/dto/pagination-order-by.dto";

export class FindAllUsersDTO extends PaginationOrderByDTO {
  @ApiProperty({ name: "username", required: false })
  @IsString()
  @IsOptional()
  username?: string;

}