var mysql = require('mysql');

// var conn = mysql.createConnection({
//   host: 'nodemysql',
//   port: '3306',
//   user: 'root',
//   password: 'TestDB@home2',
//   database: 'testDB'
// });
//
// const getMySqlData = (request, response) => {
//   conn.connect((err) =>{
//     if(err) throw err;
//     console.log('Mysql Connected...');
//   });
//   conn.query('SELECT * FROM test ORDER BY id ASC', (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results)
//   })
// }


var pool = mysql.createPool({
    connectionLimit : 10,
    host: 'nodemysql',
    port: '3306',
    user: 'root',
    password: 'TestDB@home2',
    database: 'testDB'
});


const getMySqlData = (request, response) => {
  pool.getConnection(function (err, connection) {
      connection.query("SELECT * FROM test ORDER BY id ASC", function (err, rows) {
          connection.release();
          if (err) throw err;
          response.status(200).json(rows);
      });
  });
}


module.exports = { getMySqlData }
