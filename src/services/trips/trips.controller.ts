import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse
} from '@nestjs/swagger';
import { BodyCreateTripDTO } from './dto/create-trip.dto';
import { ParamsFindTripByTripIdDTO } from './dto/get-trip-by-trip-id.dto';
import { ParamsUpdateTripDTO, BodyUpdateTripDTO } from './dto/update-trip.dto';
import { TripsService } from './trips.service';

@ApiBearerAuth()
@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @ApiOperation({ summary: 'Get trips info with user created by tripId' })
  @HttpCode(HttpStatus.OK)
  @Get('/:trip_id')
  async findTripByTripId(@Param() params: ParamsFindTripByTripIdDTO) {
    return this.tripsService.findTripBydTripId(params);
  }

  @ApiOperation({ summary: 'Create trip from guest or logged in users' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createTrip(@Body() body: BodyCreateTripDTO) {
    return this.tripsService.createTrip(body);
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'Update success' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid request',
  })
  @ApiOperation({ summary: 'Update trip from guest or logged in users' })
  @HttpCode(HttpStatus.OK)
  @Put('/:trip_id')
  async updateTripByTripId(
    @Param() params: ParamsUpdateTripDTO,
    @Body() body: BodyUpdateTripDTO,
  ) {
    return this.tripsService.updateTripByTripId(params, body);
  }
}
