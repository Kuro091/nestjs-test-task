import { MigrationInterface, QueryRunner } from 'typeorm';

export class LocusMemberToOneTomany1697666572572 implements MigrationInterface {
  name = 'LocusMemberToOneTomany1697666572572';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "locus_member" DROP CONSTRAINT "FK_0505cbf40f56c0d818d6524cdcd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "locus_member" DROP CONSTRAINT "REL_0505cbf40f56c0d818d6524cdc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "locus_member" ADD CONSTRAINT "FK_0505cbf40f56c0d818d6524cdcd" FOREIGN KEY ("locusId") REFERENCES "locus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "locus_member" DROP CONSTRAINT "FK_0505cbf40f56c0d818d6524cdcd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "locus_member" ADD CONSTRAINT "REL_0505cbf40f56c0d818d6524cdc" UNIQUE ("locusId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "locus_member" ADD CONSTRAINT "FK_0505cbf40f56c0d818d6524cdcd" FOREIGN KEY ("locusId") REFERENCES "locus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
