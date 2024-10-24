import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNotification1729761481624 implements MigrationInterface {
    name = 'AddNotification1729761481624'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`notification_tbl\` (\`id_column\` varchar(36) NOT NULL, \`slug_column\` varchar(255) NOT NULL, \`created_at_column\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at_column\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at_column\` datetime(6) NULL, \`created_by_column\` varchar(255) NULL, \`message_column\` varchar(255) NOT NULL, \`type_column\` varchar(255) NOT NULL, \`url_column\` varchar(255) NULL, \`is_read_column\` tinyint NOT NULL DEFAULT 0, \`user_id_column\` varchar(36) NULL, UNIQUE INDEX \`IDX_e9e8349d3beb9b1ab765cf45fa\` (\`slug_column\`), PRIMARY KEY (\`id_column\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`notification_tbl\` ADD CONSTRAINT \`FK_d12ebcfc0257a0a9c23a13f3c9d\` FOREIGN KEY (\`user_id_column\`) REFERENCES \`user_tbl\`(\`id_column\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notification_tbl\` DROP FOREIGN KEY \`FK_d12ebcfc0257a0a9c23a13f3c9d\``);
        await queryRunner.query(`DROP INDEX \`IDX_e9e8349d3beb9b1ab765cf45fa\` ON \`notification_tbl\``);
        await queryRunner.query(`DROP TABLE \`notification_tbl\``);
    }

}
