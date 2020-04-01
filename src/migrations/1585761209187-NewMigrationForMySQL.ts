import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigrationForMySQL1585761209187 implements MigrationInterface {
  name = 'NewMigrationForMySQL1585761209187';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'CREATE TABLE `product` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `description` text NOT NULL, `price` float NOT NULL, `imageUrl` varchar(255) NOT NULL, `total` int NOT NULL, `available` tinyint NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `categoryId` int NULL, UNIQUE INDEX `IDX_22cc43e9a74d7498546e9a63e7` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
    await queryRunner.query(
      'CREATE TABLE `category` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `total` int NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_23c05c292c439d77b0de816b50` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
    await queryRunner.query(
      'CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `role` varchar(255) NOT NULL, `phone` varchar(255) NULL, `city` varchar(255) NULL, `state` varchar(255) NULL, `zip` varchar(255) NULL, `rebuild_token` varchar(255) NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed` (`username`), UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
    await queryRunner.query(
      'CREATE TABLE `order` (`id` int NOT NULL AUTO_INCREMENT, `qty` int NOT NULL, `amount` float NOT NULL, `items` varchar(255) NOT NULL, `status` varchar(255) NOT NULL, `currency` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
    await queryRunner.query(
      'CREATE TABLE `sales` (`id` int NOT NULL AUTO_INCREMENT, `qty` int NOT NULL, `price` float NULL, `amount` float NOT NULL, `profit` float NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `product` ADD CONSTRAINT `FK_ff0c0301a95e517153df97f6812` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `order` ADD CONSTRAINT `FK_caabe91507b3379c7ba73637b84` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'ALTER TABLE `order` DROP FOREIGN KEY `FK_caabe91507b3379c7ba73637b84`',
      undefined,
    );
    await queryRunner.query(
      'ALTER TABLE `product` DROP FOREIGN KEY `FK_ff0c0301a95e517153df97f6812`',
      undefined,
    );
    await queryRunner.query('DROP TABLE `sales`', undefined);
    await queryRunner.query('DROP TABLE `order`', undefined);
    await queryRunner.query(
      'DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`',
      undefined,
    );
    await queryRunner.query(
      'DROP INDEX `IDX_78a916df40e02a9deb1c4b75ed` ON `user`',
      undefined,
    );
    await queryRunner.query('DROP TABLE `user`', undefined);
    await queryRunner.query(
      'DROP INDEX `IDX_23c05c292c439d77b0de816b50` ON `category`',
      undefined,
    );
    await queryRunner.query('DROP TABLE `category`', undefined);
    await queryRunner.query(
      'DROP INDEX `IDX_22cc43e9a74d7498546e9a63e7` ON `product`',
      undefined,
    );
    await queryRunner.query('DROP TABLE `product`', undefined);
  }
}
