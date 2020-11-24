import mariadb from 'mariadb';
require('dotenv').config(); 
const pool = mariadb.createPool({
    host: process.env.MARIA_HOST, 
    port: process.env.MARIA_PORT,
    user: process.env.MARIA_USER, 
    password: process.env.MARIA_PW
});

async function getSql(query){
    let conn;
    try {
        try {
            conn = await getPoolConnection();
           conn.query('USE OJT');
       } catch (error) {
           console.log(`connection error => ${error}`);
           throw error;
       }
       try {
        let result = await conn.query(query);
        return result;
       } catch (error) {
        console.log(`sql error => ${error}`);
        throw error;
       }
    } catch (error) {
        console.log(`excute error => ${error}`);
        throw error;
    }
    finally {
        try {
            if(conn) await endPoolConnection(conn);
        } catch (error) {
            console.log(`endPool Error =>  ${error}`);
            throw error;
        }
    }
    
}
async function getPoolConnection(){
    let conn;
        try {
            conn = await pool.getConnection();
            console.log("connection succeed");
            return conn;
        } catch (err) {
            console.log(`getConnection error =>  ${err}`);
            throw err;
        }
} 
async function endPoolConnection(conn){
    try {
        if (conn) {
            console.log("connection end");
            await conn.end();
        }
    } catch (err) {
        console.log(`end error => ${err}`);
        throw err;
    }
} 
export {
    getSql,
    getPoolConnection,
    endPoolConnection
}