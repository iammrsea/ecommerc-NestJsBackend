import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSalesTable1584627009828 implements MigrationInterface {
  name = 'CreateSalesTable1584627009828';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "temporary_product" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" text NOT NULL, "price" float NOT NULL, "imageUrl" varchar NOT NULL, "total" integer NOT NULL, "available" boolean NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "categoryId" integer, CONSTRAINT "UQ_22cc43e9a74d7498546e9a63e77" UNIQUE ("name"))`,
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
      `CREATE TABLE "temporary_order" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer)`,
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
    await queryRunner.query(
      `CREATE TABLE "sales" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "qty" integer NOT NULL, "price" float, "amount" float NOT NULL, "profit" float NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`,
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
    await queryRunner.query(`DROP TABLE "sales"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "order" RENAME TO "temporary_order"`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "order" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "description" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`,
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
      `CREATE TABLE "product" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" text NOT NULL, "price" float NOT NULL, "imageUrl" varchar NOT NULL, "total" integer NOT NULL, "available" boolean NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "categoryId" integer, CONSTRAINT "UQ_22cc43e9a74d7498546e9a63e77" UNIQUE ("name"), CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`,
      undefined,
    );
    await queryRunner.query(
      `INSERT INTO "product"("id", "name", "description", "price", "imageUrl", "total", "available", "createdAt", "updatedAt", "categoryId") SELECT "id", "name", "description", "price", "imageUrl", "total", "available", "createdAt", "updatedAt", "categoryId" FROM "temporary_product"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "temporary_product"`, undefined);
  }
}
