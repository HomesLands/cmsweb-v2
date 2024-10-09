import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRequiredOwner1728442887374 implements MigrationInterface {
    name = 'AddRequiredOwner1728442887374'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`permission_tbl\` ADD \`required_owner_column\` tinyint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`permission_tbl\` DROP COLUMN \`required_owner_column\``);
    }

}
