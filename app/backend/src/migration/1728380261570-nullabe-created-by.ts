import { MigrationInterface, QueryRunner } from "typeorm";

export class NullabeCreatedBy1728380261570 implements MigrationInterface {
    name = 'NullabeCreatedBy1728380261570'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`unit_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`invalid_token_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`site_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`project_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_requisition_form_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`request_product_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`company_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`file_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_approval_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`resource_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`authority_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`permission_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`role_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_role_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`approval_log_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`assigned_user_approval\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`department_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_department_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_warehouse_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouse_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`rfid_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`temporary_product_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`purchase_requisition_form_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_import_form_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_export_form_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`export_product_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`export_product_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product_export_form_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product_import_form_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`purchase_requisition_form_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`temporary_product_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`rfid_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`warehouse_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product_warehouse_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_department_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`department_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`assigned_user_approval\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`approval_log_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_role_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`role_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`permission_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`authority_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`resource_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_approval_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`file_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`company_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`request_product_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product_requisition_form_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`project_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`site_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`invalid_token_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`unit_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_tbl\` CHANGE \`created_by_column\` \`created_by_column\` varchar(255) NOT NULL`);
    }

}
