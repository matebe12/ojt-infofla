import {getSql} from '../config/mariadb';

async function getUser() {
    let sql = `SELECT * FROM USER_TABLE`;
    console.log(await getSql(sql));
    return await getSql(sql);
} 

export {getUser}