import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEntitiesForPurchaseProduct1728892823189 implements MigrationInterface {
    name = 'CreateEntitiesForPurchaseProduct1728892823189'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`purchase_product_tbl\` (\`id_column\` varchar(36) NOT NULL, \`slug_column\` varchar(255) NOT NULL, \`created_at_column\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at_column\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at_column\` datetime(6) NULL, \`created_by_column\` varchar(255) NULL, \`purchase_quantity_column\` int NOT NULL, \`description_column\` varchar(255) NULL, \`is_exist_product\` tinyint NOT NULL DEFAULT 1, \`product_column\` varchar(36) NULL, \`temporary_product_column\` varchar(36) NULL, \`product_purchase_form_column\` varchar(36) NULL, UNIQUE INDEX \`IDX_715934715ef140429a043f77b5\` (\`slug_column\`), PRIMARY KEY (\`id_column\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_purchase_form_tbl\` (\`id_column\` varchar(36) NOT NULL, \`slug_column\` varchar(255) NOT NULL, \`created_at_column\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at_column\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at_column\` datetime(6) NULL, \`created_by_column\` varchar(255) NULL, \`code_column\` varchar(255) NOT NULL, \`status_column\` varchar(255) NOT NULL, \`description_column\` varchar(255) NULL, \`product_purchase_form_column\` varchar(36) NULL, UNIQUE INDEX \`IDX_9ee79b8c017ba2dc073b90529e\` (\`slug_column\`), UNIQUE INDEX \`IDX_f0c51c0b9a9f87419fd6d3aca7\` (\`code_column\`), PRIMARY KEY (\`id_column\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`purchase_product_tbl\` ADD CONSTRAINT \`FK_1836aac453d7b4f9d2ff348d75c\` FOREIGN KEY (\`product_column\`) REFERENCES \`product_tbl\`(\`id_column\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`purchase_product_tbl\` ADD CONSTRAINT \`FK_54a2fc7fb233db74d33110047af\` FOREIGN KEY (\`temporary_product_column\`) REFERENCES \`temporary_product_tbl\`(\`id_column\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`purchase_product_tbl\` ADD CONSTRAINT \`FK_b064ebffe443abc2a2cd24a5e8b\` FOREIGN KEY (\`product_purchase_form_column\`) REFERENCES \`product_purchase_form_tbl\`(\`id_column\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_purchase_form_tbl\` ADD CONSTRAINT \`FK_7f4adf1ca02d00b1e1151e1757c\` FOREIGN KEY (\`product_purchase_form_column\`) REFERENCES \`product_requisition_form_tbl\`(\`id_column\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        // manual
        await queryRunner.query(`DROP INDEX \`IDX_d0e6fd21aa1556b956a7e5e35f\` ON \`purchase_requisition_form_tbl\``);
        await queryRunner.query(`DROP TABLE \`purchase_requisition_form_tbl\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_purchase_form_tbl\` DROP FOREIGN KEY \`FK_7f4adf1ca02d00b1e1151e1757c\``);
        await queryRunner.query(`ALTER TABLE \`purchase_product_tbl\` DROP FOREIGN KEY \`FK_b064ebffe443abc2a2cd24a5e8b\``);
        await queryRunner.query(`ALTER TABLE \`purchase_product_tbl\` DROP FOREIGN KEY \`FK_54a2fc7fb233db74d33110047af\``);
        await queryRunner.query(`ALTER TABLE \`purchase_product_tbl\` DROP FOREIGN KEY \`FK_1836aac453d7b4f9d2ff348d75c\``);
        await queryRunner.query(`DROP INDEX \`IDX_f0c51c0b9a9f87419fd6d3aca7\` ON \`product_purchase_form_tbl\``);
        await queryRunner.query(`DROP INDEX \`IDX_9ee79b8c017ba2dc073b90529e\` ON \`product_purchase_form_tbl\``);
        await queryRunner.query(`DROP TABLE \`product_purchase_form_tbl\``);
        await queryRunner.query(`DROP INDEX \`IDX_715934715ef140429a043f77b5\` ON \`purchase_product_tbl\``);
        await queryRunner.query(`DROP TABLE \`purchase_product_tbl\``);
        // manual
        await queryRunner.query(`CREATE TABLE \`purchase_requisition_form_tbl\` (\`id_column\` varchar(36) NOT NULL, \`slug_column\` varchar(255) NOT NULL, \`created_at_column\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at_column\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at_column\` datetime(6) NULL, \`created_by_column\` varchar(255) NULL, UNIQUE INDEX \`IDX_d0e6fd21aa1556b956a7e5e35f\` (\`slug_column\`), PRIMARY KEY (\`id_column\`)) ENGINE=InnoDB`);
    }

}
