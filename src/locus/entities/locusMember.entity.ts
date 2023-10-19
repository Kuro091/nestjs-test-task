import { ApiProperty } from '@nestjs/swagger';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Locus } from './locus.entity';

@Entity()
export class LocusMember extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: String, nullable: true })
  ursTaxid: string;

  @ApiProperty()
  @Column({ type: String, nullable: true })
  membershipStatus: string;

  @ApiProperty()
  @Column({ type: String, nullable: true })
  regionId: number;

  @ManyToOne(() => Locus, (locus) => locus.locusMember)
  locus: Locus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
