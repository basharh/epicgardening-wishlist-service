import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInitialWishlist1689795063715 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `insert into wishlist(id, name) values('f7d92009-9c36-483b-b77e-70432307e9ba', 'default');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
