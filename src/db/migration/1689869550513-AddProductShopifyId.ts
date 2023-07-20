import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProductShopifyId1689869550513 implements MigrationInterface {
  name = 'AddProductShopifyId1689869550513';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "product"
            ADD "shopifyId" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "product"
            ADD CONSTRAINT "UQ_61e83ccffb4b469fcb32a77b194" UNIQUE ("shopifyId")
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "product" DROP CONSTRAINT "UQ_61e83ccffb4b469fcb32a77b194"
        `);
    await queryRunner.query(`
            ALTER TABLE "product" DROP COLUMN "shopifyId"
        `);
  }
}
