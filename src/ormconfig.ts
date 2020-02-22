import {ConnectionOptions} from 'typeorm';
// import * as dotenv from 'dotenv';
// import * as fs from 'fs';


// const envData:any = dotenv.parse(fs.readFileSync('.env'));


const config:ConnectionOptions ={
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: false,
    migrationsRun: false,
    logging: true,
    logger: 'file',
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    cli: {
      migrationsDir: 'src/migrations',
    },
}

export =config;