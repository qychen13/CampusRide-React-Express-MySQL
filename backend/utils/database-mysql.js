const mysql = require('mysql');
const  {MYSQL_CONFIG}=require('./database-variables.js')

const mysqlConnection = mysql.createConnection({
	host     : MYSQL_CONFIG.host,
	user     : MYSQL_CONFIG.user,
	password : MYSQL_CONFIG.password,
	database : MYSQL_CONFIG.database
});
mysqlConnection.connect((err)=>{
	if(err) throw err;
	console.log('DataBase: connect success ...');
});

module.exports = {mysqlConnection}
