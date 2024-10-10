import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSiteForAssignedApprovalUser1728549193560 implements MigrationInterface {
    name = 'AddSiteForAssignedApprovalUser1728549193560'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_64c0306169a49c3638d94edcda\` ON \`assigned_user_approval\``);
        await queryRunner.query(`ALTER TABLE \`assigned_user_approval\` ADD \`site_column\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`assigned_user_approval\` ADD UNIQUE INDEX \`IDX_5b22e47fd9d252c768259a78d8\` (\`role_approval_column\`)`);
        await queryRunner.query(`ALTER TABLE \`assigned_user_approval\` ADD CONSTRAINT \`FK_b28461c0951d68c680c67a9c673\` FOREIGN KEY (\`site_column\`) REFERENCES \`site_tbl\`(\`id_column\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`assigned_user_approval\` DROP FOREIGN KEY \`FK_b28461c0951d68c680c67a9c673\``);
        await queryRunner.query(`ALTER TABLE \`assigned_user_approval\` DROP INDEX \`IDX_5b22e47fd9d252c768259a78d8\``);
        await queryRunner.query(`ALTER TABLE \`assigned_user_approval\` DROP COLUMN \`site_column\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_64c0306169a49c3638d94edcda\` ON \`assigned_user_approval\` (\`form_type_column\`, \`role_approval_column\`)`);
    }

}
