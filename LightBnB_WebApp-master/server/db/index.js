const { Pool } = require('pg')

const pool = new Pool({
    user: 'davidhe',
    password: '123',
    host: 'localhost',
    database: 'windbnb'
  })

    pool.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
  });

module.exports = {

    query: (text, params, callback) => {
        
        const start = Date.now()

        return pool.query(text, params, callback)

    },
}

