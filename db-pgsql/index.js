const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool();

module.exports = {
  pool,
  query: (text, params, callback) => pool.query(text, params, callback),
};
