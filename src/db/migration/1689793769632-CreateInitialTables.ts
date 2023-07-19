import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInitialTables1689793769632 implements MigrationInterface {
  name = 'CreateInitialTables1689793769632';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "firstName" character varying NOT NULL,
                "lastName" character varying NOT NULL,
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "product" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "wishlist" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                CONSTRAINT "PK_620bff4a240d66c357b5d820eaa" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "wishlist_products_product" (
                "wishlistId" uuid NOT NULL,
                "productId" uuid NOT NULL,
                CONSTRAINT "PK_a40857fb518ea9ddd0eed914e04" PRIMARY KEY ("wishlistId", "productId")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_d26d172812ffce61522237f3ae" ON "wishlist_products_product" ("wishlistId")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_f732d2ee0684d55dbead923860" ON "wishlist_products_product" ("productId")
        `);
    await queryRunner.query(`
            ALTER TABLE "wishlist_products_product"
            ADD CONSTRAINT "FK_d26d172812ffce61522237f3ae3" FOREIGN KEY ("wishlistId") REFERENCES "wishlist"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "wishlist_products_product"
            ADD CONSTRAINT "FK_f732d2ee0684d55dbead923860c" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "wishlist_products_product" DROP CONSTRAINT "FK_f732d2ee0684d55dbead923860c"
        `);
    await queryRunner.query(`
            ALTER TABLE "wishlist_products_product" DROP CONSTRAINT "FK_d26d172812ffce61522237f3ae3"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_f732d2ee0684d55dbead923860"
        `);
    await queryRunner.query(`
            DROP INDEX "public"."IDX_d26d172812ffce61522237f3ae"
        `);
    await queryRunner.query(`
            DROP TABLE "wishlist_products_product"
        `);
    await queryRunner.query(`
            DROP TABLE "wishlist"
        `);
    await queryRunner.query(`
            DROP TABLE "product"
        `);
    await queryRunner.query(`
            DROP TABLE "user"
        `);
  }
}
