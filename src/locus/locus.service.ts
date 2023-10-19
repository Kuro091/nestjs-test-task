import { Injectable } from '@nestjs/common';
import { GetLocusDto } from './dto/get-locus.dto';
import { Locus } from './entities/locus.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LocusService {
  constructor(
    @InjectRepository(Locus)
    private locusRepository: Repository<Locus>,
  ) {}

  async findManyWithPagination(filters: GetLocusDto): Promise<Locus[]> {
    const {
      id,
      assemblyId,
      regionId,
      membershipStatus,
      sideLoading,
      limit,
      page,
    } = filters;

    // TypeORM builder with all these filters
    const query = this.locusRepository.createQueryBuilder('locus');
    const defaultLimit = limit ? limit : 1000;

    query
      .leftJoin('locus.locusMember', 'locusMember')
      .where('locusMember.id IS NOT NULL');

    if (id) {
      query.where('locus.id = :id', { id });
    }

    if (assemblyId) {
      query.where('locus.assemblyId = :assemblyId', { assemblyId });
    }

    if (sideLoading) {
      query.addSelect('locusMember', 'locusMember.id');

      if (membershipStatus) {
        query.where('locusMember.membershipStatus = :membershipStatus', {
          membershipStatus,
        });
      }
      if (regionId) {
        query.where('locusMember.regionId = :regionId', { regionId });
      }
    }

    if (page) {
      query.skip((page - 1) * defaultLimit);
    }

    query.take(defaultLimit);

    return query.getMany();
  }
}
