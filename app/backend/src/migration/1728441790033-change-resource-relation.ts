import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeResourceRelation1728441790033 implements MigrationInterface {
    name = 'ChangeResourceRelation1728441790033'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`FK_3085490c8c6da3735a675c97f6b\` ON \`permission_tbl\``);
        await queryRunner.query(`DROP INDEX \`FK_84eee2fc3e836ce762f3a4f7c10\` ON \`permission_tbl\``);
        await queryRunner.query(`ALTER TABLE \`permission_tbl\` ADD \`resource_id_column\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`permission_tbl\` ADD CONSTRAINT \`FK_84eee2fc3e836ce762f3a4f7c10\` FOREIGN KEY (\`role_column\`) REFERENCES \`role_tbl\`(\`id_column\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`permission_tbl\` ADD CONSTRAINT \`FK_3085490c8c6da3735a675c97f6b\` FOREIGN KEY (\`authority_column\`) REFERENCES \`authority_tbl\`(\`id_column\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`permission_tbl\` ADD CONSTRAINT \`FK_d3acf16a5fe824b7f8493e95a1b\` FOREIGN KEY (\`resource_id_column\`) REFERENCES \`resource_tbl\`(\`id_column\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`permission_tbl\` DROP FOREIGN KEY \`FK_d3acf16a5fe824b7f8493e95a1b\``);
        await queryRunner.query(`ALTER TABLE \`permission_tbl\` DROP FOREIGN KEY \`FK_3085490c8c6da3735a675c97f6b\``);
        await queryRunner.query(`ALTER TABLE \`permission_tbl\` DROP FOREIGN KEY \`FK_84eee2fc3e836ce762f3a4f7c10\``);
        await queryRunner.query(`ALTER TABLE \`permission_tbl\` DROP COLUMN \`resource_id_column\``);
        await queryRunner.query(`CREATE INDEX \`FK_84eee2fc3e836ce762f3a4f7c10\` ON \`permission_tbl\` (\`role_column\`)`);
        await queryRunner.query(`CREATE INDEX \`FK_3085490c8c6da3735a675c97f6b\` ON \`permission_tbl\` (\`authority_column\`)`);
    }

}
