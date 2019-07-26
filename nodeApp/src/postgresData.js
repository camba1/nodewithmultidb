const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'nodepostgres',
  database: 'postgres',
  password: 'TestDB@home2',
  port: '5432'
})

const getPostgresData = (request, response) => {
  pool.query('SELECT * FROM test ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = { getPostgresData }
