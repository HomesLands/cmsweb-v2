import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateResource1728182827106 implements MigrationInterface {
  name = "CreateResource1728182827106";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`resource_tbl\` (\`id_column\` varchar(36) NOT NULL, \`slug_column\` varchar(255) NOT NULL, \`created_at_column\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at_column\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at_column\` datetime(6) NULL, \`name_column\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_1efeaa4c3b15184686e572d76a\` (\`slug_column\`), UNIQUE INDEX \`IDX_a1869b137017cc1d0ad6c785f7\` (\`name_column\`), PRIMARY KEY (\`id_column\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`authority_tbl\` ADD \`resource_id_column\` varchar(36) NULL`
    );
    await queryRunner.query(
      `ALTER TABLE \`authority_tbl\` ADD CONSTRAINT \`FK_a49ab4ec8868677f087e6b4fedf\` FOREIGN KEY (\`resource_id_column\`) REFERENCES \`resource_tbl\`(\`id_column\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`authority_tbl\` DROP FOREIGN KEY \`FK_a49ab4ec8868677f087e6b4fedf\``
    );
    await queryRunner.query(
      `ALTER TABLE \`authority_tbl\` DROP COLUMN \`resource_id_column\``
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_a1869b137017cc1d0ad6c785f7\` ON \`resource_tbl\``
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_1efeaa4c3b15184686e572d76a\` ON \`resource_tbl\``
    );
    await queryRunner.query(`DROP TABLE \`resource_tbl\``);
  }
}
