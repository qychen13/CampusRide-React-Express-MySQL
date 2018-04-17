// get the client
// mysql2 enables use async connection and query
const  mysql = require('mysql2/promise');
const  {MYSQL_CONFIG}=require('./database-variables.js')

async function mysql2query(sql) {
  // create the connection
  const connection = await mysql.createConnection({
                host     : MYSQL_CONFIG.host,
              	user     : MYSQL_CONFIG.user,
              	password : MYSQL_CONFIG.password,
              	database : MYSQL_CONFIG.database});
  // query database
  // console.log(sql);
  const [rows, fields] = await connection.execute(sql);
  return [rows, fields];
}

module.exports = {mysql2query};
