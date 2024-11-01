import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUniqueRoleApproval1729504154154 implements MigrationInterface {
    name = 'RemoveUniqueRoleApproval1729504154154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_5b22e47fd9d252c768259a78d8\` ON \`assigned_user_approval\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_5b22e47fd9d252c768259a78d8\` ON \`assigned_user_approval\` (\`role_approval_column\`)`);
    }

}
