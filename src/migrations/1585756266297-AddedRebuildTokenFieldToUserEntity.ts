import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedRebuildTokenFieldToUserEntity1585756266297
  implements MigrationInterface {
  name = 'AddedRebuildTokenFieldToUserEntity1585756266297';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "temporary_product" ("id" integer PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" text NOT NULL, "price" float NOT NULL, "imageUrl" varchar NOT NULL, "total" integer NOT NULL, "available" boolean NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "categoryId" integer, CONSTRAINT "UQ_22cc43e9a74d7498546e9a63e77" UNIQUE ("name"))`,
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
      `CREATE TABLE "temporary_order" ("id" integer PRIMARY KEY NOT NULL, "qty" integer NOT NULL, "amount" float NOT NULL, "items" varchar NOT NULL, "status" varchar NOT NULL, "currency" varchar NOT NULL, "userId" integer NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`,
      undefined,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_order"("id", "qty", "amount", "items", "status", "currency", "userId", "createdAt", "updatedAt") SELECT "id", "qty", "amount", "items", "status", "currency", "userId", "createdAt", "updatedAt" FROM "order"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "order"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_order" RENAME TO "order"`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_order" ("id" integer PRIMARY KEY NOT NULL, "qty" integer NOT NULL, "amount" float NOT NULL, "items" varchar NOT NULL, "status" varchar NOT NULL, "currency" varchar NOT NULL, "userId" integer NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`,
      undefined,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_order"("id", "qty", "amount", "items", "status", "currency", "userId", "createdAt", "updatedAt") SELECT "id", "qty", "amount", "items", "status", "currency", "userId", "createdAt", "updatedAt" FROM "order"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "order"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_order" RENAME TO "order"`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "role" varchar NOT NULL, "phone" varchar, "city" varchar, "state" varchar, "zip" varchar, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "rebuild_token" varchar, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`,
      undefined,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_user"("id", "username", "email", "password", "role", "phone", "city", "state", "zip", "createdAt", "updatedAt") SELECT "id", "username", "email", "password", "role", "phone", "city", "state", "zip", "createdAt", "updatedAt" FROM "user"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "user"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_user" RENAME TO "user"`,
      undefined,
    );
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
      `CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "role" varchar NOT NULL, "phone" varchar, "city" varchar, "state" varchar, "zip" varchar, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "rebuild_token" varchar, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`,
      undefined,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_user"("id", "username", "email", "password", "role", "phone", "city", "state", "zip", "createdAt", "updatedAt", "rebuild_token") SELECT "id", "username", "email", "password", "role", "phone", "city", "state", "zip", "createdAt", "updatedAt", "rebuild_token" FROM "user"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "user"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_user" RENAME TO "user"`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_order" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "qty" integer NOT NULL, "amount" float NOT NULL, "items" varchar NOT NULL, "status" varchar NOT NULL, "currency" varchar NOT NULL, "userId" integer, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`,
      undefined,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_order"("id", "qty", "amount", "items", "status", "currency", "userId", "createdAt", "updatedAt") SELECT "id", "qty", "amount", "items", "status", "currency", "userId", "createdAt", "updatedAt" FROM "order"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "order"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_order" RENAME TO "order"`,
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
      `CREATE TABLE "temporary_order" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "qty" integer NOT NULL, "amount" float NOT NULL, "items" varchar NOT NULL, "status" varchar NOT NULL, "currency" varchar NOT NULL, "userId" integer, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`,
      undefined,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_order"("id", "qty", "amount", "items", "status", "currency", "userId", "createdAt", "updatedAt") SELECT "id", "qty", "amount", "items", "status", "currency", "userId", "createdAt", "updatedAt" FROM "order"`,
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
      `CREATE TABLE "order" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "qty" integer NOT NULL, "amount" float NOT NULL, "items" varchar NOT NULL, "status" varchar NOT NULL, "currency" varchar NOT NULL, "userId" integer, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`,
      undefined,
    );
    await queryRunner.query(
      `INSERT INTO "order"("id", "qty", "amount", "items", "status", "currency", "userId", "createdAt", "updatedAt") SELECT "id", "qty", "amount", "items", "status", "currency", "userId", "createdAt", "updatedAt" FROM "temporary_order"`,
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
    await queryRunner.query(
      `ALTER TABLE "order" RENAME TO "temporary_order"`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "order" ("id" integer PRIMARY KEY NOT NULL, "qty" integer NOT NULL, "amount" float NOT NULL, "items" varchar NOT NULL, "status" varchar NOT NULL, "currency" varchar NOT NULL, "userId" integer NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`,
      undefined,
    );
    await queryRunner.query(
      `INSERT INTO "order"("id", "qty", "amount", "items", "status", "currency", "userId", "createdAt", "updatedAt") SELECT "id", "qty", "amount", "items", "status", "currency", "userId", "createdAt", "updatedAt" FROM "temporary_order"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "temporary_order"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "user" RENAME TO "temporary_user"`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "role" varchar NOT NULL, "phone" varchar, "city" varchar, "state" varchar, "zip" varchar, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "rebuild_token" varchar, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`,
      undefined,
    );
    await queryRunner.query(
      `INSERT INTO "user"("id", "username", "email", "password", "role", "phone", "city", "state", "zip", "createdAt", "updatedAt", "rebuild_token") SELECT "id", "username", "email", "password", "role", "phone", "city", "state", "zip", "createdAt", "updatedAt", "rebuild_token" FROM "temporary_user"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "temporary_user"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "product" RENAME TO "temporary_product"`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" integer PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" text NOT NULL, "price" float NOT NULL, "imageUrl" varchar NOT NULL, "total" integer NOT NULL, "available" boolean NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "categoryId" integer, CONSTRAINT "UQ_22cc43e9a74d7498546e9a63e77" UNIQUE ("name"))`,
      undefined,
    );
    await queryRunner.query(
      `INSERT INTO "product"("id", "name", "description", "price", "imageUrl", "total", "available", "createdAt", "updatedAt", "categoryId") SELECT "id", "name", "description", "price", "imageUrl", "total", "available", "createdAt", "updatedAt", "categoryId" FROM "temporary_product"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "temporary_product"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "user" RENAME TO "temporary_user"`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "role" varchar NOT NULL, "phone" varchar, "city" varchar, "state" varchar, "zip" varchar, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`,
      undefined,
    );
    await queryRunner.query(
      `INSERT INTO "user"("id", "username", "email", "password", "role", "phone", "city", "state", "zip", "createdAt", "updatedAt") SELECT "id", "username", "email", "password", "role", "phone", "city", "state", "zip", "createdAt", "updatedAt" FROM "temporary_user"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "temporary_user"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "order" RENAME TO "temporary_order"`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "order" ("id" integer PRIMARY KEY NOT NULL, "qty" integer NOT NULL, "amount" float NOT NULL, "items" varchar NOT NULL, "status" varchar NOT NULL, "currency" varchar NOT NULL, "userId" integer NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`,
      undefined,
    );
    await queryRunner.query(
      `INSERT INTO "order"("id", "qty", "amount", "items", "status", "currency", "userId", "createdAt", "updatedAt") SELECT "id", "qty", "amount", "items", "status", "currency", "userId", "createdAt", "updatedAt" FROM "temporary_order"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "temporary_order"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "order" RENAME TO "temporary_order"`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "order" ("id" integer PRIMARY KEY NOT NULL, "qty" integer NOT NULL, "amount" float NOT NULL, "items" varchar NOT NULL, "status" varchar NOT NULL, "currency" varchar NOT NULL, "userId" integer NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`,
      undefined,
    );
    await queryRunner.query(
      `INSERT INTO "order"("id", "qty", "amount", "items", "status", "currency", "userId", "createdAt", "updatedAt") SELECT "id", "qty", "amount", "items", "status", "currency", "userId", "createdAt", "updatedAt" FROM "temporary_order"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "temporary_order"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "product" RENAME TO "temporary_product"`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" integer PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "description" text NOT NULL, "price" float NOT NULL, "imageUrl" varchar NOT NULL, "total" integer NOT NULL, "available" boolean NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "categoryId" integer, CONSTRAINT "UQ_22cc43e9a74d7498546e9a63e77" UNIQUE ("name"), CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`,
      undefined,
    );
    await queryRunner.query(
      `INSERT INTO "product"("id", "name", "description", "price", "imageUrl", "total", "available", "createdAt", "updatedAt", "categoryId") SELECT "id", "name", "description", "price", "imageUrl", "total", "available", "createdAt", "updatedAt", "categoryId" FROM "temporary_product"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "temporary_product"`, undefined);
  }
}
