var mysql = require('mysql');

var conn = mysql.createConnection({
  host: 'nodemysql',
  port: '3306',
  user: 'root',
  password: 'TestDB@home2',
  database: 'testDB',
  insecureAuth : true
});

conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});


const getMySqlData = (request, response) => {
  conn.query('SELECT * FROM test ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results)
  })
}

module.exports = { getMySqlData }
