import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmailFieldForUserEntity1729156973761 implements MigrationInterface {
    name = 'AddEmailFieldForUserEntity1729156973761'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_tbl\` ADD \`email_column\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_tbl\` DROP COLUMN \`email_column\``);
    }

}
