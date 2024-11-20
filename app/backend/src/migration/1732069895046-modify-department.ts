import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyDepartment1732069895046 implements MigrationInterface {
    name = 'ModifyDepartment1732069895046'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_ba06aeadf37ef258830b1f999c\` ON \`department_tbl\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_ba06aeadf37ef258830b1f999c\` ON \`department_tbl\` (\`name_normalize_column\`)`);
    }

}
