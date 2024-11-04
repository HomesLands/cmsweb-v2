import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProjectNameFieldForProjectRequisitionFormEntity1730706657251 implements MigrationInterface {
    name = 'AddProjectNameFieldForProjectRequisitionFormEntity1730706657251'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_requisition_form_tbl\` ADD \`project_name_column\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_requisition_form_tbl\` DROP COLUMN \`project_name_column\``);
    }

}
