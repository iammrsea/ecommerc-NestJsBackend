import {createConnection} from 'typeorm';
import * as ormconfig from './ormconfig';

console.log('running connect file')
createConnection({
    ...ormconfig
}).then(connection=>{
    console.log('Successfully established connection to the database');

}).catch(e=>{
    console.log('error occured ',e);
})