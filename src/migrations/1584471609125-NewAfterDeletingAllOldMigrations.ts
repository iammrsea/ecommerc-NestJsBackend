import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewAfterDeletingAllOldMigrations1584471609125
  implements MigrationInterface {
  name = 'NewAfterDeletingAllOldMigrations1584471609125';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "product" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" text NOT NULL, "price" float NOT NULL, "imageUrl" varchar NOT NULL, "total" integer NOT NULL, "available" boolean NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "categoryId" integer, CONSTRAINT "UQ_22cc43e9a74d7498546e9a63e77" UNIQUE ("name"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "total" integer, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "role" varchar NOT NULL, "address" varchar, "city" varchar, "state" varchar, "zip" varchar, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "order" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer)`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_product" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" text NOT NULL, "price" float NOT NULL, "imageUrl" varchar NOT NULL, "total" integer NOT NULL, "available" boolean NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "categoryId" integer, CONSTRAINT "UQ_22cc43e9a74d7498546e9a63e77" UNIQUE ("name"), CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`,
      undefined,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_product"("id", "name", "description", "price", "imageUrl", "total", "available", "createdAt", "updatedAt", "categoryId") SELECT "id", "name", "description", "price", "imageUrl", "total", "available", "createdAt", "updatedAt", "categoryId" FROM "product"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "product"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_product" RENAME TO "product"`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_order" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`,
      undefined,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_order"("id", "description", "createdAt", "updatedAt", "userId") SELECT "id", "description", "createdAt", "updatedAt", "userId" FROM "order"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "order"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_order" RENAME TO "order"`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "order" RENAME TO "temporary_order"`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "order" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer)`,
      undefined,
    );
    await queryRunner.query(
      `INSERT INTO "order"("id", "description", "createdAt", "updatedAt", "userId") SELECT "id", "description", "createdAt", "updatedAt", "userId" FROM "temporary_order"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "temporary_order"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "product" RENAME TO "temporary_product"`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" text NOT NULL, "price" float NOT NULL, "imageUrl" varchar NOT NULL, "total" integer NOT NULL, "available" boolean NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "categoryId" integer, CONSTRAINT "UQ_22cc43e9a74d7498546e9a63e77" UNIQUE ("name"))`,
      undefined,
    );
    await queryRunner.query(
      `INSERT INTO "product"("id", "name", "description", "price", "imageUrl", "total", "available", "createdAt", "updatedAt", "categoryId") SELECT "id", "name", "description", "price", "imageUrl", "total", "available", "createdAt", "updatedAt", "categoryId" FROM "temporary_product"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "temporary_product"`, undefined);
    await queryRunner.query(`DROP TABLE "order"`, undefined);
    await queryRunner.query(`DROP TABLE "user"`, undefined);
    await queryRunner.query(`DROP TABLE "category"`, undefined);
    await queryRunner.query(`DROP TABLE "product"`, undefined);
  }
}
