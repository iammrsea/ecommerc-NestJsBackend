import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

const envData: any = dotenv.parse(fs.readFileSync('.env'));
// console.log('env Data', envData);

const config: ConnectionOptions = {
  type: 'mysql',
  host: envData.DB_HOST,
  port: envData.DB_PORT,
  password: envData.DB_PASSWORD,
  username: envData.DB_USERNAME,
  database: envData.DB_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrationsRun: false,
  logging: true,
  logger: 'file',
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export = config;
