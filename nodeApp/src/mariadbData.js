const mymariadb = require('mariadb');

const pool = mymariadb.createPool({
  host: 'nodemariadb',
  port: '3306',
  user: 'root',
  password: 'TestDB@home2',
  database: 'testDB',
  connectionLimit: 5
});

async function getmariadbData(request, response) {
  let conn;
  try {
    conn = await pool.getConnection();
    const results = await conn.query('SELECT * FROM test ORDER BY id ASC');
    response.status(200).json(results)
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.end();
  }
}

module.exports = { getmariadbData }
