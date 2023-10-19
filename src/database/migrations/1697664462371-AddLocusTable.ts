import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLocusTable1697664462371 implements MigrationInterface {
  name = 'AddLocusTable1697664462371';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "locus" ("id" SERIAL NOT NULL, "assemblyId" character varying NOT NULL, "memberCount" integer NOT NULL, "locusName" character varying NOT NULL, "publicLocusName" character varying NOT NULL, "chromosome" character varying NOT NULL, "strand" character varying NOT NULL, "locusStart" integer NOT NULL, "locusStop" integer NOT NULL, CONSTRAINT "PK_2f4891420e7fe14530f0b4718e8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "locus_member" ("id" SERIAL NOT NULL, "ursTaxid" character varying, "membershipStatus" character varying, "regionId" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "locusId" integer, CONSTRAINT "REL_0505cbf40f56c0d818d6524cdc" UNIQUE ("locusId"), CONSTRAINT "PK_fc55a23c4cf9003a817116f4683" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "locus_member" ADD CONSTRAINT "FK_0505cbf40f56c0d818d6524cdcd" FOREIGN KEY ("locusId") REFERENCES "locus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "locus_member" DROP CONSTRAINT "FK_0505cbf40f56c0d818d6524cdcd"`,
    );
    await queryRunner.query(`DROP TABLE "locus_member"`);
    await queryRunner.query(`DROP TABLE "locus"`);
  }
}
