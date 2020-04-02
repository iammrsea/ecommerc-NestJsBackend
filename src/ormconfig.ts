import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';
// import * as fs from 'fs';

// const process.env: any = dotenv.parse(fs.readFileSync('.env'));
// console.log('env Data', process.env);
dotenv.config();

const config: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
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
