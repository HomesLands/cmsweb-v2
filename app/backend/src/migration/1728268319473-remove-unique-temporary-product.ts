import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUniqueTemporaryProduct1728268319473 implements MigrationInterface {
    name = 'RemoveUniqueTemporaryProduct1728268319473'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_83020800041c8828e6dcfe66b9\` ON \`temporary_product_tbl\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_83020800041c8828e6dcfe66b9\` ON \`temporary_product_tbl\` (\`name_column\`)`);
    }

}
