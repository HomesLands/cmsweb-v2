import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDescriptionFieldTemporaryProduct1728288907435 implements MigrationInterface {
    name = 'AddDescriptionFieldTemporaryProduct1728288907435'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`temporary_product_tbl\` ADD \`description_column\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`temporary_product_tbl\` DROP COLUMN \`description_column\``);
    }

}
