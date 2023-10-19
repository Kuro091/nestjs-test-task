import { ApiProperty } from '@nestjs/swagger';
import { EntityHelper } from 'src/utils/entity-helper';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LocusMember } from './locusMember.entity';

@Entity()
export class Locus extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String })
  @ApiProperty()
  assemblyId: string;

  @Column({ type: Number })
  @ApiProperty()
  memberCount: number;

  @Column({ type: String })
  @ApiProperty()
  locusName: string;

  @Column({ type: String })
  @ApiProperty()
  publicLocusName: string;

  @Column({ type: String })
  @ApiProperty()
  chromosome: string;

  @Column({ type: String })
  @ApiProperty()
  strand: string;

  @Column({ type: Number })
  @ApiProperty()
  locusStart: number;

  @Column({ type: Number })
  @ApiProperty()
  locusStop: number;

  @OneToMany(() => LocusMember, (locusMember) => locusMember.locus)
  locusMember: LocusMember;
}
