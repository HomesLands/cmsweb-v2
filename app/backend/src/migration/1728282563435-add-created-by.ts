import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreatedBy1728282563435 implements MigrationInterface {
    name = 'AddCreatedBy1728282563435'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_tbl\` ADD \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product_tbl\` ADD \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`unit_tbl\` ADD \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`invalid_token_tbl\` ADD \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`site_tbl\` ADD \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`project_tbl\` ADD \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product_requisition_form_tbl\` ADD \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`request_product_tbl\` ADD \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`company_tbl\` ADD \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`file_tbl\` ADD \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_approval_tbl\` ADD \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`resource_tbl\` ADD \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`authority_tbl\` ADD \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`permission_tbl\` ADD \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`role_tbl\` ADD \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_role_tbl\` ADD \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`approval_log_tbl\` ADD \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`assigned_user_approval\` ADD \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`department_tbl\` ADD \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_department_tbl\` ADD \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product_warehouse_tbl\` ADD \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`rfid_tbl\` ADD \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`temporary_product_tbl\` ADD \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouse_tbl\` ADD \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`purchase_requisition_form_tbl\` ADD \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product_import_form_tbl\` ADD \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product_export_form_tbl\` ADD \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`export_product_tbl\` ADD \`created_by_column\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`export_product_tbl\` DROP COLUMN \`created_by_column\``);
        await queryRunner.query(`ALTER TABLE \`product_export_form_tbl\` DROP COLUMN \`created_by_column\``);
        await queryRunner.query(`ALTER TABLE \`product_import_form_tbl\` DROP COLUMN \`created_by_column\``);
        await queryRunner.query(`ALTER TABLE \`purchase_requisition_form_tbl\` DROP COLUMN \`created_by_column\``);
        await queryRunner.query(`ALTER TABLE \`warehouse_tbl\` DROP COLUMN \`created_by_column\``);
        await queryRunner.query(`ALTER TABLE \`temporary_product_tbl\` DROP COLUMN \`created_by_column\``);
        await queryRunner.query(`ALTER TABLE \`rfid_tbl\` DROP COLUMN \`created_by_column\``);
        await queryRunner.query(`ALTER TABLE \`product_warehouse_tbl\` DROP COLUMN \`created_by_column\``);
        await queryRunner.query(`ALTER TABLE \`user_department_tbl\` DROP COLUMN \`created_by_column\``);
        await queryRunner.query(`ALTER TABLE \`department_tbl\` DROP COLUMN \`created_by_column\``);
        await queryRunner.query(`ALTER TABLE \`assigned_user_approval\` DROP COLUMN \`created_by_column\``);
        await queryRunner.query(`ALTER TABLE \`approval_log_tbl\` DROP COLUMN \`created_by_column\``);
        await queryRunner.query(`ALTER TABLE \`user_role_tbl\` DROP COLUMN \`created_by_column\``);
        await queryRunner.query(`ALTER TABLE \`role_tbl\` DROP COLUMN \`created_by_column\``);
        await queryRunner.query(`ALTER TABLE \`permission_tbl\` DROP COLUMN \`created_by_column\``);
        await queryRunner.query(`ALTER TABLE \`authority_tbl\` DROP COLUMN \`created_by_column\``);
        await queryRunner.query(`ALTER TABLE \`resource_tbl\` DROP COLUMN \`created_by_column\``);
        await queryRunner.query(`ALTER TABLE \`user_approval_tbl\` DROP COLUMN \`created_by_column\``);
        await queryRunner.query(`ALTER TABLE \`file_tbl\` DROP COLUMN \`created_by_column\``);
        await queryRunner.query(`ALTER TABLE \`company_tbl\` DROP COLUMN \`created_by_column\``);
        await queryRunner.query(`ALTER TABLE \`request_product_tbl\` DROP COLUMN \`created_by_column\``);
        await queryRunner.query(`ALTER TABLE \`product_requisition_form_tbl\` DROP COLUMN \`created_by_column\``);
        await queryRunner.query(`ALTER TABLE \`project_tbl\` DROP COLUMN \`created_by_column\``);
        await queryRunner.query(`ALTER TABLE \`site_tbl\` DROP COLUMN \`created_by_column\``);
        await queryRunner.query(`ALTER TABLE \`invalid_token_tbl\` DROP COLUMN \`created_by_column\``);
        await queryRunner.query(`ALTER TABLE \`unit_tbl\` DROP COLUMN \`created_by_column\``);
        await queryRunner.query(`ALTER TABLE \`product_tbl\` DROP COLUMN \`created_by_column\``);
        await queryRunner.query(`ALTER TABLE \`user_tbl\` DROP COLUMN \`created_by_column\``);
    }

}
