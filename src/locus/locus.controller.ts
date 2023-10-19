import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LocusService } from './locus.service';
import { infinityPagination } from 'src/utils/infinity-pagination';
import { Locus } from './entities/locus.entity';
import { InfinityPaginationResultType } from 'src/utils/types/infinity-pagination-result.type';
import { AuthGuard } from '@nestjs/passport';
import { GetLocusDto } from './dto/get-locus.dto';
import { LocusInterceptor } from './interceptors/locus.interceptor';

@ApiTags('Locus')
@Controller({
  path: 'locus',
  version: '1',
})
export class LocusController {
  constructor(private service: LocusService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(LocusInterceptor)
  async findAll(
    @Query() filters: GetLocusDto,
  ): Promise<InfinityPaginationResultType<Locus>> {
    const result = await this.service.findManyWithPagination(filters);

    return infinityPagination(result, {
      limit: filters.limit ? filters.limit : 1000,
      page: filters.page || 1,
    });
  }
}
