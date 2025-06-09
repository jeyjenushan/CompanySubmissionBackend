const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'viber+1014',
  database: 'companydatabase'
});
 
const connectToMySql = () => {
  connection.connect(err => {
    if (err) {
      console.error('MySQL connection error:', err.stack);
    } else {
      console.log('Connected to MySQL as ID', connection.threadId);
    }
  });
};

// so other files can use it to query the DB
module.exports = {
    connectToMySql,
    connection, 
  };