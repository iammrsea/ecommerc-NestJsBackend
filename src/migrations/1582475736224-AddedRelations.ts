import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedRelations1582475736224 implements MigrationInterface {
    name = 'AddedRelations1582475736224'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "temporary_product" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" text NOT NULL, "price" float NOT NULL, "imageUrl" varchar NOT NULL, "total" integer NOT NULL, "available" boolean NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "categoryId" integer, CONSTRAINT "UQ_22cc43e9a74d7498546e9a63e77" UNIQUE ("name"))`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_product"("id", "name", "description", "price", "imageUrl", "total", "available", "createdAt", "updatedAt") SELECT "id", "name", "description", "price", "imageUrl", "total", "available", "createdAt", "updatedAt" FROM "product"`, undefined);
        await queryRunner.query(`DROP TABLE "product"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_product" RENAME TO "product"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_product" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" text NOT NULL, "price" float NOT NULL, "imageUrl" varchar NOT NULL, "total" integer NOT NULL, "available" boolean NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "categoryId" integer, CONSTRAINT "UQ_22cc43e9a74d7498546e9a63e77" UNIQUE ("name"), CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_product"("id", "name", "description", "price", "imageUrl", "total", "available", "createdAt", "updatedAt", "categoryId") SELECT "id", "name", "description", "price", "imageUrl", "total", "available", "createdAt", "updatedAt", "categoryId" FROM "product"`, undefined);
        await queryRunner.query(`DROP TABLE "product"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_product" RENAME TO "product"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "product" RENAME TO "temporary_product"`, undefined);
        await queryRunner.query(`CREATE TABLE "product" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" text NOT NULL, "price" float NOT NULL, "imageUrl" varchar NOT NULL, "total" integer NOT NULL, "available" boolean NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "categoryId" integer, CONSTRAINT "UQ_22cc43e9a74d7498546e9a63e77" UNIQUE ("name"))`, undefined);
        await queryRunner.query(`INSERT INTO "product"("id", "name", "description", "price", "imageUrl", "total", "available", "createdAt", "updatedAt", "categoryId") SELECT "id", "name", "description", "price", "imageUrl", "total", "available", "createdAt", "updatedAt", "categoryId" FROM "temporary_product"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_product"`, undefined);
        await queryRunner.query(`ALTER TABLE "product" RENAME TO "temporary_product"`, undefined);
        await queryRunner.query(`CREATE TABLE "product" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" text NOT NULL, "price" float NOT NULL, "imageUrl" varchar NOT NULL, "total" integer NOT NULL, "available" boolean NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_22cc43e9a74d7498546e9a63e77" UNIQUE ("name"))`, undefined);
        await queryRunner.query(`INSERT INTO "product"("id", "name", "description", "price", "imageUrl", "total", "available", "createdAt", "updatedAt") SELECT "id", "name", "description", "price", "imageUrl", "total", "available", "createdAt", "updatedAt" FROM "temporary_product"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_product"`, undefined);
    }

}
